// imports
import Reveal from "@ui/Reveal";
import DecorativeDots from "@ui/DecorativeDots";

// built-in logos (adjust paths if your layout differs)
import logoLinkAfrica from "@assets/logos/link-africa.png";
import logoThree6Five from "@assets/logos/three6five.png";
import logoAllied from "@assets/logos/allied.png";
import logoComsol from "@assets/logos/comsol.png";
import logoTenet from "@assets/logos/tenet.png";
import logoMTN from "@assets/logos/mtnLogo.png";
import logoITEC from "@assets/logos/itecWhiteLogo.svg";
import logoVodacom from "@assets/logos/vodacomWhiteLogo.svg";
import logoVoc from "@assets/logos/voxTelecomLogo.svg";

import { useEffect, useMemo, useRef, useState } from "react";

// default set if no `logos` prop is provided
const DEFAULT_LOGOS = [
  {
    src: logoLinkAfrica,
    alt: "Link Africa",
    href: "https://www.linkafrica.co.za/",
  },
  {
    src: logoThree6Five,
    alt: "three6five",
    href: "https://www.three6five.com/",
  },
  {
    src: logoAllied,
    alt: "Allied Telesis",
    href: "https://www.alliedtelesis.com/",
  },
  { src: logoComsol, alt: "Comsol", href: "https://www.comsol.co.za/" },
  { src: logoMTN, alt: "MTN", href: "gttps://www.mtn.co.za/" },
  { src: logoTenet, alt: "TENET", href: "https://tenet.ac.za/" },
  { src: logoITEC, alt: "Itec", href: "https://tenet.ac.za/" },
  { src: logoVodacom, alt: "Itec", href: "https://tenet.ac.za/" },
  { src: logoVoc, alt: "Itec", href: "https://tenet.ac.za/" },
];

/**
 * who trusts us
 * props:
 * - title?: string
 * - eyebrow?: string
 * - logos?: Array<{ src: string; alt?: string; href?: string }>
 * - className?: string
 * - linkTarget?: "_self" | "_blank"
 */
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
        {/* decorative dots */}
        <DecorativeDots />

        {/* heading */}
        <Reveal direction="down" duration={1200} distance={20}>
          <div className="eyebrow tracking-[.25em] text-white/70">
            {eyebrow}
          </div>
        </Reveal>
        <Reveal direction="down" duration={2400} distance={20}>
          <h2 className="h2 mt-3 font-bold tracking-tight text-[44px]">
            {title}
          </h2>
        </Reveal>
      </div>

      {/* full-bleed marquee  */}
      <div className="mt-10 px-6 md:px-12 xl:px-20">
        <LogoMarquee
          items={data}
          speedPxPerSec={50}
          gapPx={55}
          fadeSizePx={120}
          linkTarget={linkTarget}
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
}) {
  const baseRow = useMemo(
    () => items.map((x, i) => ({ ...x, _k: `r0-${i}` })),
    [items]
  );
  const rootRef = useRef(null);
  const rowRef = useRef(null);

  const [duration, setDuration] = useState(30);
  const [cloneCount, setCloneCount] = useState(3);

  useEffect(() => {
    const root = rootRef.current;
    const row = rowRef.current;
    if (!root || !row) return;

    const measure = () => {
      const rowWidth = row.scrollWidth;
      const viewW = root.clientWidth || window.innerWidth || 1;

      const needed = Math.ceil((viewW + rowWidth) / rowWidth) + 1;
      setCloneCount(needed);

      const pxPerSec = Math.max(10, speedPxPerSec);
      setDuration(rowWidth / pxPerSec);

      root.style.setProperty("--row-w", `${rowWidth}px`);
      root.style.setProperty("--track-w", `${rowWidth * needed}px`);
      root.style.setProperty("--fade", `${fadeSizePx}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const onRM = () =>
      root.style.setProperty("--paused", media.matches ? "paused" : "running");
    media?.addEventListener?.("change", onRM);
    onRM();

    return () => {
      ro.disconnect();
      media?.removeEventListener?.("change", onRM);
    };
  }, [speedPxPerSec, fadeSizePx, items.length]);

  const rows = useMemo(() => {
    return Array.from({ length: cloneCount }, (_, i) =>
      baseRow.map((x, j) => ({ ...x, _k: `r${i}-${j}` }))
    );
  }, [baseRow, cloneCount]);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden"
      style={{
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
        /* translate exactly one row width per cycle (the pattern then repeats) */
        @keyframes marquee-left {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(calc(var(--row-w) * -1), 0, 0); }
        }
      `}</style>

      <div
        className="flex will-change-transform"
        style={{
          width: "var(--track-w)",
          animationName: "marquee-left",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: "var(--paused, running)",
        }}
      >
        {rows.map((rowData, i) => (
          <LogoRow
            key={`row-${i}`}
            data={rowData}
            innerRef={i === 0 ? rowRef : undefined}
            gapPx={gapPx}
            linkTarget={linkTarget}
            style={{ width: "var(--row-w)", flex: "0 0 var(--row-w)" }}
          />
        ))}
      </div>
    </div>
  );
}

function LogoRow({ data, innerRef, gapPx, linkTarget, style }) {
  const BOX_W = 180;
  const BOX_H = 56;

  return (
    <ul
      ref={innerRef}
      className="flex flex-nowrap items-center"
      style={{ ...style, columnGap: `${gapPx}px` }}
    >
      {data.map(({ src, alt, href, _k }) => {
        const label = alt || "logo";
        const content = (
          <div
            className="flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            style={{ width: BOX_W, height: BOX_H }}
          >
            <img
              src={src}
              alt={label}
              loading="lazy"
              className="block max-w-full max-h-full object-contain"
            />
          </div>
        );
        return (
          <li key={_k} className="shrink-0 flex items-center">
            {href ? (
              <a
                href={href}
                target={linkTarget}
                rel={
                  linkTarget === "_blank" ? "noopener noreferrer" : undefined
                }
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

