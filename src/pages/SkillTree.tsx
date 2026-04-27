import { useNavigate } from 'react-router-dom';
import { Lock, Star, Zap, CheckCircle, BookOpen } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useGameStore } from '../store/gameStore';
import NavBar from '../components/NavBar';

const categoryOrder = ['Indian History', 'Ancient', 'Medieval', 'Modern'];

const categoryMeta: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  'Indian History': {
    color: 'text-orange-400',
    bg: 'bg-orange-500/[0.06]',
    border: 'border-orange-500/15',
    dot: 'bg-orange-500',
  },
  'Ancient': {
    color: 'text-amber-400',
    bg: 'bg-amber-500/[0.06]',
    border: 'border-amber-500/15',
    dot: 'bg-amber-500',
  },
  'Medieval': {
    color: 'text-slate-300',
    bg: 'bg-slate-400/[0.06]',
    border: 'border-slate-400/15',
    dot: 'bg-slate-400',
  },
  'Modern': {
    color: 'text-blue-400',
    bg: 'bg-blue-500/[0.06]',
    border: 'border-blue-500/15',
    dot: 'bg-blue-500',
  },
};

export default function SkillTree() {
  const navigate = useNavigate();
  const { level, progress } = useGameStore();

  const grouped = categoryOrder.reduce<Record<string, typeof lessons>>((acc, cat) => {
    acc[cat] = lessons.filter((l) => l.category === cat);
    return acc;
  }, {});

  const totalCompleted = Object.values(progress).filter((p) => p.completed).length;
  const totalLessons = lessons.length;

  return (
    <div className="min-h-screen bg-[#06060b] pb-28 max-w-md mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden px-5 pt-14 pb-6 bg-gradient-to-br from-[#0a0a18] to-[#06060b] border-b border-white/[0.04]">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.04] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="flex items-center gap-2.5 mb-2">
          <BookOpen size={20} className="text-amber-400" />
          <h1 className="text-[24px] font-black text-white tracking-tight">Skill Tree</h1>
        </div>
        <p className="text-white/30 text-[13px] mb-4">{totalCompleted} of {totalLessons} lessons completed</p>

        <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${(totalCompleted / totalLessons) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-9">
        {categoryOrder.map((category, catIdx) => {
          const cat = categoryMeta[category];
          const catLessons = grouped[category] || [];
          const catCompleted = catLessons.filter((l) => progress[l.id]?.completed).length;

          return (
            <div key={category} className={`animate-fade-up stagger-${Math.min(catIdx + 1, 6)}`}>
              {/* Category header */}
              <div className={`flex items-center gap-3 mb-5 ${cat.bg} border ${cat.border} rounded-2xl px-4 py-3.5 card-shadow`}>
                <div className={`w-3 h-3 rounded-full ${cat.dot} shrink-0`} />
                <span className={`font-bold text-[13px] ${cat.color} flex-1 tracking-wide`}>{category}</span>
                <span className="text-[11px] text-white/25 font-semibold tabular-nums">{catCompleted}/{catLessons.length}</span>
              </div>

              {/* Lesson nodes */}
              <div className="relative pl-6">
                {/* Vertical connector */}
                <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-white/10 via-white/[0.06] to-white/[0.02] rounded-full" />

                <div className="space-y-3">
                  {catLessons.map((lesson, idx) => {
                    const locked = level < lesson.requiredLevel;
                    const completed = progress[lesson.id]?.completed ?? false;
                    const score = progress[lesson.id]?.score ?? 0;

                    return (
                      <div key={lesson.id} className="relative flex items-start gap-3.5">
                        {/* Node dot */}
                        <div className={`relative z-10 mt-5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${
                          completed
                            ? 'bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-500/30'
                            : locked
                            ? 'bg-[#0a0a12] border-white/10'
                            : `${cat.dot} border-current shadow-md`
                        }`}>
                          {completed && <CheckCircle size={12} className="text-white" />}
                          {locked && <Lock size={8} className="text-white/20" />}
                          {!completed && !locked && (
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          )}
                        </div>

                        {/* Card */}
                        <div
                          onClick={() => !locked && navigate(`/lesson/${lesson.id}`)}
                          className={`flex-1 rounded-2xl border p-4 transition-all duration-300 card-shadow ${
                            locked
                              ? 'border-white/[0.04] bg-white/[0.01] opacity-40 cursor-not-allowed'
                              : completed
                              ? 'border-emerald-500/15 bg-emerald-900/[0.06] cursor-pointer card-lift'
                              : `${cat.border} bg-white/[0.02] cursor-pointer card-lift`
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${cat.color}`}>
                                  {lesson.era}
                                </span>
                                {idx === 0 && !completed && !locked && (
                                  <span className="text-[9px] bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full font-bold border border-blue-500/20 uppercase tracking-wider">
                                    Start
                                  </span>
                                )}
                              </div>
                              <h3 className="font-bold text-white text-[14px] leading-snug mb-1">{lesson.title}</h3>
                              <p className="text-[11px] text-white/30 line-clamp-1">{lesson.description}</p>
                            </div>

                            <div className="shrink-0 text-right">
                              {completed ? (
                                <div className="flex flex-col items-end gap-1.5">
                                  <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={10}
                                        className={i < score ? 'text-amber-400' : 'text-white/10'}
                                        fill={i < score ? 'currentColor' : 'none'}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Done</span>
                                </div>
                              ) : locked ? (
                                <span className="text-[10px] text-white/20 font-semibold">Lv.{lesson.requiredLevel}</span>
                              ) : (
                                <div className="flex items-center gap-1 bg-amber-500/10 rounded-lg px-2 py-1">
                                  <Zap size={10} className="text-amber-400" fill="currentColor" />
                                  <span className="text-[10px] text-amber-400 font-bold">{lesson.xpReward}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <NavBar />
    </div>
  );
}
