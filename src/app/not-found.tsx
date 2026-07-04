import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-16 text-center">
      <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Not found</p>
        <h1 className="font-display text-4xl text-slate-50">This page drifted away.</h1>
        <p className="mx-auto max-w-xl text-base leading-7 text-slate-300">
          The page you tried to open does not exist right now. Go back to the home screen, quiz, or dashboard.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200">
            Home
          </Link>
          <Link href="/quiz" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-teal-300/40">
            Quiz
          </Link>
          <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-teal-300/40">
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}