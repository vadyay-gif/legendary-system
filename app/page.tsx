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
              Practical, role-based lessons. 9 tracks x 5 lessons x 3 scenarios.
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
          <h2 className="text-2xl font-semibold">What you will master</h2>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold">Emails & Tone</div>
              <div className="mt-1 text-slate-600 text-sm">
                Get to inbox zero with smart replies and tone control.
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold">Meetings to Action</div>
              <div className="mt-1 text-slate-600 text-sm">
                Capture decisions, assign owners, and follow up.
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold">Executive Summaries</div>
              <div className="mt-1 text-slate-600 text-sm">
                Condense long docs into crisp briefings.
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold">Data to Insights</div>
              <div className="mt-1 text-slate-600 text-sm">
                Turn spreadsheets into charts and KPI snapshots.
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold">Marketing & Social</div>
              <div className="mt-1 text-slate-600 text-sm">
                From idea to multi-platform posts fast.
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold">Research & Analysis</div>
              <div className="mt-1 text-slate-600 text-sm">
                Find sources, compare options, decide confidently.
              </div>
            </div>
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
              a="MVP will start with a small monthly subscription, with a free trial for early adopters."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
