import { useNavigate } from 'react-router-dom';
import { Zap, BookOpen, Star, RotateCcw, ChevronRight, Award, Target } from 'lucide-react';
import { useGameStore, xpToNextLevel } from '../store/gameStore';
import { lessons } from '../data/lessons';
import XPBar from '../components/XPBar';
import StreakBadge from '../components/StreakBadge';
import NavBar from '../components/NavBar';

const categoryColors: Record<string, string> = {
  'Indian History': 'text-orange-400',
  'Ancient': 'text-amber-400',
  'Medieval': 'text-slate-300',
  'Modern': 'text-blue-400',
};

export default function Profile() {
  const navigate = useNavigate();
  const { userName, xp, level, streak, progress, totalLessonsCompleted, resetProgress } = useGameStore();
  const { percentage } = xpToNextLevel(xp, level);

  const completedLessons = lessons.filter((l) => progress[l.id]?.completed);
  const totalScore = completedLessons.reduce((sum, l) => sum + (progress[l.id]?.score ?? 0), 0);
  const avgScore = completedLessons.length > 0 ? (totalScore / completedLessons.length).toFixed(1) : '--';

  const initials = userName
    ? userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  function handleReset() {
    if (confirm('Reset all progress? This cannot be undone.')) {
      resetProgress();
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen bg-[#06060b] pb-28 max-w-md mx-auto">
      {/* Profile hero */}
      <div className="relative overflow-hidden px-5 pt-14 pb-8 border-b border-white/[0.04] noise-overlay">
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500/[0.04] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-500/[0.04] rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="relative flex items-center gap-5 mb-7 animate-fade-down">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full scale-125" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-2xl font-black text-black shadow-2xl shadow-amber-500/30">
              {initials}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-[#06060b] rounded-full p-1 border border-white/10">
              <div className="bg-amber-500 text-black text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center">
                {level}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-[22px] font-black text-white tracking-tight mb-1">{userName || 'Historian'}</h1>
            <p className="text-white/30 text-[12px] font-medium mb-2.5">ChronoQuest Explorer</p>
            <StreakBadge streak={streak} size="sm" />
          </div>
        </div>

        <div className="animate-fade-up stagger-1">
          <XPBar xp={xp} level={level} />
        </div>
      </div>

      <div className="px-5 py-6 space-y-7">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 animate-fade-up stagger-2">
          {[
            { icon: Zap, label: 'Total XP', value: xp.toLocaleString(), color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-500/5', border: 'border-amber-500/15' },
            { icon: BookOpen, label: 'Lessons Done', value: `${totalLessonsCompleted}`, color: 'text-blue-400', bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/15' },
            { icon: Target, label: 'Avg. Score', value: `${avgScore}/5`, color: 'text-emerald-400', bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/15' },
            { icon: Award, label: 'Level Progress', value: `${Math.round(percentage)}%`, color: 'text-orange-400', bg: 'from-orange-500/10 to-orange-500/5', border: 'border-orange-500/15' },
          ].map(({ icon: Icon, label, value, color, bg, border }) => (
            <div key={label} className={`relative overflow-hidden bg-gradient-to-br ${bg} border ${border} rounded-2xl p-4 card-shadow`}>
              <Icon size={18} className={`${color} mb-2.5`} />
              <div className={`text-[20px] font-black ${color} tabular-nums leading-none`}>{value}</div>
              <div className="text-[10px] text-white/25 mt-1.5 font-semibold uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>

        {/* Completed lessons */}
        {completedLessons.length > 0 && (
          <div className="animate-fade-up stagger-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Completed Lessons</h2>
            <div className="space-y-2.5">
              {completedLessons.map((lesson) => {
                const p = progress[lesson.id];
                return (
                  <div
                    key={lesson.id}
                    onClick={() => navigate(`/lesson/${lesson.id}`)}
                    className="flex items-center gap-3.5 p-3.5 glass rounded-2xl cursor-pointer card-lift card-shadow"
                  >
                    <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/[0.06]">
                      <img src={lesson.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${categoryColors[lesson.category]}`}>{lesson.category}</div>
                      <div className="text-[13px] font-bold text-white truncate mt-0.5">{lesson.title}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-0.5 justify-end mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={9}
                            className={i < Math.min(p?.score ?? 0, 5) ? 'text-amber-400' : 'text-white/10'}
                            fill={i < Math.min(p?.score ?? 0, 5) ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <Zap size={9} className="text-amber-400" fill="currentColor" />
                        <span className="text-[10px] text-amber-400 font-bold">+{p?.xpEarned}</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-white/15 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reset */}
        <div className="pt-2 animate-fade-up stagger-4">
          <button
            onClick={handleReset}
            className="w-full flex items-center gap-3 p-4 bg-red-900/[0.08] border border-red-500/15 rounded-2xl text-red-400/70 hover:bg-red-900/15 hover:text-red-400 transition-all text-[13px] font-semibold"
          >
            <RotateCcw size={16} />
            Reset All Progress
          </button>
        </div>
      </div>

      <NavBar />
    </div>
  );
}
