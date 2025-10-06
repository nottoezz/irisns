// imports
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Reveal from "@ui/Reveal";
import DecorativeDots from "@ui/DecorativeDots";

function buildCardConfig({ trainingHref, kbHref }) {
  return [
    {
      key: "training",
      title: "Iris Training",
      copy: "Tools, tips, videos and training material for all types of users.",
      cta: "View",
      href: trainingHref,
    },
    {
      key: "knowledge-base",
      title: "Knowledge Base",
      copy: "Access the Iris knowledge base with regex cheatsheets, release notes and solution articles.",
      cta: "View",
      href: kbHref,
    },
  ];
}

function CardLink({ href, className, children }) {
  const isExternal = /^https?:/i.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
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

const CARD_CLASSNAMES = [
  "group flex h-full flex-col",
  "rounded-2xl border border-white/12 bg-white/[.035]",
  "px-7 py-7 transition-colors duration-300",
  "shadow-[0_10px_26px_rgba(0,0,0,.18)]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25",
].join(" ");

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

  const shouldAnimate =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const Animate = ({ delay = 0, children }) =>
    shouldAnimate ? (
      <Reveal direction="down" duration={1600} distance={14} delay={delay}>
        {children}
      </Reveal>
    ) : (
      <>{children}</>
    );

  return (
    <section id={id} className={["section", className].join(" ").trim()}>
      <div className="py-15 md:py-15">
        <Animate>
          <div className="container-narrow text-center">
            <DecorativeDots />
            <div className="mt-6 text-xs uppercase tracking-[.25em] text-white/70">
              {eyebrow}
            </div>
            <h2 className="mt-3 text-[2.75rem] font-bold tracking-tight text-white">
              {title}
            </h2>
          </div>
        </Animate>

        <Animate delay={120}>
          <div className="container-narrow mt-10">
            <div className="grid gap-8 lg:grid-cols-2">
              {cards.map((card) => (
                <CardLink
                  key={card.key}
                  href={card.href}
                  className={CARD_CLASSNAMES}
                >
                  <span className="text-sm font-semibold tracking-wide text-white/80">
                    {card.title}
                  </span>
                  <p className="mt-5 text-2xl sm:text-[1.8rem] leading-snug font-semibold text-white/75 transition-colors group-hover:text-white">
                    {card.copy}
                  </p>
                  <span className="mt-6 block h-px w-full bg-white/15 transition-colors group-hover:bg-[#2f81f7]/80" />
                  <div className="mt-auto pt-8 flex items-center text-white/80 transition-colors group-hover:text-[#2f81f7]">
                    <span className="text-lg md:text-xl font-medium">
                      {card.cta}
                    </span>
                    <svg
                      className="ml-auto h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-1 transition-transform duration-300"
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
              ))}
            </div>
          </div>
        </Animate>
      </div>
    </section>
  );
}
