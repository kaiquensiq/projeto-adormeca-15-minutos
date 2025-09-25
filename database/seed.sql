-- Sono em 15 - Initial Data
-- Execute this after running schema.sql
-- This script is safe to run multiple times (uses INSERT ... ON CONFLICT)

-- Insert Modules (safe for re-execution)
INSERT INTO modules (id, title, description, order_index, is_unlocked_by_default) VALUES
('module-1', 'Módulo 1 - Entendendo o Sono e a Insônia', 'Fundamentos científicos do sono e principais causas da insônia. Aprenda como funciona seu ciclo natural do sono.', 1, true),
('module-2', 'Módulo 2 - Preparando Mente e Corpo', 'Técnicas de relaxamento e preparação mental para o sono. Descubra como acalmar sua mente antes de dormir.', 2, false),
('module-3', 'Módulo 3 - Ambiente Ideal para o Sono', 'Como criar o ambiente perfeito para dormir. Temperatura, iluminação, ruído e outros fatores importantes.', 3, false),
('module-4', 'Módulo 4 - Protocolos Práticos para Dormir em 15 Min', 'Técnicas avançadas e protocolos específicos para adormecer rapidamente.', 4, false)
ON CONFLICT (id) DO NOTHING;

-- Insert Lessons for Module 1 (safe for re-execution)
INSERT INTO lessons (id, module_id, title, description, duration, video_url, order_index) VALUES
('l1-1', 'module-1', 'Como funciona o ciclo do sono', 'Descubra como o seu sono é dividido em fases (leve, profundo e REM) e por que cada uma delas é essencial para a recuperação física e mental. Após assistir, anote: qual fase você acha que está faltando nas suas noites?', '12:30', 'https://www.youtube.com/embed/0byVPXL9Ov4', 1),
('l1-2', 'module-1', 'Por que sua mente não desliga', 'Entenda os mecanismos cerebrais que mantêm você acordado. Descubra como pensamentos acelerados, preocupações e ansiedade interferem no processo natural do sono.', '15:45', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 2),
('l1-3', 'module-1', 'Os 3 tipos de insônia', 'Aprenda a identificar se você tem dificuldade para iniciar o sono, manter o sono ou se acorda muito cedo. Cada tipo tem uma abordagem específica.', '18:20', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 3),
('l1-4', 'module-1', 'Mitos e verdades sobre o sono', 'Descubra quais crenças sobre o sono são verdadeiras e quais podem estar sabotando suas noites. Baseado em evidências científicas.', '14:10', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 4),
('l1-5', 'module-1', 'Como a alimentação afeta seu sono', 'Entenda como diferentes alimentos e horários das refeições podem melhorar ou prejudicar a qualidade do seu sono.', '16:35', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 5),
('l1-6', 'module-1', 'Exercícios e sono: a conexão', 'Descubra como a atividade física influencia seu sono e qual o melhor horário para se exercitar sem prejudicar o descanso noturno.', '13:25', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 6)
ON CONFLICT (id) DO NOTHING;

-- Insert Lessons for Module 2 (safe for re-execution)
INSERT INTO lessons (id, module_id, title, description, duration, video_url, order_index) VALUES
('l2-1', 'module-2', 'Técnica de Respiração 4-7-8', 'Aprenda a técnica de respiração mais eficaz para acalmar o sistema nervoso e induzir o sono naturalmente.', '8:15', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1),
('l2-2', 'module-2', 'Relaxamento Muscular Progressivo', 'Técnica para liberar tensões físicas acumuladas durante o dia, preparando o corpo para um sono profundo.', '22:40', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 2),
('l2-3', 'module-2', 'Meditação para o Sono', 'Práticas meditativas específicas para acalmar a mente e facilitar a transição para o sono.', '18:30', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 3),
('l2-4', 'module-2', 'Visualização Guiada', 'Use o poder da imaginação para criar cenários mentais relaxantes que conduzem ao sono.', '15:20', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 4),
('l2-5', 'module-2', 'Técnica do Diário Mental', 'Aprenda a "despejar" preocupações e pensamentos antes de dormir, liberando a mente para o descanso.', '12:45', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 5)
ON CONFLICT (id) DO NOTHING;

-- Insert Lessons for Module 3 (safe for re-execution)
INSERT INTO lessons (id, module_id, title, description, duration, video_url, order_index) VALUES
('l3-1', 'module-3', 'Temperatura ideal do quarto', 'Descubra qual a temperatura perfeita para o sono e como regular o ambiente para máximo conforto.', '10:30', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1),
('l3-2', 'module-3', 'Iluminação e ritmo circadiano', 'Como a luz afeta seu relógio biológico e estratégias para otimizar a exposição à luz durante o dia e à noite.', '14:15', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 2),
('l3-3', 'module-3', 'Controle de ruídos', 'Técnicas para minimizar ruídos perturbadores e criar um ambiente sonoro propício ao sono.', '11:50', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 3),
('l3-4', 'module-3', 'Escolhendo travesseiro e colchão', 'Guia completo para escolher os melhores acessórios de cama para seu tipo de sono e posição preferida.', '16:25', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 4),
('l3-5', 'module-3', 'Aromaterapia para o sono', 'Como usar óleos essenciais e aromas naturais para criar uma atmosfera relaxante no quarto.', '9:40', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 5)
ON CONFLICT (id) DO NOTHING;

-- Insert Lessons for Module 4 (including the checklist lesson) - safe for re-execution
INSERT INTO lessons (id, module_id, title, description, duration, video_url, order_index, checklist_data) VALUES
('l4-1', 'module-4', 'Protocolo dos 15 Minutos', 'O método completo para adormecer em até 15 minutos, combinando todas as técnicas aprendidas.', '25:30', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1, NULL),
('l4-2', 'module-4', 'Técnica da Contagem Regressiva', 'Método de distração mental que impede pensamentos acelerados e induz o sono naturalmente.', '12:15', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 2, NULL),
('l4-3', 'module-4', 'Posições ideais para dormir', 'Descubra as melhores posições para diferentes tipos de problemas de sono e desconfortos físicos.', '13:45', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 3, NULL),
('l4-4', 'module-4', 'Protocolo para noites difíceis', 'Estratégias específicas para noites de maior ansiedade, estresse ou quando nada parece funcionar.', '18:20', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 4, NULL),
('l4-5', 'module-4', 'Checklist Noturno Completo', 'Este checklist reúne todas as práticas do módulo para preparar o quarto de forma eficiente. Ao seguir cada item, você garante que o ambiente esteja pronto para um sono profundo e de qualidade todas as noites.', '7:25', NULL, 5, '{
  "title": "💤 Checklist Noturno – Ambiente Ideal para Dormir em 15 Minutos",
  "items": [
    {
      "category": "✅ Temperatura do quarto",
      "tasks": ["Deixe o ambiente levemente fresco (18–22 °C é o ideal)."]
    },
    {
      "category": "✅ Iluminação",
      "tasks": [
        "Apague luzes fortes.",
        "Use luz amarela ou abajur suave até a hora de dormir.",
        "Bloqueie qualquer entrada de luz externa (cortina blackout ou máscara de olhos)."
      ]
    },
    {
      "category": "✅ Ruídos",
      "tasks": [
        "Desligue aparelhos barulhentos.",
        "Use sons relaxantes ou white noise se houver muito ruído externo."
      ]
    },
    {
      "category": "✅ Cama e roupas de cama",
      "tasks": [
        "Ajuste travesseiros confortáveis.",
        "Lençóis limpos e cobertor adequado para a estação."
      ]
    },
    {
      "category": "✅ Aparelhos eletrônicos",
      "tasks": [
        "Desconectar-se de telas (celular, TV, computador) pelo menos 30 min antes.",
        "Ativar modo não perturbe no celular."
      ]
    },
    {
      "category": "✅ Aromas e atmosfera",
      "tasks": [
        "Usar aromaterapia suave (lavanda, camomila ou sândalo).",
        "Manter o ambiente arejado, sem odores fortes."
      ]
    },
    {
      "category": "✅ Organização",
      "tasks": [
        "Tirar objetos espalhados.",
        "Deixar o quarto limpo e aconchegante."
      ]
    },
    {
      "category": "✅ Itens de apoio",
      "tasks": [
        "Deixar água na cabeceira (se necessário).",
        "Usar máscara de olhos ou tampões auriculares, caso precise."
      ]
    }
  ],
  "footer": "👉 Seguindo esse checklist, o corpo e a mente entram no modo pré-sono mais rápido, preparando o terreno perfeito para as técnicas do Sono em 15."
}')
ON CONFLICT (id) DO NOTHING;

-- Note: User progress will be created automatically when users interact with lessons
-- The trigger function will handle user creation when they sign up through Supabase Auth