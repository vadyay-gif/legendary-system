"use client";

import { useMemo, useState } from "react";
import amplitude from "@/amplitude";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FunnelPage() {
  const quiz = [
    {
      id: 1,
      question: "What best describes your role?",
      answers: ["Manager/Team Lead", "Individual Contributor", "Founder", "Freelancer/Consultant"],
      key: "role",
    },
    {
      id: 2,
      question: "Primary goal with AI at work?",
      answers: ["Save time", "Improve writing", "Better research", "Make better decisions"],
      key: "goal",
    },
    {
      id: 3,
      question: "Which track is most interesting right now?",
      answers: [
        "Everyday Communication",
        "Reports & Summaries",
        "Presentations",
        "Research & Brainstorming",
        "Personal Productivity",
        "Meetings & Notes",
        "Research & Analysis",
        "Marketing & Social",
        "Spreadsheets & Data",
      ],
      key: "track",
    },
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const progress = useMemo(
    () => Math.round((step / quiz.length) * 100),
    [step, quiz.length]
  );

  // --------- Ultra credit-saving tracking helpers ----------
  function getPropellerAttribution() {
    // Propeller passes: ?zoneid=...&clickid=...
    const params = new URLSearchParams(window.location.search);

    const zoneid = params.get("zoneid") || localStorage.getItem("propeller_zoneid") || "";
    const clickid = params.get("clickid") || localStorage.getItem("propeller_clickid") || "";

    // Save once so it stays for later (email click redirect page, etc.)
    if (params.get("zoneid")) localStorage.setItem("propeller_zoneid", params.get("zoneid")!);
    if (params.get("clickid")) localStorage.setItem("propeller_clickid", params.get("clickid")!);

    return { zoneid, clickid };
  }

  function track(eventName: string, props: Record<string, unknown> = {}) {
    amplitude.track(eventName, props);
  }
  // --------------------------------------------------------

  function chooseAnswer(a: string) {
    const q = quiz[step];
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.key]: a }));
    if (step < quiz.length - 1) setStep((s) => s + 1);
    else setStep(quiz.length);
  }

  // OPTIONAL: If you want to track "reached final results page" (very low volume)
  // You said you only want:
  // - email page viewed
  // - email submitted
  // - email app link clicked
  // So we are NOT tracking any step views here.

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current="funnel" />
      <main className="mx-auto max-w-3xl px-4 py-16">
        {step < quiz.length ? (
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 text-sm text-slate-500">
              Step {step + 1} of {quiz.length}
            </div>
            <h2 className="text-2xl font-semibold">{quiz[step].question}</h2>
            <div className="mt-6 grid gap-3">
              {quiz[step].answers.map((a, i) => (
                <button
                  key={i}
                  onClick={() => chooseAnswer(a)}
                  className="w-full text-left px-4 py-3 rounded-xl border hover:border-slate-400"
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="mt-6 text-sm text-slate-500">{progress}% complete</div>
          </div>
        ) : (
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Your AI Ready Plan</h2>
            <p className="mt-2 text-slate-600">
              Based on your answers, here’s the best place to start.
            </p>
            <div className="mt-6 rounded-xl border p-4">
              <p className="text-slate-700">
                Start with: {answers.track || "Everyday Communication"}
              </p>
            </div>

            <div className="mt-6 grid gap-2">
              {/* These should be the real store URLs. Keep as # for now if you want. */}
              <a
                className="px-4 py-2 rounded-xl border text-center"
                href="#"
                onClick={() => {
                  const { zoneid, clickid } = getPropellerAttribution();
                  // Minimal click tracking (still low volume because only quiz finishers click)
                  track("store_click", {
                    store: "ios",
                    zoneid: zoneid || null,
                    clickid: clickid || null,
                  });
                }}
              >
                App Store (iOS)
              </a>

              <a
                className="px-4 py-2 rounded-xl border text-center"
                href="#"
                onClick={() => {
                  const { zoneid, clickid } = getPropellerAttribution();
                  track("store_click", {
                    store: "android",
                    zoneid: zoneid || null,
                    clickid: clickid || null,
                  });
                }}
              >
                Google Play (Android)
              </a>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
