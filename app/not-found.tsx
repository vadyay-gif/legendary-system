import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main className="mx-auto flex min-h-[58vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-700">
          404
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-slate-950 md:text-5xl">
          This page is not part of the path.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
          Head back to AI Ready to explore the app and choose where to download it.
        </p>
        <Link
          href="/"
          className="mt-7 rounded-full bg-slate-950 px-6 py-3 font-semibold text-white outline-none transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        >
          Back to AI Ready
        </Link>
      </main>
      <Footer />
    </div>
  );
}
