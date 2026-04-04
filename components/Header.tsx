"use client";

import Link from "next/link";

const APPLE_URL = "https://apps.apple.com/app/ai-ready/id6759277049";
const GOOGLE_URL =
  "https://play.google.com/store/apps/details?id=com.aiready.app";

export default function Header({ current }: { current: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/favicon.png"
            alt="AI Ready logo"
            className="h-9 w-9 rounded-xl shadow-sm"
          />
          <div className="leading-tight">
            <div className="text-base font-semibold text-slate-900">
              AI Ready
            </div>
            <div className="hidden text-xs text-slate-500 sm:block">
              AI productivity skills for work
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={`text-sm transition ${
              current === "home"
                ? "font-semibold text-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Home
          </Link>

          {/* Store Buttons */}
          <div className="ml-2 flex items-center gap-3">
            <a
              href={APPLE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              App Store
            </a>

            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Google Play
            </a>
          </div>
        </nav>

        {/* Mobile Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={APPLE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
          >
            Download
          </a>
        </div>
      </div>
    </header>
  );
}
