"use client";

import { useState } from "react";

type Multi = string[];

const TOTAL_STEPS = 12;

export default function FormPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // All answers here
  const [answers, setAnswers] = useState({
    q1_confidence: "",
    q2_awareness: "",
    q3_tasks: [] as Multi,
    q4_challenges: [] as Multi,
    q5_experience: "",
    q6_use: [] as Multi,
    q7_role: "",
    q8_format: [] as Multi,
    q9_length: "",
    q10_motivation: "",
    q11_tips: "",
    email: "",
  });

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  function updateSingle(name: keyof typeof answers, value: string) {
    setAnswers((prev) => ({ ...prev, [name]: value }));
    setError(null);
  }

  function toggleMulti(name: keyof typeof answers, value: string) {
    setAnswers((prev) => {
      const current = prev[name] as string[];
      const exists = current.includes(value);
      const next = exists
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [name]: next };
    });
    setError(null);
  }

  function validateStep(s: number): boolean {
    setError(null);

    if (s === 1 && !answers.q1_confidence) return setErr("Please select an option.");
    if (s === 2 && !answers.q2_awareness) return setErr("Please select an option.");
    if (s === 3) {
      if (answers.q3_tasks.length === 0) return setErr("Select at least one task.");
      if (answers.q3_tasks.length > 3) return setErr("Please select no more than 3 tasks.");
    }
    if (s === 4 && answers.q4_challenges.length === 0)
      return setErr("Select at least one challenge.");
    if (s === 5 && !answers.q5_experience) return setErr("Please select an option.");
    if (s === 6 && answers.q6_use.length === 0)
      return setErr("Select at least one option.");
    if (s === 7 && !answers.q7_role) return setErr("Please select an option.");
    if (s === 8) {
      if (answers.q8_format.length === 0)
        return setErr("Select at least one format.");
      if (answers.q8_format.length > 2)
        return setErr("Please select no more than 2 formats.");
    }
    if (s === 9 && !answers.q9_length) return setErr("Please select an option.");
    if (s === 10 && !answers.q10_motivation) return setErr("Please select an option.");
    if (s === 11 && !answers.q11_tips) return setErr("Please select an option.");
    if (s === 12) {
      const email = answers.email.trim();
      const ok = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!ok) return setErr("Please enter a valid email.");
    }

    return true;
  }

  function setErr(msg: string): false {
    setError(msg);
    return false;
  }

  function next() {
    if (!validateStep(step)) return;
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  }

  function back() {
    if (step > 1) {
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

      // 👉 OPTION A: simple console log (dev only)
      // console.log("Form answers:", answers);

      // 👉 OPTION B: POST to an API route (see step 3 below)
      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
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
            Your answers will help us tailor the AI Ready experience and lessons
            for professionals like you.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
              AI Ready
            </p>
            <h1 className="text-xl md:text-2xl font-semibold mt-1">
              Let’s personalize your AI learning
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Answer a few quick questions about how you use AI at work.
            </p>
          </div>
        </div>

        {/* Progress */}
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
            <span>
              Question {step} of {TOTAL_STEPS}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          {/* QUESTION BLOCKS */}
          <div className="space-y-2 mb-4">
            {step === 1 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  How confident do you feel using AI tools for your work?
                </p>
                <RadioGroup
                  value={answers.q1_confidence}
                  onChange={(v) => updateSingle("q1_confidence", v)}
                  options={[
                    "Not confident at all",
                    "Slightly confident",
                    "Moderately confident",
                    "Confident",
                    "Very confident",
                  ]}
                />
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Do you know what tasks AI can help you with at work?
                </p>
                <RadioGroup
                  value={answers.q2_awareness}
                  onChange={(v) => updateSingle("q2_awareness", v)}
                  options={[
                    "Yes, I’m very clear about it",
                    "I know a few tasks",
                    "I’m not sure",
                    "I have no idea",
                  ]}
                />
              </>
            )}

            {step === 3 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What would you most like AI to help you with?
                </p>
                <p className="text-xs text-slate-400">Choose up to 3.</p>
                <CheckboxGroup
                  values={answers.q3_tasks}
                  onChange={(v) => toggleMulti("q3_tasks", v)}
                  options={[
                    "Writing emails",
                    "Summaries & reports",
                    "Presentations",
                    "Brainstorming & ideas",
                    "Research",
                    "Data & spreadsheets",
                    "Meetings & notes",
                    "Other",
                  ]}
                />
              </>
            )}

            {step === 4 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What’s your biggest challenge when trying to use AI?
                </p>
                <p className="text-xs text-slate-400">
                  Select all that apply.
                </p>
                <CheckboxGroup
                  values={answers.q4_challenges}
                  onChange={(v) => toggleMulti("q4_challenges", v)}
                  options={[
                    "I don’t know where to start",
                    "Too much information online",
                    "Not sure which prompts to use",
                    "Hard to apply AI to my job",
                    "AI results feel too generic",
                    "I don’t trust the accuracy",
                    "Lack of time to learn",
                    "Other",
                  ]}
                />
              </>
            )}

            {step === 5 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What best describes your current AI experience level?
                </p>
                <RadioGroup
                  value={answers.q5_experience}
                  onChange={(v) => updateSingle("q5_experience", v)}
                  options={[
                    "Total beginner",
                    "I know the basics",
                    "I use AI occasionally",
                    "I use AI regularly",
                    "Advanced / power user",
                  ]}
                />
              </>
            )}

            {step === 6 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What do you currently use AI for?
                </p>
                <p className="text-xs text-slate-400">
                  Select all that apply.
                </p>
                <CheckboxGroup
                  values={answers.q6_use}
                  onChange={(v) => toggleMulti("q6_use", v)}
                  options={[
                    "Emails & rewriting",
                    "Summaries",
                    "Ideas or creativity",
                    "Research",
                    "Data or spreadsheets",
                    "I rarely use AI",
                    "I’ve never used AI",
                  ]}
                />
              </>
            )}

            {step === 7 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What’s your job role or field?
                </p>
                <RadioGroup
                  value={answers.q7_role}
                  onChange={(v) => updateSingle("q7_role", v)}
                  options={[
                    "Manager / Leadership",
                    "Marketing / Sales",
                    "HR / Recruiting",
                    "Operations / Admin",
                    "Finance",
                    "Education",
                    "Tech / Engineering",
                    "Freelance / Self-employed",
                    "Other",
                  ]}
                />
              </>
            )}

            {step === 8 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What type of AI learning format works best for you?
                </p>
                <p className="text-xs text-slate-400">Choose up to 2.</p>
                <CheckboxGroup
                  values={answers.q8_format}
                  onChange={(v) => toggleMulti("q8_format", v)}
                  options={[
                    "Short, scenario-based lessons",
                    "Ready-made prompt templates",
                    "Step-by-step tutorials",
                    "Short videos",
                    "Interactive exercises",
                    "Deep-dive explanations",
                  ]}
                />
              </>
            )}

            {step === 9 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  How long should an AI lesson be for you to actually complete
                  it?
                </p>
                <RadioGroup
                  value={answers.q9_length}
                  onChange={(v) => updateSingle("q9_length", v)}
                  options={[
                    "1–2 minutes",
                    "3–5 minutes",
                    "5–10 minutes",
                    "I prefer longer sessions",
                  ]}
                />
              </>
            )}

            {step === 10 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  What motivates you the most to improve your AI skills?
                </p>
                <RadioGroup
                  value={answers.q10_motivation}
                  onChange={(v) => updateSingle("q10_motivation", v)}
                  options={[
                    "Saving time",
                    "Becoming more productive",
                    "Reducing repetitive work",
                    "Improving career opportunities",
                    "Staying competitive",
                    "Personal curiosity",
                  ]}
                />
              </>
            )}

            {step === 11 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Would you like to receive AI tips or templates tailored to your
                  job?
                </p>
                <RadioGroup
                  value={answers.q11_tips}
                  onChange={(v) => updateSingle("q11_tips", v)}
                  options={[
                    "Yes, daily",
                    "Yes, weekly",
                    "Only when I open the app",
                    "No, thanks",
                  ]}
                />
              </>
            )}

            {step === 12 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Get your personalized AI Ready experience.
                </p>
                <p className="text-xs text-slate-400 mb-2">
                  Leave your email to receive early access and tailored AI tips
                  based on your answers.
                </p>
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => updateSingle("email", e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@company.com"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  We respect your time and privacy. No spam, just practical AI
                  tips.
                </p>
              </>
            )}
          </div>

          {error && (
            <p className="text-xs text-rose-400 mb-3 font-medium">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-between mt-4 gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
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

/* --- Small presentational components --- */

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

function CheckboxGroup(props: {
  values: string[];
  onChange: (v: string) => void;
  options: string[];
}) {
  const { values, onChange, options } = props;
  return (
    <div className="grid gap-2 mt-2">
      {options.map((opt) => {
        const selected = values.includes(opt);
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
              className={`h-3 w-3 rounded-sm border ${
                selected
                  ? "bg-indigo-500 border-indigo-500"
                  : "border-slate-500"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
