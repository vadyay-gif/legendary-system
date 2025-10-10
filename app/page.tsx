"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIReadyScenarioDemo from "@/components/AIReadyScenarioDemo";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header current="home" />
      <main>
        <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Learn to use AI at work in minutes a day
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Practical, role-based lessons. 9 tracks x 5 lessons x 3 scenarios.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="/funnel" className="px-5 py-3 rounded-xl bg-slate-900 text-white text-center">
                Take the 2-minute quiz
              </a>
              <a href="/lesson" className="px-5 py-3 rounded-xl border border-slate-300 text-center">
                See how it works
              </a>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <AIReadyScenarioDemo />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
