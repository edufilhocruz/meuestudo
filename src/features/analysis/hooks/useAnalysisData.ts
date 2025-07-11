// src/features/analysis/hooks/useAnalysisData.ts
'use client';

// No futuro, estes dados viriam de uma API ou de um estado global.
const subjectsData = [
    { subject: 'Matemática', score: 85 },
    { subject: 'Português', score: 72 },
    { subject: 'Ciências', score: 65 },
    { subject: 'História', score: 40 },
];

const generalStatsData = [
    { label: 'Pontuação Média', value: '78%' },
    { label: 'Taxa de Acerto', value: '85%', isPrimary: true },
    { label: 'Tempo Médio', value: '25s' },
];

const topicInsightsData = {
    strengths: 'Álgebra, Geometria e Análise Combinatória.',
    weaknesses: 'Equações, Probabilidade e Funções.'
};

const goalProgressData = {
    label: 'Meta de Estudos',
    value: 60
};

export function useAnalysisData() {
  // Por enquanto, este hook apenas fornece os dados estáticos.
  // No futuro, é aqui que você colocaria a lógica de `useState` e `useEffect`
  // para buscar estes dados de um backend.
  return {
    subjects: subjectsData,
    generalStats: generalStatsData,
    topicInsights: topicInsightsData,
    goalProgress: goalProgressData,
  };
}