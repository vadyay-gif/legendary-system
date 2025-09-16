"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- Temporary: local sample lesson until the AI Ready API is wired up ---
type Scenario = { id: string; title: string; prompt: string; tip?: string };
type Lesson = {
  id: string;
  track: string;
  title: string;
  description: string;
  scenarios: Scenario[];
};

// a tiny pool to randomize from (swap with real API later)
const SAMPLE_LESSONS: Lesson[] = [
  {
    id: "email-tone",
    track: "Everyday Communication",
    title: "Write clearer emails with the right tone",
    description:
      "Use AI to turn vague drafts into clear, confident messages tailored to your audience.",
    scenarios: [
      {
        id: "s1",
        title: "Turn bullet notes into a concise email",
        prompt:
          "Turn these bullets into a concise email to my team about Friday's deadline: • testing running behind • need 24h extension • new ETA Monday 10am • ask for blockers",
        tip: "Add 'friendly but direct tone' to guide the style.",
      },
      {
        id: "s2",
        title: "Polish a tough message",
        prompt:
          "Rewrite this message in a firm but respectful tone for a vendor who missed a milestone: <paste your draft>",
        tip: "Ask AI for two tone options and pick the best.",
      },
      {
        id: "s3",
        title: "Adapt tone for exec audience",
        prompt:
          "Summarize this long update for an executive in 5 bullet points with clear next steps: <paste the update>",
      },
    ],
  },
  {
    id: "meeting-notes",
    track: "Meetings & Notes",
    title: "From meeting notes to action plan",
    description:
      "Convert raw notes into owners, deadlines, and follow-ups in minutes.",
    scenarios: [
      {
        id: "s1",
        title: "Extract decisions and owners",
        prompt:
          "From these raw notes, list Decisions, Owners, and Due Dates: <paste your notes>",
      },
      {
        id: "s2",
        title: "Write a follow-up email",
        prompt:
          "Draft a follow-up email that recaps outcomes and next steps with dates. Keep it under 150 words.",
      },
      {
        id: "s3",
        title: "Risks & open questions",
        prompt:
          "From the same notes, infer 3 risks and 3 open questions to track this week.",
      },
    ],
  },
];

export default function LessonPage() {
  // Pick a random lesson on each visit
  const lesson = useMemo<Lesson>(() => {
    const i = Math.floor(Math.random() * SAMPLE_LESSONS.length);
    return SAMPLE_LESSONS[i];
  }, []);

  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current="lesson" />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <a className="hover:underline" href="/">Home</a>
          <span>›</span>
          <span>Lesson</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">{lesson.title}</h1>
        <p className="mt-2 text-slate-600">{lesson.description}</p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-slate-600">
          <span>Track:</span>
          <span className="font-medium">{lesson.track}</span>
        </div>

        <section className="mt-8 grid gap-4">
          {lesson.scenarios.map((s) => (
            <div key={s.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="mt-1 text-slate-600 text-sm">
                    Click “Copy Prompt”, paste into your AI, and run it.
                  </div>
                </div>
                <button
                  className="rounded-xl border px-3 py-1 text-sm hover:border-slate-400"
                  onClick={() => {
                    navigator.clipboard.writeText(s.prompt);
                    setActive(s.id);
                    setTimeout(() => setActive(null), 1200);
                  }}
                >
                  {active === s.id ? "Copied!" : "Copy Prompt"}
                </button>
              </div>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-sm text-slate-800 border">
{`${s.prompt}`}
              </pre>
              {s.tip && (
                <div className="mt-2 text-xs text-slate-500">
                  Tip: {s.tip}
                </div>
              )}
            </div>
          ))}
        </section>

        <div className="mt-10 flex gap-3">
          <a
            href="/"
            className="px-4 py-2 rounded-xl border hover:border-slate-400"
          >
            ← Back Home
          </a>
          <a
            href="/funnel"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white"
          >
            Take the 2-minute quiz
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
