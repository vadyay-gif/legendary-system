export default function Header({ current }: { current: string }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">AI</div>
          <span className="font-semibold">AI Ready</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="/" className={`hover:underline ${current === "home" ? "font-semibold" : ""}`}>Home</a>
          <a href="/funnel" className={`hover:underline ${current === "funnel" ? "font-semibold" : ""}`}>Quiz Funnel</a>
        </nav>
      </div>
    </header>
  );
}
