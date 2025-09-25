import React from 'react';

interface MorningRoutinePageProps {
  onBack: () => void;
}

export const MorningRoutinePage: React.FC<MorningRoutinePageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-orange-600 hover:text-orange-800 transition-colors mr-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              🌞 Protocolo: Rotina Matinal para Acordar com Energia
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              📌 Objetivo: Ensinar um passo a passo simples que ativa o corpo e a mente logo ao acordar
            </p>
          </div>
        </div>

        {/* Step by Step Routine */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-orange-700 mb-6 flex items-center">
            ✅ Passo a Passo da Rotina
          </h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                1. Despertar consciente (0–2 min)
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Evite apertar o botão "soneca".
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Ao abrir os olhos, faça 3 respirações profundas: inspire pelo nariz contando até 4, segure por 2 segundos e solte pela boca contando até 6.
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                2. Hidratação imediata (2–5 min)
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Tome 1 copo grande de água em temperatura ambiente.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Isso ativa o metabolismo e compensa a desidratação da noite.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Opcional: adicione 3 gotinhas de limão para um leve efeito detox.
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                3. Exposição à luz natural (5–10 min)
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Abra as janelas ou saia na varanda/rua.
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  A luz solar regula a produção de melatonina e ativa a cortisol saudável (energia).
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Se não houver sol, acenda as luzes principais do quarto/casa.
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                4. Movimento do corpo (10–15 min)
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Faça alongamentos simples ou uma sequência de yoga matinal (pescoço, ombros, coluna, pernas).
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Se preferir, faça 20 polichinelos ou uma caminhada leve dentro de casa.
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Objetivo:</strong> ativar a circulação e oxigenar o cérebro.
                </li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                5. Ativação mental (15–20 min)
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Reserve 2 minutos de silêncio para praticar gratidão ou visualizar como será o seu dia.
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Anote 3 prioridades em um papel ou aplicativo de notas.
                </li>
              </ul>
            </div>

            {/* Step 6 */}
            <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-400">
              <h3 className="text-xl font-semibold text-pink-800 mb-3">
                6. Café da manhã nutritivo (20–30 min)
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Opte por alimentos leves e energizantes: frutas, ovos, aveia, iogurte natural.
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Evite excesso de açúcar refinado, que causa queda de energia rápida.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Schedule */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-amber-700 mb-6 flex items-center">
            🌟 Sugestão de Cronograma Rápido (30 minutos totais)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded mr-3">0–2 min</span>
                <span className="font-semibold text-gray-800">Despertar consciente</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded mr-3">2–5 min</span>
                <span className="font-semibold text-gray-800">Hidratação</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded mr-3">5–10 min</span>
                <span className="font-semibold text-gray-800">Luz natural</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded mr-3">10–15 min</span>
                <span className="font-semibold text-gray-800">Movimento do corpo</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-violet-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="bg-purple-500 text-white text-sm font-bold px-2 py-1 rounded mr-3">15–20 min</span>
                <span className="font-semibold text-gray-800">Ativação mental</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="bg-pink-500 text-white text-sm font-bold px-2 py-1 rounded mr-3">20–30 min</span>
                <span className="font-semibold text-gray-800">Café da manhã nutritivo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Extra Tips */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
            🔑 Dicas Extras
          </h2>
          
          <div className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-lg flex items-start">
              <span className="text-2xl mr-4">📱</span>
              <div>
                <h3 className="font-semibold text-indigo-800 mb-1">Evite o celular</h3>
                <p className="text-gray-700">Deixe o celular longe da cama para não cair na tentação da soneca.</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg flex items-start">
              <span className="text-2xl mr-4">👕</span>
              <div>
                <h3 className="font-semibold text-indigo-800 mb-1">Prepare-se na noite anterior</h3>
                <p className="text-gray-700">Prepare roupa/itens do café da manhã na noite anterior para reduzir decisões pela manhã.</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg flex items-start">
              <span className="text-2xl mr-4">⏰</span>
              <div>
                <h3 className="font-semibold text-indigo-800 mb-1">Consistência é fundamental</h3>
                <p className="text-gray-700">Se possível, mantenha essa rotina todos os dias no mesmo horário para regular seu relógio biológico.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            🌟 Resultado
          </h2>
          <p className="text-lg leading-relaxed">
            Seguindo este protocolo matinal, você evitará a sonolência matinal e promoverá foco e disposição durante todo o dia. 
            Uma boa manhã garante uma boa noite de sono!
          </p>
        </div>
      </div>
    </div>
  );
};