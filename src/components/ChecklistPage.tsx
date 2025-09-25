import React from 'react';
import { ArrowLeft, CheckCircle, Moon, Thermometer, Lightbulb, Volume2, Bed, Smartphone, Flower2, Home, Droplets } from 'lucide-react';

interface ChecklistPageProps {
  onBack: () => void;
}

const checklistData = {
  title: '💤 Checklist Noturno – Ambiente Ideal para Dormir em 15 Minutos',
  items: [
    {
      category: '✅ Temperatura do quarto',
      icon: Thermometer,
      tasks: ['Deixe o ambiente levemente fresco (18–22 °C é o ideal).']
    },
    {
      category: '✅ Iluminação',
      icon: Lightbulb,
      tasks: [
        'Apague luzes fortes.',
        'Use luz amarela ou abajur suave até a hora de dormir.',
        'Bloqueie qualquer entrada de luz externa (cortina blackout ou máscara de olhos).'
      ]
    },
    {
      category: '✅ Ruídos',
      icon: Volume2,
      tasks: [
        'Desligue aparelhos barulhentos.',
        'Use sons relaxantes ou "white noise" se houver muito ruído externo.'
      ]
    },
    {
      category: '✅ Cama e roupas de cama',
      icon: Bed,
      tasks: [
        'Ajuste travesseiros confortáveis.',
        'Lençóis limpos e cobertor adequado para a estação.'
      ]
    },
    {
      category: '✅ Aparelhos eletrônicos',
      icon: Smartphone,
      tasks: [
        'Desconectar-se de telas (celular, TV, computador) pelo menos 30 min antes.',
        'Ativar modo "não perturbe" no celular.'
      ]
    },
    {
      category: '✅ Aromas e atmosfera',
      icon: Flower2,
      tasks: [
        'Usar aromaterapia suave (lavanda, camomila ou sândalo).',
        'Manter o ambiente arejado, sem odores fortes.'
      ]
    },
    {
      category: '✅ Organização',
      icon: Home,
      tasks: [
        'Tirar objetos espalhados.',
        'Deixar o quarto limpo e aconchegante.'
      ]
    },
    {
      category: '✅ Itens de apoio',
      icon: Droplets,
      tasks: [
        'Deixar água na cabeceira (se necessário).',
        'Usar máscara de olhos ou tampões auriculares, caso precise.'
      ]
    }
  ],
  footer: '👉 Seguindo esse checklist, o corpo e a mente entram no modo pré-sono mais rápido, preparando o terreno perfeito para as técnicas do Sono em 15.'
};

export const ChecklistPage: React.FC<ChecklistPageProps> = ({ onBack }) => {
  const [checkedItems, setCheckedItems] = React.useState<Set<string>>(new Set());

  const toggleItem = (categoryIndex: number, taskIndex: number) => {
    const itemKey = `${categoryIndex}-${taskIndex}`;
    const newCheckedItems = new Set(checkedItems);
    
    if (newCheckedItems.has(itemKey)) {
      newCheckedItems.delete(itemKey);
    } else {
      newCheckedItems.add(itemKey);
    }
    
    setCheckedItems(newCheckedItems);
  };

  const getTotalTasks = () => {
    return checklistData.items.reduce((total, item) => total + item.tasks.length, 0);
  };

  const getCompletedTasks = () => {
    return checkedItems.size;
  };

  const getProgressPercentage = () => {
    const total = getTotalTasks();
    const completed = getCompletedTasks();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-night-900 via-sleep-900 to-night-800 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-night-800/90 to-sleep-800/90 backdrop-blur-sm border-b border-night-700/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-night-200 hover:text-white transition-colors p-2 hover:bg-night-700/50 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">
                  Checklist da Rotina Noturna
                </h1>
                <p className="text-night-200 text-sm">
                  Ambiente ideal para dormir em 15 minutos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-night-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Progresso do Checklist</h2>
            <span className="text-2xl font-bold text-mint-400">
              {getProgressPercentage()}%
            </span>
          </div>
          <div className="w-full bg-night-700 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-mint-500 to-mint-400 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <p className="text-night-300 text-sm">
            {getCompletedTasks()} de {getTotalTasks()} itens concluídos
          </p>
        </div>

        {/* Checklist Items */}
        <div className="space-y-6">
          {checklistData.items.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex} className="bg-night-800/50 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.tasks.map((task, taskIndex) => {
                    const itemKey = `${categoryIndex}-${taskIndex}`;
                    const isChecked = checkedItems.has(itemKey);
                    
                    return (
                      <div key={taskIndex} className="flex items-start gap-3">
                        <button
                          onClick={() => toggleItem(categoryIndex, taskIndex)}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isChecked
                              ? 'bg-mint-500 border-mint-500 text-white'
                              : 'border-night-500 hover:border-mint-400'
                          }`}
                        >
                          {isChecked && <CheckCircle className="w-4 h-4" />}
                        </button>
                        <p className={`text-sm sm:text-base leading-relaxed transition-all ${
                          isChecked 
                            ? 'text-night-300 line-through' 
                            : 'text-night-100'
                        }`}>
                          {task}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl p-6 mt-8">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-br from-mint-600 to-mint-500 rounded-lg flex-shrink-0">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dica Importante</h3>
              <p className="text-night-200 leading-relaxed">
                {checklistData.footer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};