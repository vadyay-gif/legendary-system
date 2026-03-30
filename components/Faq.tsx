/* eslint-disable react/no-unescaped-entities */
"use client";

import { useId, useState } from "react";

export default function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div
      className={`rounded-3xl border bg-white transition-all duration-200 ${
        open
          ? "border-sky-200 shadow-[0_10px_30px_-18px_rgba(14,165,233,0.35)]"
          : "border-slate-200 shadow-sm"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`panel-${id}`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
      >
        <span className="text-base font-semibold leading-6 text-slate-900 md:text-lg">
          {q}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-all duration-200 ${
            open
              ? "rotate-180 border-sky-200 bg-sky-50 text-sky-700"
              : "border-slate-200 bg-slate-50 text-slate-500"
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      <div
        id={`panel-${id}`}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-sm leading-7 text-slate-600 md:px-6 md:text-base">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}
