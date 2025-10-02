"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * AI Ready — Lesson Page
 * Route: app/lesson/page.tsx
 * - Page-only visibility fix (adds/removes class on <body>)
 * - Scenario Picker → Scenario Detail → Task → Complete
 * - “Adjust the Result” chips = SINGLE-SELECT (radio-like, click again to clear)
 * - Tailwind required for the few @apply utilities at the bottom
 */

type View = "picker" | "scenario" | "task" | "complete";
type ScenarioId = 1 | 2 | 3;

export default function LessonPage() {
  // Force full opacity only while this page is mounted (doesn't affect other pages)
  useEffect(() => {
    document.body.classList.add("lesson-force-opaque");
    return () => document.body.classList.remove("lesson-force-opaque");
  }, []);

  // ----- UI State -----
  const [view, setView] = useState<View>("picker");
  const [scenario, setScenario] = useState<ScenarioId>(1);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  // SINGLE-SELECT chip (null = none selected)
  const [activeChip, setActiveChip] = useState<string | null>(null);

  // ----- Content -----
  const DATA: Record<
    ScenarioId,
    {
      title: string;
      subtitle: string;
      situation: string;
      ask: string;
      response: string[];
      chips: string[];
      protip: string;
      taskGoal: string;
      taskOptions: string[];
      assembled: string;
      kicker: string;
      completeMsg: string;
      takeaway: string;
    }
  > = {
    1: {
      title: "Daily Reflection Prompts",
      subtitle: "You want a 3-minute daily reflection habit",
      situation:
        "You want a 3-minute daily reflection to capture wins, lessons, and blockers for <project>.",
      ask:
        "Act as a productivity coach. Create a 3-minute end-of-day reflection template for a <role> working on <project>. Ask 5 concise questions covering wins, lessons, blockers, and priorities for tomorrow. Output as bullets.",
      response: [
        "What was my biggest win today and why?",
        "What challenge did I face and how did I handle it?",
        "What did I learn today that I can apply tomorrow?",
        "What would I do differently if I could repeat today?",
        "What am I grateful for today?",
      ],
      chips: [
        "Shorter (3 questions)",
        "More reflective (add feeling check)",
        "Action-biased (force next steps)",
        "Manager view (add stakeholder note)",
      ],
      protip:
        "Keep reflection prompts consistent but allow for personal interpretation.",
      taskGoal:
        "Create 5 daily reflection prompts for productivity and growth.",
      taskOptions: [
        "Include win/achievement prompt",
        "Add challenge/learning prompt",
        "Include improvement prompt",
        "Add gratitude prompt",
        "Make prompts actionable",
      ],
      assembled:
        "Create 5 daily reflection prompts covering wins, challenges, learning, improvement, and gratitude.",
      kicker:
        "Balanced reflection prompts cover wins, challenges, learning, and gratitude.",
      completeMsg: "You've completed scenario Daily Reflection Prompts",
      takeaway:
        "Structured reflection prompts deepen self-awareness and growth.",
    },
    2: {
      title: "Weekly Review Template",
      subtitle: "Turn last week’s notes into a Monday plan",
      situation:
        "You need a 10-minute weekly review that turns notes into a Monday plan.",
      ask:
        "Summarize my week from the notes below and create a Monday action plan. Use sections: Highlights, Metrics, Lessons, Risks, Next-Week Plan (with owners & time boxes). Notes: <paste bullets>.",
      response: [
        "Highlights: …",
        "Metrics: …",
        "Lessons: …",
        "Risks: …",
        "Next-Week Plan: 1) … (Owner, 90m) 2) … (Owner, 45m)",
      ],
      chips: [
        "Add metrics table",
        "Reduce to one-pager",
        "Executive tone",
        "Include calendar blocks",
      ],
      protip: "Convert “Next-Week Plan” into calendar holds immediately.",
      taskGoal:
        "Turn last week's notes into a Monday plan with Highlights, Metrics, Lessons, Risks, and a Next-Week Plan.",
      taskOptions: [
        "Add highlights section",
        "Include metrics and targets",
        "Capture lessons & risks",
        "Create next-week plan with owners & time boxes",
      ],
      assembled:
        "Summarize last week and produce a Monday plan with Highlights, Metrics, Lessons, Risks and a Next-Week Plan (owners, time boxes).",
      kicker: "A review matters only if it ends in scheduled actions.",
      completeMsg: "You've completed scenario Weekly Review Template",
      takeaway: "A review is only useful if it ends in scheduled actions.",
    },
    3: {
      title: "Goal Progress Tracking",
      subtitle: "Capture stress, reframe, and pick one step",
      situation:
        "You felt overwhelmed today; you want a calm, factual summary and one concrete next step.",
      ask:
        "Act as a cognitive coach. Reframe the following stressful event using: Facts, Thoughts, Alternative View, One Next Step. Keep it supportive, professional, and under 120 words. Event: <describe>.",
      response: ["Facts: …", "Thoughts: …", "Alternative View: …", "One Next Step: …"],
      chips: ["Shorter (≤80 words)", "More empathetic", "Data-driven framing", "Add checklist for tomorrow"],
      protip:
        "Name the feeling → write the fact → choose one step. That’s the reset.",
      taskGoal:
        "Reframe a stressful event into Facts, Thoughts, Alternative View, One Next Step (≤120 words).",
      taskOptions: [
        "State the facts objectively",
        "Name the thought/emotion",
        "Offer an alternative view",
        "Pick one next step",
      ],
      assembled:
        "Reframe the event using Facts, Thoughts, Alternative View, and One Next Step in ≤120 words.",
      kicker: "Name the feeling → write the fact → choose one step.",
      completeMsg: "You've completed scenario Goal Progress Tracking",
      takeaway: "Reframing turns noise into a next step you control.",
    },
  };

  const title = useMemo(() => {
    if (view === "picker") return "Choose a Scenario";
    if (view === "complete") return "Scenario Complete";
    return DATA[scenario].title;
  }, [view, scenario]);

  /** Compute the modified “AI's Response” for the current scenario + active chip */
  const previewResponse = useMemo(() => {
    const base = [...DATA[scenario].response];
    if (!activeChip) return base;

    switch (scenario) {
      // Scenario 1 — Daily Reflection Prompts
      case 1: {
        switch (activeChip) {
          case "Shorter (3 questions)":
            return base.slice(0, 3);
          case "More reflective (add feeling check)":
            return [...base, "How did I feel today (1–2 words)?"];
          case "Action-biased (force next steps)":
            return [...base, "What single action will I take tomorrow?"];
          case "Manager view (add stakeholder note)":
            return [...base, "Any stakeholder to update? What will I say?"];
          default:
            return base;
        }
      }
      // Scenario 2 — Weekly Review Template
      case 2: {
        switch (activeChip) {
          case "Add metrics table":
            return [
              ...base,
              "Metrics Table: | Metric | Target | Actual |",
            ];
          case "Reduce to one-pager":
            // Keep it tight: reduce to the three most useful bullets
            return [base[0], base[2], base[4]].filter(Boolean);
          case "Executive tone":
            return [...base, "Use concise, executive-ready wording."];
          case "Include calendar blocks":
            return [...base, "Block calendar time for each priority."];
          default:
            return base;
        }
      }
      // Scenario 3 — Goal Progress Tracking
      case 3: {
        switch (activeChip) {
          case "Shorter (≤80 words)":
            // Focus on the essentials
            return base.slice(0, 3);
          case "More empathetic":
            return [...base, "Tone: empathetic and supportive."];
          case "Data-driven framing":
            return [...base, "Add one data point to support the view."];
          case "Add checklist for tomorrow":
            return [...base, "Checklist: [ ] task 1  [ ] task 2  [ ] task 3"];
          default:
            return base;
        }
      }
      default:
        return base;
    }
  }, [scenario, activeChip]);

  // ----- Handlers -----
  const openScenario = (id: ScenarioId) => {
    setScenario(id);
    setActiveChip(null);            // clear chip when changing scenarios
    setView("scenario");
    window?.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const openTask = () => {
    setChecked({});
    setShowResult(false);
    setView("task");
    window?.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const checkAnswer = () => {
    if (Object.values(checked).every((v) => !v)) return;
    setShowResult(true);
    setTimeout(() => {
      document.getElementById("resultBlock")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const data = DATA[scenario];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <button
            onClick={() => setView("picker")}
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6">
        {/* PICKER */}
        {view === "picker" && (
          <div className="rounded-2xl bg-white p-4 shadow">
            <h2 className="mb-4 text-lg font-semibold">Select a scenario to practice:</h2>
            <div className="grid gap-4">
              {(Object.keys(DATA) as unknown as ScenarioId[]).map((id) => (
                <button
                  key={id}
                  onClick={() => openScenario(id)}
                  className="w-full rounded-2xl border border-violet-200 bg-violet-50 px-4 py-4 text-left shadow-sm hover:bg-violet-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="tile-title text-2xl font-bold">{DATA[id].title}</div>
                      <div className="text-slate-700">{DATA[id].subtitle}</div>
                    </div>
                    <span className="text-3xl leading-none">›</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SCENARIO */}
        {view === "scenario" && (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">{data.title}</h2>

            <Section title="Situation">
              <p className="text-slate-700">{data.situation}</p>
            </Section>

            <Section title="What to Ask AI">
              <p className="text-slate-700">{data.ask}</p>
            </Section>

            <Section title="AI's Response">
              <ul className="ml-5 list-disc space-y-1">
                {previewResponse.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </Section>

            <Section title="Adjust the Result">
              <div className="flex flex-wrap gap-2">
                {data.chips.map((c) => {
                  const on = activeChip === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActiveChip(on ? null : c)} // single-select toggle
                      aria-pressed={on}
                      className={`rounded-full border px-3.5 py-2 text-sm font-semibold ${
                        on
                          ? "border-slate-300 bg-slate-200 ring-2 ring-blue-400"
                          : "border-slate-200 bg-slate-100 hover:bg-slate-200"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section tone="banner">
              <b>Pro Tip —</b> {data.protip}
            </Section>

            {/* Real button, unchanged style */}
            <button className="btn-primary" onClick={openTask}>
              Try the Task
            </button>
          </div>
        )}

        {/* TASK */}
        {view === "task" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{data.title}</h2>
            <Section tone="banner">
              <b>Task Goal —</b> {data.taskGoal}
            </Section>

            <h3 className="text-xl font-semibold">Select the prompt pieces:</h3>
            <div className="grid gap-3">
              {data.taskOptions.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={!!checked[i]}
                    onChange={(e) => {
                      setShowResult(false);
                      setChecked((c) => ({ ...c, [i]: e.target.checked }));
                    }}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <button
                className="btn-ghost"
                onClick={() => alert("Not finished yet — You skipped the task.")}
              >
                Skip
              </button>
              <button
                className="btn-outline disabled:opacity-50"
                disabled={Object.values(checked).every((v) => !v)}
                onClick={checkAnswer}
              >
                Check My Answer
              </button>
            </div>

            {showResult && (
              <div id="resultBlock" className="space-y-3">
                <div className="ok-panel">
                  <b>Correct!</b> Great job! You selected the right prompt pieces.
                </div>
                <Section>
                  <h3 className="text-xl font-semibold">Your assembled prompt:</h3>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-300 p-3"
                    value={data.assembled}
                    readOnly
                  />
                  <p className="mt-2 text-slate-600">{data.kicker}</p>
                </Section>
                <button className="btn-primary" onClick={() => setView("complete")}>
                  Done
                </button>
              </div>
            )}
          </div>
        )}

        {/* COMPLETE */}
        {view === "complete" && (
          <div className="rounded-2xl bg-white p-6 text-center shadow">
            <div className="text-6xl text-emerald-500">✔</div>
            <h2 className="mt-2 text-2xl font-bold">Great job!</h2>
            <p className="text-slate-600">{data.completeMsg}</p>
            <Section tone="banner">
              <b>Key Takeaway —</b> {data.takeaway}
            </Section>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <button className="btn-ghost" onClick={() => setView("picker")}>
                Back to Tracks
              </button>
              <button className="btn-primary" onClick={() => setView("picker")}>
                Another Scenario
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Local utility styles (Tailwind required) */}
      <style jsx global>{`
        body.lesson-force-opaque,
        body.lesson-force-opaque * {
          opacity: 1 !important;
        }
        .btn-primary {
          @apply w-full rounded-full bg-blue-500 px-5 py-3 font-extrabold text-white shadow hover:bg-blue-600;
        }
        .btn-outline {
          @apply w-full rounded-full border-2 border-blue-500 px-5 py-3 font-extrabold text-blue-600 hover:bg-blue-50;
        }
        .btn-ghost {
          @apply w-full rounded-full border-2 border-slate-300 px-5 py-3 font-extrabold text-slate-800 hover:bg-slate-50;
        }
        .ok-panel {
          @apply flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800;
        }
        .section {
          @apply rounded-2xl border p-4 md:p-5;
        }
        .section-default {
          @apply bg-slate-50 border-slate-200;
        }
        .section-banner {
          @apply bg-purple-100/70 border-purple-200;
        }
      `}</style>
    </div>
  );
}

/* ---------- Small primitive ---------- */
function Section({
  title,
  tone = "default",
  children,
}: {
  title?: string;
  tone?: "banner" | "default";
  children: React.ReactNode;
}) {
  return (
    <div className={`section ${tone === "banner" ? "section-banner" : "section-default"}`}>
      {title ? <h3 className="mb-2 text-xl font-semibold">{title}</h3> : null}
      {children}
    </div>
  );
}
