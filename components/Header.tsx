"use client";

import Link from "next/link";

const APPLE_URL = "https://apps.apple.com/app/ai-ready/id6759277049";
const GOOGLE_URL =
  "https://play.google.com/store/apps/details?id=com.aiready.app";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <img
            src="/favicon.png"
            alt="AI Ready logo"
            className="h-10 w-10 shrink-0 rounded-xl shadow-sm"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-semibold text-slate-900 sm:text-base">
              AI Ready
            </div>
            <div className="hidden truncate text-xs text-slate-500 sm:block">
              AI productivity skills for work
            </div>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={APPLE_URL}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 transition hover:opacity-85"
            aria-label="Download AI Ready on the App Store"
          >
            <img
              src="/badges/app-store.png"
              alt="Download on the App Store"
              className="h-8 w-auto object-contain sm:h-10"
            />
          </a>

          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 transition hover:opacity-85"
            aria-label="Get AI Ready on Google Play"
          >
            <img
              src="/badges/google-play.png"
              alt="Get it on Google Play"
              className="h-8 w-auto object-contain sm:h-10"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
