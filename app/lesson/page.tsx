"use client";

import { useState } from "react";

/** ---------- Types ---------- */
type VariationKey = "default" | "shorter" | "reflective" | "action" | "manager";

type Scenario = {
  id: string;
  title: string;
  askIntro: string;            // “What to Ask AI” paragraph
  variations: Record<VariationKey, string[]>;
  proTip?: string;
  ctaText?: string;
  ctaHref?: string;
};

/** ---------- Reusable scenario block ---------- */
function ScenarioBlock({ scenario }: { scenario: Scenario }) {
  const [active, setActive] = useState<VariationKey>("default");

  const chips: { key: VariationKey; label: string }[] = [
    { key: "shorter",     label: "Shorter (3 questions)" },
    { key: "reflective",  label: "More reflective (add feeling check)" },
    { key: "action",      label: "Action-biased (force next steps)" },
    { key: "manager",     label: "Manager view (add stakeholder note)" },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">{scenario.title}</h2>

      <h3 className="text-lg font-semibold mb-1">What to Ask AI</h3>
      <p className="text-slate-700 mb-5">{scenario.askIntro}</p>

      <h3 className="text-lg font-semibold mb-2">AI&apos;s Response</h3>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        {(scenario.variations[active] ?? scenario.variations.default).map((q, i) => (
          <li key={i} className="text-slate-800">{q}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-3">Adjust the Result</h3>
      <div className="flex flex-wrap gap-3 mb-4">
        {chips.map(({ key, label }) => {
          const selected = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              aria-pressed={selected}
              className={[
                "px-4 py-2 rounded-full text-sm font-medium transition",
                "border",
                selected
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}

        {/* Reset to default */}
        <button
          onClick={() => setActive("default")}
          className="px-4 py-2 rounded-full text-sm font-medium border border-slate-300 hover:bg-slate-50"
          title="Reset"
        >
          Reset
        </button>
      </div>

      {scenario.proTip && (
        <p className="text-slate-700 mb-4">
          <span className="font-semibold">Pro Tip — </span>
          {scenario.proTip}
        </p>
      )}

      {scenario.ctaHref && scenario.ctaText && (
        <a
          href={scenario.ctaHref}
          className="inline-block mt-1 rounded-xl border border-slate-300 px-4 py-2 text-center hover:bg-slate-50"
        >
          {scenario.ctaText}
        </a>
      )}
    </section>
  );
}

/** ---------- Page data (3 scenarios) ---------- */
const scenarios: Scenario[] = [
  {
    id: "daily-reflection",
    title: "Daily Reflection Prompts",
    askIntro:
      "Act as a productivity coach. Create a 3-minute end-of-day reflection template for a <role> working on <project>. Ask 5 concise questions covering wins, lessons, blockers, and priorities for tomorrow. Output as bullets.",
    variations: {
      default: [
        "What was my biggest win today and why?",
        "What challenge did I face and how did I handle it?",
        "What did I learn today that I can apply tomorrow?",
        "What would I do differently if I could repeat today?",
        "What am I grateful for today?"
      ],
      shorter: [
        "What was my biggest win today?",
        "What challenge did I face?",
        "What am I grateful for today?"
      ],
      reflective: [
        "How did I feel during today’s biggest win?",
        "Which moment drained or energized me most?",
        "What belief or assumption changed today?",
        "What am I proud of myself for?",
        "What am I grateful for today?"
      ],
      action: [
        "What is one action I’ll repeat tomorrow?",
        "What blocker must I remove first thing tomorrow?",
        "What single step would make tomorrow easier?",
        "Which task deserves 30 minutes of deep focus?",
        "What can I delegate or automate?"
      ],
      manager: [
        "What should stakeholders know about today’s progress?",
        "What risk should I flag early?",
        "What is my top priority for tomorrow?",
        "Who needs an update or decision?",
        "What support or resources do I need?"
      ]
    },
    proTip:
      "Keep reflection prompts consistent but allow for personal interpretation.",
    ctaText: "Try the Task",
    ctaHref: "#"
  },
  {
    id: "tomorrow-plan",
    title: "Action Plan for Tomorrow",
    askIntro:
      "As a focus coach, turn today’s notes into a crisp plan for tomorrow. Limit to 5 bullets: 3 priorities, 1 blocker with mitigation, 1 quick win.",
    variations: {
      default: [
        "Top 3 priorities with clear outcomes.",
        "One blocker + concrete mitigation.",
        "One quick win to build momentum.",
        "Time estimate next to each item.",
        "End with: 'If I do only one thing tomorrow, it’s __.'"
      ],
      shorter: [
        "Top 2 priorities.",
        "One blocker + mitigation.",
        "One quick win."
      ],
      reflective: [
        "Which priority aligns most with my goals?",
        "What would make me proud tomorrow?",
        "What could I postpone without harm?"
      ],
      action: [
        "Rewrite each priority as a verb + outcome.",
        "Add a 30–60 min timebox to each.",
        "Assign a start time for Priority #1."
      ],
      manager: [
        "What stakeholder outcome will be visible tomorrow?",
        "Which dependency needs confirmation?",
        "What update should I schedule?"
      ]
    },
    proTip:
      "Timebox priorities. If it won’t fit tomorrow, move it to the parking lot.",
    ctaText: "Try the Task",
    ctaHref: "#"
  },
  {
    id: "retro-lite",
    title: "Team Retro — 10-Minute Lite",
    askIntro:
      "Create a 10-minute retrospective for a small team. Focus on quick learning and next actions. Output as bullets the team can paste into chat.",
    variations: {
      default: [
        "What went well (2 bullets).",
        "What needs improvement (2 bullets).",
        "One experiment to try next week.",
        "One risk to watch.",
        "Owner + due date for the experiment."
      ],
      shorter: [
        "1 win, 1 improvement, 1 experiment."
      ],
      reflective: [
        "Which behavior helped us most?",
        "What surprised us?",
        "What’s something we can stop doing?"
      ],
      action: [
        "Turn each improvement into a task with owner + date.",
        "Define success metric for next week’s experiment.",
        "Schedule a 15-min review slot."
      ],
      manager: [
        "What should be surfaced to leadership?",
        "Any cross-team dependency to ping?",
        "What decision is needed and by whom?"
      ]
    },
    proTip:
      "Keep it lightweight so teams will actually do it every week.",
    ctaText: "Try the Task",
    ctaHref: "#"
  }
];

/** ---------- Page ---------- */
export default function LessonPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      <header className="mb-2">
        <h1 className="text-3xl md:text-4xl font-bold">Lesson</h1>
        <p className="text-slate-600 mt-1">
          Three practical scenarios. Use the chips to tailor the output.
        </p>
      </header>

      {scenarios.map((s) => (
        <ScenarioBlock key={s.id} scenario={s} />
      ))}
    </main>
  );
}
