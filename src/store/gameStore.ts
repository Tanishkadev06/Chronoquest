import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress } from '../types';

interface GameState {
  userName: string;
  xp: number;
  level: number;
  streak: number;
  lastPlayedDate: string | null;
  hasOnboarded: boolean;
  progress: Record<string, UserProgress>;
  dailyChallengeCompleted: boolean;
  dailyChallengeDate: string | null;
  totalLessonsCompleted: number;
  pendingLevelUp: number | null;

  setUserName: (name: string) => void;
  completeOnboarding: (name: string) => void;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string, score: number, xpEarned: number) => void;
  completeDailyChallenge: () => void;
  updateStreak: () => void;
  resetProgress: () => void;
  clearLevelUp: () => void;
}

function xpForLevel(level: number): number {
  return level * 200;
}

function calcLevel(xp: number): number {
  let level = 1;
  let totalRequired = 0;
  while (true) {
    totalRequired += xpForLevel(level);
    if (xp < totalRequired) break;
    level++;
  }
  return level;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      userName: '',
      xp: 0,
      level: 1,
      streak: 0,
      lastPlayedDate: null,
      hasOnboarded: false,
      progress: {},
      dailyChallengeCompleted: false,
      dailyChallengeDate: null,
      totalLessonsCompleted: 0,
      pendingLevelUp: null,

      setUserName: (name) => set({ userName: name }),

      completeOnboarding: (name) => set({ userName: name, hasOnboarded: true }),

      addXP: (amount) => {
        const oldLevel = get().level;
        const newXP = get().xp + amount;
        const newLevel = calcLevel(newXP);
        set({
          xp: newXP,
          level: newLevel,
          pendingLevelUp: newLevel > oldLevel ? newLevel : get().pendingLevelUp,
        });
      },

      completeLesson: (lessonId, score, xpEarned) => {
        const existing = get().progress[lessonId];
        const wasCompleted = existing?.completed;
        const oldLevel = get().level;
        const newXP = get().xp + xpEarned;
        const newLevel = calcLevel(newXP);
        const newTotal = wasCompleted ? get().totalLessonsCompleted : get().totalLessonsCompleted + 1;

        set((state) => ({
          xp: newXP,
          level: newLevel,
          totalLessonsCompleted: newTotal,
          pendingLevelUp: newLevel > oldLevel ? newLevel : state.pendingLevelUp,
          progress: {
            ...state.progress,
            [lessonId]: {
              lessonId,
              completed: true,
              score,
              xpEarned,
              completedAt: new Date().toISOString(),
            },
          },
        }));
      },

      completeDailyChallenge: () => {
        const today = new Date().toDateString();
        set({ dailyChallengeCompleted: true, dailyChallengeDate: today });
        get().addXP(75);
      },

      updateStreak: () => {
        const today = new Date().toDateString();
        const last = get().lastPlayedDate;
        if (last === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const wasYesterday = last === yesterday.toDateString();

        set({
          streak: wasYesterday ? get().streak + 1 : 1,
          lastPlayedDate: today,
        });
      },

      clearLevelUp: () => set({ pendingLevelUp: null }),

      resetProgress: () =>
        set({
          xp: 0,
          level: 1,
          streak: 0,
          lastPlayedDate: null,
          progress: {},
          dailyChallengeCompleted: false,
          dailyChallengeDate: null,
          totalLessonsCompleted: 0,
          pendingLevelUp: null,
        }),
    }),
    { name: 'chronoquest-storage' }
  )
);

export function xpToNextLevel(xp: number, level: number): { current: number; required: number; percentage: number } {
  let totalAtStart = 0;
  for (let i = 1; i < level; i++) {
    totalAtStart += xpForLevel(i);
  }
  const required = xpForLevel(level);
  const current = xp - totalAtStart;
  return { current, required, percentage: Math.min((current / required) * 100, 100) };
}
