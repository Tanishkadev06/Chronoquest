import { useNavigate } from 'react-router-dom';
import { Zap, Clock, ChevronRight, BookOpen, Flame } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { lessons, dailyChallenge } from '../data/lessons';
import XPBar from '../components/XPBar';
import StreakBadge from '../components/StreakBadge';
import LessonCard from '../components/LessonCard';
import NavBar from '../components/NavBar';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userName, xp, level, streak, progress, dailyChallengeCompleted, dailyChallengeDate } = useGameStore();

  const today = new Date().toDateString();
  const challengeDoneToday = dailyChallengeCompleted && dailyChallengeDate === today;

  const nextLesson = lessons.find((l) => !progress[l.id]?.completed && level >= l.requiredLevel);
  const allLessons = lessons;
  const completedCount = Object.values(progress).filter((p) => p.completed).length;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pb-28 max-w-md mx-auto">
      {/* Hero header */}
      <div className="relative overflow-hidden px-5 pt-14 pb-7">
        <div className="absolute top-0 right-0 w-56 h-56 bg-amber-500/[0.04] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative">
          <div className="flex items-start justify-between mb-6 animate-fade-down">
            <div>
              <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] font-semibold mb-1.5">Welcome back</p>
              <h1 className="text-[26px] font-black text-white tracking-tight">{userName || 'Historian'}</h1>
            </div>
            <div className="animate-bounce-in stagger-2">
              <StreakBadge streak={streak} />
            </div>
          </div>

          <div className="animate-fade-up stagger-1">
            <XPBar xp={xp} level={level} />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2.5 mt-6 animate-fade-up stagger-2">
            {[
              { label: 'Total XP', value: xp.toLocaleString(), icon: Zap, color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-500/5', border: 'border-amber-500/15' },
              { label: 'Lessons', value: `${completedCount}/${allLessons.length}`, icon: BookOpen, color: 'text-blue-400', bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/15' },
              { label: 'Streak', value: `${streak}`, icon: Flame, color: 'text-orange-400', bg: 'from-orange-500/10 to-orange-500/5', border: 'border-orange-500/15' },
            ].map(({ label, value, icon: Icon, color, bg, border }) => (
              <div key={label} className={`relative overflow-hidden bg-gradient-to-br ${bg} border ${border} rounded-2xl p-3.5 text-center`}>
                <Icon size={15} className={`${color} mx-auto mb-1.5`} fill="currentColor" />
                <div className={`text-[17px] font-black ${color} tabular-nums leading-none`}>{value}</div>
                <div className="text-[9px] text-white/25 mt-1 font-semibold uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 space-y-8">
        {/* Daily Challenge */}
        <div className="animate-fade-up stagger-3">
          <div
            onClick={() => !challengeDoneToday && navigate('/daily-challenge')}
            className={`relative overflow-hidden rounded-3xl border transition-all duration-400 card-lift ${
              challengeDoneToday
                ? 'border-emerald-500/15 bg-gradient-to-br from-emerald-900/10 to-emerald-900/5 cursor-default'
                : 'border-amber-500/20 bg-gradient-to-br from-amber-900/15 to-orange-900/5 cursor-pointer'
            }`}
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/[0.06] rounded-full blur-2xl" />
            <div className="relative p-5 flex items-center gap-4">
              <div className={`rounded-2xl p-3.5 transition-all duration-300 ${
                challengeDoneToday ? 'bg-emerald-500/15' : 'bg-amber-500/15 animate-pulse-glow'
              }`}>
                <Clock size={22} className={challengeDoneToday ? 'text-emerald-400' : 'text-amber-400'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white text-[15px]">{dailyChallenge.title}</h3>
                  {challengeDoneToday && (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Done</span>
                  )}
                </div>
                <p className="text-[12px] text-white/35 leading-relaxed">
                  {challengeDoneToday
                    ? 'Come back tomorrow for a new challenge!'
                    : `+${dailyChallenge.xpBonus} XP bonus \u2022 ${dailyChallenge.timeLimit}s timer`}
                </p>
              </div>
              {!challengeDoneToday && (
                <div className="bg-amber-500/20 rounded-xl p-2.5 shrink-0">
                  <ChevronRight size={16} className="text-amber-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        {nextLesson && (
          <div className="animate-fade-up stagger-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Continue Learning</h2>
            <div
              onClick={() => navigate(`/lesson/${nextLesson.id}`)}
              className="relative overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-br from-blue-900/15 to-cyan-900/5 p-5 flex items-center gap-4 cursor-pointer card-lift"
            >
              <div className="absolute inset-0">
                <img src={nextLesson.imageUrl} alt="" className="w-full h-full object-cover opacity-[0.06]" />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.15em] text-blue-400 font-bold mb-1.5">{nextLesson.category}</div>
                <h3 className="font-bold text-white text-[17px] leading-tight mb-1.5">{nextLesson.title}</h3>
                <p className="text-[12px] text-white/35 line-clamp-1 mb-2">{nextLesson.description}</p>
                <div className="flex items-center gap-1.5">
                  <div className="bg-amber-500/15 rounded-md p-0.5">
                    <Zap size={10} className="text-amber-400" fill="currentColor" />
                  </div>
                  <span className="text-[11px] text-amber-400 font-bold">+{nextLesson.xpReward} XP</span>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3.5 shrink-0 shadow-lg shadow-blue-500/25">
                <ChevronRight size={20} className="text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
        )}

        {/* All Lessons */}
        <div className="animate-fade-up stagger-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25">All Lessons</h2>
            <button
              onClick={() => navigate('/skill-tree')}
              className="text-[11px] text-amber-400/80 font-bold hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {allLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                progress={progress[lesson.id]}
                userLevel={level}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <NavBar />
    </div>
  );
}
