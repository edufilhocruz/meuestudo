
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

const WEEKLY_GOAL_HOURS = 15;

export default function WeeklyProgress() {
    const [weeklyProgress, setWeeklyProgress] = useState(0);
    const [days, setDays] = useState(['S', 'T', 'Q', 'Q', 'S', 'S', 'D']);

    useEffect(() => {
        const calculateWeeklyProgress = () => {
            const progressJSON = localStorage.getItem('studyProgress');
            if (!progressJSON) return;

            const progress = JSON.parse(progressJSON);
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()); // Start of Sunday

            let totalSecondsThisWeek = 0;
            const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
            const activeDays = new Array(7).fill(false);
            
            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);
                const dayString = day.toISOString().split('T')[0];
                if (progress[dayString] && progress[dayString].time > 0) {
                    totalSecondsThisWeek += progress[dayString].time;
                    activeDays[i] = true;
                }
            }
            
            const weekDaysWithActive = weekDays.map((day, index) => {
                // This logic isn't perfect for styling but gives an idea
                // For simplicity, we just update the progress bar for now.
                return day; 
            });
            // setDays(weekDaysWithActive) // This would require more styling changes

            const totalHoursThisWeek = totalSecondsThisWeek / 3600;
            const progressPercentage = Math.min((totalHoursThisWeek / WEEKLY_GOAL_HOURS) * 100, 100);
            setWeeklyProgress(progressPercentage);
        };

        calculateWeeklyProgress();
    }, []);

  return (
    <section>
      <Card className="p-4 shadow-sm flex flex-col gap-4">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-bold">Progresso Semanal</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-0">
          <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={weeklyProgress} className="flex items-center gap-2" role="progressbar">
            <Progress value={weeklyProgress} className="h-2 flex-1" />
            <p className="text-sm font-semibold text-muted-foreground">{Math.round(weeklyProgress)}%</p>
          </div>
          <div className="flex justify-between text-center text-xs text-muted-foreground">
            {days.map((day, index) => (
              <span key={index}>{day}</span>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
