import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const RESEND_FROM = process.env.RESEND_FROM!; // e.g. 'AI Ready <hello@getaiready.app>'
const PLAY_LINK =
  "https://play.google.com/store/apps/details?id=com.aiready.app&pcampaignid=web_share";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendWithResend(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  // Using Resend HTTP API directly (no extra SDK dependency needed)
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
      // Optional: reply-to the same inbox
      reply_to: "hello@getaiready.app",
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `Resend error (${res.status})`;
    throw new Error(msg);
  }
  return data; // contains id
}

export async function POST(req: Request) {
  try {
    if (!RESEND_API_KEY || !RESEND_FROM) {
      return Response.json(
        { error: "Missing RESEND_API_KEY or RESEND_FROM env var" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const email = String(body.email || "").trim().toLowerCase();
    if (!email || !isValidEmail(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    // Keep everything except email as answers
    // (don’t store source inside answers)
    const { email: _email, source: _source, ...answers } = body;

    // 1) Save to Supabase
    const { error: dbError } = await supabase
      .from("early_access_signups")
      .upsert(
        {
          email,
          answers,
          source: body.source || "form",
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("Supabase upsert error:", dbError);
      return Response.json({ error: dbError.message }, { status: 500 });
    }

    // 2) Send email EVERY submission (your choice)
    const subject = "Your AI Ready download link is here 🚀";
    const text = `Welcome to AI Ready!

Thanks for taking the AI Ready quiz — you’re in.

Download AI Ready for Android:
${PLAY_LINK}

Tip: Save this email so you can find the link anytime.

If you have questions, just reply to this email.
— AI Ready`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.5; color:#0f172a;">
        <h2 style="margin:0 0 12px;">Welcome to AI Ready 👋</h2>
        <p style="margin:0 0 12px;">
          Thanks for taking the AI Ready quiz — you’re in.
        </p>

        <div style="padding:14px 16px; border:1px solid #e2e8f0; border-radius:12px; background:#f8fafc; margin:14px 0;">
          <p style="margin:0 0 10px; font-weight:600;">Download AI Ready for Android</p>
          <a href="${PLAY_LINK}" style="display:inline-block; padding:10px 14px; border-radius:999px; background:#4f46e5; color:#fff; text-decoration:none; font-weight:600;">
            Open Google Play →
          </a>
          <p style="margin:10px 0 0; font-size:12px; color:#475569;">
            Tip: save this email so you can find the link anytime.
          </p>
        </div>

        <p style="margin:0 0 6px;">
          If you have questions, just reply to this email.
        </p>
        <p style="margin:0; color:#475569;">— AI Ready</p>
      </div>
    `;

    const resendResult = await sendWithResend({
      to: email,
      subject,
      html,
      text,
    });

    return Response.json(
      { ok: true, emailSent: true, resendId: resendResult?.id || null },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("API error:", err?.message || err);
    // Fail loudly so you can see issues (and so Resend logs make sense)
    return Response.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
