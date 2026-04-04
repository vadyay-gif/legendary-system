<nav className="hidden items-center gap-6 md:flex">
  <Link
    href="/"
    className={`text-sm transition ${
      current === "home"
        ? "font-semibold text-slate-900"
        : "text-slate-600 hover:text-slate-900"
    }`}
  >
    Home
  </Link>

  <div className="ml-2 flex items-center gap-2">
    <a
      href={APPLE_URL}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
    >
      App Store
    </a>

    <a
      href={GOOGLE_URL}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
    >
      Google Play
    </a>
  </div>
</nav>
