'use client'

import { useEffect, useState } from 'react';
import { getStudyCoachNotificationAction } from '@/app/actions';
import type { StudyCoachNotificationOutput } from '@/ai/flows/subject-deficit-notification';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Lightbulb, ChevronRight } from 'lucide-react';

export default function AiNotificationSection() {
  const [notification, setNotification] = useState<StudyCoachNotificationOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const performanceJSON = localStorage.getItem('performanceProgress');
        const performanceData = performanceJSON ? JSON.parse(performanceJSON) : {};
        const todayPerformance = performanceData[today];

        // Prepara os dados de entrada para a IA
        const inputData = {
          userName: 'Ana',
          // Passa os dados de desempenho se existirem, senão, passa um array vazio
          performanceData: (todayPerformance && todayPerformance.questionsDone > 0)
            ? [{
                subject: 'Desempenho Geral',
                studyTime: 0, 
                questionsDone: todayPerformance.questionsDone,
                questionsCorrect: todayPerformance.questionsCorrect,
                averageStudyTime: 60,
                averageCorrectRate: 0.75,
              }]
            : []
        };
        
        // Chama a IA incondicionalmente
        const result = await getStudyCoachNotificationAction(inputData);
        setNotification(result);

      } catch (error) {
        console.error("Failed to fetch AI notification:", error);
        setNotification({ 
          shouldNotify: true, 
          notificationMessage: 'Dica do dia! Lembre-se de revisar os tópicos da semana anterior para fixar o conhecimento.' 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <Card className="flex items-center gap-4 p-4 shadow-sm">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Card>
      );
    }

    if (notification?.shouldNotify) {
      // Usaremos o split para separar o título da descrição, se houver '!'
      const messageParts = notification.notificationMessage.includes('!') 
        ? notification.notificationMessage.split('!') 
        : [notification.notificationMessage, ''];
        
      const title = messageParts[0] + (notification.notificationMessage.includes('!') ? '!' : '');
      const description = messageParts.slice(1).join('!').trim();

      return (
        <Card className="flex cursor-pointer items-center gap-4 p-4 shadow-sm transition-all hover:shadow-md">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lightbulb className="size-7" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-card-foreground">{title}</p>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="text-muted-foreground/50">
            <ChevronRight className="size-5" />
          </div>
        </Card>
      );
    }

    return null;
  };
  
  const content = renderContent();

  if (!content) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Recomendações da IA</h3>
      {content}
    </section>
  );
}