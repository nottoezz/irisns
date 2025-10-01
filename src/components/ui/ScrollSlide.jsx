// imports
import React from "react";
import { useScrollSlide } from "../../hooks/useScrollSlide";

/**
 * scroll-slide
 * - light wrapper that writes --slide-x via the hook
 * - transform + will-change come from your global css ([data-scroll-slide])
 */
export default function ScrollSlide({
  direction = "left",
  distance = "200px",
  start = -0.1,
  end = 0.8,
  clamp = true,
  ease,
  lerp = 0.15,
  as: Tag = "div",
  className = "",
  style,
  children,
  ...rest
}) {
  const { ref } = useScrollSlide({ direction, distance, start, end, clamp, ease, lerp });

  // only set the var; let global css handle the transform
  const styleVars = { "--slide-x": "0px", ...style };

  return React.createElement(
    Tag,
    { ref, "data-scroll-slide": "", className, style: styleVars, ...rest },
    children
  );
}
