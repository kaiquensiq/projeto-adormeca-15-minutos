import React from 'react';
import {
  User,
  Calendar,
  Flame,
  Award,
  Clock,
  Target,
  TrendingUp,
  Mail,
  MapPin,
  Phone,
  Edit3,
  ArrowLeft,
  Star,
  Moon
} from 'lucide-react';
import { CourseData } from '../types/course';

interface UserProfilePageProps {
  data: CourseData;
  onNavigate: (view: string) => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ data, onNavigate }) => {
  const { user, modules, overallProgress, completedLessons, totalLessons, courseProgress } = data;
  const completedModules = modules.filter(m => m.badgeEarned).length;
  
  // Use courseProgress if available, otherwise fallback to legacy properties
  const actualCompletedLessons = courseProgress?.completedLessons ?? completedLessons ?? 0;
  const actualTotalLessons = courseProgress?.totalLessons ?? totalLessons ?? 0;
  const actualOverallProgress = overallProgress ?? (Math.round((actualCompletedLessons / actualTotalLessons) * 100) || 0);
  const totalWatchTime = modules.reduce((total, module) => {
    return total + module.lessons.reduce((moduleTotal, lesson) => {
      if (lesson.isCompleted) {
        const [minutes] = lesson.duration.split(':').map(Number);
        return moduleTotal + minutes;
      }
      return moduleTotal;
    }, 0);
  }, 0);

  const formatWatchTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}min`;
    }
    return `${minutes}min`;
  };

  const joinedDate = new Date(user.joinedDate);
  const daysSinceJoined = Math.floor((new Date().getTime() - joinedDate.getTime()) / (1000 * 3600 * 24));

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 space-y-6 md:space-y-8 animate-fade-in">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar ao Dashboard</span>
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-night-600 via-sleep-600 to-night-700 rounded-xl md:rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20 shadow-lg object-cover"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20 shadow-lg bg-white/10 flex items-center justify-center">
                <User className="w-12 h-12 md:w-16 md:h-16 text-white/60" />
              </div>
            )}
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
              {user.name}
              <Moon className="w-6 h-6 text-yellow-300" />
            </h1>
            <p className="text-night-100 mb-4 text-sm md:text-base">
              Membro há {daysSinceJoined} dias • Especialista em Sono
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-300" />
                <span>{user.currentStreak} dias consecutivos</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-mint-300" />
                <span>Desde {joinedDate.toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-gradient-to-br from-night-500 to-sleep-500 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {actualOverallProgress}%
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">
            Progresso Geral
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {actualCompletedLessons} de {actualTotalLessons} aulas
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {completedModules}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">
            Módulos Concluídos
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            de {modules.length} módulos
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
              {formatWatchTime(totalWatchTime)}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">
            Tempo Assistido
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Total de estudos
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {user.currentStreak}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">
            Sequência Atual
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            dias consecutivos
          </p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          Suas Conquistas
        </h2>
        
        <div className="grid gap-4">
          {modules.map((module) => (
            <div key={module.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex-shrink-0">
                {module.badgeEarned ? (
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white fill-current" />
                  </div>
                ) : module.isUnlocked ? (
                  <div className="w-10 h-10 border-2 border-night-300 dark:border-night-600 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                    <div className="w-4 h-4 bg-night-400 rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-medium ${
                  module.badgeEarned 
                    ? 'text-slate-800 dark:text-white' 
                    : module.isUnlocked
                    ? 'text-slate-700 dark:text-slate-200'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {module.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {module.completedLessons}/{module.totalLessons} aulas concluídas
                </p>
              </div>
              {module.badgeEarned && (
                <div className="text-green-600 dark:text-green-400 font-medium text-sm">
                  ✓ Concluído
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-night-500 to-sleep-500 rounded-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            Informações Pessoais
          </h2>
          <button className="flex items-center gap-2 text-night-600 dark:text-night-400 hover:text-night-700 dark:hover:text-night-300 font-medium transition-colors">
            <Edit3 className="w-4 h-4" />
            Editar
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                <p className="font-medium text-slate-800 dark:text-white">maria.santos@email.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Telefone</p>
                <p className="font-medium text-slate-800 dark:text-white">(11) 99999-9999</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Localização</p>
                <p className="font-medium text-slate-800 dark:text-white">São Paulo, SP</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Meta de Sono</p>
                <p className="font-medium text-slate-800 dark:text-white">8 horas por noite</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};