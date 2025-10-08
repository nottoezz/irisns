// imports
import { useEffect } from "react";
import { Link } from "react-router-dom";

// componenets
import Reveal from "@ui/Reveal";
import NeedAssistance from "@features/NeedAssistance";
import WhoTrustUs from "@features/WhoTrustsUs";
import DecorativeDots from "@ui/DecorativeDots";
import Meta from "@/components/seo/Meta";
import ColorBlooms from "@ui/ColorBlooms";

// imgs
import irisDefaultDashboard from "@assets/img/irisDefaultDashboard.webp";
import irisNetworkMonitoring from "@assets/img/irisNetworkMonitoring.png";

// pill data
import { LEFT_PILLS, RIGHT_PILLS } from "@data/pills";
import { PillIcon } from "@data/pillIcons";

// pill chip
function Pill({ label, icon, className = "", iconRight = false }) {
  return (
    <div className={`chip chip-pill ${className}`}>
      <div className="flex min-w-0 items-center gap-4">
        {!iconRight && icon}
        <span className="chip-text font-semibold leading-tight">{label}</span>
        {iconRight && icon}
      </div>
    </div>
  );
}

// page
export default function Home() {
  useEffect(() => {
    document.title = "Home - Iris Network Systems";
  }, []);

  return (
    <main className="relative flex-1 overflow-x-hidden bg-[#0f1123]">
      <Meta
        title="Iris Network Systems — Performance Monitoring, NetFlow & Maps"
        description="Unified performance monitoring for CSPs and enterprises: Iris Core, NetFlow analytics, and real-time Maps. Visualize health, detect anomalies, and act faster."
        canonical="auto"
      />
      <ColorBlooms
        items={[
          {
            hue: "blue",
            color: "rgba(59,130,246,0.55)",
            size: "min(2200px, 160vw)",
            top: "-25%",
            left: "-40%",
            blend: "screen",
            opacity: 0.52,
            falloff: "66%",
            blurPx: 160,
          },
          {
            hue: "purple",
            color: "rgba(168,85,247,0.48)",
            size: "min(1900px, 130vw)",
            top: "-10%",
            right: "-25%",
            blend: "screen",
            opacity: 0.5,
            falloff: "64%",
            blurPx: 150,
          },
          {
            hue: "sky",
            color: "rgba(56,189,248,0.42)",
            size: "min(1600px, 120vw)",
            top: "20%",
            left: "30%",
            blend: "screen",
            opacity: 0.45,
            falloff: "60%",
            blurPx: 140,
          },
          {
            hue: "amber",
            color: "rgba(251,191,36,0.32)",
            size: "min(1600px, 120vw)",
            top: "20%",
            left: "-30%",
            blend: "screen",
            opacity: 0.45,
            falloff: "60%",
            blurPx: 140,
          },
          {
            hue: "teal",
            color: "rgba(45,212,191,0.38)",
            size: "min(1400px, 110vw)",
            top: "50%",
            right: "50%",
            blend: "screen",
            opacity: 0.4,
            falloff: "58%",
            blurPx: 130,
          },
          {
            hue: "rose",
            color: "rgba(244,114,182,0.45)",
            size: "min(1700px, 120vw)",
            bottom: "-12%",
            right: "26%",
            blend: "screen",
            opacity: 0.46,
            falloff: "62%",
            blurPx: 160,
          },
          {
            hue: "amber",
            color: "rgba(251,191,36,0.32)",
            size: "min(1100px, 85vw)",
            bottom: "10%",
            left: "60%",
            blend: "screen",
            opacity: 0.38,
            falloff: "56%",
            blurPx: 120,
            transform: "translate3d(-8%,12%,0)",
          },
        ]}
      />

      {/* hero */}
      <section className="hero">
        <div className="container-narrow hero-grid">
          <Reveal direction="left" duration={2000} distance={40} delay={150}>
            <div>
              <h1 className="h1">
                A comprehensive
                <br />
                network monitoring
                <br />
                software solution
              </h1>

              <p className="lead">
                A robust and scalable data collection framework, purpose-built
                to efficiently deliver network monitoring and management data
                with speed and precision
              </p>

              <div className="hero-cta">
                <Link to="/about" className="btn btn-blue">
                  Learn More
                </Link>
                <Link to="/intro" className="btn btn-pill">
                  <span className="mr-2">❯</span> Watch Introduction
                </Link>
              </div>
            </div>
          </Reveal>

          {/* hero image */}
          <Reveal direction="right" duration={2000} distance={40} delay={150}>
            <img
              src={irisDefaultDashboard}
              alt="Iris dashboard"
              className="hero-img lg:relative lg:left-55 lg:scale-[1.5]"
              width={1554}
              height={1062}
              loading="eager"
            />
          </Reveal>
        </div>
      </section>

      {/* network monitoring & visibility */}
      <section className="section">
        <div className="container-narrow text-center">
          {/* Decorative Dots */}
          <DecorativeDots />

          <Reveal direction="down" duration={1400} distance={20} delay={100}>
            <div className="eyebrow mb-3">COMPREHENSIVE</div>
          </Reveal>
          <Reveal direction="down" duration={2400} distance={40} delay={200}>
            <h2 className="h2 text-[44px] font-bold tracking-tight">
              Network
              <br /> Monitoring &amp; Visibility
            </h2>
            <p className="mx-auto mt-5 max-w-[85ch] text-white/75">
              Inspired by the everyday challenges faced by ISPs, Iris was
              designed to solve a range of problems with ease. The system makes
              it possible to report on large amounts of data in a meaningful
              way.
            </p>
          </Reveal>
        </div>

        {/* pills + center image */}
        <div className="container-narrow mt-10">
          <div className="grid items-center gap-3 lg:grid-cols-[1fr_minmax(0,700px)_1fr]">
            {/* left pills */}
            <div className="flex flex-col items-end gap-2 lg:translate-x-15 lg:gap-7">
              {LEFT_PILLS.map((p, idx) => (
                <Reveal
                  key={p.label}
                  direction="left"
                  distance={24}
                  duration={1700}
                  delay={idx * 120}
                >
                  <Pill
                    label={p.label}
                    icon={<PillIcon name={p.icon} />}
                    iconRight
                    className="!px-6 !py-4 text-[15px] shadow-sm md:text-base"
                  />
                </Reveal>
              ))}
            </div>

            {/* center image */}
            <Reveal direction="down" duration={1800} distance={20} delay={100}>
              <div className="relative -mt-4 lg:-mt-8">
                <img
                  src={irisNetworkMonitoring}
                  alt="Network Monitoring & Visibility"
                  className="mx-auto w-full max-w-[700px] rounded-xl shadow-2xl lg:scale-[0.7]"
                  width={896}
                  height={980}
                  loading="eager"
                />
              </div>
            </Reveal>

            {/* right pills */}
            <div className="flex flex-col items-start gap-2 lg:-translate-x-15 lg:gap-7">
              {RIGHT_PILLS.map((p, idx) => (
                <Reveal
                  key={p.label}
                  direction="right"
                  distance={24}
                  duration={1700}
                  delay={idx * 120}
                >
                  <Pill
                    label={p.label}
                    icon={<PillIcon name={p.icon} />}
                    className="!px-6 !py-4 text-[15px] shadow-sm md:text-base"
                  />
                </Reveal>
              ))}
            </div>
          </div>

          {/* learn more cta */}
          <Reveal direction="down" duration={800} distance={20}>
            <div className="flex justify-center">
              <Link to="/about" className="btn btn-blue">
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* modules & services */}
      <section className="section">
        <div className="container-narrow">
          <div className="mb-14 text-center">
            {/* small decorative dots */}
            <DecorativeDots />

            <Reveal direction="down" duration={1200} distance={20} delay={100}>
              <div className="eyebrow text-white/70 tracking-[.25em]">
                SPECIALISED
              </div>
            </Reveal>
            <Reveal direction="down" duration={1200} distance={20} delay={100}>
              <h2 className="h2 mt-3 text-[44px] font-bold tracking-tight">
                Modules and Services
              </h2>
            </Reveal>
          </div>

          {/* cards */}
          <div className="grid gap-10 lg:grid-cols-3">
            {/* card: iris core */}
            <Reveal direction="left" duration={3200} distance={20}>
              <article className="flex h-full flex-col">
                <Link
                  to="/products/iris-core"
                  className="group flex h-full flex-col rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <div className="font-medium text-white/85">Iris Core</div>
                  <div className="mt-3 h-px w-full bg-white/20 transition-colors group-hover:bg-[#2f81f7]" />
                  <p className="mt-6 text-2xl font-semibold leading-tight text-white/75 transition-colors group-hover:text-white sm:text-3xl">
                    Collect metrics from thousands of devices on networks and
                    present data in an easy-to-read format.
                  </p>

                  <div className="mt-auto flex w-full items-center pt-10">
                    <span className="text-lg text-white/80 transition-colors group-hover:text-white md:text-xl">
                      View
                    </span>
                    <svg
                      className="ml-auto h-6 w-6 text-white/80 transition-colors group-hover:translate-x-1 group-hover:text-[#2f81f7] md:h-7 md:w-7"
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
                </Link>
              </article>
            </Reveal>

            {/* card: iris netflow */}
            <Reveal direction="down" duration={3200} distance={20}>
              <article className="flex h-full flex-col">
                <Link
                  to="/products/iris-netflow"
                  className="group flex h-full flex-col rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <div className="font-medium text-white/85">Iris Netflow</div>
                  <div className="mt-3 h-px w-full bg-white/20 transition-colors group-hover:bg-[#2f81f7]" />
                  <p className="mt-6 text-2xl font-semibold leading-tight text-white/75 transition-colors group-hover:text-white sm:text-3xl">
                    Give engineers and managers the insight they need for stable
                    and predictable networking environments.
                  </p>

                  <div className="mt-auto flex w-full items-center pt-10">
                    <span className="text-lg text-white/80 transition-colors group-hover:text-white md:text-xl">
                      View
                    </span>
                    <svg
                      className="ml-auto h-6 w-6 text-white/80 transition-colors group-hover:translate-x-1 group-hover:text-[#2f81f7] md:h-7 md:w-7"
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
                </Link>
              </article>
            </Reveal>

            {/* card: iris maps */}
            <Reveal direction="right" duration={3200} distance={20}>
              <article className="flex h-full flex-col">
                <Link
                  to="/products/iris-maps"
                  className="group flex h-full flex-col rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <div className="font-medium text-white/85">Iris Maps</div>
                  <div className="mt-3 h-px w-full bg-white/20 transition-colors group-hover:bg-[#2f81f7]" />
                  <p className="mt-6 text-2xl font-semibold leading-tight text-white/75 transition-colors group-hover:text-white sm:text-3xl">
                    Powerful tool that generates visually detailed network
                    reporting maps in real-time for quick data intake.
                  </p>

                  <div className="mt-auto flex w-full items-center pt-10">
                    <span className="text-lg text-white/80 transition-colors group-hover:text-white md:text-xl">
                      View
                    </span>
                    <svg
                      className="ml-auto h-6 w-6 text-white/80 transition-colors group-hover:translate-x-1 group-hover:text-[#2f81f7] md:h-7 md:w-7"
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
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* who trusts us */}
      <section>
        <WhoTrustUs />
      </section>

      {/* need assistance */}
      <section>
        <NeedAssistance />
      </section>
    </main>
  );
}
