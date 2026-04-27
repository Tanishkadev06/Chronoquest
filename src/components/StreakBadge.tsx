import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StreakBadge({ streak, size = 'md' }: StreakBadgeProps) {
  const sizes = {
    sm: { icon: 14, text: 'text-[11px]', padding: 'px-2.5 py-1', gap: 'gap-1' },
    md: { icon: 17, text: 'text-sm', padding: 'px-4 py-1.5', gap: 'gap-1.5' },
    lg: { icon: 24, text: 'text-lg', padding: 'px-5 py-2.5', gap: 'gap-2' },
  };

  const s = sizes[size];
  const hasStreak = streak > 0;
  const isHot = streak >= 7;

  return (
    <div className={`inline-flex items-center ${s.gap} rounded-full ${s.padding} transition-all duration-300 ${
      isHot
        ? 'bg-gradient-to-r from-red-500/25 to-orange-500/25 border border-red-500/40 shadow-glow-amber animate-pulse-glow'
        : hasStreak
        ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 animate-pulse-glow'
        : 'bg-white/[0.04] border border-white/10'
    }`}>
      <Flame
        size={s.icon}
        className={`transition-all duration-300 ${isHot ? 'text-red-400 animate-streak-fire' : hasStreak ? 'text-orange-400 animate-streak-fire' : 'text-white/20'}`}
        fill={hasStreak ? 'currentColor' : 'none'}
      />
      <span className={`font-extrabold tabular-nums ${s.text} ${isHot ? 'text-red-400' : hasStreak ? 'text-orange-400' : 'text-white/25'}`}>
        {streak}
      </span>
      {isHot && size !== 'sm' && (
        <span className="text-[9px] font-bold text-red-400/70 uppercase tracking-wider">on fire</span>
      )}
    </div>
  );
}
