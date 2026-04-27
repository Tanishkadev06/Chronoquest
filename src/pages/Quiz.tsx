import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Zap, CheckCircle2, XCircle, Trophy, Sparkles } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useGameStore } from '../store/gameStore';
import XPToast from '../components/XPToast';
import XPBar from '../components/XPBar';
import type { Lesson } from '../types';

export default function Quiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <button onClick={() => navigate('/dashboard')} className="text-amber-400">Go back</button>
      </div>
    );
  }

  return <QuizInner lesson={lesson} />;
}

function QuizInner({ lesson }: { lesson: Lesson }) {
  const navigate = useNavigate();
  const { xp, level, completeLesson } = useGameStore();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const [finalResult, setFinalResult] = useState<{ score: number; xpEarned: number } | null>(null);
  const [xpToast, setXpToast] = useState<number | null>(null);
  const [questionKey, setQuestionKey] = useState(0);
  const [shaking, setShaking] = useState(false);

  const handleXPDone = useCallback(() => setXpToast(null), []);

  useEffect(() => {
    setQuestionKey((k) => k + 1);
  }, [current]);

  const question = lesson.quiz[current];
  const isCorrect = selected === question.correctIndex;
  const totalQuestions = lesson.quiz.length;
  const progressPct = ((current + 1) / totalQuestions) * 100;

  function handleSelect(i: number) {
    if (confirmed) return;
    setSelected(i);
  }

  function handleConfirm() {
    if (selected === null) return;
    const correct = selected === question.correctIndex;
    setAnswers((prev) => [...prev, correct]);
    setConfirmed(true);
    if (!correct) {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  }

  function handleNext() {
    if (current < totalQuestions - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      // All answers collected (current answer already added in handleConfirm)
      const allAnswers = [...answers];
      const score = allAnswers.filter(Boolean).length;
      const xpEarned = Math.round(lesson.xpReward * (score / totalQuestions));
      completeLesson(lesson.id, score, xpEarned);
      setFinalResult({ score, xpEarned });
      setXpToast(xpEarned);
      setDone(true);
    }
  }

  if (done && finalResult) {
    const { score: finalScore, xpEarned } = finalResult;
    const perfect = finalScore === totalQuestions;
    const passed = finalScore >= Math.ceil(totalQuestions / 2);

    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-6 max-w-md mx-auto">
        {xpToast !== null && <XPToast amount={xpToast} onDone={handleXPDone} />}

        <div className="w-full space-y-7 text-center">
          {/* Score ring */}
          <div className="relative mx-auto w-32 h-32 animate-bounce-in">
            <div className={`absolute inset-0 blur-3xl rounded-full scale-150 ${
              perfect ? 'bg-amber-500/30' : passed ? 'bg-emerald-500/20' : 'bg-red-500/15'
            }`} />
            <div className={`relative w-full h-full rounded-full border-[3px] flex items-center justify-center ${
              perfect ? 'border-amber-500 bg-amber-500/10' :
              passed ? 'border-emerald-500 bg-emerald-500/10' :
              'border-red-500 bg-red-500/10'
            }`}>
              <span className={`text-3xl font-black ${
                perfect ? 'text-amber-400' : passed ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {finalScore}/{totalQuestions}
              </span>
            </div>
          </div>

          <div className="animate-fade-up stagger-1">
            <h2 className="text-[26px] font-black text-white tracking-tight mb-1.5">
              {perfect ? 'Perfect Score!' : passed ? 'Well Done!' : 'Keep Practicing!'}
            </h2>
            <p className="text-white/35 text-[13px]">{lesson.title}</p>
          </div>

          {/* Stats card */}
          <div className="glass rounded-3xl p-5 space-y-4 animate-fade-up stagger-2">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/40">XP Earned</span>
              <span className="text-amber-400 font-extrabold text-[15px] flex items-center gap-1.5">
                <Zap size={14} fill="currentColor" />+{xpEarned}
              </span>
            </div>
            <div className="h-px bg-white/[0.04]" />
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/40">Correct Answers</span>
              <span className="text-white font-extrabold text-[15px]">{finalScore} / {totalQuestions}</span>
            </div>
            {perfect && (
              <>
                <div className="h-px bg-white/[0.04]" />
                <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5">
                  <Trophy size={18} className="text-amber-400" fill="currentColor" />
                  <span className="text-amber-400 text-[12px] font-bold">Perfect score bonus!</span>
                  <Sparkles size={14} className="text-amber-400 ml-auto" />
                </div>
              </>
            )}
          </div>

          <div className="animate-fade-up stagger-3">
            <p className="text-[10px] text-white/20 uppercase tracking-wider mb-2 font-semibold">Your progress</p>
            <XPBar xp={xp} level={level} />
          </div>

          <div className="flex flex-col gap-3 animate-fade-up stagger-4">
            <button
              onClick={() => navigate('/skill-tree')}
              className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl text-base shadow-2xl shadow-amber-500/25"
            >
              <span className="relative z-10">Continue Learning</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full text-white/30 text-[13px] hover:text-white/50 transition-colors py-2 font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col max-w-md mx-auto">
      {xpToast !== null && <XPToast amount={xpToast} onDone={handleXPDone} />}

      {/* Top bar */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(`/lesson/${lesson.id}`)} className="text-white/30 hover:text-white/60 transition-colors p-1.5 rounded-xl hover:bg-white/[0.04]">
          <ChevronLeft size={22} />
        </button>
        <div className="flex-1">
          <div className="flex justify-between text-[10px] text-white/25 mb-2 font-semibold uppercase tracking-wider">
            <span>Quiz — {lesson.title}</span>
            <span>{current + 1} / {totalQuestions}</span>
          </div>
          <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${progressPct}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-5 py-3 pb-10" key={questionKey}>
        {/* Question */}
        <div className="glass rounded-3xl p-6 mb-6 animate-fade-up">
          <div className="text-[10px] uppercase tracking-[0.15em] text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Question {current + 1}
          </div>
          <p className="text-white text-[15px] font-semibold leading-relaxed">{question.question}</p>
        </div>

        {/* Options */}
        <div className={`space-y-3 mb-5 ${shaking ? 'animate-wrong-shake' : ''}`}>
          {question.options.map((opt, i) => {
            let outerStyle = 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]';
            let iconEl = null;
            let letterStyle = 'border-white/15 text-white/35 bg-white/[0.04]';

            if (confirmed) {
              if (i === question.correctIndex) {
                outerStyle = 'border-emerald-500/40 bg-emerald-900/15 inner-glow-emerald';
                iconEl = <CheckCircle2 size={20} className="text-emerald-400 shrink-0" fill="currentColor" />;
                letterStyle = 'bg-emerald-500 border-emerald-500 text-white';
              } else if (i === selected && !isCorrect) {
                outerStyle = 'border-red-500/40 bg-red-900/15';
                iconEl = <XCircle size={20} className="text-red-400 shrink-0" fill="currentColor" />;
                letterStyle = 'bg-red-500 border-red-500 text-white';
              }
            } else if (i === selected) {
              outerStyle = 'border-blue-500/40 bg-blue-900/15 inner-glow-blue';
              letterStyle = 'bg-blue-500 border-blue-500 text-white';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 card-lift animate-fade-up stagger-${Math.min(i + 1, 6)} ${outerStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[12px] font-bold border shrink-0 transition-all duration-300 ${letterStyle}`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-[13px] text-white font-medium leading-relaxed flex-1">{opt}</span>
                  {iconEl}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {confirmed && (
          <div className={`rounded-3xl p-5 mb-5 border animate-scale-in ${
            isCorrect ? 'bg-emerald-900/15 border-emerald-500/25' : 'bg-red-900/15 border-red-500/25'
          }`}>
            <div className={`text-[11px] font-bold uppercase tracking-[0.15em] mb-2 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </div>
            <p className="text-white/60 text-[13px] leading-relaxed">{question.explanation}</p>
          </div>
        )}

        <div className="mt-auto pt-4">
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className="btn-premium w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold py-4 rounded-2xl text-[15px] shadow-2xl shadow-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none transition-all"
            >
              <span className="relative z-10">Check Answer</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl text-[15px] shadow-2xl shadow-amber-500/25 transition-all"
            >
              <span className="relative z-10">{current < totalQuestions - 1 ? 'Next Question' : 'See Results'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
