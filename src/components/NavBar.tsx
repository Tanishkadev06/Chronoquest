import { useNavigate, useLocation } from 'react-router-dom';
import { Home, GitBranch, Trophy, User } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/skill-tree', icon: GitBranch, label: 'Skills' },
  { path: '/leaderboard', icon: Trophy, label: 'Ranks' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
      <div className="mx-3 mb-3">
        <div className="glass-strong rounded-2xl px-2 py-2.5 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-around">
            {navItems.map(({ path, icon: Icon, label }) => {
              const active = pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`relative flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-300 ${
                    active ? 'text-amber-400' : 'text-white/30 hover:text-white/50'
                  }`}
                >
                  {active && (
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-amber-400 rounded-full" />
                  )}
                  <div className={`transition-all duration-300 ${active ? 'scale-110' : 'scale-100'}`}>
                    <Icon size={22} fill={active ? 'currentColor' : 'none'} strokeWidth={active ? 2.5 : 1.5} />
                  </div>
                  <span className={`text-[10px] font-bold tracking-wide transition-all duration-300 ${
                    active ? 'opacity-100' : 'opacity-60'
                  }`}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
