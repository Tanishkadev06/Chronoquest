import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, GitBranch, Shield, TrendingUp, Heart, Zap, RotateCcw, BookOpen, ArrowRight, Check } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useGameStore } from '../store/gameStore';
import XPToast from '../components/XPToast';
import LevelUpCelebration from '../components/LevelUpCelebration';
import NavBar from '../components/NavBar';
import type { WhatIfChoice, WhatIfDecisionPoint } from '../types';

type Phase = 'intro' | 'decision' | 'consequence' | 'outcome';

interface AccumulatedImpact {
  stability: number;
  growth: number;
  humanImpact: number;
}

export default function WhatIfMode() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addXP = useGameStore((s) => s.addXP);
  const updateStreak = useGameStore((s) => s.updateStreak);
  const pendingLevelUp = useGameStore((s) => s.pendingLevelUp);
  const clearLevelUp = useGameStore((s) => s.clearLevelUp);

  const [phase, setPhase] = useState<Phase>('intro');
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<WhatIfChoice | null>(null);
  const [choicesMade, setChoicesMade] = useState<WhatIfChoice[]>([]);
  const [impact, setImpact] = useState<AccumulatedImpact>({ stability: 50, growth: 50, humanImpact: 50 });
  const [xpToast, setXpToast] = useState<number | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [consequenceText, setConsequenceText] = useState('');

  const handleXPDone = useCallback(() => setXpToast(null), []);

  const lesson = lessons.find((l) => l.id === id);

  useEffect(() => {
    setFadeIn(false);
    requestAnimationFrame(() => setFadeIn(true));
  }, [phase, decisionIndex]);

  if (!lesson || !lesson.whatIf) {
    return (
      <div className="min-h-screen bg-[#06060b] flex items-center justify-center">
        <div className="text-white/40 text-center">
          <p className="text-lg font-bold mb-2">Scenario not found</p>
          <button onClick={() => navigate('/what-if')} className="text-amber-400 underline">Go back</button>
        </div>
      </div>
    );
  }

  const wi = lesson.whatIf;
  const currentDecision: WhatIfDecisionPoint | undefined = wi.decisions[decisionIndex];
  const totalDecisions = wi.decisions.length;

  function handleChoiceSelect(choice: WhatIfChoice) {
    if (phase !== 'decision') return;
    setSelectedChoice(choice);
  }

  function handleConfirmChoice() {
    if (!selectedChoice || !currentDecision) return;

    setChoicesMade((prev) => [...prev, selectedChoice]);
    setConsequenceText(selectedChoice.consequence);
    setImpact((prev) => ({
      stability: Math.max(0, Math.min(100, prev.stability + selectedChoice.impactDelta.stability)),
      growth: Math.max(0, Math.min(100, prev.growth + selectedChoice.impactDelta.growth)),
      humanImpact: Math.max(0, Math.min(100, prev.humanImpact + selectedChoice.impactDelta.humanImpact)),
    }));

    setXpToast(30);
    addXP(30);
    updateStreak();
    setPhase('consequence');
  }

  function handleNextDecision() {
    setSelectedChoice(null);
    if (decisionIndex + 1 < totalDecisions) {
      setDecisionIndex(decisionIndex + 1);
      setPhase('decision');
    } else {
      addXP(wi.xpReward);
      updateStreak();
      setXpToast(wi.xpReward);
      setPhase('outcome');
    }
  }

  function handleRestart() {
    setPhase('intro');
    setDecisionIndex(0);
    setSelectedChoice(null);
    setChoicesMade([]);
    setImpact({ stability: 50, growth: 50, humanImpact: 50 });
  }

  const impactBars = [
    { label: 'Stability', value: impact.stability, icon: Shield, color: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10' },
    { label: 'Growth', value: impact.growth, icon: TrendingUp, color: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-500/10' },
    { label: 'Human Impact', value: impact.humanImpact, icon: Heart, color: 'from-red-500 to-orange-400', bg: 'bg-red-500/10' },
  ];

  // ---- INTRO PHASE ----
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#06060b] pb-28 max-w-md mx-auto">
        {xpToast !== null && <XPToast amount={xpToast} onDone={handleXPDone} />}
        {pendingLevelUp && <LevelUpCelebration level={pendingLevelUp} onDone={clearLevelUp} />}

        {/* Header */}
        <div className="px-5 pt-14 pb-2">
          <button
            onClick={() => navigate('/what-if')}
            className="text-white/30 hover:text-white/60 transition-colors p-1.5 rounded-xl hover:bg-white/[0.04]"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        {/* Cinematic intro */}
        <div className={`px-5 py-8 flex flex-col items-center text-center transition-all duration-700 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Year badge */}
          <div className="animate-fade-down mb-6">
            <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-blue-400/80 bg-blue-500/10 border border-blue-500/15 px-4 py-2 rounded-full">
              {wi.year}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[28px] font-black text-white tracking-tight mb-3 animate-fade-up stagger-1 leading-tight">
            {wi.title}
          </h1>

          {/* Description */}
          <p className="text-white/40 text-[13px] leading-relaxed mb-8 max-w-xs animate-fade-up stagger-2">
            {wi.description}
          </p>

          {/* Narrative intro card */}
          <div className="w-full glass rounded-3xl p-6 card-shadow mb-8 animate-fade-up stagger-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-500/15 rounded-lg p-1.5">
                <GitBranch size={14} className="text-blue-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400/70">The Divergence Point</span>
            </div>
            <p className="text-white/70 text-[14px] leading-[1.85] font-light">{wi.intro}</p>
          </div>

          {/* Starting impact */}
          <div className="w-full glass rounded-3xl p-5 card-shadow mb-8 animate-fade-up stagger-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Starting Conditions</div>
            <div className="space-y-4">
              {impactBars.map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`${bg} rounded-lg p-1`}>
                        <Icon size={12} className="text-white/50" />
                      </div>
                      <span className="text-[11px] text-white/40 font-semibold">{label}</span>
                    </div>
                    <span className="text-[11px] text-white/30 font-bold tabular-nums">{value}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={() => setPhase('decision')}
            className="btn-premium w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold py-4 rounded-2xl text-base shadow-2xl shadow-blue-500/25 animate-fade-up stagger-5"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <GitBranch size={18} />
              Begin Alternate Timeline
            </span>
          </button>
        </div>

        <NavBar />
      </div>
    );
  }

  // ---- DECISION PHASE ----
  if (phase === 'decision' && currentDecision) {
    return (
      <div className="min-h-screen bg-[#06060b] pb-28 max-w-md mx-auto">
        {xpToast !== null && <XPToast amount={xpToast} onDone={handleXPDone} />}
        {pendingLevelUp && <LevelUpCelebration level={pendingLevelUp} onDone={clearLevelUp} />}

        {/* Top bar */}
        <div className="px-5 pt-14 pb-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/what-if')}
            className="text-white/30 hover:text-white/60 transition-colors p-1.5 rounded-xl hover:bg-white/[0.04]"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-[10px] text-white/25 mb-2 font-semibold uppercase tracking-wider">
              <span>Decision {decisionIndex + 1} of {totalDecisions}</span>
              <span>{wi.title}</span>
            </div>
            <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${((decisionIndex + 1) / totalDecisions) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </div>

        {/* Live impact bars */}
        <div className="px-5 py-3">
          <div className="flex items-center gap-3">
            {impactBars.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <Icon size={10} className="text-white/40" />
                    <span className="text-[9px] text-white/30 font-semibold">{label}</span>
                  </div>
                  <span className="text-[9px] text-white/25 font-bold tabular-nums">{value}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative */}
        <div className={`px-5 py-4 transition-all duration-500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="glass rounded-3xl p-6 card-shadow mb-5 animate-fade-up">
            <p className="text-white/80 text-[15px] leading-[1.9] font-light">{currentDecision.narrative}</p>
          </div>

          {/* Choices */}
          <div className="space-y-3 mb-5">
            <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-bold">What do you choose?</p>
            {currentDecision.choices.map((choice, idx) => {
              const isSelected = selectedChoice?.id === choice.id;
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice)}
                  className={`w-full text-left rounded-2xl border transition-all duration-300 card-lift animate-fade-up stagger-${Math.min(idx + 2, 6)} ${
                    isSelected
                      ? 'border-blue-500/40 bg-blue-900/15 inner-glow-blue'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all duration-300 ${
                        isSelected ? 'border-blue-500 bg-blue-500 scale-110' : 'border-white/15'
                      }`}>
                        {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-[14px] text-white font-medium leading-relaxed">{choice.text}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {choice.impactDelta.stability !== 0 && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${choice.impactDelta.stability > 0 ? 'text-blue-400 bg-blue-500/10' : 'text-red-400 bg-red-500/10'}`}>
                              <Shield size={8} className="inline mr-0.5" />{choice.impactDelta.stability > 0 ? '+' : ''}{choice.impactDelta.stability}
                            </span>
                          )}
                          {choice.impactDelta.growth !== 0 && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${choice.impactDelta.growth > 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                              <TrendingUp size={8} className="inline mr-0.5" />{choice.impactDelta.growth > 0 ? '+' : ''}{choice.impactDelta.growth}
                            </span>
                          )}
                          {choice.impactDelta.humanImpact !== 0 && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${choice.impactDelta.humanImpact > 0 ? 'text-amber-400 bg-amber-500/10' : 'text-red-400 bg-red-500/10'}`}>
                              <Heart size={8} className="inline mr-0.5" />{choice.impactDelta.humanImpact > 0 ? '+' : ''}{choice.impactDelta.humanImpact}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Confirm button */}
          <button
            onClick={handleConfirmChoice}
            disabled={!selectedChoice}
            className="btn-premium w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold py-4 rounded-2xl text-[15px] shadow-2xl shadow-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none transition-all"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Confirm Choice
              <ArrowRight size={18} strokeWidth={3} />
            </span>
          </button>
        </div>

        <NavBar />
      </div>
    );
  }

  // ---- CONSEQUENCE PHASE ----
  if (phase === 'consequence') {
    return (
      <div className="min-h-screen bg-[#06060b] pb-28 max-w-md mx-auto">
        {xpToast !== null && <XPToast amount={xpToast} onDone={handleXPDone} />}
        {pendingLevelUp && <LevelUpCelebration level={pendingLevelUp} onDone={clearLevelUp} />}

        {/* Top bar */}
        <div className="px-5 pt-14 pb-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/what-if')}
            className="text-white/30 hover:text-white/60 transition-colors p-1.5 rounded-xl hover:bg-white/[0.04]"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-[10px] text-white/25 mb-2 font-semibold uppercase tracking-wider">
              <span>Decision {decisionIndex + 1} of {totalDecisions}</span>
              <span>{wi.title}</span>
            </div>
            <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${((decisionIndex + 1) / totalDecisions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className={`px-5 py-6 transition-all duration-500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Consequence card */}
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-500/25 rounded-3xl p-6 mb-6 animate-scale-in inner-glow-blue card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-500/20 rounded-lg p-1.5">
                <GitBranch size={14} className="text-blue-400" />
              </div>
              <span className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.15em]">Consequence</span>
              <span className="ml-auto text-blue-400 text-[13px] font-extrabold tabular-nums animate-count-up">+30 XP</span>
            </div>
            <p className="text-white/70 text-[14px] leading-[1.85] font-light">{consequenceText}</p>
          </div>

          {/* Updated impact */}
          <div className="glass rounded-3xl p-5 card-shadow mb-6 animate-fade-up stagger-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Timeline Impact</div>
            <div className="space-y-4">
              {impactBars.map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`${bg} rounded-lg p-1`}>
                        <Icon size={12} className="text-white/50" />
                      </div>
                      <span className="text-[11px] text-white/40 font-semibold">{label}</span>
                    </div>
                    <span className="text-[11px] text-white/30 font-bold tabular-nums">{value}%</span>
                  </div>
                  <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleNextDecision}
            className="btn-premium w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold py-4 rounded-2xl text-[15px] shadow-2xl shadow-blue-500/20 animate-fade-up stagger-2"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {decisionIndex + 1 < totalDecisions ? 'Next Decision' : 'See Your Timeline'}
              <ArrowRight size={18} strokeWidth={3} />
            </span>
          </button>
        </div>

        <NavBar />
      </div>
    );
  }

  // ---- OUTCOME PHASE ----
  const timelineEffects = [
    { label: 'Immediate', text: wi.effects.immediate, color: 'text-amber-400', border: 'border-amber-500/20', bg: 'from-amber-900/15 to-amber-900/5' },
    { label: 'Mid-Term', text: wi.effects.midTerm, color: 'text-blue-400', border: 'border-blue-500/20', bg: 'from-blue-900/15 to-blue-900/5' },
    { label: 'Long-Term', text: wi.effects.longTerm, color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'from-emerald-900/15 to-emerald-900/5' },
  ];

  return (
    <div className="min-h-screen bg-[#06060b] pb-28 max-w-md mx-auto">
      {xpToast !== null && <XPToast amount={xpToast} onDone={handleXPDone} />}
      {pendingLevelUp && <LevelUpCelebration level={pendingLevelUp} onDone={clearLevelUp} />}

      {/* Header */}
      <div className="relative overflow-hidden px-5 pt-14 pb-6 bg-gradient-to-br from-[#0a0a18] to-[#06060b] border-b border-white/[0.04]">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/[0.06] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/[0.04] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative">
          <button
            onClick={() => navigate('/what-if')}
            className="text-white/30 hover:text-white/60 transition-colors p-1.5 rounded-xl hover:bg-white/[0.04] mb-4"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex items-center gap-2.5 mb-2 animate-fade-down">
            <div className="bg-blue-500/15 rounded-lg p-1.5">
              <GitBranch size={18} className="text-blue-400" />
            </div>
            <h1 className="text-[24px] font-black text-white tracking-tight">Your Timeline</h1>
          </div>
          <p className="text-white/30 text-[13px] animate-fade-up stagger-1">{wi.title}</p>
        </div>
      </div>

      <div className="px-5 py-6 space-y-7">
        {/* Your choices summary */}
        {choicesMade.length > 0 && (
          <div className="animate-fade-up stagger-1">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Your Decisions</h2>
            <div className="glass rounded-3xl p-5 space-y-3 card-shadow">
              {choicesMade.map((c, idx) => (
                <div key={c.id} className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
                  <div className="bg-blue-500/15 rounded-lg p-1.5 mt-0.5 shrink-0">
                    <GitBranch size={12} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-white/70 font-medium leading-relaxed">{c.text}</p>
                    <p className="text-[11px] text-white/30 mt-1">{c.consequence}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline comparison */}
        <div className="animate-fade-up stagger-2">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Timeline Comparison</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass rounded-3xl p-4 card-shadow border-t-2 border-t-amber-500/30">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Real History</span>
              </div>
              <p className="text-[12px] text-white/60 leading-relaxed">{wi.realHistory}</p>
            </div>
            <div className="glass rounded-3xl p-4 card-shadow border-t-2 border-t-blue-500/30">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Your Timeline</span>
              </div>
              <p className="text-[12px] text-white/60 leading-relaxed">{wi.yourTimeline}</p>
            </div>
          </div>
        </div>

        {/* Final impact visualization */}
        <div className="animate-fade-up stagger-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Final Impact Analysis</h2>
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
                    className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out animate-progress-fill`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ripple effects */}
        <div className="animate-fade-up stagger-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Ripple Effects</h2>
          <div className="space-y-3">
            {timelineEffects.map(({ label, text, color, border, bg }, idx) => (
              <div key={label} className={`relative bg-gradient-to-br ${bg} border ${border} rounded-3xl p-5 card-shadow`}>
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

        {/* XP reward */}
        <div className="glass rounded-3xl p-5 card-shadow animate-fade-up stagger-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-amber-500/15 rounded-lg p-1.5">
                <Zap size={14} className="text-amber-400" fill="currentColor" />
              </div>
              <span className="text-[12px] text-white/50 font-semibold">Scenario Complete</span>
            </div>
            <span className="text-amber-400 text-[16px] font-extrabold tabular-nums">+{wi.xpReward} XP</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 animate-fade-up stagger-6">
          <button
            onClick={handleRestart}
            className="btn-premium w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold py-4 rounded-2xl text-base shadow-2xl shadow-blue-500/25"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <RotateCcw size={18} />
              Try Another Path
            </span>
          </button>

          <button
            onClick={() => navigate(`/quiz/${lesson.id}`)}
            className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl text-base shadow-2xl shadow-amber-500/25"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <BookOpen size={18} />
              Take the Quiz
            </span>
          </button>

          <button
            onClick={() => navigate('/what-if')}
            className="w-full text-white/30 text-[13px] hover:text-white/50 transition-colors py-2 font-medium"
          >
            Back to Scenarios
          </button>
        </div>
      </div>

      <NavBar />
    </div>
  );
}
