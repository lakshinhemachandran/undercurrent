"use client";

import { useEffect, useState } from "react";

type JournalEditorProps = {
  initialValue?: string;
};

export function JournalEditor({ initialValue = "" }: JournalEditorProps) {
  const [note, setNote] = useState(initialValue);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNote(initialValue);
  }, [initialValue]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError(null);

    try {
      const response = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "saveJournal", note })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Could not save journal note.");
      }

      setSaved(true);
      window.setTimeout(() => setSaved(false), 1800);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save journal note.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Therapy journal</p>
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Capture a breakthrough, a therapist prompt, or the thought you want to revisit later."
        className="mt-4 min-h-40 w-full rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-500 focus:border-teal-300/50"
      />
      <div className="mt-4 flex items-center gap-3">
        <button onClick={handleSave} disabled={saving} className="rounded-full bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300">
          {saving ? "Saving..." : "Save journal note"}
        </button>
        {saved ? <span className="text-sm text-teal-200">Saved to dashboard</span> : null}
      </div>
      {error ? <p className="mt-3 text-sm text-rose-100">{error}</p> : null}
    </div>
  );
}
