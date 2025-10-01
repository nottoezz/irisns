import Reveal from "@ui/Reveal";

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
      {/* number block container */}
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
          <Reveal
            as="span"
            direction="up"
            duration={3000}
            distance={20}
            delay={200}
            className="block"
          >
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
          {plus && plusIcon ? (
            <Reveal
              as="span"
              direction="down"
              duration={3000}
              distance={40}
              delay={100}
              className="block"
            >
              <span
                aria-hidden
                className="absolute pt-4 right-0 top-0 flex justify-center pointer-events-none"
                style={{
                  width: `${plusIconWidthCh}ch`,
                  lineHeight: 1,
                }}
              >
                <span
                  className="flex w-full items-center justify-center pointer-events-none"
                  style={{ transform: "translateY(-17px)" }}
                >
                  {plusIcon}
                </span>
              </span>
            </Reveal>
          ) : null}
        </span>
      </div>

      {/* side unit */}
      {unit ? (
        <Reveal
          as="span"
          direction="down"
          duration={3000}
          distance={40}
          delay={100}
          className="block pointer-events-none"
        >
          <span
            aria-hidden
            className={`absolute pointer-events-none -translate-y-2 ${
              unitSide === "left"
                ? "-left-6 md:-left-7"
                : "-right-6 md:-right-7"
            }`}
            style={{ top: `${downBiasPct}%` }}
          >
            <span
              className="inline-block text-[10px] md:text-[12px] uppercase text-white/80"
              style={{
                writingMode: "vertical-rl",
                transform: "translateY(-50%) rotate(180deg)",
                lineHeight: 1,
                letterSpacing: "0.35em",
              }}
            >
              {unit}
            </span>
          </span>
        </Reveal>
      ) : null}
    </div>
  );
}

