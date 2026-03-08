// Server Component — ingen interaktivitet, ren visning.

type Props = {
  userName: string;
  programName: string;
  currentWeek: number;
  totalWeeks: number;
};

export default function ProgressHeader({
  userName,
  programName,
  currentWeek,
  totalWeeks,
}: Props) {
  const pct = Math.round((currentWeek / totalWeeks) * 100);

  return (
    <header className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Hei {userName}, du er i rute! 🔥
      </h1>
      <p className="text-neutral-500 mb-6">Program: {programName}</p>

      <div className="bg-white p-5 rounded-2xl border border-neutral-200/60 shadow-sm flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-neutral-100 border-4 border-neutral-900 flex items-center justify-center shrink-0">
          <span className="font-bold text-xl">U{currentWeek}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>Uke {currentWeek} av {totalWeeks}</span>
            <span className="text-neutral-400">{pct}% Fullført</span>
          </div>
          <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-neutral-900 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
