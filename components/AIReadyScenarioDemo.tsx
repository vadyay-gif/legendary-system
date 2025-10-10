import React, { useMemo, useState } from "react";

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

const SAMPLE_COMPLAINT = `I received my order late and two items were missing.
No one replied to my previous email. This is very frustrating.`;

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

export default function AIReadyScenarioDemo() {
  const [order, setOrder] = useState("");
  const [complaint, setComplaint] = useState(SAMPLE_COMPLAINT);
  const [tone, setTone] = useState<Option>(toneOptions[0]);
  const [objective, setObjective] = useState<Option>(objectiveOptions[0]);
  const [adjust, setAdjust] = useState<Option>(adjustments[0]);
  const [out, setOut] = useState<string | null>(null);

  const output = useMemo(() => out, [out]);

  return (
    <section className="wrap" aria-label="AI Ready scenario demo">
      <div className="head">
        <span className="tag">Track: Everyday Communication</span>
        <span className="tag">Scenario Demo</span>
      </div>

      <h3 className="title">Reply to a Customer Complaint</h3>
      <p className="sub">
        Craft a thoughtful, effective response that acknowledges the issue and
        outlines the fix.
      </p>

      <div className="card">
        <div className="grid">
          <div className="field">
            <label>Order / Ticket # (optional)</label>
            <input
              type="text"
              placeholder="e.g. #A12489"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Choose reply tone</label>
            <div className="options" role="radiogroup" aria-label="Tone">
              {toneOptions.map((o) => (
                <button
                  key={o.id}
                  className={`opt ${tone.id === o.id ? "on" : ""}`}
                  role="radio"
                  aria-checked={tone.id === o.id}
                  onClick={() => setTone(o)}
                  type="button"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="field">
          <label>Paste the customer's complaint:</label>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder={SAMPLE_COMPLAINT.replace(/\n/g, " ")}
          />
        </div>

        <div className="grid">
          <div className="field">
            <label>Objective</label>
            <div className="options" role="radiogroup" aria-label="Objective">
              {objectiveOptions.map((o) => (
                <button
                  key={o.id}
                  className={`opt ${objective.id === o.id ? "on" : ""}`}
                  role="radio"
                  aria-checked={objective.id === o.id}
                  onClick={() => setObjective(o)}
                  type="button"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Adjust the Result (single select)</label>
            <div className="chips" aria-label="Adjust">
              {adjustments.map((a) => (
                <button
                  key={a.id}
                  className={`chip ${adjust.id === a.id ? "on" : ""}`}
                  aria-pressed={adjust.id === a.id}
                  onClick={() => setAdjust(a)}
                  type="button"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="cta">
          <button
            className="btn primary"
            onClick={() =>
              setOut(makeReply(complaint, tone.id, objective.id, adjust.id, order))
            }
            type="button"
          >
            Generate Reply
          </button>
          <button
            className="btn"
            onClick={() => {
              setOrder("");
              setComplaint(SAMPLE_COMPLAINT);
              setTone(toneOptions[0]);
              setObjective(objectiveOptions[0]);
              setAdjust(adjustments[0]);
              setOut(null);
            }}
            type="button"
          >
            Reset
          </button>
          <span className="hint">No sign-in. Instant demo.</span>
        </div>
      </div>

      {output && (
        <div className="answer">
          <div className="card answerCard">
            <h4>Sample AI Reply</h4>
            <pre>{output}</pre>
          </div>
        </div>
      )}

      <style jsx>{`
        .wrap {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          padding: 22px;
          background: linear-gradient(140deg, #f8fafc, #eef4fb);
          border: 1px solid #e6ecf3;
          border-radius: 20px;
          box-shadow: 0 6px 24px rgba(16, 24, 40, 0.06);
        }
        .head {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 8px;
        }
        .tag {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid #d7e0ea;
          background: #fff;
          color: #0f2b46;
        }
        .title {
          margin: 6px 0 4px;
          font-weight: 800;
          font-size: 22px;
          color: #0f2b46;
        }
        .sub {
          color: #476582;
          font-size: 14px;
          margin: 0 0 14px;
        }
        .card {
          background: #fff;
          border: 1px solid #e6ecf3;
          border-radius: 16px;
          padding: 16px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 800px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        .field {
          margin-top: 14px;
        }
        label {
          display: block;
          font-size: 13px;
          color: #223344;
          margin-bottom: 6px;
        }
        input,
        textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #d7e0ea;
          border-radius: 12px;
          background: #fbfdff;
          color: #0f2b46;
          font-family: inherit;
          font-size: 14px;
        }
        textarea {
          min-height: 120px;
          resize: vertical;
        }
        .options,
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .opt,
        .chip {
          border: 1px solid #d7e0ea;
          background: #fff;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 13px;
          cursor: pointer;
          transition: 0.15s transform, 0.15s box-shadow, 0.15s background, 0.15s color;
        }
        .opt.on {
          background: #0f62fe;
          color: #fff;
          border-color: #0f62fe;
          box-shadow: 0 4px 12px rgba(15, 98, 254, 0.25);
        }
        .chip.on {
          background: #e7f0ff;
          border-color: #a8c6ff;
        }
        .cta {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: 14px;
        }
        .btn {
          appearance: none;
          border: none;
          padding: 12px 16px;
          border-radius: 12px;
          background: #334155;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          transition: 0.15s transform, 0.15s box-shadow, 0.15s opacity;
        }
        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(17, 24, 39, 0.18);
        }
        .btn.primary {
          background: #111827;
        }
        .hint {
          font-size: 12px;
          color: #5b7a99;
        }
        .answer {
          margin-top: 14px;
        }
        .answerCard {
          border-left: 4px solid #0f62fe;
        }
        h4 {
          margin: 0 0 6px;
          color: #0f2b46;
          font-size: 16px;
        }
        pre {
          margin: 0;
          white-space: pre-wrap;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          background: #f8fbff;
          border: 1px solid #e6ecf3;
          border-radius: 12px;
          padding: 12px;
          font-size: 13px;
          color: #0f2b46;
        }
      `}</style>
    </section>
  );
}

