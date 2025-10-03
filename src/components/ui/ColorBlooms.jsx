/**
 * items: [{
 *   size?: number,
 *   top/left/right/bottom?: string,
 *   transform?: string,
 *   hue?: "cyan" | "violet" | "rose" | "lime", // uses CSS vars from .background-generator
 *   color?: string,   // overrides hue (expects rgba(...) or any CSS color)
 *   blend?: CSSMixBlendMode, // defaults 'soft-light'
 *   opacity?: number, // defaults 0.7
 * }]
 *
 * so the CSS variables --cyan/--violet/--rose/--lime are available.
 */

export default function ColorBlooms({ items = [], className = "" }) {
  const cssVarForHue = (hue) => {
    if (!hue) return null;
    const map = {
      cyan: "var(--cyan)",
      violet: "var(--violet)",
      rose: "var(--rose)",
      lime: "var(--lime)",
      blue: "var(--blue)",
      indigo: "var(--indigo)",
      sky: "var(--sky)",
      teal: "var(--teal)",
      emerald: "var(--emerald)",
      green: "var(--green)",
      yellow: "var(--yellow)",
      amber: "var(--amber)",
      orange: "var(--orange)",
      red: "var(--red)",
      fuchsia: "var(--fuchsia)",
      pink: "var(--pink)",
      purple: "var(--purple)",
      magenta: "var(--magenta)",
    };
    return map[hue] ?? null;
  };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[1] ${className}`}
    >
      {items.map((b, i) => {
        const hueVar = cssVarForHue(b.hue);
        const stopColor = b.color ?? hueVar ?? "rgba(56,189,248,.18)";
        return (
          <div
            key={i}
            className="absolute rounded-full blur-3xl will-change-transform"
            style={{
              width: b.size ?? 680,
              height: b.size ?? 680,
              top: b.top,
              left: b.left,
              right: b.right,
              bottom: b.bottom,
              transform: b.transform,
              background: `radial-gradient(closest-side, ${stopColor} 0%, transparent 70%)`,
              mixBlendMode: b.blend ?? "soft-light",
              opacity: b.opacity ?? 0.7,
            }}
          />
        );
      })}
    </div>
  );
}
