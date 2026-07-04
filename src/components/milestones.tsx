type MilestonesProps = {
  streakDays: number;
};

const milestones = [
  { label: "First Reflection Complete", unlockedAt: 1 },
  { label: "3-Session Streak", unlockedAt: 3 },
  { label: "1-Month Grounding Habit", unlockedAt: 30 }
];

export function Milestones({ streakDays }: MilestonesProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Healing milestones</p>
      <div className="mt-4 grid gap-3">
        {milestones.map((milestone) => {
          const unlocked = streakDays >= milestone.unlockedAt;
          return (
            <div key={milestone.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
              <div>
                <p className="font-medium text-slate-100">{milestone.label}</p>
                <p className="text-sm text-slate-400">{unlocked ? "Unlocked" : `Unlocks at day ${milestone.unlockedAt}`}</p>
              </div>
              <div className={`h-3 w-3 rounded-full ${unlocked ? "bg-teal-300 shadow-[0_0_0_6px_rgba(45,212,191,0.15)]" : "bg-slate-600"}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
