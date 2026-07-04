"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(`You’re on the early access list for ${email}. We’ll open the full sign-up flow soon.`);
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
      <SiteHeader />
      <section className="py-10 sm:py-16">
        <div className="glass-card rounded-[2rem] p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-sm text-teal-100">
            <Sparkles className="h-4 w-4" /> Coming soon
          </div>
          <h1 className="mt-5 font-display text-4xl text-slate-50 sm:text-5xl">
            Sign up and sign in are under development.
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-300">
            The quiz still works. The account area and dashboard are being built out behind the scenes, and the full experience will open soon.
          </p>

          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Join the email list</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Get notified when sign up, sign in, and the dashboard are ready.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-teal-300/50"
                placeholder="you@example.com"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-200">
                Join list <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {message ? <p className="mt-3 text-sm text-teal-200">{message}</p> : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link href="/quiz" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-slate-100 transition hover:border-teal-300/40">
              Back to quiz
            </Link>
            <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-slate-100 transition hover:border-teal-300/40">
              View dashboard wall
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <MedicalDisclaimer />
        </div>
      </section>
    </main>
  );
}