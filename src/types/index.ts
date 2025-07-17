export interface Question {
  name: string;
  url: string;
}

export interface Day {
  badge: 'easy' | 'medium' | 'hard';
  list: Question[];
}

export interface Week {
  title: string;
  days: Day[];
}

export interface CheckboxData {
  [key: string]: boolean;
}

export interface ProgressStats {
  totalQuestions: number;
  completedQuestions: number;
  progressPercent: number;
  currentStreak: number;
}