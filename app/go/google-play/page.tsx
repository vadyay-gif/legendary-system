import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const runtime = "nodejs"; // Resend should run in Node (not Edge)

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Body = Record<string, unknown>;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Hash email so we can identify "who clicked" without exposing email in URL
function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function buildTrackedGooglePlayLink(params: {
  zoneid: string | null;
  clickid: string | null;
  eid: string;
}) {
  // IMPORTANT: set NEXT_PUBLIC_BASE_URL in Vercel to: https://getaiready.app
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://getaiready.app";

  const url = new URL("/go/google-play", base);
  if (params.zoneid) url.searchParams.set("zoneid", params.zoneid);
  if (params.clickid) url.searchParams.set("clickid", params.clickid);
  url.searchParams.set("eid", params.eid); // hashed email id

  return url.toString();
}

async function sendWelcomeEmail(to: string, trackedLink: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey) throw new Error("Missing RESEND_API_KEY");
  if (!from) throw new Error("Missing RESEND_FROM");

  const subject = "Your AI Ready download link ✅";

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
    <h2 style="margin: 0 0 12px;">Welcome to AI Ready 👋</h2>

    <p style="margin: 0 0 12px;">
      Thanks for taking the quiz — you’re in!
    </p>

    <p style="margin: 0 0 12px;">
      AI Ready helps you use AI safely for real work tasks like emails, summaries, spreadsheets, and presentations — without the “hit-or-miss” frustration.
    </p>

    <p style="margin: 0 0 14px;">
      <strong>Download AI Ready for Android here:</strong><br/>
      <a href="${trackedLink}" target="_blank" rel="noreferrer">${trackedLink}</a>
    </p>

    <p style="margin: 0 0 6px;">See you inside,</p>
    <p style="margin: 0;">AI Ready Team</p>
  </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from, // e.g. "AI Ready <hello@getaiready.app>"
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend failed: ${res.status} ${text}`);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const email = String(body.email ?? "").trim().toLowerCase();
    if (!email || !isValidEmail(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const source = String(body.source ?? "popup-quiz");

    // Pull attribution if present (your frontend is already sending zoneid/clickid)
    const zoneid = body.zoneid ? String(body.zoneid) : null;
    const clickid = body.clickid ? String(body.clickid) : null;

    // Build answers WITHOUT creating unused vars:
    const answers: Record<string, unknown> = { ...body };
    delete answers.email;
    delete answers.source;

    // (Optional but recommended) do NOT store clickid/zoneid inside "answers" blob
    // Keep them separate if your DB supports columns.
    // If your table does NOT have these columns, we’ll store them inside answers anyway.
    // For safest compatibility, we store inside answers too:
    answers.zoneid = zoneid;
    answers.clickid = clickid;

    const { error: dbError } = await supabase.from("early_access_signups").upsert(
      { email, answers, source },
      { onConflict: "email" }
    );

    if (dbError) {
      console.error("Supabase upsert error:", dbError);
      return Response.json({ error: dbError.message }, { status: 500 });
    }

    // Create stable ID for linking clicks to the same user in Amplitude
    const eid = sha256(email);

    // Build tracked redirect link (this is what goes into the email)
    const trackedLink = buildTrackedGooglePlayLink({ zoneid, clickid, eid });

    await sendWelcomeEmail(email, trackedLink);

    return Response.json({ ok: true }, { status: 200 });
  } catch (err: unknown) {
    console.error("API error:", err);
    const msg = err instanceof Error ? err.message : "Server error";
    return Response.json({ error: msg }, { status: 500 });
  }
}
