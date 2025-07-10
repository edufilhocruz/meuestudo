'use server';

/**
 * @fileOverview An AI agent that sends a notification to the user to act as a study coach,
 * analyzing their performance and suggesting improvements.
 *
 * - studyCoachNotification - A function that analyzes user performance and returns a notification.
 * - StudyCoachNotificationInput - The input type for the studyCoachNotification function.
 * - StudyCoachNotificationOutput - The return type for the studyCoachNotification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyCoachNotificationInputSchema = z.object({
  userName: z.string().describe("The user's name."),
  performanceData: z.array(z.object({
    subject: z.string().describe('The subject the user is studying.'),
    studyTime: z.number().describe('The amount of time the user has studied the subject in minutes in the current session.'),
    questionsDone: z.number().describe('The number of questions done in the subject.'),
    questionsCorrect: z.number().describe('The number of questions answered correctly.'),
    averageStudyTime: z.number().describe('The average amount of time other users study the subject in minutes.'),
    averageCorrectRate: z.number().describe('The average percentage of correct answers from other users for this subject (e.g., 0.75 for 75%).'),
  })).describe('An array of performance data for different subjects.')
});
export type StudyCoachNotificationInput = z.infer<typeof StudyCoachNotificationInputSchema>;

const StudyCoachNotificationOutputSchema = z.object({
  shouldNotify: z.boolean().describe('Whether or not the user should be notified.'),
  notificationMessage: z.string().describe('The coaching message to display to the user. Should be encouraging and provide a concrete tip.'),
});
export type StudyCoachNotificationOutput = z.infer<typeof StudyCoachNotificationOutputSchema>;

export async function studyCoachNotification(
  input: StudyCoachNotificationInput
): Promise<StudyCoachNotificationOutput> {
  return studyCoachNotificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studyCoachNotificationPrompt',
  input: {schema: StudyCoachNotificationInputSchema},
  output: {schema: StudyCoachNotificationOutputSchema},
  prompt: `Você é um Coach de Estudos IA especialista. Seu tom é encorajador, positivo e prestativo. Seu objetivo é ajudar o usuário, {{userName}}, a melhorar seus hábitos de estudo.

Analise os dados de desempenho do usuário. Compare seu tempo de estudo e taxa de acertos com a média de outros usuários.

Dados de Desempenho:
{{#each performanceData}}
- Disciplina: {{subject}}
  - Tempo de Estudo do Usuário: {{studyTime}} minutos
  - Questões Feitas pelo Usuário: {{questionsDone}}
  - Respostas Corretas do Usuário: {{questionsCorrect}}
  - Tempo Médio de Estudo: {{averageStudyTime}} minutos
  - Taxa Média de Acertos: {{averageCorrectRate}}
{{/each}}

Com base na sua análise, identifique UMA área principal para melhoria. Isso pode ser um tempo de estudo abaixo do esperado ou uma pontuação inferior à média em uma disciplina específica.

Se houver uma área clara para melhoria, defina shouldNotify como true e gere uma notificationMessage curta e acionável (máximo de 2 frases). A mensagem deve começar reconhecendo o esforço do usuário, depois apontar gentilmente a área de melhoria e oferecer uma dica concreta. Por exemplo: "Ótimo trabalho na sua sessão de estudos, {{userName}}! Notei que sua pontuação em Matemática está um pouco abaixo da média. Tente revisar os conceitos fundamentais antes de partir para problemas mais complexos."

Se o usuário estiver com desempenho igual ou superior à média em todas as áreas, defina shouldNotify como false e notificationMessage como uma string vazia. Gere uma notificação apenas se houver necessidade de melhoria.
  `,
});

const studyCoachNotificationFlow = ai.defineFlow(
  {
    name: 'studyCoachNotificationFlow',
    inputSchema: StudyCoachNotificationInputSchema,
    outputSchema: StudyCoachNotificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
