export interface User {
  id: string;
  name: string;
  avatar: string;
  joinedDate: string;
  currentStreak: number;
}

export interface ChecklistItem {
  category: string;
  tasks: string[];
}

export interface Checklist {
  title: string;
  items: ChecklistItem[];
  footer: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  checklist?: Checklist;
  isCompleted: boolean;
  notes?: string;
  isFavorite?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  completedLessons: number;
  totalLessons: number;
  isUnlocked: boolean;
  badgeEarned?: boolean;
}

export interface BonusItem {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'audio' | 'guide';
  downloadUrl: string;
  fileSize: string;
}

export interface CourseProgress {
  completedLessons: number;
  totalLessons: number;
  completedModules: number;
  totalModules: number;
  watchTimeMinutes: number;
}

export interface CourseData {
  user: User;
  modules: Module[];
  bonusItems?: BonusItem[];
  overallProgress?: number;
  totalLessons?: number;
  completedLessons?: number;
  courseProgress?: CourseProgress;
  currentLesson?: {
    moduleId: string;
    lessonId: string;
  };
}