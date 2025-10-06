import Reveal from "@ui/Reveal";
import DecorativeDots from "@ui/DecorativeDots";

import logoLinkAfrica from "@assets/logos/link-africa.svg";
import logoThree6Five from "@assets/logos/three6five.svg";
import logoAllied from "@assets/logos/allied.svg";
import logoComsol from "@assets/logos/comsol.svg";
import logoTenet from "@assets/logos/tenet.svg";
import logoMTN from "@assets/logos/mtn.svg";
import logoITEC from "@assets/logos/itec.svg";
import logoVodacom from "@assets/logos/vodacom.svg";
import logoVoc from "@assets/logos/vox.svg";

import { useEffect, useMemo, useRef, useState } from "react";

// defaults
const DEFAULT_LOGOS = [
  { src: logoLinkAfrica, alt: "Link Africa", href: "https://www.linkafrica.co.za/" },
  { src: logoThree6Five, alt: "three6five", href: "https://www.three6five.com/" },
  { src: logoAllied, alt: "Allied Telesis", href: "https://www.alliedtelesis.com/" },
  { src: logoComsol, alt: "Comsol", href: "https://www.comsol.co.za/" },
  { src: logoMTN, alt: "MTN", href: "https://www.mtn.co.za/" },
  { src: logoTenet, alt: "TENET", href: "https://tenet.ac.za/" },
  { src: logoITEC, alt: "ITEC", href: "https://itec.co.za/" },
  { src: logoVodacom, alt: "Vodacom", href: "https://www.vodacom.co.za/" },
  { src: logoVoc, alt: "Vox", href: "https://www.vox.co.za/" },
];

export default function WhoTrustUs({
  title = "Who trusts us",
  eyebrow = "INDUSTRY LEADERS",
  logos,
  className = "",
  linkTarget = "_blank",
}) {
  const data = logos?.length ? logos : DEFAULT_LOGOS;

  return (
    <section className={`section ${className}`}>
      <div className="container-narrow text-center">
        <DecorativeDots />
        <Reveal direction="down" duration={1200} distance={20}>
          <div className="eyebrow tracking-[.25em] text-white/70">{eyebrow}</div>
        </Reveal>
        <Reveal direction="down" duration={2400} distance={20}>
          <h2 className="h2 mt-3 font-bold tracking-tight text-[44px]">{title}</h2>
        </Reveal>
      </div>

      {/* full-bleed marquee */}
      <div className="mt-10 px-6 md:px-12 xl:px-20">
        <LogoMarquee
          items={data}
          speedPxPerSec={24} 
          gapPx={48}
          fadeSizePx={96}
          linkTarget={linkTarget}
          pauseOnHover
          slotWidth={180}
          slotHeight={56}
          slotPad={8}
        />
      </div>
    </section>
  );
}

function LogoMarquee({
  items,
  gapPx = 50,
  speedPxPerSec = 80,
  linkTarget = "_blank",
  fadeSizePx = 120,
  pauseOnHover = false,
  slotWidth = 180,
  slotHeight = 56,
  slotPad = 8,
}) {
  const baseRow = useMemo(() => items.map((x, i) => ({ ...x, _k: `r0-${i}` })), [items]);
  const rootRef = useRef(null);
  const rowRef = useRef(null);

  const [duration, setDuration] = useState(30);
  const [cloneCount, setCloneCount] = useState(3);

  useEffect(() => {
    const root = rootRef.current;
    const row = rowRef.current;
    if (!root || !row) return;

    const measure = () => {
      const rowWidth = row.scrollWidth || 1;
      const viewW = root.clientWidth || window.innerWidth || 1;

      // how many clones to cover viewport (plus one for seamless loop)
      const needed = Math.ceil((viewW + rowWidth) / rowWidth) + 1;
      setCloneCount(needed);

      const pxPerSec = Math.max(5, speedPxPerSec);
      setDuration(rowWidth / pxPerSec);

      root.style.setProperty("--row-w", `${rowWidth}px`);
      root.style.setProperty("--track-w", `${rowWidth * needed}px`);
      root.style.setProperty("--fade", `${fadeSizePx}px`);
    };

    measure();

    // ResizeObserver (fallback to window resize if missing)
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(row);
    } else {
      window.addEventListener("resize", measure);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", measure);
    };
  }, [speedPxPerSec, fadeSizePx, items.length]);

  const rows = useMemo(
    () =>
      Array.from({ length: cloneCount }, (_, i) =>
        baseRow.map((x, j) => ({ ...x, _k: `r${i}-${j}` })),
      ),
    [baseRow, cloneCount]
  );

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden ${pauseOnHover ? "marquee" : ""}`}
      style={{
        // transparency fade that blends with any bg
        WebkitMaskImage: `linear-gradient(to right,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0.20) calc(var(--fade) * 0.40),
          rgba(0,0,0,0.55) calc(var(--fade) * 0.75),
          rgba(0,0,0,1.0)   calc(var(--fade) + 1px),
          rgba(0,0,0,1.0)   calc(100% - var(--fade) - 1px),
          rgba(0,0,0,0.55)  calc(100% - var(--fade) * 0.75),
          rgba(0,0,0,0.20)  calc(100% - var(--fade) * 0.40),
          rgba(0,0,0,0) 100%)`,
        maskImage: `linear-gradient(to right,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0.20) calc(var(--fade) * 0.40),
          rgba(0,0,0,0.55) calc(var(--fade) * 0.75),
          rgba(0,0,0,1.0)   calc(var(--fade) + 1px),
          rgba(0,0,0,1.0)   calc(100% - var(--fade) - 1px),
          rgba(0,0,0,0.55)  calc(100% - var(--fade) * 0.75),
          rgba(0,0,0,0.20)  calc(100% - var(--fade) * 0.40),
          rgba(0,0,0,0) 100%)`,
      }}
    >
      <style>{`
        /* move exactly one row-width per cycle */
        @keyframes marquee-left {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(calc(var(--row-w) * -1), 0, 0); }
        }

        /* CSS controls play/pause via custom property (no inline override) */
        .marquee { --animState: running; }
        .marquee:hover { --animState: paused; }

        /* accessibility: respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee { --animState: paused; }
        }
      `}</style>

      <div
        className="flex will-change-transform marquee-track"
        style={{
          width: "var(--track-w)",
          animationName: "marquee-left",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: "var(--animState, running)",
        }}
      >
        {rows.map((rowData, i) => (
          <LogoRow
            key={`row-${i}`}
            data={rowData}
            innerRef={i === 0 ? rowRef : null}
            gapPx={gapPx}
            linkTarget={linkTarget}
            slotWidth={slotWidth}
            slotHeight={slotHeight}
            slotPad={slotPad}
            style={{ width: "var(--row-w)", flex: "0 0 var(--row-w)" }}
          />
        ))}
      </div>
    </div>
  );
}

function LogoRow({
  data,
  innerRef,
  gapPx,
  linkTarget,
  style,
  slotWidth = 180,
  slotHeight = 56,
  slotPad = 8,
}) {
  // normalize ref so React always receives a valid ref or nothing
  const setRef = (el) => {
    if (!innerRef) return;
    if (typeof innerRef === "function") innerRef(el);
    else if (typeof innerRef === "object") innerRef.current = el;
  };

  return (
    <ul
      ref={setRef}
      className="m-0 flex flex-nowrap items-center list-none p-0"
      style={{
        ...style,
        gap: `${gapPx}px`,
        paddingRight: `${gapPx}px`,
      }}
    >
      {data.map(({ src, alt, href, _k }) => {
        const label = alt || "logo";
        const content = (
          <div
            className="flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            style={{
              width: `${slotWidth}px`,
              height: `${slotHeight}px`,
              padding: `${slotPad}px`,
              boxSizing: "border-box",
            }}
          >
            <img
              src={src}
              alt={label}
              loading="lazy"
              className="block object-contain"
              style={{
                maxWidth: `calc(${slotWidth}px - ${slotPad * 2}px)`,
                maxHeight: `calc(${slotHeight}px - ${slotPad * 2}px)`,
                width: "auto",
                height: "auto",
              }}
            />
          </div>
        );
        return (
          <li key={_k} className="shrink-0 flex items-center">
            {href ? (
              <a
                href={href}
                target={linkTarget}
                rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                className="block"
              >
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}
