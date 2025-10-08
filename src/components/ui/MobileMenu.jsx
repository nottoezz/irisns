// imports
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function MobileMenu({ open, setOpen, items = [] }) {
  const { pathname } = useLocation();

  // close when route changes
  useEffect(() => setOpen(false), [pathname, setOpen]);

  // close on escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  // calm ease curve
  const easing = "[cubic-bezier(0.22,0.61,0.36,1)]";

  return (
    <div className="md:hidden ml-auto">
      {/* toggle button on right */}
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20"
        aria-expanded={open}
        aria-controls="mobileNav"
        aria-label="toggle navigation"
        onClick={() => setOpen((v) => !v)}
      >
        {/* hamburger */}
        <span className="relative block h-4 w-5">
          <span
            className={`absolute inset-x-0 top-0 h-0.5 bg-white transition-transform duration-500 ${easing} ${
              open ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute inset-x-0 top-1/2 -mt-[1px] h-0.5 bg-white transition-opacity duration-500 ${easing} ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute inset-x-0 bottom-0 h-0.5 bg-white transition-transform duration-500 ${easing} ${
              open ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* panel attached to header */}
      <div
        id="mobileNav"
        role="dialog"
        aria-modal="true"
        className={[
          "fixed inset-x-0 z-[60] top-[var(--header-h,72px)]",
          "max-h-[calc(100dvh-var(--header-h,72px))] overflow-auto",
          `transition-[opacity,transform] duration-500 ${easing}`,
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div>
          <div
            className={[
              "mt-0 border border-white/10 bg-[var(--panel)] shadow-2xl",
              "rounded-b-2xl rounded-t-none overflow-hidden",
              "[box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.06)]",
            ].join(" ")}
          >
            <ul className="p-2">
              {items.map((item, i) => {
                const enterDelay = 90 * (i + 1);
                const exitDelay = 30 * (items.length - i);
                return (
                  <li
                    key={item.label}
                    style={{
                      transitionDelay: `${open ? enterDelay : exitDelay}ms`,
                    }}
                    className={[
                      "will-change-transform will-change-opacity",
                      `transition-all duration-600 ${easing}`,
                      open
                        ? "opacity-100 translate-y-0 translate-x-0"
                        : "opacity-0 translate-y-2 -translate-x-1",
                    ].join(" ")}
                  >
                    <NavLink
                      to={item.to}
                      end
                      className="block rounded-lg px-3 py-3 text-base text-white/90 hover:bg:white/10 hover:bg-white/10"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}

              {/* ctas at the end */}
              <li
                style={{
                  transitionDelay: `${open ? 90 * (items.length + 1) : 15}ms`,
                }}
                className={`mt-2 grid grid-cols-2 gap-2 transition-all duration-600 ${easing} ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                <a
                  className="btn btn-blue w-full justify-center"
                  href="https://support.irisns.com/support/home"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Support
                </a>
                <NavLink
                  to="/contact"
                  className="btn btn-pill w-full justify-center"
                  onClick={() => setOpen(false)}
                >
                  Request Demo
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
