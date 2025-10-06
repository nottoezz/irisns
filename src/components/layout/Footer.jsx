import { Link, useLocation } from "react-router-dom";
import logo from "@assets/logos/irisWhite.svg";

export default function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();

  const is = (path) => pathname === path;
  const starts = (path) => pathname.startsWith(path);
  const activeLink = (active) =>
    active
      ? "text-white underline decoration-blue-500 decoration-2 underline-offset-4"
      : "hover:text-white";

  return (
    <footer className="mt-0 border-t border-white/10 bg-[var(--panel)]">
      <div className="container-narrow py-14">
        {/* top grid */}
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          {/* brand + site nav */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center -ml-8 md:-ml-8" aria-label="iris home">
              <img
                src={logo}
                alt="iris"
                width={124}
                height={28}
                className="block h-[28px] w-[124px] object-contain"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <nav aria-label="site" className="flex flex-col gap-4 text-white/80 [line-height:1.2]">
              <Link to="/products" className={activeLink(is("/products"))}>products</Link>
              <Link to="/about" className={activeLink(is("/about"))}>about us</Link>
              <Link to="/training" className={activeLink(is("/training"))}>training</Link>
              <Link to="/news" className={activeLink(is("/news"))}>news</Link>
              <Link to="/contact" className={activeLink(is("/contact"))}>contact us</Link>
            </nav>
          </div>

          {/* services */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">services</h4>
            <ul className="space-y-3 text-white/80">
              <li><Link to="/products/iriscore" className={activeLink(starts("/products/iriscore"))}>iris core</Link></li>
              <li><Link to="/products/irisnetflow" className={activeLink(starts("/products/irisnetflow"))}>iris netflow</Link></li>
              <li><Link to="/products/irismaps" className={activeLink(starts("/products/irismaps"))}>iris maps</Link></li>
            </ul>
          </div>

          {/* solutions */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">solutions</h4>
            <ul className="space-y-3 text-white/80">
              <li><a href="https://support.irisns.com/support/solutions/folders/1000065244" target="_blank" rel="noopener noreferrer" className="hover:text-white">faqs</a></li>
              <li><a href="https://support.irisns.com/support/solutions/folders/11000004574" target="_blank" rel="noopener noreferrer" className="hover:text-white">cheat sheets</a></li>
              <li><a href="https://www.youtube.com/@Irisns" target="_blank" rel="noopener noreferrer" className="hover:text-white">video tutorials</a></li>
              <li><Link to="/products" className={activeLink(is("/products"))}>products</Link></li>
              <li><a href="https://support.irisns.com/support/solutions/articles/11000120179-ui1-troubleshooter" target="_blank" rel="noopener noreferrer" className="hover:text-white">debugging</a></li>
            </ul>
          </div>

          {/* training */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">training</h4>
            <ul className="space-y-3 text-white/80">
              <li><a href="https://support.irisns.com/support/solutions/11000005484" target="_blank" rel="noopener noreferrer" className="hover:text-white">training guides</a></li>
              <li><a href="https://support.irisns.com/support/solutions/articles/11000121030-ui1-ice-level-1" target="_blank" rel="noopener noreferrer" className="hover:text-white">end customer</a></li>
              <li><a href="https://support.irisns.com/support/solutions/articles/11000121029-ui1-ice-level-2" target="_blank" rel="noopener noreferrer" className="hover:text-white">service manager</a></li>
              <li><a href="https://support.irisns.com/support/solutions/articles/11000120161-ui1-ice-level-3" target="_blank" rel="noopener noreferrer" className="hover:text-white">administrator</a></li>
            </ul>
          </div>

          {/* resources */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">resources</h4>
            <ul className="space-y-3 text-white/80">
              <li><Link to="/about" className={activeLink(is("/about"))}>about us</Link></li>
              <li><Link to="/contact" className={activeLink(is("/contact"))}>contact</Link></li>
              <li><a href="/docs/Iris-PAIA-Manual-2025.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white">paia manual</a></li>
              <li><a href="https://inforegulator.org.za/wp-content/uploads/2020/07/InfoRegSA-PAIA-Form02-Reg7.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white">paia form 2 - request</a></li>
              <li><a href="https://inforegulator.org.za/wp-content/uploads/2020/07/Form-3-PAIA.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white">paia form 3 - outcome</a></li>
              <li><Link to="/privacypolicy" target="_blank" rel="noopener noreferrer" className={activeLink(is("/privacypolicy"))}>privacy policy</Link></li>
              <li><a href="/docs/IRIS-EULA.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white">eula</a></li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© {year} iris network systems</p>
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
