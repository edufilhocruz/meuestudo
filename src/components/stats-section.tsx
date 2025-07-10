
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const DAILY_GOAL_MINUTES = 3 * 60; // 3 hours

export default function StatsSection() {
    const [studyTimeToday, setStudyTimeToday] = useState(0);
    const [averagePerformance, setAveragePerformance] = useState(0);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        
        // Calculate study time
        const studyProgressJSON = localStorage.getItem('studyProgress');
        if (studyProgressJSON) {
            const progress = JSON.parse(studyProgressJSON);
            if (progress[today]) {
                setStudyTimeToday(progress[today].time);
            }
        }
        
        // Calculate performance
        const performanceJSON = localStorage.getItem('performanceProgress');
        if (performanceJSON) {
            const performanceData = JSON.parse(performanceJSON);
            if (performanceData[today]) {
                const { questionsDone, questionsCorrect } = performanceData[today];
                if (questionsDone > 0) {
                    setAveragePerformance(Math.round((questionsCorrect / questionsDone) * 100));
                }
            }
        }
    }, []);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    const dailyGoalProgress = Math.min(((studyTimeToday / 60) / DAILY_GOAL_MINUTES) * 100, 100);

  return (
    <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-sm">
                <CardContent className="flex flex-col gap-2 p-4">
                    <p className="text-sm font-medium text-muted-foreground">Tempo de estudo hoje</p>
                    <p className="text-2xl font-bold text-card-foreground">{formatTime(studyTimeToday)}</p>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardContent className="flex flex-col justify-center gap-2 p-4 h-full">
                    <p className="text-sm font-medium text-muted-foreground">Meta diária</p>
                    <div className="flex items-center gap-2">
                        <Progress value={dailyGoalProgress} className="h-2 flex-1" />
                        <p className="text-sm font-semibold text-primary">{Math.round(dailyGoalProgress)}%</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <Card className="shadow-sm">
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <p className="mb-1 text-sm font-medium text-muted-foreground">Desempenho Médio</p>
                    <p className="text-4xl font-bold tracking-tight text-card-foreground">{averagePerformance}%</p>
                    <p className={cn("text-lg font-semibold", averagePerformance >= 70 ? 'text-green-600' : 'text-destructive' )}>
                        {averagePerformance >= 70 ? 'Bom desempenho' : 'Pode melhorar'}
                    </p>
                </div>
                <div className="size-24">
                    <svg className="size-full" viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="hsl(var(--secondary))"
                            strokeWidth="3"
                        />
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeDasharray={`${averagePerformance}, 100`}
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="transition-all"
                        />
                    </svg>
                </div>
            </CardContent>
        </Card>
    </section>
  );
}
