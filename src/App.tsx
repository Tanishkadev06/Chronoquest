import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import LessonPlayer from './pages/LessonPlayer';
import Quiz from './pages/Quiz';
import SkillTree from './pages/SkillTree';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import DailyChallenge from './pages/DailyChallenge';
import WhatIfMode from './pages/WhatIfMode';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const hasOnboarded = useGameStore((s) => s.hasOnboarded);
  return hasOnboarded ? <>{children}</> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/lesson/:id" element={<ProtectedRoute><LessonPlayer /></ProtectedRoute>} />
        <Route path="/quiz/:id" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/what-if/:id" element={<ProtectedRoute><WhatIfMode /></ProtectedRoute>} />
        <Route path="/skill-tree" element={<ProtectedRoute><SkillTree /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/daily-challenge" element={<ProtectedRoute><DailyChallenge /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
