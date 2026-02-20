"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

// ----------------------------
// Analytics (Amplitude via window.amplitude)
// Tracks:
// - quiz_started (once)
// - step_viewed (once per step)
// - quiz_completed (once when final page is reached)
// - google_play_cta_clicked (on CTA click)
// Uses Propeller params: ?zoneid=...&clickid=...
// Adds stable session_id in localStorage
// ----------------------------

function getPropellerParams() {
  if (typeof window === "undefined") {
    return { zoneid: null as string | null, clickid: null as string | null };
  }

  const params = new URLSearchParams(window.location.search);
  const zoneidFromUrl = params.get("zoneid");
  const clickidFromUrl = params.get("clickid");

  // Persist
  if (zoneidFromUrl) localStorage.setItem("propeller_zoneid", zoneidFromUrl);
  if (clickidFromUrl) localStorage.setItem("propeller_clickid", clickidFromUrl);

  return {
    zoneid: zoneidFromUrl ?? localStorage.getItem("propeller_zoneid"),
    clickid: clickidFromUrl ?? localStorage.getItem("propeller_clickid"),
  };
}

function getSessionId() {
  if (typeof window === "undefined") return null as string | null;
  const key = "ai_ready_session_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const sid =
    (typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `sid_${Math.random().toString(16).slice(2)}_${Date.now()}`) as string;

  localStorage.setItem(key, sid);
  return sid;
}

function trackEvent(name: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).amplitude?.track?.(name, props);
}

// Funnel structure:
// Page 1  = intro (no % counter)
// Page 2–11 = 10 questions (Q1 shows 0%)
// Page 12 = final personalized install page (shows 100%)
// No thank-you page. No email.

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

export default function FormPage() {
  const [step, setStep] = useState<number>(INTRO_STEP);
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
    q10_momentum: "",
  });

  // --- Analytics: quiz_started once (when user enters Q1 the first time) ---
  const quizStartedRef = useRef(false);

  useEffect(() => {
    if (quizStartedRef.current) return;
    if (step !== FIRST_QUESTION_STEP) return;

    quizStartedRef.current = true;
    const { zoneid, clickid } = getPropellerParams();
    const session_id = getSessionId();

    trackEvent("quiz_started", { zoneid, clickid, session_id });
  }, [step]);

  // --- Analytics: step_viewed once per step ---
  const stepViewedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (stepViewedRef.current.has(step)) return;
    stepViewedRef.current.add(step);

    const { zoneid, clickid } = getPropellerParams();
    const session_id = getSessionId();

    trackEvent("step_viewed", { step, zoneid, clickid, session_id });
  }, [step]);

  // --- Analytics: quiz_completed once when reaching final step ---
  const quizCompletedRef = useRef(false);

  useEffect(() => {
    if (quizCompletedRef.current) return;
    if (step !== FINAL_STEP) return;

    quizCompletedRef.current = true;
    const { zoneid, clickid } = getPropellerParams();
    const session_id = getSessionId();

    trackEvent("quiz_completed", { zoneid, clickid, session_id });
  }, [step]);

  // Question number for steps 2–11 (1–10), else 0
  const questionNumber =
    step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP ? step - 1 : 0;

  const showProgress = step !== INTRO_STEP;
  const progress =
    step === FINAL_STEP
      ? 100
      : step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP
      ? Math.round(((questionNumber - 1) / TOTAL_QUESTIONS) * 100) // Q1 => 0%
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

    // Step mapping:
    // 2: Q1, 3: Q2, 4: Q3, 5: Q4, 6: Q5, 7: Q6, 8: Q7, 9: Q8, 10: Q9, 11: Q10, 12: Final
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
    // Keep it concise + career/time oriented
    if (!m) return null;
    if (m.toLowerCase().includes("save")) return "Save hours every week";
    if (m.toLowerCase().includes("advantage")) return "Gain a real advantage at work";
    if (m.toLowerCase().includes("confident")) return "Feel confident using AI";
    if (m.toLowerCase().includes("second-guess")) return "Stop second-guessing AI outputs";
    return null;
  }

  function buildHelpLines() {
    // Approved structure:
    // ✅ Start with: [Q5]
    // ✅ Get faster results for: [Q4 #1]
    // ✅ Improve your workflow for: [Q4 #2]
    // ✅ Build a real skill in: [Q7 tracks]
    // ✅ Learn C.O.R.E. prompting method for best results
    // ✅ In [Q8] lessons that fit your schedule
    // ✅ So you can [Q10 outcome] (optional)

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

    // Aim for 6–7 items. If we’re short (e.g. only one usecase),
    // add a confidence-oriented filler derived from Q2 (still accurate).
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

  // --- Options ---
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

  // New momentum / identity question (Q10)
  const Q10_OPTIONS = [
    "I’d save hours every week",
    "I’d feel more confident using AI",
    "I’d stop second-guessing AI outputs",
    "I’d get a real advantage at work",
  ];

  function handleGooglePlayClick() {
    const { zoneid, clickid } = getPropellerParams();
    const session_id = getSessionId();

    trackEvent("google_play_cta_clicked", {
      zoneid,
      clickid,
      session_id,
      top_pains: answers.q3_pains.slice(0, 3),
      top_usecases: answers.q4_usecases.slice(0, 3),
      tracks: answers.q7_tracks.slice(0, 3),
      momentum: answers.q10_momentum,
      age: answers.q9_age,
      confidence: answers.q2_confidence,
      lesson_length: answers.q8_length,
    });

    // Same-window redirect through tracked bridge page
    const url = new URL("/go/google-play", window.location.origin);
    if (zoneid) url.searchParams.set("zoneid", zoneid);
    if (clickid) url.searchParams.set("clickid", clickid);
    url.searchParams.set("src", "funnel");
    if (session_id) url.searchParams.set("sid", session_id);

    window.location.href = url.toString();
  }

  const helpLines = useMemo(() => buildHelpLines(), [
    answers.q2_confidence,
    answers.q4_usecases,
    answers.q5_fastest_help,
    answers.q7_tracks,
    answers.q8_length,
    answers.q10_momentum,
  ]);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
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
              </>
            )}

            {/* Page 2 – Q1 */}
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

            {/* Page 3 – Q2 */}
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

            {/* Page 4 – Q3 (multi max 3) */}
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

            {/* Page 5 – Q4 (multi max 3) */}
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

            {/* Page 6 – Q5 */}
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

            {/* Page 7 – Q6 */}
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

            {/* Page 8 – Q7 (multi up to 3) */}
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

            {/* Page 9 – Q8 */}
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

            {/* Page 10 – Q9 */}
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

            {/* Page 11 – Q10 (Momentum) */}
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

            {/* Page 12 – Final personalized install page */}
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

                <p className="text-sm text-slate-300 mt-3">
                  Professionals who know how to use AI properly have a serious advantage.
                </p>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleGooglePlayClick}
                    className="w-full px-4 py-3 rounded-2xl bg-indigo-500 text-sm md:text-base font-medium text-white hover:bg-indigo-600 transition"
                  >
                    Get AI Ready on Google Play →
                  </button>

                  <p className="text-[11px] text-slate-400 mt-2 text-center">
                    Free for early adopters
                  </p>
                </div>
              </>
            )}
          </div>

          {error && <p className="text-xs text-rose-400 mb-3 font-medium">{error}</p>}

          {/* Buttons */}
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
            ) : step === LAST_QUESTION_STEP ? (
              <button
                type="button"
                onClick={() => {
                  if (!validateStep(step)) return;
                  setStep(FINAL_STEP);
                }}
                className="ml-auto px-4 py-2 rounded-full bg-indigo-500 text-xs md:text-sm font-medium text-white hover:bg-indigo-600 transition"
              >
                Next →
              </button>
            ) : null}
          </div>
        </div>
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
