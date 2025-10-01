// imports
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Reveal from "@ui/Reveal";

function buildCardConfig({ trainingHref, kbHref }) {
  return [
    {
      key: "training",
      title: "Iris Training",
      copy:
        "Tools, tips, videos and training material for all types of users.",
      cta: "View",
      href: trainingHref,
      direction: "left",
    },
    {
      key: "knowledge-base",
      title: "Knowledge Base",
      copy:
        "Access the Iris knowledge base with regex cheatsheets, release notes and solution articles.",
      cta: "View",
      href: kbHref,
      direction: "right",
    },
  ];
}

function CardLink({ href, className, children }) {
  const isExternal = /^https?:/i.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * NeedAssistance
 * Reusable CTA section for Training + Knowledge Base.
 *
 * Props (all optional):
 * - id: string (dom id)
 * - className: string (extra classes on the root <section>)
 * - eyebrow: string
 * - title: string
 * - trainingHref: string
 * - kbHref: string
 */
export default function NeedAssistance({
  id = "need-assistance",
  className = "",
  eyebrow = "WE CAN HELP",
  title = "Need assistance?",
  trainingHref = "https://support.irisns.com/support/login",
  kbHref = "https://support.irisns.com/support/login",
}) {
  const cards = useMemo(
    () => buildCardConfig({ trainingHref, kbHref }),
    [trainingHref, kbHref]
  );

  return (
    <section id={id} className={["section", className].join(" ").trim()}>
      <div className="pb-40">
        <div className="container-narrow text-center">
          {/* dots */}
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
          <Reveal direction="down" duration={2400} distance={20} delay={100}>
            <div className="eyebrow tracking-[.25em] text-white/70">
              {eyebrow}
            </div>
          </Reveal>
          <Reveal direction="down" duration={2400} distance={20} delay={100}>
            <h2 className="h2 text-[44px] font-bold tracking-tight mt-3">
              {title}
            </h2>
          </Reveal>
        </div>

        {/* cards */}
        <div className="container-narrow mt-12">
          <div className="grid gap-10 lg:grid-cols-2">
            {cards.map((card) => (
              <Reveal
                key={card.key}
                direction={card.direction}
                duration={3200}
                distance={20}
              >
                <article className="flex flex-col h-full">
                  <CardLink
                    href={card.href}
                    className="group h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
                  >
                    <div className="text-white/85 font-medium">{card.title}</div>
                    <div className="mt-3 h-px w-full bg-white/20 transition-colors group-hover:bg-[#2f81f7]" />
                    <p className="mt-6 text-2xl sm:text-3xl leading-tight font-semibold text-white/75 transition-colors group-hover:text-white">
                      {card.copy}
                    </p>

                    <div className="mt-auto pt-10 flex items-center w-full">
                      <span className="text-lg md:text-xl text-white/80 transition-colors group-hover:text-white">
                        {card.cta}
                      </span>
                      <svg
                        className="ml-auto h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-1 text-white/80 transition-colors group-hover:text-[#2f81f7]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 5 7 7-7 7" />
                      </svg>
                    </div>
                  </CardLink>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

