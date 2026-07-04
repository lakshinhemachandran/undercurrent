"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { QuizAnswerMap, QuizInsight, QuizMetricKey } from "@/lib/types";

export type QuizState = {
  answers: QuizAnswerMap;
  whyText: string;
  metrics: Record<QuizMetricKey, number>;
  analysis: QuizInsight | null;
  isAnalysisLoading: boolean;
  setAnswer: (key: string, value: string | number | boolean) => void;
  setWhyText: (value: string) => void;
  setMetric: (key: QuizMetricKey, value: number) => void;
  setAnalysis: (analysis: QuizInsight | null) => void;
  setIsAnalysisLoading: (value: boolean) => void;
  resetQuiz: () => void;
};

const initialMetrics: Record<QuizMetricKey, number> = {
  sleepDisruption: 2,
  isolation: 2,
  emotionalWeight: 3,
  stressCycles: 2,
  overwhelm: 2,
  energy: 3
};

const initialState = {
  answers: {},
  whyText: "",
  metrics: initialMetrics,
  analysis: null,
  isAnalysisLoading: false
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      ...initialState,
      setAnswer: (key, value) => set((state) => ({ answers: { ...state.answers, [key]: value } })),
      setWhyText: (value) => set({ whyText: value }),
      setMetric: (key, value) => set((state) => ({ metrics: { ...state.metrics, [key]: value } })),
      setAnalysis: (analysis) => set({ analysis }),
      setIsAnalysisLoading: (value) => set({ isAnalysisLoading: value }),
      resetQuiz: () => set(initialState)
    }),
    {
      name: "undercurrent-quiz-draft",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        answers: state.answers,
        whyText: state.whyText,
        metrics: state.metrics,
        analysis: state.analysis
      })
    }
  )
);
