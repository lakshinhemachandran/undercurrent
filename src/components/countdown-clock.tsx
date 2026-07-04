"use client";

import { useEffect, useState } from "react";
import { formatCountdown } from "@/lib/utils";

type CountdownClockProps = {
  targetIso: string;
};

export function CountdownClock({ targetIso }: CountdownClockProps) {
  const [parts, setParts] = useState(() => formatCountdown(targetIso));

  useEffect(() => {
    const timer = window.setInterval(() => setParts(formatCountdown(targetIso)), 60_000);
    setParts(formatCountdown(targetIso));
    return () => window.clearInterval(timer);
  }, [targetIso]);

  return (
    <div className="grid grid-cols-3 gap-3 text-center">
      {[
        { label: "Days", value: parts.days },
        { label: "Hours", value: parts.hours },
        { label: "Minutes", value: parts.mins }
      ].map((part) => (
        <div key={part.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <div className="font-display text-3xl text-slate-50">{String(part.value).padStart(2, "0")}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{part.label}</div>
        </div>
      ))}
    </div>
  );
}
