### `app/page.tsx` (Landing page)
<a href="/funnel" className="px-5 py-3 rounded-xl bg-slate-900 text-white text-center">Take the 2‑minute quiz</a>
<a href="#features" className="px-5 py-3 rounded-xl border border-slate-300 text-center">See how it works</a>
</div>
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


{/* FEATURES */}
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


{/* FAQ */}
<section id="faq" className="mx-auto max-w-6xl px-4 py-12">
<h3 className="text-xl font-semibold">FAQ</h3>
<div className="mt-6 space-y-4">
<Faq q="Who is AI Ready for?" a="Professionals who want to use AI to save time and improve work output—managers, ICs, founders, and consultants." />
<Faq q="How much time per day?" a="As little as 5 minutes. Each scenario is designed to be short and practical." />
<Faq q="How much will it cost?" a="MVP will start with a small monthly subscription, with a free trial for early adopters." />
</div>
</section>
</main>
<Footer />
</div>
);
}
```
