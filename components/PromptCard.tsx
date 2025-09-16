"use client";

import { useMemo, useState } from "react";
import type { Scenario } from "@/lib/lessons";

function fillTemplate(template: string, values: Record<string, string>) {
  // Replace {key} with the value, keep unknown placeholders as-is
  return template.replace(/\{(\w+)\}/g, (_, key) => (values[key] ?? `{${key}}`));
}

export default function PromptCard({ scenario }: { scenario: Scenario }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const prompt = useMemo(() => fillTemplate(scenario.promptTemplate, values), [scenario, values]);

  function onChange(name: string, v: string) {
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    alert("Prompt copied!");
  }

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold">{scenario.title}</div>
          <div className="mt-1 text-sm text-slate-600">{scenario.instructions}</div>
        </div>
        <button
          onClick={copyPrompt}
          className="shrink-0 rounded-lg border px-3 py-1 text-sm hover:border-slate-400"
        >
          Copy prompt
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        {scenario.inputs.map((inp) => (
          <div key={inp.name} className="grid gap-1">
            <label className="text-xs text-slate-500">{inp.label}</label>
            <textarea
              rows={inp.name === "emailText" || inp.name === "bullets" || inp.name === "inboundEmail" ? 5 : 2}
              value={values[inp.name] ?? ""}
              onChange={(e) => onChange(inp.name, e.target.value)}
              placeholder={inp.placeholder}
              className="rounded-xl border p-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="text-xs text-slate-500 mb-1">Preview</div>
        <pre className="whitespace-pre-wrap rounded-xl border bg-slate-50 p-3 text-xs">
{prompt}
        </pre>
      </div>
    </div>
  );
}
