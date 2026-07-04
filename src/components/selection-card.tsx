"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectionCardProps = {
  title: string;
  subtitle?: string;
  selected?: boolean;
  onClick: () => void;
};

export function SelectionCard({ title, subtitle, selected, onClick }: SelectionCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-3xl border p-4 text-left transition",
        "border-white/10 bg-white/[0.04] hover:border-teal-300/40 hover:bg-white/[0.07]",
        selected && "border-teal-300/70 bg-teal-300/10 shadow-glow"
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-transparent to-indigo-400/10 opacity-0 transition group-hover:opacity-100" />
      <span className="relative flex items-start justify-between gap-3">
        <span>
          <span className="block text-base font-semibold text-slate-50">{title}</span>
          {subtitle ? <span className="mt-1 block text-sm leading-5 text-slate-300">{subtitle}</span> : null}
        </span>
        <span className={cn("mt-1 flex h-7 w-7 items-center justify-center rounded-full border", selected ? "border-teal-300 bg-teal-300 text-slate-950" : "border-white/10 bg-white/5 text-transparent")}>
          <Check className="h-4 w-4" />
        </span>
      </span>
    </motion.button>
  );
}
