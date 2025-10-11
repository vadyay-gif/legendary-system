/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

export default function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <button
        type="button"                             // <-- important
        aria-expanded={open}
        aria-controls={`panel-${q}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left font-semibold text-slate-800 flex items-center justify-between"
      >
        <span>{q}</span>
        <span className={`ml-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">▾</span>
      </button>

      <div
        id={`panel-${q}`}
        className={`mt-2 text-sm text-slate-700 transition-[grid-template-rows] duration-200 ease-out grid ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">{a}</div>
      </div>
    </div>
  );
}
