// imports
import React from "react";

// logos
import mtnLogo from "@assets/logos/mtnLogo.png";
import voxLogo from "@assets/logos/voxTelecomLogo.svg";
import itecLogo from "@assets/logos/itecWhiteLogo.svg";
import vodacomLogo from "@assets/logos/vodacomWhiteLogo.svg";
import placeHolder from "@assets/logos/placeHolder.svg";

/* tiny star */
function Star({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
      <path d="M10 1.8l2.3 4.7 5.2.8-3.8 3.7.9 5.2L10 13.9l-4.6 2.4.9-5.2L2.5 7.3l5.2-.8L10 1.8z" fill="currentColor" />
    </svg>
  );
}

/* testimonial block */
const Testimonial = React.memo(function Testimonial({ logo, quote, author, role, rating = 5 }) {
  return (
    <div className="grid h-full grid-rows-[auto,1fr,auto] px-6">
      {/* logo */}
      {logo && (
        <img
          src={logo}
          alt=""
          className="mb-8 h-[26px] w-auto select-none opacity-95 pointer-events-none place-self-start"
          loading="eager"
          decoding="async"
        />
      )}

      {/* quote */}
      <p className="max-w-[64ch] self-start text-[20px] leading-9 text-white/85 md:text-[21px]">
        “{quote}”
      </p>

      {/* footer */}
      <div className="self-end pt-8">
        <div className="h-px w-full max-w-[64ch] bg-white/20" />
        <div className="mt-6">
          <p className="text-[17px] font-semibold text-white">{author}</p>
          <p className="text-[15px] text-white/60">{role}</p>
        </div>
        <div className="mt-4 flex items-center gap-1 text-yellow-400">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5" />
          ))}
        </div>
      </div>
    </div>
  );
});

/* defaults kept outside component to avoid re-allocations */
const DEFAULT_ITEMS = [
  {
    logo: placeHolder,
    quote:
      "With IRIS’ exceptional network management software and outstanding support, we’re able to provide our clients with the quality of service that has made us a household name in the South African telecommunications market. I can wholeheartedly recommend IRIS as a partner in network management.",
    author: "Greg de Chasteauneuf",
    role: "CTO",
    rating: 5,
  },
  {
    logo: voxLogo,
    quote:
      "Iris has been engaging and responsive from the start, fielding our support queries and working with us to develop new functions and capabilities going forward. It’s become a valuable, long-term partnership.",
    author: "Hendrik Meybrugh",
    role: "Technical Head Of Cloud Services",
    rating: 5,
  },
  {
    logo: itecLogo,
    quote:
      "Iris was referred to me by a third party and the only complaint I have is that I wasn’t introduced to them sooner. I can definitely recommend Iris to any ISP or company that needs a proper, flexible, stable, and effective network management tool.",
    author: "Philip du Randt",
    role: "Manager - Provisioning Engineering and Core Networks",
    rating: 5,
  },
  {
    logo: mtnLogo,
    quote:
      "With having implemented the core Network Management platform with Netflow and Maps add-ons, MTN was able to create a rich information portal for all customers’ usage requirements.",
    author: "Gregory Golombowski",
    role: "Technical Operations Manager",
    rating: 5,
  },
  {
    logo: vodacomLogo,
    quote:
      "The user friendliness of Iris ensures the extensive use of the system in the Vodacom Business VoIP Division. Support from Iris is currently a benchmark for the Vodacom Business VoIP division. Support is simply exceptional.",
    author: "Louw Jansen van Rensburg",
    role: "Senior VoIP Specialist",
    rating: 5,
  },
];

export default function Testimonials({
  items = [],
  autoMs = 8000,
  className = "",
  title = "What our customers say",
}) {
  // data (unique source list)
  const data = React.useMemo(() => (items.length ? items : DEFAULT_ITEMS), [items]);
  const n = data.length;

  // track with two edge clones on both sides: [secondLast, last, ...data, first, second]
  const track = React.useMemo(() => {
    if (n === 0) return [];
    if (n === 1) return [data[0], data[0], data[0], data[0], data[0]];
    if (n === 2) return [data[0], data[1], ...data, data[0], data[1]];
    const secondLast = data[n - 2];
    const last = data[n - 1];
    const first = data[0];
    const second = data[1];
    return [secondLast, last, ...data, first, second];
  }, [data, n]);

  // start at 2 so visible pair is [data[0], data[1]]
  const [idx, setIdx] = React.useState(2);
  const [anim, setAnim] = React.useState(true);

  // autoplay with reset on interaction
  const timerRef = React.useRef(null);
  const startTimer = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (n < 2) return;
    timerRef.current = setInterval(() => setIdx((i) => i + 1), autoMs);
  }, [autoMs, n]);
  const stopTimer = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);
  React.useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  const restartTimer = React.useCallback(() => {
    stopTimer();
    startTimer();
  }, [stopTimer, startTimer]);

  // seamless wrap: right clone index is n + 2; real range is [2 .. n+1]
  const onTransitionEnd = React.useCallback(() => {
    if (n < 2) return;
    const rightEdge = n + 2;
    const leftEdge = 1;
    if (idx === rightEdge) {
      setAnim(false);
      setIdx(2);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    } else if (idx === leftEdge) {
      setAnim(false);
      setIdx(n + 1);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    }
  }, [idx, n]);

  // keyboard
  const onKeyDown = (e) => {
    if (n < 2) return;
    if (e.key === "ArrowRight") {
      setIdx((i) => i + 1);
      restartTimer();
    }
    if (e.key === "ArrowLeft") {
      setIdx((i) => i - 1);
      restartTimer();
    }
  };

  // active dot = left visible real item
  const activeDot = (((idx - 2) % n) + n) % n;

  return (
    <section
      className={`relative overflow-hidden bg-[#111224] py-20 md:py-24 ${className}`}
      aria-labelledby="testimonials-title"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-8">
        <h2
          id="testimonials-title"
          className="text-center font-extrabold leading-[1.05] tracking-[-0.01em] text-white text-[34px] md:text-[42px]"
        >
          {title}
        </h2>

        {/* viewport (two visible) */}
        <div
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-10 overflow-hidden md:mt-12"
          aria-roledescription="carousel"
          aria-label="customer testimonials"
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          onFocus={stopTimer}
          onBlur={startTimer}
        >
          {/* track: each card is 50% width */}
          <div
            onTransitionEnd={onTransitionEnd}
            className={`flex ${anim ? "transition-transform duration-700 ease-out" : ""}`}
            style={{ transform: `translateX(-${idx * 50}%)` }}
          >
            {track.map((t, i) => (
              <div key={i} className="basis-1/2 shrink-0">
                <Testimonial {...t} />
              </div>
            ))}
          </div>

          {/* dots = n; clicking resets timer and goes to that left card */}
          {n > 1 && (
            <div className="mt-9 flex items-center justify-center gap-3">
              {Array.from({ length: n }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAnim(true);
                    setIdx(i + 2); // real left card index inside [2..n+1]
                    restartTimer();
                  }}
                  className={`h-2 w-2 rounded-full transition-opacity ${
                    i === activeDot ? "bg-blue-400 opacity-100" : "bg-white opacity-70"
                  }`}
                  aria-label={`go to testimonial ${i + 1}`}
                  aria-current={i === activeDot}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
