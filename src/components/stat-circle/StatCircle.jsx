// imports
import { useCountUp } from "../../lib/useCountUp.js";
import Reveal from "../Reveal.jsx";
import { useReveal } from "../../lib/useReveal.js";
import StatCircleNumber from "./StatCircleNumber.jsx";

export default function StatCircle({
  label,
  value,
  suffix,
  plus = false,
  plusIcon,
  plusIconWidthCh,
  unit,
  unitSide = "right",
  reserveChars,
  className = "",
  contentClassName = "",
  moveDown = true,
}) {
  const { ref, val } = useCountUp(value, 2000);
  const { ref: containerRef, visible: glassVisible } = useReveal({ once: true });

  const glassStyle = {
    opacity: glassVisible ? 1 : 0,
    backdropFilter: glassVisible ? "blur(10px)" : "blur(0px)",
    WebkitBackdropFilter: glassVisible ? "blur(10px)" : "blur(0px)",
    transition:
      "opacity 1000ms ease 800ms, -webkit-backdrop-filter 1000ms ease 800ms, backdrop-filter 1000ms ease 800ms",
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-full aspect-square w-[280px] md:w-[320px] lg:w-[360px] flex items-center justify-center ${className}`}
    >
      {/* glass bg */}
      <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
      <div
        className="absolute inset-0 rounded-full bg-transparent"
        style={glassStyle}
      />

      {/* content */}
      <div
        className={`relative z-10 text-center text-white ${
          moveDown ? "translate-y-[2px] md:translate-y-[3px]" : ""
        } ${contentClassName}`}
      >
        <StatCircleNumber
          valNodeRef={ref}
          displayValue={val}
          plus={plus}
          plusIcon={plusIcon}
          plusIconWidthCh={plusIconWidthCh}
          suffix={suffix}
          unit={unit}
          unitSide={unitSide}
          reserveChars={reserveChars}
        />

        {label && (
          <Reveal direction="left" duration={3000} distance={40} delay={100}>
            <div className="mt-2 text-[10px] md:text-xs tracking-[.25em] text-white/70 uppercase">
              {label}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

