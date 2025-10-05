import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// ui
import Reveal from "@ui/Reveal";
import ScrollSlide from "@ui/ScrollSlide";
import NeedAssistance from "@features/NeedAssistance";
import ReadyToSeeSection from "@features/ReadyToSeeSection";
import ColorBlooms from "@ui/ColorBlooms.jsx";
import Carousel from "@ui/Carousel";

// imgs
import coreHero from "@assets/img/irisCore.webp";

const FEATURES = [
  {
    n: "01",
    title: "Storage Repository",
    copy: "Stores collected data and device information from diverse sources, including IMP, SNMP, Telemetry, syslog, and traps.",
  },
  {
    n: "02",
    title: "Graphing Engine",
    copy: "Facilitates the graphical representation of data.",
  },
  {
    n: "03",
    title: "Configuration Repository",
    copy: "Manages all Iris configuration data—groups, users, permissions, multi-tenancy, thresholds, dashboards, and maps.",
  },
  {
    n: "04",
    title: "Reporting",
    copy: "Enables creation of user-defined reports and scheduling routine reports.",
  },
  {
    n: "05",
    title: "Event Management",
    copy: "Handles functions related to events.",
  },
  {
    n: "06",
    title: "Thresholds & Notifications",
    copy: "Applies floor and ceiling thresholds to monitor exceptions.",
  },
  {
    n: "07",
    title: "Notification Groups",
    copy: "Establishes alerting groups to notify on threshold breaches.",
  },
  {
    n: "08",
    title: "Dashboards",
    copy: "Create and customise dashboards using pre-defined widgets.",
  },
  {
    n: "09",
    title: "Search",
    copy: "Retrieve data via search or a tree layout for structured data.",
  },
  {
    n: "10",
    title: "Containers",
    copy: "Group data into logical containers (views) for ease of use and automation.",
  },
  {
    n: "11",
    title: "Topology",
    copy: "Add device dependencies for event suppression.",
  },
  {
    n: "12",
    title: "Discovery",
    copy: "Scan devices through the network discovery tool.",
  },
];

const KEY_FEATURES = [
  {
    n: "01",
    title: "Efficient Data Acquisition",
    copy: "Incorporating network information seamlessly into a management system is crucial. Iris adopts a lightweight approach by dispatching a single SNMP/UDP packet to each address in the IP range, minimising impact on devices and sidestepping resource-intensive discovery processes.",
  },
  {
    n: "02",
    title: "Streamlined Administrative Requirements",
    copy: "A discover-less methodology captures device changes automatically in subsequent polling cycles, reducing administrative overhead and configuration effort.",
  },
  {
    n: "03",
    title: "Comprehensive Polling Mechanism",
    copy: "Facilitates swift, cost-effective polling of non-standard or new equipment and enables simple pollers based on devices’ MIB files.",
  },
  {
    n: "04",
    title: "Integrated Troubleshooting",
    copy: "Consolidates data from diverse sources, providing engineers the context they need for more effective troubleshooting.",
  },
  {
    n: "05",
    title: "Proactive Alerting & Thresholds",
    copy: "Floor and ceiling thresholds detect exceptions early, with flexible notification groups that route alerts to the right teams.",
  },
  {
    n: "06",
    title: "Centralised Visibility & Reporting",
    copy: "Custom dashboards and scheduled reporting give stakeholders a unified view of health, performance, and trends across the environment.",
  },
  {
    n: "07",
    title: "SSO, SAML, and LDAP Integration",
    copy: "Iris seamlessly integrates with Single Sign-On (SSO), Security Assertion Markup Language (SAML), or Lightweight Directory Access Protocol (LDAP) for a unified user experience from existing authenticated systems.",
  },
  {
    n: "08",
    title: "260+ Vendor Integration (MULTI-VENDOR)",
    copy: "Iris integrates in to over 260 vendors, everything from SD-WAN, routers, switches, servers and IoT devices. This unique approach to integration gives Iris the true meaning of a multi-vendor, single pane of glass product.",
  },
  {
    n: "09",
    title: "Curated data",
    copy: "Every data point collected by Iris is curated, checked and verified to be as correct as possible. This gives our customers peace of mind that the data we collect across a massive multi-vendor landscape is as accurate as possible.",
  },
];

/* ---- helpers: uniform card + chunk into 3-per-slide ---- */
const Card = ({ n, title, copy }) => (
  <article
    className={[
      "group h-full",
      "min-h-[460px] md:min-h-[440px] lg:min-h-[420px]",
      // premium chrome
      "rounded-2xl border border-white/10 bg-white/[.045] backdrop-blur-[2px]",
      "shadow-[0_18px_50px_rgba(0,0,0,.30)]",
      "px-7 py-7 flex flex-col relative overflow-hidden",
      "transition-all duration-500 lg:hover:-translate-y-1",
    ].join(" ")}
  >
    {/* soft radial sheen */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-16 -right-20 h-56 w-56 rounded-full opacity-[.22] blur-2xl"
      style={{
        background:
          "radial-gradient(closest-side, rgba(59,130,246,.50), rgba(168,85,247,.22) 55%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
    {/* subtle inset ring on hover */}
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

export default function IrisCore() {
  useEffect(() => {
    document.title = "Iris Core - Iris Network Systems";
  }, []);

  const capabilitySlides = buildSlides(FEATURES);
  const keyFeatureSlides = buildSlides(KEY_FEATURES);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#111224] text-white">
      {/* Rich, premium blooms (left/right only; no middle clutter) */}
      <ColorBlooms
        className="absolute inset-0 z-[1]"
        items={[
          // left arcs
          {
            hue: "blue",
            size: "min(3600px, 190vw)",
            top: "10%",
            left: "10%",
            blend: "screen",
            opacity: 0.65,
            falloff: "90%",
            blurPx: 140,
          },
          {
            hue: "cyan",
            size: "min(2600px, 150vw)",
            top: "25%",
            left: "18%",
            blend: "screen",
            opacity: 0.55,
            falloff: "88%",
            blurPx: 130,
          },
          {
            hue: "teal",
            size: "min(1800px, 110vw)",
            top: "55%",
            left: "10%",
            blend: "screen",
            opacity: 0.42,
            falloff: "86%",
            blurPx: 110,
          },

          // right arcs
          {
            hue: "indigo",
            size: "min(3600px, 190vw)",
            top: "16%",
            right: "42%",
            blend: "screen",
            opacity: 0.6,
            falloff: "90%",
            blurPx: 140,
          },
          {
            hue: "violet",
            size: "min(2400px, 140vw)",
            top: "28%",
            right: "42%",
            blend: "screen",
            opacity: 0.5,
            falloff: "88%",
            blurPx: 130,
          },
          {
            hue: "fuchsia",
            size: "min(1800px, 110vw)",
            bottom: "10%",
            right: "8%",
            blend: "screen",
            opacity: 0.4,
            falloff: "86%",
            blurPx: 110,
          },

          // light accents to tie palette
          {
            hue: "amber",
            size: "min(1300px, 90vw)",
            top: "42%",
            left: "6%",
            blend: "screen",
            opacity: 0.28,
            falloff: "86%",
            blurPx: 95,
          },
          {
            hue: "lime",
            size: "min(1200px, 85vw)",
            bottom: "6%",
            right: "10%",
            blend: "screen",
            opacity: 0.25,
            falloff: "86%",
            blurPx: 95,
          },
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
              Iris Core
            </h1>
          </Reveal>
          <Reveal direction="down" duration={2000} distance={18} delay={200}>
            <p className="mx-auto mt-5 max-w-[70ch] text-white/85 md:text-lg leading-relaxed">
              Iris represents a modular framework meticulously crafted for data
              collection and presentation, tailored for CSPs and enterprises
              that prioritise performance management.
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
                The foundation of the Iris platform
              </h2>
            </Reveal>
            <Reveal direction="down" duration={2000} distance={14} delay={90}>
              <p className="mt-5 max-w-[70ch] text-white/80 leading-relaxed">
                Iris Core brings together storage, graphing, configuration, and
                event capabilities so your teams can monitor, visualise, and
                act—fast.
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
                  src={coreHero}
                  alt="Iris Core overview"
                  className="block h-auto w-full select-none pointer-events-none object-contain"
                  loading="lazy"
                />
              </Reveal>
            </ScrollSlide>
          </div>
        </div>

        {/* Full-bleed right-aligned image for desktop — always cropped off-screen a bit */}
        <div className="pointer-events-none absolute inset-y-8 right-[-6vw] hidden lg:block w-[min(980px,60vw)] -z-0">
          <ScrollSlide direction="right" distance={180}>
            <Reveal direction="right" duration={2000} distance={22}>
              <img
                src={coreHero}
                alt=""
                aria-hidden
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
            <div className="mb-8 w-fit px-5">
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
                Key capabilities
              </h2>
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

      {/* KEY FEATURES — same styling */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-12 md:pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal direction="down" duration={2000} distance={12}>
            <div className="mb-8 w-fit rounded-2xl bg-white/[.04] px-5 py-4 ring-1 ring-white/10 shadow-lg">
              <p className="text-sm uppercase tracking-[.18em] text-blue-300">
                Take out
              </p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
                Key features
              </h2>
            </div>
          </Reveal>

          <Carousel
            slides={keyFeatureSlides}
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
        productName="Iris Core"
        description="Book a quick walkthrough with our team and explore dashboards, thresholds, and reporting tailored to your network."
        headingId="ready-to-see-iris-core"
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
