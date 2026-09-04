"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import StoreBadge from "@/components/StoreBadge";
import { trackWebEvent } from "@/lib/webAnalytics";

const PLAY_IMAGE_BASE = "https://play-lh.googleusercontent.com";

const PRODUCT_IMAGES = {
  questMap: `${PLAY_IMAGE_BASE}/KfVo6s0jiTUIpLM0QWBi2VzSkNlLPiw-qNVxMpj-SF3FUV4rWTE2eGvhhtssKKsN_TqbX-o24EyQvl-GvaxMdOI=w900-h1600`,
  battle: `${PLAY_IMAGE_BASE}/i2wQkCkPR5ry-hSXTFV79BztGoOFAwBfOxQvFeG_xjILw9rUVfwtYQopXzoM2vcob3-S1_IBN9ndLK75knwvOA=w900-h1600`,
  reveal: `${PLAY_IMAGE_BASE}/bfx4qJXV2H7pxwimEi257tnBHySkLFrDwdy6ZWKFP9uIjmFJK3LZMQww5ZeE5xIdtTp8aMbz9HSfGI7xRBTBGA=w900-h1600`,
  build: `${PLAY_IMAGE_BASE}/EO-Jo6MzEOHCW250IduVyq1yu3Htoeyll2zJBeL_2q_oDBRyGsX2cQVXT-GKzA_g0RkVXe5ju1EmBT_WMxIkkQ=w900-h1600`,
  skill: `${PLAY_IMAGE_BASE}/GGE0JMoqfYA3JJ_4KMOQnZ0WU368Rw6s1cPWZ4FS2p-FMeolLC7d7pX05DD1s9GDYqppJZCLAN3ZQwgYyFNuxw=w900-h1600`,
  powerCard: `${PLAY_IMAGE_BASE}/JEWXJHzAKSXwXNDVlc4tpZ2uUoO9E3hcpJnktF5XTtYrHjmoHQgS7ZyzcXfDhlmfFcn4Ggx6wPeVFH05VWZz=w900-h1600`,
  progress: `${PLAY_IMAGE_BASE}/J5jUpu17DJ0-c4_KzCx9RZChI2g0b8kqnlqaWR6PPOtJjTK6bPWI2DefIFf_7ZoHJCUoNABIQ0Kr_pCk4laK9A=w900-h1600`,
};

type DemoStep = "try" | "change" | "understand";

const DEMO_STEPS: Array<{
  id: DemoStep;
  index: string;
  label: string;
  title: string;
  body: string;
  image: string;
  alt: string;
}> = [
  {
    id: "try",
    index: "01",
    label: "Try",
    title: "Make the decision.",
    body: "Choose between stronger and weaker AI moves instead of simply reading what to do.",
    image: PRODUCT_IMAGES.battle,
    alt: "AI Ready Mission comparing a search-style request with a stronger conversational AI request.",
  },
  {
    id: "change",
    index: "02",
    label: "Change",
    title: "Change what matters.",
    body: "Add the missing context, goal or structure so the interaction becomes more useful.",
    image: PRODUCT_IMAGES.build,
    alt: "AI Ready Mission asking the learner to identify missing ingredients in an AI request.",
  },
  {
    id: "understand",
    index: "03",
    label: "Understand",
    title: "See why it worked.",
    body: "Compare the result and understand which ingredients changed the quality of the response.",
    image: PRODUCT_IMAGES.reveal,
    alt: "AI Ready reveal explaining why the stronger AI approach produces more useful help.",
  },
];

const CAPABILITIES = [
  {
    title: "Give useful context",
    desc: "Know what AI needs — and what it does not.",
  },
  {
    title: "Clarify the outcome",
    desc: "Turn a vague goal into a result you can actually judge.",
  },
  {
    title: "Diagnose weak results",
    desc: "Identify what went wrong before rewriting everything.",
  },
  {
    title: "Break down complex work",
    desc: "Know when one request should become a workflow.",
  },
  {
    title: "Evaluate AI answers",
    desc: "Check relevance, uncertainty and when verification matters.",
  },
  {
    title: "Reuse what works",
    desc: "Turn successful approaches into techniques you can use again.",
  },
];

function SectionEyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
        dark
          ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-200"
          : "border-sky-200 bg-sky-50 text-sky-700"
      }`}
    >
      {children}
    </div>
  );
}

function StoreBadges({ placement }: { placement: "hero" | "final" }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <StoreBadge store="apple" placement={placement} />
      <StoreBadge store="google" placement={placement} />
    </div>
  );
}

function ProductCrop({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[#071126] shadow-[0_28px_70px_-30px_rgba(15,23,42,0.65)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="h-full w-full object-cover object-bottom"
      />
    </div>
  );
}

export default function HomeLandingPage() {
  const [activeDemo, setActiveDemo] = useState<DemoStep>("try");
  const selectedDemo = DEMO_STEPS.find((step) => step.id === activeDemo)!;

  function selectDemo(step: DemoStep) {
    setActiveDemo(step);
    trackWebEvent("web_demo_step_selected", { step });
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main>
        <section className="relative overflow-hidden" aria-labelledby="hero-title">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_88%_16%,rgba(99,102,241,0.11),transparent_28%)]" />

          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 md:pb-16 md:pt-16 lg:pb-20 lg:pt-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
              <div className="max-w-3xl">
                <SectionEyebrow>AI Ready: Better AI Results</SectionEyebrow>

                <h1
                  id="hero-title"
                  className="mt-5 text-4xl font-bold tracking-[-0.035em] text-slate-950 sm:text-5xl md:text-6xl md:leading-[1.02]"
                >
                  <span className="block">STOP GUESSING.</span>
                  <span className="block">START CONTROLLING AI.</span>
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                  Practice on real AI situations. Make choices, see what changes
                  the result, and build the judgement to use AI deliberately.
                </p>

                <div className="mt-7">
                  <StoreBadges placement="hero" />
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[430px] lg:max-w-[460px]">
                <div className="pointer-events-none absolute -left-10 top-16 h-36 w-36 rounded-full bg-cyan-300/30 blur-3xl" />
                <div className="pointer-events-none absolute -right-8 bottom-10 h-40 w-40 rounded-full bg-violet-300/30 blur-3xl" />
                <div className="relative rounded-[34px] border border-slate-200/80 bg-white/80 p-3 shadow-[0_36px_90px_-42px_rgba(15,23,42,0.55)] backdrop-blur-sm">
                  <ProductCrop
                    src={PRODUCT_IMAGES.questMap}
                    alt="AI Ready Quest Map showing the user's AI learning path and recommended Quests."
                    priority
                    className="aspect-[4/5] border-slate-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14" aria-labelledby="problem-title">
          <div className="mx-auto max-w-4xl text-center">
            <SectionEyebrow>Why it matters</SectionEyebrow>
            <h2
              id="problem-title"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-950 md:text-5xl"
            >
              Using AI is easy. Knowing what controls the result is harder.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Sometimes AI gives you exactly what you need. Other times it misses
              the point — and retrying turns into guesswork.
            </p>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-2 lg:items-stretch">
            <article className="flex h-full flex-col rounded-3xl border border-rose-200 bg-rose-50/80 p-6 md:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-700">
                Guessing
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                When AI misses
              </h3>
              <p className="mt-3 text-lg text-slate-700">
                Rewrite. Retry. Add more. Hope something changes.
              </p>
            </article>

            <article className="flex h-full flex-col rounded-3xl border border-sky-200 bg-sky-50/80 p-6 md:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
                Deliberate control
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                When you understand why
              </h3>
              <p className="mt-3 text-lg text-slate-700">
                Diagnose what is missing. Change the right thing. Compare the
                result.
              </p>
            </article>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-7 text-slate-600 md:text-lg">
            Better AI use is not about finding a magic prompt. It is about knowing
            what to change and why.
          </p>
        </section>

        <section
          id="how-it-works"
          className="mx-auto max-w-[1440px] px-0 py-10 md:px-4 md:py-14"
          aria-labelledby="demo-title"
        >
          <div className="relative overflow-hidden bg-[#050b19] px-4 py-12 text-white md:rounded-[38px] md:px-8 md:py-16 lg:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.13),transparent_24%),radial-gradient(circle_at_18%_78%,rgba(124,58,237,0.16),transparent_30%)]" />

            <div className="relative mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <SectionEyebrow dark>How AI Ready works</SectionEyebrow>
                <h2
                  id="demo-title"
                  className="mt-4 text-3xl font-bold tracking-[-0.03em] md:text-5xl"
                >
                  Learn by changing the result.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  AI Ready puts you inside practical Missions. You choose, compare,
                  diagnose and build — then see what changed and why it mattered.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200 md:text-sm">
                <span>Try</span>
                <span aria-hidden="true" className="text-slate-500">→</span>
                <span>Change</span>
                <span aria-hidden="true" className="text-slate-500">→</span>
                <span>Compare</span>
                <span aria-hidden="true" className="text-slate-500">→</span>
                <span>Understand</span>
              </div>

              <div className="mt-10 hidden gap-8 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                <div role="tablist" aria-label="How AI Ready works" className="space-y-3">
                  {DEMO_STEPS.map((step) => {
                    const selected = step.id === activeDemo;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-controls="demo-panel"
                        onClick={() => selectDemo(step.id)}
                        className={`w-full rounded-3xl border p-5 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                          selected
                            ? "border-cyan-300/45 bg-white/10 shadow-[0_18px_50px_-30px_rgba(34,211,238,0.8)]"
                            : "border-white/10 bg-white/[0.035] hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-0.5 text-sm font-semibold text-cyan-300">
                            {step.index}
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                              {step.label}
                            </div>
                            <h3 className="mt-2 text-xl font-semibold text-white">
                              {step.title}
                            </h3>
                            <p className="mt-2 leading-7 text-slate-300">
                              {step.body}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div id="demo-panel" role="tabpanel" className="mx-auto w-full max-w-[460px]">
                  <ProductCrop
                    src={selectedDemo.image}
                    alt={selectedDemo.alt}
                    className="aspect-[4/5]"
                  />
                </div>
              </div>

              <div className="mt-10 grid gap-8 lg:hidden">
                {DEMO_STEPS.map((step) => (
                  <article key={step.id} className="grid gap-4 sm:grid-cols-[0.7fr_1.3fr] sm:items-center">
                    <div>
                      <div className="text-sm font-semibold text-cyan-300">{step.index}</div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {step.label}
                      </div>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 leading-7 text-slate-300">{step.body}</p>
                    </div>
                    <ProductCrop src={step.image} alt={step.alt} className="aspect-[4/5]" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14" aria-labelledby="capabilities-title">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>What you build</SectionEyebrow>
            <h2
              id="capabilities-title"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-950 md:text-5xl"
            >
              Build judgement you can reuse.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The goal is not to memorize prompts. It is to get better at the
              decisions behind good AI work.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {CAPABILITIES.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-8 rounded-[34px] border border-slate-200 bg-slate-50/80 p-6 md:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <SectionEyebrow>Skills + Power Cards</SectionEyebrow>
              <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-950 md:text-4xl">
                Turn practice into something you keep.
              </h3>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                Missions unlock Skills that make your progress visible. Power Cards
                save useful techniques so you can return to them when you need them.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ProductCrop
                src={PRODUCT_IMAGES.skill}
                alt="AI Ready Skill unlock screen showing a reusable capability earned after completing a Mission."
                className="aspect-[4/5]"
              />
              <ProductCrop
                src={PRODUCT_IMAGES.powerCard}
                alt="AI Ready Power Card showing a reusable AI technique that can be copied and applied later."
                className="aspect-[4/5]"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-0 py-10 md:px-4 md:py-14" aria-labelledby="progress-title">
          <div className="relative overflow-hidden bg-[#071126] px-4 py-12 text-white md:rounded-[38px] md:px-8 md:py-16 lg:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(124,58,237,0.18),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(34,211,238,0.14),transparent_30%)]" />

            <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <SectionEyebrow dark>Your progression</SectionEyebrow>
                <h2
                  id="progress-title"
                  className="mt-4 text-3xl font-bold tracking-[-0.03em] md:text-5xl"
                >
                  AI User → AI Operator → AI Power User
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Start where you are. Build from trial-and-error AI use toward
                  deliberate control and increasingly capable ways of working with AI.
                </p>

                <div className="mt-8 grid gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[
                    {
                      stage: "AI User",
                      quote: "I ask AI and hope it works.",
                      desc: "Learn what affects the result and how to improve it.",
                    },
                    {
                      stage: "AI Operator",
                      quote: "I understand what I am changing and why.",
                      desc: "Diagnose problems, structure tasks and improve deliberately.",
                    },
                    {
                      stage: "AI Power User",
                      quote: "I can build repeatable ways of working with AI.",
                      desc: "Move toward stronger workflows, evaluation and adaptable capability.",
                    },
                  ].map((item) => (
                    <article key={item.stage} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
                        {item.stage}
                      </div>
                      <p className="mt-3 text-lg font-semibold leading-7 text-white">“{item.quote}”</p>
                      <p className="mt-2 leading-7 text-slate-300">{item.desc}</p>
                    </article>
                  ))}
                </div>

                <p className="mt-6 max-w-2xl leading-7 text-slate-300">
                  AI Ready helps you find a useful place to begin, so you do not have
                  to start from the same point as everyone else.
                </p>
              </div>

              <div className="mx-auto w-full max-w-[450px]">
                <ProductCrop
                  src={PRODUCT_IMAGES.progress}
                  alt="AI Ready Progress screen showing progress toward AI Operator, completed Missions and unlocked Skills."
                  className="aspect-[4/5]"
                />
                <p className="mt-4 text-center text-sm text-slate-400">
                  Daily Practice gives you another way to apply what you have learned.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14" aria-labelledby="download-title">
          <div className="rounded-[34px] border border-sky-200 bg-[radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.12),transparent_34%),linear-gradient(135deg,#f0f9ff_0%,#ffffff_58%,#eef2ff_100%)] p-7 shadow-sm md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <SectionEyebrow>Download AI Ready</SectionEyebrow>
                <h2
                  id="download-title"
                  className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-950 md:text-5xl"
                >
                  Ready to stop guessing?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                  Start practising with AI Ready and build better AI judgement one
                  interaction at a time.
                </p>
              </div>

              <StoreBadges placement="final" />
            </div>

            <div className="mt-7 grid gap-3 border-t border-slate-200/80 pt-6 text-sm text-slate-600 sm:grid-cols-2 lg:max-w-2xl">
              <p>
                <span className="font-semibold text-slate-950">Android:</span>{" "}
                Free, supported by ads.
              </p>
              <p>
                <span className="font-semibold text-slate-950">iPhone:</span>{" "}
                Free to start. Continued access requires a subscription.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-4 py-10 md:py-14" aria-labelledby="faq-title">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2
              id="faq-title"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-950 md:text-5xl"
            >
              Questions before you download
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            <Faq
              q="What is AI Ready?"
              a="AI Ready is an interactive learning and practice app that helps you become better at working with AI. Instead of relying on long lessons or static prompt templates, you work through practical Missions where you make decisions, diagnose problems, compare approaches and see what changes the result."
            />
            <Faq
              q="Is AI Ready just a prompting course?"
              a="No. Better requests are part of using AI well, but AI Ready goes further. You practise skills such as diagnosing weak results, structuring complex tasks, evaluating answers, verifying when needed and turning successful approaches into reusable ways of working."
            />
            <Faq
              q="Do I need to be experienced with AI?"
              a="No. AI Ready includes a starting-point assessment to help recommend where to begin. It is designed for people at different levels of AI experience."
            />
            <Faq
              q="Is AI Ready tied to one AI tool?"
              a="No. AI Ready focuses on transferable AI judgement rather than teaching one company's interface. The goal is to help you use general-purpose AI tools more deliberately as the technology changes."
            />
            <Faq
              q="How does access work on iPhone and Android?"
              a="On Android, AI Ready is free and supported by ads. On iPhone, you can start free and subscription access applies after the free experience."
            />
            <Faq
              q="Can I use AI Ready in my browser?"
              a="The website is designed to help you discover and preview AI Ready. The full current experience is available through the iPhone and Android apps."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
