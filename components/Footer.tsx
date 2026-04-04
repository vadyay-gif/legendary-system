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

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={APPLE_URL}
              target="_blank"
              rel="noreferrer"
              className="transition hover:opacity-85"
            >
              <img
                src="/badges/app-store.png"
                alt="Download on the App Store"
                className="h-9 w-auto object-contain sm:h-10"
              />
            </a>

            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noreferrer"
              className="transition hover:opacity-85"
            >
              <img
                src="/badges/google-play.png"
                alt="Get it on Google Play"
                className="h-9 w-auto object-contain sm:h-10"
              />
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
            <a
              href="mailto:support@getaiready.app"
              className="hover:text-slate-900"
            >
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
