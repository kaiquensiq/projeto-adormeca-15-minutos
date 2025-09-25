import { CourseData } from '../types/course';

export const courseData: CourseData = {
  user: {
    id: '1',
    name: 'Maria Santos',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    joinedDate: '2024-01-15',
    currentStreak: 7
  },
  modules: [
    {
      id: 'module-1',
      title: 'Módulo 1 - Entendendo o Sono e a Insônia',
      description: 'Fundamentos científicos do sono e principais causas da insônia. Aprenda como funciona seu ciclo natural do sono.',
      isUnlocked: true,
      badgeEarned: true,
      completedLessons: 6,
      totalLessons: 6,
      lessons: [
        {
          id: 'l1-1',
          title: 'Como funciona o ciclo do sono',
          description: 'Descubra como o seu sono é dividido em fases (leve, profundo e REM) e por que cada uma delas é essencial para a recuperação física e mental. Após assistir, anote: qual fase você acha que está faltando nas suas noites?',
          duration: '12:30',
          videoUrl: 'https://www.youtube.com/embed/0byVPXL9Ov4',
          isCompleted: true,
          notes: 'Ciclo completo = 90 minutos. REM importante para memória.'
        },
        {
          id: 'l1-2',
          title: 'Por que sua mente não desliga',
          description: 'Entenda o fenômeno da hiperexcitação mental: quando o corpo quer dormir, mas a mente continua acelerada. Identifique quais situações mais atrapalham você e pense em 2 formas de desligar mais cedo.',
          duration: '10:45',
          videoUrl: 'https://www.youtube.com/embed/SuVDskdvLFo',
          isCompleted: true,
          isFavorite: true,
          notes: 'Sistema nervoso simpático x parassimpático. Técnicas de desativação.'
        },
        {
          id: 'l1-3',
          title: 'Os principais erros que atrapalham seu sono',
          description: 'Muitos hábitos comuns sabotam o sono sem que você perceba: usar celular na cama, comer tarde ou até cochilar demais. Após o vídeo, escolha um erro que você comete e comprometa-se a eliminá-lo hoje.',
          duration: '14:20',
          videoUrl: 'https://www.youtube.com/embed/0socKOn_-Dc',
          isCompleted: true
        },
        {
          id: 'l1-4',
          title: 'O impacto da insônia no corpo e na mente',
          description: 'A insônia não afeta apenas o descanso: ela influencia sua saúde, produtividade, humor e até seu sistema imunológico. Reflita: qual aspecto da sua vida mais sofre com a falta de sono?',
          duration: '11:15',
          videoUrl: 'https://www.youtube.com/embed/87dcgkBW1rE',
          isCompleted: true
        },
        {
          id: 'l1-5',
          title: 'Você tem insônia ou apenas maus hábitos?',
          description: 'Descubra se o seu problema é realmente insônia ou apenas um conjunto de hábitos ruins. Essa diferença é fundamental para saber qual caminho seguir. Faça a autoanálise sugerida e anote suas conclusões.',
          duration: '9:30',
          videoUrl: 'https://www.youtube.com/embed/CggbVU9qxzs',
          isCompleted: true
        },
        {
          id: 'l1-6',
          title: 'Mitos e verdades sobre dormir bem',
          description: 'Café atrapalha sempre? Cochilar à tarde faz mal? Exercício à noite impede o sono? Nesta aula você quebra mitos e descobre verdades práticas. Depois do vídeo, liste 2 mudanças simples que pode aplicar já hoje.',
          duration: '13:45',
          videoUrl: 'https://www.youtube.com/embed/UUabJk4BVRY',
          isCompleted: true
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Módulo 2 - Preparação do Corpo e da Mente',
      description: 'Técnicas práticas e científicas para preparar seu organismo para o sono reparador.',
      isUnlocked: true,
      badgeEarned: false,
      completedLessons: 4,
      totalLessons: 7,
      lessons: [
        {
          id: 'l2-1',
          title: 'Higiene do sono: os 10 hábitos indispensáveis',
          description: 'Protocolo científico completo para otimizar seu ambiente e rotina',
          duration: '15:20',
          videoUrl: 'https://www.youtube.com/embed/9O9QU3FJrZA',
          isCompleted: true
        },
        {
          id: 'l2-2',
          title: 'Respiração 4-7-8 para induzir o sono',
          description: 'A técnica 4-7-8 desacelera o coração e reduz a ansiedade. Em poucos minutos, seu corpo entra em estado de calma profunda, pronto para dormir. Instruções: Deite-se, siga o vídeo e repita o ciclo de respiração 3 vezes seguidas antes de prosseguir.',
          duration: '8:45',
          videoUrl: 'https://www.youtube.com/embed/PC2gtWs6hsw',
          isCompleted: true,
          isFavorite: true,
          notes: 'Praticar: 4 seg inspirar, 7 seg prender, 8 seg expirar. Repetir 4 ciclos.'
        },
        {
          id: 'l2-3',
          title: 'Relaxamento Muscular Progressivo (curto e completo)',
          description: 'Esse exercício guia você a tensionar e relaxar diferentes grupos musculares, soltando ansiedades acumuladas no corpo. É uma técnica clínica muito eficaz contra insônia. Instruções: Escolha: versão curta (5 min) para noites corridas ou versão completa (15 min) quando precisar relaxar profundamente.',
          duration: '12:10',
          videoUrl: 'https://www.youtube.com/embed/hB9cB8ORf2E',
          isCompleted: true
        },
        {
          id: 'l2-4',
          title: 'Meditação Guiada para Dormir em 15 Minutos',
          description: 'Essa meditação foi criada para induzir o sono em aproximadamente 15 minutos. Você será conduzido a relaxar corpo e mente até adormecer de forma natural. Instruções: Coloque fones, ajuste o volume, deite-se na cama e não mexa mais no celular após dar play.',
          duration: '10:30',
          videoUrl: 'https://www.youtube.com/embed/hbQJX44whjo',
          isCompleted: true
        },
        {
          id: 'l2-5',
          title: 'Como Desligar Pensamentos Acelerados em 5 Minutos',
          description: 'Uma técnica rápida de mindfulness para reduzir a ruminação mental e trazer foco ao presente. Ideal para noites em que os pensamentos não deixam você descansar. Instruções: Sempre que sua mente não parar, faça esta prática curta antes de dormir.',
          duration: '11:25',
          videoUrl: 'https://www.youtube.com/embed/SCvpwB9C50w',
          isCompleted: false
        },
        {
          id: 'l2-6',
          title: 'Posturas e Alongamentos Simples para Dormir Melhor',
          description: 'Movimentos fáceis que liberam tensão de ombros, pescoço e lombar, preparando o corpo para uma noite tranquila. Você se sentirá mais leve e relaxado. Instruções: Execute essa sequência de alongamentos ainda fora da cama ou sentado sobre o colchão.',
          duration: '9:15',
          videoUrl: 'https://www.youtube.com/embed/6ZGEgvvkH9Y',
          isCompleted: false
        },
        {
          id: 'l2-7',
          title: 'Criando o Seu Ritual de Desligamento',
          description: 'Ter um ritual noturno é como dar um comando de "modo sono" para o seu cérebro. Aqui você aprende como criar uma rotina simples, previsível e eficaz para adormecer mais rápido todas as noites. Instruções: Escolha pelo menos 3 passos do ritual apresentado e transforme-os no seu hábito noturno a partir de hoje.',
          duration: '13:50',
          videoUrl: 'https://www.youtube.com/embed/2SVgsTlLgko',
          isCompleted: false
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Módulo 3 - Ambiente Ideal para Dormir',
      description: 'Otimização completa do seu quarto e ambiente para o sono perfeito e reparador.',
      isUnlocked: true,
      badgeEarned: false,
      completedLessons: 2,
      totalLessons: 7,
      lessons: [
        {
          id: 'l3-1',
          title: 'Iluminação: o papel da luz na produção de melatonina',
          description: 'A luz tem um papel crucial na produção de melatonina, hormônio que regula o sono. Luz intensa à noite inibe a melatonina, dificultando adormecer. Nesta aula, você aprenderá como usar lâmpadas quentes, abajures e luzes indiretas para criar um ambiente propício ao descanso. Instruções: Ajuste a iluminação do quarto hoje para tons suaves antes de dormir. Evite luzes fortes e diretas, especialmente de telas.',
          duration: '12:40',
          videoUrl: 'https://www.youtube.com/embed/SKSvLUE2G2w',
          isCompleted: true
        },
        {
          id: 'l3-2',
          title: 'Sons: como usar ruídos brancos, sons da natureza e música relaxante',
          description: 'Sons podem facilitar ou atrapalhar o sono. Ruídos brancos, sons da natureza e músicas suaves ajudam a bloquear distrações externas e induzem relaxamento. Esta aula ensina como escolher o som ideal para criar um ambiente tranquilo e favorecer o sono profundo. Instruções: Escolha hoje pelo menos um tipo de som relaxante para tocar durante o preparo para dormir. Observe como o cérebro reage e se você adormece mais rápido.',
          duration: '10:20',
          videoUrl: 'https://www.youtube.com/embed/rdn9Ltw4ivs',
          isCompleted: true,
          isFavorite: true
        },
        {
          id: 'l3-3',
          title: 'Temperatura e ventilação do quarto: qual o ideal para dormir bem',
          description: 'Dormir em temperatura adequada é essencial para que o corpo reduza sua temperatura central e entre em sono profundo. A ventilação também mantém o ar fresco, evitando abafamento. Você aprenderá estratégias práticas para regular temperatura e fluxo de ar, melhorando a qualidade do sono. Instruções: Ajuste a temperatura e ventilação do quarto hoje, mantendo entre 18°C e 22°C e garantindo circulação de ar confortável.',
          duration: '8:35',
          videoUrl: 'https://www.youtube.com/embed/prT_Z_4r4ag',
          isCompleted: false
        },
        {
          id: 'l3-4',
          title: 'Escolha do colchão e travesseiro certos para seu corpo',
          description: 'Um colchão e travesseiro adequados são fundamentais para evitar dores e tensões musculares. Esta aula mostra como escolher e ajustar o suporte do corpo, alinhando coluna e pescoço para um sono restaurador. Instruções: Avalie seu colchão e travesseiro e faça ajustes para que ofereçam suporte correto à coluna e pescoço.',
          duration: '14:15',
          videoUrl: 'https://www.youtube.com/embed/uTs6UPvPhh0',
          isCompleted: false
        },
        {
          id: 'l3-5',
          title: 'Como transformar o quarto em um "santuário do sono"',
          description: 'Um quarto harmonioso ajuda o cérebro a associar o ambiente ao relaxamento. Limpeza, cores suaves, tecidos aconchegantes e aromas relaxantes transformam seu espaço em um "santuário do sono", facilitando o adormecer rápido e profundo. Instruções: Hoje, faça pelo menos 3 ajustes no quarto para criar um ambiente calmo, organizado e acolhedor.',
          duration: '11:50',
          videoUrl: 'https://www.youtube.com/embed/sZn-g-6CUYg',
          isCompleted: false
        },
        {
          id: 'l3-6',
          title: 'Tecnologia x Sono: como usar (ou evitar) celular e TV antes de dormir',
          description: 'O uso de celulares, TVs e computadores emite luz azul, que atrasa a produção de melatonina e dificulta o sono. Nesta aula, você aprenderá estratégias para limitar tecnologia à noite e usar dispositivos de forma que não prejudiquem o descanso. Instruções: Evite telas 30–60 minutos antes de dormir. Se necessário, use modos noturno ou filtros de luz azul.',
          duration: '9:40',
          videoUrl: 'https://www.youtube.com/embed/oK_RM0Ze7gY',
          isCompleted: false
        },
        {
          id: 'l3-7',
          title: 'Checklist noturno para preparar o ambiente antes de se deitar',
          description: 'Este checklist reúne todas as práticas do módulo para preparar o quarto de forma eficiente. Ao seguir cada item, você garante que o ambiente esteja pronto para um sono profundo e de qualidade todas as noites. Instruções: Siga o checklist completo antes de dormir, ajustando iluminação, temperatura, sons e outros detalhes do quarto.',
          duration: '7:25',
          checklist: {
            title: '💤 Checklist Noturno – Ambiente Ideal para Dormir em 15 Minutos',
            items: [
              {
                category: '✅ Temperatura do quarto',
                tasks: ['Deixe o ambiente levemente fresco (18–22 °C é o ideal).']
              },
              {
                category: '✅ Iluminação',
                tasks: [
                  'Apague luzes fortes.',
                  'Use luz amarela ou abajur suave até a hora de dormir.',
                  'Bloqueie qualquer entrada de luz externa (cortina blackout ou máscara de olhos).'
                ]
              },
              {
                category: '✅ Ruídos',
                tasks: [
                  'Desligue aparelhos barulhentos.',
                  'Use sons relaxantes ou "white noise" se houver muito ruído externo.'
                ]
              },
              {
                category: '✅ Cama e roupas de cama',
                tasks: [
                  'Ajuste travesseiros confortáveis.',
                  'Lençóis limpos e cobertor adequado para a estação.'
                ]
              },
              {
                category: '✅ Aparelhos eletrônicos',
                tasks: [
                  'Desconectar-se de telas (celular, TV, computador) pelo menos 30 min antes.',
                  'Ativar modo "não perturbe" no celular.'
                ]
              },
              {
                category: '✅ Aromas e atmosfera',
                tasks: [
                  'Usar aromaterapia suave (lavanda, camomila ou sândalo).',
                  'Manter o ambiente arejado, sem odores fortes.'
                ]
              },
              {
                category: '✅ Organização',
                tasks: [
                  'Tirar objetos espalhados.',
                  'Deixar o quarto limpo e aconchegante.'
                ]
              },
              {
                category: '✅ Itens de apoio',
                tasks: [
                  'Deixar água na cabeceira (se necessário).',
                  'Usar máscara de olhos ou tampões auriculares, caso precise.'
                ]
              }
            ],
            footer: '👉 Seguindo esse checklist, o corpo e a mente entram no modo pré-sono mais rápido, preparando o terreno perfeito para as técnicas do Sono em 15.'
          },
          isCompleted: false
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Módulo 4 - Protocolos Práticos para Dormir em 15 Min',
      description: 'Técnicas avançadas e comprovadas para adormecer rapidamente em qualquer situação.',
      isUnlocked: true,
      badgeEarned: false,
      completedLessons: 0,
      totalLessons: 7,
      lessons: [
        {
          id: 'l4-1',
          title: 'Técnica militar para dormir em 2 minutos',
          description: 'Esta técnica foi desenvolvida pela Marinha Americana para que soldados dormissem rapidamente mesmo em situações de estresse. O método combina relaxamento muscular e mental em sequência específica. Instruções: Pratique os passos exatos mostrados no vídeo: relaxe o rosto, solte os ombros, esvazie a mente e visualize uma das duas cenas sugeridas.',
          duration: '8:20',
          videoUrl: 'https://www.youtube.com/embed/yMvZgX01Cz4',
          isCompleted: false
        },
        {
          id: 'l4-2',
          title: 'Técnica da visualização guiada para induzir o sono',
          description: 'A visualização guiada usa o poder da imaginação para criar cenários mentais relaxantes que conduzem naturalmente ao sono. Você aprenderá a construir imagens mentais vívidas e tranquilas que distraem a mente de preocupações. Instruções: Escolha uma das 3 visualizações apresentadas e pratique-a por pelo menos 5 minutos antes de dormir.',
          duration: '12:15',
          videoUrl: 'https://www.youtube.com/embed/drzjzYhTam4',
          isCompleted: false
        },
        {
          id: 'l4-3',
          title: 'Técnica da respiração alternada (Nadi Shodhana)',
          description: 'Esta técnica de pranayama equilibra o sistema nervoso alternando a respiração entre as narinas. O resultado é uma sensação profunda de calma e equilíbrio que facilita o adormecer. Instruções: Siga a sequência exata: tape a narina direita, inspire pela esquerda, tape a esquerda, expire pela direita. Repita por 5-10 ciclos.',
          duration: '9:45',
          videoUrl: 'https://www.youtube.com/embed/64gSuZG_yk0',
          isCompleted: false
        },
        {
          id: 'l4-4',
          title: 'Técnica do "body scan" - escaneamento corporal relaxante',
          description: 'O body scan é uma prática de mindfulness que envolve focar conscientemente em cada parte do corpo, liberando tensões acumuladas. Esta técnica é especialmente eficaz para pessoas que carregam estresse físico. Instruções: Deite-se confortavelmente e siga o guia, focando em cada parte do corpo dos pés à cabeça, soltando completamente cada músculo.',
          duration: '11:30',
          videoUrl: 'https://www.youtube.com/embed/dJljnvdBIUI',
          isCompleted: false
        },
        {
          id: 'l4-5',
          title: 'Truque da "preocupação invertida" - pare de pensar demais',
          description: 'Quando a mente não para de pensar, este truque psicológico inverte o processo: em vez de lutar contra os pensamentos, você os usa a seu favor para induzir o sono. É uma técnica contraintuitiva mas muito eficaz. Instruções: Quando os pensamentos não pararem, aplique a técnica da "lista mental" ou do "pensamento paradoxal" conforme demonstrado.',
          duration: '10:05',
          videoUrl: 'https://www.youtube.com/embed/VvjabqEDoDM',
          isCompleted: false
        },
        {
          id: 'l4-6',
          title: 'Combinações de técnicas para acelerar resultados',
          description: 'Algumas técnicas funcionam melhor quando combinadas. Nesta aula você aprende as melhores combinações: respiração + visualização, body scan + técnica militar, e outras duplas poderosas que potencializam os efeitos. Instruções: Teste pelo menos 2 combinações diferentes em noites distintas e observe qual funciona melhor para você.',
          duration: '13:25',
          videoUrl: 'https://www.youtube.com/embed/ffSLUDagPS0',
          isCompleted: false
        },
        {
          id: 'l4-7',
          title: 'Como criar seu próprio protocolo personalizado de 15 minutos',
          description: 'Agora você tem todas as ferramentas para criar um protocolo único e personalizado. Esta aula ensina como combinar as técnicas de acordo com seu perfil, rotina e necessidades específicas, criando seu método definitivo para dormir em 15 minutos. Instruções: Monte seu protocolo pessoal escolhendo 3-4 técnicas favoritas e defina a ordem e duração de cada uma.',
          duration: '15:40',
          videoUrl: 'https://www.youtube.com/embed/ffSLUDagPS0',
          isCompleted: false
        }
      ]
    }
  ],
  bonusItems: [
    {
      id: 'bonus-1',
      title: 'Checklist da Rotina Noturna',
      description: 'Passo-a-passo detalhado para criar e manter sua rotina ideal de sono. Inclui horários sugeridos e dicas personalizáveis.',
      type: 'checklist',
      downloadUrl: '/downloads/checklist-rotina-noturna.pdf',
      fileSize: '2.4 MB'
    },
    {
      id: 'bonus-2',
      title: 'Playlist Exclusiva para Dormir',
      description: 'Coleção especial de sons relaxantes, música instrumental e frequências binaurais cientificamente selecionadas para induzir o sono profundo.',
      type: 'audio',
      downloadUrl: '/downloads/playlist-sono-premium.zip',
      fileSize: '145 MB'
    },
    {
      id: 'bonus-3',
      title: 'Mini Guia Alimentar para o Sono',
      description: 'Guia nutricional completo com alimentos que promovem o sono e aqueles que devem ser evitados. Inclui receitas de chás e lanches noturnos.',
      type: 'guide',
      downloadUrl: '/downloads/guia-alimentar-sono.pdf',
      fileSize: '1.8 MB'
    },
    {
      id: 'bonus-4',
      title: 'Rotina Matinal para Acordar com Energia',
      description: 'Protocolo matinal científico para otimizar seu ritmo circadiano e garantir disposição durante todo o dia, melhorando o sono da próxima noite.',
      type: 'guia',
      downloadUrl: '/downloads/rotina-matinal-energia.pdf',
      fileSize: '2.1 MB'
    }
  ],
  overallProgress: 46,
  totalLessons: 27,
  completedLessons: 12,
  currentLesson: {
    moduleId: 'module-2',
    lessonId: 'l2-5'
  }
};