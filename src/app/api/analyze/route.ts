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

    const openRouterApiKey = process.env.OPENROUTER_API_KEY?.trim();
    const openRouterModel = process.env.OPENROUTER_MODEL?.trim() || "openai/gpt-4o-mini";

    if (!openRouterApiKey) {
      const fallback = normalizeInsight(null);
      return NextResponse.json(
        {
          insight: fallback,
          source: "fallback",
          note: "OpenRouter is not configured yet. Add OPENROUTER_API_KEY in your environment to enable live analysis."
        },
        { status: 200 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + openRouterApiKey,
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL?.trim() || "http://localhost:3000",
        "X-Title": "Undercurrent"
      },
      body: JSON.stringify({
        model: openRouterModel,
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
          note: "OpenRouter was unavailable, so a grounded local summary was returned."
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
      source: "openrouter"
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
