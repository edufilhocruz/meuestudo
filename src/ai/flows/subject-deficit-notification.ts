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


// export async function studyCoachNotification(
//   input: StudyCoachNotificationInput
// ): Promise<StudyCoachNotificationOutput> {
//   return studyCoachNotificationFlow(input);
// }
// LLMA: Aqui será feita a chamada para o modelo LLMA futuramente
// Todas as definições de prompt e flow do Genkit foram comentadas para evitar erro de modelo ausente.

// Função mock para manter o frontend funcionando até a integração do LLMA
export async function studyCoachNotification() {
  return {
    shouldNotify: true,
    notificationMessage: 'Dica do dia! Lembre-se de revisar os tópicos da semana anterior para fixar o conhecimento.'
  };
  }