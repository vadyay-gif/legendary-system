"use client";

import { useState } from "react";

type Multi = string[];

// New funnel structure:
// Slide 1 = intro
// Slide 2–8 = 7 questions
// Slide 9 = collect email
// Slide 10 = thank you (after submit)

const TOTAL_QUESTIONS = 7;
const INTRO_STEP = 1;
const FIRST_QUESTION_STEP = 2;
const LAST_QUESTION_STEP = FIRST_QUESTION_STEP + TOTAL_QUESTIONS - 1; // 8
const EMAIL_STEP = LAST_QUESTION_STEP + 1; // 9
const TOTAL_STEPS = EMAIL_STEP;

export default function FormPage() {
  const [step, setStep] = useState<number>(INTRO_STEP);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Answers (keep the same design/components, only change content + structure)
  const [answers, setAnswers] = useState({
    q1_feel: "",
    q2_frustration: "",
    q3_task: "",
    q4_time: "",
    q5_easier: "",
    q6_worry: "",
    q7_outcome: "",
    email: "",
  });

  // Question number for steps 2–8 (1–7), else 0
  const questionNumber =
    step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP
      ? step - 1
      : 0;

  // Progress: intro 0, each question equally, email 100
  let progress = 0;
  if (questionNumber > 0) {
    progress = Math.round((questionNumber / TOTAL_QUESTIONS) * 100);
  }
  if (step === EMAIL_STEP) {
    progress = 100;
  }

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

    // Intro has no inputs
    if (s === INTRO_STEP) return true;

    if (s === 2 && !answers.q1_feel) return setErr("Please select an option.");
    if (s === 3 && !answers.q2_frustration)
      return setErr("Please select an option.");
    if (s === 4 && !answers.q3_task) return setErr("Please select an option.");
    if (s === 5 && !answers.q4_time) return setErr("Please select an option.");
    if (s === 6 && !answers.q5_easier)
      return setErr("Please select an option.");
    if (s === 7 && !answers.q6_worry)
      return setErr("Please select an option.");
    if (s === 8 && !answers.q7_outcome)
      return setErr("Please select an option.");

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

      // Keep your existing API route
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
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase mb-3">
            AI Ready
          </p>
          <h1 className="text-2xl font-semibold mb-3">Thank you!</h1>
          <p className="text-sm text-slate-300">
            You’re on the early access list. The link to the app will be emailed
            to you shortly.
          </p>
        </div>
      </main>
    );
  }

  const label =
    step === INTRO_STEP
      ? "Intro"
      : step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP
      ? `Question ${questionNumber} of ${TOTAL_QUESTIONS}`
      : "Final step";

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
              {step === INTRO_STEP
                ? "Most professionals are using AI wrong"
                : "Quick AI readiness quiz"}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              {step === INTRO_STEP
                ? "Take this 30-second quiz to see how ready you are to use AI at work."
                : "Tap one answer per question."}
            </p>
          </div>
        </div>

        {/* Progress (design unchanged) */}
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

        <form onSubmit={handleSubmit} className="mt-4">
          {/* STEP CONTENT */}
          <div className="space-y-2 mb-4">
            {/* Slide 1 – Intro */}
            {step === INTRO_STEP && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Stop wasting time with “hit-or-miss” AI.
                </p>
                <p className="text-sm text-slate-300 mt-2">
                  Answer 7 quick questions and we’ll tailor early access to AI
                  Ready for how you work.
                </p>
                <p className="text-xs text-slate-500 mt-3">
                  No signup yet. Tap “Next” to start.
                </p>
              </>
            )}

            {/* Slide 2 – Q1 */}
            {step === 2 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  How do you currently feel about AI at work?
                </p>
                <RadioGroup
                  value={answers.q1_feel}
                  onChange={(v) => updateSingle("q1_feel", v)}
                  options={[
                    "Curious but unsure where to start",
                    "I’ve tried it — results are hit or miss",
                    "I know it matters but rarely use it",
                    "I avoid it because it feels overwhelming",
                  ]}
                />
              </>
            )}

            {/* Slide 3 – Q2 */}
            {step === 3 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What’s your biggest frustration with AI?
                </p>
                <RadioGroup
                  value={answers.q2_frustration}
                  onChange={(v) => updateSingle("q2_frustration", v)}
                  options={[
                    "I don’t know what to ask",
                    "The answers are inconsistent",
                    "It feels too technical",
                    "I don’t see how it fits my daily work",
                  ]}
                />
              </>
            )}

            {/* Slide 4 – Q3 */}
            {step === 4 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Which task would you most like AI to help with?
                </p>
                <RadioGroup
                  value={answers.q3_task}
                  onChange={(v) => updateSingle("q3_task", v)}
                  options={[
                    "Writing emails or messages",
                    "Summarizing documents or meetings",
                    "Planning, checklists, and organizing tasks",
                    "Reports and updates",
                  ]}
                />
              </>
            )}

            {/* Slide 5 – Q4 */}
            {step === 5 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  How much time could you realistically spend learning AI?
                </p>
                <RadioGroup
                  value={answers.q4_time}
                  onChange={(v) => updateSingle("q4_time", v)}
                  options={[
                    "5 minutes at a time",
                    "10–15 minutes",
                    "Only when I really need it",
                    "Almost none — I need quick wins",
                  ]}
                />
              </>
            )}

            {/* Slide 6 – Q5 */}
            {step === 6 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What would make AI easier for you to use?
                </p>
                <RadioGroup
                  value={answers.q5_easier}
                  onChange={(v) => updateSingle("q5_easier", v)}
                  options={[
                    "Real examples from work",
                    "Ready-to-copy prompts",
                    "Step-by-step guidance",
                    "Clear structure with no jargon",
                  ]}
                />
              </>
            )}

            {/* Slide 7 – Q6 */}
            {step === 7 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What worries you most about using AI at work?
                </p>
                <RadioGroup
                  value={answers.q6_worry}
                  onChange={(v) => updateSingle("q6_worry", v)}
                  options={[
                    "Sounding unprofessional",
                    "Getting the wrong answer",
                    "Sharing sensitive information",
                    "Looking inexperienced",
                  ]}
                />
              </>
            )}

            {/* Slide 8 – Q7 */}
            {step === 8 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  If AI could reliably help you with one thing, what would matter
                  most?
                </p>
                <RadioGroup
                  value={answers.q7_outcome}
                  onChange={(v) => updateSingle("q7_outcome", v)}
                  options={[
                    "Saving time every week",
                    "Producing clearer work",
                    "Feeling confident using AI",
                    "Knowing exactly what to ask",
                  ]}
                />
                <p className="text-xs text-slate-500 mt-3">Your results are next.</p>
              </>
            )}

            {/* Slide 9 – Email capture */}
            {step === EMAIL_STEP && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Your results are ready — where should we email them?
                </p>
                <p className="text-xs text-slate-400 mb-2">
                  Enter your email to get early access to AI Ready. We’ll email
                  you the app link when it’s available.
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
