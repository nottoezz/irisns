// imports
import { useCountUp } from "../../lib/useCountUp.js";
import Reveal from "../Reveal.jsx";
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

  return (
    <div
      className={`relative rounded-full aspect-square w-[280px] md:w-[320px] lg:w-[360px] flex items-center justify-center ${className}`}
    >
      {/* glass bg */}
      <div className="absolute inset-0 rounded-full backdrop-blur-[10px] bg-transparent ring-1 ring-white/10" />

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
          <Reveal direction="left" duration={1000} distance={40} delay={100}>
            <div className="mt-2 text-[10px] md:text-xs tracking-[.25em] text-white/70 uppercase">
              {label}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
