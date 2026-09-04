"use client";

import Link from "next/link";
import StoreBadge from "@/components/StoreBadge";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4">
        <Link
          href="/"
          aria-label="AI Ready home"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 sm:gap-3"
        >
          <img
            src="/favicon.png"
            alt=""
            className="h-10 w-10 shrink-0 rounded-xl shadow-sm"
          />
          <div className="truncate text-sm font-semibold text-slate-950 sm:text-base">
            AI Ready
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <StoreBadge store="apple" placement="header" size="compact" />
          <StoreBadge store="google" placement="header" size="compact" />
        </div>
      </div>
    </header>
  );
}
