// /lib/lessons.ts
export type Scenario = {
  id: string;
  title: string;
  instructions: string;        // what the user should do on the page
  promptTemplate: string;      // the actual prompt we’ll render with variables
  inputs: Array<{ name: string; label: string; placeholder?: string }>;
};

export type Lesson = {
  id: string;
  track: string;
  title: string;
  summary: string;
  scenarios: Scenario[];
};

export const lessons: Lesson[] = [
  {
    id: "everyday-communication-01",
    track: "Everyday Communication",
    title: "The 5-Minute Email Superpower",
    summary:
      "Three quick scenarios to turn rough notes into crisp, professional emails in minutes.",
    scenarios: [
      {
        id: "s1",
        title: "Polish my rough email",
        instructions:
          "Paste your rough email draft and choose a tone. You’ll get a clean, professional version that keeps your intent.",
        inputs: [
          { name: "emailText", label: "Your rough email", placeholder: "Paste your draft here…" },
          { name: "tone", label: "Tone (friendly, direct, or formal)", placeholder: "friendly" },
        ],
        promptTemplate:
          `You are a writing assistant. Improve the email below for clarity, brevity, and professionalism.\n` +
          `Keep meaning intact. Use a **{tone}** tone. Return only the final email.\n\n` +
          `---\nEMAIL DRAFT:\n{emailText}\n---`
      },
      {
        id: "s2",
        title: "Turn bullets into a status update",
        instructions:
          "Paste your raw bullets. You’ll get a crisp two-paragraph update plus clear next steps.",
        inputs: [
          { name: "bullets", label: "Bullets / notes", placeholder: "• finished API integration\n• 3 bugs left\n• waiting on approval…" },
        ],
        promptTemplate:
          `Rewrite the bullets into a crisp two-paragraph status update.\n` +
          `Paragraph 1: progress/what changed. Paragraph 2: risks + next steps.\n` +
          `Keep it under 140 words. Return only the final update.\n\n` +
          `---\nBULLETS:\n{bullets}\n---`
      },
      {
        id: "s3",
        title: "Quick reply (3 tone options)",
        instructions:
          "Paste the inbound email. You’ll get three short reply options: friendly, direct, and formal.",
        inputs: [
          { name: "inboundEmail", label: "Inbound email", placeholder: "Paste the message you need to reply to…" },
        ],
        promptTemplate:
          `Create three short email replies to the message below: (1) Friendly, (2) Direct, (3) Formal.\n` +
          `Each reply should be 3–5 sentences, polite, and actionable.\n\n` +
          `---\nINBOUND EMAIL:\n{inboundEmail}\n---`
      }
    ]
  }
];

// Helper to fetch one random lesson (we currently have 1).
export function getRandomLesson(): Lesson {
  return lessons[Math.floor(Math.random() * lessons.length)];
}
