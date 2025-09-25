import React from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Lock, 
  Star, 
  Clock,
  TrendingUp
} from 'lucide-react';
import { Module } from '../types/course';
import { ProgressBar } from './ProgressBar';

interface ModuleCardProps {
  module: Module;
  onNavigate: (moduleId: string) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onNavigate }) => {
  const progressPercentage = Math.round((module.completedLessons / module.totalLessons) * 100);
  
  const totalDuration = module.lessons.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(':').map(Number);
    return total + minutes + (seconds / 60);
  }, 0);

  return (
    <div 
      onClick={() => module.isUnlocked && onNavigate(module.id)}
      className={`relative bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-3 sm:p-4 md:p-6 transition-all duration-300 ${
        module.isUnlocked 
          ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' 
          : 'opacity-60 cursor-not-allowed'
      }`}
    >
      {/* Badge for completed modules */}
      {module.badgeEarned && (
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-1.5 sm:p-2 shadow-lg">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" />
        </div>
      )}

      {/* Lock icon for locked modules */}
      {!module.isUnlocked && (
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-slate-400 rounded-full p-1.5 sm:p-2">
          <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>
      )}

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 p-2 sm:p-3 rounded-lg sm:rounded-xl ${
          module.badgeEarned
            ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
            : module.isUnlocked
            ? 'bg-gradient-to-br from-purple-500 to-blue-500'
            : 'bg-slate-400'
        }`}>
          {module.badgeEarned ? (
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" />
          ) : (
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1 sm:mb-2">
            <h3 className="font-semibold text-base sm:text-lg text-slate-800 dark:text-white leading-tight">
              {module.title}
            </h3>
            {module.completedLessons === module.totalLessons && module.isUnlocked && (
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 ml-2" />
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {module.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 sm:mb-4">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{module.totalLessons} aulas</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{Math.round(totalDuration)} min</span>
            </div>
            {module.isUnlocked && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{progressPercentage}% completo</span>
              </div>
            )}
          </div>

          {/* Progress */}
          {module.isUnlocked && (
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  Progresso
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {module.completedLessons}/{module.totalLessons} aulas
                </span>
              </div>
              
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 sm:h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              
              {module.badgeEarned && (
                <div className="mt-2 sm:mt-3 flex items-center gap-1 sm:gap-2 text-green-600 dark:text-green-400 text-xs sm:text-sm font-medium">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Módulo concluído!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};