import Link from "next/link";

export default function Header({ current }: { current: string }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="AI Ready logo" className="h-8 w-8 rounded-xl"/>
          <span className="font-semibold">AI Ready</span>
        </div>
       <nav className="hidden md:flex items-center gap-6 text-sm">
  <Link href="/" className={`hover:underline ${current === "home" ? "font-semibold" : ""}`}>
    Home
  </Link>
  <Link href="/funnel" className={`hover:underline ${current === "funnel" ? "font-semibold" : ""}`}>
    Quiz Funnel
  </Link>
  <a
    href="https://getaiready.app/lesson"
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
  >
    Sample Lesson
  </a>
</nav>

      </div>
    </header>
  );
}
