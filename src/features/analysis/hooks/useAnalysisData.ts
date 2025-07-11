'use client';

// No futuro, estes dados viriam de uma API
const subjects = [
    { subject: 'Matemática', score: 85 },
    { subject: 'Português', score: 72 },
    { subject: 'Ciências', score: 65 },
    { subject: 'História', score: 40 },
];

const generalStats = [
    { label: 'Pontuação Média', value: '78%' },
    { label: 'Taxa de Acerto', value: '85%', isPrimary: true },
    { label: 'Tempo Médio', value: '25s' },
];

const topicInsights = {
    strengths: 'Álgebra, Geometria e Análise Combinatória.',
    weaknesses: 'Equações, Probabilidade e Funções.'
};

const goalProgress = {
    label: 'Meta de Estudos',
    value: 60
};

export function useAnalysisData() {
  // Por enquanto, o hook apenas retorna os dados estáticos.
  // No futuro, é aqui que você adicionaria useState, useEffect para buscar dados de uma API.
  return {
    subjects,
    generalStats,
    topicInsights,
    goalProgress
  };
}