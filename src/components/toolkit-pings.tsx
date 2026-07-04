type ToolkitPingsProps = {
  unlockedCount: number;
};

const toolkit = ["4-7-8 breathing loop", "soft focus soundscape", "body scan animation", "night mode theme", "journal prompt pack"];

export function ToolkitPings({ unlockedCount }: ToolkitPingsProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Accountability pings</p>
      <p className="mt-2 text-sm text-slate-300">Consistency unlocks coping tools without turning the app into a pressure machine.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {toolkit.slice(0, unlockedCount).map((item) => (
          <span key={item} className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm text-teal-100">
            {item}
          </span>
        ))}
        {toolkit.slice(unlockedCount).map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-slate-400">
            Locked: {item}
          </span>
        ))}
      </div>
    </div>
  );
}
