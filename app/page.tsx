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
        {/* HERO SECTION */}
        <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          {/* Left side */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Learn to use AI at work in minutes a day
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Practical, role-based lessons. 9 tracks × 5 lessons × 3 scenarios.
              Built for busy professionals.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/funnel"
                className="px-5 py-3 rounded-xl bg-slate-900 text-white text-center"
              >
                Take the 2-minute quiz
              </a>
              <a
                href="/lesson"
                className="px-5 py-3 rounded-xl border border-slate-300 text-center"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Right side with demo */}
          <div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <AIReadyScenarioDemo />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-slate-50 border p-3">9 Tracks</div>
              <div className="rounded-xl bg-slate-50 border p-3">135 Scenarios</div>
              <div className="rounded-xl bg-slate-50 border p-3">Daily Tips</div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">What you’ll master</h2>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="mt-1 text-slate-600 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
          <h3 className="text-xl font-semibold">FAQ</h3>

          <div className="mt-6 space-y-4">
            <Faq
              q="Who is AI Ready for?"
              a="Professionals who want to use AI to save time and improve work output—managers, ICs, founders, and consultants."
            />
            <Faq
              q="How much time per day?"
              a="As little as 5 minutes. Each scenario is designed to be short and practical."
            />
            <Faq
              q="How much will it cost?"
              a="The AI Ready app is completely free for early adopters."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
