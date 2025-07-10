'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

export async function getAiRecommendation(
  subject: string,
  goal: number,
  progress: number,
): Promise<{ title: string; description: string } | null> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('A chave da API do Gemini (GEMINI_API_KEY) não está configurada no ambiente.')
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
      Gere uma recomendação de estudo para um aluno com base nos seguintes dados:
      - Matéria: ${subject}
      - Meta de estudo semanal (horas): ${goal}
      - Progresso semanal (horas): ${progress}

      O aluno está abaixo da meta. Gere uma notificação motivacional e útil.
      A resposta deve ser um objeto JSON com as chaves "title" e "description".
      "title": um título curto e chamativo para a notificação em português.
      "description": uma descrição um pouco mais longa (1-2 frases) explicando a situação e sugerindo uma ação em português.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text().replace(/```json\n|\n```/g, '').trim()

    const recommendation = JSON.parse(text)

    return recommendation.title && recommendation.description ? recommendation : null
  } catch (error) {
    console.error('Erro ao buscar recomendação da IA:', error)
    return {
      title: 'Continue focado nos seus objetivos!',
      description: 'Revise seus materiais e continue praticando para alcançar suas metas de estudo.',
    }
  }
}