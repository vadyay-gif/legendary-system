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
    rose: "border-rose-200 bg-rose-50 text-rose-700",
    sky: "border-sky-200 bg-sky-50 text-sky-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  }[tone];

  return (
    <div className={`flex h-full flex-col rounded-3xl border p-6 ${toneStyles}`}>
      <div className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
        {label}
      </div>

      <h3 className="mt-4 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-slate-700">{body}</p>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#f8fbff_0%,_#ffffff_38%,_#ffffff_100%)] text-slate-900">
      <Header />

      <main>
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <SectionEyebrow>
            AI productivity app for professionals
          </SectionEyebrow>

          <h1 className="mt-4 text-4xl font-bold md:text-6xl">
            Get a real edge at work with better AI prompting.
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            AI Ready helps professionals learn how to get better AI outputs in
            just 5 minutes a day.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <AppStoreButton href={APPLE_URL} type="apple" />
            <AppStoreButton href={GOOGLE_URL} type="google" />
          </div>
        </section>

        {/* WHY IT WORKS */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="text-center">
            <SectionEyebrow>Why it works</SectionEyebrow>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Same task. Better prompt. Better output.
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Move from vague requests to useful results.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <ExampleCard
              label="Before"
              tone="rose"
              title='Prompt: "Summarize my week."'
              body="Too vague. No structure. Generic output."
            />

            <ExampleCard
              label="Better prompt"
              tone="sky"
              title="Prompt: Structured weekly action plan"
              body="Includes highlights, risks, and next steps."
            />

            <ExampleCard
              label="Better result"
              tone="emerald"
              title="Output: Clear priorities & actions"
              body="Immediately usable and decision-ready."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionEyebrow>FAQ</SectionEyebrow>

          <div className="mt-6 space-y-4">
            <Faq q="What is AI Ready?" a="AI productivity app." />
            <Faq q="Who is it for?" a="Professionals." />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
