"use client";

import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromptCard from "@/components/PromptCard";
import { getRandomLesson } from "@/lib/lessons";

export default function LessonPage() {
  // Pick 1 random lesson when the page loads (client-side for simplicity)
  const lesson = useMemo(() => getRandomLesson(), []);

  function reroll() {
    // reload to get another random pick (we currently have 1; this is future-proof)
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current="lesson" />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500">{lesson.track}</div>
            <h1 className="mt-1 text-2xl font-bold">{lesson.title}</h1>
            <p className="mt-2 text-slate-600">{lesson.summary}</p>
          </div>
          <button onClick={reroll} className="rounded-lg border px-3 py-1 text-sm hover:border-slate-400">
            New random lesson
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {lesson.scenarios.slice(0, 3).map((s) => (
            <PromptCard key={s.id} scenario={s} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
