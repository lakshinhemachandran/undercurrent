"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2, LockKeyhole } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { discoveryResources } from "@/lib/site-content";
import { cn, clamp } from "@/lib/utils";
import { useQuizStore } from "@/store/quiz-store";
import { SelectionCard } from "@/components/selection-card";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import type { QuizMetricKey } from "@/lib/types";

type StepOption = {
  value: string | number;
  title: string;
  subtitle: string;
};

const steps: Array<{ key: string; prompt: string; options: StepOption[]; metric?: QuizMetricKey }> = [
  {
    key: "primaryFeeling",
    prompt: "What feels loudest right now?",
    options: [
      { value: "stress", title: "Stress", subtitle: "Too many moving pieces at once." },
      { value: "anxiety", title: "Anxiety", subtitle: "My body stays on alert." },
      { value: "depression", title: "Low mood", subtitle: "Everything feels heavier than usual." },
      { value: "overwhelm", title: "Overwhelm", subtitle: "I cannot separate one feeling from the next." }
    ]
  },
  {
    key: "sleep",
    prompt: "How has sleep been lately?",
    options: [
      { value: "steady", title: "Mostly steady", subtitle: "My nights are usually regular." },
      { value: "fragmented", title: "Fragmented", subtitle: "I wake up more than I want to." },
      { value: "delayed", title: "Delayed", subtitle: "Falling asleep takes a while." },
      { value: "allOver", title: "All over the place", subtitle: "My schedule and rest feel disconnected." }
    ],
    metric: "sleepDisruption"
  },
  {
    key: "connection",
    prompt: "What happens when things get heavy?",
    options: [
      { value: "reachOut", title: "I reach out", subtitle: "I can usually talk to someone." },
      { value: "hide", title: "I hide out", subtitle: "I pull back until it passes." },
      { value: "scroll", title: "I scroll", subtitle: "I stay busy enough to not feel it." },
      { value: "spiral", title: "I spiral", subtitle: "One thought turns into a lot of them." }
    ],
    metric: "isolation"
  },
  {
    key: "energy",
    prompt: "What best matches your energy lately?",
    options: [
      { value: 5, title: "High", subtitle: "Plenty of fuel, sometimes too much." },
      { value: 4, title: "Up and down", subtitle: "There is energy, but it moves around." },
      { value: 3, title: "Mixed", subtitle: "Some moments feel open, others flat." },
      { value: 2, title: "Low", subtitle: "Getting going takes effort." }
    ],
    metric: "energy"
  },
  {
    key: "stressCycles",
    prompt: "When does stress tend to peak?",
    options: [
      { value: "mornings", title: "Mornings", subtitle: "The day starts loaded." },
      { value: "school", title: "During school", subtitle: "Deadlines and social pressure stack up." },
      { value: "evenings", title: "Evenings", subtitle: "Everything catches up at night." },
      { value: "random", title: "Random spikes", subtitle: "It comes in waves that are hard to predict." }
    ],
    metric: "stressCycles"
  }
];

const whyPrompt = "Why did you choose to take this quiz today?";

export function QuizWizard() {
  const {
    answers,
    whyText,
    metrics,
    analysis,
    isAnalysisLoading,
    setAnswer,
    setWhyText,
    setMetric,
    setAnalysis,
    setIsAnalysisLoading,
    resetQuiz
  } = useQuizStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(Boolean(analysis));

  const progress = useMemo(() => ((stepIndex + (completed ? 1 : 0)) / (steps.length + 1)) * 100, [stepIndex, completed]);
  const isFinalStep = stepIndex === steps.length;
  const activeStep = steps[stepIndex];
  const canGoNext = activeStep ? Boolean(answers[activeStep.key]) : false;

  async function handleAnalyze() {
    if (!whyText.trim()) {
      setError("Take your time, but this screen needs a few honest lines before we can analyze.");
      return;
    }

    setIsAnalysisLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, whyText, metrics })
      });
      const payload = (await response.json()) as { insight?: typeof analysis; note?: string };
      if (payload.insight) {
        setAnalysis(payload.insight);
        setCompleted(true);
      }
      if (!response.ok) {
        throw new Error(payload.note ?? "Analysis failed.");
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Something interrupted the analysis.");
    } finally {
      setIsAnalysisLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <MedicalDisclaimer />

      <div className="glass-card rounded-[2rem] p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4 text-sm text-slate-300">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-400" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 120, damping: 25 }} />
        </div>
      </div>

      <div className="glass-card rounded-[2rem] p-5 sm:p-7">
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div key="analysis" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6">
              <div className="rounded-3xl border border-teal-300/20 bg-teal-300/10 p-5">
                <div className="flex items-center gap-2 text-teal-100">
                  <Check className="h-4 w-4" />
                  Reflection complete
                </div>
                <h2 className="mt-3 font-display text-3xl text-slate-50">Your pattern map is ready.</h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-300">{analysis?.summary}</p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-sm uppercase tracking-[0.24em] text-slate-400">Validating language</h3>
                  <ul className="mt-4 space-y-3 text-slate-200">
                    {analysis?.validatingSentences.map((sentence) => <li key={sentence}>• {sentence}</li>)}
                  </ul>
                </section>
                <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-sm uppercase tracking-[0.24em] text-slate-400">Behavioral patterns</h3>
                  <ul className="mt-4 space-y-3 text-slate-200">
                    {analysis?.behavioralPatterns.map((pattern) => <li key={pattern}>• {pattern}</li>)}
                  </ul>
                </section>
              </div>

              <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-sm uppercase tracking-[0.24em] text-slate-400">Grounding ideas</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {analysis?.groundingTechniques.map((technique) => (
                    <div key={technique} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm leading-6 text-slate-200">
                      {technique}
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {discoveryResources.map((resource) => (
                  <a key={resource.label} href={resource.href} target="_blank" rel="noreferrer" className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-teal-300/40 hover:bg-white/[0.07]">
                    <p className="font-semibold text-slate-50">{resource.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{resource.description}</p>
                  </a>
                ))}
              </section>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => setStepIndex(0)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-teal-300/40">
                  Retake reflection
                </button>
                <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200">
                  Create account and keep progress
                </Link>
                <button onClick={resetQuiz} className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200">
                  Clear saved draft
                </button>
              </div>
            </motion.div>
          ) : isFinalStep ? (
            <motion.div key="final" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Final step</p>
                <h2 className="font-display text-4xl leading-tight text-slate-50">{whyPrompt}</h2>
                <p className="max-w-2xl text-slate-300">Keep this private and honest. The more specific you are, the cleaner the pattern map will be.</p>
              </div>
              <textarea
                value={whyText}
                onChange={(event) => setWhyText(event.target.value)}
                placeholder="I took this because..."
                className="min-h-64 w-full rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 text-lg leading-8 text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-teal-300/50"
              />
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={() => setStepIndex((value) => value - 1)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-teal-300/40">
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <button onClick={handleAnalyze} disabled={isAnalysisLoading || !whyText.trim()} className={cn("inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition", isAnalysisLoading || !whyText.trim() ? "cursor-not-allowed bg-slate-700 text-slate-300" : "bg-teal-300 text-slate-950 hover:bg-teal-200")}>
                  {isAnalysisLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
                  Analyze reflection
                </button>
              </div>
              {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}
            </motion.div>
          ) : (
            <motion.div key={activeStep.key} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Step {stepIndex + 1} of {steps.length + 1}</p>
                <h2 className="font-display text-4xl leading-tight text-slate-50">{activeStep.prompt}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {activeStep.options.map((option) => (
                  <SelectionCard
                    key={String(option.value)}
                    title={option.title}
                    subtitle={option.subtitle}
                    selected={answers[activeStep.key] === option.value}
                    onClick={() => {
                      setAnswer(activeStep.key, option.value);
                      if (activeStep.metric) {
                        setMetric(activeStep.metric, typeof option.value === "number" ? option.value : clamp((stepIndex % 5) + 1, 1, 5));
                      }
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between gap-3">
                <button onClick={() => setStepIndex((value) => value - 1)} disabled={stepIndex === 0} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-teal-300/40 disabled:cursor-not-allowed disabled:opacity-40">
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <button onClick={() => setStepIndex((value) => value + 1)} disabled={!canGoNext} className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
