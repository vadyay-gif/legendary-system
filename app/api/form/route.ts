import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    // Keep everything except email as answers
    const { email: _ignore, ...answers } = body;

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
      console.error("Supabase insert error:", dbError);
      return Response.json({ error: dbError.message }, { status: 500 });
    }

    // Send welcome email with download link
    const from = process.env.RESEND_FROM;
    if (!from) {
      console.error("Missing RESEND_FROM env var");
      return Response.json(
        { error: "Server misconfigured (missing RESEND_FROM)" },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from,
      to: email,
      subject: "Your AI Ready download link is here 🚀",
      html: `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#111;">
  <h2>Welcome to AI Ready 👋</h2>

  <p>Thanks for signing up — your early access is ready.</p>

  <p>
    <strong>AI Ready helps you use AI safely and practically for real work tasks</strong>
    like emails, spreadsheets, summaries, and presentations — without the confusion or risk.
  </p>

  <p>You can download the Android app here:</p>

  <p style="margin:24px 0;">
    <a
      href="https://play.google.com/store/apps/details?id=com.aiready.app&pcampaignid=web_share"
      style="background:#6C63FF;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;"
    >
      📲 Download AI Ready for Android
    </a>
  </p>

  <p>
    You’re now part of the early group helping shape AI Ready.
    If you have feedback or ideas, just reply to this email — we read every message.
  </p>

  <p style="margin-top:24px;">— The AI Ready Team</p>

  <p style="font-size:12px;color:#666;margin-top:28px;">
    You’re receiving this email because you signed up for AI Ready early access on getaiready.app.
  </p>
</div>
      `,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
