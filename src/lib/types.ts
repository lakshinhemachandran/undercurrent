export type QuizMetricKey = "sleepDisruption" | "isolation" | "emotionalWeight" | "stressCycles" | "overwhelm" | "energy";

export type QuizAnswerValue = string | number | boolean;

export type QuizAnswerMap = Record<string, QuizAnswerValue>;

export type QuizInsight = {
  validatingSentences: string[];
  behavioralPatterns: string[];
  groundingTechniques: string[];
  resourceRecommendations: Array<{ label: string; href: string; description: string }>;
  summary: string;
};

export type QuizPayload = {
  answers: QuizAnswerMap;
  whyText: string;
  metrics: Record<QuizMetricKey, number>;
};

export type TherapyLog = {
  id: string;
  therapistName: string;
  nextSessionAt: string;
  moodHistory: number[];
  streakDays: number;
  journalEntries: Array<{ at: string; note: string }>;
  unlockedPings: string[];
};
