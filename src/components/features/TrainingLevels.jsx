// imports
import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../ui/Reveal";

// chevron icon used in accordions
function Chevron({ open }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// simple accordion section
function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-white/10 first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3.5 text-left text-white/90 hover:text-white px-1 rounded-md hover:bg-white/[.035] transition-colors"
      >
        <span className="text-[17px] font-semibold">{title}</span>
        <Chevron open={open} />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden pb-3 pl-1 pr-2">{children}</div>
      </div>
    </div>
  );
}

// grey-hover link button (no solid background by default)
function GhostLink({ href, children }) {
  return (
    <a
      href={href || "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      className="block w-full rounded-lg px-4 py-3 text-center
                 text-white/90 border border-transparent bg-white/5
                 hover:bg-white/[.06] hover:border-white/10
                 transition"
    >
      {children}
    </a>
  );
}

export default function TrainingLevels() {
  // base card styling shared by some blocks
  const cardBase =
    "rounded-2xl p-6 md:p-7 transition-colors hover:bg-white/[.035]";

  return (
    <section className="relative bg-[#0f1123] py-16 md:py-20">
      {/* background layer placeholder (kept empty intentionally) */}
      <div aria-hidden className="pointer-events-none absolute inset-0" />

      {/* heading */}
      <div className="container-narrow relative z-10 text-center">
        <div className="mx-auto mb-5 flex flex-col items-center gap-2">
          {/* tiny decorative dots */}
          <Reveal direction="down" duration={1400} distance={20} delay={100}>
            <div className="mt-5 mx-auto mb-2 h-1 w-1 rounded-full bg-blue-600/30" />
          </Reveal>
          <Reveal direction="down" duration={1800} distance={20} delay={200}>
            <div className="-mt-2 mx-auto mb-2 h-1 w-1 rounded-full bg-blue-600/60" />
          </Reveal>
          <Reveal direction="down" duration={2200} distance={20} delay={300}>
            <div className="-mt-2 mx-auto mb-4 h-1 w-1 rounded-full bg-blue-600/60" />
          </Reveal>
        </div>
        <Reveal direction="down" duration={2000} distance={40}>
          <div className="text-white/60 tracking-[.28em] text-xs">WE OFFER</div>
        </Reveal>
        <Reveal direction="down" duration={2000} distance={40}>
          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-white">
            Training for
          </h2>
        </Reveal>
      </div>

      {/* cards grid */}
      <div className="container-narrow relative z-10 mt-10 md:mt-12 grid gap-7 lg:grid-cols-3">
        {/* level 1 */}
        <Reveal direction="left" distance={20} duration={2000}>
          <article className={cardBase}>
            <div className="text-blue-400 text-sm tracking-widest">01</div>
            <h3 className="mt-1.5 text-2xl md:text-3xl font-extrabold text-white">
              ICE <span className="font-semibold text-white/90">Level 1</span>
            </h3>

            <div className="mt-4 inline-flex items-center rounded-full border border-white/20 px-5 py-2 text-white/90">
              End user
            </div>

            <p className="mt-5 text-white/75">
              Visualise your links and customer devices using the graphs
              browser.
            </p>

            {/* quick links */}
            <div className="mt-6 space-y-3">
              <GhostLink href="https://support.irisns.com/support/solutions/articles/11000120162">
                Iris training overview
              </GhostLink>
              <GhostLink href="https://support.irisns.com/support/solutions/articles/11000121031">
                Logging Into Iris
              </GhostLink>
              <GhostLink href="https://support.irisns.com/support/solutions/articles/11000120178">
                Graph Browser
              </GhostLink>
              <GhostLink href="https://support.irisns.com/support/solutions/articles/11000120179">
                Graph Troubleshooter
              </GhostLink>
              <GhostLink href="https://support.irisns.com/support/solutions/articles/11000121032">
                Logging Support Requests
              </GhostLink>
              <GhostLink href="https://support.irisns.com/support/solutions/articles/11000121038">
                Online Support & Knowledge Base
              </GhostLink>
            </div>
          </article>
        </Reveal>

        {/* level 2 (accordion with full contents) */}
        <Reveal direction="down" distance={20} duration={2000} delay={80}>
          <article className="rounded-2xl p-6 md:p-7 transition-colors hover:bg-white/[.035]">
            <div className="text-blue-400 text-sm tracking-widest">02</div>
            <h3 className="mt-1.5 text-2xl md:text-3xl font-extrabold text-white">
              ICE <span className="font-semibold text-white/90">Level 2</span>
            </h3>

            <div className="mt-4 inline-flex items-center rounded-full border border-white/20 px-5 py-2 text-white/90">
              NOC | CSOC | Service Manager
            </div>

            <p className="mt-5 text-white/75">
              Troubleshooting, utilising reports, or managing alerts.
            </p>

            {/* quick actions */}
            <div className="mt-6 grid gap-3 sm:max-w-[520px]">
              <GhostLink href="https://support.irisns.com/support/solutions/articles/11000120162">
                Iris training overview
              </GhostLink>
              <GhostLink href="https://support.irisns.com/support/solutions/articles/11000121032">
                Logging a poller request
              </GhostLink>
            </div>

            {/* accordion list */}
            <div className="mt-7 sm:max-w-[640px]">
              {/* module 1 */}
              <Section title="Module 1 – Graphs searching and the troubleshooter">
                <div className="grid gap-3 pt-5">
                  <GhostLink>Collecting Data in Iris</GhostLink>
                  <GhostLink>Searching in Iris</GhostLink>
                  <GhostLink>Graph Browser</GhostLink>
                  <GhostLink>Troubleshooter</GhostLink>
                </div>
              </Section>

              {/* module 2 */}
              <Section title="Module 2 – Events & Alarms">
                <div className="grid gap-3 pt-5">
                  <GhostLink>Alarms and Severity</GhostLink>
                  <GhostLink>Alarms vs. Events</GhostLink>
                </div>
              </Section>

              {/* sub-systems generating alarms */}
              <Section title="Sub-Systems Generating Alarms (see sub-topics)">
                <div className="grid gap-3 pt-5">
                  {/* dashed box for grouped items */}
                  <div className="rounded-lg border-2 border-dashed border-white/20 p-3 grid gap-3">
                    <GhostLink>Active Monitoring</GhostLink>
                    <GhostLink>Syslogs and SNMP traps</GhostLink>
                    <GhostLink>Thresholds</GhostLink>
                  </div>

                  <GhostLink>How does Iris determine status is DOWN</GhostLink>
                  <GhostLink>Alarm Manager</GhostLink>
                  <GhostLink>Searching Event Logs</GhostLink>
                </div>
              </Section>

              {/* module 3 */}
              <Section title="Module 3 – Dashboards">
                <div className="grid gap-3 pt-5">
                  <GhostLink>Default Dashboard</GhostLink>
                  <GhostLink>User Dashboards</GhostLink>
                  <GhostLink>Maps Visualisation</GhostLink>
                </div>
              </Section>

              {/* module 4 */}
              <Section title="Module 4 – Reports">
                <div className="grid gap-3 pt-5">
                  <GhostLink>Device Health</GhostLink>
                  <GhostLink>Device Info</GhostLink>
                  <GhostLink>Top N</GhostLink>
                  <GhostLink>Netflow Reports</GhostLink>
                  <GhostLink>Iris Reports</GhostLink>
                  <GhostLink>Event Report</GhostLink>
                </div>
              </Section>

              {/* apps */}
              <Section title="Iris Apps">
                <div className="grid gap-3 pt-5">
                  <GhostLink>Iris Maps</GhostLink>
                </div>
              </Section>
            </div>
          </article>
        </Reveal>

        {/* level 3 (same style/behavior with full contents) */}
        <Reveal direction="right" distance={20} duration={2000} delay={140}>
          <article className={cardBase}>
            <div className="text-blue-400 text-sm tracking-widest">03</div>
            <h3 className="mt-1.5 text-2xl md:text-3xl font-extrabold text-white">
              ICE <span className="font-semibold text-white/90">Level 3</span>
            </h3>

            <div className="mt-4 inline-flex items-center rounded-full border border-white/20 px-5 py-2 text-white/90">
              Administrator | Ops Manager
            </div>

            <p className="mt-5 text-white/75">
              All items in ICE 2 + the following:
            </p>

            <div className="mt-6 sm:max-w-[640px]">
              {/* module 5 – configuration */}
              <Section title="Module 5 – Configuration" defaultOpen={false}>
                <div className="text-white/60 text-xs font-semibold mb-2 pt-5">
                  DEVICES
                </div>
                <div className="space-y-3">
                  <GhostLink href="#">Manage Devices</GhostLink>
                  <GhostLink href="#">Monitoring Profiles</GhostLink>
                </div>
              </Section>

              {/* views */}
              <Section title="Views" defaultOpen={false}>
                <div className="space-y-3 pt-5">
                  <GhostLink href="#">Manage Views</GhostLink>
                  <GhostLink href="#">Edit Mnemonics</GhostLink>
                  <GhostLink href="#">Edit Stacks</GhostLink>
                  <GhostLink href="#">List Elements</GhostLink>
                </div>
              </Section>

              {/* monitoring */}
              <Section title="Monitoring" defaultOpen={false}>
                <div className="space-y-3 pt-5">
                  <GhostLink href="#">Set Thresholds</GhostLink>
                  <GhostLink href="#">
                    Syslogs Rules and SNMP Trap Rules
                  </GhostLink>
                  <GhostLink href="#">Notification Groups</GhostLink>
                  <GhostLink href="#">Notification Rules</GhostLink>
                  <GhostLink href="#">Notification Templates</GhostLink>
                  <GhostLink href="#">Set Topologies</GhostLink>
                  <GhostLink href="#">
                    Maintenance and Data Exclusions
                  </GhostLink>
                </div>
              </Section>

              {/* systems */}
              <Section title="Systems" defaultOpen={false}>
                <div className="space-y-3 pt-5">
                  <GhostLink href="#">Manage Users</GhostLink>
                  <GhostLink href="#">Manage Roles</GhostLink>
                </div>
              </Section>

              {/* tools */}
              <Section title="Tools" defaultOpen={false}>
                <div className="space-y-3 pt-5">
                  <GhostLink href="#">Ping and Traceroute</GhostLink>
                </div>
              </Section>
            </div>
          </article>
        </Reveal>
      </div>

      {/* cta row */}
      <div className="container-narrow relative z-10 mt-10 md:mt-12 flex flex-wrap justify-center gap-3">
        <a
          className="btn btn-blue"
          href="https://support.irisns.com/support/home"
          target="_blank"
          rel="noreferrer"
        >
          Support
        </a>
        <Link to="/contact" className="btn btn-pill">
          Request Demo
        </Link>
      </div>
    </section>
  );
}
