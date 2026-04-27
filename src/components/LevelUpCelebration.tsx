import { useEffect, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';

interface LevelUpCelebrationProps {
  level: number;
  onDone: () => void;
}

export default function LevelUpCelebration({ level, onDone }: LevelUpCelebrationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-500 ${visible ? 'bg-black/60' : 'bg-black/0'}`}>
      {/* Expanding rings */}
      {visible && (
        <>
          <div className="absolute w-32 h-32 rounded-full border-2 border-amber-400/40 animate-ring-expand" />
          <div className="absolute w-32 h-32 rounded-full border-2 border-amber-400/20 animate-ring-expand" style={{ animationDelay: '0.2s' }} />
        </>
      )}

      {/* Confetti particles */}
      {visible && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
                backgroundColor: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#f97316'][i % 5],
                animation: `confetti-fall ${1.5 + Math.random() * 1.5}s ease-out ${Math.random() * 0.5}s forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className={`relative flex flex-col items-center gap-5 transition-all duration-500 ${visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        {/* Level badge */}
        <div className="relative animate-level-up-burst">
          <div className="absolute inset-0 bg-amber-500/30 blur-3xl rounded-full scale-200" />
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/50 border-4 border-amber-300/30">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-amber-100/80 uppercase tracking-widest">Level</span>
              <span className="text-4xl font-black text-white tabular-nums leading-none">{level}</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center animate-fade-up stagger-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={20} className="text-amber-400" fill="currentColor" />
            <h2 className="text-2xl font-black text-white tracking-tight animate-text-glow">Level Up!</h2>
            <Sparkles size={20} className="text-amber-400" fill="currentColor" />
          </div>
          <p className="text-white/40 text-sm font-medium">New era unlocked</p>
        </div>

        {/* Stars */}
        <div className="flex gap-3 animate-fade-up stagger-3">
          {[...Array(3)].map((_, i) => (
            <Star key={i} size={16} className="text-amber-400 animate-float" fill="currentColor" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
