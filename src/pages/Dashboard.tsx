import { useNavigate } from 'react-router-dom';
import { Zap, Clock, ChevronRight, BookOpen, Flame, GitBranch, Play } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { lessons, dailyChallenge } from '../data/lessons';
import XPBar from '../components/XPBar';
import StreakBadge from '../components/StreakBadge';
import LessonCard from '../components/LessonCard';
import NavBar from '../components/NavBar';
import LevelUpCelebration from '../components/LevelUpCelebration';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userName, xp, level, streak, progress, dailyChallengeCompleted, dailyChallengeDate, pendingLevelUp, clearLevelUp } = useGameStore();

  const today = new Date().toDateString();
  const challengeDoneToday = dailyChallengeCompleted && dailyChallengeDate === today;

  const nextLesson = lessons.find((l) => !progress[l.id]?.completed && level >= l.requiredLevel);
  const allLessons = lessons;
  const completedCount = Object.values(progress).filter((p) => p.completed).length;
  const whatIfCount = lessons.filter((l) => l.whatIf).length;

  return (
    <div className="min-h-screen bg-[#06060b] pb-28 max-w-md mx-auto">
      {pendingLevelUp && <LevelUpCelebration level={pendingLevelUp} onDone={clearLevelUp} />}

      {/* Hero header */}
      <div className="relative overflow-hidden px-5 pt-14 pb-8 noise-overlay">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.05] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/[0.04] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/[0.02] rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Greeting row */}
          <div className="flex items-start justify-between mb-6 animate-fade-down">
            <div>
              <p className="text-white/25 text-[11px] uppercase tracking-[0.2em] font-semibold mb-1.5">Welcome back</p>
              <h1 className="text-[28px] font-black text-white tracking-tight">{userName || 'Historian'}</h1>
            </div>
            <div className="animate-bounce-in stagger-2">
              <StreakBadge streak={streak} />
            </div>
          </div>

          {/* Hero tagline */}
          <div className="mb-7 animate-fade-up stagger-1">
            <p className="text-white/60 text-[18px] font-semibold leading-snug mb-1.5">
              History, but you <span className="gradient-text-amber font-black">live it</span>.
            </p>
            <p className="text-white/30 text-[13px] leading-relaxed">Make decisions that shape the course of history.</p>
          </div>

          {/* XP Bar */}
          <div className="animate-fade-up stagger-2">
            <XPBar xp={xp} level={level} />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2.5 mt-5 animate-fade-up stagger-3">
            {[
              { label: 'Total XP', value: xp.toLocaleString(), icon: Zap, color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-500/5', border: 'border-amber-500/15' },
              { label: 'Lessons', value: `${completedCount}/${allLessons.length}`, icon: BookOpen, color: 'text-blue-400', bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/15' },
              { label: 'Streak', value: `${streak}`, icon: Flame, color: 'text-orange-400', bg: 'from-orange-500/10 to-orange-500/5', border: 'border-orange-500/15' },
            ].map(({ label, value, icon: Icon, color, bg, border }) => (
              <div key={label} className={`relative overflow-hidden bg-gradient-to-br ${bg} border ${border} rounded-2xl p-3.5 text-center card-shadow`}>
                <Icon size={15} className={`${color} mx-auto mb-1.5`} fill="currentColor" />
                <div className={`text-[17px] font-black ${color} tabular-nums leading-none`}>{value}</div>
                <div className="text-[9px] text-white/25 mt-1 font-semibold uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6">
        {/* What If Mode Highlight Card */}
        <div className="animate-fade-up stagger-4">
          <div
            onClick={() => navigate('/what-if')}
            className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 via-[#0a0a18] to-cyan-900/10 cursor-pointer card-lift card-shadow group"
          >
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/[0.08] rounded-full blur-3xl group-hover:bg-blue-500/[0.12] transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/[0.05] rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/[0.03] rounded-full blur-3xl animate-glow-pulse" />

            <div className="relative z-10 p-5 flex items-center gap-4">
              <div className="rounded-2xl p-3.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/25 animate-border-glow shrink-0">
                <GitBranch size={24} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-white text-[16px]">What If Mode</h3>
                  <span className="text-[9px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-blue-500/25">
                    {whatIfCount} scenarios
                  </span>
                </div>
                <p className="text-[12px] text-white/40 leading-relaxed">Rewrite history by making different decisions</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-3 shrink-0 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                <Play size={18} className="text-white" fill="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="animate-fade-up stagger-5">
          <div
            onClick={() => !challengeDoneToday && navigate('/daily-challenge')}
            className={`relative overflow-hidden rounded-3xl border transition-all duration-300 card-lift card-shadow ${
              challengeDoneToday
                ? 'border-emerald-500/15 bg-gradient-to-br from-emerald-900/10 to-emerald-900/5 cursor-default'
                : 'border-amber-500/20 bg-gradient-to-br from-amber-900/15 to-orange-900/5 cursor-pointer'
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.06] rounded-full blur-2xl" />
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
          <div className="animate-fade-up stagger-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Continue Learning</h2>
            <div
              onClick={() => navigate(`/lesson/${nextLesson.id}`)}
              className="relative overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-br from-blue-900/15 to-cyan-900/5 p-5 flex items-center gap-4 cursor-pointer card-lift card-shadow group"
            >
              <div className="absolute inset-0">
                <img src={nextLesson.imageUrl} alt="" className="w-full h-full object-cover opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500" />
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
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3.5 shrink-0 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                <Play size={20} className="text-white" fill="white" />
              </div>
            </div>
          </div>
        )}

        {/* All Lessons */}
        <div className="animate-fade-up stagger-7">
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
