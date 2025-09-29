import { useEffect, useRef } from "react";

/**
 * continuous, bidirectional scroll slide (rAF + intersection observer)
 * works in window or scrollable containers
 *
 * options:
 * - direction: 'left' | 'right' | 'ltr' | 'rtl' (default 'left')
 * - distance: number | string ('40vw' | '30vh' | 240) (default '200px')
 * - start: 0..1 viewport ratio where motion begins   (default -0.10)
 * - end:   0..1 viewport ratio where motion finishes (default  0.80)
 * - clamp: boolean (default true)
 * - ease:  (t)=>number (default easeOutCubic)
 * - lerp:  0..1 smoothing per frame (default 0.15; higher = slower)
 */
export function useScrollSlide({
  direction = "left",
  distance = "200px",
  start = -0.1,
  end = 0.8,
  clamp = true,
  ease,
  lerp = 0.15,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // helpers
    const toPx = (val) => {
      if (typeof val === "number") return val;
      const s = String(val).trim();
      if (s.endsWith("vw")) return (parseFloat(s) / 100) * window.innerWidth;
      if (s.endsWith("vh")) return (parseFloat(s) / 100) * window.innerHeight;
      if (s.endsWith("px")) return parseFloat(s);
      const n = parseFloat(s);
      return Number.isFinite(n) ? n : 0;
    };
    const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // config
    const distPx = toPx(distance);
    const dir = direction === "right" || direction === "rtl" ? "right" : "left";
    const easing = typeof ease === "function" ? ease : easeOutCubic;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let active = false;
    let currentX = 0;
    let mounted = true;

    // compute unsmoothed target x based on element position
    const computeTargetX = () => {
      const vh = window.innerHeight || 1;
      const rect = el.getBoundingClientRect();
      const span = Math.max(0.0001, end - start);

      // p: 0 at start, 1 at end
      let p = 1 - (rect.top / vh - start) / span;
      if (clamp) p = clamp01(p);
      p = easing(p);

      const x = dir === "right" ? distPx - p * distPx : -distPx + p * distPx;
      return prefersReduced ? 0 : x;
    };

    // animation loop
    const tick = () => {
      if (!mounted) return;
      if (active) {
        const target = computeTargetX();
        currentX += (target - currentX) * lerp;
        el.style.setProperty("--slide-x", `${currentX}px`);
        rafId = requestAnimationFrame(tick);
      }
    };

    // observe visibility so we only animate when useful
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target !== el) continue;
          if (e.isIntersecting) {
            active = true;
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(tick);
          } else {
            active = false;
          }
        }
      },
      {
        root: null,
        rootMargin: "-30% 0% -30% 0%",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // first paint position
    currentX = computeTargetX();
    el.style.setProperty("--slide-x", `${currentX}px`);
    io.observe(el);

    // reflow on resize
    const onResize = () => {
      currentX = computeTargetX();
      el.style.setProperty("--slide-x", `${currentX}px`);
      if (active) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    // cleanup
    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [direction, distance, start, end, clamp, ease, lerp]);

  return { ref };
}
