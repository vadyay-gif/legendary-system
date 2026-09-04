import StoreBadge from "@/components/StoreBadge";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 md:mt-20">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950 md:text-2xl">
              Improve how you use AI.
            </h2>
            <p className="mt-1 max-w-2xl text-slate-600">
              Build practical AI judgement through interactive Missions, visible
              transformations and reusable tools.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StoreBadge store="apple" placement="footer" />
            <StoreBadge store="google" placement="footer" />
          </div>
        </div>

        <div className="grid gap-6 border-t border-slate-200 pt-6 md:grid-cols-3">
          <div>
            <div className="text-base font-semibold text-slate-950">AI Ready</div>
            <p className="mt-2 text-sm text-slate-600">Better AI Results</p>
          </div>

          <div />

          <nav
            aria-label="Legal and support"
            className="flex flex-col gap-2 text-sm text-slate-600 md:items-end"
          >
            <a
              href="/privacy"
              className="rounded outline-none hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="rounded outline-none hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Terms
            </a>
            <a
              href="mailto:support@getaiready.app"
              className="rounded outline-none hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} Orion AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
