// imports
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "@assets/logos/irisLogoWhite.svg";

// nav
const NAV = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Training", to: "/training" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // scroll state
  useEffect(() => {
    const scrollerEl = document.querySelector(".scroller");
    const mainEl = document.querySelector("main");

    const targets = new Set([window]);
    if (scrollerEl && scrollerEl !== window) {
      targets.add(scrollerEl);
    }
    if (mainEl && mainEl !== scrollerEl) {
      targets.add(mainEl);
    }
    const docEl = document.scrollingElement || document.documentElement;
    if (docEl && docEl !== document.body) {
      targets.add(docEl);
    }
    if (document.body) {
      targets.add(document.body);
    }

    const readTop = () => {
      const winTop = window.pageYOffset || 0;
      const docTop = docEl ? docEl.scrollTop : 0;
      const bodyTop = document.body ? document.body.scrollTop : 0;
      const scrollerTop = scrollerEl ? scrollerEl.scrollTop : 0;
      const mainTop = mainEl ? mainEl.scrollTop : 0;
      return Math.max(winTop, docTop, bodyTop, scrollerTop, mainTop);
    };

    const update = () => setScrolled(readTop() > 10);

    update();
    targets.forEach((target) => {
      target.addEventListener("scroll", update, { passive: true });
    });
    window.addEventListener("resize", update);

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("scroll", update);
      });
      window.removeEventListener("resize", update);
    };
  }, []);

  // close on route change + esc
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hasBg = open || scrolled;

  return (
    <header
      className={[
        "site-header transition-all duration-300", // sticky, top, z from css layer
        hasBg
          ? "border-b border-white/10 shadow-[0_6px_20px_rgba(0,0,0,.25)]"
          : "border-b border-transparent",
      ].join(" ")}
      // inline fallback so bg/backdrop wins over page themes
      style={{
        backgroundColor: hasBg ? "rgba(11,13,18,0.85)" : "transparent",
        backdropFilter: hasBg ? "saturate(180%) blur(10px)" : "none",
        WebkitBackdropFilter: hasBg ? "saturate(180%) blur(10px)" : "none",
      }}
    >
      <div className="container-narrow flex h-[72px] items-center justify-between">
        {/* logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Iris Network Systems - home"
        >
          <img
            src={logo}
            alt="Iris"
            className="h-6 w-auto select-none"
            draggable="false"
          />
        </Link>

        {/* desktop nav */}
        <nav className="nav">
          {NAV.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* desktop ctas */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://support.irisns.com/support/home"
            target="_blank"
            rel="noreferrer"
            className="btn btn-blue"
          >
            Support
          </a>
          <NavLink to="/contact" className="btn btn-pill">
            Request Demo
          </NavLink>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          className="md:hidden rounded-lg border border-white/20 px-3 py-2 text-white"
          aria-expanded={open}
          aria-controls="mobileNav"
          aria-label="toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          ?
        </button>
      </div>

      {/* mobile panel */}
      <div
        id="mobileNav"
        className={[
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300",
          open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="container-narrow pb-4">
          <ul className="mt-2 rounded-xl border border-white/10 bg-[var(--panel)] p-2">
            {NAV.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2 flex gap-2">
              <a
                className="btn btn-blue w-full justify-center"
                href="https://support.irisns.com/support/home"
                target="_blank"
                rel="noreferrer"
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
    </header>
  );
}



