'use server';

/**
 * @fileOverview An AI agent that provides a study recommendation based on mock test results.
 *
 * - getTestRecommendation - A function that analyzes test performance and returns a recommendation.
 * - TestRecommendationInput - The input type for the getTestRecommendation function.
 * - TestRecommendationOutput - The return type for the getTestRecommendation function.
 */

import {z} from 'genkit';

const TestRecommendationInputSchema = z.object({
  userName: z.string().describe("The user's name."),
  overallScore: z.number().describe("The user's overall score in the test (percentage)."),
  performanceBySubject: z.array(z.object({
    subject: z.string().describe('The subject.'),
    score: z.number().describe('The score in the subject (percentage).'),
  })).describe('An array of performance data for different subjects.')
});
export type TestRecommendationInput = z.infer<typeof TestRecommendationInputSchema>;

const TestRecommendationOutputSchema = z.object({
  topicToReview: z.string().describe('A specific, single topic for the user to review based on their worst-performing subject. E.g., "Concordância Verbal" for "Português".'),
  justification: z.string().describe('A short, encouraging justification for the recommendation. E.g., "Seu desempenho está abaixo da média."'),
});
export type TestRecommendationOutput = z.infer<typeof TestRecommendationOutputSchema>;


// LLMA: Aqui será feita a chamada para o modelo LLMA futuramente
// Todas as definições de prompt e flow do Genkit foram comentadas para evitar erro de modelo ausente.

// export async function getTestRecommendation(
//   input: TestRecommendationInput
// ): Promise<TestRecommendationOutput> {
//   return testRecommendationFlow(input);
// }

// const prompt = ai.definePrompt({
//   name: 'testRecommendationPrompt',
//   input: {schema: TestRecommendationInputSchema},
//   output: {schema: TestRecommendationOutputSchema},
//   prompt: `Você é um Coach de Estudos IA. Analise os resultados do simulado do usuário {{userName}}.
// 
// Resultados:
// - Pontuação Geral: {{overallScore}}%
// - Desempenho por Matéria:
// {{#each performanceBySubject}}
//   - {{subject}}: {{score}}%
// {{/each}}
// 
// 1.  Identifique a matéria com a **pior** pontuação.
// 2.  Com base na pior matéria, sugira **um tópico específico e fundamental** para o usuário revisar. Seja muito específico. Por exemplo, se a pior matéria for 'Matemática', sugira 'Regra de Três' ou 'Equações de 1º Grau', não apenas 'Álgebra'. Se for 'Português', sugira 'Concordância Verbal' ou 'Uso da Crase'.
// 3.  Forneça uma justificativa curta e direta para a recomendação.
// 4.  Se todas as pontuações forem altas (acima de 80%), forneça um tópico para aprimoramento na matéria de menor pontuação.
//   `,
// });
// 
// const testRecommendationFlow = ai.defineFlow(
//   {
//     name: 'testRecommendationFlow',
//     inputSchema: TestRecommendationInputSchema,
//     outputSchema: TestRecommendationOutputSchema,
//   },
//   async input => {
//     const {output} = await prompt(input);
//     return output!;
//   }
// );

// Função mock para manter o frontend funcionando até a integração do LLMA
export async function getTestRecommendation() {
  return {
    topicToReview: 'Revisar Regra de Três',
    justification: 'Seu desempenho em Matemática foi o menor. Foque nesse tópico para melhorar.'
  };
}
