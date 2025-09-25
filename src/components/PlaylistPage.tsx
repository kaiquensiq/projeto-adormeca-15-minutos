import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PlaylistPageProps {
  onBack: () => void;
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header com botão voltar */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🎵 Playlist Exclusiva para Dormir
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Coleção especial de sons relaxantes, música instrumental e frequências binaurais 
            cientificamente selecionadas para induzir o sono profundo.
          </p>
        </div>

        {/* Container do embed */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/UxhDlsH0cGU?list=PLF976D22AF995BCDD&autoplay=0&rel=0&modestbranding=1"
                title="Playlist Exclusiva para Dormir"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🎼</div>
              <h3 className="text-lg font-semibold text-white mb-2">Música Instrumental</h3>
              <p className="text-white/70 text-sm">
                Sons suaves e melodias relaxantes para acalmar a mente
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🌊</div>
              <h3 className="text-lg font-semibold text-white mb-2">Sons da Natureza</h3>
              <p className="text-white/70 text-sm">
                Ruídos naturais que promovem relaxamento profundo
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-lg font-semibold text-white mb-2">Frequências Binaurais</h3>
              <p className="text-white/70 text-sm">
                Ondas sonoras cientificamente calibradas para induzir o sono
              </p>
            </div>
          </div>

          {/* Dica importante */}
          <div className="mt-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Dica Importante</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Para melhores resultados, use fones de ouvido ou earbuds em volume baixo. 
                  Deixe a playlist tocar enquanto pratica as técnicas de respiração e relaxamento 
                  que você aprendeu no curso. O ideal é começar a ouvir 15-30 minutos antes de dormir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;