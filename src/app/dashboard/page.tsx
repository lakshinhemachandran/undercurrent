/* 
 * Copyright © 2026 Lakshin Hemachandran. All Rights Reserved.
 * This file is part of the "Undercurrent" project.
 * Unauthorized copying, modification, or redistribution of this file 
 * via any medium is strictly prohibited. Restructured under the terms 
 * of the proprietary LICENSE file located in the root repository.
 */


import Link from "next/link";
import { ArrowRight, BellRing, Sparkles, Wand2 } from "lucide-react";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { SiteHeader } from "@/components/site-header";

export default function DashboardPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
      <SiteHeader />
      <section className="py-10 sm:py-16">
        <div className="glass-card rounded-[2rem] p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-sm text-teal-100">
            <Sparkles className="h-4 w-4" /> Coming soon
          </div>
          <h1 className="mt-5 font-display text-4xl text-slate-50 sm:text-5xl">
            Dashboard under development.
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300">
            This area is being built out now. The quiz still works, and the full dashboard experience will open after launch.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-5">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-400">
                <Wand2 className="h-4 w-4 text-teal-300" /> Under development
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Therapy tracking, mood logging, and journal tools are offline while we finish the account-based experience.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link href="/quiz" className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-200">
                  Go to quiz <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/register" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-slate-100 transition hover:border-teal-300/40 hover:bg-white/10">
                  Join email list
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email list</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Leave your email on the sign-up page to get notified when the dashboard goes live.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                <BellRing className="h-4 w-4 text-teal-300" /> No dashboard access yet. Quiz remains available.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <MedicalDisclaimer />
        </div>
      </section>
    </main>
  );
}
