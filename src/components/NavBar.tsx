import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, GitBranch, Trophy, User } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/skill-tree', icon: BookOpen, label: 'Lessons' },
  { path: '/what-if', icon: GitBranch, label: 'What If' },
  { path: '/leaderboard', icon: Trophy, label: 'Ranks' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
      <div className="mx-3 mb-3">
        <div className="relative glass-strong rounded-3xl px-2 py-2.5 shadow-2xl shadow-black/50">
          {/* Active indicator glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-500/[0.03] to-transparent pointer-events-none" />
          <div className="flex items-center justify-around relative">
            {navItems.map(({ path, icon: Icon, label }) => {
              const active = pathname === path || (path === '/what-if' && pathname.startsWith('/what-if'));
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ${
                    active ? 'text-amber-400' : 'text-white/25 hover:text-white/45'
                  }`}
                >
                  {active && (
                    <>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
                      <div className="absolute inset-0 bg-amber-500/[0.08] rounded-2xl" />
                    </>
                  )}
                  <div className={`transition-all duration-300 ${active ? 'scale-115' : 'scale-100'}`}>
                    <Icon size={22} fill={active ? 'currentColor' : 'none'} strokeWidth={active ? 2.5 : 1.5} />
                  </div>
                  <span className={`text-[10px] font-bold tracking-wide transition-all duration-300 ${
                    active ? 'opacity-100' : 'opacity-50'
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
