"use client";

import Image from "next/image";
import Script from "next/script";
import React, { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    paypal?: any;
    amplitude?: any;
  }
}

// Funnel structure:
// Page 1  = intro (no % counter)
// Page 2–11 = 10 questions (Q1 shows 0%)
// Page 12 = final personalized paywall page (shows 100%)

const TOTAL_QUESTIONS = 10;
const INTRO_STEP = 1;
const FIRST_QUESTION_STEP = 2;
const LAST_QUESTION_STEP = FIRST_QUESTION_STEP + TOTAL_QUESTIONS - 1; // 11
const FINAL_STEP = LAST_QUESTION_STEP + 1; // 12
const TOTAL_STEPS = FINAL_STEP;

// Selection rules
const Q3_MAX = 3; // pain points: up to 3
const Q4_MAX = 3; // use cases: up to 3
const Q7_MAX = 3; // tracks: up to 3

type Answers = {
  q1_ai_use: string;
  q2_confidence: string;
  q3_pains: string[];
  q4_usecases: string[];
  q5_fastest_help: string;
  q6_learn_style: string;
  q7_tracks: string[];
  q8_length: string;
  q9_age: string;
  q10_momentum: string;
};

const PLAN_CONFIG = {
  weekly: {
    id: "P-46F50474H86986539NGZGYTA",
    name: "Weekly",
    price: "$4.99",
    subtext: "per week",
    description: "Flexible short-term access",
  },
  monthly: {
    id: "P-4PP08824MF3464943NGZHXAQ",
    name: "Monthly",
    price: "$14.99",
    subtext: "per month",
    description: "Best balance of value and flexibility",
  },
  yearly: {
    id: "P-9Y290076KH717454VNGZHZHQ",
    name: "Yearly",
    price: "$99.99",
    subtext: "per year",
    description: "Best long-term savings",
  },
} as const;

type PlanKey = keyof typeof PLAN_CONFIG;

export default function FormPage() {
  const [step, setStep] = useState<number>(INTRO_STEP);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("monthly");

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
    q10_momentum: "",
  });

  useEffect(() => {
    if (step !== FINAL_STEP) return;
    if (typeof window === "undefined") return;
    if (!window.paypal) return;

    const container = document.getElementById("paypal-selected-plan-button");
    if (!container) return;

    container.innerHTML = "";

    const activePlan = PLAN_CONFIG[selectedPlan];

    window.paypal
      .Buttons({
        style: {
          shape: "rect",
          color: "gold",
          layout: "vertical",
          label: "subscribe",
        },
        createSubscription: function (data: any, actions: any) {
          return actions.subscription.create({
            plan_id: activePlan.id,
          });
        },
        onClick: function () {
          if (window.amplitude) {
            window.amplitude.track("Subscription Button Clicked", {
              plan: activePlan.name,
              price: activePlan.price,
              billing_period: activePlan.subtext,
              product: "AI Ready",
            });
          }
        },
        onApprove: function (data: any) {
          if (window.amplitude) {
            window.amplitude.track("Subscription Started", {
              subscription_id: data.subscriptionID,
              plan: activePlan.name,
              price: activePlan.price,
              billing_period: activePlan.subtext,
              product: "AI Ready",
            });
          }

          window.location.href = "/payment-success";
        },
        onError: function (err: any) {
          console.error("PayPal button error:", err);
        },
      })
      .render("#paypal-selected-plan-button");
  }, [step, selectedPlan]);

  // Question number for steps 2–11 (1–10), else 0
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
      if (answers.q7_tracks.length === 0) return setErr("Please select at least 1 option.");
      if (answers.q7_tracks.length > Q7_MAX) return setErr(`Please select up to ${Q7_MAX} options.`);
    }

    if (s === 9 && !answers.q8_length) return setErr("Please select an option.");
    if (s === 10 && !answers.q9_age) return setErr("Please select an option.");
    if (s === 11 && !answers.q10_momentum) return setErr("Please select an option.");

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

  function mapMomentumToOutcome(m: string): string | null {
    if (!m) return null;
    if (m.toLowerCase().includes("save")) return "Save hours every week";
    if (m.toLowerCase().includes("advantage")) return "Gain a real advantage at work";
    if (m.toLowerCase().includes("confident")) return "Feel confident using AI";
    if (m.toLowerCase().includes("second-guess")) return "Stop second-guessing AI outputs";
    return null;
  }

  function buildHelpLines() {
    const lines: string[] = [];

    if (answers.q5_fastest_help) {
      lines.push(`Start with: ${answers.q5_fastest_help}`);
    }

    const uc1 = answers.q4_usecases[0];
    const uc2 = answers.q4_usecases[1];
    if (uc1) lines.push(`Get faster results for: ${uc1}`);
    if (uc2) lines.push(`Improve your workflow for: ${uc2}`);

    const tracks = answers.q7_tracks.slice(0, 3);
    if (tracks.length > 0) {
      lines.push(`Build a real skill in: ${tracks.join(", ")}`);
    }

    lines.push("Learn C.O.R.E. prompting method for best results");

    if (answers.q8_length) {
      lines.push(`In ${answers.q8_length} lessons that fit your schedule`);
    }

    const outcome = mapMomentumToOutcome(answers.q10_momentum);
    if (outcome) lines.push(`So you can ${outcome.toLowerCase()}`);

    if (lines.length < 6 && answers.q2_confidence) {
      if (answers.q2_confidence === "Not confident yet") {
        lines.push("Get predictable results without guessing");
      } else if (answers.q2_confidence === "Somewhat confident") {
        lines.push("Make your AI outputs more consistent at work");
      } else {
        lines.push("Level up your AI outcomes with structure");
      }
    }

    return lines.slice(0, 7);
  }

  const q7Helper = useMemo(() => {
    const n = answers.q7_tracks.length;
    if (n === 0) return `Choose up to ${Q7_MAX}.`;
    if (n === Q7_MAX) return `Great — ${Q7_MAX} selected.`;
    return `${n} selected — choose up to ${Q7_MAX}.`;
  }, [answers.q7_tracks.length]);

  const helpLines = useMemo(() => buildHelpLines(), [
    answers.q2_confidence,
    answers.q4_usecases,
    answers.q5_fastest_help,
    answers.q7_tracks,
    answers.q8_length,
    answers.q10_momentum,
  ]);

  const Q1_OPTIONS = ["Yes, regularly", "Sometimes", "Tried it a bit", "Not yet"];
  const Q2_OPTIONS = ["Very confident", "Somewhat confident", "Not confident yet"];

  const Q3_OPTIONS = [
    "I waste time rewriting emails/messages",
    "I struggle to start (blank page / unclear plan)",
    "I need faster research & summaries",
    "My docs/presentations take too long",
    "I don’t know what to ask AI",
    "I worry about accuracy & mistakes",
  ];

  const Q4_OPTIONS = [
    "Emails & messages",
    "Summaries of docs/meetings",
    "Ideas & brainstorming",
    "Presentations & slides",
    "Spreadsheets & analysis",
    "Planning & prioritisation",
  ];

  const Q5_OPTIONS = [
    "Writing clearer emails/messages",
    "Turning messy notes into clean summaries",
    "Creating presentations faster",
    "Getting quick research & explanations",
  ];

  const Q6_OPTIONS = [
    "Short practical examples",
    "Step-by-step walkthroughs",
    "Templates I can copy/paste",
    "Quick quizzes & practice",
  ];

  const Q7_OPTIONS = [
    "Core Prompting",
    "Email & Writing",
    "Meetings & Summaries",
    "Research & Learning",
    "Presentations",
    "Spreadsheets",
    "Decision-making",
    "Automation",
    "Brainstorming & Strategy",
  ];

  const Q8_OPTIONS = ["3–5 minutes", "6–10 minutes", "11–15 minutes"];
  const Q9_OPTIONS = ["18–24", "25–34", "35–44", "45–54", "55+"];

  const Q10_OPTIONS = [
    "I’d save hours every week",
    "I’d feel more confident using AI",
    "I’d stop second-guessing AI outputs",
    "I’d get a real advantage at work",
  ];

  return (
    <>
      <Script
        src="https://www.paypal.com/sdk/js?client-id=ATqGGys2uR24mSdrzyID3h7nJ6OBShj089SAA3xS3mURsskH0Nf886kzh9k7nACnIx3a7gJQcfcuNPrm&vault=true&intent=subscription"
        strategy="afterInteractive"
      />

      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-slate-100">
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
                    Before: AI breaks things. After: AI Ready makes AI useful.
                  </p>
                  <p className="text-sm text-slate-300 mt-2">
                    Answer 10 quick questions so we can tailor AI Ready to how you work — emails,
                    spreadsheets, presentations, summaries, and more.
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    Do you already use AI for work?
                  </p>
                  <RadioGroup
                    value={answers.q1_ai_use}
                    onChange={(v) => updateSingle("q1_ai_use", v)}
                    options={Q1_OPTIONS}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    How confident do you feel using AI effectively?
                  </p>
                  <RadioGroup
                    value={answers.q2_confidence}
                    onChange={(v) => updateSingle("q2_confidence", v)}
                    options={Q2_OPTIONS}
                  />
                </>
              )}

              {step === 4 && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    What are your biggest work pain points right now?
                  </p>
                  <p className="text-xs text-slate-300">Choose your top priorities (up to {Q3_MAX}).</p>
                  <MultiSelectGroup
                    value={answers.q3_pains}
                    onChange={(v) => updateSingle("q3_pains", v)}
                    options={Q3_OPTIONS}
                    maxSelected={Q3_MAX}
                  />
                </>
              )}

              {step === 5 && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    Which AI use cases would help you most?
                  </p>
                  <p className="text-xs text-slate-300">Choose your top priorities (up to {Q4_MAX}).</p>
                  <MultiSelectGroup
                    value={answers.q4_usecases}
                    onChange={(v) => updateSingle("q4_usecases", v)}
                    options={Q4_OPTIONS}
                    maxSelected={Q4_MAX}
                  />
                </>
              )}

              {step === 6 && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    If AI Ready helped you with ONE thing first, what should it be?
                  </p>
                  <RadioGroup
                    value={answers.q5_fastest_help}
                    onChange={(v) => updateSingle("q5_fastest_help", v)}
                    options={Q5_OPTIONS}
                  />
                </>
              )}

              {step === 7 && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    How do you prefer to learn?
                  </p>
                  <RadioGroup
                    value={answers.q6_learn_style}
                    onChange={(v) => updateSingle("q6_learn_style", v)}
                    options={Q6_OPTIONS}
                  />
                </>
              )}

              {step === 8 && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    Pick up to {Q7_MAX} tracks you’d want inside AI Ready
                  </p>
                  <p className="text-xs text-slate-300">{q7Helper}</p>
                  <MultiSelectGroup
                    value={answers.q7_tracks}
                    onChange={(v) => updateSingle("q7_tracks", v)}
                    options={Q7_OPTIONS}
                    maxSelected={Q7_MAX}
                  />
                </>
              )}

              {step === 9 && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    What lesson length fits your schedule best?
                  </p>
                  <RadioGroup
                    value={answers.q8_length}
                    onChange={(v) => updateSingle("q8_length", v)}
                    options={Q8_OPTIONS}
                  />
                </>
              )}

              {step === 10 && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    What’s your age range?
                  </p>
                  <RadioGroup
                    value={answers.q9_age}
                    onChange={(v) => updateSingle("q9_age", v)}
                    options={Q9_OPTIONS}
                  />
                </>
              )}

              {step === 11 && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    If AI worked properly for you, what would change most?
                  </p>
                  <RadioGroup
                    value={answers.q10_momentum}
                    onChange={(v) => updateSingle("q10_momentum", v)}
                    options={Q10_OPTIONS}
                  />
                </>
              )}

              {step === FINAL_STEP && (
                <>
                  <p className="text-base md:text-lg font-medium text-white">
                    Your AI Career Upgrade Plan Is Ready
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

                  <p className="text-sm text-slate-300 mt-4">
                    Choose the plan that fits you best and start improving how you use AI today.
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <PlanCard
                      title="Weekly"
                      price="$4.99"
                      subtext="per week"
                      description="Flexible short-term access"
                      selected={selectedPlan === "weekly"}
                      onClick={() => setSelectedPlan("weekly")}
                    />

                    <PlanCard
                      title="Monthly"
                      price="$14.99"
                      subtext="per month"
                      description="Best balance of value and flexibility"
                      badge="Most Popular"
                      selected={selectedPlan === "monthly"}
                      onClick={() => setSelectedPlan("monthly")}
                    />

                    <PlanCard
                      title="Yearly"
                      price="$99.99"
                      subtext="per year"
                      description="Best long-term savings"
                      savingsText="Save vs monthly pricing"
                      selected={selectedPlan === "yearly"}
                      onClick={() => setSelectedPlan("yearly")}
                    />
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div>
                        <p className="text-sm text-slate-400">Selected plan</p>
                        <p className="text-lg font-semibold text-white">
                          {PLAN_CONFIG[selectedPlan].name} — {PLAN_CONFIG[selectedPlan].price}{" "}
                          <span className="text-sm font-normal text-slate-400">
                            {PLAN_CONFIG[selectedPlan].subtext}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div id="paypal-selected-plan-button" />

                    <p className="text-[11px] text-slate-400 mt-3 text-center">
                      Secure checkout powered by PayPal. Cancel anytime in PayPal automatic payments.
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
                  Next →
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function PlanCard(props: {
  title: string;
  price: string;
  subtext: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  badge?: string;
  savingsText?: string;
}) {
  const { title, price, subtext, description, selected, onClick, badge, savingsText } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
          : "border-slate-800 bg-slate-950 hover:border-slate-600"
      }`}
    >
      {badge && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          {badge}
        </span>
      )}

      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-2xl font-bold text-white">{price}</p>
      <p className="text-xs text-slate-400">{subtext}</p>
      <p className="mt-3 text-xs text-slate-300">{description}</p>

      {savingsText && <p className="mt-2 text-xs text-emerald-400">{savingsText}</p>}
    </button>
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
