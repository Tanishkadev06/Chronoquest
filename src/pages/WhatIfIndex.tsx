import { useNavigate } from 'react-router-dom';
import { GitBranch, ChevronRight, Shield, TrendingUp, Heart, Lock } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useGameStore } from '../store/gameStore';
import NavBar from '../components/NavBar';

const difficultyColors: Record<string, { bg: string; text: string; border: string }> = {
  Easy: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  Medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  Hard: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
};

export default function WhatIfIndex() {
  const navigate = useNavigate();
  const level = useGameStore((s) => s.level);

  const scenarios = lessons.filter((l) => l.whatIf);

  return (
    <div className="min-h-screen bg-[#06060b] pb-28 max-w-md mx-auto">
      {/* Hero header */}
      <div className="relative overflow-hidden px-5 pt-14 pb-8 bg-gradient-to-br from-[#0a0a18] to-[#06060b] border-b border-white/[0.04]">
        <div className="absolute top-0 right-0 w-56 h-56 bg-blue-500/[0.06] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/[0.04] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/[0.03] rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-3 animate-fade-down">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-2 border border-blue-500/15">
              <GitBranch size={22} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-[26px] font-black text-white tracking-tight">What If?</h1>
              <p className="text-white/30 text-[11px] font-medium">Rewrite history with your choices</p>
            </div>
          </div>

          <p className="text-white/40 text-[13px] leading-relaxed animate-fade-up stagger-1">
            Explore alternate timelines. Make decisions that change the course of history. Every choice reshapes the world.
          </p>
        </div>
      </div>

      {/* Scenario grid */}
      <div className="px-5 py-6 space-y-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25">Scenarios</h2>
          <span className="text-[10px] text-white/20 font-semibold">{scenarios.length} available</span>
        </div>

        {scenarios.map((lesson, idx) => {
          const wi = lesson.whatIf!;
          const locked = lesson.requiredLevel > level;
          const diff = difficultyColors[wi.difficulty] || difficultyColors.Medium;

          return (
            <button
              key={lesson.id}
              onClick={() => !locked && navigate(`/what-if/${lesson.id}`)}
              disabled={locked}
              className={`w-full text-left rounded-3xl border transition-all duration-300 card-lift animate-fade-up stagger-${Math.min(idx + 1, 6)} ${
                locked
                  ? 'border-white/[0.04] bg-white/[0.01] opacity-50 cursor-not-allowed'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-blue-500/25 hover:bg-white/[0.04]'
              }`}
            >
              <div className="p-5">
                {/* Top row: year + difficulty */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400/70 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/15">
                    {wi.year}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${diff.text} ${diff.bg} px-2.5 py-1 rounded-full border ${diff.border}`}>
                    {wi.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-bold text-white mb-1.5 leading-snug">
                  {locked ? <span className="flex items-center gap-2"><Lock size={14} className="text-white/30" />{wi.title}</span> : wi.title}
                </h3>

                {/* Description */}
                <p className="text-[12px] text-white/40 leading-relaxed mb-4">{wi.description}</p>

                {/* Impact preview */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Shield size={11} className="text-blue-400/60" />
                    <span className="text-[10px] text-white/30 font-semibold tabular-nums">{wi.impact.stability}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={11} className="text-emerald-400/60" />
                    <span className="text-[10px] text-white/30 font-semibold tabular-nums">{wi.impact.growth}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart size={11} className="text-red-400/60" />
                    <span className="text-[10px] text-white/30 font-semibold tabular-nums">{wi.impact.humanImpact}%</span>
                  </div>
                </div>

                {/* Bottom row: XP + CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                  <div className="flex items-center gap-1.5">
                    <div className="bg-amber-500/10 rounded-md px-2 py-0.5">
                      <span className="text-[10px] text-amber-400/70 font-bold">+{wi.xpReward} XP</span>
                    </div>
                    <span className="text-[10px] text-white/20 font-medium">{wi.decisions.length} decisions</span>
                  </div>
                  {locked ? (
                    <span className="text-[10px] text-white/25 font-semibold">Level {lesson.requiredLevel} required</span>
                  ) : (
                    <div className="flex items-center gap-1 text-blue-400">
                      <span className="text-[11px] font-bold">Explore</span>
                      <ChevronRight size={14} strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <NavBar />
    </div>
  );
}
