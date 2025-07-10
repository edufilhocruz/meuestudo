import { useMemo } from 'react';

const CIRCLE_RADIUS = 120;
const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

interface TimerDisplayProps {
  time: number;
  totalDuration: number;
  sessionLabel: string;
}

export function TimerDisplay({ time, totalDuration, sessionLabel }: TimerDisplayProps) {
  const progressCircle = useMemo(() => {
    const circumference = 2 * Math.PI * CIRCLE_RADIUS;
    const progress = totalDuration > 0 ? ((totalDuration - time) / totalDuration) * 100 : 0;
    return { circumference, strokeDashoffset: circumference - (progress / 100) * circumference };
  }, [time, totalDuration]);

  return (
    <div className="relative size-64">
      <svg className="size-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <circle cx="128" cy="128" r={CIRCLE_RADIUS} fill="none" stroke="hsl(var(--border))" strokeWidth="16" />
        <circle
          cx="128" cy="128" r={CIRCLE_RADIUS} fill="none"
          stroke="hsl(var(--primary))" strokeWidth="16"
          strokeLinecap="round" strokeDasharray={progressCircle.circumference}
          strokeDashoffset={progressCircle.strokeDashoffset} transform="rotate(-90 128 128)"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xl font-medium text-muted-foreground">{sessionLabel}</p>
        <div className="text-5xl font-bold tracking-tighter text-foreground">{formatTime(time)}</div>
      </div>
    </div>
  );
}