"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import AIReadyScenarioDemo from "@/components/AIReadyScenarioDemo";

const APPLE_URL = "https://apps.apple.com/app/ai-ready/id6759277049";
const GOOGLE_URL =
  "https://play.google.com/store/apps/details?id=com.aiready.app";

function StoreButton({
  href,
  platform,
  sublabel,
  dark = true,
}: {
  href: string;
  platform: "apple" | "google";
  sublabel: string;
  dark?: boolean;
}) {
  const base =
    "group inline-flex items-center justify-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200";
  const style = dark
    ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800 hover:border-slate-800"
    : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${style}`}
      aria-label={
        platform === "apple" ? "Download on the App Store" : "Get it on Google Play"
      }
    >
      <span className="shrink-0">
        {platform === "apple" ? <AppleIcon /> : <GooglePlayIcon />}
      </span>

      <span className="text-left leading-tight">
        <span className="block text-[11px] uppercase tracking-wide opacity-80">
          {sublabel}
        </span>
        <span className="block text-sm font-semibold">
          {platform === "apple" ? "App Store" : "Google Play"}
        </span>
      </span>
    </a>
  );
}

function AppleIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.37 12.11c.02 2.23 1.96 2.97 1.98 2.98-.02.05-.31 1.08-1.02 2.13-.61.91-1.25 1.82-2.24 1.84-.97.02-1.28-.58-2.39-.58-1.12 0-1.46.56-2.37.6- .95.03-1.68-.96-2.3-1.86-1.27-1.83-2.24-5.18-.94-7.43.64-1.12 1.79-1.83 3.04-1.85.95-.02 1.84.64 2.39.64.56 0 1.61-.79 2.72-.67.47.02 1.77.19 2.61 1.42-.07.04-1.56.91-1.54 2.78Zm-2.02-4.92c.51-.62.86-1.49.77-2.35-.73.03-1.62.49-2.15 1.1-.47.54-.88 1.42-.77 2.26.81.06 1.63-.41 2.15-1.01Z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path fill="#34A853" d="M3.9 2.3 13.6 12 3.9 21.7c-.3-.2-.5-.6-.5-1.1V3.4c0-.5.2-.9.5-1.1Z" />
      <path fill="#4285F4" d="M16.7 15.1 6 21.2 13.6 12l3.1 3.1Z" />
      <path fill="#FBBC04" d="M20.3 10.1c.9.5.9 1.3 0 1.8l-3.6 2.1L13.6 12l3.1-2.1 3.6 2.2Z" />
      <path fill="#EA4335" d="M6 2.8l10.7 6.1-3.1 3.1L6 2.8Z" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(99,102,241,0.10),_transparent_24%),linear-gradient(to_bottom,_#f8fbff,_#ffffff)] text-slate-900">
      <Header current="home" />

      <main className="overflow-hidden">
        {/* HERO */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative">
                <SectionLabel>AI skills for real work</SectionLabel>

                <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl md:leading-[1.05]">
                  Stop getting weak AI answers.
                  <span className="block text-sky-700">
                    Learn the prompts that actually work.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                  AI Ready teaches busy professionals how to turn vague requests
                  into clear, useful outputs using short, practical lessons you
                  can finish in minutes a day.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <StoreButton
                    href={APPLE_URL}
                    platform="apple"
                    sublabel="Download on the"
                  />
                  <StoreButton
                    href={GOOGLE_URL}
                    platform="google"
                    sublabel="Get it on"
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                    9 tracks
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                    45 lessons
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                    135 scenarios
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700">
                    Built for professionals
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/funnel"
                    className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
                  >
                    Take the 2-minute AI test
                  </a>
                  <a
                    href="/lesson"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    See a sample lesson
                  </a>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  Learn faster. Work smarter. Improve your AI outputs from day one.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-sky-200/30 blur-2xl" />
                <div className="absolute -right-8 bottom-10 h-32 w-32 rounded-full bg-indigo-200/30 blur-2xl" />

                <div className="relative rounded-[28px] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_80px_-25px_rgba(15,23,42,0.22)] backdrop-blur">
                  <AIReadyScenarioDemo />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Short daily practice", value: "5 min" },
                    { label: "Practical scenarios", value: "135" },
                    { label: "Real work use cases", value: "9 tracks" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
                    >
                      <div className="text-xl font-bold text-slate-950">
                        {item.value}
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM / SOLUTION */}
        <section className="mx-auto max-w-7xl px-4 py-6 md:py-10">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Why AI feels hit or miss
              </h2>
              <ul className="mt-5 space-y-4 text-slate-700">
                <li className="rounded-2xl bg-white/70 px-4 py-3">
                  Vague prompts lead to generic, disappointing outputs
                </li>
                <li className="rounded-2xl bg-white/70 px-4 py-3">
                  You waste time rewriting, clarifying, and fixing responses
                </li>
                <li className="rounded-2xl bg-white/70 px-4 py-3">
                  Results feel inconsistent, especially for real work tasks
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                What AI Ready helps you do instead
              </h2>
              <ul className="mt-5 space-y-4 text-slate-700">
                <li className="rounded-2xl bg-white/80 px-4 py-3">
                  Use structured prompts that produce better results faster
                </li>
                <li className="rounded-2xl bg-white/80 px-4 py-3">
                  Turn messy inputs into clear emails, summaries, plans, and reports
                </li>
                <li className="rounded-2xl bg-white/80 px-4 py-3">
                  Build repeatable AI skills you can use every day at work
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>See the difference</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Same task. Better prompt. Better output.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              AI Ready teaches a practical prompting system so your results become
              clearer, stronger, and more useful.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                Weak prompt
              </div>
              <h3 className="mt-4 text-xl font-semibold">“Summarize my week.”</h3>
              <p className="mt-3 text-slate-600">
                Too vague. No structure. No priorities. No action plan.
              </p>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                You had a busy week. Several things happened across projects, and
                there were some wins and some risks. Next week you should continue
                working on priorities and communicate updates clearly.
              </div>
            </div>

            <div className="rounded-3xl border border-sky-200 bg-sky-50 p-6 shadow-sm">
              <div className="inline-flex rounded-full bg-sky-600 px-3 py-1 text-sm font-semibold text-white">
                AI Ready approach
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                “Summarize my week from the notes below and turn it into a Monday
                action plan. Use sections: Highlights, Metrics, Lessons, Risks,
                Next-Week Plan with owners and time boxes.”
              </h3>
              <p className="mt-3 text-slate-700">
                Clear task, structure, and outcome. Much more useful immediately.
              </p>

              <div className="mt-5 rounded-2xl border border-sky-200 bg-white p-4 text-sm text-slate-700">
                <div><strong>Highlights:</strong> 3 new users onboarded successfully.</div>
                <div className="mt-2"><strong>Metrics:</strong> Traffic up 12%, conversion stable at 4.3%.</div>
                <div className="mt-2"><strong>Lessons:</strong> Async review saved ~2h this week.</div>
                <div className="mt-2"><strong>Risks:</strong> API reliability still needs monitoring.</div>
                <div className="mt-2">
                  <strong>Next-Week Plan:</strong> Update dashboard (Owner, 90m),
                  write help docs (Owner, 45m).
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUTCOMES */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <SectionLabel>What you’ll be able to do</SectionLabel>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Practical AI skills for everyday work
              </h2>
            </div>
            <p className="max-w-2xl text-slate-600">
              Each lesson is built around realistic scenarios so the skill transfers
              directly into your job, not just into a demo.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Write better emails in seconds",
                desc: "Turn rough notes into clear, professional messages with the right tone.",
              },
              {
                title: "Turn meetings into action",
                desc: "Extract decisions, owners, deadlines, and follow-ups without the chaos.",
              },
              {
                title: "Summarize like an executive",
                desc: "Condense long updates and documents into clean, high-value briefings.",
              },
              {
                title: "Get clearer insights from data",
                desc: "Use AI to structure, analyze, and explain spreadsheets and reports faster.",
              },
              {
                title: "Create content without overthinking",
                desc: "Generate marketing ideas, posts, hooks, and messaging more efficiently.",
              },
              {
                title: "Research and compare options faster",
                desc: "Find key facts, compare alternatives, and make stronger recommendations.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="inline-flex rounded-xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  AI Ready
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <SectionLabel>Who it’s for</SectionLabel>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                  Built for professionals who want real output, not AI hype
                </h2>
                <p className="mt-4 max-w-xl text-slate-300">
                  Especially useful if you already use AI but your results still
                  feel inconsistent, generic, or harder to use than they should be.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Managers who need clearer updates and faster planning",
                  "Consultants who want sharper summaries and client-ready outputs",
                  "Founders who need help across content, analysis, and decision-making",
                  "Individual contributors who want to save time and improve work quality",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOAD CTA */}
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="rounded-[32px] border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-8 shadow-sm md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <SectionLabel>Start now</SectionLabel>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                  Start using AI properly today
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-slate-600">
                  No fluff. No theory overload. Just short, practical lessons that
                  help you get better AI results at work.
                </p>
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  Free during early access.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <StoreButton
                  href={APPLE_URL}
                  platform="apple"
                  sublabel="Download on the"
                />
                <StoreButton
                  href={GOOGLE_URL}
                  platform="google"
                  sublabel="Get it on"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
              Questions people usually ask
            </h3>
          </div>

          <div className="mt-8 space-y-4">
            <Faq
              q="Who is AI Ready for?"
              a="Professionals who want to save time and get better AI outputs at work—managers, individual contributors, founders, consultants, and anyone who already uses AI but wants more reliable results."
            />
            <Faq
              q="How much time does it take?"
              a="As little as 5 minutes a day. Each scenario is short, practical, and designed to improve your prompting through real work examples."
            />
            <Faq
              q="What will I actually learn?"
              a="You’ll learn how to write better prompts for emails, summaries, meetings, research, spreadsheets, content, planning, and decision-making—using a practical structure you can apply immediately."
            />
            <Faq
              q="How much does it cost?"
              a="AI Ready is currently free during early access."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
