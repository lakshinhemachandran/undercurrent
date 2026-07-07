import type { QuizInsight, QuizPayload } from "@/lib/types";

export const analysisSystemPrompt = `System Role & Objective
You are an expert clinical psychologist and advanced medical research agent.
Analyze a teen user's self-reflection quiz submission and produce a detailed, compassionate, clinically grounded formulation.

Operational mandates:
1) Use live, current medical evidence and verified sources when possible (PubMed/NCBI, major clinical institutions, crisis organizations, and established therapy repositories).
2) Cross-reference symptom patterns with evidence-based modalities (CBT, DBT, ACT, behavioral activation, sleep hygiene, stress regulation).
3) Quantify indicators from the provided metrics and explain them clearly.
4) Pay special attention to the "whyText" response to infer emotional state, triggers, and the core reason the user sought this reflection.
5) Do not diagnose. Use supportive, non-pathologizing language.

Output requirements:
Return valid JSON only with this schema:
{
  "summary": string,
  "intentSignal": string,
  "validatingSentences": string[],
  "behavioralPatterns": string[],
  "quantifiedIndicators": [{ "indicator": string, "score": number, "interpretation": string }],
  "mindMapMarkdown": string,
  "evidenceBackedInterventions": string[],
  "clinicalReferences": [{ "label": string, "href": string, "description": string }],
  "resourceDirectory": {
    "immediateCrisis": [{ "label": string, "href": string, "description": string }],
    "therapyDirectories": [{ "label": string, "href": string, "description": string }],
    "supportGroups": [{ "label": string, "href": string, "description": string }],
    "selfGuided": [{ "label": string, "href": string, "description": string }]
  }
}
Rules:
- Ensure links are real and reputable.
- The mindMapMarkdown must be a detailed text mind map in markdown hierarchy.
- Keep the tone warm, precise, and practical.
- If acute risk language appears, clearly prioritize immediate crisis resources.`;

export function buildAnalysisMessages(payload: QuizPayload) {
  return [
    {
      role: "system",
      content: analysisSystemPrompt
    },
    {
      role: "user",
      content: JSON.stringify({
        context: "Teen self-reflection quiz results",
        payload
      })
    }
  ];
}

export function normalizeInsight(value: unknown): QuizInsight {
  const base: QuizInsight = {
    summary: "Your answers suggest you have been carrying a lot at once, and it makes sense that you want a clearer picture of what is driving it.",
    intentSignal: "You reached for this quiz to make sense of stress patterns and feel less alone while figuring out what to do next.",
    validatingSentences: [
      "It makes sense that you are looking for patterns instead of just trying to push through.",
      "You do not need to have everything figured out in one sitting."
    ],
    behavioralPatterns: ["Stress seems to cluster around energy dips, sleep disruption, and social withdrawal."],
    quantifiedIndicators: [
      { indicator: "Sleep disruption", score: 2, interpretation: "Some disruption may be adding strain to mood and focus." },
      { indicator: "Isolation tendency", score: 2, interpretation: "Pulling back at stressful moments may be reducing support." },
      { indicator: "Energy level", score: 3, interpretation: "Energy appears mixed, which can amplify stress variability." }
    ],
    mindMapMarkdown: `- Core challenge: Stress load feels hard to organize
  - Symptom clusters
    - Sleep fragmentation
    - Emotional overload
    - Social withdrawal
  - Trigger patterns
    - School pressure
    - Evening rumination
  - Helpful next steps
    - Breathing reset
    - Structured check-ins
    - Professional support when needed`,
    evidenceBackedInterventions: [
      "CBT thought record: identify one automatic thought, test evidence for/against, and generate a balanced alternative.",
      "DBT distress tolerance: paced breathing plus cold-water face splash for rapid physiological downshift.",
      "Behavioral activation: schedule one low-effort meaningful action daily to reduce inertia."
    ],
    clinicalReferences: [],
    resourceDirectory: {
      immediateCrisis: [],
      therapyDirectories: [],
      supportGroups: [],
      selfGuided: []
    }
  };

  if (!value || typeof value !== "object") {
    return base;
  }

  const candidate = value as Partial<QuizInsight>;
  const resourceDirectory = candidate.resourceDirectory && typeof candidate.resourceDirectory === "object"
    ? candidate.resourceDirectory
    : base.resourceDirectory;
  const normalizeResources = (items: unknown) =>
    Array.isArray(items)
      ? items.filter(
          (item): item is { label: string; href: string; description: string } =>
            Boolean(item) && typeof item === "object" && typeof item.label === "string" && typeof item.href === "string" && typeof item.description === "string"
        )
      : [];

  return {
    summary: typeof candidate.summary === "string" && candidate.summary.trim() ? candidate.summary : base.summary,
    intentSignal: typeof candidate.intentSignal === "string" && candidate.intentSignal.trim() ? candidate.intentSignal : base.intentSignal,
    validatingSentences: Array.isArray(candidate.validatingSentences) && candidate.validatingSentences.length
      ? candidate.validatingSentences.filter((item): item is string => typeof item === "string")
      : base.validatingSentences,
    behavioralPatterns: Array.isArray(candidate.behavioralPatterns) && candidate.behavioralPatterns.length
      ? candidate.behavioralPatterns.filter((item): item is string => typeof item === "string")
      : base.behavioralPatterns,
    quantifiedIndicators: Array.isArray(candidate.quantifiedIndicators) && candidate.quantifiedIndicators.length
      ? candidate.quantifiedIndicators.filter(
          (item): item is { indicator: string; score: number; interpretation: string } =>
            Boolean(item) && typeof item === "object" && typeof item.indicator === "string" && typeof item.score === "number" && typeof item.interpretation === "string"
        )
      : base.quantifiedIndicators,
    mindMapMarkdown: typeof candidate.mindMapMarkdown === "string" && candidate.mindMapMarkdown.trim()
      ? candidate.mindMapMarkdown
      : base.mindMapMarkdown,
    evidenceBackedInterventions: Array.isArray(candidate.evidenceBackedInterventions) && candidate.evidenceBackedInterventions.length
      ? candidate.evidenceBackedInterventions.filter((item): item is string => typeof item === "string")
      : base.evidenceBackedInterventions,
    clinicalReferences: Array.isArray(candidate.clinicalReferences) ? normalizeResources(candidate.clinicalReferences) : base.clinicalReferences,
    resourceDirectory: {
      immediateCrisis: normalizeResources(resourceDirectory.immediateCrisis),
      therapyDirectories: normalizeResources(resourceDirectory.therapyDirectories),
      supportGroups: normalizeResources(resourceDirectory.supportGroups),
      selfGuided: normalizeResources(resourceDirectory.selfGuided)
    }
  };
}
