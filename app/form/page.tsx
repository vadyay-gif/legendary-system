"use client";

import Image from "next/image";
import { useState } from "react";

// Funnel structure:
// Page 1  = intro (no % counter)
// Page 2–11 = 10 questions (Q1 shows 0%)
// Page 12 = email capture (shows 100%)
// Thank-you page shows after submit (no % counter)

const TOTAL_QUESTIONS = 10;
const INTRO_STEP = 1;
const FIRST_QUESTION_STEP = 2;
const LAST_QUESTION_STEP = FIRST_QUESTION_STEP + TOTAL_QUESTIONS - 1; // 11
const EMAIL_STEP = LAST_QUESTION_STEP + 1; // 12
const TOTAL_STEPS = EMAIL_STEP;

export default function FormPage() {
  const [step, setStep] = useState<number>(INTRO_STEP);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 10 questions + email
  const [answers, setAnswers] = useState({
    q1_goal: "",
    q2_feel: "",
    q3_usecase: "",
    q4_obstacle: "",
    q5_output: "",
    q6_office: "",
    q7_length: "",
    q8_format: "",
    q9_age: "",
    q10_start: "",
    email: "",
  });

  // Question number for steps 2–11 (1–10), else 0
  const questionNumber =
    step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP ? step - 1 : 0;

  function updateSingle(name: keyof typeof answers, value: string) {
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

    if (s === 2 && !answers.q1_goal) return setErr("Please select an option.");
    if (s === 3 && !answers.q2_feel) return setErr("Please select an option.");
    if (s === 4 && !answers.q3_usecase) return setErr("Please select an option.");
    if (s === 5 && !answers.q4_obstacle) return setErr("Please select an option.");
    if (s === 6 && !answers.q5_output) return setErr("Please select an option.");
    if (s === 7 && !answers.q6_office) return setErr("Please select an option.");
    if (s === 8 && !answers.q7_length) return setErr("Please select an option.");
    if (s === 9 && !answers.q8_format) return setErr("Please select an option.");
    if (s === 10 && !answers.q9_age) return setErr("Please select an option.");
    if (s === 11 && !answers.q10_start) return setErr("Please select an option.");

    if (s === EMAIL_STEP) {
      const email = answers.email.trim();
      const ok = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!ok) return setErr("Please enter a valid email.");
    }

    return true;
  }

  function next() {
    if (!validateStep(step)) return;
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  }

  function back() {
    if (step > INTRO_STEP) {
      setError(null);
      setStep((s) => s - 1);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(step)) return;

    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          source: "popup-quiz",
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Thank you page (no progress/counter)
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase mb-3">
            AI Ready
          </p>
          <h1 className="text-2xl font-semibold mb-3">Thank you!</h1>
          <p className="text-sm text-slate-300">
            The link to AI Ready app will be sent to you shortly.
          </p>
        </div>
      </main>
    );
  }

  // Progress logic:
  // - No counter on intro (step 1)
  // - Q1 (step 2) shows 0%
  // - Email step shows 100%
  const showProgress = step !== INTRO_STEP;
  const progress =
    step === EMAIL_STEP
      ? 100
      : step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP
      ? Math.round(((questionNumber - 1) / TOTAL_QUESTIONS) * 100) // Q1 => 0%
      : 0;

  const label =
    step === INTRO_STEP
      ? ""
      : step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP
      ? `Question ${questionNumber} of ${TOTAL_QUESTIONS}`
      : "Email";

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
        {/* Header (design unchanged) */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
              AI Ready
            </p>
            <h1 className="text-xl md:text-2xl font-semibold mt-1">
              {step === INTRO_STEP ? "AI feels risky… until it doesn’t." : "Quick AI Ready quiz"}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              {step === INTRO_STEP
                ? "See how AI Ready helps you use AI safely for real work tasks."
                : "Tap one answer per question."}
            </p>
          </div>
        </div>

        {/* Progress (no counter on intro; no progress bar on intro) */}
        {showProgress && (
          <div className="mb-4">
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>
                <span className="font-semibold text-slate-100">{progress}%</span>{" "}
                complete
              </span>
              <span>{label}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          {/* STEP CONTENT */}
          <div className="space-y-2 mb-4">
            {/* Page 1 – Intro with image */}
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

                <p className="text-base md:text-lg font-medium">
                  Before: AI breaks things. After: AI Ready makes AI useful.
                </p>
                <p className="text-sm text-slate-300 mt-2">
                  Answer 10 quick questions so we can tailor AI Ready to how you work — emails,
                  spreadsheets, presentations, summaries, and more.
                </p>
                <p className="text-xs text-slate-500 mt-3">
                  No signup yet. Tap “Next” to start.
                </p>
              </>
            )}

            {/* Q1 – Outcome (AI Ready value) */}
            {step === 2 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What would you most like AI Ready to help you improve first?
                </p>
                <RadioGroup
                  value={answers.q1_goal}
                  onChange={(v) => updateSingle("q1_goal", v)}
                  options={[
                    "Write clearer emails and messages",
                    "Summarize documents/meetings faster",
                    "Create presentations and updates",
                    "Work better with spreadsheets/data",
                    "Plan and brainstorm more effectively",
                  ]}
                />
              </>
            )}

            {/* Q2 – Confidence */}
            {step === 3 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  How do you currently feel about using AI at work?
                </p>
                <RadioGroup
                  value={answers.q2_feel}
                  onChange={(v) => updateSingle("q2_feel", v)}
                  options={[
                    "Curious but unsure where to start",
                    "I’ve tried it — results are hit or miss",
                    "I use it sometimes but not confidently",
                    "I avoid it because it feels risky",
                  ]}
                />
              </>
            )}

            {/* Q3 – Primary use case */}
            {step === 4 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Which work situation do you want AI Ready to train you for most?
                </p>
                <RadioGroup
                  value={answers.q3_usecase}
                  onChange={(v) => updateSingle("q3_usecase", v)}
                  options={[
                    "Writing/replying to emails professionally",
                    "Turning notes into a clear summary or report",
                    "Building slides from bullet points",
                    "Improving spreadsheets (formulas, cleanup, insights)",
                    "Brainstorming ideas with structure",
                  ]}
                />
              </>
            )}

            {/* Q4 – Biggest obstacle */}
            {step === 5 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What’s the biggest thing that stops you getting reliable results from AI?
                </p>
                <RadioGroup
                  value={answers.q4_obstacle}
                  onChange={(v) => updateSingle("q4_obstacle", v)}
                  options={[
                    "I don’t know what to ask (prompting)",
                    "The output sounds generic or wrong",
                    "I worry about confidentiality/accuracy",
                    "It takes too long to get a good result",
                  ]}
                />
              </>
            )}

            {/* Q5 – Output preference */}
            {step === 6 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Which type of output would be most useful day-to-day?
                </p>
                <RadioGroup
                  value={answers.q5_output}
                  onChange={(v) => updateSingle("q5_output", v)}
                  options={[
                    "Copy-paste email drafts",
                    "Summaries and action lists",
                    "Templates (prompts + examples)",
                    "Slide outlines and speaker notes",
                    "Spreadsheet steps (what to do and how)",
                  ]}
                />
              </>
            )}

            {/* Q6 – Office tools focus */}
            {step === 7 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Which “office” task do you want to see AI Ready cover the most?
                </p>
                <RadioGroup
                  value={answers.q6_office}
                  onChange={(v) => updateSingle("q6_office", v)}
                  options={[
                    "Email and communication",
                    "Spreadsheets and data",
                    "Presentations and slides",
                    "Meetings: agendas, minutes, follow-ups",
                    "Documents: rewriting and formatting",
                  ]}
                />
              </>
            )}

            {/* Q7 – Lesson length (AI Ready micro-lessons) */}
            {step === 8 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What lesson length would you actually complete?
                </p>
                <RadioGroup
                  value={answers.q7_length}
                  onChange={(v) => updateSingle("q7_length", v)}
                  options={[
                    "1–2 minutes",
                    "3–5 minutes",
                    "5–10 minutes",
                    "I prefer longer sessions",
                  ]}
                />
              </>
            )}

            {/* Q8 – Learning format */}
            {step === 9 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Which learning style would suit you best in AI Ready?
                </p>
                <RadioGroup
                  value={answers.q8_format}
                  onChange={(v) => updateSingle("q8_format", v)}
                  options={[
                    "Short scenario lessons (real workplace situations)",
                    "Ready-made prompts + examples",
                    "Step-by-step walkthroughs",
                    "Quick quizzes to test understanding",
                  ]}
                />
              </>
            )}

            {/* Q9 – Age (required by you) */}
            {step === 10 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Which age group are you in?
                </p>
                <RadioGroup
                  value={answers.q9_age}
                  onChange={(v) => updateSingle("q9_age", v)}
                  options={[
                    "< 25",
                    "25–34",
                    "35–44",
                    "45–54",
                    "55–65",
                    "65+",
                  ]}
                />
              </>
            )}

            {/* Q10 – Start point */}
            {step === 11 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What would make AI Ready feel immediately valuable to you?
                </p>
                <RadioGroup
                  value={answers.q10_start}
                  onChange={(v) => updateSingle("q10_start", v)}
                  options={[
                    "A library of proven prompts I can reuse",
                    "Examples for my exact work tasks",
                    "A safe way to use AI without mistakes",
                    "Clear step-by-step workflows",
                  ]}
                />
                <p className="text-xs text-slate-500 mt-3">Your results are next.</p>
              </>
            )}

            {/* Page 12 – Email capture (shows 100%) */}
            {step === EMAIL_STEP && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Final step — where should we send your AI Ready access link?
                </p>
                <p className="text-xs text-slate-400 mb-2">
                  Enter your email to join early access. We’ll email you the link to the AI Ready app.
                </p>
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => updateSingle("email", e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@company.com"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  We respect your time and privacy. No spam.
                </p>
              </>
            )}
          </div>

          {error && (
            <p className="text-xs text-rose-400 mb-3 font-medium">{error}</p>
          )}

          {/* Buttons (design unchanged) */}
          <div className="flex items-center justify-between mt-4 gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === INTRO_STEP}
              className="px-3 py-2 rounded-full border border-slate-700 text-xs md:text-sm text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition"
            >
              ← Back
            </button>

            {step < TOTAL_STEPS && (
              <button
                type="button"
                onClick={next}
                className="ml-auto px-4 py-2 rounded-full bg-indigo-500 text-xs md:text-sm font-medium text-white hover:bg-indigo-600 transition"
              >
                Next →
              </button>
            )}

            {step === TOTAL_STEPS && (
              <button
                type="submit"
                disabled={submitting}
                className="ml-auto px-4 py-2 rounded-full bg-indigo-500 text-xs md:text-sm font-medium text-white hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {submitting ? "Submitting…" : "Submit →"}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

/* --- Presentational components (unchanged) --- */

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
