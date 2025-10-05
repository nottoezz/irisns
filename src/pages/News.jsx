// imports
import { useEffect, useRef, useState } from "react";

// componenets
import Reveal from "@ui/Reveal";
import NeedAssistance from "@features/NeedAssistance";
import { loadExternalScript } from "@hooks/loadExternalScript";

// images
import heroImg from "@assets/img/irisLinkedin.webp";

/* config for the sociablekit widget */
const EMBED_ID = "209419";
const WIDGET_CLASS = "sk-ww-linkedin-page-post";
const WIDGET_SRC = "https://widgets.sociablekit.com/linkedin-page-posts/widget.js";
const SK_SCRIPT_SELECTOR = 'script[data-sk="linkedin-page-posts"]';

export default function News() {
  /* followers text */
  const [followers, setFollowers] = useState(null);
  const [loaded, setLoaded] = useState(false);

  /* widget container */
  const widgetRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const timeouts = [];

    loadExternalScript({
      src: WIDGET_SRC,
      selector: SK_SCRIPT_SELECTOR,
      attributes: {
        dataset: { sk: "linkedin-page-posts" },
      },
    }).catch((error) => {
      console.warn("[news] failed to load linkedin widget", error);
    });

    const el = widgetRef.current;
    if (!el) {
      return () => {
        isMounted = false;
        timeouts.forEach(clearTimeout);
      };
    }

    const readFollowers = (root) => {
      if (!root || !isMounted) {
        return;
      }

      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        null,
      );
      let found = null;

      while (walker.nextNode()) {
        const node = walker.currentNode;
        const text = node.textContent || "";
        if (/followers/i.test(text)) {
          const match = text.match(/([\d.,\s]+)\s*followers/i);
          if (match && match[1]) {
            found = match[1].trim();
            break;
          }
        }
      }

      if (found) {
        setFollowers(found);
      }
    };

    const observer = new MutationObserver((mutations) => {
      if (!isMounted) {
        return;
      }

      let sawContent = false;

      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== 1) {
            continue;
          }
          const className = node.className?.toString() || "";
          if (!sawContent && className.includes("sk-")) {
            sawContent = true;
          }
        }
      }

      if (sawContent) {
        if (isMounted) {
          setLoaded(true);
        }
        readFollowers(el);
        timeouts.push(setTimeout(() => readFollowers(el), 600));
        timeouts.push(setTimeout(() => readFollowers(el), 1500));
      }
    });

    observer.observe(el, { childList: true, subtree: true });

    return () => {
      isMounted = false;
      observer.disconnect();
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);


  return (
    <main className="relative flex-1 overflow-x-hidden bg-[#0f1123]">
      {/* hero */}
      <section className="relative overflow-hidden min-h-[520px] md:min-h-[640px]">
        {/* soft-masked hero image */}
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-85 pointer-events-none select-none lg:scale-[0.9] px-5 sm:px-10 [--inner:58%] [--outer:78%] sm:[--inner:60%] sm:[--outer:80%] lg:[--inner:64%] lg:[--outer:84%]"
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

        {/* subtle dark scrim */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 70% at 50% 40%, rgba(15,17,35,0), rgba(15,17,35,.6) 70%, rgba(15,17,35,.9))",
          }}
        />

        {/* hero copy */}
        <div className="relative z-10 container-narrow text-center py-20 md:py-28">
          <Reveal direction="down" distance={18} duration={900}>
            <div className="eyebrow mb-3 text-white/70">IRIS NETWORK SYSTEMS</div>
          </Reveal>
          <Reveal direction="down" distance={22} duration={900} delay={90}>
            <h1 className="h1">News</h1>
          </Reveal>
          <Reveal direction="down" distance={20} duration={900} delay={140}>
            <p className="mt-3 text-white/70">#KnowYourNetwork</p>
          </Reveal>
        </div>

        {/* follow + follower chip */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 sm:bottom-8">
          <div className="container max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <a
                className="pointer-events-auto btn btn-blue shadow-lg"
                href="https://www.linkedin.com/company/iris-network-systems"
                target="_blank"
                rel="noreferrer"
              >
                follow us on linkedin
              </a>
              <span className="pointer-events-auto rounded-xl border border-white/15 bg-black/20 backdrop-blur px-4 py-2 text-sm text-white/90">
                {followers ? `${followers} followers` : "... followers"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* embedded feed */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 900px at 50% 0%, rgba(255,255,255,.04), transparent 60%)",
          }}
        />
        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal direction="up" distance={28} duration={1000}>
            <div
              ref={widgetRef}
              className={WIDGET_CLASS}
              data-embed-id={EMBED_ID}
            />
          </Reveal>

          {/* skeletons while the widget paints */}
          {!loaded && (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
        </div>
      </section>

      {/* soft seam fade into the footer area */}
      <div
        aria-hidden
        className="h-16"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,17,35,0) 0%, rgba(15,17,35,.65) 60%, rgba(15,17,35,1) 100%)",
        }}
      />

      {/* need help area */}
      <section className="relative">
        <NeedAssistance />
      </section>
    </main>
  );
}

/* loading card for feed */
function SkeletonCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[.03] p-5">
      <div className="h-44 w-full rounded-lg bg-white/[.06] animate-pulse" />
      <div className="mt-4 h-4 w-2/3 rounded bg-white/[.06] animate-pulse" />
      <div className="mt-2 h-4 w-1/3 rounded bg-white/[.06] animate-pulse" />
    </article>
  );
}



