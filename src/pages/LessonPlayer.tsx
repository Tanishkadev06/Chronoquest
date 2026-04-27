import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Zap, ChevronRight, CheckCircle2, BookOpen, GitBranch } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useGameStore } from '../store/gameStore';
import XPToast from '../components/XPToast';
import LevelUpCelebration from '../components/LevelUpCelebration';
import type { Choice } from '../types';

export default function LessonPlayer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addXP = useGameStore((s) => s.addXP);
  const updateStreak = useGameStore((s) => s.updateStreak);
  const pendingLevelUp = useGameStore((s) => s.pendingLevelUp);
  const clearLevelUp = useGameStore((s) => s.clearLevelUp);

  const lesson = lessons.find((l) => l.id === id);

  const [stepIndex, setStepIndex] = useState(0);
  const [choicesMade, setChoicesMade] = useState<Record<string, Choice>>({});
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [xpToast, setXpToast] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [stepKey, setStepKey] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const handleXPDone = useCallback(() => setXpToast(null), []);

  useEffect(() => {
    setStepKey((k) => k + 1);
  }, [stepIndex]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#06060b] flex items-center justify-center">
        <div className="text-white/40 text-center">
          <p className="text-lg font-bold mb-2">Lesson not found</p>
          <button onClick={() => navigate('/dashboard')} className="text-amber-400 underline">Go back</button>
        </div>
      </div>
    );
  }

  const currentStep = lesson.steps[stepIndex];
  const hasChoices = currentStep.choices && currentStep.choices.length > 0;
  const totalSteps = lesson.steps.length;
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  function handleChoiceSelect(choice: Choice) {
    if (showOutcome) return;
    setSelectedChoice(choice);
  }

  function handleChoiceConfirm() {
    if (!selectedChoice) return;
    setChoicesMade((prev) => ({ ...prev, [currentStep.id]: selectedChoice }));
    setShowOutcome(true);
    setXpToast(selectedChoice.xpGain);
    addXP(selectedChoice.xpGain);
    updateStreak();
  }

  function advanceStep() {
    setShowOutcome(false);
    setSelectedChoice(null);
    setTransitioning(true);
    setTimeout(() => {
      if (stepIndex < totalSteps - 1) {
        setStepIndex(stepIndex + 1);
      } else {
        setFinished(true);
      }
      setTransitioning(false);
    }, 200);
  }

  function handleNext() {
    advanceStep();
  }

  function handleSkipToNext() {
    updateStreak();
    advanceStep();
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-[#06060b] flex flex-col items-center justify-center px-6 max-w-md mx-auto">
        {xpToast !== null && <XPToast amount={xpToast} onDone={handleXPDone} />}
        {pendingLevelUp && <LevelUpCelebration level={pendingLevelUp} onDone={clearLevelUp} />}

        <div className="w-full space-y-7 text-center">
          {/* Success icon */}
          <div className="relative animate-bounce-in">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150" />
            <div className="relative bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/25 rounded-full w-24 h-24 flex items-center justify-center mx-auto inner-glow-emerald">
              <CheckCircle2 size={44} className="text-emerald-400" strokeWidth={1.5} />
            </div>
          </div>

          <div className="animate-fade-up stagger-1">
            <h2 className="text-[26px] font-black text-white tracking-tight mb-2">Story Complete!</h2>
            <p className="text-white/40 text-[13px] leading-relaxed">You've lived through {lesson.title}.<br/>Now test your knowledge.</p>
          </div>

          {/* Choices summary */}
          {Object.values(choicesMade).length > 0 && (
            <div className="glass rounded-3xl p-5 space-y-3 text-left animate-fade-up stagger-2 card-shadow">
              <div className="text-[11px] text-white/30 uppercase tracking-[0.15em] font-bold mb-1">Your choices</div>
              {Object.values(choicesMade).map((c) => (
                <div key={c.id} className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
                  <div className="bg-amber-500/15 rounded-lg p-1.5 mt-0.5 shrink-0">
                    <Zap size={12} className="text-amber-400" fill="currentColor" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-white/70 font-medium leading-relaxed">{c.text}</p>
                    <p className="text-[11px] text-amber-400 font-bold mt-1">+{c.xpGain} XP</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 animate-fade-up stagger-3">
            <button
              onClick={() => navigate(`/quiz/${lesson.id}`)}
              className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl text-base shadow-2xl shadow-amber-500/25"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <BookOpen size={18} />
                Start Quiz — +{lesson.xpReward} XP
              </span>
            </button>

            {lesson.whatIf && (
              <button
                onClick={() => navigate(`/what-if/${lesson.id}`)}
                className="btn-premium w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold py-4 rounded-2xl text-base shadow-2xl shadow-blue-500/20"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <GitBranch size={18} />
                  What If? — Alternate Timeline
                </span>
              </button>
            )}

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full text-white/30 text-[13px] hover:text-white/50 transition-colors py-2 font-medium"
            >
              Skip quiz, back to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06060b] flex flex-col max-w-md mx-auto">
      {xpToast !== null && <XPToast amount={xpToast} onDone={handleXPDone} />}
      {pendingLevelUp && <LevelUpCelebration level={pendingLevelUp} onDone={clearLevelUp} />}

      {/* Top bar */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-white/30 hover:text-white/60 transition-colors p-1.5 rounded-xl hover:bg-white/[0.04]"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex-1">
          <div className="flex justify-between text-[10px] text-white/25 mb-2 font-semibold uppercase tracking-wider">
            <span>{lesson.category}</span>
            <span>{stepIndex + 1} / {totalSteps}</span>
          </div>
          <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* Content with transition */}
      <div className={`flex-1 flex flex-col px-5 py-3 overflow-y-auto pb-10 transition-all duration-200 ${transitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`} key={stepKey}>
        {/* Era badge */}
        <div className="mb-5 animate-fade-down">
          <span className="text-[10px] uppercase tracking-[0.15em] text-blue-400 font-bold bg-blue-500/10 border border-blue-500/15 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <BookOpen size={10} />
            {lesson.era} — {lesson.title}
          </span>
        </div>

        {/* Story card */}
        <div className="glass rounded-3xl p-6 mb-5 animate-fade-up card-shadow">
          <p className="text-white/85 text-[15px] leading-[1.9] font-light">{currentStep.text}</p>
        </div>

        {/* Outcome card */}
        {showOutcome && selectedChoice && (
          <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/10 border border-amber-500/25 rounded-3xl p-5 mb-5 animate-scale-in inner-glow-amber card-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-amber-500/20 rounded-lg p-1.5">
                <Zap size={13} className="text-amber-400" fill="currentColor" />
              </div>
              <span className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.15em]">Outcome</span>
              <span className="ml-auto text-amber-400 text-[13px] font-extrabold tabular-nums animate-count-up">+{selectedChoice.xpGain} XP</span>
            </div>
            <p className="text-white/70 text-[13px] leading-relaxed">{selectedChoice.outcome}</p>
          </div>
        )}

        {/* Choices */}
        {hasChoices && !showOutcome && (
          <div className="space-y-3 mb-5 animate-fade-up stagger-2">
            <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-bold">What do you do?</p>
            {currentStep.choices!.map((choice, idx) => (
              <button
                key={choice.id}
                onClick={() => handleChoiceSelect(choice)}
                className={`w-full text-left rounded-2xl border transition-all duration-300 card-lift animate-fade-up stagger-${Math.min(idx + 3, 6)} ${
                  selectedChoice?.id === choice.id
                    ? 'border-amber-500/40 bg-amber-900/15 inner-glow-amber'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all duration-300 ${
                      selectedChoice?.id === choice.id ? 'border-amber-500 bg-amber-500 scale-110' : 'border-white/15'
                    }`}>
                      {selectedChoice?.id === choice.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] text-white font-medium leading-relaxed">{choice.text}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="bg-amber-500/10 rounded px-1.5 py-0.5">
                          <span className="text-[10px] text-amber-400/60 font-bold">+{choice.xpGain} XP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-auto pt-4">
          {hasChoices && !showOutcome ? (
            <button
              onClick={handleChoiceConfirm}
              disabled={!selectedChoice}
              className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl text-[15px] shadow-2xl shadow-amber-500/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none transition-all"
            >
              <span className="relative z-10">Confirm Choice</span>
            </button>
          ) : (
            <button
              onClick={showOutcome ? handleNext : handleSkipToNext}
              className="btn-premium w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold py-4 rounded-2xl text-[15px] shadow-2xl shadow-blue-500/20 transition-all"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {stepIndex < totalSteps - 1 ? 'Continue' : 'Finish Story'}
                <ChevronRight size={18} strokeWidth={3} />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
