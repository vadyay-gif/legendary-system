import React, { useMemo, useState } from "react";

// Single-file React app for getaiready.app
// - Landing page for warm traffic
// - Quiz funnel for ad traffic at /funnel (toggle via in-app nav for preview)
// Tailwind CSS expected. No external deps.

export default function App() {
  const [route, setRoute] = useState("home"); // "home" | "funnel" | "results"
  const [lead, setLead] = useState({ email: "", name: "", role: "" });

  // QUIZ STATE
  const quiz = useMemo(
    () => [
      {
        id: 1,
        question: "What best describes your role?",
        answers: ["Manager/Team Lead", "Individual Contributor", "Founder", "Freelancer/Consultant"],
        key: "role",
      },
      {
        id: 2,
        question: "Primary goal with AI at work?",
        answers: ["Save time", "Improve writing", "Better research", "Make better decisions"],
        key: "goal",
      },
      {
        id: 3,
        question: "Which track is most interesting right now?",
        answers: [
          "Everyday Communication",
          "Reports & Summaries",
          "Presentations",
          "Research & Brainstorming",
          "Personal Productivity",
          "Meetings & Notes",
          "Research & Analysis",
          "Marketing & Social",
          "Spreadsheets & Data",
        ],
        key: "track",
      },
      {
        id: 4,
        question: "How much time can you spend per day?",
        answers: ["5 minutes", "10–15 minutes", "20–30 minutes", "More than 30 minutes"],
        key: "time",
      },
      {
        id: 5,
        question: "What’s your biggest blocker?",
        answers: [
          "Unsure what to prompt",
          "Too many tools to choose",
          "No clear workflow",
          "Quality is inconsistent",
        ],
        key: "blocker",
      },
      {
        id: 6,
        question: "What would you like help with first?",
        answers: [
          "Email templates",
          "Meeting notes → actions",
          "Executive summaries",
          "Data → charts/insights",
        ],
        key: "firstNeed",
      },
      {
        id: 7,
        question: "Do you want daily AI tips?",
        answers: ["Yes, via email", "Yes, via push", "Maybe later"],
        key: "dailyTips",
      },
      {
        id: 8,
        question: "Company size?",
        answers: ["Solo", "2–10", "11–50", "51–250", "250+"],
        key: "companySize",
      },
      {
        id: 9,
        question: "What device will you use?",
        answers: ["iPhone", "Android", "Both", "Web"],
        key: "device",
      },
      {
        id: 10,
        question: "When would you like to start?",
        answers: ["Today", "This week", "This month", "Just exploring"],
        key: "startWhen",
      },
    ],
    []
  );

  const [step, setStep] = useState(0); // 0..9
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = useMemo(() => Math.round(((step) / quiz.length) * 100), [step, quiz.length]);

  function chooseAnswer(a: string) {
    const q = quiz[step];
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.key]: a }));
    if (step < quiz.length - 1) setStep((s) => s + 1);
    else setRoute("results");
  }

  function resetFunnel() {
    setStep(0);
    setAnswers({});
    setRoute("funnel");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current={route} gotoHome={() => setRoute("home")} gotoFunnel={() => setRoute("funnel")} />

      {route === "home" && (
        <Landing lead={lead} setLead={setLead} gotoFunnel={() => setRoute("funnel")} />
      )}

      {route === "funnel" && (
        <Funnel
          step={step}
          progress={progress}
          quiz={quiz}
          chooseAnswer={chooseAnswer}
          reset={resetFunnel}
        />
      )}

      {route === "results" && (
        <Results
          lead={lead}
          answers={answers}
          onGetAppIOS={() => alert("Link to App Store coming soon")}
          onGetAppAndroid={() => alert("Link to Google Play coming soon")}
          onRestart={resetFunnel}
          onBackHome={() => setRoute("home")} 
        />
      )}

      <Footer />
    </div>
  );
}

function Header({ current, gotoHome, gotoFunnel }: { current: string; gotoHome: () => void; gotoFunnel: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">AI</div>
          <span className="font-semibold">AI Ready</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button onClick={gotoHome} className={`hover:underline ${current==="home"?"font-semibold":""}`}>Home</button>
          <button onClick={gotoFunnel} className={`hover:underline ${current==="funnel"?"font-semibold":""}`}>Quiz Funnel</button>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#faq" className="hover:underline">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a className="px-3 py-2 rounded-xl border border-slate-300 text-sm" href="#">Login</a>
          <a className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm" href="#">Get Early Access</a>
        </div>
      </div>
    </header>
  );
}

function Landing({ lead, setLead, gotoFunnel }: { lead: any; setLead: any; gotoFunnel: () => void }) {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Learn to use AI at work in minutes a day</h1>
          <p className="mt-4 text-lg text-slate-600">Practical, role-based lessons. 9 tracks × 5 lessons × 3 scenarios. Built for busy professionals.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button className="px-5 py-3 rounded-xl bg-slate-900 text-white" onClick={gotoFunnel}>Take the 2‑minute quiz</button>
            <button className="px-5 py-3 rounded-xl border border-slate-300">See how it works</button>
          </div>
          <form className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3" onSubmit={(e)=>{e.preventDefault(); alert("Thanks! We'll be in touch.");}}>
            <input className="col-span-1 sm:col-span-1 px-4 py-3 rounded-xl border border-slate-300" placeholder="Your name" value={lead.name} onChange={(e)=>setLead({...lead, name:e.target.value})} />
            <input className="col-span-1 sm:col-span-1 px-4 py-3 rounded-xl border border-slate-300" placeholder="Work email" type="email" value={lead.email} onChange={(e)=>setLead({...lead, email:e.target.value})} />
            <button className="px-5 py-3 rounded-xl bg-slate-900 text-white">Get early access</button>
          </form>
          <p className="mt-3 text-xs text-slate-500">No spam. Occasional updates and invites.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 grid place-items-center text-slate-500">App screenshot placeholder</div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-center">
            <div className="rounded-xl bg-slate-50 border p-3">9 Tracks</div>
            <div className="rounded-xl bg-slate-50 border p-3">135 Scenarios</div>
            <div className="rounded-xl bg-slate-50 border p-3">Daily Tips</div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold">What you'll master</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {title:"Emails & Tone", desc:"Get to inbox zero with smart replies and tone control."},
            {title:"Meetings → Action", desc:"Capture decisions, assign owners, and follow up."},
            {title:"Executive Summaries", desc:"Condense long docs into crisp briefings."},
            {title:"Data → Insights", desc:"Turn spreadsheets into charts and KPI snapshots."},
            {title:"Marketing & Social", desc:"From idea to multi-platform posts fast."},
            {title:"Research & Analysis", desc:"Find sources, compare options, decide confidently."},
          ].map((c,i)=> (
            <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold">{c.title}</div>
              <div className="mt-1 text-slate-600 text-sm">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-slate-50 border-y">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h3 className="text-xl font-semibold">Loved by busy professionals</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
            {[1,2,3].map((t)=> (
              <div key={t} className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="italic">“AI Ready helped me turn messy meeting notes into clear action items. Huge time saver.”</p>
                <p className="mt-3 text-slate-500">— Pilot user</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-xl font-semibold">FAQ</h3>
        <div className="mt-6 space-y-4">
          <Faq q="Who is AI Ready for?" a="Professionals who want to use AI to save time and improve work output—managers, ICs, founders, and consultants." />
          <Faq q="How much time per day?" a="As little as 5 minutes. Each scenario is designed to be short and practical." />
          <Faq q="How much will it cost?" a="MVP will start with a small monthly subscription, with a free trial for early adopters." />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border bg-slate-900 text-white p-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h4 className="text-2xl font-semibold">Be first to try AI Ready</h4>
            <p className="mt-2 text-slate-200">Join the early access list and get daily AI tips.</p>
          </div>
          <form className="flex gap-3" onSubmit={(e)=>{e.preventDefault(); alert("Saved!");}}>
            <input className="flex-1 px-4 py-3 rounded-xl text-slate-900" placeholder="Work email" />
            <button className="px-5 py-3 rounded-xl bg-white text-slate-900">Join</button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border bg-white p-4">
      <button className="w-full text-left font-medium" onClick={()=>setOpen(o=>!o)}>{q}</button>
      {open && <p className="mt-2 text-sm text-slate-600">{a}</p>}
    </div>
  );
}

function Funnel({ step, progress, quiz, chooseAnswer, reset }: { step: number; progress: number; quiz: any[]; chooseAnswer: (a:string)=>void; reset: ()=>void; }) {
  const q = quiz[step];
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-6 text-sm text-slate-500">Step {step+1} of {quiz.length}</div>
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-slate-900" style={{width: `${progress}%`}} />
      </div>
      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">{q?.question}</h2>
        <div className="mt-6 grid gap-3">
          {q?.answers.map((a:string, i:number)=> (
            <button key={i} onClick={()=>chooseAnswer(a)} className="w-full text-left px-4 py-3 rounded-xl border hover:border-slate-400">{a}</button>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between text-sm">
          <button onClick={reset} className="text-slate-500 hover:underline">Restart</button>
          <div>{progress}% complete</div>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">Takes ~2 minutes. No sign-up required until results.</p>
    </main>
  );
}

function Results({ lead, answers, onGetAppIOS, onGetAppAndroid, onRestart, onBackHome }: { lead:any; answers:any; onGetAppIOS:()=>void; onGetAppAndroid:()=>void; onRestart:()=>void; onBackHome:()=>void; }) {
  // Simple recommendation logic
  const recommendation = useMemo(() => {
    const track = answers.track;
    let note = "Start with Everyday Communication to get quick wins in your inbox.";
    if (track === "Reports & Summaries") note = "Start with Reports & Summaries to write brief, sharp updates.";
    if (track === "Presentations") note = "Start with Presentations to turn data into clear messaging.";
    if (track === "Research & Brainstorming") note = "Start with Research & Brainstorming to generate ideas fast.";
    if (track === "Personal Productivity") note = "Start with Personal Productivity to build daily AI habits.";
    if (track === "Meetings & Notes") note = "Start with Meetings & Notes to capture actions and owners.";
    if (track === "Research & Analysis") note = "Start with Research & Analysis for reliable sources and comparisons.";
    if (track === "Marketing & Social") note = "Start with Marketing & Social for fast multi-platform output.";
    if (track === "Spreadsheets & Data") note = "Start with Spreadsheets & Data to turn tables into insights.";
    return note;
  }, [answers.track]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Your AI Ready Plan</h2>
        <p className="mt-2 text-slate-600">Based on your answers, here’s the best place to start.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-xl border p-4">
              <div className="text-sm font-semibold">Recommendation</div>
              <p className="mt-1 text-slate-700">{recommendation}</p>
            </div>
            <div className="rounded-xl border p-4">
              <div className="text-sm font-semibold">Your inputs (for personalization)</div>
              <ul className="mt-2 text-sm text-slate-600 list-disc pl-5">
                {Object.entries(answers).map(([k,v])=> (
                  <li key={k}><span className="font-medium capitalize">{k}:</span> {String(v)}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-xl border p-4 h-fit">
            <div className="text-sm font-semibold">Get the app</div>
            <p className="mt-1 text-slate-600 text-sm">Download AI Ready and start your first 5‑minute scenario today.</p>
            <div className="mt-3 grid gap-2">
              <button className="px-4 py-2 rounded-xl border" onClick={onGetAppIOS}>App Store (iOS)</button>
              <button className="px-4 py-2 rounded-xl border" onClick={onGetAppAndroid}>Google Play (Android)</button>
            </div>
            <p className="mt-3 text-xs text-slate-500">Not live yet? Join the early access list on the homepage.</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm">
          <button onClick={onRestart} className="text-slate-500 hover:underline">Restart quiz</button>
          <button onClick={onBackHome} className="text-slate-900 underline">Back to homepage</button>
        </div>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500 grid md:grid-cols-2 gap-4">
        <div>
          <div className="font-semibold text-slate-700">AI Ready</div>
          <p className="mt-1">© {new Date().getFullYear()} AI Ready. All rights reserved.</p>
        </div>
        <div className="flex gap-4 md:justify-end">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
