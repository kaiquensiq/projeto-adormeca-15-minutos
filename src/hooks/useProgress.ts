import { useState, useEffect } from 'react';
import { CourseData } from '../types/course';
import { courseData as initialData } from '../data/courseData';

export const useProgress = () => {
  const [data, setData] = useState<CourseData>(initialData);

  const markLessonComplete = (moduleId: string, lessonId: string) => {
    setData(prevData => {
      const newData = { ...prevData };
      const module = newData.modules.find(m => m.id === moduleId);
      
      if (module) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson && !lesson.isCompleted) {
          lesson.isCompleted = true;
          module.completedLessons += 1;
          newData.completedLessons += 1;
          
          // Check if module is completed for badge
          if (module.completedLessons === module.totalLessons) {
            module.badgeEarned = true;
          }
          
          // Unlock next module
          const moduleIndex = newData.modules.findIndex(m => m.id === moduleId);
          if (moduleIndex < newData.modules.length - 1) {
            const nextModule = newData.modules[moduleIndex + 1];
            if (module.completedLessons === module.totalLessons) {
              nextModule.isUnlocked = true;
            }
          }
          
          // Update overall progress
          newData.overallProgress = Math.round(
            (newData.completedLessons / newData.totalLessons) * 100
          );
        }
      }
      
      return newData;
    });
  };

  const toggleFavorite = (moduleId: string, lessonId: string) => {
    setData(prevData => {
      const newData = { ...prevData };
      const module = newData.modules.find(m => m.id === moduleId);
      
      if (module) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) {
          lesson.isFavorite = !lesson.isFavorite;
        }
      }
      
      return newData;
    });
  };

  const saveNote = (moduleId: string, lessonId: string, note: string) => {
    setData(prevData => {
      const newData = { ...prevData };
      const module = newData.modules.find(m => m.id === moduleId);
      
      if (module) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) {
          lesson.notes = note;
        }
      }
      
      return newData;
    });
  };

  const getNextLesson = () => {
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

  return {
    data,
    markLessonComplete,
    toggleFavorite,
    saveNote,
    getNextLesson
  };
};