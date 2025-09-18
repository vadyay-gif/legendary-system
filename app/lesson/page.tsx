"use client";

import { useMemo, useState } from "react";

export default function Page() {
  // views
  const [view, setView] = useState<"picker" | "s1" | "s2" | "s3" | "task" | "complete">("picker");
  const [currentTask, setCurrentTask] = useState<number>(1);

  // task state
  const [checked, setChecked] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  // chip state (for “Adjust the Result”)
  const [activeChips, setActiveChips] = useState<string[]>([]);

  // scenarios
  const scenarios = [
    {
      id: 1,
      title: "Daily Reflection Prompts",
      subtitle: "You want a 3‑minute daily reflection habit",
      situation:
        "You want a 3‑minute daily reflection to capture wins, lessons, and blockers for <project>.",
      ask:
        "Act as a productivity coach. Create a 3‑minute end‑of‑day reflection template for a <role> working on <project>. Ask 5 concise questions covering wins, lessons, blockers, and priorities for tomorrow. Output as bullets.",
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
        "Action‑biased (force next steps)",
        "Manager view (add stakeholder note)",
      ],
      protip: "Tag entries with #win #blocker #lesson so search is useful later.",
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
      takeaway: "Structured reflection prompts deepen self‑awareness and growth.",
    },
    {
      id: 2,
      title: "Weekly Review Template",
      subtitle: "Turn last week’s notes into a Monday plan",
      situation: "You need a 10‑minute weekly review that turns notes into a Monday plan.",
      ask:
        "Summarize my week from the notes below and create a Monday action plan. Use sections: Highlights, Metrics, Lessons, Risks, Next‑Week Plan (with owners & time boxes). Notes: <paste bullets>.",
      response: [
        "Highlights: …",
        "Metrics: …",
        "Lessons: …",
        "Risks: …",
        "Next‑Week Plan: 1) … (Owner, 90m) 2) … (Owner, 45m)",
      ],
      chips: ["Add metrics table", "Reduce to one‑pager", "Executive tone", "Include calendar blocks"],
      protip: "Convert Next‑Week Plan into calendar holds immediately.",
      taskGoal:
        "Turn last week's notes into a Monday plan with Highlights, Metrics, Lessons, Risks, and a Next‑Week Plan.",
      taskOptions: [
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
    {
      id: 3,
      title: "Goal Progress Tracking",
      subtitle: "Capture stress, reframe, and pick one step",
      situation:
        "You felt overwhelmed today; you want a calm, factual summary and one concrete next step.",
      ask:
        "Act as a cognitive coach. Reframe the following stressful event using: Facts, Thoughts, Alternative View, One Next Step. Keep it supportive, professional, and under 120 words. Event: <describe>.",
      response: ["Facts: …", "Thoughts: …", "Alternative View: …", "One Next Step: …"],
      chips: ["Shorter (≤80 words)", "More empathetic", "Data‑driven framing", "Add checklist for tomorrow"],
      protip: "Name the feeling → write the fact → choose one step.",
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
  ];

  const current = useMemo(() => scenarios.find((s) => s.id === currentTask)!, [currentTask]);

  // derive a previewed response when chips are toggled
  const previewResponse = useMemo(() => {
    if (current.id !== 1) return current.response; // only scenario 1 needs dynamic preview

    let out = [...current.response];
    if (activeChips.includes("Shorter (3 questions)")) out = out.slice(0, 3);
    if (activeChips.includes("More reflective (add feeling check)"))
      out = [...out, "How did I feel today (1‑2 words)?"];
    if (activeChips.includes("Action‑biased (force next steps)"))
      out = [...out, "What single action will I take tomorrow?"];
    if (activeChips.includes("Manager view (add stakeholder note)"))
      out = [...out, "Any stakeholder to update? What will I say?"];
    return out;
  }, [activeChips, current]);

  // helpers
  const toggleChip = (label: string) => {
    setActiveChips((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-slate-900 antialiased opacity-100">
      {/* PICKER */}
      {view === "picker" && (
        <div>
          <h1 className="text-3xl font-extrabold mb-6">Choose a Scenario</h1>
          <div className="space-y-4">
            {scenarios.map((s) => (
              <button
                key={s.id}
                className="w-full text-left p-4 rounded-2xl border border-violet-200 bg-violet-50 hover:bg-violet-100"
                onClick={() => {
                  setView(("s" + s.id) as any);
                  setCurrentTask(s.id);
                  setActiveChips([]);
                }}
              >
                <div className="font-bold text-2xl">{s.title}</div>
                <div className="text-slate-700">{s.subtitle}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SCENARIOS */}
      {view.startsWith("s") && (
        <div>
          <button className="mb-4 text-blue-600 font-semibold" onClick={() => setView("picker")}>
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-4">{current.title}</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Situation</h3>
              <p className="text-slate-800">{current.situation}</p>
            </div>

            <div>
              <h3 className="font-semibold">What to Ask AI</h3>
              <p className="text-slate-800">{current.ask}</p>
            </div>

            <div>
              <h3 className="font-semibold">AI’s Response</h3>
              <ul className="list-disc pl-6 text-slate-800">
                {(current.id === 1 ? previewResponse : current.response).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Adjust the Result</h3>
              <div className="flex flex-wrap gap-2">
                {current.chips.map((c) => {
                  const on = activeChips.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleChip(c)}
                      className={`${
                        on
                          ? "bg-slate-200 border-slate-300 ring-2 ring-blue-400"
                          : "bg-slate-100 border-slate-200"
                      } px-3 py-1 rounded-full border text-sm font-semibold`}
                      aria-pressed={on}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-purple-100 p-3 rounded">Pro Tip — {current.protip}</div>

            <button
              className="mt-2 w-full rounded-full bg-blue-600 px-5 py-3 font-extrabold text-white shadow hover:bg-blue-700"
              onClick={() => setView("task")}
            >
              Try the Task
            </button>
          </div>
        </div>
      )}

      {/* TASK */}
      {view === "task" && (
        <div>
          <button
            className="mb-4 text-blue-600 font-semibold"
            onClick={() => setView(("s" + current.id) as any)}
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-4">{current.title}</h2>

          <div className="bg-purple-100 p-3 rounded mb-4">Task Goal — {current.taskGoal}</div>

          <div className="space-y-2">
            {current.taskOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <input
                  type="checkbox"
                  checked={checked.includes(opt)}
                  onChange={(e) => {
                    setShowResult(false);
                    if (e.target.checked) setChecked((prev) => [...prev, opt]);
                    else setChecked((prev) => prev.filter((o) => o !== opt));
                  }}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          <button
            className="mt-4 w-full rounded-full border-2 border-blue-600 px-5 py-3 font-extrabold text-blue-600 disabled:opacity-50 hover:bg-blue-50"
            onClick={() => setShowResult(true)}
            disabled={checked.length === 0}
          >
            Check My Answer
          </button>

          {showResult && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                <b>Correct!</b> Great job.
              </div>
              <div className="p-3 border rounded">
                <h3 className="font-semibold mb-2">Your assembled prompt:</h3>
                <input type="text" className="w-full border rounded p-2" value={current.assembled} readOnly />
                <p className="text-slate-700 mt-2">{current.kicker}</p>
              </div>
              <button
                className="w-full rounded-full bg-blue-600 px-5 py-3 font-extrabold text-white shadow hover:bg-blue-700"
                onClick={() => setView("complete")}
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}

      {/* COMPLETE */}
      {view === "complete" && (
        <div className="text-center space-y-4">
          <div className="text-5xl text-green-600">✔</div>
          <h2 className="text-2xl font-bold">Great job!</h2>
          <p>{current.completeMsg}</p>
          <div className="bg-purple-100 p-3 rounded">Key Takeaway — {current.takeaway}</div>
          <div className="flex gap-2 justify-center">
            <button className="px-4 py-2 rounded border border-gray-300" onClick={() => setView("picker")}>
              Back to Tracks
            </button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={() => setView("picker")}> 
              Another Scenario
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
