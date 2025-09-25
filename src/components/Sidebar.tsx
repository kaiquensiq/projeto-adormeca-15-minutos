import React from 'react';
import { 
  Home, 
  PlayCircle, 
  BookOpen, 
  Menu, 
  Gift,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Lock,
  Star
} from 'lucide-react';
import { Module } from '../types/course';

interface SidebarProps {
  modules: Module[];
  currentModuleId?: string;
  currentLessonId?: string;
  isCollapsed: boolean;
  onToggle: () => void;
  onNavigate: (view: string, moduleId?: string, lessonId?: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  modules,
  currentModuleId,
  currentLessonId,
  isCollapsed,
  onToggle,
  onNavigate
}) => {
  const [expandedModules, setExpandedModules] = React.useState<Set<string>>(
new Set(currentModuleId ? [currentModuleId] : [])
  );

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  return (
    <div className={`bg-slate-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-12 sm:w-16' : 'w-64 sm:w-72 md:w-80'
    } min-h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-3 sm:p-4 md:p-6 border-b border-slate-800">
        <div className="flex items-center justify-between">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <img 
                src="https://i.imgur.com/Csd6IIQ.png" 
                alt="Logo Sono em 15" 
                className="w-12 h-12 object-contain" 
              />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">Sono em 15</h1>
                <p className="text-xs sm:text-sm text-slate-400">Área de Membros</p>
              </div>
            </div>
          ) : (
            <img 
              src="https://i.imgur.com/Csd6IIQ.png" 
              alt="Logo Sono em 15" 
              className="w-8 h-8 object-contain" 
            />
          )}
          <button
            onClick={onToggle}
            className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-lg transition-colors"
            title={isCollapsed ? "Expandir sidebar" : "Minimizar sidebar"}
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-3 sm:p-4 md:p-6">
        <nav className="space-y-1 sm:space-y-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-left"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            {!isCollapsed && <span className="text-sm sm:text-base">Dashboard</span>}
          </button>
          
          <button
            onClick={() => onNavigate('bonus')}
            className="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-left"
          >
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            {!isCollapsed && <span className="text-sm sm:text-base">Bônus Exclusivos</span>}
          </button>
        </nav>
      </div>

      {/* Modules */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto scroll-area px-3 sm:px-4 pb-3 sm:pb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-slate-400 mb-2 sm:mb-3 uppercase tracking-wide">
            Módulos do Curso
          </h3>
          
          <div className="space-y-1 sm:space-y-2">
            {modules?.filter(module => module && module.id).map((module) => (
              <div key={module.id} className="space-y-1">
                <button
                  onClick={() => toggleModule(module.id)}
                  disabled={!module.isUnlocked}
                  className={`w-full flex items-center justify-between p-2 sm:p-3 rounded-lg transition-all ${
                    module.isUnlocked 
                      ? 'hover:bg-slate-800 text-white' 
                      : 'text-slate-500 cursor-not-allowed'
                  } ${currentModuleId === module.id ? 'bg-purple-900/50' : ''}`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    {module.isUnlocked ? (
                      module.badgeEarned ? (
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                      ) : (
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      )
                    ) : (
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                    )}
                    <div className="text-left">
                      <div className="font-medium text-xs sm:text-sm">{module.title || 'Módulo sem título'}</div>
                      <div className="text-xs text-slate-400">
                        {module.completedLessons || 0}/{module.totalLessons || 0} aulas
                      </div>
                    </div>
                  </div>
                  
                  {module.isUnlocked && (
                    <div className="flex items-center gap-1 sm:gap-2">
                      {module.badgeEarned && (
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      )}
                      {expandedModules.has(module.id) ? (
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </div>
                  )}
                </button>

                {/* Lessons */}
                {expandedModules.has(module.id) && module.isUnlocked && (
                  <div className="ml-4 sm:ml-6 space-y-1">
                    {module.lessons?.filter(lesson => lesson && lesson.id).map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => onNavigate('lesson', module.id, lesson.id)}
                        className={`w-full flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg transition-colors text-left text-xs sm:text-sm ${
                          currentLessonId === lesson.id
                            ? 'bg-purple-900/50 text-purple-200'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1 sm:gap-2">
                          {lesson.isCompleted ? (
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                          ) : (
                            <PlayCircle className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                          )}
                          {lesson.isFavorite && (
                            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{lesson.title || 'Lição sem título'}</div>
                          <div className="text-xs text-slate-500">{lesson.duration || 'Duração não informada'}</div>
                        </div>
                      </button>
                    )) || []}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};