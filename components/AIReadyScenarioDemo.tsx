/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";

/**
 * Weekly Review Template — read-only scenario layout
 * Matches the app's sections/typography/chips shown in your screenshot.
 */

const cls = {
  wrap: "space-y-4",
  h1: "text-[28px] sm:text-[30px] font-extrabold tracking-tight text-slate-800",
  h2: "mt-2 text-[16px] font-semibold text-slate-800",
  p: "mt-1 text-[14px] leading-6 text-slate-700",
  bullets: "mt-2 ml-5 list-disc text-[14px] text-slate-800 space-y-1",
  chipRow: "mt-3 flex flex-wrap gap-2",
  chip:
    "inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition select-none",
  chipOn:
    "border-blue-300 bg-blue-50 text-blue-800",
  proTipLabel: "font-semibold text-slate-800",
  proTip: "mt-2 text-[14px] text-slate-700",
  card: "rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm",
  tag: "inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm",
};

type Chip = { id: string; label: string };
const ADJUST: Chip[] = [
  { id: "metrics", label: "Add metrics table" },
  { id: "onepager", label: "Reduce to one-pager" },
  { id: "exec", label: "Executive tone" },
  { id: "calendar", label: "Include calendar blocks" },
];

export default function AIReadyScenarioDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section aria-label="Weekly Review Scenario" className={cls.wrap}>
      {/* optional tags row (keeps parity with other scenarios) */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={cls.tag}>Scenario</span>
        <span className={cls.tag}>Template</span>
      </div>

      <h1 className={cls.h1}>Weekly Review Template</h1>

      <div className={cls.card}>
        {/* Situation */}
        <h2 className={cls.h2}>Situation</h2>
        <p className={cls.p}>
          You need a 10-minute weekly review that turns notes into a Monday plan.
        </p>

        {/* What to ask AI */}
        <h2 className={cls.h2}>What to Ask AI</h2>
        <p className={cls.p}>
          Summarize my week from the notes below and create a Monday action plan. Use sections:
          <em> Highlights, Metrics, Lessons, Risks, Next-Week Plan</em> (with owners &amp; time boxes).
          Notes: &lt;paste bullets&gt;.
        </p>

        {/* AI's Response skeleton */}
        <h2 className={cls.h2}>AI's Response</h2>
        <ul className={cls.bullets}>
          <li>Highlights: …</li>
          <li>Metrics: …</li>
          <li>Lessons: …</li>
          <li>Risks: …</li>
          <li>Next-Week Plan: 1) … (Owner, 90m) 2) … (Owner, 45m)</li>
        </ul>

        {/* Adjust the Result */}
        <h2 className={cls.h2}>Adjust the Result</h2>
        <div className={cls.chipRow}>
          {ADJUST.map((c) => {
            const on = selected === c.id;
            return (
              <button
                key={c.id}
                type="button"
                className={`${cls.chip} ${on ? cls.chipOn : ""}`}
                aria-pressed={on}
                onClick={() => setSelected(on ? null : c.id)}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Pro Tip */}
        <p className={cls.proTip}>
          <span className={cls.proTipLabel}>Pro Tip —</span>{" "}
          Convert “Next-Week Plan” into calendar holds immediately.
        </p>

        {/* Tiny helper note when a chip is selected */}
        {selected && (
          <p className="mt-2 text-[12px] text-blue-700">
            Adjustment selected: <span className="font-medium">{ADJUST.find(a => a.id === selected)?.label}</span>.
            In the full app this modifies the output format automatically.
          </p>
        )}
      </div>
    </section>
  );
}
