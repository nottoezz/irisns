import React from "react";
import Reveal from "@ui/Reveal";

/**
 * carousel — fade between slides (no layout shift)
 *
 * props:
 * - slides: reactnode[] (required)
 * - initialIndex?: number (default 0)
 * - auto?: number | false  (ms; e.g. 7000; false disables)
 * - onChange?: (i:number)=>void
 * - className?: string
 * - minHeightClass?: string (tailwind class for fixed height)
 * - dotVariant?: "pill" | "dot" (default "pill")
 * - alignDots?: "start" | "center" | "end" (default "center")
 * - revealProps?: false | { direction?: string; duration?: number; distance?: number; delay?: number }
 * - dotsMarginClass?: string  (default "mt-3") controls spacing above the dots
 */
export default function Carousel({
  slides,
  initialIndex = 0,
  auto = false,
  onChange,
  className = "",
  minHeightClass = "min-h-[10.5rem]",
  dotVariant = "pill",
  alignDots = "center",
  revealProps = { direction: "down", duration: 2800, distance: 20, delay: 0 },
  dotsMarginClass = "mt-3",
}) {
  const [i, setI] = React.useState(initialIndex);
  const [paused, setPaused] = React.useState(false);

  // respect reduced-motion for autoplay
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const autoMs = prefersReducedMotion ? false : auto;

  const wrap = React.useCallback(
    (n) => (n + slides.length) % slides.length,
    [slides.length]
  );

  const go = React.useCallback(
    (n) => {
      const idx = wrap(n);
      setI(idx);
      onChange?.(idx);
    },
    [onChange, wrap]
  );

  // autoplay
  React.useEffect(() => {
    if (!autoMs || paused) return;
    const id = setInterval(() => go(i + 1), autoMs);
    return () => clearInterval(id);
  }, [autoMs, paused, i, go]);

  // keyboard
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(i + 1);
    if (e.key === "ArrowLeft") go(i - 1);
  };

  // simple touch swipe
  const touch = React.useRef({ x: 0, y: 0, active: false });
  const onTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    touch.current = { x: t.clientX, y: t.clientY, active: true };
  };
  const onTouchEnd = (e) => {
    if (!touch.current.active) return;
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - touch.current.x;
    const dy = Math.abs(t.clientY - touch.current.y);
    touch.current.active = false;
    if (Math.abs(dx) > 40 && dy < 60) go(i + (dx < 0 ? 1 : -1));
  };

  const alignClass =
    alignDots === "start"
      ? "justify-start"
      : alignDots === "end"
      ? "justify-end"
      : "justify-center";

  const multiPage = slides.length > 1;

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="carousel"
      aria-live="polite"
      className={`relative ${className}`}
    >
      {/* slide stage */}
      <div className={`relative ${minHeightClass}`}>
        {slides.map((node, idx) => {
          const isActive = idx === i;
          const shouldReveal = revealProps !== false && isActive;
          const content = shouldReveal ? (
            <Reveal
              direction={revealProps.direction ?? "down"}
              duration={revealProps.duration ?? 2800}
              distance={revealProps.distance ?? 20}
              delay={revealProps.delay ?? 0}
            >
              {node}
            </Reveal>
          ) : (
            node
          );

          return (
            <div
              key={idx}
              id={`carousel-slide-${idx}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`slide ${idx + 1} of ${slides.length}`}
              className={`absolute inset-0 transition-opacity duration-500 ${
                idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{ willChange: 'opacity' }}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* dots */}
      {multiPage && (
        <div
          className={`${dotsMarginClass} w-full flex ${alignClass} items-center gap-2`}
          role="tablist"
          aria-label="slide selector"
        >
          {slides.map((_, idx) => {
            const active = i === idx;
            const pillActive = "w-6 h-2 bg-white shadow-[0_0_0_1px_rgba(255,255,255,.18)_inset]";
            const pillIdle   = "w-3 h-2 bg-white/35 hover:bg-white/60";
            const dotActive  = "w-3 h-3 bg-white/90";
            const dotIdle    = "w-3 h-3 bg-white/40 hover:bg-white/60";

            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`carousel-slide-${idx}`}
                onClick={() => go(idx)}
                className={[
                  "rounded-full transition cursor-pointer",
                  "focus:outline-none focus:ring-1 focus:ring-white/40",
                  dotVariant === "pill"
                    ? active ? pillActive : pillIdle
                    : active ? dotActive : dotIdle,
                ].join(" ")}
                title={`Show slide ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
