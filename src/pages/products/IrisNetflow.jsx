import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// UI
import Reveal from "@ui/Reveal";
import ScrollSlide from "@ui/ScrollSlide";
import NeedAssistance from "@features/NeedAssistance";
import ReadyToSeeSection from "@features/ReadyToSeeSection";
import ColorBlooms from "@ui/ColorBlooms.jsx";
import Carousel from "@ui/Carousel";
import Meta from "@/components/seo/Meta";

// Assets
import netflowHero from "@assets/img/irisNetflow.webp";

const NETFLOW_CAPABILITIES = [
  {
    n: "01",
    title: "Swiftly identify and rectify bottlenecks",
    copy: "Surface top talkers, conversations, and interfaces in seconds to pinpoint saturation and contention.",
  },
  {
    n: "02",
    title: "Harness robust collection for deep analysis",
    copy: "Collect NetFlow/sFlow/IPFIX at scale, exploring conversations by app, ASN, host, port, DSCP, and more.",
  },
  {
    n: "03",
    title: "Generate customised, in-depth trends",
    copy: "Create longitudinal reports for links, services, or tenants — and schedule them for stakeholders.",
  },
  {
    n: "04",
    title: "Plan capacity with confidence",
    copy: "Forecast growth using baselines, seasonality, and burst detection to inform upgrades and augments.",
  },
  {
    n: "05",
    title: "Enable cost attribution",
    copy: "Tag flows by tenant/site/customer for accurate showback/chargeback and budget alignment.",
  },
  {
    n: "06",
    title: "Accelerate incident triage",
    copy: "Pivot from an alarm straight to flows — who, what, when, and where — without losing context.",
  },
  {
    n: "07",
    title: "Security enrichment without heavy lift",
    copy: "Spot anomalies and unexpected destinations with lightweight heuristics on top of flow data.",
  },
  {
    n: "08",
    title: "Operate at multi-vendor scale",
    copy: "Integrate heterogeneous exporters reliably with sensible defaults and low operational overhead.",
  },
  {
    n: "09",
    title: "Retain data flexibly",
    copy: "Tier high-res windows for forensics while keeping longer-term aggregates cost-effective.",
  },
];

const NETFLOW_FEATURES = [
  {
    n: "01",
    title: "Troubleshooter Module",
    copy: "Place devices/mnemonics from views onto maps, support GPS for geospatial views and logical layouts for non-GPS environments. Maps auto-refresh from live data.",
  },
  {
    n: "02",
    title: "Flow Explorer",
    copy: "Powerful search & reporting engine with visualisations that simplify complex metrics — updated on open to stay aligned with Topology.",
  },
  {
    n: "03",
    title: "Flow Tracker Module",
    copy: "Highly scalable tracker that builds Iris graphs from NetFlow queries. Searchable, fast, schedulable — ideal for Transit/Peering, backbone, or clustered cores.",
  },
];

const Card = ({ n, title, copy }) => (
  <article
    className={[
      "group h-full",
      "min-h-[460px] md:min-h-[440px] lg:min-h-[420px]",
      "rounded-2xl border border-white/10 bg-white/[.035]",
      "shadow-[0_12px_30px_rgba(0,0,0,.22)]",
      "px-7 py-7 flex flex-col relative overflow-hidden",
      "transition-all duration-500 lg:hover:-translate-y-1",
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
    <div className="mt-auto pt-3" />
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
        <Card key={idx} {...it} />
      ))}
    </div>
  ));

export default function IrisNetflow() {
  useEffect(() => {
    document.title = "Iris Netflow - Iris Network Systems";
  }, []);

  const capabilitySlides = useMemo(() => buildSlides(NETFLOW_CAPABILITIES), []);
  const featureSlides = useMemo(() => buildSlides(NETFLOW_FEATURES), []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#111224] text-white">
      <Meta
        title="Iris NetFlow — High-scale Flow Analytics & Reporting"
        description="Collect NetFlow/sFlow/IPFIX at scale, surface top talkers, analyze by app/ASN/host, and schedule reports for capacity planning and incident triage."
        canonical="auto"
        ogImage="/irisns/og/iris-netflow.jpg"
      />

      <ColorBlooms
              items={[
                { hue: "blue",color: "rgba(59,130,246,0.3)", size: 1000, top: "10%",  right: "60%", falloff: "84%", blurPx: 110 },
                { hue: "sky", color: "rgba(56,189,248,0.3)", size: 1200, top: "30%",  right: "-30%", falloff: "84%", blurPx: 110 },
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
          <Reveal direction="down" duration={2000} distance={18} delay={80}>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Iris Netflow
            </h1>
          </Reveal>
          <Reveal direction="down" duration={2000} distance={18} delay={200}>
            <p className="mx-auto mt-5 max-w-[70ch] text-white/85 md:text-lg leading-relaxed">
              In today’s complex networks, Netflow is essential for
              understanding behaviour and bandwidth utilisation. Iris Netflow
              remains resource-efficient yet immensely powerful for large-scale
              visibility.
            </p>
          </Reveal>
          <Reveal direction="down" duration={2000} distance={12} delay={340}>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn btn-blue">
                Request Demo
              </Link>
              <a
                href="https://support.irisns.com/support/home"
                target="_blank"
                rel="noreferrer"
                className="btn btn-pill"
              >
                Support
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OVERVIEW*/}
      <section className="relative overflow-visible py-14 md:py-18">
        <div className="container mx-auto grid items-start gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8">
          <div>
            <Reveal direction="down" duration={2000} distance={14}>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
                Built for high-scale flow analytics
              </h2>
            </Reveal>
            <Reveal direction="down" duration={2000} distance={14} delay={90}>
              <p className="mt-5 max-w-[70ch] text-white/80 leading-relaxed">
                Collect, explore, and report on NetFlow/sFlow/IPFIX across
                multi-vendor estates. Triage incidents faster, plan capacity
                confidently, and give stakeholders clear, actionable insights.
              </p>
            </Reveal>
            <Reveal direction="down" duration={2000} distance={10} delay={180}>
              <div className="mt-6">
                <Link to="/products" className="btn btn-pill">
                  Back to Products
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Mobile */}
          <div className="relative lg:hidden">
            <ScrollSlide direction="right" distance={180}>
              <Reveal direction="right" duration={2000} distance={22}>
                <img
                  src={netflowHero}
                  alt="Iris Netflow overview"
                  width={1400}
                  height={900}
                  className="block h-auto w-full select-none pointer-events-none object-contain"
                  loading="lazy"
                />
              </Reveal>
            </ScrollSlide>
          </div>
        </div>

        {/* Full-bleed right-aligned image */}
        <div className="pointer-events-none absolute inset-y-8 right-[-6vw] hidden lg:block w-[min(980px,60vw)] -z-0">
          <ScrollSlide direction="right" distance={180}>
            <Reveal direction="right" duration={2000} distance={22}>
              <img
                src={netflowHero}
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
      </section>

      {/* KEY CAPABILITIES */}
      <section className="relative overflow-hidden pt-14 pb-6 md:pt-16 md:pb-8">
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal direction="down" duration={2000} distance={12}>
            <div className="mb-8 w-fit rounded-2xl bg-white/[.04] px-5 py-4 ring-1 ring-white/10 shadow-lg">
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
                Key capabilities
              </h2>
              <p className="mt-1 text-white/70">
                Opt for Iris Netflow if you seek to:
              </p>
            </div>
          </Reveal>

          <Carousel
            slides={capabilitySlides}
            auto={false}
            minHeightClass="min-h-[36rem] md:min-h-[34rem] lg:min-h-[32rem]"
            dotVariant="dot"
            alignDots="center"
            className="mt-2"
            revealProps={{
              direction: "down",
              duration: 2000,
              distance: 14,
              delay: 0,
            }}
          />
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-12 md:pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal direction="down" duration={2000} distance={12}>
            <div className="mb-8 w-fit rounded-2xl bg-white/[.04] px-5 py-4 ring-1 ring-white/10 shadow-lg">
              <p className="text-sm uppercase tracking-[.18em] text-blue-300">
                IRIS
              </p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
                Key features
              </h2>
            </div>
          </Reveal>

          <Carousel
            slides={featureSlides}
            auto={false}
            minHeightClass="min-h-[36rem] md:min-h-[34rem] lg:min-h-[32rem]"
            dotVariant="dot"
            alignDots="center"
            revealProps={{
              direction: "down",
              duration: 2000,
              distance: 14,
              delay: 0,
            }}
          />
        </div>
      </section>

      {/* CTA */}
      <ReadyToSeeSection
        productName="Iris Netflow"
        description="Book a quick walkthrough with our team and explore flow analytics, reporting, and capacity planning tailored to your network."
        headingId="ready-to-see-iris-netflow"
      />

      {/* Assistance */}
      <section>
        <Reveal direction="down" duration={2000} distance={16}>
          <NeedAssistance />
        </Reveal>
      </section>
    </main>
  );
}
