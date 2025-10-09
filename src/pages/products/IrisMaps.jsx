import React, { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

// UI
import Reveal from "@ui/Reveal";
import ScrollSlide from "@ui/ScrollSlide";
import Carousel from "@ui/Carousel";
import ColorBlooms from "@ui/ColorBlooms.jsx";
import NeedAssistance from "@features/NeedAssistance";
import ReadyToSeeSection from "@features/ReadyToSeeSection";
import Meta from "@/components/seo/Meta";

// Assets
import mapsHero from "@assets/img/irisMapsHero.webp";

const OPTIONS = [
  {
    n: "01",
    title: "Custom Network Reporting Maps",
    copy: "Tailor maps to suit your network’s specific reporting needs.",
  },
  {
    n: "02",
    title: "Configurable Custom Alerts",
    copy: "Set up custom alerts tailored to your unique environment.",
  },
  {
    n: "03",
    title: "User-Specific Map Saving",
    copy: "Save maps on a per-user basis for personalised reference.",
  },
  {
    n: "04",
    title: "Zoom and Focus",
    copy: "Zoom in and focus on specific areas of the network map for detailed examination.",
  },
  {
    n: "05",
    title: "Real-time Visual Updates",
    copy: "Experience near real-time visual updates directly from the dashboard.",
  },
];

const MAP_TYPES = [
  {
    n: "01",
    title: "Build a map from a View",
    copy: "Place devices or mnemonics from an existing view onto a map. GPS-enabled devices render on a Google Map by coordinates; logical maps are supported without GPS.",
    foot: "Automation Action: Automatically updated based on the data within the view.",
    bullets: [
      "Place devices/mnemonics from an existing View.",
      "GPS devices render on Google Maps via coordinates.",
      "Logical (non-GPS) maps auto-layout on canvas.",
    ],
  },
  {
    n: "02",
    title: "Build from a pre-created Topology",
    copy: "Use a Topology matrix to logically place nodes on a background. If GPS is available, generate a Google Map automatically.",
    foot: "Automation Action: Updated each time it’s opened, staying current with the Topology data.",
    bullets: [
      "Logical placement from Topology matrix.",
      "Create Google Map if GPS coordinates exist.",
    ],
  },
  {
    n: "03",
    title: "Build a map Manually",
    copy: "Manually add nodes to a logical Iris Map canvas or Google Map. Perfect for bespoke use-cases; less suited to highly dynamic segments.",
    foot: "Use Cases: Transit & Peering, International backbone, device clusters (e.g., SBCs or core routing nodes).",
    bullets: [
      "Manual node placement on logical or Google Map.",
      "Tailored formatting for specific scenarios.",
      "Prefer automated options for dynamic segments.",
    ],
  },
];

const Card = ({ n, title, copy, bullets, foot }) => (
  <article
    className={[
      "group h-full flex flex-col",
      "min-h-[460px] md:min-h-[440px] lg:min-h-[420px]",
      "rounded-2xl border border-white/10 bg-white/[.035]",
      "shadow-[0_12px_30px_rgba(0,0,0,.22)]",
      "px-7 py-7 relative overflow-hidden transition-all duration-500 lg:hover:-translate-y-1",
    ].join(" ")}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute -top-16 -right-20 h-56 w-56 rounded-full opacity-[.22] blur-2xl"
      style={{
        background:
          "radial-gradient(closest-side, rgba(59,130,246,.50), rgba(168,85,247,.22) 55%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-white/15 transition" />
    <div className="text-sm font-semibold text-blue-300">{n}</div>
    <h3 className="mt-1 text-[22px] leading-snug font-semibold">{title}</h3>
    <p className="mt-3 text-white/85 leading-relaxed">{copy}</p>

    {Array.isArray(bullets) && bullets.length > 0 && (
      <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    )}

    {foot && <p className="mt-3 text-white/75">{foot}</p>}
    <div className="mt-auto pt-2" />
  </article>
);

const chunk3 = (arr) =>
  arr.reduce(
    (acc, _, i) => (i % 3 === 0 ? acc.concat([arr.slice(i, i + 3)]) : acc),
    []
  );

const buildSlides = (items) =>
  chunk3(items).map((group, gi) => (
    <div key={gi} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {group.map((it, idx) => (
        <Reveal
          key={idx}
          direction="up"
          duration={900}
          distance={14}
          delay={idx * 60}
        >
          <Card {...it} />
        </Reveal>
      ))}
    </div>
  ));

export default function IrisMaps() {
  useEffect(() => {
    document.title = "Iris Maps - Iris Network Systems";
  }, []);

  const optionSlides = useMemo(() => buildSlides(OPTIONS), []);
  const mapTypeSlides = useMemo(() => buildSlides(MAP_TYPES), []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#111224] text-white">
      <Meta
        title="Iris Maps — Real-time Network Maps & Situational Awareness"
        description="Configurable, near real-time maps that visualize network health, alerts, and dependencies. Build from views, topology, or manually."
        canonical="auto"
      />

      {/* Blooms */}
      <ColorBlooms
              items={[
                { hue: "blue",color: "rgba(59,130,246,0.3)", size: 1000, top: "50%",  right: "60%", falloff: "84%", blurPx: 110 },
                { hue: "sky", color: "rgba(56,189,248,0.3)", size: 1200, top: "40%",  right: "-30%", falloff: "84%", blurPx: 110 },
                { hue: "violet", color: "rgba(168,85,247,0.3)", size: 1700, bottom: "4%", left: "65%", falloff: "84%", blurPx: 110 },
                { hue: "rose", color: "rgba(244,114,182,0.1)", size: 1500, bottom: "-6%", left: "48%", falloff: "84%", blurPx: 110 },
                { hue: "teal", color: "rgba(45,212,191,0.3)", size: 1300, top: "70%", right: "65%", falloff: "84%", blurPx: 110 },
              ]}
            />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#111224]" />
        <div className="relative z-10 mx-auto w-[min(1200px,92vw)] px-6 md:px-8 py-20 md:py-24 lg:py-32 text-center">
          <Reveal direction="down" duration={2000} distance={12}>
            <p className="mb-3 text-sm uppercase tracking-[.18em] text-white/70">
              Product
            </p>
          </Reveal>

          <ScrollSlide direction="down" distance={22}>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Iris Maps
            </h1>
          </ScrollSlide>

          <Reveal direction="down" duration={2000} distance={18} delay={200}>
            <p className="mx-auto mt-5 max-w-[70ch] text-white/85 md:text-lg leading-relaxed">
              Build living network diagrams that update as your environment
              changes. Iris Maps brings topology, GPS, and event context
              together so teams can see issues, understand impact, and act —
              fast.
            </p>
          </Reveal>

          <Reveal direction="down" duration={2000} distance={12} delay={340}>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn btn-blue">
                Request Demo
              </Link>
              <Link to="/about" className="btn btn-pill">
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="relative overflow-visible py-14 md:py-18">
        <div className="container mx-auto grid items-start gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8">
          <div>
            <Reveal direction="down" duration={2000} distance={14}>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
                Built for real-time network awareness
              </h2>
            </Reveal>
            <Reveal direction="down" duration={2000} distance={14} delay={90}>
              <p className="mt-5 max-w-[70ch] text-white/80 leading-relaxed">
                Iris Maps turns raw telemetry into intuitive visuals. Generate
                maps from views or topology, blend GPS and logical layouts, and
                overlay live status so engineers can troubleshoot in context.
                Role-based permissions and per-user views keep teams focused
                without losing the bigger picture.
              </p>
            </Reveal>
            <Reveal direction="down" duration={1800} distance={10} delay={160}>
              <ul className="mt-6 space-y-2 text-white/85">
                <li>
                  • <strong>Auto-curated layouts</strong> from Views or Topology
                  matrices.
                </li>
                <li>
                  • <strong>Live state</strong> with event/status overlays for
                  rapid triage.
                </li>
                <li>
                  • <strong>Flexible canvases</strong> — GPS maps or logical
                  diagrams.
                </li>
                <li>
                  • <strong>Personalised</strong> per-user saves and
                  presentation controls.
                </li>
              </ul>
            </Reveal>
            <Reveal direction="down" duration={1600} distance={10} delay={220}>
              <div className="mt-6">
                <Link to="/products" className="btn btn-pill">
                  Back to Products
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative lg:hidden">
              <ScrollSlide direction="right" distance={140}>
                <img
                  src={mapsHero}
                  alt="Iris Maps overview"
                  className="block h-auto w-full select-none pointer-events-none object-contain"
                  loading="lazy"
                />
              </ScrollSlide>
            </div>

            {/* desktop right-hug */}
            <div className="pointer-events-none absolute inset-y-0 right-[-6vw] hidden lg:block w-[min(980px,60vw)] -z-0">
              <ScrollSlide direction="right" distance={180}>
                <Reveal direction="right" duration={2000} distance={22}>
                  <img
                    src={mapsHero}
                    alt=""
                    aria-hidden
                    width={1400}
                    height={900}
                    className="block h-full w-full object-contain opacity-95"
                    loading="lazy"
                  />
                </Reveal>
              </ScrollSlide>
            </div>
          </div>
        </div>
      </section>

      {/* OPTIONS & BENEFITS */}
      <section className="relative overflow-hidden border-top border-white/10 pt-14 pb-6 md:pt-16 md:pb-8">
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal direction="down" duration={1600} distance={12}>
            <div className="mb-8 w-fit rounded-2xl bg-white/[.04] px-5 py-4 ring-1 ring-white/10 shadow-lg">
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
                Options & benefits
              </h2>
            </div>
          </Reveal>
          <Carousel
            slides={optionSlides}
            auto={false}
            minHeightClass="min-h-[36rem] md:min-h-[34rem] lg:min-h-[32rem]"
            dotVariant="dot"
            alignDots="center"
            className="mt-2"
            revealProps={{
              direction: "up",
              duration: 900,
              distance: 14,
              delay: 0,
            }}
          />
        </div>
      </section>

      {/* MAP TYPES */}
      <section
        id="key-features-section"
        className="relative overflow-hidden pt-10 pb-16 md:pt-12 md:pb-20"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal direction="down" duration={1600} distance={12}>
            <div className="mb-8 w-fit rounded-2xl bg-white/[.04] px-5 py-4 ring-1 ring-white/10 shadow-lg">
              <p className="text-sm uppercase tracking-[.18em] text-blue-300">
                IRIS
              </p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
                Map types
              </h2>
            </div>
          </Reveal>
          <Carousel
            slides={mapTypeSlides}
            auto={false}
            minHeightClass="min-h-[36rem] md:min-h-[34rem] lg:min-h-[32rem]"
            dotVariant="dot"
            alignDots="center"
            revealProps={{
              direction: "up",
              duration: 900,
              distance: 14,
              delay: 0,
            }}
          />
        </div>
      </section>

      {/* CTA + Assistance */}
      <ReadyToSeeSection
        productName="Iris Maps"
        description="Book a walkthrough and explore automated map builds, real-time visual updates, and tailored reporting."
        headingId="ready-to-see-iris-maps"
      />
      <section>
        <Reveal direction="down" duration={1400} distance={14}>
          <NeedAssistance />
        </Reveal>
      </section>
    </main>
  );
}
