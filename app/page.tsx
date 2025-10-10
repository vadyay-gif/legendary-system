"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import AIReadyScenarioDemo from "@/components/AIReadyScenarioDemo";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current="home" />
      <main>
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Inside an AI Ready Lesson
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Every scenario is a short, practical exercise powered by AI.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/funnel"
                className="px-5 py-3 rounded-xl bg-slate-900 text-white text-center hover:bg-slate-800 transition"
              >
                Take the 2-minute quiz
              </a>
              <a
                href="/lesson"
                className="px-5 py-3 rounded-xl border border-slate-300 text-center hover:bg-slate-100 transition"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Scenario demo preview box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <AIReadyScenarioDemo />
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-slate-50 border p-3">9 Tracks</div>
          <div className="rounded-xl bg-slate-50 border p-3">135 Scenarios</div>
          <div className="rounded-xl bg-slate-50 border p-3">Daily Tips</div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            What you'll master
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Emails & Tone",
                desc: "Get to inbox zero with smart replies and tone control.",
              },
              {
                title: "Meetings → Action",
                desc: "Capture decisions, assign owners, and follow up.",
              },
              {
                title: "Executive Summaries",
                desc: "Condense long docs into crisp briefings.",
              },
              {
                title: "Data → Insights",
                desc: "Turn spreadsheets into charts and KPI snapshots.",
              },
              {
                title: "Marketing & Social",
                desc: "From idea to multi-platform posts fast.",
              },
              {
                title: "Research & Analysis",
                desc: "Find sources, compare options, decide confidently.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="text-lg font-semibold">{c.title}</div>
                <div className="mt-1 text-slate-600 text-sm">{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
          <h3 className="text-xl font-semibold mb-6">FAQ</h3>
          <div className="space-y-4">
            <Faq
              q="Who is AI Ready for?"
              a="Professionals who want to use AI to save time and improve work output — managers, ICs, founders, and consultants."
            />
            <Faq
              q="How much time per day?"
              a="As little as 5 minutes. Each scenario is designed to be short and practical."
            />
            <Faq
              q="How much will it cost?"
              a="MVP will start with a small monthly subscription, with a free trial for early adopters."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
