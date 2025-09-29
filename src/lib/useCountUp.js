import { useEffect, useRef, useState } from "react";

/**
 * count up from 0 to target using rAF + ease-out cubic
 * - starts on mount
 * - respects prefers-reduced-motion
 */
export function useCountUp(target = 0, duration = 1800) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const to = Number.isFinite(+target) ? +target : 0;
    const from = 0;

    // snap if reduced motion or non-positive duration
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || duration <= 0) {
      setVal(Math.round(to));
      return;
    }

    let raf = 0;
    let start;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (ts) => {
      if (start === undefined) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = easeOutCubic(p);
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return { ref, val };
}
