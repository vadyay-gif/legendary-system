"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";

export default function Page() {
  const [lead, setLead] = useState({ name: "", email: "", role: "" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Learn to use AI at work in minutes a day
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Practical, role-based lessons. 9 tracks × 5 lessons × 3 scenarios. Built for busy
            professionals.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/funnel"
              className="px-5 py-3 rounded-xl bg-slate-900 text-white text-center"
            >
              Take the 2-minute quiz
            </Link>
            <a className="px-5 py-3 rounded-xl border border-slate-300 text-center" href="#features">
              See how it works
            </a>
          </div>

          <form
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We'll be in touch.");
              setLead({ name: "", email: "", role: "" });
            }}
          >
            <input
              className="px-4 py-3 rounded-xl border border-slate-300"
              placeholder="Your name"
              value={lead.name}
              onChange={(e) => setLead({ ...lead, name: e.target.value })}
            />
            <input
              className="px-4 py-3 rounded-xl border border-slate-300"
              placeholder="Work email"
              type="email"
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
              required
            />
            <button className="px-5 py-3 rounded-xl bg-slate-900 text-white">Get early access</button>
          </form>
          <p className="mt-3 text-xs text-slate-500">No spam. Occasional updates and invites.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 grid place-items-center text-slate-500">
            App screenshot placeholder
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-center">
            <div className="rounded-xl bg-slate-50 border p-3">9 Tracks</div>
            <div className="rounded-xl bg-slate-50 border p-3">135 Scenarios</div>
            <div className="rounded-xl bg-slate-50 border p-3">Daily Tips</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold">What you'll master</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Emails & Tone", desc: "Get to inbox zero with smart replies and tone control." },
            { title: "Meetings → Action", desc: "Capture decisions, assign owners, and follow up." },
            { title: "Executive Summaries", desc: "Condense long docs into crisp briefings." },
            { title: "Data → Insights", desc: "Turn spreadsheets into charts and KPI snapshots." },
            { title: "Marketing & Social", desc: "From idea to multi-platform posts fast." },
            { title: "Research & Analysis", desc: "Find sources, compare options, decide confidently." },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold">{c.title}</div>
              <div className="mt-1 text-slate-600 text-sm">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-slate-50 border-y">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h3 className="text-xl font-semibold">Loved by busy professionals</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
            {[1, 2, 3].map((t) => (
              <div key={t} className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="italic">
                  “AI Ready helped me turn messy meeting notes into clear action items. Huge time saver.”
                </p>
                <p className="mt-3 text-slate-500">— Pilot user</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-xl font-semibold">FAQ</h3>
        <div className="mt-6 space-y-4">
          <Faq
            q="Who is AI Ready for?"
            a="Professionals who want to use AI to save time and improve work output—managers, ICs, founders, and consultants."
          />
          <Faq q="How much time per day?" a="As little as 5 minutes. Each scenario is short and practical." />
          <Faq q="How much will it cost?" a="Small monthly subscription with a free trial for early adopters." />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border bg-slate-900 text-white p-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h4 className="text-2xl font-semibold">Be first to try AI Ready</h4>
            <p className="mt-2 text-slate-200">Join the early access list and get daily AI tips.</p>
          </div>
          <form
            className="flex gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Saved!");
            }}
          >
            <input className="flex-1 px-4 py-3 rounded-xl text-slate-900" placeholder="Work email" />
            <button className="px-5 py-3 rounded-xl bg-white text-slate-900">Join</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
