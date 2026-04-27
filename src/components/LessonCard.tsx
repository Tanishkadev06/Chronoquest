import { Lock, Star, Zap, Clock, GitBranch } from 'lucide-react';
import type { Lesson, UserProgress } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  progress?: UserProgress;
  userLevel: number;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  'Ancient': 'from-amber-600/80 to-yellow-700/80',
  'Medieval': 'from-slate-500/80 to-gray-600/80',
  'Modern': 'from-blue-600/80 to-cyan-700/80',
  'Indian History': 'from-orange-600/80 to-red-700/80',
};

const categoryBadge: Record<string, string> = {
  'Ancient': 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  'Medieval': 'bg-slate-400/10 text-slate-300 border-slate-400/20',
  'Modern': 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'Indian History': 'bg-orange-500/15 text-orange-400 border-orange-500/25',
};

export default function LessonCard({ lesson, progress, userLevel, onClick }: LessonCardProps) {
  const locked = userLevel < lesson.requiredLevel;
  const completed = progress?.completed ?? false;

  return (
    <div
      onClick={!locked ? onClick : undefined}
      className={`relative rounded-3xl overflow-hidden transition-all duration-300 card-lift card-shadow group ${
        locked
          ? 'opacity-50 cursor-not-allowed saturate-50'
          : 'cursor-pointer'
      }`}
    >
      {/* Image header */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={lesson.imageUrl}
          alt={lesson.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${categoryColors[lesson.category]} mix-blend-multiply opacity-70`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060b] via-[#06060b]/50 to-transparent" />

        {/* Completed badge */}
        {completed && (
          <div className="absolute top-3 right-3 animate-bounce-in">
            <div className="bg-emerald-500 rounded-full p-2 shadow-lg shadow-emerald-500/50">
              <Star size={14} fill="white" className="text-white" />
            </div>
          </div>
        )}

        {/* What If badge */}
        {lesson.whatIf && !locked && (
          <div className="absolute top-3 left-3">
            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 border border-blue-500/25 px-2 py-1 rounded-full flex items-center gap-1">
              <GitBranch size={8} />
              What If
            </span>
          </div>
        )}

        {/* Lock overlay */}
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                <Lock size={22} className="text-white/40" />
              </div>
              <span className="text-[11px] text-white/40 font-semibold">Level {lesson.requiredLevel}</span>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border ${categoryBadge[lesson.category]}`}>
            {lesson.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#0a0a12] border-t border-white/[0.04] p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-bold text-white text-[15px] leading-snug">{lesson.title}</h3>
          <span className="text-[11px] text-white/25 font-medium shrink-0 mt-0.5">{lesson.era}</span>
        </div>
        <p className="text-[12px] text-white/35 mb-4 line-clamp-2 leading-relaxed">{lesson.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="bg-amber-500/15 rounded-lg p-1">
              <Zap size={11} className="text-amber-400" fill="currentColor" />
            </div>
            <span className="text-[11px] text-amber-400 font-bold">+{lesson.xpReward} XP</span>
          </div>
          {completed ? (
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={9}
                    className={i < Math.min(progress?.score ?? 0, 5) ? 'text-amber-400' : 'text-white/10'}
                    fill={i < Math.min(progress?.score ?? 0, 5) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>
          ) : !locked ? (
            <div className="flex items-center gap-1 text-white/20">
              <Clock size={10} />
              <span className="text-[10px] font-medium">~4 min</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
