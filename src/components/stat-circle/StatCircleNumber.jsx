import Reveal from "../Reveal";

export default function StatCircleNumber({
  valNodeRef,
  displayValue,
  plus = false,
  plusIcon,
  plusIconWidthCh = 1.2,
  unit,
  unitSide = "right",
  downBiasPct = 56,
  reserveChars,
}) {
  const computedChars =
    reserveChars ?? String(Math.max(0, displayValue)).length;
  const minCh = Math.max(computedChars, 2);
  const reservePlus = plus && plusIcon ? plusIconWidthCh : 0;
  const numberTextClasses = `
    text-[64px] md:text-[72px] font-extrabold leading-none
    tabular-nums [font-variant-numeric:tabular-nums]
    text-center whitespace-nowrap
  `;

  return (
    <div className="relative inline-flex items-baseline justify-center">
      {/* number block contatiner */}
      <div
        className="relative inline-block align-baseline"
        style={{ minWidth: `calc(${minCh}ch + ${reservePlus}ch)` }}
      >
        {/* lock for digits + value */}
        <span
          aria-hidden
          className={`invisible select-none ${numberTextClasses}`}
        >
          {"0".repeat(minCh)}
        </span>
        {reservePlus ? (
          <span
            aria-hidden
            className="invisible inline-block align-baseline"
            style={{ width: `${plusIconWidthCh}ch` }}
          />
        ) : null}

        {/* live layer */}
        <span
          className={`absolute left-0 top-0 w-full ${numberTextClasses} pointer-events-none`}
        >
          {/* number */}
          <Reveal direction="up" duration={1000} distance={20} delay={200}>
            <span
              ref={valNodeRef}
              className="inline-block align-baseline"
              style={{
                paddingRight: reservePlus ? `${plusIconWidthCh}ch` : undefined,
              }}
            >
              {displayValue}
            </span>
          </Reveal>

          {/* anchored icon */}
          <Reveal direction="down" duration={1000} distance={40} delay={100}>
            {plus ? (
              plusIcon ? (
                <span
                  className="absolute -translate-y-17 right-0 inline-flex items-center justify-center pointer-events-none"
                  aria-hidden
                  style={{ width: `${plusIconWidthCh}ch`, lineHeight: 1 }}
                >
                  {plusIcon}
                </span>
              ) : null
            ) : null}
          </Reveal>
        </span>
      </div>

      {/* side unit */}
      <Reveal direction="down" duration={1000} distance={40} delay={100}>
        {unit ? (
          <span
            aria-hidden
            className={`
            absolute -translate-y-7
            text-[10px] md:text-[12px] uppercase text-white/80
            ${
              unitSide === "left"
                ? "-left-6 md:-left-7"
                : "-right-6 md:-right-7"
            }
          `}
            style={{
              top: `${downBiasPct}%`,
              writingMode: "vertical-rl",
              transform: "translateY(-50%) rotate(180deg)",
              lineHeight: 1,
              letterSpacing: "0.35em",
            }}
          >
            {unit}
          </span>
        ) : null}
      </Reveal>
    </div>
  );
}
