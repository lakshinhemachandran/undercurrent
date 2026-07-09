export type QuizMetricKey = "sleepDisruption" | "isolation" | "emotionalWeight" | "stressCycles" | "overwhelm" | "energy";

export type QuizAnswerValue = string | number | boolean;

export type QuizAnswerMap = Record<string, QuizAnswerValue>;

export type ResourceRecommendation = {
  label: string;
  href: string;
  description: string;
};

export type ResourceDirectory = {
  immediateCrisis: ResourceRecommendation[];
  therapyDirectories: ResourceRecommendation[];
  supportGroups: ResourceRecommendation[];
  selfGuided: ResourceRecommendation[];
};

export type QuantifiedIndicator = {
  indicator: string;
  score: number;
  interpretation: string;
};

export type QuizInsight = {
  summary: string;
  intentSignal: string;
  validatingSentences: string[];
  behavioralPatterns: string[];
  quantifiedIndicators: QuantifiedIndicator[];
  mindMapMarkdown: string;
  evidenceBackedInterventions: string[];
  clinicalReferences: ResourceRecommendation[];
  resourceDirectory: ResourceDirectory;
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
