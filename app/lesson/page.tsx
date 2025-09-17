"use client";

import { useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getRandomLesson } from "@/lib/lessons";

export default function LessonPage() {
  // Pick 1 lesson when the page loads (client-side for simplicity)
  const lesson = useMemo(() => getRandomLesson(), []);

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Prompt copied to clipboard!");
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current="lesson" />

      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-slate-600">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-1">›</span>
          <span>Sample Lesson</span>
        </div>

        {/* Lesson header */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-slate-500">
            {lesson.track}
          </div>
          <h1 className="mt-1 text-2xl font-bold">{lesson.title}</h1>
          <p className="mt-2 text-slate-600">{lesson.summary}</p>
        </div>

        {/* Scenarios (first 3) */}
        <section className="mt-6 grid gap-4">
          {lesson.scenarios.slice(0, 3).map((s) => (
            <div key={s.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-slate-600">{s.instructions}</p>

              {/* Inputs */}
              <div className="mt-4 grid gap-3">
                {s.inputs.map((inp) => (
                  <div key={inp.name} className="grid gap-1">
                    <label className="text-xs text-slate-500">{inp.label}</label>
                    <textarea
                      id={inp.name}
                      placeholder={inp.placeholder}
                      className="rounded-xl border p-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                      rows={
                        inp.name === "emailText" ||
                        inp.name === "bullets" ||
                        inp.name === "inboundEmail"
                          ? 5
                          : 2
                      }
                      onChange={(e) => {
                        // Keep a data-* attribute on the element so we can read values to fill the template
                        (e.target as HTMLTextAreaElement).setAttribute("data-value", e.target.value);
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Preview + Copy */}
              <div className="mt-4">
                <div className="text-xs text-slate-500 mb-1">Preview</div>
                <TemplatePreview
                  template={s.promptTemplate}
                  inputNames={s.inputs.map((i) => i.name)}
                />
                <div className="mt-3 flex gap-2">
                  <button
                    className="px-4 py-2 rounded-xl border bg-white"
                    onClick={() => {
                      const text = buildTemplate(
                        s.promptTemplate,
                        s.inputs.map((i) => i.name)
                      );
                      copy(text);
                    }}
                  >
                    Copy prompt
                  </button>
                  {/* External link is fine as <a>; ESLint rule only applies to internal / paths */}
                  <a
                    href="https://chat.openai.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border bg-white"
                  >
                    Open ChatGPT
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom nav (internal links via <Link>) */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link href="/" className="px-4 py-3 rounded-xl border bg-white text-center">
            Back Home
          </Link>
          <Link href="/funnel" className="px-4 py-3 rounded-xl border bg-white text-center">
            See Quiz Funnel
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/** Fill {placeholders} from current textarea values on the page */
function buildTemplate(template: string, names: string[]) {
  let t = template;
  for (const name of names) {
    const el = document.getElementById(name) as HTMLTextAreaElement | null;
    const value = el?.getAttribute("data-value") ?? "";
    // replace {name} with value
    t = t.replace(new RegExp(`\\{${name}\\}`, "g"), value);
  }
  return t;
}

function TemplatePreview({
  template,
  inputNames,
}: {
  template: string;
  inputNames: string[];
}) {
  const text = buildTemplate(template, inputNames);
  return (
    <pre className="whitespace-pre-wrap rounded-xl border bg-slate-50 p-3 text-xs">
{text}
    </pre>
  );
}
