import Reveal from "./Reveal";

export default function DecorativeDots() {
    return (
        <div>
            {/* small decorative dots */}
            <Reveal direction="down" duration={1400} distance={20} delay={100}>
                <div className="mt-5 mx-auto mb-4 h-1 w-1 rounded-full bg-blue-600 opacity-33" />
            </Reveal>
            <Reveal direction="down" duration={1800} distance={20} delay={200}>
                <div className="mt-[-0.5rem] mx-auto mb-4 h-1 w-1 rounded-full bg-blue-600 opacity-66" />
            </Reveal>
            <Reveal direction="down" duration={2200} distance={20} delay={300}>
                <div className="mt-[-0.5rem] mx-auto mb-4 h-1 w-1 rounded-full bg-blue-600 opacity-100" />
            </Reveal>
        </div>
    );
}