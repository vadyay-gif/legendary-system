"use client";

import { useEffect } from "react";

export default function GooglePlayRedirect() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const zoneid = params.get("zoneid");
    const clickid = params.get("clickid");

    // Track the email click (ONE event)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).amplitude?.track?.("email_link_clicked", {
      platform: "google_play",
      zoneid,
      clickid,
    });

    // Redirect immediately to Google Play
    window.location.replace(
      "https://play.google.com/store/apps/details?id=com.aiready.app&pcampaignid=web_share"
    );
  }, []);

  return (
    <p style={{ textAlign: "center", marginTop: "40px" }}>
      Redirecting to Google Play…
    </p>
  );
}
