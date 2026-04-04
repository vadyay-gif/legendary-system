"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";

const APPLE_URL = "https://apps.apple.com/app/ai-ready/id6759277049";
const GOOGLE_URL =
  "https://play.google.com/store/apps/details?id=com.aiready.app";

function AppStoreButton({
  href,
  type,
}: {
  href: string;
  type: "apple" | "google";
}) {
  const isApple = type === "apple";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={isApple ? "Download on the App Store" : "Get it on Google Play"}
      className="inline-flex shrink-0 transition hover:opacity-85"
    >
      <img
        src={isApple ? "/badges/app-store.png" : "/badges/google-play.png"}
        alt={isApple ? "Download on the App Store" : "Get it on Google Play"}
        className="h-10 w-auto object-contain sm:h-11"
      />
    </a>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
      {children}
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.704 5.29a1 1 0 0 1 .006 1.414l-8 8.07a1 1 0 0 1-1.42-.004l-4-4.07a1 1 0 0 1 1.426-1.404l3.29 3.347 7.287-7.35a1 1 0 0 1 1.41-.003Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-slate-700">{children}</p>
    </div>
  );
}

function ExampleCard({
  label,
  tone,
  title,
  body,
}: {
  label: string;
  tone: "rose" | "sky" | "emerald";
  title: string;
  body: string;
}) {
  const toneStyles = {
    rose: {
      wrap: "border-rose-200 bg-rose-50",
      pill: "text-rose-700",
    },
    sky: {
      wrap: "border-sky-200 bg-sky-50",
      pill: "text-sky-700",
    },
    emerald: {
      wrap: "border-emerald-200 bg-emerald-50",
      pill: "text-emerald-700",
    },
  }[tone];

  return (
    <div className={`flex h-full flex-col rounded-3xl border p-6 ${toneStyles.wrap}`}>
      <div
        className={`inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide ${toneStyles.pill}`}
      >
        {label}
      </div>

      <h3 className="mt-4 text-xl font-semibold leading-snug text-slate-950">
        {title}
      </h3>

      <p className="mt-3 text-slate-700">
        {body}
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#f8fbff_0%,_#ffffff_38%,_#ffffff_100%)] text-slate-900">
      <Header />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.13),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(99,102,241,0.10),_transparent_22%)]" />

          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 md:pb-16 md:pt-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-3xl">
                <SectionEyebrow>
                  AI productivity app for professionals
                </SectionEyebrow>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl md:leading-[1.03]">
                  Get a real edge at work with better AI prompting.
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                  AI Ready helps professionals learn how to get better AI outputs
                  in just 5 minutes a day, so they can write faster, think clearer,
                  and work smarter.
                </p>

                <div className="mt-7 grid gap-3 sm:inline-flex sm:flex-wrap sm:items-center">
                  <AppStoreButton href={APPLE_URL} type="apple" />
                  <AppStoreButton href={GOOGLE_URL} type="google" />
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700">
                    9 tracks
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700">
                    45 lessons
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700">
                    135 scenarios
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700">
                    5 minutes a day
                  </span>
                </div>

                <div className="mt-7 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <CheckItem>
                      Learn practical AI skills for real work tasks
                    </CheckItem>
                    <CheckItem>
                      Built for professionals, managers, and job seekers
                    </CheckItem>
                    <CheckItem>Android: free with ads</CheckItem>
                    <CheckItem>iPhone: first lesson free, no ads</CheckItem>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl" />
                <div className="absolute -right-8 bottom-4 h-28 w-28 rounded-full bg-indigo-200/40 blur-2xl" />

                <div className="relative mx-auto max-w-[340px] rounded-[34px] border border-slate-200 bg-white p-3 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
                  <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-slate-50">
                    <img
                      src="/app-home-screen.jpg"
                      alt="AI Ready app home screen showing practical AI skill tracks for professionals"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
            <div className="flex h-full flex-col rounded-3xl border border-rose-200 bg-rose-50 p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Most people use AI, but still don’t get much advantage from it
              </h2>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-white/80 px-4 py-3 text-slate-700">
                  Vague prompts lead to weak, generic outputs
                </div>
                <div className="rounded-2xl bg-white/80 px-4 py-3 text-slate-700">
                  People waste time fixing AI responses instead of using them
                </div>
                <div className="rounded-2xl bg-white/80 px-4 py-3 text-slate-700">
                  The gap between “using AI” and “using AI well” is huge
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col rounded-3xl border border-sky-200 bg-sky-50 p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                AI Ready teaches the skill behind better AI results
              </h2>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-white/90 px-4 py-3 text-slate-700">
                  Learn how to prompt AI clearly for real work tasks
                </div>
                <div className="rounded-2xl bg-white/90 px-4 py-3 text-slate-700">
                  Build a productivity edge in emails, planning, analysis, and more
                </div>
                <div className="rounded-2xl bg-white/90 px-4 py-3 text-slate-700">
                  Practice in short scenarios that fit into a busy day
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Why it works</SectionEyrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Same task. Better prompt. Better output.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              AI Ready helps you move from vague requests to useful results you can
              actually use at work.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <ExampleCard
              label="Before"
              tone="rose"
              title='Prompt: "Summarize my week."'
              body="Too vague. No structure. The output is likely to be generic and less useful."
            />

            <ExampleCard
              label="Better prompt"
              tone="sky"
              title="Prompt: Turn these notes into a Monday action plan"
              body="Include Highlights, Metrics, Risks, and next steps so the result is structured and practical."
            />

            <ExampleCard
              label="Better result"
              tone="emerald"
              title="Output: Clear summary with priorities and action items"
              body="More usable immediately because the request was specific, structured, and work-focused."
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>What you’ll improve</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Practical AI productivity skills for work
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Write better emails faster",
                desc: "Turn rough thoughts into clear, professional messages.",
              },
              {
                title: "Turn meetings into action",
                desc: "Extract decisions, owners, deadlines, and next steps.",
              },
              {
                title: "Summarize like an executive",
                desc: "Create sharper updates and cleaner briefings.",
              },
              {
                title: "Use AI better with spreadsheets",
                desc: "Get help with formulas, cleanup, and insights.",
              },
              {
                title: "Create stronger content",
                desc: "Generate clearer posts, ideas, and marketing copy.",
              },
              {
                title: "Think more clearly at work",
                desc: "Use AI to compare options and structure decisions.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-7 text-white md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <SectionEyebrow>Who it’s for</SectionEyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                  Built for professionals who want a stronger AI advantage
                </h2>
                <p className="mt-4 max-w-xl text-slate-300">
                  Especially useful for professionals who already use AI, but want
                  better results, better productivity, and better performance at work.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "General professionals",
                  "Managers and team leads",
                  "Job seekers improving work skills",
                  "Anyone who wants to use AI more effectively",
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

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="rounded-[32px] border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-7 shadow-sm md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <SectionEyebrow>Download AI Ready</SectionEyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                  Start building your AI work advantage today
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-slate-600">
                  Short lessons. Real work scenarios. Better AI prompting in 5
                  minutes a day.
                </p>
              </div>

              <div className="grid gap-3 sm:inline-flex sm:flex-wrap sm:items-center">
                <AppStoreButton href={APPLE_URL} type="apple" />
                <AppStoreButton href={GOOGLE_URL} type="google" />
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Questions before you download
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            <Faq
              q="What is AI Ready?"
              a="AI Ready is an AI productivity app that helps professionals learn practical prompting skills for real work tasks like emails, planning, summaries, research, and decision-making."
            />
            <Faq
              q="Who is it for?"
              a="It’s built for professionals aged 35+, especially general professionals, managers, and job seekers who want to use AI more effectively at work."
            />
            <Faq
              q="How much time does it take?"
              a="About 5 minutes a day. Lessons are designed to be short, practical, and easy to fit into a busy schedule."
            />
            <Faq
              q="How does pricing work?"
              a="On Android, the app is free with ads. On iPhone, the first lesson is free and there are no ads."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
