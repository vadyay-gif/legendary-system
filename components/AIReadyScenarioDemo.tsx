/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useMemo, useState } from "react";

type Option = { id: string; label: string };

export default function AIReadyScenarioDemo() {
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

  const adjustOptions: Option[] = [
    { id: "shorter", label: "Shorter" },
    { id: "formal", label: "More formal" },
    { id: "nextsteps", label: "Add next-steps list" },
    { id: "softer", label: "Softer tone" },
  ];

  const [tone, setTone] = useState("warm");
  const [objective, setObjective] = useState("resolve");
  const [adjust, setAdjust] = useState<string | null>(null);

  const aiResponse = useMemo(() => {
    const base =
      "Thank you for reaching out. I’m sorry your order arrived late and two items were missing. I understand how frustrating this is.";
    const resolution =
      "I’ve processed a replacement for the missing items and confirmed it’ll ship today. Please keep this email for your tracking reference.";
    const closing = "Thank you for your patience — we appreciate your understanding.";

    const style =
      adjust === "shorter"
        ? "Thank you for letting us know. I’ve arranged replacements right away."
        : adjust === "formal"
        ? "We sincerely apologize for the inconvenience. Your replacement has been processed."
        : adjust === "nextsteps"
        ? "Next steps: (1) Replacement order confirmed, (2) Shipping update in 24h."
        : adjust === "softer"
        ? "I completely understand how disappointing this must be — I’ve arranged replacements right away."
        : null;

    return style ? style : `${base} ${resolution} ${closing}`;
  }, [tone, objective, adjust]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {/* NEW HEADER */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Inside an AI Ready Lesson
        </h2>
        <p className="mt-2 text-slate-600 text-base md:text-lg">
          Every scenario is a short, practical exercise powered by AI.
        </p>
      </div>

      {/* BODY */}
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-1">Track: Everyday Communication</h3>
          <h4 className="text-slate-700 mb-3">Scenario Demo: Reply to a Customer Complaint</h4>

          <p className="text-sm text-slate-600 mb-4">
            Craft a thoughtful, effective response that acknowledges the issue and outlines
            the fix.
          </p>
        </section>

        {/* Form Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Choose reply tone
            </label>
            <div className="flex flex-wrap gap-2">
              {toneOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTone(opt.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                    tone === opt.id
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Objective</label>
            <div className="flex flex-wrap gap-2">
              {objectiveOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setObjective(opt.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                    objective === opt.id
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Complaint input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Paste the customer's complaint
          </label>
          <textarea
            className="w-full border border-slate-300 rounded-xl p-3 text-sm"
            rows={3}
            defaultValue="I received my order late and two items were missing. No one replied to my previous email. This is very frustrating."
          />
        </div>

        {/* Adjust the Result */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Adjust the Result (single select)
          </label>
          <div className="flex flex-wrap gap-2">
            {adjustOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setAdjust(adjust === opt.id ? null : opt.id)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                  adjust === opt.id
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Response */}
        <div className="border border-slate-200 rounded-xl bg-slate-50 p-4">
          <h3 className="font-semibold mb-2 text-slate-900">AI's Response</h3>
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
            {aiResponse}
          </p>
        </div>

        {/* Footer */}
        <div className="text-sm text-slate-500 border-t pt-3">
          <b>Pro Tip —</b> Adjust tone, length, and empathy for every audience.
        </div>
      </div>
    </div>
  );
}
