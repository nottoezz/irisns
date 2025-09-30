// imports
import React from "react";
import { useReveal } from "../lib/useReveal";

/**
 * Props:
 * - direction: 'left' | 'right' | 'up' | 'down' (default 'up')
 * - duration: number (ms) e.g. 1600
 * - distance: number (px) e.g. 120
 * - delay: number (ms)
 * - as: element tag (default 'div')
 * - className: extra classes
 * - once: boolean (default true)
 */
export default function Reveal({
  direction = "up",
  duration = 1000,
  distance = 80,
  delay = 0,
  as: Tag = "div",
  className = "",
  once = true,
  children,
  ...rest
}) {
  const { ref, visible } = useReveal({ once });

  // compute offsets based on direction + distance
  const shift = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: -distance },
    down: { x: 0, y: distance },
  }[direction] || { x: 0, y: -distance };

  const styleVars = {
    "--reveal-x": `${shift.x}px`,
    "--reveal-y": `${shift.y}px`,
    "--reveal-dur": `${duration}ms`,
    "--reveal-delay": `${delay}ms`,
  };

  return (
    React.createElement(
      Tag,
      {
        ref,
        style: styleVars,
        className: ["reveal", visible ? "is-visible" : "", className]
          .join(" ")
          .trim(),
        ...rest,
      },
      children
    )
  );
}
