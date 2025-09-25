import React from 'react';
import { 
  ExternalLink, 
  FileText, 
  Music, 
  Book, 
  Gift,
  Clock,
  CheckCircle
} from 'lucide-react';
import { BonusItem } from '../types/course';

interface BonusSectionProps {
  bonusItems: BonusItem[];
  onNavigate?: (view: string) => void;
}

export const BonusSection: React.FC<BonusSectionProps> = ({ bonusItems, onNavigate }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500" />;
      case 'audio':
        return <Music className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-500" />;
      case 'guide':
        return <Book className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" />;
      case 'checklist':
        return <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-500" />;
      case 'guia':
        return <Book className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-500" />;
      default:
        return <Gift className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'audio':
        return 'Áudio';
      case 'guide':
        return 'Guia';
      case 'checklist':
        return 'Checklist';
      case 'guia':
        return 'Guia';
      default:
        return 'Arquivo';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
            Bônus Exclusivos
          </h1>
        </div>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4 sm:px-0">
          Recursos adicionais para potencializar sua jornada rumo ao sono perfeito. 
          Acesse e aproveite todos os materiais complementares.
        </p>
      </div>

      {/* Success Message */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
          <h3 className="font-semibold text-sm sm:text-base text-green-800 dark:text-green-200">
            Parabéns por se dedicar ao seu bem-estar!
          </h3>
        </div>
        <p className="text-sm sm:text-base text-green-700 dark:text-green-300">
          Todos os bônus estão liberados para você. Use estes recursos para acelerar 
          seus resultados e manter a motivação alta.
        </p>
      </div>

      {/* Bonus Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {bonusItems.map((item) => (
          <div 
            key={item.id}
            className="group bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 md:p-8 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
              {/* Icon */}
              <div className="flex-shrink-0 p-2 sm:p-3 md:p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform">
                {getIcon(item.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="min-w-0 flex-1">
                    <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium px-2 py-1 rounded-md mb-1 sm:mb-2">
                      {getTypeLabel(item.type)}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-1 sm:mb-2 truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* File Info */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Acesso instantâneo</span>
                    <span className="sm:hidden">Instantâneo</span>
                  </div>
                </div>

                {/* Access Button */}
                <button
                  onClick={() => {
                    // Se for o checklist da rotina noturna, navegar para a página do checklist
                    if (item.id === 'bonus-1' && onNavigate) {
                      onNavigate('checklist');
                    } else if (item.id === 'bonus-2' && onNavigate) {
                      // Se for a playlist exclusiva para dormir, navegar para a página da playlist
                      onNavigate('playlist');
                    } else if (item.id === 'bonus-3' && onNavigate) {
                      onNavigate('food-guide');
                    } else if (item.id === 'bonus-4' && onNavigate) {
                      onNavigate('morning-routine');
                    } else {
                      // Abrir em nova aba para outros itens
                      window.open(item.downloadUrl, '_blank');
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all hover:shadow-lg touch-target"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Acessar {getTypeLabel(item.type)}</span>
                  <span className="sm:hidden">Acessar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg sm:rounded-xl p-4 sm:p-6">
        <h3 className="font-semibold text-base sm:text-lg text-slate-800 dark:text-white mb-3 sm:mb-4">
          💡 Como usar os bônus
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <div>
            <h4 className="font-medium text-sm sm:text-base text-slate-800 dark:text-white mb-1 sm:mb-2">
              📋 Checklist da Rotina Noturna
            </h4>
            <p>
              Use para criar e manter sua rotina noturna perfeita.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base text-slate-800 dark:text-white mb-1 sm:mb-2">
              🎵 Playlist para Dormir
            </h4>
            <p>
              Escute 30-60 minutos antes de dormir. Use fones ou caixa de som 
              em volume baixo.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base text-slate-800 dark:text-white mb-1 sm:mb-2">
              🥗 Guia Alimentar
            </h4>
            <p>
              Consulte antes das refeições. Evite alimentos que prejudicam 
              o sono, especialmente à noite.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base text-slate-800 dark:text-white mb-1 sm:mb-2">
              ☀️ Rotina Matinal
            </h4>
            <p>
              Implemente gradualmente. Uma boa manhã garante uma boa noite de sono.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};