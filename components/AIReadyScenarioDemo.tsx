/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useMemo, useState } from "react";

/**
 * Weekly Review Template — interactive version
 * Keeps your structure/classes; only adds state to update AI's Response.
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
  chipOn: "border-blue-300 bg-blue-50 text-blue-800",
  proTipLabel: "font-semibold text-slate-800",
  proTip: "mt-2 text-[14px] text-slate-700",
  card: "rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm",
  tag: "inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm",
};

type Chip = { id: "metrics" | "onepager" | "exec" | "calendar"; label: string };
const ADJUST: Chip[] = [
  { id: "metrics", label: "Add metrics table" },
  { id: "onepager", label: "Reduce to one-pager" },
  { id: "exec", label: "Executive tone" },
  { id: "calendar", label: "Include calendar blocks" },
];

type ResponseShape = {
  highlights: string;
  metrics: string;
  lessons: string;
  risks: string;
  nextWeek: string;
};

const BASE: ResponseShape = {
  highlights: "Team completed onboarding for 3 new users.",
  metrics: "Traffic up 12%, conversion stable at 4.3%.",
  lessons: "Async review saves ~2h per week.",
  risks: "Dependency on API reliability.",
  nextWeek: "1) Update dashboard (Owner, 90m)  2) Write help docs (Owner, 45m)",
};

export default function AIReadyScenarioDemo() {
  const [selected, setSelected] = useState<Chip["id"] | null>(null);

  // Variations applied by each chip (single-select)
  const applied: ResponseShape = useMemo(() => {
    if (selected === "metrics") {
      return {
        ...BASE,
        metrics:
          "Traffic ▲12%, Conversion 4.3%, Churn 2.1% (▼0.4%), ARPU $7.10 (▲$0.30).",
      };
    }
    if (selected === "onepager") {
      return {
        ...BASE,
        highlights: "Onboarding done; +12% traffic.",
        lessons: "Async review saves 2h/wk; watch API.",
        nextWeek: "Dashboard + help docs (owners/timeboxes).",
      };
    }
    if (selected === "exec") {
      return {
        ...BASE,
        highlights:
          "Material progress across onboarding and growth KPIs; trajectory positive.",
        lessons:
          "Process optimization delivered measurable efficiency gains (≈2h/wk).",
        risks:
          "API dependency is a single point of failure; recommend proactive monitoring & SLA review.",
      };
    }
    if (selected === "calendar") {
      return {
        ...BASE,
        nextWeek:
          "Scheduled holds: Dashboard — Mon 10:00–11:30; Help docs — Wed 14:00–14:45 (owners confirmed).",
      };
    }
    return BASE;
  }, [selected]);

  return (
    <section aria-label="Weekly Review Scenario" className={cls.wrap}>
      {/* Heading */}
      <div>
        <h1 className={cls.h1}>Inside an AI Ready Lesson</h1>
        <p className={cls.p}>Every scenario is a short, practical exercise powered by AI.</p>
      </div>

      <div className={cls.card}>
        {/* Situation */}
        <h2 className={cls.h2}>Situation</h2>
        <p className={cls.p}>
          You need a 10-minute weekly review that turns notes into a Monday plan.
        </p>

        {/* What to Ask AI */}
        <h2 className={cls.h2}>What to Ask AI</h2>
        <p className={cls.p}>
          Summarize my week from the notes below and create a Monday action plan.
          Use sections: <em>Highlights, Metrics, Lessons, Risks, Next-Week Plan</em> (with
          owners &amp; time boxes). Notes: &lt;paste bullets&gt;.
        </p>

        {/* AI's Response (dynamic) */}
        <h2 className={cls.h2}>AI's Response</h2>
        <ul className={cls.bullets}>
          <li>Highlights: {applied.highlights}</li>
          <li>Metrics: {applied.metrics}</li>
          <li>Lessons: {applied.lessons}</li>
          <li>Risks: {applied.risks}</li>
          <li>Next-Week Plan: {applied.nextWeek}</li>
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

        {/* Pro Tip (kept) */}
        <p className={cls.proTip}>
          <span className={cls.proTipLabel}>Pro Tip —</span>{" "}
          Convert “Next-Week Plan” into calendar holds immediately.
        </p>
        {/* (Blue helper text removed as requested) */}
      </div>
    </section>
  );
}
