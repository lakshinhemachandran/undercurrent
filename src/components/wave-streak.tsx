type WaveStreakProps = {
  streakDays: number;
};

export function WaveStreak({ streakDays }: WaveStreakProps) {
  const bands = Math.max(4, Math.min(12, Math.ceil(streakDays / 3) + 3));

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Wave streak</p>
          <p className="mt-1 text-sm text-slate-300">The shape gets calmer the longer you keep showing up.</p>
        </div>
        <div className="font-display text-3xl text-slate-50">{String(streakDays).padStart(2, "0")}</div>
      </div>
      <div className="mt-5 grid grid-cols-12 gap-2">
        {Array.from({ length: bands }).map((_, index) => (
          <span
            key={index}
            className="rounded-full bg-gradient-to-t from-cyan-400/25 via-teal-300/50 to-cyan-200/90 animate-floaty"
            style={{ height: `${24 + index * 8}px`, animationDelay: `${index * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}
