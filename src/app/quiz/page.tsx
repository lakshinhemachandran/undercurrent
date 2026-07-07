/* 
 * Copyright © 2026 Lakshin Hemachandran. All Rights Reserved.
 * This file is part of the "Undercurrent" project.
 * Unauthorized copying, modification, or redistribution of this file 
 * via any medium is strictly prohibited. Restructured under the terms 
 * of the proprietary LICENSE file located in the root repository.
 */


import { SiteHeader } from "@/components/site-header";
import { QuizWizard } from "@/components/quiz-wizard";

export default function QuizPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <SiteHeader />
      <section className="py-8 sm:py-12">
        <div className="mb-6 max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Anonymous reflection</p>
          <h1 className="font-display text-4xl leading-tight text-slate-50 sm:text-5xl">A calm quiz that helps you hear your own patterns.</h1>
          <p className="text-lg leading-8 text-slate-300">Move through the cards at your own pace. Nothing here is clinical, and the last screen is reserved for your own words.</p>
        </div>
        <QuizWizard />
      </section>
    </main>
  );
}
