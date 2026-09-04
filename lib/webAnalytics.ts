"use client";

import amplitude from "@/app/amplitude";

export function trackWebEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;

  try {
    amplitude.track(eventName, properties);
  } catch {
    // Analytics must never block navigation or core website interactions.
  }
}
