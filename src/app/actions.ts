'use server';

import { studyCoachNotification, StudyCoachNotificationInput } from '@/ai/flows/subject-deficit-notification';
import { getTestRecommendation, TestRecommendationInput } from '@/ai/flows/test-recommendation-flow';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import necessário para a nova função

/**
 * Função auxiliar que tenta executar uma operação com um número de tentativas.
 * @param fn A função a ser executada.
 * @param retries Número de tentativas.
 * @param delay Atraso inicial em milissegundos.
 */
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      if (error.status === 503) {
        console.log(`API sobrecarregada. Tentando novamente em ${delay * (i + 1)}ms...`);
        await new Promise(res => setTimeout(res, delay * (i + 1)));
      } else {
        throw error;
      }
    }
  }
  throw lastError;
}

/**
 * Server Action para obter a notificação do coach de estudos.
 */
export async function getStudyCoachNotificationAction(input: StudyCoachNotificationInput) {
  return await withRetry(() => studyCoachNotification(input));
}

/**
 * Server Action para obter a recomendação de estudo pós-simulado.
 */
export async function getTestRecommendationAction(input: TestRecommendationInput) {
    return await withRetry(() => getTestRecommendation(input));
}

/**
 * NOVA Server Action para obter uma recomendação geral para a página inicial.
 */
export async function getHomeRecommendation(): Promise<{ title: string; description: string } | null> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('A chave da API do Gemini (GEMINI_API_KEY) não está configurada no ambiente.')
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Gere uma recomendação de estudo motivacional e útil para um estudante que acabou de acessar a plataforma.
      A recomendação deve ser curta e encorajadora, focando em dicas gerais de estudo ou em como aproveitar a plataforma.
      A resposta deve ser um objeto JSON com as chaves "title" e "description" em português.
      "title": um título curto e chamativo.
      "description": uma descrição um pouco mais longa (1-2 frases) explicando a recomendação.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text()?.replace(/`[^]*`/, '').trim(); // Remove code blocks
    if (text) {
      try {
        const recommendation = JSON.parse(text);
        return recommendation.title && recommendation.description ? recommendation : null;
      } catch (e) {
        console.error("Erro ao parsear JSON da recomendação da home:", e);
        return { title: "Dica de Hoje:", description: "Explore os diferentes recursos da plataforma para otimizar seus estudos!" };
      }
    }
    return { title: "Bem-vindo!", description: "Comece explorando os simulados e acompanhe seu progresso." };

  } catch (error) {
    console.error("Erro ao buscar recomendação da home:", error);
    return { title: "Motivação:", description: "Mantenha o foco e continue praticando para alcançar seus objetivos!" };
  }
}