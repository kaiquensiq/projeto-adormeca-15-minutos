import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  Target, 
  BookOpen, 
  Calendar,
  ChevronRight,
  Star,
  Flame,
  Gift,
  Moon,
  Sunrise,
  User
} from 'lucide-react';
import { CourseData } from '../types/course';
import { ProgressBar } from './ProgressBar';
import { ModuleCard } from './ModuleCard';

interface DashboardProps {
  data: CourseData;
  onNavigate: (view: string, moduleId?: string, lessonId?: string) => void;
  getNextLesson: () => { module: any; lesson: any } | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  data, 
  onNavigate, 
  getNextLesson 
}) => {
  const nextLesson = getNextLesson();
  const modules = data?.modules || [];
  const completedModules = modules.filter(m => m.badgeEarned).length;
  const totalWatchTime = modules.reduce((total, module) => {
    return total + (module.lessons || []).reduce((moduleTotal, lesson) => {
      if (lesson && lesson.isCompleted && lesson.duration) {
        const [minutes] = lesson.duration.split(':').map(Number);
        return moduleTotal + (minutes || 0);
      }
      return moduleTotal;
    }, 0);
  }, 0);

  // Use courseProgress if available, otherwise fallback to legacy properties
  const actualCompletedLessons = data?.courseProgress?.completedLessons ?? data?.completedLessons ?? 0;
  const actualTotalLessons = data?.courseProgress?.totalLessons ?? data?.totalLessons ?? 0;
  const actualOverallProgress = data?.overallProgress ?? (Math.round((actualCompletedLessons / actualTotalLessons) * 100) || 0);

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 space-y-6 md:space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-night-600 via-sleep-600 to-night-700 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/5 rounded-full -translate-y-10 translate-x-10 sm:-translate-y-16 sm:translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
        
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 cursor-pointer hover:opacity-80 transition-opacity flex-1"
            onClick={() => onNavigate('settings')}
          >
            {data.user.avatar ? (
              <img
                src={data.user.avatar}
                alt={data.user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/20 shadow-lg flex-shrink-0 hover:scale-105 transition-transform object-cover"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/20 shadow-lg flex-shrink-0 hover:scale-105 transition-transform bg-white/10 flex items-center justify-center">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white/60" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span>Olá, {data.user.name}!</span>
                <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
              </h1>
              <p className="text-night-100 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
                Continue sua jornada para dominar o sono perfeito. Você está progredindo muito bem!
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300" />
                  <span className="font-medium">{data.user.currentStreak} dias consecutivos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-mint-300" />
                  <span>Membro desde {new Date(data.user.joinedDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </div>
          {nextLesson && (
            <button
              onClick={() => onNavigate('lesson', nextLesson.module.id, nextLesson.lesson.id)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 md:px-8 rounded-lg sm:rounded-xl font-medium transition-all hover:scale-105 flex items-center gap-2 shadow-lg text-sm sm:text-base w-full sm:w-auto justify-center mt-4 sm:mt-0"
            >
              <Sunrise className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Continuar Estudando</span>
              <span className="sm:hidden">Continuar</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="group bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-night-500 to-sleep-500 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mb-2 sm:mb-0 self-start">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {actualOverallProgress}%
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
            Progresso Geral
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {actualCompletedLessons} de {actualTotalLessons} aulas completas
          </p>
        </div>

        <div className="group bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-mint-500 to-mint-600 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mb-2 sm:mb-0 self-start">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">
              {Math.floor(totalWatchTime / 60)}h {totalWatchTime % 60}m
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
            Tempo Estudado
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Conteúdo premium consumido
          </p>
        </div>

        <div className="group bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mb-2 sm:mb-0 self-start">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {completedModules}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
            Módulos Concluídos
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            De {modules.length} módulos do curso
          </p>
        </div>

        <div className="group bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mb-2 sm:mb-0 self-start">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {data.user.currentStreak}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
            Sequência Atual
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Dias consecutivos estudando
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-night-500 to-sleep-500 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          Seu Progresso no Curso
        </h2>
        <ProgressBar 
          progress={actualOverallProgress} 
          size="lg" 
          className="mb-6"
          color="purple"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4 text-lg">
              🎯 Próximos Passos
            </h4>
            {nextLesson && nextLesson.module && nextLesson.lesson ? (
              <div className="bg-gradient-to-r from-night-50 to-sleep-50 dark:from-night-900/20 dark:to-sleep-900/20 p-6 rounded-xl border border-night-200 dark:border-night-800">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="w-5 h-5 text-night-600 dark:text-night-400" />
                  <span className="text-sm font-medium text-night-600 dark:text-night-400">
                    {nextLesson.module.title || 'Módulo sem título'}
                  </span>
                </div>
                <h5 className="font-semibold text-slate-800 dark:text-white mb-2 text-lg">
                  {nextLesson.lesson.title || 'Lição sem título'}
                </h5>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {nextLesson.lesson.description || 'Descrição não disponível'}
                </p>
                <button
                  onClick={() => onNavigate('lesson', nextLesson.module.id, nextLesson.lesson.id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-night-600 to-sleep-600 hover:from-night-700 hover:to-sleep-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-[1.02] shadow-lg"
                >
                  Assistir agora
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-green-600 dark:text-green-400 text-lg">
                    🎉 Parabéns!
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Você concluiu todo o curso! Agora acesse os bônus exclusivos para aprofundar ainda mais seus conhecimentos.
                </p>
                <button
                  onClick={() => onNavigate('bonus')}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-[1.02] shadow-lg"
                >
                  <Gift className="w-4 h-4" />
                  Ver bônus exclusivos
                </button>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4 text-lg">
              🏆 Suas Conquistas
            </h4>
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex-shrink-0">
                    {module.badgeEarned ? (
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    ) : module.isUnlocked ? (
                      <div className="w-8 h-8 border-2 border-night-300 dark:border-night-600 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                        <div className="w-3 h-3 bg-night-400 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`font-medium ${
                      module.badgeEarned 
                        ? 'text-slate-800 dark:text-white' 
                        : module.isUnlocked
                        ? 'text-slate-700 dark:text-slate-200'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {module.title}
                    </span>
                    {module.isUnlocked && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {module.completedLessons}/{module.totalLessons} aulas
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access to Bonuses */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-night-500 to-sleep-500 rounded-lg">
              <Gift className="w-5 h-5 text-white" />
            </div>
            Acesso Rápido aos Bônus
          </h2>
          <button
            onClick={() => onNavigate('bonus')}
            className="flex items-center gap-2 text-night-600 dark:text-night-400 hover:text-night-700 dark:hover:text-night-300 font-medium transition-colors"
          >
            Ver todos os bônus
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data!.bonusItems.map((bonus) => {
            const handleBonusClick = () => {
              if (bonus.id === 'bonus-1') {
                onNavigate('checklist');
              } else if (bonus.id === 'bonus-2') {
                onNavigate('playlist');
              } else if (bonus.id === 'bonus-3') {
                onNavigate('food-guide');
              } else if (bonus.id === 'bonus-4') {
                onNavigate('morning-routine');
              } else {
                window.open(bonus.downloadUrl, '_blank');
              }
            };

            return (
              <div key={bonus.id} className="group p-6 bg-gradient-to-br from-night-50 to-sleep-50 dark:from-night-900/20 dark:to-sleep-900/20 rounded-xl border border-night-200 dark:border-night-800/30 hover:shadow-lg transition-all hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-night-500 to-sleep-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-white text-sm">
                    {bonus.title}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                  {bonus.description}
                </p>
                <button 
                  onClick={handleBonusClick}
                  className="w-full bg-gradient-to-r from-night-600 to-sleep-600 hover:from-night-700 hover:to-sleep-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all hover:scale-[1.02] shadow-sm"
                >
                  Acessar
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-night-500 to-sleep-500 rounded-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          Módulos do Curso
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onNavigate={(moduleId) => onNavigate('module', moduleId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};