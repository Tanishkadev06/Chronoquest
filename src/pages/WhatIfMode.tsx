import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, GitBranch, RotateCcw, Zap, Shield, TrendingUp, Heart } from 'lucide-react';
import { lessons } from '../data/lessons';
import NavBar from '../components/NavBar';

export default function WhatIfMode() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const lesson = lessons.find((l) => l.id === id);

  if (!lesson || !lesson.whatIf) {
    return (
      <div className="min-h-screen bg-[#06060b] flex items-center justify-center">
        <div className="text-white/40 text-center">
          <p className="text-lg font-bold mb-2">Scenario not found</p>
          <button onClick={() => navigate('/dashboard')} className="text-amber-400 underline">Go back</button>
        </div>
      </div>
    );
  }

  const wi = lesson.whatIf;

  const impactBars = [
    { label: 'Stability', value: wi.impact.stability, icon: Shield, color: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10' },
    { label: 'Growth', value: wi.impact.growth, icon: TrendingUp, color: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-500/10' },
    { label: 'Human Impact', value: wi.impact.humanImpact, icon: Heart, color: 'from-red-500 to-orange-400', bg: 'bg-red-500/10' },
  ];

  const timelineEffects = [
    { label: 'Immediate', text: wi.effects.immediate, color: 'text-amber-400', border: 'border-amber-500/20', bg: 'from-amber-900/15 to-amber-900/5' },
    { label: 'Mid-Term', text: wi.effects.midTerm, color: 'text-blue-400', border: 'border-blue-500/20', bg: 'from-blue-900/15 to-blue-900/5' },
    { label: 'Long-Term', text: wi.effects.longTerm, color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'from-emerald-900/15 to-emerald-900/5' },
  ];

  return (
    <div className="min-h-screen bg-[#06060b] pb-28 max-w-md mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden px-5 pt-14 pb-6 bg-gradient-to-br from-[#0a0a18] to-[#06060b] border-b border-white/[0.04]">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/[0.06] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/[0.04] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative">
          <button
            onClick={() => navigate(-1)}
            className="text-white/30 hover:text-white/60 transition-colors p-1.5 rounded-xl hover:bg-white/[0.04] mb-4"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex items-center gap-2.5 mb-2 animate-fade-down">
            <div className="bg-blue-500/15 rounded-lg p-1.5">
              <GitBranch size={18} className="text-blue-400" />
            </div>
            <h1 className="text-[24px] font-black text-white tracking-tight">What If?</h1>
          </div>
          <p className="text-white/30 text-[13px] animate-fade-up stagger-1">{lesson.title} — Alternate Timeline</p>
        </div>
      </div>

      <div className="px-5 py-6 space-y-7">
        {/* Side-by-side comparison */}
        <div className="animate-fade-up stagger-1">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Timeline Comparison</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Real History */}
            <div className="glass rounded-3xl p-4 card-shadow border-t-2 border-t-amber-500/30">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Real History</span>
              </div>
              <p className="text-[12px] text-white/60 leading-relaxed">{wi.realHistory}</p>
            </div>

            {/* Your Timeline */}
            <div className="glass rounded-3xl p-4 card-shadow border-t-2 border-t-blue-500/30">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Your Timeline</span>
              </div>
              <p className="text-[12px] text-white/60 leading-relaxed">{wi.yourTimeline}</p>
            </div>
          </div>
        </div>

        {/* Impact visualization */}
        <div className="animate-fade-up stagger-2">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Impact Analysis</h2>
          <div className="glass rounded-3xl p-5 space-y-5 card-shadow">
            {impactBars.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`${bg} rounded-lg p-1`}>
                      <Icon size={13} className="text-white/60" />
                    </div>
                    <span className="text-[12px] text-white/50 font-semibold">{label}</span>
                  </div>
                  <span className="text-[12px] text-white/40 font-bold tabular-nums">{value}%</span>
                </div>
                <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline effects */}
        <div className="animate-fade-up stagger-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Ripple Effects</h2>
          <div className="space-y-3">
            {timelineEffects.map(({ label, text, color, border, bg }, idx) => (
              <div key={label} className={`relative bg-gradient-to-br ${bg} border ${border} rounded-3xl p-5 card-shadow`}>
                {/* Connector line */}
                {idx < timelineEffects.length - 1 && (
                  <div className="absolute left-8 -bottom-3 w-px h-3 bg-white/[0.06]" />
                )}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-[10px] font-black ${color}`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${color}`}>{label}</span>
                </div>
                <p className="text-[13px] text-white/60 leading-relaxed pl-8">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 animate-fade-up stagger-4">
          <button
            onClick={() => navigate(`/lesson/${lesson.id}`)}
            className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl text-base shadow-2xl shadow-amber-500/25"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <RotateCcw size={18} />
              Try Another Path
            </span>
          </button>

          <button
            onClick={() => navigate(`/quiz/${lesson.id}`)}
            className="btn-premium w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold py-4 rounded-2xl text-base shadow-2xl shadow-blue-500/20"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Zap size={18} />
              Take the Quiz
            </span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full text-white/30 text-[13px] hover:text-white/50 transition-colors py-2 font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <NavBar />
    </div>
  );
}
