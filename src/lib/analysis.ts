import type { QuizInsight, QuizPayload } from "@/lib/types";

export const analysisSystemPrompt = `You are a calm, empathetic peer advocate inside a teen self-reflection app called Undercurrent.
You must never provide a diagnosis, label, or medical advice.
You must only analyze the user's quiz patterns with validating, non-clinical language.
Return valid JSON only with this schema:
{
  "summary": string,
  "validatingSentences": string[],
  "behavioralPatterns": string[],
  "groundingTechniques": string[],
  "resourceRecommendations": [{ "label": string, "href": string, "description": string }]
}
Keep recommendations to reputable public resources. If the input suggests immediate danger, urge reaching out to emergency support and crisis resources without being dramatic.`;

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
    validatingSentences: [
      "It makes sense that you are looking for patterns instead of just trying to push through.",
      "You do not need to have everything figured out in one sitting."
    ],
    behavioralPatterns: ["Stress seems to cluster around energy dips, sleep disruption, and social withdrawal."],
    groundingTechniques: ["Slow exhale breathing for 90 seconds", "Name five things you can see", "Put one hand on your chest and one on your stomach"],
    resourceRecommendations: []
  };

  if (!value || typeof value !== "object") {
    return base;
  }

  const candidate = value as Partial<QuizInsight>;
  return {
    summary: typeof candidate.summary === "string" && candidate.summary.trim() ? candidate.summary : base.summary,
    validatingSentences: Array.isArray(candidate.validatingSentences) && candidate.validatingSentences.length
      ? candidate.validatingSentences.filter((item): item is string => typeof item === "string")
      : base.validatingSentences,
    behavioralPatterns: Array.isArray(candidate.behavioralPatterns) && candidate.behavioralPatterns.length
      ? candidate.behavioralPatterns.filter((item): item is string => typeof item === "string")
      : base.behavioralPatterns,
    groundingTechniques: Array.isArray(candidate.groundingTechniques) && candidate.groundingTechniques.length
      ? candidate.groundingTechniques.filter((item): item is string => typeof item === "string")
      : base.groundingTechniques,
    resourceRecommendations: Array.isArray(candidate.resourceRecommendations)
      ? candidate.resourceRecommendations.filter(
          (item): item is { label: string; href: string; description: string } =>
            Boolean(item) && typeof item === "object" && typeof item.label === "string" && typeof item.href === "string" && typeof item.description === "string"
        )
      : base.resourceRecommendations
  };
}
