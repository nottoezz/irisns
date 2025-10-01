import { useEffect, useRef, useState } from "react";

/**
 * reveal-on-scroll using intersection observer
 * - adds visibility state when element enters viewport
 * - supports one-time or repeat reveals
 */
export function useReveal({
  once = true,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.15,
} = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    // no element or no io: show immediately
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // defer one frame so initial styles paint first
          requestAnimationFrame(() => setVisible(true));
          if (once) io.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { root: null, rootMargin, threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, visible };
}
