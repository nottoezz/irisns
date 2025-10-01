// imports
import { useEffect, useRef, useState } from "react";

// components
import Reveal from "@ui/Reveal";
import NeedAssistance from "@features/NeedAssistance";
import ContactMap from "@features/ContactMap";
import { loadExternalScript } from "@hooks/loadExternalScript";

// imgs
import heroImg from "@assets/img/irisContactHero.webp";

// cloudflare and server consts
const TURNSTILE_SITEKEY = "0x4AAAAAABzrbGQ8Qi9Ke_2D";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const FORM_ACTION = "/mail/";

export default function Contact() {
  // track submit state for "thanks" message
  const [status, setStatus] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const iframeRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    loadExternalScript({
      src: TURNSTILE_SRC,
      selector: "script[data-turnstile='1']",
      attributes: {
        dataset: { turnstile: "1" },
      },
    }).catch((error) => {
      console.warn("[contact] failed to load turnstile", error);
      if (isMounted) {
        setStatus("verification failed to load. please refresh and try again.");
        setCanSubmit(false);
      }
    });

    const handleSuccess = () => {
      if (isMounted) setCanSubmit(true);
    };
    const handleExpired = () => {
      if (isMounted) setCanSubmit(false);
    };
    const handleError = () => {
      if (isMounted) {
        setCanSubmit(false);
        setStatus("verification failed. please retry.");
      }
    };

    window.onTsSuccess = handleSuccess;
    window.onTsExpired = handleExpired;
    window.onTsError = handleError;

    const onIframeLoad = () => {
      if (formRef.current?._pendingSubmit) {
        formRef.current.reset();
        setCanSubmit(false);
        if (window.turnstile) {
          window.turnstile.reset();
        }
        setStatus("thank you - we'll be in touch shortly.");
        formRef.current._pendingSubmit = false;
      }
    };

    const node = iframeRef.current;
    node?.addEventListener("load", onIframeLoad);

    return () => {
      isMounted = false;
      delete window.onTsSuccess;
      delete window.onTsExpired;
      delete window.onTsError;
      node?.removeEventListener("load", onIframeLoad);
    };
  }, []);

  // simple gate before we let the browser submit the form
  const onSubmit = (e) => {
    const form = formRef.current;
    if (!form) return;
    if (!form.checkValidity()) {
      // let the browser show native validation
      e.preventDefault();
      form.reportValidity();
      return;
    }
    // require a turnstile token
    const token = form.querySelector(
      'input[name="cf-turnstile-response"]'
    )?.value;
    if (!token) {
      e.preventDefault();
      setCanSubmit(false);
      setStatus("please complete the verification first.");
      return;
    }
    // are you sure alert?
    const first = form.elements["fname"]?.value?.trim() || "there";
    if (!window.confirm(`submit the form for: ${first}?`)) {
      e.preventDefault();
      return;
    }
    // flip pending for iframe
    form._pendingSubmit = true;
    setStatus("sending…");
  };

  return (
    <main className="relative flex-1 overflow-x-hidden bg-[#0f1123] text-white">
      {/* give some depth, soft wash */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1100px 700px at 8% 10%, rgba(59,130,246,.08), transparent 60%), radial-gradient(900px 700px at 92% 88%, rgba(14,165,233,.08), transparent 60%)",
        }}
      />

      {/* header and hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* hero img */}
        <img
          src={heroImg}
          alt=""
          aria-hidden
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
        <div className="relative container max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <Reveal direction="down" distance={18} duration={2000}>
            <div className="eyebrow mb-3 text-white/70">
              IRIS NETWORK SYSTEMS
            </div>
          </Reveal>
          <Reveal direction="down" distance={22} duration={2000} delay={90}>
            <h1 className="h1 text-white">Contact</h1>
          </Reveal>
          <Reveal direction="down" distance={20} duration={2000} delay={140}>
            <p className="mt-3 text-white/70">
              we’re here to help — support portal, sales, or a quick message.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2 col support form */}
      <section className="relative">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8 pt-5">
          <div className="grid gap-8 md:grid-cols-2">
            {/* left col */}
            <Reveal direction="left" duration={2000}>
              <div className="rounded-2xl border border-white/10 bg-white/[.03] p-6 h-full">
                <h2 className="text-xl font-semibold">support</h2>
                <p className="mt-2 text-white/80">
                  our support portal covers the most common questions. if you
                  can’t find what you need, drop us a note.
                </p>
                <div className="mt-4 flex gap-3">
                  <a
                    className="btn btn-blue"
                    href="https://support.irisns.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Support Portal
                  </a>
                </div>

                <hr className="my-6 border-white/10" />

                {/* contact list */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-medium">email support</h3>
                    <a
                      className="text-blue-300 underline underline-offset-4"
                      href="mailto:support@irisns.com"
                    >
                      support@irisns.com
                    </a>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">escalations</h3>
                    <a
                      className="text-blue-300 underline underline-offset-4"
                      href="tel:+27861474767"
                    >
                      0861 474 767 (IrisNS)
                    </a>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">sales</h3>
                    <div className="space-y-1">
                      <a
                        className="block text-blue-300 underline underline-offset-4"
                        href="tel:+27214184840"
                      >
                        021 418 4840
                      </a>
                      <a
                        className="block text-blue-300 underline underline-offset-4"
                        href="mailto:sales@irisns.com"
                      >
                        sales@irisns.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* right: message form */}
            <Reveal direction="right" duration={2000}>
              <div className="rounded-2xl border border-white/10 bg-white/[.03] p-6">
                <h2 className="text-xl font-semibold">send us a message</h2>

                <form
                  ref={formRef}
                  action={FORM_ACTION}
                  method="post"
                  target="iris-hidden-form"
                  onSubmit={onSubmit}
                  className="mt-5 grid gap-4"
                >
                  {/* normal contact fields — nothing fancy */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="fname"
                        className="block text-sm text-white/80"
                      >
                        first name (required)
                      </label>
                      <input
                        id="fname"
                        name="fname"
                        type="text"
                        required
                        className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lname"
                        className="block text-sm text-white/80"
                      >
                        last name (required)
                      </label>
                      <input
                        id="lname"
                        name="lname"
                        type="text"
                        required
                        className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm text-white/80"
                      >
                        mobile (required)
                      </label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        required
                        className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm text-white/80"
                      >
                        email (required)
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm text-white/80"
                    >
                      message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* turnstile widget — cloudflare will render into this div */}
                  <div
                    className="cf-turnstile mt-1"
                    data-sitekey={TURNSTILE_SITEKEY}
                    data-theme="dark"
                    data-size="normal"
                    data-callback="onTsSuccess"
                    data-expired-callback="onTsExpired"
                    data-error-callback="onTsError"
                  />

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="btn btn-blue disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      submit
                    </button>
                    <p
                      className="text-sm text-white/70"
                      role="status"
                      aria-live="polite"
                    >
                      {status}
                    </p>
                  </div>
                </form>

                {/* hidden iframe target — we post into this so the page doesn’t navigate */}
                <iframe
                  ref={iframeRef}
                  name="iris-hidden-form"
                  title="hidden form target"
                  className="hidden"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* address map */}
      <section className="relative mt-16">
        <ContactMap />
      </section>
      
      {/* need assistance */}
      <section className="relative mt-16">
        <NeedAssistance />
      </section>

    </main>
  );
}


