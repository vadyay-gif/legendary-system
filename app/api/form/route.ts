import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs"; // IMPORTANT: Resend should run in Node, not Edge

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Body = {
  email?: unknown;
  source?: unknown;
  [key: string]: unknown;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendWelcomeEmail(to: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey) throw new Error("Missing RESEND_API_KEY");
  if (!from) throw new Error("Missing RESEND_FROM");

  const subject = "Your AI Ready download link ✅";
  const downloadLink =
    "https://play.google.com/store/apps/details?id=com.aiready.app&pcampaignid=web_share";

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
      <a href="${downloadLink}" target="_blank" rel="noreferrer">${downloadLink}</a>
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
      from, // must look like: AI Ready <hello@getaiready.app>
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

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    if (!email || !isValidEmail(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const source = String(body.source ?? "popup-quiz");

    // Store everything except email/source as answers
    const { email: _omitEmail, source: _omitSource, ...answers } = body;

    const { error: dbError } = await supabase
      .from("early_access_signups")
      .upsert(
        {
          email,
          answers, // JSON column recommended
          source,
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("Supabase upsert error:", dbError);
      return Response.json({ error: dbError.message }, { status: 500 });
    }

    // Send the email after storing the signup
    await sendWelcomeEmail(email);

    return Response.json({ ok: true }, { status: 200 });
  } catch (err: unknown) {
    console.error("API error:", err);
    const msg = err instanceof Error ? err.message : "Server error";
    return Response.json({ error: msg }, { status: 500 });
  }
}
