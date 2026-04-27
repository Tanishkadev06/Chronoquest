import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

interface XPToastProps {
  amount: number;
  onDone: () => void;
}

export default function XPToast({ amount, onDone }: XPToastProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 200);
    const t2 = setTimeout(() => setPhase('exit'), 1400);
    const t3 = setTimeout(onDone, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-start justify-center pt-16">
      <div
        className={`flex items-center gap-2.5 transition-all duration-500 ease-out ${
          phase === 'enter' ? 'opacity-0 -translate-y-4 scale-75' :
          phase === 'hold' ? 'opacity-100 translate-y-0 scale-100' :
          'opacity-0 -translate-y-10 scale-110'
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-amber-400 blur-2xl rounded-full scale-200 opacity-50" />
          <div className="absolute inset-0 bg-orange-500 blur-xl rounded-full scale-150 opacity-30" />
          <div className="relative bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-black font-extrabold px-7 py-3.5 rounded-2xl shadow-2xl shadow-amber-500/50 flex items-center gap-2.5 text-lg tracking-wide">
            <Zap size={22} fill="currentColor" strokeWidth={2.5} />
            <span className="tabular-nums">+{amount} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
