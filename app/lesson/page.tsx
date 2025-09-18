"use client";

import React, { useMemo, useState } from "react";

// -----------------------------------------------------
// AI Ready – Track 5 · Reflection & Journaling (Web)
// Next.js page.tsx drop-in. Uses Tailwind for styling.
// -----------------------------------------------------

// Types
 type View = "picker" | "scenario" | "task" | "complete";
 type ScenarioId = 1 | 2 | 3;

 const TITLES: Record<ScenarioId, string> = {
  1: "Daily Reflection Prompts",
  2: "Weekly Review Template",
  3: "Goal Progress Tracking",
 };

 const TASKS: Record<ScenarioId, {
  goal: string;
  options: string[];
  assembled: string;
  kicker: string;
  completeMsg: string;
  takeaway: string;
 }> = {
  1: {
    goal: "Create 5 daily reflection prompts for productivity and growth.",
    options: [
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
    takeaway: "Structured reflection prompts deepen self‑awareness and growth.",
  },
  2: {
    goal:
      "Turn last week's notes into a Monday plan with Highlights, Metrics, Lessons, Risks, and a Next‑Week Plan.",
    options: [
      "Add highlights section",
      "Include metrics and targets",
      "Capture lessons & risks",
      "Create next‑week plan with owners & time boxes",
    ],
    assembled:
      "Summarize last week and produce a Monday plan with Highlights, Metrics, Lessons, Risks and a Next‑Week Plan (owners, time boxes).",
    kicker: "A review matters only if it ends in scheduled actions.",
    completeMsg: "You've completed scenario Weekly Review Template",
    takeaway: "A review is only useful if it ends in scheduled actions.",
  },
  3: {
    goal:
      "Reframe a stressful event into Facts, Thoughts, Alternative View, One Next Step (≤120 words).",
    options: [
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

// Small primitives
 const Section: React.FC<React.PropsWithChildren<{ title?: string; tone?: "banner" | "default" }>> = ({
  title,
  tone = "default",
  children,
 }) => (
  <div
    className={
      "rounded-2xl border p-4 md:p-5 " +
      (tone === "banner"
        ? "bg-purple-100/70 border-purple-200"
        : "bg-slate-50 border-slate-200")
    }
  >
    {title ? <h3 className="text-xl font-semibold mb-2">{title}</h3> : null}
    {children}
  </div>
 );

 const Chip: React.FC<React.PropsWithChildren<{ onClick?: () => void }>> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3.5 py-2 font-semibold hover:bg-slate-200"
  >
    {children}
  </button>
 );

 const Tile: React.FC<{
  title: string;
  subtitle: string;
  onClick: () => void;
 }> = ({ title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="w-full rounded-2xl border border-violet-200 bg-violet-50 px-4 py-4 text-left shadow-sm hover:bg-violet-100"
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-slate-600">{subtitle}</div>
      </div>
      <span className="text-3xl leading-none">›</span>
    </div>
  </button>
 );

// Main page component
export default function Page() {
  const [view, setView] = useState<View>("picker");
  const [scenario, setScenario] = useState<ScenarioId>(1);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const headerTitle = useMemo(() => {
    if (view === "picker") return "Choose a Scenario";
    if (view === "scenario") return TITLES[scenario];
    if (view === "task") return TITLES[scenario];
    return "Scenario Complete";
  }, [view, scenario]);

  function openScenario(id: ScenarioId) {
    setScenario(id);
    setView("scenario");
    setChecked({});
    window?.scrollTo?.({ top: 0, behavior: "smooth" });
  }

  function openTask() {
    setView("task");
    setChecked({});
    window?.scrollTo?.({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setView("picker");
    setChecked({});
  }

  function checkAnswer() {
    // simple success reveal; no wrong state needed for MVP
    const allUnchecked = Object.values(checked).every((v) => !v);
    if (allUnchecked) return; // keep disabled by UI anyway
    const el = document.getElementById("resultBlock");
    el?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }

  function completeScenario() {
    setView("complete");
    window?.scrollTo?.({ top: 0, behavior: "smooth" });
  }

  const task = TASKS[scenario];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <button
            onClick={view === "picker" ? () => {} : goHome}
            aria-label="Back"
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100"
          >
            ←
          </button>
          <h1 className="text-xl font-bold md:text-2xl">{headerTitle}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6">
        {/* Picker */}
        {view === "picker" && (
          <div className="rounded-2xl bg-white p-4 shadow">
            <h2 className="mb-4 text-lg font-semibold">Select a scenario to practice:</h2>
            <div className="grid gap-4">
              <Tile
                title="Daily Reflection Prompts"
                subtitle="You want a 3‑minute daily reflection habit"
                onClick={() => openScenario(1)}
              />
              <Tile
                title="Weekly Review Template"
                subtitle="Turn last week’s notes into a Monday plan"
                onClick={() => openScenario(2)}
              />
              <Tile
                title="Goal Progress Tracking"
                subtitle="Capture stress, reframe, and pick one step"
                onClick={() => openScenario(3)}
              />
            </div>
          </div>
        )}

        {/* Scenario 1 */}
        {view === "scenario" && scenario === 1 && (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Daily Reflection Prompts</h2>
            <Section title="Situation">
              <p className="text-slate-600">
                You want a 3‑minute daily reflection to capture wins, lessons, and blockers for &lt;project&gt;.
              </p>
            </Section>
            <Section title="What to Ask AI">
              <p className="text-slate-600">
                “Act as a productivity coach. Create a 3‑minute end‑of‑day reflection template for a &lt;role&gt; working on
                &lt;project&gt;. Ask 5 concise questions covering wins, lessons, blockers, and priorities for tomorrow. Output as
                bullets.”
              </p>
            </Section>
            <Section title="AI's Response">
              <ol className="ml-5 list-decimal space-y-1">
                <li>What was my biggest win today and why?</li>
                <li>What challenge did I face and how did I handle it?</li>
                <li>What did I learn today that I can apply tomorrow?</li>
                <li>What would I do differently if I could repeat today?</li>
                <li>What am I grateful for today?</li>
              </ol>
            </Section>
            <Section title="Adjust the Result">
              <div className="flex flex-wrap gap-2">
                <Chip>Shorter (3 questions)</Chip>
                <Chip>More reflective (add feeling check)</Chip>
                <Chip>Action‑biased (force next steps)</Chip>
                <Chip>Manager view (add stakeholder note)</Chip>
              </div>
            </Section>
            <Section tone="banner">
              <b>Pro Tip —</b> Keep reflection prompts consistent but allow for personal interpretation.
            </Section>
            <button className="btn-primary" onClick={openTask}>
              Try the Task
            </button>
          </div>
        )}

        {/* Scenario 2 */}
        {view === "scenario" && scenario === 2 && (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Weekly Review Template</h2>
            <Section title="Situation">
              <p className="text-slate-600">You need a 10‑minute weekly review that turns notes into a Monday plan.</p>
            </Section>
            <Section title="What to Ask AI">
              <p className="text-slate-600">
                “Summarize my week from the notes below and create a Monday action plan. Use sections: Highlights, Metrics,
                Lessons, Risks, Next‑Week Plan (with owners &amp; time boxes). Notes: &lt;paste bullets&gt;.”
              </p>
            </Section>
            <Section title="AI's Response">
              <p>
                <b>Highlights:</b> …<br />
                <b>Metrics:</b> …<br />
                <b>Lessons:</b> …<br />
                <b>Risks:</b> …<br />
                <b>Next‑Week Plan:</b> 1) … (Owner, 90m) 2) … (Owner, 45m)
              </p>
            </Section>
            <Section title="Adjust the Result">
              <div className="flex flex-wrap gap-2">
                <Chip>Add metrics table</Chip>
                <Chip>Reduce to one‑pager</Chip>
                <Chip>Executive tone</Chip>
                <Chip>Include calendar blocks</Chip>
              </div>
            </Section>
            <Section tone="banner">
              <b>Pro Tip —</b> Convert “Next‑Week Plan” into calendar holds immediately.
            </Section>
            <button className="btn-primary" onClick={openTask}>
              Try the Task
            </button>
          </div>
        )}

        {/* Scenario 3 */}
        {view === "scenario" && scenario === 3 && (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Goal Progress Tracking</h2>
            <Section title="Situation">
              <p className="text-slate-600">
                You felt overwhelmed today; you want a calm, factual summary and one concrete next step.
              </p>
            </Section>
            <Section title="What to Ask AI">
              <p className="text-slate-600">
                “Act as a cognitive coach. Reframe the following stressful event using: Facts, Thoughts, Alternative View, One
                Next Step. Keep it supportive, professional, and under 120 words. Event: &lt;describe&gt;.”
              </p>
            </Section>
            <Section title="AI's Response">
              <p>
                <b>Facts:</b> …
                <br />
                <b>Thoughts:</b> …
                <br />
                <b>Alternative View:</b> …
                <br />
                <b>One Next Step:</b> …
              </p>
            </Section>
            <Section title="Adjust the Result">
              <div className="flex flex-wrap gap-2">
                <Chip>Shorter (≤80 words)</Chip>
                <Chip>More empathetic</Chip>
                <Chip>Data‑driven framing</Chip>
                <Chip>Add checklist for tomorrow</Chip>
              </div>
            </Section>
            <Section tone="banner">
              <b>Pro Tip —</b> Name the feeling → write the fact → choose one step. That’s the reset.
            </Section>
            <button className="btn-primary" onClick={openTask}>
              Try the Task
            </button>
          </div>
        )}

        {/* TASK (common for all scenarios) */}
        {view === "task" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{TITLES[scenario]}</h2>
            <Section tone="banner">
              <b>Task Goal —</b> {task.goal}
            </Section>

            <h3 className="text-xl font-semibold">Select the prompt pieces:</h3>
            <div className="grid gap-3">
              {task.options.map((opt, i) => (
                <label key={i} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={!!checked[i]}
                    onChange={(e) => setChecked((c) => ({ ...c, [i]: e.target.checked }))}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <button className="btn-ghost" onClick={() => alert("Not finished yet — You skipped the task.")}> 
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

            <div id="resultBlock" className="space-y-3">
              <div className="hidden sm:block" />
              <div className="ok-panel">
                <b>Correct!</b> Great job! You selected the right prompt pieces.
              </div>
              <Section>
                <h3 className="text-xl font-semibold">Your assembled prompt:</h3>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-300 p-3"
                  value={task.assembled}
                  readOnly
                />
                <p className="mt-2 text-slate-600">{task.kicker}</p>
              </Section>
            </div>

            <button className="btn-primary" onClick={completeScenario}>
              Done
            </button>
          </div>
        )}

        {/* COMPLETE */}
        {view === "complete" && (
          <div className="rounded-2xl bg-white p-6 text-center shadow">
            <div className="text-6xl text-emerald-500">✔</div>
            <h2 className="mt-2 text-2xl font-bold">Great job!</h2>
            <p className="text-slate-600">{task.completeMsg}</p>
            <Section tone="banner">
              <b>Key Takeaway —</b> {task.takeaway}
            </Section>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <button className="btn-ghost" onClick={goHome}>Back to Tracks</button>
              <button className="btn-primary" onClick={() => setView("picker")}>Another Scenario</button>
            </div>
          </div>
        )}
      </main>

      {/* Local styles built on Tailwind tokens */}
      <style jsx global>{`
        .btn-primary { @apply w-full rounded-full bg-blue-500 px-5 py-3 font-extrabold text-white shadow hover:bg-blue-600; }
        .btn-outline { @apply w-full rounded-full border-2 border-blue-500 px-5 py-3 font-extrabold text-blue-600 hover:bg-blue-50; }
        .btn-ghost { @apply w-full rounded-full border-2 border-slate-300 px-5 py-3 font-extrabold text-slate-800 hover:bg-slate-50; }
        .ok-panel { @apply flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800; }
      `}</style>
    </div>
  );
}
