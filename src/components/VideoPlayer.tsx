import React, { useState } from 'react';
import { 
  CheckCircle,
  Heart,
  BookOpen,
  SkipForward
} from 'lucide-react';
import { Lesson, Module } from '../types/course';

interface VideoPlayerProps {
  lesson: Lesson;
  module: Module;
  nextLesson?: Lesson;
  onComplete: () => void;
  onToggleFavorite: () => void;
  onNext: () => void;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lesson,
  module,
  nextLesson,
  onComplete,
  onToggleFavorite,
  onNext,
  notes,
  onNotesChange
}) => {
  const [showNotes, setShowNotes] = useState(false);
  
  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}?rel=0&modestbranding=1` : url;
  };

  // No need for complex video controls since YouTube handles them

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Video Header */}
      <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-600 dark:text-purple-400 mb-1">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">{module.title}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-1">
              {lesson.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm line-clamp-2">
              {lesson.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onToggleFavorite}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                lesson.isFavorite
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
              }`}
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${lesson.isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            {lesson.isCompleted && (
              <div className="flex items-center gap-1 sm:gap-2 bg-green-100 dark:bg-green-900/20 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 hidden sm:inline">
                  Concluída
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Area - Video or Checklist */}
      {lesson.videoUrl ? (
        <div className="relative bg-black">
          <div className="aspect-video">
            <iframe
              src={getYouTubeEmbedUrl(lesson.videoUrl)}
              title={lesson.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      ) : lesson.checklist ? (
        <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-slate-800 dark:text-white">
              {lesson.checklist.title}
            </h3>
            
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {lesson.checklist.items.map((item, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-5 shadow-sm border border-slate-200 dark:border-slate-600">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-3 text-sm sm:text-base">
                    {item.category}
                  </h4>
                  <ul className="space-y-2">
                    {item.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-purple-100 dark:bg-purple-900/30 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
                {lesson.checklist.footer}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Action Buttons */}
      <div className="p-3 sm:p-4 md:p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
          {!lesson.isCompleted && (
            <button
              onClick={onComplete}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Marcar como Concluída</span>
              <span className="sm:hidden">Concluir</span>
            </button>
          )}

          {nextLesson && (
            <button
              onClick={onNext}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Próxima Aula</span>
              <span className="sm:hidden">Próxima</span>
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          <button
            onClick={() => setShowNotes(!showNotes)}
            className="flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{showNotes ? 'Ocultar Notas' : 'Minhas Notas'}</span>
            <span className="sm:hidden">Notas</span>
          </button>
        </div>
      </div>

      {/* Notes Section */}
      {showNotes && (
        <div className="p-3 sm:p-4 md:p-6">
          <h4 className="font-medium text-slate-800 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">
            Suas Anotações Pessoais
          </h4>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Escreva suas anotações sobre esta aula..."
            className="w-full p-3 sm:p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white resize-none text-sm sm:text-base"
            rows={4}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Suas notas são salvas automaticamente
          </p>
        </div>
      )}
    </div>
  );
};