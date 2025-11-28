"use client";

import { useState } from "react";

type Multi = string[];

const TOTAL_QUESTIONS = 20;
const INTRO_STEP = 1;
const FIRST_QUESTION_STEP = 2;
const LAST_QUESTION_STEP = TOTAL_QUESTIONS + 1; // 21
const EMAIL_STEP = TOTAL_QUESTIONS + 2; // 22
const TOTAL_STEPS = EMAIL_STEP;

export default function FormPage() {
  const [step, setStep] = useState<number>(INTRO_STEP);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // All answers
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
    q12_frequency: "",
    q13_device: "",
    q14_language: "",
    q15_region: "",
    q16_companySize: "",
    q17_policy: "",
    q18_notificationChannel: "",
    q19_timeframe: "",
    q20_willingToPay: "",
    email: "",
  });

  // Question number for steps 2–21 (1–20), else 0
  const questionNumber =
    step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP
      ? step - 1
      : 0;

  let progress = 0;
  if (questionNumber > 0) {
    progress = questionNumber * 5; // 20 questions -> 5% each
  }
  if (step === EMAIL_STEP) {
    progress = 100;
  }

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

  function setErr(msg: string): false {
    setError(msg);
    return false;
  }

  function validateStep(s: number): boolean {
    setError(null);

    // Intro has no inputs
    if (s === INTRO_STEP) return true;

    if (s === 2 && !answers.q1_confidence)
      return setErr("Please select an option.");
    if (s === 3 && !answers.q2_awareness)
      return setErr("Please select an option.");
    if (s === 4) {
      if (answers.q3_tasks.length === 0)
        return setErr("Select at least one task.");
      if (answers.q3_tasks.length > 3)
        return setErr("Please select no more than 3 tasks.");
    }
    if (s === 5 && answers.q4_challenges.length === 0)
      return setErr("Select at least one challenge.");
    if (s === 6 && !answers.q5_experience)
      return setErr("Please select an option.");
    if (s === 7 && answers.q6_use.length === 0)
      return setErr("Select at least one option.");
    if (s === 8 && !answers.q7_role)
      return setErr("Please select an option.");
    if (s === 9) {
      if (answers.q8_format.length === 0)
        return setErr("Select at least one format.");
      if (answers.q8_format.length > 2)
        return setErr("Please select no more than 2 formats.");
    }
    if (s === 10 && !answers.q9_length)
      return setErr("Please select an option.");
    if (s === 11 && !answers.q10_motivation)
      return setErr("Please select an option.");
    if (s === 12 && !answers.q11_tips)
      return setErr("Please select an option.");

    if (s === 13 && !answers.q12_frequency)
      return setErr("Please select an option.");
    if (s === 14 && !answers.q13_device)
      return setErr("Please select an option.");
    if (s === 15 && !answers.q14_language)
      return setErr("Please select an option.");
    if (s === 16 && !answers.q15_region)
      return setErr("Please select an option.");
    if (s === 17 && !answers.q16_companySize)
      return setErr("Please select an option.");
    if (s === 18 && !answers.q17_policy)
      return setErr("Please select an option.");
    if (s === 19 && !answers.q18_notificationChannel)
      return setErr("Please select an option.");
    if (s === 20 && !answers.q19_timeframe)
      return setErr("Please select an option.");
    if (s === 21 && !answers.q20_willingToPay)
      return setErr("Please select an option.");

    if (s === EMAIL_STEP) {
      const email = answers.email.trim();
      const ok =
        !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

      // POST to API route
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
            Your answers will help us tailor AI Ready – and we’ll send your AI
            starter PDF to your inbox shortly.
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
              <span className="font-semibold text-slate-100">
                {progress}%
              </span>{" "}
              complete
            </span>
            <span>{label}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          {/* STEP CONTENT */}
          <div className="space-y-2 mb-4">
            {/* Intro / welcome */}
            {step === INTRO_STEP && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Welcome to AI Ready.
                </p>
                <p className="text-sm text-slate-300 mt-2">
                  This short questionnaire helps us understand how you currently
                  use (or don’t use) AI at work – so we can tailor lessons,
                  examples, and templates to people like you.
                </p>
                <p className="text-sm text-slate-300 mt-2">
                  It takes about 3–4 minutes. At the end, you’ll get a{" "}
                  <span className="font-semibold">
                    free PDF guide: “10 Practical Ways to Use AI at Work
                    Today”
                  </span>{" "}
                  based on your answers.
                </p>
                <p className="text-xs text-slate-500 mt-3">
                  Click “Next” to begin. There are 20 quick questions – no AI
                  knowledge required.
                </p>
              </>
            )}

            {/* Q1 – step 2 */}
            {step === 2 && (
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

            {/* Q2 – step 3 */}
            {step === 3 && (
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

            {/* Q3 – step 4 */}
            {step === 4 && (
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

            {/* Q4 – step 5 */}
            {step === 5 && (
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

            {/* Q5 – step 6 */}
            {step === 6 && (
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

            {/* Q6 – step 7 */}
            {step === 7 && (
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

            {/* Q7 – step 8 */}
            {step === 8 && (
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

            {/* Q8 – step 9 */}
            {step === 9 && (
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

            {/* Q9 – step 10 */}
            {step === 10 && (
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

            {/* Q10 – step 11 */}
            {step === 11 && (
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

            {/* Q11 – step 12 */}
            {step === 12 && (
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

            {/* Q12 – step 13 */}
            {step === 13 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  How often do you currently use AI in a typical week?
                </p>
                <RadioGroup
                  value={answers.q12_frequency}
                  onChange={(v) => updateSingle("q12_frequency", v)}
                  options={[
                    "Never",
                    "1–2 times",
                    "3–5 times",
                    "Daily",
                    "Multiple times per day",
                  ]}
                />
              </>
            )}

            {/* Q13 – step 14 */}
            {step === 14 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Where do you mostly access AI tools from?
                </p>
                <RadioGroup
                  value={answers.q13_device}
                  onChange={(v) => updateSingle("q13_device", v)}
                  options={[
                    "Desktop / laptop at work",
                    "Desktop / laptop at home",
                    "Mobile phone",
                    "Tablet",
                    "Mixed equally",
                  ]}
                />
              </>
            )}

            {/* Q14 – step 15 */}
            {step === 15 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Which language would you prefer for AI Ready content?
                </p>
                <RadioGroup
                  value={answers.q14_language}
                  onChange={(v) => updateSingle("q14_language", v)}
                  options={[
                    "English only",
                    "Arabic only",
                    "English first, Arabic optional",
                    "Arabic first, English optional",
                    "Other",
                  ]}
                />
              </>
            )}

            {/* Q15 – step 16 */}
            {step === 16 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Where are you primarily based?
                </p>
                <RadioGroup
                  value={answers.q15_region}
                  onChange={(v) => updateSingle("q15_region", v)}
                  options={[
                    "UAE / GCC",
                    "Middle East / North Africa (non-GCC)",
                    "Europe",
                    "North America",
                    "Asia-Pacific",
                    "Other",
                  ]}
                />
              </>
            )}

            {/* Q16 – step 17 */}
            {step === 17 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Approximately how large is your company or organization?
                </p>
                <RadioGroup
                  value={answers.q16_companySize}
                  onChange={(v) => updateSingle("q16_companySize", v)}
                  options={[
                    "Just me",
                    "2–10 people",
                    "11–50 people",
                    "51–250 people",
                    "250+ people",
                  ]}
                />
              </>
            )}

            {/* Q17 – step 18 */}
            {step === 18 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Does your company have any restrictions on using AI tools?
                </p>
                <RadioGroup
                  value={answers.q17_policy}
                  onChange={(v) => updateSingle("q17_policy", v)}
                  options={[
                    "No restrictions that I know of",
                    "Some guidelines but generally allowed",
                    "Strictly controlled / approval needed",
                    "Not allowed at all",
                    "I’m not sure",
                  ]}
                />
              </>
            )}

            {/* Q18 – step 19 */}
            {step === 19 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  How would you prefer to receive AI Ready tips and updates?
                </p>
                <RadioGroup
                  value={answers.q18_notificationChannel}
                  onChange={(v) =>
                    updateSingle("q18_notificationChannel", v)
                  }
                  options={[
                    "Email",
                    "In-app notifications",
                    "WhatsApp / SMS",
                    "I prefer not to receive tips",
                  ]}
                />
              </>
            )}

            {/* Q19 – step 20 */}
            {step === 20 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  How soon would you like to improve your AI skills for work?
                </p>
                <RadioGroup
                  value={answers.q19_timeframe}
                  onChange={(v) => updateSingle("q19_timeframe", v)}
                  options={[
                    "Immediately (this month)",
                    "Within 3 months",
                    "Within 6 months",
                    "Sometime in the next year",
                    "No clear timeline",
                  ]}
                />
              </>
            )}

            {/* Q20 – step 21 */}
            {step === 21 && (
              <>
                <p className="text-base md:text-lg font-medium">
                  If AI Ready really helps you save time at work, how willing
                  would you be to pay for it?
                </p>
                <RadioGroup
                  value={answers.q20_willingToPay}
                  onChange={(v) => updateSingle("q20_willingToPay", v)}
                  options={[
                    "I’d only use a free version",
                    "I might pay a small amount (e.g. $5/month)",
                    "I’d pay if it clearly saves me time",
                    "I’d pay if my company covers it",
                    "Not sure yet",
                  ]}
                />
              </>
            )}

            {/* Email – step 22 */}
            {step === EMAIL_STEP && (
              <>
                <p className="text-base md:text-lg font-medium">
                  Final step – where should we send your AI PDF?
                </p>
                <p className="text-xs text-slate-400 mb-2">
                  Leave your email to receive early access to AI Ready and your
                  free PDF guide: “10 Practical Ways to Use AI at Work Today”.
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
