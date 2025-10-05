import { Link } from "react-router-dom";

import Reveal from "@ui/Reveal";
import DecorativeDots from "@ui/DecorativeDots";

const alignmentMap = {
  left: {
    container: "text-left",
    body: "",
    actions: "justify-start",
  },
  center: {
    container: "text-center",
    body: "mx-auto",
    actions: "justify-center",
  },
  right: {
    container: "text-right",
    body: "ml-auto",
    actions: "justify-end",
  },
};

const slugify = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || undefined;

export default function ReadyToSeeSection({
  heading,
  productName,
  description,
  ctaLabel = "Request a Demo",
  ctaTo = "/contact",
  align = "center",
  headingId,
  className = "",
}) {
  const resolvedHeading =
    heading ??
    (productName ? `Ready to see ${productName} in action?` : "Ready to see Iris in action?");

  const alignment = alignmentMap[align] ?? alignmentMap.center;
  const resolvedHeadingId = headingId ?? slugify(resolvedHeading);

  return (
    <section
      className={["relative overflow-hidden py-14 md:py-18", className].filter(Boolean).join(" ")}
      aria-labelledby={resolvedHeadingId}
    >
      <DecorativeDots/>
      <div className={["container mx-auto px-6 lg:px-8", alignment.container].join(" ")}>
        <Reveal direction="down" duration={2000} distance={12}>
          <h2 id={resolvedHeadingId} className="text-3xl font-extrabold md:text-4xl">
            {resolvedHeading}
          </h2>
        </Reveal>
        {description ? (
          <Reveal direction="down" duration={2000} distance={12} delay={90}>
            <p
              className={[
                "mt-4 max-w-[68ch] text-white/80 leading-relaxed",
                alignment.body,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {description}
            </p>
          </Reveal>
        ) : null}
        <Reveal direction="down" duration={2000} distance={10} delay={160}>
          <div className={["mt-5 flex flex-wrap gap-3", alignment.actions].join(" ")}>
            <Link to={ctaTo} className="btn btn-blue">
              {ctaLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
