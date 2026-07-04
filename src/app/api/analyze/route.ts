import { NextResponse } from "next/server";
import { buildAnalysisMessages, normalizeInsight } from "@/lib/analysis";
import type { QuizPayload } from "@/lib/types";

export const runtime = "nodejs";

function cleanJsonContent(content: string) {
  const trimmed = content.trim();
  if (!trimmed) {
    return trimmed;
  }

  if (trimmed.startsWith("```")) {
    return trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }

  return trimmed;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<QuizPayload>;
    const payload: QuizPayload = {
      answers: body.answers ?? {},
      whyText: body.whyText ?? "",
      metrics: body.metrics ?? {
        sleepDisruption: 2,
        isolation: 2,
        emotionalWeight: 3,
        stressCycles: 2,
        overwhelm: 2,
        energy: 3
      }
    };

    const response = await fetch("https://g4f.space/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: buildAnalysisMessages(payload)
      })
    });

    if (!response.ok) {
      const fallback = normalizeInsight(null);
      return NextResponse.json(
        {
          insight: fallback,
          source: "fallback",
          note: "The external analysis service was unavailable, so a grounded local summary was returned."
        },
        { status: 200 }
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(cleanJsonContent(content));

    return NextResponse.json({
      insight: normalizeInsight(parsed),
      source: "g4f"
    });
  } catch {
    return NextResponse.json(
      {
        insight: normalizeInsight(null),
        source: "fallback",
        note: "The analysis could not be completed, so Undercurrent used its local safe summary instead."
      },
      { status: 200 }
    );
  }
}
