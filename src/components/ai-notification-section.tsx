'use client'

import { useEffect, useState } from 'react';
import { getStudyCoachNotification } from '@/ai/flows/subject-deficit-notification';
import type { StudyCoachNotificationOutput } from '@/ai/flows/subject-deficit-notification';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Bell, ChevronRight } from 'lucide-react';

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

        // Only fetch notification if there is performance data for today
        if (todayPerformance && todayPerformance.questionsDone > 0) {
          const result = await getStudyCoachNotification({
            userName: 'Ana',
            performanceData: [
              {
                subject: 'Desempenho Geral', // Using a generic subject name
                studyTime: 0, // Study time is tracked separately for now
                questionsDone: todayPerformance.questionsDone,
                questionsCorrect: todayPerformance.questionsCorrect,
                // Static averages for now, can be dynamic later
                averageStudyTime: 60,
                averageCorrectRate: 0.75,
              }
            ]
          });
          setNotification(result);
        } else {
          // No performance data, so no notification
          setNotification({ shouldNotify: false, notificationMessage: '' });
        }
      } catch (error) {
        console.error("Failed to fetch AI notification:", error);
        setNotification({ shouldNotify: false, notificationMessage: '' });
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
      const messageParts = notification.notificationMessage.split('!');
      const title = messageParts[0] + '!';
      const description = messageParts.slice(1).join('!').trim();

      return (
        <Card className="flex cursor-pointer items-center gap-4 p-4 shadow-sm transition-all hover:shadow-md">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bell className="size-7" />
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

    // Don't render the section if there's nothing to show
    return null;
  };
  
  const content = renderContent();

  if (!content) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Notificações da IA</h3>
      {content}
    </section>
  );
}
