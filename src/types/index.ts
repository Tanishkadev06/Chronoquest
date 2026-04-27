export interface Choice {
  id: string;
  text: string;
  outcome: string;
  xpGain: number;
}

export interface StoryStep {
  id: string;
  text: string;
  choices?: Choice[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WhatIfChoice {
  id: string;
  text: string;
  consequence: string;
  impactDelta: {
    stability: number;
    growth: number;
    humanImpact: number;
  };
}

export interface WhatIfDecisionPoint {
  id: string;
  narrative: string;
  choices: WhatIfChoice[];
}

export interface WhatIfScenario {
  title: string;
  year: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  intro: string;
  decisions: WhatIfDecisionPoint[];
  realHistory: string;
  yourTimeline: string;
  impact: {
    stability: number;
    growth: number;
    humanImpact: number;
  };
  effects: {
    immediate: string;
    midTerm: string;
    longTerm: string;
  };
  xpReward: number;
}

export interface Lesson {
  id: string;
  title: string;
  category: 'Ancient' | 'Medieval' | 'Modern' | 'Indian History';
  era: string;
  description: string;
  xpReward: number;
  steps: StoryStep[];
  quiz: QuizQuestion[];
  requiredLevel: number;
  imageUrl: string;
  whatIf?: WhatIfScenario;
}

export interface UserProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  xpEarned: number;
  completedAt: string | null;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  isCurrentUser?: boolean;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpBonus: number;
  timeLimit: number;
  question: QuizQuestion;
  expiresAt: string;
}
