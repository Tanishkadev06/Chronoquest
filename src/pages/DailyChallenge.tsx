import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Zap, ChevronLeft, CheckCircle2, XCircle, Timer } from 'lucide-react';
import { dailyChallenge } from '../data/lessons';
import { useGameStore } from '../store/gameStore';
import XPToast from '../components/XPToast';

export default function DailyChallenge() {
  const navigate = useNavigate();
  const { completeDailyChallenge, dailyChallengeCompleted, dailyChallengeDate } = useGameStore();
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(dailyChallenge.timeLimit);
  const [expired, setExpired] = useState(false);
  const [xpToast, setXpToast] = useState<number | null>(null);
  const [shaking, setShaking] = useState(false);

  const today = new Date().toDateString();
  const alreadyDone = dailyChallengeCompleted && dailyChallengeDate === today;

  const handleXPDone = useCallback(() => setXpToast(null), []);

  useEffect(() => {
    if (confirmed || alreadyDone || expired) return;

    const t = setInterval(() => {
      setTimeLeft((v) => {
        if (v <= 1) {
          clearInterval(t);
          setExpired(true);
          return 0;
        }
        return v - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [confirmed, alreadyDone, expired]);

  const q = dailyChallenge.question;
  const isCorrect = selected === q.correctIndex;

  function handleSelect(i: number) {
    if (confirmed || expired) return;
    setSelected(i);
  }

  function handleConfirm() {
    if (selected === null || expired) return;
    setConfirmed(true);
    if (isCorrect) {
      completeDailyChallenge();
      setXpToast(dailyChallenge.xpBonus);
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  }

  const timerPercent = (timeLeft / dailyChallenge.timeLimit) * 100;
  const timerColor = timeLeft > 15 ? 'text-emerald-400' : timeLeft > 8 ? 'text-amber-400' : 'text-red-400';
  const timerBarColor = timeLeft > 15 ? 'from-emerald-500 to-teal-400' : timeLeft > 8 ? 'from-amber-500 to-orange-400' : 'from-red-500 to-red-400';

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col max-w-md mx-auto">
      {xpToast !== null && <XPToast amount={xpToast} onDone={handleXPDone} />}

      {/* Top */}
      <div className="px-5 pt-12 pb-6 bg-gradient-to-br from-[#0f0f18] to-[#0a0a0f] border-b border-white/[0.04]">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/dashboard')} className="text-white/30 hover:text-white/60 transition-colors p-1.5 rounded-xl hover:bg-white/[0.04]">
            <ChevronLeft size={22} />
          </button>
          <div>
            <h1 className="text-[18px] font-black text-white flex items-center gap-2">
              <div className="bg-amber-500/15 rounded-lg p-1.5">
                <Clock size={16} className="text-amber-400" />
              </div>
              Daily Challenge
            </h1>
            <p className="text-[12px] text-white/30 mt-0.5">{dailyChallenge.description}</p>
          </div>
        </div>

        {/* Timer */}
        {!alreadyDone && (
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-white/30">
                <Timer size={13} />
                <span className="text-[11px] font-semibold uppercase tracking-wider">Time remaining</span>
              </div>
              <span className={`text-[20px] font-black font-mono tabular-nums ${timerColor} transition-colors duration-300`}>
                {String(timeLeft).padStart(2, '0')}s
              </span>
            </div>
            <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${timerBarColor} rounded-full transition-all duration-1000 ease-linear relative`}
                style={{ width: `${confirmed || expired ? 0 : timerPercent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col px-5 py-6">
        {alreadyDone ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 animate-fade-up">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150" />
              <div className="relative bg-emerald-500/15 border border-emerald-500/25 rounded-full w-24 h-24 flex items-center justify-center inner-glow-emerald">
                <CheckCircle2 size={44} className="text-emerald-400" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h2 className="text-[24px] font-black text-white tracking-tight mb-2">Challenge Complete!</h2>
              <p className="text-white/35 text-[13px] leading-relaxed">You've already completed today's challenge.<br/>Come back tomorrow!</p>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-5 py-3.5">
              <Zap size={18} className="text-amber-400" fill="currentColor" />
              <span className="text-amber-400 font-extrabold text-[14px]">+{dailyChallenge.xpBonus} XP earned</span>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl"
            >
              <span className="relative z-10">Back to Dashboard</span>
            </button>
          </div>
        ) : expired && !confirmed ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 animate-fade-up">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/15 blur-3xl rounded-full scale-150" />
              <div className="relative bg-red-500/15 border border-red-500/25 rounded-full w-24 h-24 flex items-center justify-center">
                <Clock size={44} className="text-red-400" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h2 className="text-[24px] font-black text-white tracking-tight mb-2">Time's Up!</h2>
              <p className="text-white/35 text-[13px] leading-relaxed">You ran out of time.<br/>Come back tomorrow for a new challenge!</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full glass text-white font-bold py-4 rounded-2xl hover:bg-white/[0.06] transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* XP Bonus badge */}
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-3 mb-6 w-fit animate-fade-down">
              <Zap size={15} className="text-amber-400" fill="currentColor" />
              <span className="text-amber-400 text-[12px] font-bold">Bonus +{dailyChallenge.xpBonus} XP for correct answer</span>
            </div>

            {/* Question */}
            <div className="glass rounded-3xl p-6 mb-6 animate-fade-up">
              <div className="text-[10px] uppercase tracking-[0.15em] text-amber-400 font-bold mb-3 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Today's Question
              </div>
              <p className="text-white text-[15px] font-semibold leading-relaxed">{q.question}</p>
            </div>

            {/* Options */}
            <div className={`space-y-3 mb-5 ${shaking ? 'animate-wrong-shake' : ''}`}>
              {q.options.map((opt, i) => {
                let outerStyle = 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]';
                let iconEl = null;
                let letterStyle = 'border-white/15 text-white/35 bg-white/[0.04]';

                if (confirmed) {
                  if (i === q.correctIndex) {
                    outerStyle = 'border-emerald-500/40 bg-emerald-900/15 inner-glow-emerald';
                    iconEl = <CheckCircle2 size={20} className="text-emerald-400 shrink-0" fill="currentColor" />;
                    letterStyle = 'bg-emerald-500 border-emerald-500 text-white';
                  } else if (i === selected && !isCorrect) {
                    outerStyle = 'border-red-500/40 bg-red-900/15';
                    iconEl = <XCircle size={20} className="text-red-400 shrink-0" fill="currentColor" />;
                    letterStyle = 'bg-red-500 border-red-500 text-white';
                  }
                } else if (i === selected) {
                  outerStyle = 'border-amber-500/40 bg-amber-900/15 inner-glow-amber';
                  letterStyle = 'bg-amber-500 border-amber-500 text-black';
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
                <p className="text-white/60 text-[13px] leading-relaxed">{q.explanation}</p>
              </div>
            )}

            <div className="mt-auto">
              {!confirmed ? (
                <button
                  onClick={handleConfirm}
                  disabled={selected === null}
                  className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl text-[15px] shadow-2xl shadow-amber-500/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                >
                  <span className="relative z-10">Lock In Answer</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl text-[15px] shadow-2xl shadow-amber-500/25 transition-all"
                >
                  <span className="relative z-10">Back to Dashboard</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
