"use client";

import { useEffect, useRef } from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aiready.app";

export default function GooglePlayRedirectPage() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const zoneid = params.get("zoneid");
    const clickid = params.get("clickid");
    const eid = params.get("eid"); // optional (legacy email links)
    const src = params.get("src") || (eid ? "email" : "funnel");
    const sid = params.get("sid"); // optional session id from funnel

    // Track redirect handoff (do not block redirect if amplitude missing)
    (window as unknown as {
      amplitude?: {
        track?: (name: string, props?: Record<string, unknown>) => void;
      };
    }).amplitude?.track?.("google_play_redirect_loaded", {
      platform: "google_play",
      source: src,
      zoneid,
      clickid,
      eid,
      session_id: sid,
    });

    // Short delay to give analytics a chance to fire, then redirect
    const t = window.setTimeout(() => {
      window.location.href = PLAY_STORE_URL;
    }, 250);

    return () => window.clearTimeout(t);
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 560 }}>
        <div style={{ marginBottom: 8 }}>Redirecting to Google Play…</div>
        <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 12 }}>
          If nothing happens, tap the button below.
        </div>
        <a
          href={PLAY_STORE_URL}
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 12,
            background: "#4f46e5",
            color: "white",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Open Google Play →
        </a>
      </div>
    </main>
  );
}
