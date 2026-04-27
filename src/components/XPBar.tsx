import { xpToNextLevel } from '../store/gameStore';

interface XPBarProps {
  xp: number;
  level: number;
  compact?: boolean;
}

export default function XPBar({ xp, level, compact = false }: XPBarProps) {
  const { current, required, percentage } = xpToNextLevel(xp, level);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-amber-400 font-extrabold tracking-wide">Lv.{level}</span>
        <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-full transition-all duration-1000 ease-out relative animate-progress-fill"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
          </div>
        </div>
        <span className="text-[10px] text-white/30 font-medium tabular-nums">{current}/{required}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-extrabold text-amber-400 tracking-wide">Level {level}</span>
        <span className="text-[11px] text-white/35 font-medium tabular-nums">{current} / {required} XP</span>
      </div>
      <div className="relative h-4 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-full transition-all duration-1000 ease-out relative animate-progress-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-white/30 to-transparent rounded-r-full" />
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-white/25 font-medium">
        <span>{xp.toLocaleString()} total XP</span>
        <span>{required - current} XP to next</span>
      </div>
    </div>
  );
}
