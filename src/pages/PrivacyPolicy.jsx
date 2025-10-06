import { useMemo } from "react";
import policyTxt from "@/content/privacy-policy.txt?raw";
import NeedAssistance from "../components/features/NeedAssistance";

export default function PrivacyPolicy() {
  const lines = useMemo(() => {
    const raw = (policyTxt || "").split(/\r?\n/).map((l) => l.trimEnd());
    return raw.filter((l) => !/^_+$/.test(l)).filter((l) => l.length > 0);
  }, []);

  // type guards
  const isH1 = (s) => /^privacy policy$/i.test(s.trim());
  const isAllCapsBlurb = (s) =>
    /BY ACCESSING AND USING THIS WEBSITE/i.test(s) ||
    /CONSENTS TO THE PROCESSING/i.test(s);
  const isH2 = (s) => /^\d+\.\s+/.test(s) && !/^\d+(?:\.\d+)+\s+/.test(s);
  const isNumbered = (s) => /^\d+(?:\.\d+)+\s+/.test(s);

  const splitNumbered = (s) => {
    const m = s.match(/^(\d+(?:\.\d+)+)\s+(.*)$/);
    return m ? { num: m[1], body: m[2] } : null;
  };

  const depthFromNum = (num) => (num.match(/\./g) || []).length + 1;
  const indentClass = (depth) => {
    switch (depth) {
      case 2:
        return "pl-3 md:pl-10";
      case 3:
        return "pl-6 md:pl-20";
      case 4:
        return "pl-8 md:pl-40";
      default:
        return "pl-0";
    }
  };

  const idFromHeading = (s) =>
    s
      .toLowerCase()
      .replace(/^\d+\.\s*/, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  return (
    <main className="relative bg-[#0f1324] text-white background-generator">
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl">
          {lines.map((line, i) => {
            if (isH1(line)) {
              return (
                <h1
                  key={`h1-${i}`}
                  className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
                >
                  {line}
                </h1>
              );
            }

            if (isAllCapsBlurb(line)) {
              return (
                <p
                  key={`blurb-${i}`}
                  className="max-w-4xl text-[13px] md:text-sm leading-6 md:leading-7 text-white/80 mb-5"
                >
                  {line}
                </p>
              );
            }

            if (isH2(line)) {
              const clean = line.replace(/^\d+\.\s*/, "");
              return (
                <h2
                  id={idFromHeading(line)}
                  key={`h2-${i}`}
                  className="text-3xl md:text-4xl font-semibold mt-10 mb-5 tracking-tight"
                >
                  <span className="text-white/70 mr-3">
                    {line.match(/^\d+\./)?.[0]}
                  </span>
                  {clean}
                </h2>
              );
            }

            if (isNumbered(line)) {
              const parts = splitNumbered(line);
              if (parts) {
                const depth = depthFromNum(parts.num);

                return (
                  <div
                    key={`item-${i}`}
                    className={`flex items-start ${indentClass(
                      depth
                    )} mb-3 md:mb-3.5 max-w-5xl`}
                  >
                    <span className="shrink-0 w-14 md:w-16 text-right tabular-nums text-white/70 pr-2 md:pr-3 leading-7 md:leading-8">
                      {parts.num}
                    </span>

                    <p className="leading-7 md:leading-8 text-white/90">
                      {parts.body}
                    </p>
                  </div>
                );
              }
            }

            return (
              <p
                key={`p-${i}`}
                className="max-w-4xl leading-7 md:leading-8 text-white/85 mb-3"
              >
                {line}
              </p>
            );
          })}
        </div>
      </section>

      <section>
        <NeedAssistance />
      </section>
    </main>
  );
}
