import { Trophy, Flame, Zap, Crown } from 'lucide-react';
import { mockLeaderboard } from '../data/lessons';
import { useGameStore } from '../store/gameStore';
import NavBar from '../components/NavBar';

export default function Leaderboard() {
  const { userName, xp, level, streak } = useGameStore();

  const myRank = mockLeaderboard.findIndex((e) => e.xp < xp);
  const actualRank = myRank === -1 ? mockLeaderboard.length + 1 : myRank + 1;

  const fullBoard: Array<{ rank: number; name: string; avatar: string; xp: number; level: number; streak: number; isCurrentUser?: boolean }> = [
    ...mockLeaderboard.slice(0, actualRank - 1).map((e) => ({ ...e, isCurrentUser: false })),
    {
      rank: actualRank,
      name: userName || 'You',
      avatar: (userName || 'Y').substring(0, 2).toUpperCase(),
      xp,
      level,
      streak,
      isCurrentUser: true,
    },
    ...mockLeaderboard.slice(actualRank - 1).map((e) => ({ ...e, isCurrentUser: false })),
  ].map((e, i) => ({ ...e, rank: i + 1 }));

  const top3 = fullBoard.slice(0, Math.min(3, fullBoard.length));
  const rest = fullBoard.slice(3);

  const podiumSlots = [top3[1] ?? null, top3[0] ?? null, top3[2] ?? null];

  const podiumStyles: Record<number, { height: string; color: string; bg: string; border: string; medal: string }> = {
    1: { height: 'h-36', color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/25', medal: 'text-2xl' },
    2: { height: 'h-28', color: 'text-slate-300', bg: 'bg-slate-500/10', border: 'border-slate-500/20', medal: 'text-xl' },
    3: { height: 'h-24', color: 'text-orange-400', bg: 'bg-orange-600/10', border: 'border-orange-500/20', medal: 'text-lg' },
  };

  return (
    <div className="min-h-screen bg-[#06060b] pb-28 max-w-md mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden px-5 pt-14 pb-6 bg-gradient-to-br from-[#0a0a18] to-[#06060b] border-b border-white/[0.04]">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.04] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="flex items-center gap-2.5 mb-1">
          <Trophy size={22} className="text-amber-400" fill="currentColor" />
          <h1 className="text-[24px] font-black text-white tracking-tight">Leaderboard</h1>
        </div>
        <p className="text-white/30 text-[13px]">Top historians of ChronoQuest</p>
      </div>

      {/* Podium */}
      <div className="px-5 py-8">
        <div className="flex items-end justify-center gap-4 h-56 mb-8">
          {podiumSlots.map((entry, idx) => {
            if (!entry) return <div key={idx} className="w-24" />;
            const rank = entry.rank;
            const style = podiumStyles[rank] ?? podiumStyles[3];
            const isFirst = rank === 1;

            return (
              <div key={rank} className={`flex flex-col items-center gap-2 w-24 ${style.height} animate-fade-up stagger-${idx + 1}`}>
                {isFirst && (
                  <Crown size={22} className="text-amber-400 mb-0.5 animate-float" fill="currentColor" />
                )}

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-black border-2 transition-all ${
                  entry.isCurrentUser
                    ? 'bg-blue-500/25 border-blue-500/50 text-blue-300 shadow-lg shadow-blue-500/20'
                    : `${style.bg} ${style.border} ${style.color}`
                } ${isFirst ? 'shadow-lg shadow-amber-500/20' : ''}`}>
                  {entry.avatar}
                </div>

                <div className="text-center">
                  <div className={`text-[11px] font-bold truncate w-20 text-center ${entry.isCurrentUser ? 'text-blue-300' : 'text-white/80'}`}>
                    {entry.name}
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <Zap size={9} className="text-amber-400" fill="currentColor" />
                    <span className="text-[10px] text-amber-400 font-bold tabular-nums">{entry.xp.toLocaleString()}</span>
                  </div>
                </div>

                <div className={`flex-1 w-full rounded-t-2xl border ${style.bg} ${style.border} flex items-start justify-center pt-3 animate-podium-rise`}>
                  <span className={style.medal}>
                    {rank === 1 ? '\u{1F947}' : rank === 2 ? '\u{1F948}' : '\u{1F949}'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rest of leaderboard */}
        <div className="space-y-2">
          {rest.map((entry, idx) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 card-lift animate-fade-up stagger-${Math.min(idx + 4, 8)} card-shadow ${
                entry.isCurrentUser
                  ? 'border-blue-500/20 bg-blue-900/[0.08]'
                  : 'border-white/[0.05] bg-white/[0.01]'
              }`}
            >
              <span className={`w-7 text-center text-[13px] font-black tabular-nums ${
                entry.isCurrentUser ? 'text-blue-400' : 'text-white/20'
              }`}>
                {entry.rank}
              </span>

              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black border ${
                entry.isCurrentUser
                  ? 'bg-blue-500/25 border-blue-500/40 text-blue-300'
                  : 'bg-white/[0.04] border-white/[0.08] text-white/50'
              }`}>
                {entry.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className={`text-[13px] font-bold truncate ${entry.isCurrentUser ? 'text-blue-300' : 'text-white'}`}>
                  {entry.name} {entry.isCurrentUser && <span className="text-[10px] text-blue-400/60 font-medium">(you)</span>}
                </div>
                <div className="flex items-center gap-2.5 mt-0.5">
                  <span className="text-[10px] text-white/20 font-medium">Lv.{entry.level}</span>
                  <div className="flex items-center gap-0.5">
                    <Flame size={9} className="text-orange-400" fill="currentColor" />
                    <span className="text-[10px] text-orange-400 font-semibold">{entry.streak}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-500/[0.06] rounded-xl px-2.5 py-1.5">
                <Zap size={12} className="text-amber-400" fill="currentColor" />
                <span className="text-[12px] font-bold text-amber-400 tabular-nums">{entry.xp.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NavBar />
    </div>
  );
}
