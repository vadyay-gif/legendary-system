/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo } from "react";

type Option = { id: string; label: string };

const toneOptions: Option[] = [
  { id: "warm", label: "Warm & empathetic" },
  { id: "formal", label: "Formal & concise" },
  { id: "friendly", label: "Friendly & upbeat" },
];

const objectiveOptions: Option[] = [
  { id: "resolve", label: "Apologize & resolve now" },
  { id: "refund", label: "Offer refund/discount" },
  { id: "info", label: "Request missing info politely" },
];

const adjustments: Option[] = [
  { id: "short", label: "Shorter" },
  { id: "formal", label: "More formal" },
  { id: "steps", label: "Add next-steps list" },
  { id: "softer", label: "Softer tone" },
];

const SAMPLE_COMPLAINT =
  `I received my order late and two items were missing.\n` +
  `No one replied to my previous email. This is very frustrating.`;

const greetings: Record<string, string> = {
  warm: "Hi",
  formal: "Dear",
  friendly: "Hello",
};
const closings: Record<string, string> = {
  warm: "Warm regards",
  formal: "Sincerely",
  friendly: "Best",
};
const subjByObjective: Record<string, string> = {
  resolve: "We’re fixing this right away",
  refund: "We can make this right — compensation options",
  info: "A quick clarification to help resolve your issue",
};

function makeReply(
  complaint: string,
  tone: string,
  objective: string,
  adjust: string,
  order?: string
) {
  const greet = greetings[tone] || "Hi";
  const close = closings[tone] || "Best";
  const subj = subjByObjective[objective] || "Regarding your recent experience";
  const orderLine = order ? ` (Ref: ${order})` : "";

  let core =
    `Thanks for reaching out${orderLine}. I’m really sorry about your experience — I can see how frustrating that would be.\n\n` +
    `I’ve reviewed your message: "${complaint.trim()}".`;

  if (objective === "resolve") {
    core +=
      `\n\nHere’s what I’m doing now:\n` +
      `• Checking the shipment and inventory records\n` +
      `• Replacing the missing items and prioritizing shipping\n` +
      `• Monitoring your case until delivery is confirmed`;
  } else if (objective === "refund") {
    core +=
      `\n\nTo make this right, I can offer either:\n` +
      `• A full refund for the missing items, or\n` +
      `• A resend with an additional discount on your next order\n\n` +
      `Let me know which you prefer — I’ll process it immediately.`;
  } else {
    core +=
      `\n\nI can resolve this quickly — could you please confirm:\n` +
      `• The best delivery address\n` +
      `• Photos of the package (if available)\n` +
      `• Whether you’d like a replacement or refund\n\n` +
      `As soon as I have this, I’ll finalize the fix.`;
  }

  if (adjust === "short") {
    core = core.replace(/\n+/g, "\n").split("\n").slice(0, 6).join("\n");
  } else if (adjust === "formal") {
    core = core
      .replace("I’m really sorry", "We apologize")
      .replace("I can offer either", "We can offer either")
      .replaceAll("I’ll", "We will")
      .replaceAll("I’m", "We are");
  } else if (adjust === "steps") {
    core +=
      `\n\nNext steps:\n` +
      `1) I confirm the action in our system\n` +
      `2) You receive a confirmation email\n` +
      `3) Delivery/refund is completed\n` +
      `4) I follow up to ensure you’re satisfied`;
  } else if (adjust === "softer") {
    core = core
      .replace("frustrating", "disappointing")
      .replace("fix this quickly", "get this sorted for you");
  }

  return `Subject: ${subj}\n\n${greet} there,\n\n${core}\n\n${close},\nCustomer Support`;
}

/** Tailwind UI tokens (kept here so the look stays consistent with the app) */
const cls = {
  tag: "inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm",
  h3: "text-[26px] sm:text-[28px] font-extrabold tracking-tight text-slate-800",
  sub: "mt-1 text-[13px] leading-5 text-slate-600",
  card: "rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm",
  label: "block text-[12px] font-medium text-slate-700",
  input:
    "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-[14px] text-slate-800 outline-none ring-0 focus:border-blue-400 focus:bg-white transition",
  textarea:
    "w-full min-h-[120px] rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-[14px] text-slate-800 outline-none ring-0 focus:border-blue-400 focus:bg-white transition",
  pill:
    "inline-flex items-center rounded-full border px-3 py-2 text-[13px] font-semibold transition select-none",
  pillOn:
    "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-500/30",
  pillOff:
    "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
  chip:
    "inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-medium transition select-none",
  chipOn: "border-blue-300 bg-blue-50 text-blue-800",
  chipOff:
    "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300",
  primaryBtn:
    "inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-[14px] font-bold text-white shadow-sm hover:shadow transition",
  secondaryBtn:
    "inline-flex items-center justify-center rounded-xl bg-slate-700 px-4 py-2.5 text-[14px] font-bold text-white/95 hover:bg-slate-800 transition",
  hint: "text-[12px] text-slate-500",
  answerCard: "rounded-2xl border-l-4 border-blue-600 bg-white p-4 sm:p-5 shadow-sm",
  pre: "mt-1 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-3 text-[13px] text-slate-800",
};

export default function AIReadyScenarioDemo() {
  const [order, setOrder] = useState("");
  const [complaint, setComplaint] = useState(SAMPLE_COMPLAINT);
  const [tone, setTone] = useState<Option>(toneOptions[0]);
  const [objective, setObjective] = useState<Option>(objectiveOptions[0]);
  const [adjust, setAdjust] = useState<Option>(adjustments[0]);
  const [out, setOut] = useState<string | null>(null);

  const output = useMemo(() => out, [out]);

  return (
    <section aria-label="AI Ready scenario demo" className="space-y-3">
      {/* header tags + title */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={cls.tag}>Track: Everyday Communication</span>
        <span className={cls.tag}>Scenario Demo</span>
      </div>

      <h3 className={cls.h3}>Reply to a Customer Complaint</h3>
      <p className={cls.sub}>
        Craft a thoughtful, effective response that acknowledges the issue and
        outlines the fix.
      </p>

      {/* main card */}
      <div className={cls.card}>
        {/* top controls */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={cls.label}>Order / Ticket # (optional)</label>
            <input
              className={cls.input}
              placeholder="e.g. #A12489"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </div>

          <div>
            <label className={cls.label}>Choose reply tone</label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {toneOptions.map((o) => {
                const on = tone.id === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    className={`${cls.pill} ${on ? cls.pillOn : cls.pillOff}`}
                    aria-checked={on}
                    role="radio"
                    onClick={() => setTone(o)}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* complaint box */}
        <div className="mt-3">
          <label className={cls.label}>Paste the customer's complaint:</label>
          <textarea
            className={`${cls.textarea} mt-1.5`}
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder={SAMPLE_COMPLAINT.replace(/\n/g, " ")}
          />
        </div>

        {/* objectives + adjust */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={cls.label}>Objective</label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {objectiveOptions.map((o) => {
                const on = objective.id === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    className={`${cls.pill} ${on ? cls.pillOn : cls.pillOff}`}
                    role="radio"
                    aria-checked={on}
                    onClick={() => setObjective(o)}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className={cls.label}>Adjust the Result (single select)</label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {adjustments.map((a) => {
                const on = adjust.id === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    className={`${cls.chip} ${on ? cls.chipOn : cls.chipOff}`}
                    aria-pressed={on}
                    onClick={() => setAdjust(a)}
                  >
                    {a.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* actions */}
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className={cls.primaryBtn}
            onClick={() =>
              setOut(makeReply(complaint, tone.id, objective.id, adjust.id, order))
            }
          >
            Generate Reply
          </button>
          <button
            type="button"
            className={cls.secondaryBtn}
            onClick={() => {
              setOrder("");
              setComplaint(SAMPLE_COMPLAINT);
              setTone(toneOptions[0]);
              setObjective(objectiveOptions[0]);
              setAdjust(adjustments[0]);
              setOut(null);
            }}
          >
            Reset
          </button>
          <span className={cls.hint}>No sign-in. Instant demo.</span>
        </div>
      </div>

      {/* answer */}
      {output && (
        <div className={cls.answerCard}>
          <div className="text-[14px] font-semibold text-slate-800">
            Sample AI Reply
          </div>
          <pre className={cls.pre}>{output}</pre>
        </div>
      )}
    </section>
  );
}
