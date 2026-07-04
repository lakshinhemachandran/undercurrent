"use client";

import { motion } from "framer-motion";
import { clamp, cn } from "@/lib/utils";

type MoodGridProps = {
  moods: number[];
  onMoodTap: (value: number) => void;
  disabled?: boolean;
};

const moodLabels = [
  "Grounded",
  "Quiet",
  "Mixed",
  "Brightening",
  "Open"
];

export function MoodGrid({ moods, onMoodTap, disabled = false }: MoodGridProps) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3">
      {moodLabels.map((label, index) => {
        const value = index + 1;
        const isActive = moods[0] === value;
        const intensity = clamp(value * 18, 18, 90);
        return (
          <motion.button
            key={label}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onMoodTap(value)}
            disabled={disabled}
            className={cn("rounded-3xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-70", isActive ? "border-teal-300/60 bg-teal-300/10" : "border-white/10 bg-white/[0.04]")}
          >
            <div className="flex h-20 items-end gap-1">
              {Array.from({ length: 4 }).map((_, barIndex) => (
                <span
                  key={barIndex}
                  className="flex-1 rounded-full bg-gradient-to-t from-cyan-300/40 via-teal-300/70 to-indigo-300/90"
                  style={{ height: `${intensity + barIndex * 9}%` }}
                />
              ))}
            </div>
            <div className="mt-3 text-sm font-medium text-slate-100">{label}</div>
            <div className="text-xs text-slate-400">Level {value}</div>
          </motion.button>
        );
      })}
    </div>
  );
}
