/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";

declare global {
  interface Window {
    amplitude?: any;
  }
}

// Funnel structure:
// Page 1  = intro (no % counter)
// Page 2–6 = 5 questions (Q1 shows 0%)
// Page 7  = final personalized CTA page (shows 100%)

const TOTAL_QUESTIONS = 5;
const INTRO_STEP = 1;
const FIRST_QUESTION_STEP = 2;
const LAST_QUESTION_STEP = FIRST_QUESTION_STEP + TOTAL_QUESTIONS - 1; // 6
const FINAL_STEP = LAST_QUESTION_STEP + 1; // 7
const TOTAL_STEPS = FINAL_STEP;

// Selection rules
const Q1_MAX = 2; // pain points
const Q2_MAX = 2; // use cases

type Answers = {
  q1_pains: string[];
  q2_usecases: string[];
  q3_confidence: string;
  q4_outcome: string;
  q5_goal: string;
};

const APP_STORE_URL = "https://apps.apple.com/app/ai-ready/id6759277049";

export default function FormPage() {
  const [step, setStep] = useState<number>(INTRO_STEP);
  const [error, setError] = useState<string | null>(null);

  const [answers, setAnswers] = useState<Answers>({
    q1_pains: [],
    q2_usecases: [],
    q3_confidence: "",
    q4_outcome: "",
    q5_goal: "",
  });

  // Question number for steps 2–6 (1–5), else 0
  const questionNumber =
    step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP ? step - 1 : 0;

  const showProgress = step !== INTRO_STEP;
  const progress =
    step === FINAL_STEP
      ? 100
      : step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP
        ? Math.round(((questionNumber - 1) / TOTAL_QUESTIONS) * 100)
        : 0;

  const label =
    step === INTRO_STEP
      ? ""
      : step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP
        ? `Question ${questionNumber} of ${TOTAL_QUESTIONS}`
        : "Your plan";

  function updateSingle<K extends keyof Answers>(name: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [name]: value }));
    setError(null);
  }

  function setErr(msg: string): false {
    setError(msg);
    return false;
  }

  function validateStep(s: number): boolean {
    setError(null);

    if (s === INTRO_STEP) return true;

    if (s === 2) {
      if (answers.q1_pains.length === 0) return setErr("Please select at least 1 option.");
      if (answers.q1_pains.length > Q1_MAX) return setErr(`Please select up to ${Q1_MAX} options.`);
    }

    if (s === 3) {
      if (answers.q2_usecases.length === 0) return setErr("Please select at least 1 option.");
      if (answers.q2_usecases.length > Q2_MAX) return setErr(`Please select up to ${Q2_MAX} options.`);
    }

    if (s === 4 && !answers.q3_confidence) return setErr("Please select an option.");
    if (s === 5 && !answers.q4_outcome) return setErr("Please select an option.");
    if (s === 6 && !answers.q5_goal) return setErr("Please select an option.");

    return true;
  }

  function next() {
    if (!validateStep(step)) return;

    if (step === INTRO_STEP && typeof window !== "undefined" && window.amplitude) {
      window.amplitude.track("Funnel Started", {
        product: "AI Ready",
        platform: "iOS",
      });
    }

    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  }

  function back() {
    if (step > INTRO_STEP) {
      setError(null);
      setStep((s) => s - 1);
    }
  }

  function handleAppStoreClick() {
    if (typeof window !== "undefined" && window.amplitude) {
      window.amplitude.track("App Store CTA Clicked", {
        product: "AI Ready",
        platform: "iOS",
        location: "final_funnel_step",
      });
    }
  }

  function buildHelpLines() {
    const lines: string[] = [];

    const primaryPain = answers.q1_pains[0];
    const secondaryPain = answers.q1_pains[1];
    const primaryUseCase = answers.q2_usecases[0];
    const secondaryUseCase = answers.q2_usecases[1];

    if (answers.q4_outcome) {
      lines.push(answers.q4_outcome);
    } else {
      lines.push("Finish tasks in half the time using AI correctly");
    }

    if (primaryUseCase) {
      lines.push(`Use AI better for ${primaryUseCase.toLowerCase()}`);
    }

    if (secondaryUseCase) {
      lines.push(`Get faster results for ${secondaryUseCase.toLowerCase()}`);
    }

    if (primaryPain === "Writing emails takes too long") {
      lines.push("Write clearer emails in minutes instead of rewriting for ages");
    }

    if (primaryPain === "I don’t know what to ask AI") {
      lines.push("Use proven prompts so you never stare at a blank screen");
    }

    if (primaryPain === "I waste time fixing AI outputs") {
      lines.push("Get more reliable outputs without constant cleanup");
    }

    if (primaryPain === "Research and summaries are slow") {
      lines.push("Turn long information into quick, usable takeaways");
    }

    if (primaryPain === "I struggle to get started on tasks") {
      lines.push("Start faster with clear structures and practical prompt patterns");
    }

    if (primaryPain === "My workflow feels messy and inefficient") {
      lines.push("Build a simple repeatable system for daily work tasks");
    }

    if (
      secondaryPain &&
      secondaryPain !== primaryPain &&
      secondaryPain === "I don’t know what to ask AI"
    ) {
      lines.push("Know exactly what to ask AI to get useful work-ready results");
    }

    if (answers.q3_confidence === "Not confident yet") {
      lines.push("Build confidence with short lessons and real work examples");
    } else if (answers.q3_confidence === "Somewhat confident") {
      lines.push("Turn inconsistent AI results into a repeatable advantage");
    } else if (answers.q3_confidence === "Very confident") {
      lines.push("Level up your results with smarter structure and better prompting");
    }

    if (answers.q5_goal === "I want quick wins I can use immediately") {
      lines.push("Apply what you learn immediately to today’s workload");
    }

    if (answers.q5_goal === "I want a simple system I can rely on") {
      lines.push("Follow a system instead of guessing every time");
    }

    if (answers.q5_goal === "I want to save time every single week") {
      lines.push("Save time every week with repeatable AI workflows");
    }

    if (answers.q5_goal === "I want to feel more valuable at work") {
      lines.push("Work faster and look sharper with better AI output");
    }

    return Array.from(new Set(lines)).slice(0, 6);
  }

  const q1Helper = useMemo(() => {
    const n = answers.q1_pains.length;
    if (n === 0) return `Choose up to ${Q1_MAX}.`;
    if (n === Q1_MAX) return `Great — ${Q1_MAX} selected.`;
    return `${n} selected — choose up to ${Q1_MAX}.`;
  }, [answers.q1_pains.length]);

  const q2Helper = useMemo(() => {
    const n = answers.q2_usecases.length;
    if (n === 0) return `Choose up to ${Q2_MAX}.`;
    if (n === Q2_MAX) return `Great — ${Q2_MAX} selected.`;
    return `${n} selected — choose up to ${Q2_MAX}.`;
  }, [answers.q2_usecases.length]);

  const helpLines = useMemo(() => buildHelpLines(), [answers]);

  const engagementLine = useMemo(() => {
    if (step === 2) return "You’re not alone — most people struggle with this.";
    if (step === 3) return "This is where AI can save you the most time.";
    if (step === 4) {
      if (answers.q3_confidence === "Not confident yet") {
        return "Good — this is exactly where most people start.";
      }
      if (answers.q3_confidence === "Somewhat confident") {
        return "You’re close to getting much better results.";
      }
      if (answers.q3_confidence === "Very confident") {
        return "Great — now let’s make your results more consistent.";
      }
      return "A small improvement here can make a big difference at work.";
    }
    if (step === 5) return "This is exactly what AI Ready is built to help with.";
    if (step === 6) return "A few practical improvements here can save hours over time.";
    return "";
  }, [step, answers.q3_confidence]);

  const Q1_OPTIONS = [
    "Writing emails takes too long",
    "I don’t know what to ask AI",
    "I waste time fixing AI outputs",
    "Research and summaries are slow",
    "I struggle to get started on tasks",
    "My workflow feels messy and inefficient",
  ];

  const Q2_OPTIONS = [
    "Emails & communication",
    "Summaries & reports",
    "Presentations & slides",
    "Research & learning",
    "Planning & organisation",
    "Spreadsheets & data",
  ];

  const Q3_OPTIONS = ["Very confident", "Somewhat confident", "Not confident yet"];

  const Q4_OPTIONS = [
    "Finish tasks in half the time using AI correctly",
    "Save hours every week",
    "Feel more confident at work",
    "Stop second-guessing AI results",
  ];

  const Q5_OPTIONS = [
    "I want quick wins I can use immediately",
    "I want a simple system I can rely on",
    "I want to save time every single week",
    "I want to feel more valuable at work",
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
              AI Ready
            </p>
            <h1 className="text-xl md:text-2xl font-semibold mt-1 text-white">
              {step === INTRO_STEP
                ? "Reduce your workload by up to 80% using AI the right way"
                : "Quick AI Ready quiz"}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              {step === INTRO_STEP
                ? "Most people use AI wrong — that’s why work still feels slower, messier, and more frustrating than it should."
                : "Help us tailor AI Ready to how you work"}
            </p>
          </div>
        </div>

        {showProgress && (
          <div className="mb-4">
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>
                <span className="font-semibold text-slate-100">{progress}%</span> complete
              </span>
              <span>{label}</span>
            </div>
          </div>
        )}

        <div className="mt-4">
          <div className="space-y-2 mb-4">
            {step === INTRO_STEP && (
              <>
                <div className="mb-4">
                  <Image
                    src="/ai-before-after.png"
                    alt="Before and after using AI Ready"
                    width={1400}
                    height={700}
                    priority
                    className="w-full rounded-2xl border border-slate-800"
                  />
                </div>

                <p className="text-base md:text-lg font-medium text-white">
                  Turn AI into a real work advantage — not another tool that wastes your time.
                </p>

                <p className="text-sm text-slate-300 mt-2">
                  AI Ready shows you how to use AI for real work tasks like emails, summaries,
                  presentations, research, and more.
                </p>

                <div className="mt-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[11px] text-slate-300">
                  Takes 30 seconds
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  What slows you down most at work?
                </p>
                <p className="text-xs text-slate-300">{q1Helper}</p>
                <MultiSelectGroup
                  value={answers.q1_pains}
                  onChange={(v) => updateSingle("q1_pains", v)}
                  options={Q1_OPTIONS}
                  maxSelected={Q1_MAX}
                />
                <p className="text-xs text-indigo-300 mt-2">{engagementLine}</p>
              </>
            )}

            {step === 3 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  Where would you want AI to help you most?
                </p>
                <p className="text-xs text-slate-300">{q2Helper}</p>
                <MultiSelectGroup
                  value={answers.q2_usecases}
                  onChange={(v) => updateSingle("q2_usecases", v)}
                  options={Q2_OPTIONS}
                  maxSelected={Q2_MAX}
                />
                <p className="text-xs text-indigo-300 mt-2">{engagementLine}</p>
              </>
            )}

            {step === 4 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  How confident are you using AI effectively today?
                </p>
                <RadioGroup
                  value={answers.q3_confidence}
                  onChange={(v) => updateSingle("q3_confidence", v)}
                  options={Q3_OPTIONS}
                />
                <p className="text-xs text-indigo-300 mt-2">{engagementLine}</p>
              </>
            )}

            {step === 5 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  If AI worked properly for you, what would change most?
                </p>
                <RadioGroup
                  value={answers.q4_outcome}
                  onChange={(v) => updateSingle("q4_outcome", v)}
                  options={Q4_OPTIONS}
                />
                <p className="text-xs text-indigo-300 mt-2">{engagementLine}</p>
              </>
            )}

            {step === 6 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  What would make AI Ready most valuable to you right now?
                </p>
                <RadioGroup
                  value={answers.q5_goal}
                  onChange={(v) => updateSingle("q5_goal", v)}
                  options={Q5_OPTIONS}
                />
                <p className="text-xs text-indigo-300 mt-2">{engagementLine}</p>
              </>
            )}

            {step === FINAL_STEP && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  Your AI Productivity Plan Is Ready
                </p>

                <p className="text-sm text-slate-300 mt-2">
                  <span className="font-medium text-slate-100">Based on your answers:</span>
                </p>

                <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                    We’ll help you
                  </p>
                  <ul className="text-sm text-slate-200 space-y-1">
                    {helpLines.map((x) => (
                      <li key={x}>✔ {x}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Inside AI Ready
                  </p>
                  <ul className="text-sm text-slate-200 space-y-1">
                    <li>✔ Short, practical lessons</li>
                    <li>✔ Copy-paste prompts and templates</li>
                    <li>✔ Real work examples you can actually use</li>
                    <li>✔ Simple frameworks to get better AI results</li>
                  </ul>
                </div>

                <p className="text-sm text-slate-300 mt-4">
                  Join thousands of professionals improving how they use AI at work.
                </p>

                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-400 text-center">
                    Your personalised plan is ready — start now while it’s fresh.
                  </p>

                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleAppStoreClick}
                    className="mt-4 w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-indigo-500 px-4 py-4 text-sm md:text-base font-semibold text-white hover:bg-indigo-600 transition"
                  >
                    <AppleLogo />
                    Download on the App Store
                  </a>

                  <p className="text-[11px] text-slate-400 mt-4 text-center">
                    Free to get started • No technical skills needed • Learn at your own pace
                  </p>
                </div>
              </>
            )}
          </div>

          {error && <p className="text-xs text-rose-400 mb-3 font-medium">{error}</p>}

          <div className="flex items-center justify-between mt-4 gap-3">
            {step !== INTRO_STEP && (
              <button
                type="button"
                onClick={back}
                className="px-3 py-2 rounded-full border border-slate-700 text-xs md:text-sm text-slate-200 hover:bg-slate-800 transition"
              >
                ← Back
              </button>
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={next}
                className="ml-auto px-4 py-2 rounded-full bg-indigo-500 text-xs md:text-sm font-medium text-white hover:bg-indigo-600 transition"
              >
                {step === INTRO_STEP ? "Start →" : "Next →"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

function AppleLogo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
    >
      <path d="M16.365 12.874c.02 2.246 1.969 2.994 1.991 3.004-.016.053-.311 1.068-1.025 2.117-.617.907-1.258 1.811-2.267 1.83-.991.019-1.309-.588-2.442-.588-1.133 0-1.486.57-2.424.607-.974.037-1.717-.975-2.339-1.879-1.271-1.84-2.242-5.201-.937-7.473.649-1.129 1.809-1.844 3.067-1.863.956-.019 1.86.645 2.442.645.582 0 1.674-.798 2.822-.681.48.02 1.828.194 2.693 1.461-.069.043-1.607.939-1.581 2.82Zm-2.079-5.228c.516-.625.865-1.495.77-2.362-.744.03-1.646.496-2.18 1.121-.478.551-.896 1.434-.783 2.281.829.064 1.677-.422 2.193-1.04Z" />
    </svg>
  );
}

function RadioGroup(props: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const { value, onChange, options } = props;
  return (
    <div className="grid gap-2 mt-2">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left text-xs md:text-sm ${
              selected
                ? "border-indigo-500 bg-indigo-500/10 text-slate-50"
                : "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500"
            }`}
          >
            <span>{opt}</span>
            <span
              className={`h-3 w-3 rounded-full border ${
                selected ? "bg-indigo-500 border-indigo-500" : "border-slate-500"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function MultiSelectGroup(props: {
  value: string[];
  onChange: (v: string[]) => void;
  options: string[];
  maxSelected: number;
}) {
  const { value, onChange, options, maxSelected } = props;

  function toggle(opt: string) {
    const has = value.includes(opt);
    if (has) {
      onChange(value.filter((x) => x !== opt));
      return;
    }
    if (value.length >= maxSelected) return;
    onChange([...value, opt]);
  }

  return (
    <div className="grid gap-2 mt-2">
      {options.map((opt) => {
        const selected = value.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            onClick={() => toggle(opt)}
            className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left text-xs md:text-sm ${
              selected
                ? "border-indigo-500 bg-indigo-500/10 text-slate-50"
                : "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500"
            }`}
          >
            <span>{opt}</span>
            <span
              className={`h-3 w-3 rounded-full border ${
                selected ? "bg-indigo-500 border-indigo-500" : "border-slate-500"
              }`}
            />
          </button>
        );
      })}

      <p className="text-[11px] text-slate-500 mt-1">
        {value.length}/{maxSelected} selected
      </p>
    </div>
  );
}
