// imports
import React from "react";

// components
import Reveal from "@ui/Reveal";
import ScrollSlide from "@ui/ScrollSlide.jsx";
import StatCircle from "@ui/stat-circle/index.js";
import Carousel from "@ui/Carousel.jsx";
import ColorBlooms from "@ui/ColorBlooms";

// imgs
import plusIcon from "@assets/utility/plusIcon.svg";
import connectedGlobe from "@assets/img/irisConnectedGlobe.webp";
import whatWeDo from "@assets/img/irisWhatWeDo.webp";

// components
import WhoTrustUs from "@features/WhoTrustsUs.jsx";
import WorldMapInstallations from "@features/WorldMapInstallations.jsx";
import Testimonials from "@features/Testimonials.jsx";
import NeedAssistance from "@features/NeedAssistance.jsx";

// slides (text only; rendered by Carousel below)
const slides = [
  <div className="max-w-[72ch]">
    <p className="mt-6 text-white/80 text-lg leading-8">
      At Iris Network Systems, our passion lies in monitoring. With a collective
      experience of over 50 years in the telco/operator/ISP landscape, we hold a
      unique position to develop a scalable, real-time monitoring system.
    </p>
    <p className="mt-5 text-white/80 text-lg leading-8">
      Iris offers a flexible monitoring solution delivered through the cloud,
      on-premises, or hybrid setup. By capturing millions of KPIs per minute,
      our system provides real-time alerting, reporting, and troubleshooting for
      maximum visibility.
    </p>
  </div>,
  <div className="max-w-[72ch]">
    <p className="mt-6 text-white/80 text-lg leading-8">
      Operating across 9 African countries, Iris brings a focused African
      perspective and footprint. Our multi-vendor approach gives customers a
      single, unified view of their entire infrastructure through a centralized
      portal.
    </p>
    <p className="mt-5 text-white/80 text-lg leading-8">
      Iris also serves customers in the USA, UAE, and Australia.
    </p>
  </div>,
  <div className="max-w-[72ch]">
    <p className="mt-6 text-white/80 text-lg leading-8">
      We prioritize scalability and availability to deliver real-time insight
      into your network, servers, and infrastructure. Customers rely on us for
      these critical services—and we pride ourselves on consistently exceeding
      expectations.
    </p>
  </div>,
];

export default function About() {
  React.useEffect(() => {
    document.title = "About - Iris Network Systems";
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#111224] pt-20">
      <div className="relative z-10">
      <ColorBlooms
        items={[
          { hue: "blue", size: 2200, top: "55%",  right: "40%", falloff: "84%", blurPx: 110 },
          { hue: "sky", size: 2800, top: "10%",  right: "40%", falloff: "84%", blurPx: 110 },
          { hue: "violet", size: 1700, bottom: "4%", left: "65%", falloff: "84%", blurPx: 110 },
          { hue: "rose", size: 1500, bottom: "-6%", left: "48%", falloff: "84%", blurPx: 110 },
          { hue: "lime", size: 1300, top: "36%", left: "65%", falloff: "84%", blurPx: 110 },
        ]}
      />
      <section
        className="relative pt-40 md:pt-20 pb-16 md:pb-20 min-h-[960px] md:min-h-[1020px]"
        aria-labelledby="about-hero-title"
      >
        {/* base canvas */}
        <div aria-hidden className="absolute inset-0 bg-[#111224]" />

        {/* vignette image */}
        <img
          src={connectedGlobe}
          alt=""
          aria-hidden
          width={2122}
          height={1204}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-85 pointer-events-none select-none lg:scale-[0.85] pl-20 pr-20 [--inner:58%] [--outer:78%] sm:[--inner:60%] sm:[--outer:80%] lg:[--inner:64%] lg:[--outer:84%]"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, #000 var(--inner), transparent var(--outer))",
            maskImage:
              "radial-gradient(ellipse at center, #000 var(--inner), transparent var(--outer))",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />

        {/* content */}
        <div className="relative z-10 mx-auto max-w-[1200px] px-4">
          <Reveal direction="down" duration={2200} distance={20} delay={30}>
            <p className="mb-6 text-center text-[12px] md:text-[13px] tracking-[.34em] text-white/65">
              AT IRIS NETWORK SYSTEMS
            </p>
          </Reveal>

          <Reveal direction="down" duration={3000} distance={40} delay={60}>
            <h1
              id="about-hero-title"
              className="text-center text-white font-extrabold leading-[1.05] text-[34px] md:text-[44px] lg:text-[52px] tracking-[-0.015em]"
            >
              Our passion lies in monitoring
            </h1>
          </Reveal>

          {/* counters */}
          <div className="mt-14 md:mt-16 grid place-items-center md:grid-cols-3 gap-10 md:gap-6">
            <Reveal direction="left" duration={1000} distance={20}>
              <StatCircle
                label="EXPERIENCE"
                value={12}
                unit="YEARS"
                unitSide="right"
              />
            </Reveal>
            <Reveal direction="down" duration={1000} distance={20}>
              <StatCircle
                label="COUNTRIES"
                value={12}
                plus
                plusIcon={
                  <img
                    src={plusIcon}
                    alt=""
                    aria-hidden="true"
                    className="ml-10 inline-block h-[0.9em] w-[0.9em] align-baseline lg:scale-[0.5]"
                  />
                }
                plusIconWidthCh={1.2}
                unitSide="right"
              />
            </Reveal>
            <Reveal direction="right" duration={1000} distance={20}>
            <StatCircle
              label="NETWORKS"
              value={260}
              unit="THOUSAND"
              unitSide="right"
            />
            </Reveal>
          </div>
        </div>
      </section>

      {/* what we do */}
      <section
        className="relative overflow-hidden pb-20"
        aria-labelledby="about-what-title"
      >
        <div className="relative z-10 container mx-auto grid items-start gap-12 px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8">
          <div>
            {/* background img for what we do */}
            <ScrollSlide direction="right" distance={200}>
              <div className="absolute left-120 top-0 translate-x-[calc(50vw-50%)] flex justify-end">
                <img
                  src={whatWeDo}
                  alt=""
                  width={1710}
                  height={1140}
                  className="pointer-events-none select-none w-[42vw] max-w-[720px] h-auto object-contain"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(180deg,#000 78%,transparent 100%)",
                    maskImage:
                      "linear-gradient(180deg,#000 78%,transparent 100%)",
                  }}
                />
              </div>
            </ScrollSlide>

            <Reveal direction="down" distance={20} duration={2000}>
              <h2
                id="about-what-title"
                className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl"
              >
                What we do
              </h2>
            </Reveal>

            <Reveal direction="down" distance={20} duration={2000}>
              <Carousel
                slides={slides}
                auto={8000}
                minHeightClass="min-h-[16rem]"
              />
            </Reveal>
          </div>

          {/* right badges */}
          <ul className="grid gap-4 pt-20 pr-80">
            {[
              { color: "#892EA9", text: "Round-the-clock support" },
              { color: "#D93333", text: "High availability platform" },
              { color: "#0095EA", text: "Automated routine tasks" },
              { color: "#00BCBA", text: "Fast and light network polling" },
            ].map((b, i) => (
              <Reveal
                key={b.text}
                direction="right"
                distance={14}
                duration={850 + i * 120}
              >
                <li className="flex items-center gap-4 rounded-full bg-white/5 px-4 py-3 ring-1 ring-white/10 backdrop-blur-[2px]">
                  <span
                    className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-full"
                    style={{ background: b.color }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="8"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                  <span className="text-white/85 font-medium">{b.text}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* who trusts us */}
      <section>
        <WhoTrustUs className="bg-[#111224]" />
      </section>

      {/* world map */}
      <section>
        <WorldMapInstallations />
      </section>

      {/* testimonials */}
      <section>
        <Reveal direction="down" duration={2000}>
          <Testimonials />
        </Reveal>
      </section>

      {/* need assistance */}
      <section>
        <NeedAssistance />
      </section>
      </div>
    </main>
  );
}


