import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ModuleView } from './components/ModuleView';
import { VideoPlayer } from './components/VideoPlayer';
import { BonusSection } from './components/BonusSection';
import { ChecklistPage } from './components/ChecklistPage';
import PlaylistPage from './components/PlaylistPage';
import { FoodGuidePage } from './components/FoodGuidePage';
import { MorningRoutinePage } from './components/MorningRoutinePage';
import { UserProfilePage } from './components/UserProfilePage';
import { UserSettingsPage } from './components/UserSettingsPage';
import { LoginPage } from './components/LoginPage';
import { useAuth } from './hooks/useAuth';
import { useSupabaseProgress } from './hooks/useSupabaseProgress';
import { Moon, Sun, LogOut, User } from 'lucide-react';

function App() {
  const { user, loading: authLoading, signIn, signOut, isAuthenticated } = useAuth();
  const { data, loading: dataLoading, markLessonComplete, toggleFavorite, saveNote, getNextLesson } = useSupabaseProgress(user?.id);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentModuleId, setCurrentModuleId] = useState<string>();
  const [currentLessonId, setCurrentLessonId] = useState<string>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleNavigate = (view: string, moduleId?: string, lessonId?: string) => {
    setCurrentView(view);
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
  };

  const handleLessonComplete = () => {
    if (currentModuleId && currentLessonId) {
      markLessonComplete(currentLessonId);
    }
  };

  const handleToggleFavorite = () => {
    if (currentModuleId && currentLessonId) {
      toggleFavorite(currentLessonId);
    }
  };

  const handleNotesChange = (notes: string) => {
    if (currentModuleId && currentLessonId) {
      saveNote(currentLessonId, notes);
    }
  };

  const handleNextLesson = () => {
    const nextLesson = getNextLesson();
    if (nextLesson) {
      handleNavigate('lesson', nextLesson.module.id, nextLesson.lesson.id);
    }
  };



  const getCurrentModule = () => {
    return data?.modules.find(m => m.id === currentModuleId);
  };

  const getCurrentLesson = () => {
    const module = getCurrentModule();
    return module?.lessons.find(l => l.id === currentLessonId);
  };

  const getNextLessonInModule = () => {
    const module = getCurrentModule();
    const currentIndex = module?.lessons.findIndex(l => l.id === currentLessonId) ?? -1;
    if (module && currentIndex >= 0 && currentIndex < module.lessons.length - 1) {
      return module.lessons[currentIndex + 1];
    }
    return null;
  };

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    const result = await signIn(email, password);
    return result.success;
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            data={data!}
            onNavigate={handleNavigate}
            getNextLesson={getNextLesson}
          />
        );
      
      case 'module':
        const module = getCurrentModule();
        return module ? (
          <ModuleView 
            module={module} 
            onNavigate={handleNavigate}
          />
        ) : null;
      
      case 'lesson':
        const currentModule = getCurrentModule();
        const currentLesson = getCurrentLesson();
        const nextLesson = getNextLessonInModule();
        
        return currentModule && currentLesson ? (
          <VideoPlayer
            lesson={currentLesson}
            module={currentModule}
            nextLesson={nextLesson || undefined}
            onComplete={handleLessonComplete}
            onToggleFavorite={handleToggleFavorite}
            onNext={handleNextLesson}
            notes={currentLesson.notes || ''}
            onNotesChange={handleNotesChange}
          />
        ) : null;
      
      case 'bonus':
          return <BonusSection bonusItems={data?.bonusItems || []} onNavigate={handleNavigate} />;
      
      case 'checklist':
        return <ChecklistPage onBack={() => handleNavigate('bonus')} />;
      
      case 'playlist':
        return (
          <PlaylistPage 
            onBack={() => setCurrentView('bonus')}
          />
        );
      case 'food-guide':
        return (
          <FoodGuidePage 
            onBack={() => setCurrentView('bonus')}
          />
        );
      case 'morning-routine':
        return (
          <MorningRoutinePage 
            onBack={() => setCurrentView('bonus')}
          />
        );
      
      case 'profile':
        return (
          <UserProfilePage 
            data={data!}
            onNavigate={handleNavigate}
          />
        );
      
      case 'settings':
        return (
          <UserSettingsPage 
            data={data!}
            onNavigate={handleNavigate}
          />
        );
      
      default:
        return (
          <Dashboard 
            data={data}
            onNavigate={handleNavigate}
            getNextLesson={getNextLesson}
          />
        );
    }
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver logado, mostrar página de login
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show loading spinner while fetching course data
  if (dataLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Carregando dados do curso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          modules={data!.modules}
          currentModuleId={currentModuleId}
          currentLessonId={currentLessonId}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNavigate={handleNavigate}
        />

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Top Bar */}
          <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Moon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="font-semibold text-slate-800 dark:text-white">
                      Sono em 15
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Como Adormecer em Menos de 15 Minutos
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  )}
                </button>
                
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Sair da conta"
                >
                  <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-medium text-slate-800 dark:text-white text-sm">
                      {data.user.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {data.overallProgress}% concluído
                    </p>
                  </div>
                  {data.user.avatar ? (
                    <img
                      src={data.user.avatar}
                      alt={data.user.name}
                      className="w-10 h-10 rounded-full border-2 border-purple-200 dark:border-purple-800 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-purple-200 dark:border-purple-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="min-h-[calc(100vh-73px)]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;