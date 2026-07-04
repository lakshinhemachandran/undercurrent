"use client";

import { useState, useTransition } from "react";
import { HeartPulse } from "lucide-react";
import { MoodGrid } from "@/components/mood-grid";

type MoodMatrixPanelProps = {
  moods: number[];
};

export function MoodMatrixPanel({ moods }: MoodMatrixPanelProps) {
  const [currentMoods, setCurrentMoods] = useState(moods);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function saveMood(value: number) {
    const response = await fetch("/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "saveMood", mood: value })
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(payload?.error ?? "Could not save mood.");
    }
  }

  return (
    <div className="glass-card rounded-[2rem] p-5">
      <div className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-400">
        <HeartPulse className="h-4 w-4 text-teal-300" /> Mood matrix
      </div>
      <p className="mt-2 text-sm text-slate-300">Tap a level to record how today feels. It uses abstract states instead of smiley faces.</p>
      <div className="mt-4">
        <MoodGrid
          moods={currentMoods}
          disabled={isPending}
          onMoodTap={(value) => {
            setError(null);
            setCurrentMoods((previous) => [value, ...previous.slice(1)]);
            startTransition(() => {
              void saveMood(value).catch((saveError) => setError(saveError instanceof Error ? saveError.message : "Could not save mood."));
            });
          }}
        />
      </div>
      {error ? <p className="mt-3 text-sm text-rose-100">{error}</p> : null}
    </div>
  );
}