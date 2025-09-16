"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current="home" />
      <main>
        <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Learn to use AI at work in minutes a day
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Practical, role-based lessons. 9 tracks × 5 lessons × 3 scenarios. Built for busy professionals.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="/funnel" className="px-5 py-3 rounded-xl bg-slate-900 text-white text-center">
                Take the 2-minute quiz
              </a>
              <a href="#features" className="px-5 py-3 rounded-xl border border-slate-300 text-center">
                See how it works
              </a>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
          <h3 className="text-xl font-semibold">FAQ</h3>
          <div className="mt-6 space-y-4">
            <Faq q="Who is AI Ready for?" a="Professionals who want to use AI to save time and improve work output—managers, ICs, founders, and consultants." />
            <Faq q="How much time per day?" a="As little as 5 minutes. Each scenario is designed to be
