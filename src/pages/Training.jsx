// imports
import { useEffect } from "react";

// components
import Reveal from "@ui/Reveal";
import ColorBlooms from "@ui/ColorBlooms";
import TrainingLevels from "@features/TrainingLevels";
import NeedAssistance from "@features/NeedAssistance";
import Meta from "@/components/seo/Meta";

// imgs
import heroImg from "@assets/img/irisTrainingHero.webp";
import trainingPortrait from "@assets/img/irisTrainingLady.webp";

export default function Training() {
  useEffect(() => {
    document.title = "Training - Iris Network Systems";
  }, []);

  return (
    <main className="relative flex-1 overflow-x-hidden bg-[#0f1123]">
      <Meta
        title="Training - Iris Network Systems"
        description="Guides and courses for administrators, service managers, and end customers to get the most out of Iris."
        canonical="auto"
      />
      
      <ColorBlooms
        items={[
          { hue: "blue", size: 2200, top: "40%",  right: "40%", falloff: "84%", blurPx: 110 },
          { hue: "sky", size: 2800, top: "10%",  left: "40%", falloff: "84%", blurPx: 110 },
          { hue: "violet", size: 1700, bottom: "4%", left: "65%", falloff: "84%", blurPx: 110 },
          { hue: "rose", size: 1500, bottom: "-6%", left: "48%", falloff: "84%", blurPx: 110 },
        ]}
      />
      {/* hero */}
      <section
        className="relative md:pt-15 min-h-[880px] md:min-h-[980px]"
        aria-labelledby="about-hero-title"
      >
        {/* hero img */}
        <img
          src={heroImg}
          alt=""
          aria-hidden
          width={1802}
          height={824}
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

        {/* eyebrow + title*/}
        <div className="relative z-10 container-narrow py-28 md:py-36 text-center">
          <Reveal direction="down" distance={18} duration={2000}>
            <div className="eyebrow mb-3 text-white/70">IRIS NETWORK</div>
          </Reveal>
          <Reveal direction="down" distance={22} duration={2000} delay={80}>
            <h1 className="h1">Training</h1>
          </Reveal>
        </div>
      </section>

      {/* continuation */}
      <section className="relative z-20 -mt-16 md:-mt-24 lg:-mt-28 ">
        <div className="relative z-10 container mx-auto">
          <div className="grid items-start gap-10 md:gap-14 md:grid-cols-[1.05fr_1.35fr]">
            {/* left coloum */}
            <div>
              <Reveal direction="left" distance={28} duration={900}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
                  Iris offers a training
                  <br /> solution designed
                  <br /> to meet your
                  <br /> specific role.
                </h2>
              </Reveal>

              {/* portrait img */}
              <Reveal direction="left" distance={22} duration={2000} delay={80}>
                <div className="mt-10 md:mt-12">
                  <div className="relative mx-auto w-[320px] md:w-[400px]" />
                  <img
                    src={trainingPortrait}
                    alt=""
                    width={1078}
                    height={952}
                    className="relative z-10 block w-full h-auto select-none"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>

            {/* right column */}
            <Reveal direction="right" distance={28} duration={900}>
              <div className="max-w-none md:pr-4 lg:pr-8">
                {/* intro line */}
                <h3
                  className="text-white font-extrabold tracking-tight
                 text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px]
                 leading-[1.06] 
                 max-w-[30ch] sm:max-w-[32ch] md:max-w-[34ch] lg:max-w-[36ch]
                 [text-wrap:balance]"
                >
                  Whether you are a beginner or an experienced user, our
                  training resources cater to all proficiency levels and
                  backgrounds in working with Iris.
                </h3>

                {/* body */}
                <div
                  className="mt-5 space-y-4 text-white/80
                    text-[16.5px] md:text-[17px] leading-7 md:leading-7
                    max-w-[86ch]"
                >
                  <p>
                    For those starting out, we provide user-friendly tools,
                    helpful tips, and informative videos, ensuring a smooth
                    learning experience and empowering you to make the most of
                    Iris.
                  </p>

                  <p>
                    Our comprehensive knowledge base is a treasure trove of
                    valuable resources. From frequently asked questions (FAQs)
                    to convenient cheat sheets, in-depth video tutorials, and
                    insightful articles, we have everything you need to
                    effectively utilize the system to its fullest potential.
                  </p>

                  <p>
                    At Iris, we are committed to supporting your learning
                    journey and ensuring that you feel confident and capable in
                    using our platform. With our extensive training materials,
                    you can unlock the true power of Iris and optimize your
                    network monitoring and management experience.
                  </p>

                  <p>
                    Once you feel confident and proficient, we highly encourage
                    you to pursue certification. Iris certification validates
                    your expertise and showcases your commitment to excellence
                    in network monitoring and management.
                  </p>

                  <p>
                    Our certification program is designed to recognize your
                    skills and knowledge, providing a valuable credential that
                    can enhance your professional profile and open up new
                    opportunities in the industry.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* training lvls */}
      <section className="relative">
        <TrainingLevels />
      </section>

      {/* need assitance */}
      <section className="relative">
        <NeedAssistance />
      </section>
    </main>
  );
}
