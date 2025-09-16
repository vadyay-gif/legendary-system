"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// --- Temporary sample data (replace later with your API data) ---
type Scenario = { title: string; prompt: string };
type Lesson = {
  track: string;
  lesson: string;
  scenarios: Scenario[];
};

const SAMPLE_LESSONS: Lesson[] = [
  {
    track: "Everyday Communication",
    lesson: "Polite follow-ups that get replies",
    scenarios: [
      {
        title: "Quick nudge",
        prompt:
          "You are my polite assistant. Draft a short, kind follow-up to {NAME} about {TOPIC}. Keep it under 90 words, include 1 action I want, and add a gracious close.",
      },
      {
        title: "Escalate gently",
        prompt:
          "Turn this note into a firm-but-polite escalation. Make the urgency clear, propose 2 times to meet, and keep tone professional.\n\nContext: {CONTEXT}",
      },
      {
        title: "Summarize thread",
        prompt:
          "Summarize the following email thread into 5 bullets: decisions, owners, deadlines, open questions, and risks.\n\nThread:\n{PASTE_THREAD_HERE}",
      },
    ],
  },
  {
    track: "Reports & Summaries",
    lesson: "Executive summary from a long doc",
    scenarios: [
      {
        title: "TL;DR in bullets",
        prompt:
          "Create a 7-bullet executive summary for a senior audience. Include goals, key findings, risks, and recommended next steps.\n\nSource:\n{PASTE_DOC_TEXT}",
      },
      {
        title: "One-pager outline",
        prompt:
          "Outline a one-pager with sections: Background, Current State, Options, Recommendation, Next Steps. Base it on:\n\n{PASTE_NOTES}",
      },
      {
        title: "Slide headlines",
        prompt:
          "Generate slide headlines (10 words max each) that tell a clear narrative from problem to solution to impact. Use:\n\n{PASTE_CONTENT}",
      },
    ],
  },
  {
    track: "Meetings & Notes",
    lesson: "From messy notes to action plan",
    scenarios: [
      {
        title: "Action items",
        prompt:
          "Extract action items from these notes. For each item include Owner, Task, Due Date, and Blockers.\n\nNotes:\n{PASTE_NOTES}",
      },
      {
        title: "Email recap",
        prompt:
          "Write a crisp email recap for attendees. Include decisions, owners, deadlines, and open questions. Friendly and concise.\n\nNotes:\n{PASTE_NOTES}",
      },
      {
        title: "Risks and mitigations",
        prompt:
          "From the following discussion, list top 5 risks and a realistic mitigation for each.\n\nNotes:\n{PASTE_NOTES}",
      },
    ],
  },
];

// --- Component ---
export default function LessonPage() {
  // Pick a lesson once per render
  const lesson = useMemo<Lesson>(() => {
    const i = Math.floor(Math.random() * SAMPLE_LESSONS.length);
    return SAMPLE_LESSONS[i];
  }, []);

  const [current, setCurrent] = useState(0);
  const total = lesson.scenarios.length;
  const scenario = lesson.scenarios[current];

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(scenario.prompt);
      alert("Prompt copied to clipboard!");
    } catch {
      alert("Could not copy. Please copy manually.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">
              AI
            </div>
            <span className="font-semibold">AI Ready</span>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/funnel" className="hover:underline">
              Quiz Funnel
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-3xl px-4 py-10">
        {/* Lesson header */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            {lesson.track}
          </div>
          <h1 className="mt-1 text-2xl font-bold">{lesson.lesson}</h1>

          {/* Progress */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Scenario {current + 1} of {total}
            </div>
            <div className="flex gap-2">
              <button
                disabled={current === 0}
                onClick={() => setCurrent((s) => Math.max(0, s - 1))}
                className="px-3 py-1 rounded-lg border disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={current === total - 1}
                onClick={() => setCurrent((s) => Math.min(total - 1, s + 1))}
                className="px-3 py-1 rounded-lg border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Scenario card */}
          <div className="mt-6 rounded-xl border bg-slate-50 p-4">
            <div className="text-sm font-semibold">{scenario.title}</div>
            <p className="mt-2 text-slate-700 whitespace-pre-wrap">
              {scenario.prompt}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={copyPrompt}
                className="px-4 py-2 rounded-xl border bg-white"
              >
                Copy prompt
              </button>
              <a
                href="https://chat.openai.com/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl border bg-white"
              >
                Open ChatGPT
              </a>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/"
            className="px-4 py-3 rounded-xl border bg-white text-center"
          >
            Back Home
          </Link>
          <Link
            href="/funnel"
            className="px-4 py-3 rounded-xl border bg-white text-center"
          >
            See Quiz Funnel
          </Link>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="mt-16 border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500 flex items-center justify-between">
          <div>© {new Date().getFullYear()} AI Ready</div>
          <div className="flex gap-4">
            <a className="hover:underline" href="#">
              Privacy
            </a>
            <a className="hover:underline" href="#">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
