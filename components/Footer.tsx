const APPLE_URL = "https://apps.apple.com/app/ai-ready/id6759277049";
const GOOGLE_URL =
  "https://play.google.com/store/apps/details?id=com.aiready.app";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Improve how you use AI at work
            </h3>
            <p className="mt-1 text-slate-600">
              Learn better prompting in just 5 minutes a day.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={APPLE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              App Store
            </a>

            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Google Play
            </a>
          </div>
        </div>

        <div className="grid gap-6 border-t border-slate-200 pt-6 md:grid-cols-3">
          <div>
            <div className="text-base font-semibold text-slate-900">AI Ready</div>
            <p className="mt-2 text-sm text-slate-600">
              Practical AI productivity skills for professionals.
            </p>
          </div>

          <div />

          <div className="flex flex-col gap-2 text-sm text-slate-600 md:items-end">
            <a href="/privacy" className="hover:text-slate-900">
              Privacy
            </a>
            <a href="/terms" className="hover:text-slate-900">
              Terms
            </a>
            <a href="/contact" className="hover:text-slate-900">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} AI Ready. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
