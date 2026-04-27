import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Zap, Trophy, ChevronRight, Sparkles } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const slides = [
  {
    icon: Clock,
    title: 'History, but you live it',
    subtitle: 'Step into pivotal moments. Make choices that shape the outcome of real events.',
    gradient: 'from-blue-600/20 via-cyan-600/10 to-transparent',
    accent: 'text-cyan-400',
    glow: 'bg-cyan-500',
  },
  {
    icon: Zap,
    title: 'Earn XP, Level Up',
    subtitle: 'Every choice, every quiz, every streak earns you experience and unlocks new eras of history.',
    gradient: 'from-amber-600/20 via-orange-600/10 to-transparent',
    accent: 'text-amber-400',
    glow: 'bg-amber-500',
  },
  {
    icon: Trophy,
    title: 'Compete & Conquer',
    subtitle: 'Climb the global leaderboard. Prove you know your history better than anyone.',
    gradient: 'from-emerald-600/20 via-teal-600/10 to-transparent',
    accent: 'text-emerald-400',
    glow: 'bg-emerald-500',
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [nameStep, setNameStep] = useState(false);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const completeOnboarding = useGameStore((s) => s.completeOnboarding);
  const updateStreak = useGameStore((s) => s.updateStreak);

  const current = slides[step];
  const IconComp = current.icon;

  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 500);
    return () => clearTimeout(t);
  }, [step, nameStep]);

  function handleNext() {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      setNameStep(true);
    }
  }

  function handleStart() {
    if (!name.trim()) return;
    completeOnboarding(name.trim());
    updateStreak();
    navigate('/dashboard');
  }

  if (nameStep) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="text-center space-y-4 animate-fade-up">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full scale-150" />
              <div className="relative text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 tracking-tight">
                ChronoQuest
              </div>
            </div>
            <p className="text-white/40 text-sm font-medium">What should we call you, historian?</p>
          </div>

          {/* Name input */}
          <div className="space-y-4 animate-fade-up stagger-2">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="Enter your name..."
                maxLength={20}
                className="relative w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 text-lg font-semibold focus:outline-none focus:border-amber-500/40 focus:bg-white/[0.06] transition-all duration-300"
                autoFocus
              />
            </div>

            <button
              onClick={handleStart}
              disabled={!name.trim()}
              className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl text-lg shadow-2xl shadow-amber-500/25 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Begin My Journey
                <Sparkles size={18} />
              </span>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 animate-fade-in stagger-4">
            {slides.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-amber-500/40" />
            ))}
            <div className="w-6 h-2 rounded-full bg-amber-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-10">
          {/* Logo */}
          <div className="text-center animate-fade-down">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 tracking-tight">
              ChronoQuest
            </span>
          </div>

          {/* Slide card */}
          <div className={`relative rounded-3xl bg-gradient-to-br ${current.gradient} border border-white/[0.06] p-8 flex flex-col items-center gap-6 transition-all duration-500 ${animating ? 'animate-scale-in' : ''}`}>
            {/* Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 ${current.glow} opacity-[0.08] blur-3xl rounded-full`} />

            {/* Icon */}
            <div className="relative">
              <div className={`absolute inset-0 ${current.glow} blur-2xl opacity-20 scale-150 rounded-full`} />
              <div className={`relative ${current.accent} bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6`}>
                <IconComp size={44} strokeWidth={1.5} />
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-3 relative">
              <h2 className="text-[22px] font-black text-white leading-tight tracking-tight">{current.title}</h2>
              <p className="text-white/45 text-[13px] leading-relaxed font-medium">{current.subtitle}</p>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === step ? 'w-7 bg-amber-400' : 'w-1.5 bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Feature pills */}
          <div className="grid grid-cols-3 gap-2.5 animate-fade-up stagger-3">
            {[
              { icon: Clock, label: '6 Lessons', sub: 'Across 4 eras' },
              { icon: Zap, label: 'Earn XP', sub: 'Level system' },
              { icon: Trophy, label: 'Compete', sub: 'Leaderboards' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="glass rounded-2xl p-3 text-center">
                <Icon size={16} className="text-amber-400 mx-auto mb-1.5" />
                <div className="text-[11px] font-bold text-white">{label}</div>
                <div className="text-[9px] text-white/30 mt-0.5">{sub}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleNext}
            className="btn-premium w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-4 rounded-2xl text-base shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {step < slides.length - 1 ? 'Continue' : "Let's Go"}
              <ChevronRight size={18} strokeWidth={3} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
