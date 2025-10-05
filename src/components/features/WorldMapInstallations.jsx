// imports
import Reveal from "@ui/Reveal";

// map image
import worldMap from "@assets/img/irisLocationMap.svg";

// pinned markers
const MARKERS = [
  // africa
  { top: "73.5%", left: "51%", label: "Namibia" },
  { top: "74%", left: "54%", label: "Zambia" },
  { top: "61.7%", left: "57.4%", label: "Uganda" },
  { top: "84.5%", left: "54.2%", label: "South Africa Port Elizabeth" },
  { top: "85%", left: "52%", label: "South Africa Cape Town" },
  { top: "81.9%", left: "55.4%", label: "South Africa Durban" },
  { top: "80.5%", left: "53.8%", label: "South Africa Gauteng" },
  { top: "78%", left: "54.5%", label: "Botswana" },
  { top: "77.7%", left: "56.5%", label: "mozambique" },
  // africa cove
  { top: "59%", left: "44%", label: "01" },
  { top: "61%", left: "46%", label: "02" },
  { top: "62%", left: "49%", label: "03" },
  { top: "66.1%", left: "51.1%", label: "04" },
  // americas
  { top: "38%", left: "27%", label: "USA East" },
  { top: "49%", left: "16.5%", label: "Mexico" },
  // oceania
  { top: "87.5%", left: "87%", label: "Australia" },
];

// local keyframes for marker pulse
const styles = `
@keyframes pulseRing {
  0%   { transform: scale(1);   opacity: .8; }
  70%  { transform: scale(2.2); opacity: 0; }
  100% { transform: scale(2.4); opacity: 0; }
}
.animate-pulseRing { animation: pulseRing 1.8s ease-out infinite; }
`;

export default function WorldMapInstallations({
  title = "Worldwide Installations",
  className = "",
  showTitle = true,
}) {
  return (
    <section className={`relative overflow-hidden py-16 md:py-24 ${className}`}>
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {showTitle && (
          <Reveal direction="down" distance={16} duration={2000}>
            <h2 className="text-center text-white font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight">
              {title}
            </h2>
          </Reveal>
        )}

        <Reveal direction="down" distance={16} duration={2000}>
          <div className="mt-10 md:mt-14">
            <div className="relative mx-auto w-[min(1400px,95vw)]">
              {/* map image */}
              <img
                src={worldMap}
                alt=""
                aria-hidden
                width={1273}
                height={626}
                className="block w-full h-auto select-none pointer-events-none"
              />

              {/* marker overlay */}
              <div className="pointer-events-none absolute inset-0">
                {MARKERS.map((m, i) => (
                  <Marker key={i} top={m.top} left={m.left} label={m.label} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{styles}</style>
    </section>
  );
}

// single marker
function Marker({ top, left, label }) {
  return (
    <div
      className="absolute"
      style={{ top, left, transform: "translate(-50%, -50%)" }}
      aria-label={label}
      title={label}
    >
      <span className="relative block h-3.5 w-3.5 md:h-4 md:w-4">
        {/* pulsing rings */}
        <span className="absolute inset-0 rounded-full border border-[#3B82F6]/70 animate-pulseRing" />
        <span
          className="absolute inset-0 rounded-full border border-[#3B82F6]/60 animate-pulseRing"
          style={{ animationDelay: "450ms" }}
        />
        {/* center dot */}
        <span className="absolute inset-0 grid place-items-center">
          <span className="relative block h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#0EA5E9] ring-1 ring-[#60A5FA]/60 shadow-[0_0_0_2px_rgba(59,130,246,0.45)]">
            <span className="absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#32c8ff] opacity-90" />
          </span>
        </span>
      </span>
    </div>
  );
}
