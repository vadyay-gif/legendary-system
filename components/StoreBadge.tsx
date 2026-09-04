"use client";

import { trackWebEvent } from "@/lib/webAnalytics";

export const APPLE_URL = "https://apps.apple.com/app/ai-ready/id6759277049";
export const GOOGLE_URL =
  "https://play.google.com/store/apps/details?id=com.aiready.app";

type StoreBadgeProps = {
  store: "apple" | "google";
  placement: "header" | "hero" | "final" | "footer";
  size?: "compact" | "default";
};

export default function StoreBadge({
  store,
  placement,
  size = "default",
}: StoreBadgeProps) {
  const isApple = store === "apple";
  const href = isApple ? APPLE_URL : GOOGLE_URL;
  const label = isApple ? "Download on the App Store" : "Get it on Google Play";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      onClick={() =>
        trackWebEvent("web_store_click", {
          store,
          placement,
        })
      }
      className="inline-flex shrink-0 rounded-lg outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
    >
      <img
        src={isApple ? "/badges/app-store.png" : "/badges/google-play.png"}
        alt={label}
        className={
          size === "compact"
            ? "h-8 w-auto object-contain sm:h-10"
            : "h-10 w-auto object-contain sm:h-11"
        }
      />
    </a>
  );
}
