import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    // Remove email from answers
    const { email: _removed, ...answers } = body;

    /* 1️⃣ Save to Supabase */
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
      console.error("Supabase error:", dbError);
      return Response.json({ error: "Database error" }, { status: 500 });
    }

    /* 2️⃣ Send email via Resend */
    console.log("Sending email to:", email);

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM!, // e.g. "AI Ready <hello@getaiready.app>"
      to: email,
      subject: "Welcome to AI Ready — your download link inside 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Welcome to AI Ready 👋</h2>
          <p>
            You’re officially in! AI Ready helps you use AI safely and
            confidently for real work — emails, spreadsheets, presentations,
            summaries, and more.
          </p>

          <p><strong>Good news:</strong> AI Ready is already available on Android.</p>

          <p style="margin: 24px 0;">
            👉 <a href="https://play.google.com/store/apps/details?id=com.aiready.app&pcampaignid=web_share"
               style="background:#4f46e5;color:#ffffff;padding:12px 18px;
               border-radius:8px;text-decoration:none;display:inline-block;">
               Download AI Ready on Google Play
            </a>
          </p>

          <p>
            We’ll keep improving AI Ready based on how people actually work —
            and you’re part of that early group shaping it.
          </p>

          <p>
            If you have feedback or questions, just reply to this email.
          </p>

          <p>
            — The AI Ready Team
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return Response.json(
        { error: "Email failed to send" },
        { status: 500 }
      );
    }

    console.log("Email sent successfully to:", email);

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
