import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SCROLLER_SELECTOR = ".scroller";

function isScrollable(el) {
  if (!el) return false;
  const style = getComputedStyle(el);
  if (!style) return false;
  const overflowY = style.overflowY;
  const canScrollY = el.scrollHeight > el.clientHeight + 1;
  const scrollableValues = new Set(["auto", "scroll", "overlay"]);
  return scrollableValues.has(overflowY) && canScrollY;
}

function findScrollTarget() {
  if (typeof document === "undefined") return null;

  const candidates = [
    document.querySelector(SCROLLER_SELECTOR),
    document.querySelector("main"),
    document.getElementById("app"),
    document.getElementById("root")?.parentElement,
    document.documentElement,
    document.body,
  ].filter(Boolean);

  for (const el of candidates) {
    if (isScrollable(el)) {
      return el;
    }
  }

  return window;
}

function resetScroll(target) {
  if (!target) return;
  if (typeof target.scrollTo === "function") {
    try {
      target.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    } catch {
      // ignore - fallback to direct assignment
    }
  }

  if (typeof target.scrollTop === "number") {
    target.scrollTop = 0;
  }
  if (typeof target.scrollLeft === "number") {
    target.scrollLeft = 0;
  }
}

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      return;
    }

    const raf = requestAnimationFrame(() => {
      const target = findScrollTarget();
      resetScroll(target);
      if (target !== window) {
        resetScroll(window);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.search, location.hash]);

  return null;
}


