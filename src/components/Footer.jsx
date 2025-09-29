// imports
import { Link } from "react-router-dom";
import logo from "../assets/logos/iris-logo-white.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-0 border-t border-white/10 bg-[var(--panel)]">
      <div className="container-narrow py-14">
        {/* top grid */}
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          {/* brand + site nav */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center" aria-label="iris home">
              <img src={logo} alt="iris" className="h-8 w-auto" loading="lazy" />
            </Link>
            <nav aria-label="site" className="flex flex-col gap-4 text-white/80">
              <Link to="/products" className="hover:text-white">products</Link>
              <Link to="/about" className="hover:text-white">about us</Link>
              <Link to="/training" className="hover:text-white">training</Link>
              <Link to="/news" className="hover:text-white">news</Link>
              <Link to="/contact" className="hover:text-white">contact us</Link>
            </nav>
          </div>

          {/* services */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">services</h4>
            <ul className="space-y-3 text-white/80">
              <li><Link to="/products/iris-core" className="hover:text-white">iris core</Link></li>
              <li><Link to="/products/iris-netflow" className="hover:text-white">iris netflow</Link></li>
              <li><Link to="/products/iris-maps" className="hover:text-white">iris maps</Link></li>
            </ul>
          </div>

          {/* solutions */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">solutions</h4>
            <ul className="space-y-3 text-white/80">
              <li><Link to="/solutions/faqs" className="hover:text-white">faqs</Link></li>
              <li><Link to="/solutions/cheat-sheets" className="hover:text-white">cheat sheets</Link></li>
              <li><Link to="/solutions/videos" className="hover:text-white">video tutorials</Link></li>
              <li><Link to="/products" className="hover:text-white">products</Link></li>
              <li><Link to="/solutions/debugging" className="hover:text-white">debugging</Link></li>
            </ul>
          </div>

          {/* training */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">training</h4>
            <ul className="space-y-3 text-white/80">
              <li><Link to="/training/guides" className="hover:text-white">training guides</Link></li>
              <li><Link to="/training/end-customer" className="hover:text-white">end customer</Link></li>
              <li><Link to="/training/service-manager" className="hover:text-white">service manager</Link></li>
              <li><Link to="/training/administrator" className="hover:text-white">administrator</Link></li>
            </ul>
          </div>

          {/* resources */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">resources</h4>
            <ul className="space-y-3 text-white/80">
              <li><Link to="/about" className="hover:text-white">about us</Link></li>
              <li><Link to="/contact" className="hover:text-white">contact</Link></li>
              <li><a href="/docs/paia-manual.pdf" className="hover:text-white">paia manual</a></li>
              <li><a href="/docs/paia-form-2.pdf" className="hover:text-white">paia form 2 – request</a></li>
              <li><a href="/docs/paia-form-3.pdf" className="hover:text-white">paia form 3 – outcome</a></li>
              <li><Link to="/legal/privacy" className="hover:text-white">privacy policy</Link></li>
              <li><Link to="/legal/eula" className="hover:text-white">eula</Link></li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© {year} iris network solutions</p>
          <a
            href="https://www.linkedin.com/company/iris-network-solutions"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
            aria-label="linkedin"
          >
            linkedin
          </a>
        </div>
      </div>
    </footer>
  );
}
