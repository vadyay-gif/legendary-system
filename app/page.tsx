/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";

/** Views */
type View = "picker" | "scenario" | "task" | "complete";
type ScenarioId = 1 | 2 | 3;

export default function LessonPage() {
  useEffect(() => {
    document.body.classList.add("lesson-force-opaque");
    return () => document.body.classList.remove("lesson-force-opaque");
  }, []);

  const [view, setView] = useState<View>("picker");
  const [scenario, setScenario] = useState<ScenarioId>(1);
  const [activeChip, setActiveChip] = useState<Record<ScenarioId, string | null>>({
    1: null,
    2: null,
    3: null,
  });
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  /** Content */
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
      protip: "Keep reflection prompts consistent but allow for personal interpretation.",
      taskGoal: "Create 5 daily reflection prompts for productivity and growth.",
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
      takeaway: "Structured reflection prompts deepen self-awareness and growth.",
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
      chips: ["Add metrics table", "Reduce to one-pager", "Executive tone", "Include calendar blocks"],
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
      protip: "Name the feeling → write the fact → choose one step. That’s the reset.",
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

  /** Preview logic for chip effects */
  const previewResponse = useMemo(() => {
    const base = [...DATA[scenario].response];
    const chip = activeChip[scenario];
    if (!chip) return base;

    switch (scenario) {
      case 1:
        if (chip === "Shorter (3 questions)") return base.slice(0, 3);
        if (chip === "More reflective (add feeling check)") return [...base, "How did I feel today (1–2 words)?"];
        if (chip === "Action-biased (force next steps)") return [...base, "What single action will I take tomorrow?"];
        if (chip === "Manager view (add stakeholder note)") return [...base, "Any stakeholder to update? What will I say?"];
        break;
      case 2:
        if (chip === "Add metrics table") return [...base, "Metrics Table: | Metric | Target | Actual |"];
        if (chip === "Reduce to one-pager") return [base[0], base[2], base[4]].filter(Boolean);
        if (chip === "Executive tone") return [...base, "Use concise, executive-ready wording."];
        if (chip === "Include calendar blocks") return [...base, "Block calendar time for each priority."];
        break;
      case 3:
        if (chip === "Shorter (≤80 words)") return base.slice(0, 3);
        if (chip === "More empathetic") return [...base, "Tone: empathetic and supportive."];
        if (chip === "Data-driven framing") return [...base, "Add one data point to support the view."];
        if (chip === "Add checklist for tomorrow") return [...base, "Checklist: [ ] task 1  [ ] task 2  [ ] task 3"];
        break;
    }
    return base;
  }, [scenario, activeChip, DATA]);

  /** Handlers */
  const openScenario = (id: ScenarioId) => {
    setScenario(id);
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
    setTimeout(() => document.getElementById("resultBlock")?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  const data = DATA[scenario];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header current="lesson" />

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6">
        {/* NEW INTRO HEADING */}
        {view === "picker" && (
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Inside an AI Ready Lesson
            </h1>
            <p className="mt-2 text-slate-600 text-lg">
              Every scenario is a short, practical exercise powered by AI.
            </p>
          </div>
        )}

        {/* EXISTING SCENARIO PICKER */}
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
                      <div className="text-2xl font-bold">{DATA[id].title}</div>
                      <div className="text-slate-700">{DATA[id].subtitle}</div>
                    </div>
                    <span className="text-3xl leading-none">›</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* REST OF CODE UNCHANGED (SCENARIO, TASK, COMPLETE VIEWS) */}
      </main>

      <style jsx global>{`
        body.lesson-force-opaque,
        body.lesson-force-opaque * {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}

/** Section component */
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
    <div
      className={`rounded-2xl border p-4 md:p-5 ${
        tone === "banner" ? "bg-purple-100/70 border-purple-200" : "bg-slate-50 border-slate-200"
      }`}
    >
      {title ? <h3 className="mb-2 text-xl font-semibold">{title}</h3> : null}
      {children}
    </div>
  );
}
