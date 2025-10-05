// imports
import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// components
import Reveal from "@ui/Reveal";
import ScrollSlide from "@ui/ScrollSlide";
import NeedAssistance from "@features/NeedAssistance";

// images
import heroGlobe from "@assets/img/irispProductsHero.webp";
import coreGraphic from "@assets/img/irisCoreGraphic.webp";
import netflowGraphic from "@assets/img/IrisNetflowGraphic.webp";
import mapsGraphic from "@assets/img/IrisiMapsGraphic.webp";
import irisYoungBusinessMan from "@assets/img/irisYoungBusinessMan.jpg";

// section cards
const SECTIONS = [
  {
    id: "iris-core",
    index: "01",
    title: "Iris Core",
    copy: (
      <>
        Iris is not just a powerful software package —{" "}
        <strong>it’s a solution that surpasses expectations</strong>. By drawing
        reports and predicting trends, Iris can provide the information
        necessary to plan and avoid a range of network issues. Iris gets the
        right information to the right people at the right time.
      </>
    ),
    ctaTo: "/products/iriscore",
    img: coreGraphic,
    imgWidth: 1166,
    imgHeight: 764,
    delay: 100,
  },
  {
    id: "iris-netflow",
    index: "02",
    title: "Iris Netflow",
    copy: "Netflow data is exported from networked devices to Iris Netflow Collectors, which are distributed around the network. This data can then be accessed seamlessly from the Centralized Iris Portal.",
    ctaTo: "/products/irisnetflow",
    img: netflowGraphic,
    imgWidth: 1284,
    imgHeight: 1224,
    delay: 200,
  },
  {
    id: "iris-maps",
    index: "03",
    title: "Iris Maps",
    copy: "Iris Maps is a network tool that visually displays important network information. Displayed data is continuously updated to reflect the alarm status of your network on an automatically created HTML5 canvas.",
    ctaTo: "/products/irismaps",
    img: mapsGraphic,
    imgWidth: 2064,
    imgHeight: 1212,
    delay: 400,
  },
];

// smooth scroll to section id
function useScrollToSection() {
  return useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", `#${id}`);
  }, []);
}

// page
export default function Products() {
  useEffect(() => {
    document.title = "Products - Iris Network Systems";
  }, []);

  const headerOffset = 88;
  const scrollTo = useScrollToSection();

  return (
    <main className="min-h-screen">
      {/* hero */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-[20%_40%]"
          style={{ backgroundImage: `url(${heroGlobe})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#0a1324]/40" aria-hidden />
        <div className="relative z-10">
          <div className="mx-auto w-[min(1200px,92vw)] px-6 md:px-8 text-center py-28 md:py-32 lg:py-40">
            <Reveal direction="down" duration={2000} distance={40} delay={100}>
              <div className="mb-5 tracking-[.25em] text-white/70">PRODUCT</div>
            </Reveal>
            <Reveal direction="down" duration={2200} distance={40} delay={200}>
              <h1 className="h1">
                Iris Network
                <br className="hidden md:block" />
                Monitoring Software
              </h1>
            </Reveal>
            <Reveal direction="down" duration={2400} distance={40} delay={300}>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
                Iris Core is a complete network monitoring software solution
                that aids enterprises and carrier-grade networks in their quest
                for zero downtime and peak performance.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* content */}
      <section className="bg-transparent py-0">
        <div className="background-generator background-generator--bluewhite">
          <div className="container mx-auto px-4 py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
              {/* left rail */}
              <aside className="hidden lg:block">
                <div className="sticky" style={{ top: headerOffset + 24 }}>
                  {/* rail buttons */}
                  <nav className="space-y-3">
                    {SECTIONS.map((s) => {
                      return (
                        <Reveal
                          key={s.id}
                          direction="left"
                          duration={1000}
                          delay={s.delay}
                          distance={40}
                        >
                          <button
                            onClick={() => scrollTo(s.id)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-left shadow-sm transition-all hover:bg-slate-100"
                          >
                            <div className="text-sm font-semibold tracking-wide text-blue-600">
                              {s.index}
                            </div>
                            <div className="mt-1 font-semibold text-slate-900">
                              {s.title}
                            </div>
                          </button>
                        </Reveal>
                      );
                    })}
                  </nav>

                  {/* footprint card */}
                  <Reveal
                    direction="left"
                    duration={2200}
                    delay={600}
                    distance={40}
                  >
                    <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <h3 className="mb-3 text-2xl font-extrabold text-slate-900">
                        Operating across&nbsp;9
                        <br />
                        African Countries
                      </h3>
                      <p className="leading-relaxed text-slate-700">
                        Iris Network Systems possesses a focused African
                        perspective and footprint, making us a trusted name in
                        the industry.
                      </p>
                    </div>
                  </Reveal>
                </div>
              </aside>

              {/* right content */}
              <div>
                {/* mobile quick links */}
                <div className="mb-6 flex gap-2 lg:hidden">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>

                {SECTIONS.map((s) => (
                  <section
                    key={s.id}
                    id={s.id}
                    style={{ scrollMarginTop: headerOffset + 16 }}
                    className="relative overflow-hidden border-b border-slate-200 py-14 last:border-b-0 lg:py-24"
                  >
                    {/* decorative glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -z-10 right-[-20%] bottom-[-15%] h-[520px] w-[820px] rounded-full blur-3xl"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(59,130,246,0.18), rgba(59,130,246,0.0) 70%)",
                      }}
                    />

                    <div className="container mx-auto px-4">
                      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                        {/* text */}
                        <div>
                          <Reveal
                            direction="down"
                            duration={2400}
                            distance={40}
                            delay={100}
                          >
                            <div className="font-semibold text-blue-600">
                              {s.index}
                            </div>
                          </Reveal>
                          <Reveal
                            direction="down"
                            duration={2400}
                            distance={40}
                            delay={200}
                          >
                            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 lg:text-5xl">
                              {s.title}
                            </h2>
                          </Reveal>
                          <Reveal
                            direction="down"
                            duration={2400}
                            distance={40}
                            delay={300}
                          >
                            <p className="mt-5 max-w-prose leading-relaxed text-slate-700">
                              {s.copy}
                            </p>
                          </Reveal>
                          <Reveal
                            direction="down"
                            duration={2400}
                            distance={40}
                            delay={400}
                          >
                            <div className="mt-8">
                              <Link
                                to={s.ctaTo}
                                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:opacity-90"
                              >
                                Learn more <span aria-hidden>➜</span>
                              </Link>
                            </div>
                          </Reveal>
                        </div>

                        {/* image */}
                        <div className="relative lg:mt-6">
                          <Reveal
                            direction="right"
                            duration={2400}
                            distance={40}
                            delay={300}
                          >
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                              <img
                                src={s.img}
                                alt={`${s.title} illustration`}
                                width={s.imgWidth}
                                height={s.imgHeight}
                                className="block h-auto w-full"
                                loading="lazy"
                              />
                            </div>
                          </Reveal>

                          {/* soft shadow ellipse */}
                          <div
                            aria-hidden
                            className="absolute left-1/2 h-10 -translate-x-1/2 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* why choose iris */}
      <section className="relative overflow-hidden bg-[#0b1021]">
        {/* init parallax var */}
        <style>{`:root { --img-shift: 0px; }`}</style>

        <ScrollSlide direction="left" distance={200}>
          {/* section height */}
          <div className="min-h-[420px] md:min-h-[520px] lg:min-h-[600px]" />
          <div>
            {/* full-bleed image pinned top-left */}
            <img
              src={irisYoungBusinessMan}
              alt="engineer using iris"
              width={893}
              height={630}
              className="absolute left-0 top-0 z-0 w-[50vw] max-w-[960px] select-none object-left-top object-contain pointer-events-none"
              loading="lazy"
            />
          </div>

          {/* fades around image */}
          <div
            aria-hidden
            className="absolute left-[45vw] top-0 z-10 h-full w-40"
            style={{
              background:
                "linear-gradient(90deg, rgba(11,16,33,0.0) 0%, rgba(11,16,33,0.85) 50%, rgba(11,16,33,1) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none -mb-10 absolute bottom-0 left-0 z-20 h-100 w-[50vw] max-w-[960px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,16,33,0.0) 0%, rgba(11,16,33,0.85) 60%, rgba(11,16,33,1) 100%)",
            }}
          />
        </ScrollSlide>

        {/* teal wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[8]"
          style={{
            background:
              "radial-gradient(900px 700px at 90% 6%, rgba(16,185,214,.18), transparent 60%)",
          }}
        />

        {/* blue rings */}
        <div
          className="pointer-events-none absolute z-20 hidden md:block"
          style={{
            left: "30vw",
            top: "20vh",
            transform: "translateX(var(--img-shift))",
          }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-7">
            {[0, 1, 2, 3, 4].map((i) => {
              const opacity = Math.min(0.25 + i * 0.12, 0.8);
              const size = 36 + i * 2;
              const ringDelay = 200 * i;
              return (
                <Reveal
                  key={i}
                  direction="left"
                  duration={2000}
                  distance={40}
                  delay={ringDelay}
                >
                  <span
                    className="block rounded-full"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      border: `2px solid rgba(59,130,246,${opacity})`,
                      boxShadow: `
                        inset 0 0 0 2px rgba(59,130,246,${opacity * 0.6}),
                        0 0 18px rgba(59,130,246,${opacity * 0.35})
                      `,
                    }}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* content */}
        <div className="container relative z-30 mx-auto -mt-12 px-4 md:-mt-20 lg:-mt-110">
          <div className="grid items-center lg:grid-cols-12">
            {/* spacer equals image width */}
            <div className="hidden lg:col-span-6 lg:block" />

            <div className="text-center lg:col-span-6 lg:text-left">
              <Reveal
                direction="right"
                duration={2000}
                distance={40}
                delay={100}
              >
                <div className="mb-1 pb-20 text-3xl font-bold tracking-[.5em] uppercase text-white/80">
                  why choose iris?
                </div>
              </Reveal>
              <Reveal
                direction="right"
                duration={2400}
                distance={40}
                delay={200}
              >
                <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
                  Using robust and scalable data collection methods we ensure
                  your network data is always at your fingertips.
                </h2>
              </Reveal>

              <Reveal>
                <div className="mt-8">
                  <a
                    href="/about"
                    className="btn btn-blue"
                    aria-label="learn more about iris"
                  >
                    Learn more
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* need assistance */}
      <section>
        <NeedAssistance className="relative -mb-px bg-[#0b1021]" />
      </section>
    </main>
  );
}
