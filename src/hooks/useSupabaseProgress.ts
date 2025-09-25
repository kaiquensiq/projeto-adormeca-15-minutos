import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CourseData, Module, Lesson, User } from '../types/course';
import { courseData } from '../data/courseData';

interface SupabaseLesson {
  id: string;
  module_id: string;
  title: string;
  description: string;
  duration: string;
  video_url?: string;
  order_index: number;
  checklist_data?: any;
  user_progress?: {
    is_completed: boolean;
    is_favorite: boolean;
    notes?: string;
    completed_at?: string;
  }[];
}

export const useSupabaseProgress = (userId?: string) => {
  const [data, setData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data
  const fetchUserData = async (userId: string): Promise<User | null> => {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      return {
        id: userData.id,
        name: userData.name,
        avatar: userData.avatar || '',
        joinedDate: userData.joined_date,
        currentStreak: userData.current_streak
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Fetch modules and lessons with user progress
  const fetchModulesAndLessons = async (userId: string): Promise<Module[]> => {
    try {
      // Fetch modules with lessons
      const { data: modulesData, error: modulesError } = await supabase
        .from('modules')
        .select(`
          *,
          lessons (
            *
          )
        `)
        .order('order_index');

      if (modulesError) throw modulesError;

      // Fetch user progress for all lessons
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      if (progressError) throw progressError;

      // Create a map of lesson progress
      const progressMap = new Map();
      progressData?.forEach(progress => {
        progressMap.set(progress.lesson_id, progress);
      });

      // Transform data to match CourseData interface
      const modules: Module[] = modulesData?.filter(module => module && module.id).map((module: any) => {
        const lessons: Lesson[] = (module.lessons || [])
          .filter((lesson: any) => lesson && lesson.id)
          .sort((a: any, b: any) => a.order_index - b.order_index)
          .map((lesson: any) => {
            const progress = progressMap.get(lesson.id);
            return {
              id: lesson.id,
              title: lesson.title || 'Lição sem título',
              description: lesson.description || '',
              duration: lesson.duration || 'Duração não informada',
              videoUrl: lesson.video_url,
              isCompleted: progress?.is_completed || false,
              isFavorite: progress?.is_favorite || false,
              notes: progress?.notes || '',
              checklist: lesson.checklist_data || undefined
            };
          });

        const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
        const totalLessons = lessons.length;
        
        // Determine if module is unlocked
        let isUnlocked = module.is_unlocked_by_default;
        if (!isUnlocked && module.order_index > 1) {
          // Check if previous module is completed
          const previousModuleIndex = module.order_index - 1;
          const previousModule = modulesData?.find((m: any) => m.order_index === previousModuleIndex);
          if (previousModule) {
            const previousModuleLessons = previousModule.lessons || [];
            const previousModuleCompleted = previousModuleLessons.every((lesson: any) => {
              const progress = progressMap.get(lesson.id);
              return progress?.is_completed || false;
            });
            isUnlocked = previousModuleCompleted;
          }
        }

        return {
          id: module.id,
          title: module.title || 'Módulo sem título',
          description: module.description || '',
          isUnlocked,
          badgeEarned: completedLessons === totalLessons && totalLessons > 0,
          completedLessons,
          totalLessons,
          lessons
        };
      }) || [];

      return modules;
    } catch (error) {
      console.error('Error fetching modules and lessons:', error);
      return [];
    }
  };

  // Load all data
  const loadData = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [userData, modules] = await Promise.all([
        fetchUserData(userId),
        fetchModulesAndLessons(userId)
      ]);

      if (!userData) {
        throw new Error('User data not found');
      }

      const courseDataResult: CourseData = {
        user: userData,
        modules,
        bonusItems: courseData.bonusItems, // Use static bonus items data
        courseProgress: {
          completedLessons: modules.reduce((acc, module) => acc + module.completedLessons, 0),
          totalLessons: modules.reduce((acc, module) => acc + module.totalLessons, 0),
          completedModules: modules.filter(module => module.badgeEarned).length,
          totalModules: modules.length,
          watchTimeMinutes: 0 // This would need to be calculated based on actual watch time
        }
      };

      setData(courseDataResult);
    } catch (error) {
      console.error('Error loading course data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load course data');
    } finally {
      setLoading(false);
    }
  };

  // Mark lesson as complete
  const markLessonComplete = async (lessonId: string, completed: boolean = true) => {
    if (!userId || !data) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          is_completed: completed,
          completed_at: completed ? new Date().toISOString() : null
        }, {
          onConflict: 'user_id,lesson_id'
        });

      if (error) throw error;

      // Reload data to reflect changes
      await loadData();
    } catch (error) {
      console.error('Error updating lesson progress:', error);
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (lessonId: string) => {
    if (!userId || !data) return;

    try {
      // Get current favorite status
      const { data: currentProgress } = await supabase
        .from('user_progress')
        .select('is_favorite')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      const newFavoriteStatus = !currentProgress?.is_favorite;

      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          is_favorite: newFavoriteStatus
        }, {
          onConflict: 'user_id,lesson_id'
        });

      if (error) throw error;

      // Reload data to reflect changes
      await loadData();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Save lesson notes
  const saveNote = async (lessonId: string, notes: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          notes
        }, {
          onConflict: 'user_id,lesson_id'
        });

      if (error) throw error;

      // Reload data to reflect changes
      await loadData();
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  // Get next lesson
  const getNextLesson = () => {
    if (!data) return null;

    for (const module of data.modules) {
      if (!module.isUnlocked) continue;
      
      for (const lesson of module.lessons) {
        if (!lesson.isCompleted) {
          return { module, lesson };
        }
      }
    }
    return null;
  };



  // Load data when userId changes
  useEffect(() => {
    loadData();
  }, [userId]);

  return {
    data,
    loading,
    error,
    markLessonComplete,
    toggleFavorite,
    saveNote,
    getNextLesson,
    refetch: loadData
  };
};