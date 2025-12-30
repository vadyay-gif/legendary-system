"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

// ----------------------------
// Ultra credit-saving tracking
// Tracks ONLY:
// 1) email_page_viewed (when step === EMAIL_STEP) — once per user
// 2) email_submitted (only on successful submit attempt)
// Uses Propeller params: ?zoneid=...&clickid=...
// Uses global window.amplitude (NO "@/amplitude" import)
// ----------------------------
function getPropellerParams() {
  if (typeof window === "undefined") return { zoneid: null as string | null, clickid: null as string | null };

  const params = new URLSearchParams(window.location.search);
  const zoneid = params.get("zoneid");
  const clickid = params.get("clickid");

  // Persist so if user later opens another page on your domain, you still have it.
  if (zoneid) localStorage.setItem("propeller_zoneid", zoneid);
  if (clickid) localStorage.setItem("propeller_clickid", clickid);

  return {
    zoneid: zoneid ?? localStorage.getItem("propeller_zoneid"),
    clickid: clickid ?? localStorage.getItem("propeller_clickid"),
  };
}

// Funnel structure:
