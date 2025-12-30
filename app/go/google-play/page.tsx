"use client";

import { useEffect, useRef } from "react";

export default function GooglePlayRedirectPage() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const zoneid = params.get("zoneid");
    const clickid = params.get("clickid");
    const eid = params.get("eid");

    // Track click (safe TS access)
    (window as unknown as { amplitude?: { track?: (name: string, props?: Record<string, unknown>) => void } })
      .amplitude
      ?.track?.("email_link_clicked", {
        platform: "google_play",
        zoneid,
        clickid,
        eid,
      });

    // Redirect to Google Play
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.aiready.app&pcampaignid=web_share";
  }, []);

  // IMPORTANT: must return valid JSX so Next is happy
  return (
    <main style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      Redirecting to Google Play…
    </main>
  );
}
