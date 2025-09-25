import React from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Play, 
  Lock, 
  Star,
  ArrowLeft,
  Target,
  TrendingUp
} from 'lucide-react';
import { Module } from '../types/course';
import { ProgressBar } from './ProgressBar';

interface ModuleViewProps {
  module: Module;
  onNavigate: (view: string, moduleId?: string, lessonId?: string) => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({ module, onNavigate }) => {
  const progressPercentage = Math.round((module.completedLessons / module.totalLessons) * 100);
  
  const totalDuration = module.lessons.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(':').map(Number);
    return total + minutes + (seconds / 60);
  }, 0);

  const completedDuration = module.lessons
    .filter(lesson => lesson.isCompleted)
    .reduce((total, lesson) => {
      const [minutes, seconds] = lesson.duration.split(':').map(Number);
      return total + minutes + (seconds / 60);
    }, 0);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <div>
          <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Módulo do Curso</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            {module.title}
          </h1>
        </div>
      </div>

      {/* Module Info Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${
                module.badgeEarned
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                  : module.isUnlocked
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                  : 'bg-slate-400'
              }`}>
                {module.badgeEarned ? (
                  <Star className="w-8 h-8 text-white fill-current" />
                ) : module.isUnlocked ? (
                  <BookOpen className="w-8 h-8 text-white" />
                ) : (
                  <Lock className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {module.title}
                </h2>
                {module.badgeEarned && (
                  <span className="inline-flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    Módulo Concluído
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
              {module.description}
            </p>

            {/* Progress */}
            <div className="space-y-4">
              <ProgressBar 
                progress={progressPercentage} 
                size="lg"
                color={module.badgeEarned ? 'green' : 'purple'}
              />
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {module.completedLessons} de {module.totalLessons} aulas concluídas
                </span>
                <span className="font-medium text-slate-800 dark:text-white">
                  {Math.round(completedDuration)} de {Math.round(totalDuration)} minutos
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-slate-800 dark:text-white">
                  Estatísticas
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total de aulas:</span>
                  <span className="font-medium text-slate-800 dark:text-white">
                    {module.totalLessons}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Duração total:</span>
                  <span className="font-medium text-slate-800 dark:text-white">
                    {Math.round(totalDuration)} min
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Progresso:</span>
                  <span className="font-medium text-slate-800 dark:text-white">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Status:</span>
                  <span className={`font-medium ${
                    module.badgeEarned 
                      ? 'text-green-600 dark:text-green-400' 
                      : module.isUnlocked
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {module.badgeEarned ? 'Concluído' : module.isUnlocked ? 'Em progresso' : 'Bloqueado'}
                  </span>
                </div>
              </div>
            </div>

            {module.isUnlocked && !module.badgeEarned && (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-medium text-slate-800 dark:text-white">
                    Continue Assistindo
                  </h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Você está indo muito bem! Continue assistindo para desbloquear o próximo módulo.
                </p>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  Faltam {module.totalLessons - module.completedLessons} aulas para concluir
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            Aulas do Módulo
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Clique em uma aula para assistir
          </p>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {module.lessons.map((lesson, index) => (
            <div 
              key={lesson.id}
              className={`p-6 transition-colors ${
                module.isUnlocked ? 'hover:bg-slate-50 dark:hover:bg-slate-700/50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Lesson Number & Status */}
                <div className="flex-shrink-0">
                  {lesson.isCompleted ? (
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  ) : module.isUnlocked ? (
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {index + 1}
                      </span>
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                      <Lock className="w-4 h-4 text-slate-500" />
                    </div>
                  )}
                </div>

                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium ${
                          module.isUnlocked 
                            ? 'text-slate-800 dark:text-white' 
                            : 'text-slate-500 dark:text-slate-500'
                        }`}>
                          {lesson.title}
                        </h4>
                        {lesson.isFavorite && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${
                        module.isUnlocked 
                          ? 'text-slate-600 dark:text-slate-300' 
                          : 'text-slate-500 dark:text-slate-500'
                      }`}>
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>
                        {lesson.notes && (
                          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                            <BookOpen className="w-3 h-3" />
                            <span>Com anotações</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    {module.isUnlocked && (
                      <button
                        onClick={() => onNavigate('lesson', module.id, lesson.id)}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        {lesson.isCompleted ? 'Rever' : 'Assistir'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};