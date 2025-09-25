import React from 'react';

interface FoodGuidePageProps {
  onBack: () => void;
}

export const FoodGuidePage: React.FC<FoodGuidePageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mr-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              🌙 Mini Guia Alimentar para o Sono
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Como usar a alimentação a seu favor para dormir melhor
            </p>
          </div>
        </div>

        {/* Foods that Help Sleep */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
            ✅ Alimentos que Ajudam no Sono
          </h2>
          <p className="text-gray-700 mb-6">
            Estes alimentos estimulam a produção de melatonina (hormônio do sono) e serotonina (relaxamento e bem-estar):
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🥛</span>
                <div>
                  <h3 className="font-semibold text-green-800">Leite morno</h3>
                  <p className="text-sm text-gray-600">Contém triptofano, aminoácido precursor da serotonina.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🍌</span>
                <div>
                  <h3 className="font-semibold text-green-800">Banana</h3>
                  <p className="text-sm text-gray-600">Rica em magnésio e potássio, relaxa os músculos.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🍒</span>
                <div>
                  <h3 className="font-semibold text-green-800">Cerejas e suco de cereja</h3>
                  <p className="text-sm text-gray-600">Fonte natural de melatonina.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🥜</span>
                <div>
                  <h3 className="font-semibold text-green-800">Nozes, amêndoas e castanhas</h3>
                  <p className="text-sm text-gray-600">Aumentam serotonina e melatonina.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🥑</span>
                <div>
                  <h3 className="font-semibold text-green-800">Abacate</h3>
                  <p className="text-sm text-gray-600">Contém magnésio, ajuda no relaxamento.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🐟</span>
                <div>
                  <h3 className="font-semibold text-green-800">Peixes como salmão e atum</h3>
                  <p className="text-sm text-gray-600">Ricos em ômega-3 e vitamina D, que regulam serotonina.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg md:col-span-2">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🍵</span>
                <div>
                  <h3 className="font-semibold text-green-800">Chás calmantes</h3>
                  <p className="text-sm text-gray-600">Camomila, erva-doce, erva-cidreira, lavanda - reduzem ansiedade e facilitam o sono.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 font-medium flex items-start">
              <span className="text-xl mr-2">📌</span>
              <span><strong>Dica prática:</strong> consuma esses alimentos no jantar ou em um lanche leve 1h antes de dormir.</span>
            </p>
          </div>
        </div>

        {/* Foods that Harm Sleep */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center">
            ❌ Alimentos que Prejudicam o Sono
          </h2>
          <p className="text-gray-700 mb-6">
            Evite ou reduza o consumo à noite, pois podem atrapalhar o relaxamento e causar insônia:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">☕</span>
                <div>
                  <h3 className="font-semibold text-red-800">Cafeína</h3>
                  <p className="text-sm text-gray-600">Café, chá-preto, chimarrão, energéticos, refrigerantes de cola - estimulante que bloqueia a adenosina, atrapalhando o sono.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🍫</span>
                <div>
                  <h3 className="font-semibold text-red-800">Chocolate amargo em excesso</h3>
                  <p className="text-sm text-gray-600">Contém cafeína e teobromina, que estimulam o sistema nervoso.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🍔</span>
                <div>
                  <h3 className="font-semibold text-red-800">Comidas gordurosas e frituras</h3>
                  <p className="text-sm text-gray-600">Dificultam a digestão, deixando o sono pesado.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🌶️</span>
                <div>
                  <h3 className="font-semibold text-red-800">Alimentos muito picantes ou temperados</h3>
                  <p className="text-sm text-gray-600">Podem causar azia e desconforto noturno.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg md:col-span-2">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🍷</span>
                <div>
                  <h3 className="font-semibold text-red-800">Álcool</h3>
                  <p className="text-sm text-gray-600">Apesar de dar sonolência no início, fragmenta o sono e diminui a qualidade.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-orange-800 font-medium flex items-start">
              <span className="text-xl mr-2">📌</span>
              <span><strong>Dica prática:</strong> se precisar consumir café ou energéticos, faça isso até 6h antes de dormir.</span>
            </p>
          </div>
        </div>

        {/* Night Routine Suggestion */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            🕐 Sugestão de Rotina Alimentar Noturna
          </h2>
          
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Jantar leve (19h–20h):</h3>
              <p className="text-gray-700">Sopas, legumes cozidos, arroz integral, peixe ou frango.</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Lanche da noite (21h–22h):</h3>
              <p className="text-gray-700">1 banana + chá de camomila OU leite morno com canela.</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Hidratação:</h3>
              <p className="text-gray-700">Beba água ao longo do dia, mas evite exagerar antes de deitar para não interromper o sono com idas ao banheiro.</p>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            🌟 Conclusão
          </h2>
          <p className="text-lg leading-relaxed">
            Seu corpo responde ao que você come. Ajustando sua alimentação noturna, você cria as condições perfeitas para dormir mais rápido e com qualidade.
          </p>
        </div>
      </div>
    </div>
  );
};