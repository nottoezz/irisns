// imports
import Reveal from "./Reveal";

// built-in logos (adjust paths if your layout differs)
import logoLinkAfrica from "../assets/logos/link-africa.png";
import logoThree6Five from "../assets/logos/three6five.png";
import logoAllied from "../assets/logos/allied.png";
import logoComsol from "../assets/logos/comsol.png";
import logoTenet from "../assets/logos/tenet.png";

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
  { src: logoTenet, alt: "TENET", href: "https://tenet.ac.za/" },
];

/**
 * who trust us
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
        {/* small decorative dots */}
        <Reveal direction="down" duration={1400} distance={20} delay={100}>
          <div className="mt-5 mx-auto mb-4 h-1 w-1 rounded-full bg-blue-600 opacity-33" />
        </Reveal>
        <Reveal direction="down" duration={1800} distance={20} delay={200}>
          <div className="mt-[-0.5rem] mx-auto mb-4 h-1 w-1 rounded-full bg-blue-600 opacity-66" />
        </Reveal>
        <Reveal direction="down" duration={2200} distance={20} delay={300}>
          <div className="mt-[-0.5rem] mx-auto mb-4 h-1 w-1 rounded-full bg-blue-600 opacity-100" />
        </Reveal>

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

      {/* logo row */}
      <div className="container-narrow mt-10">
        <Reveal direction="down" duration={2400} distance={30} delay={100}>
          <ul className="flex flex-nowrap items-center justify-center gap-x-12 overflow-x-auto md:overflow-visible">
            {data.map(({ src, alt, href }, i) => {
              const label = alt || "logo";
              const img = (
                <img
                  src={src}
                  alt={label}
                  className="h-8 md:h-10 w-auto object-contain opacity-60 transition-opacity hover:opacity-80"
                  loading="lazy"
                />
              );
              return (
                <li
                  key={`${label}-${i}`}
                  className="shrink-0 h-12 w-[150px] flex items-center justify-center"
                >
                  {href ? (
                    <a
                      href={href}
                      target={linkTarget}
                      rel={
                        linkTarget === "_blank"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-label={label}
                      title={label}
                    >
                      {img}
                    </a>
                  ) : (
                    img
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
