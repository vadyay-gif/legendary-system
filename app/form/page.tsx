"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

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

// Selection rules
const Q3_MAX = 3; // pain points: up to 3
const Q4_MAX = 3; // use cases: up to 3
const Q7_EXACT = 3; // tracks: exactly 3

type Answers = {
  q1_ai_use: string; // single
  q2_confidence: string; // single
  q3_pains: string[]; // multi (<=3)
  q4_usecases: string[]; // multi (<=3)
  q5_fastest_help: string; // single
  q6_learn_style: string; // single
  q7_tracks: string[]; // multi (=3)
  q8_length: string; // single
  q9_age: string; // single
  q10_download: string; // single
  email: string;
};

export default function FormPage() {
  const [step, setStep] = useState<number>(INTRO_STEP);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [answers, setAnswers] = useState<Answers>({
    q1_ai_use: "",
    q2_confidence: "",
    q3_pains: [],
    q4_usecases: [],
    q5_fastest_help: "",
    q6_learn_style: "",
    q7_tracks: [],
    q8_length: "",
    q9_age: "",
    q10_download: "",
    email: "",
  });

  // Question number for steps 2–11 (1–10), else 0
  const questionNumber =
    step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP ? step - 1 : 0;

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

    // Step mapping:
    // 2: Q1, 3: Q2, 4: Q3, 5: Q4, 6: Q5, 7: Q6, 8: Q7, 9: Q8, 10: Q9, 11: Q10, 12: Email
    if (s === 2 && !answers.q1_ai_use) return setErr("Please select an option.");
    if (s === 3 && !answers.q2_confidence) return setErr("Please select an option.");

    if (s === 4) {
      if (answers.q3_pains.length === 0) return setErr("Please select at least 1 option.");
      if (answers.q3_pains.length > Q3_MAX) return setErr(`Please select up to ${Q3_MAX} options.`);
    }

    if (s === 5) {
      if (answers.q4_usecases.length === 0) return setErr("Please select at least 1 option.");
      if (answers.q4_usecases.length > Q4_MAX) return setErr(`Please select up to ${Q4_MAX} options.`);
    }

    if (s === 6 && !answers.q5_fastest_help) return setErr("Please select an option.");
    if (s === 7 && !answers.q6_learn_style) return setErr("Please select an option.");

    if (s === 8) {
      if (answers.q7_tracks.length !== Q7_EXACT)
        return setErr(`Please select exactly ${Q7_EXACT} options.`);
    }

    if (s === 9 && !answers.q8_length) return setErr("Please select an option.");
    if (s === 10 && !answers.q9_age) return setErr("Please select an option.");
    if (s === 11 && !answers.q10_download) return setErr("Please select an option.");

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
          // keep your existing source tag
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

  const q7Helper = useMemo(() => {
    const n = answers.q7_tracks.length;
    const remaining = Math.max(0, Q7_EXACT - n);
    if (n === 0) return `Choose ${Q7_EXACT}.`;
    if (remaining === 0) return `Great — ${Q7_EXACT} selected.`;
    return `${n} selected — choose ${remaining} more.`;
  }, [answers.q7_tracks.length]);

  // Thank you page (no progress/counter)
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl text-center text-slate-100">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase mb-3">
            AI Ready
          </p>
          <h1 className="text-2xl font-semibold mb-3 text-white">Thank you!</h1>
          <p className="text-sm text-slate-300">
            We&apos;ve sent your AI Ready access link to your email.
          </p>
          <p className="text-xs text-slate-400 mt-3">
            If you don&apos;t see it within a few minutes, please check your Spam/Junk folder.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Global text color fix: ensures any unstyled text is readable on dark background */}
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
              AI Ready
            </p>
            <h1 className="text-xl md:text-2xl font-semibold mt-1 text-white">
              {step === INTRO_STEP ? "AI feels risky… until it doesn’t." : "Quick AI Ready quiz"}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              {step === INTRO_STEP
                ? "See how AI Ready helps you use AI safely for real work tasks."
                : "Help us tailor AI Ready to you"}
            </p>
          </div>
        </div>

        {/* Progress (hidden on intro) */}
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

                <p className="text-base md:text-lg font-medium text-white">
                  Before: AI breaks things. After: AI Ready makes AI useful.
                </p>
                <p className="text-sm text-slate-300 mt-2">
                  Answer 10 quick questions so we can tailor AI Ready to how you work — emails,
                  spreadsheets, presentations, summaries, and more.
                </p>
                {/* Removed: "No signup yet..." */}
              </>
            )}

            {/* Q1 – Adoption */}
            {step === 2 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  Do you already use AI for work?
                </p>
                <RadioGroup
                  value={answers.q1_ai_use}
                  onChange={(v) => updateSingle("q1_ai_use", v)}
                  options={[
                    "Yes, regularly",
                    "Yes, sometimes",
                    "I’ve tried it once or twice",
                    "Not yet, but I want to",
                    "Not yet, and I’m unsure",
                  ]}
                />
              </>
            )}

            {/* Q2 – Confidence */}
            {step === 3 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  Which best describes you right now with AI?
                </p>
                <RadioGroup
                  value={answers.q2_confidence}
                  onChange={(v) => updateSingle("q2_confidence", v)}
                  options={[
                    "Curious, but unsure where to start",
                    "I’ve tried it — results are hit-or-miss",
                    "I use it sometimes, but I’m not confident",
                    "I use it often, but I know I could do better",
                  ]}
                />
              </>
            )}

            {/* Q3 – Pains (multi, up to 3) */}
            {step === 4 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  What’s hardest about getting value from AI at work?
                </p>
                <p className="text-xs text-slate-400 mt-1">Choose up to {Q3_MAX}.</p>
                <MultiSelectGroup
                  value={answers.q3_pains}
                  onChange={(v) => updateSingle("q3_pains", v)}
                  options={[
                    "I’m not sure what to ask (prompting)",
                    "I don’t know how to get consistent results",
                    "I waste time rewriting prompts to “fix” the output",
                    "I’m not sure how to use AI safely at work (privacy/confidentiality)",
                    "I struggle to get the right tone (professional, friendly, firm)",
                    "I get answers, but they’re not in a usable format (bullets/table/template)",
                  ]}
                  maxSelected={Q3_MAX}
                />
              </>
            )}

            {/* Q4 – Where AI help is desired (multi, up to 3) */}
            {step === 5 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  Where would you most like AI to help you at work?
                </p>
                <p className="text-xs text-slate-400 mt-1">Choose up to {Q4_MAX}.</p>
                <MultiSelectGroup
                  value={answers.q4_usecases}
                  onChange={(v) => updateSingle("q4_usecases", v)}
                  options={[
                    "Emails and everyday communication",
                    "Summaries (documents, meeting notes, action items)",
                    "Spreadsheets and data work",
                    "Presentations (slides, outlines, speaker notes)",
                    "Marketing or social content",
                    "Research and comparisons (options, pros/cons)",
                    "Productivity (planning, checklists, routines)",
                    "Meetings (agendas, follow-ups, minutes)",
                    "Brainstorming & strategy (ideas, frameworks, decisions)",
                  ]}
                  maxSelected={Q4_MAX}
                />
              </>
            )}

            {/* Q5 – CORE hook */}
            {step === 6 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  What would help you improve your AI results fastest?
                </p>
                <RadioGroup
                  value={answers.q5_fastest_help}
                  onChange={(v) => updateSingle("q5_fastest_help", v)}
                  options={[
                    "A simple prompt structure I can reuse (C.O.R.E.)",
                    "Seeing examples of strong prompts for real work tasks",
                    "Learning how to get more accurate, specific answers",
                    "Knowing how to use AI safely at work",
                  ]}
                />
              </>
            )}

            {/* Q6 – Learning preference */}
            {step === 7 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  How would you prefer to learn prompting inside AI Ready?
                </p>
                <RadioGroup
                  value={answers.q6_learn_style}
                  onChange={(v) => updateSingle("q6_learn_style", v)}
                  options={[
                    "Short real-work scenarios with an “expert prompt” I can copy",
                    "Step-by-step breakdown of why a prompt works (C.O.R.E explained)",
                    "Quick practice tasks where I build a strong prompt from pieces",
                    "A simple library of reusable prompt templates by situation",
                  ]}
                />
              </>
            )}

            {/* Q7 – Tracks (multi, exactly 3) */}
            {step === 8 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  Which 3 areas would you want AI Ready to focus on first?
                </p>
                <p className="text-xs text-slate-400 mt-1">{q7Helper}</p>
                <MultiSelectGroup
                  value={answers.q7_tracks}
                  onChange={(v) => updateSingle("q7_tracks", v)}
                  options={[
                    "Everyday Communication",
                    "Reports & Summaries",
                    "Spreadsheets & Data",
                    "Presentations",
                    "Productivity",
                    "Meetings & Notes",
                    "Research & Analysis",
                    "Marketing & Social",
                    "Brainstorming & Strategy",
                  ]}
                  maxSelected={Q7_EXACT}
                />
              </>
            )}

            {/* Q8 – Lesson length */}
            {step === 9 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  What lesson length would you actually complete?
                </p>
                <RadioGroup
                  value={answers.q8_length}
                  onChange={(v) => updateSingle("q8_length", v)}
                  options={["1–2 minutes", "3–5 minutes", "5–10 minutes", "Longer is fine if it’s practical"]}
                />
              </>
            )}

            {/* Q9 – Age */}
            {step === 10 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  Which age group are you in?
                </p>
                <RadioGroup
                  value={answers.q9_age}
                  onChange={(v) => updateSingle("q9_age", v)}
                  options={["< 25", "25–34", "35–44", "45–54", "55–65", "65+"]}
                />
              </>
            )}

            {/* Q10 – Conversion */}
            {step === 11 && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  What would make AI Ready feel instantly worth downloading?
                </p>
                <RadioGroup
                  value={answers.q10_download}
                  onChange={(v) => updateSingle("q10_download", v)}
                  options={[
                    "Learning C.O.R.E prompting so I can get reliable results",
                    "Seeing exactly what AI is useful for at work (real examples)",
                    "Having ready-to-use prompts for common work situations",
                    "Feeling confident using AI at work without guessing",
                  ]}
                />
                <p className="text-xs text-slate-500 mt-3">Your results are next.</p>
              </>
            )}

            {/* Page 12 – Email capture */}
            {step === EMAIL_STEP && (
              <>
                <p className="text-base md:text-lg font-medium text-white">
                  Final step — where should we send your AI Ready access link?
                </p>
                <p className="text-xs text-slate-300 mb-2">
                  Enter your email to get the link to the AI Ready app.
                </p>
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => updateSingle("email", e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@company.com"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  If you don’t receive the email, please check your Spam/Junk folder.
                </p>
              </>
            )}
          </div>

          {error && <p className="text-xs text-rose-400 mb-3 font-medium">{error}</p>}

          {/* Buttons */}
          <div className="flex items-center justify-between mt-4 gap-3">
            {/* Back button hidden on page 1 */}
            {step !== INTRO_STEP && (
              <button
                type="button"
                onClick={back}
                className="px-3 py-2 rounded-full border border-slate-700 text-xs md:text-sm text-slate-200 hover:bg-slate-800 transition"
              >
                ← Back
              </button>
            )}

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

/* --- Presentational components --- */

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
    // Enforce max selection
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
