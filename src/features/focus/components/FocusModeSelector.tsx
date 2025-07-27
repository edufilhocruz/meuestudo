'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Importar o 'cn' para combinar classes

type FocusMode = 'pomodoro' | 'livre';
const TIME_OPTIONS = [15, 30, 45, 60];

interface FocusModeSelectorProps {
  focusMode: FocusMode;
  onFocusModeChange: (mode: FocusMode) => void;
  selectedFreeTime: number;
  onSelectedFreeTimeChange: (time: number) => void;
  isTimerActive: boolean;
  timerStarted: boolean;
}

export function FocusModeSelector({
  focusMode,
  onFocusModeChange,
  selectedFreeTime,
  onSelectedFreeTimeChange,
  isTimerActive,
  timerStarted,
}: FocusModeSelectorProps) {
  return (
    <>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">Modo Foco</h2>
        <div className="grid grid-cols-2 gap-4">
            <Button
                variant={focusMode === 'pomodoro' ? 'outline' : 'secondary'}
                size="lg"
                className={cn(
                    "h-14 text-base font-bold",
                    focusMode === 'pomodoro' && "bg-primary/10 text-primary border-primary"
                )}
                onClick={() => onFocusModeChange('pomodoro')}
            >
                Pomodoro
            </Button>
            <Button
                variant={focusMode === 'livre' ? 'outline' : 'secondary'}
                size="lg"
                className={cn(
                    "h-14 text-base font-bold",
                    focusMode === 'livre' && "bg-primary/10 text-primary border-primary"
                )}
                onClick={() => onFocusModeChange('livre')}
            >
                Livre
            </Button>
        </div>
      </section>

      {focusMode === 'livre' && false && (
        <section className="mb-8">
          <h3 className="mb-4 text-center text-lg font-semibold text-foreground">Selecione o tempo</h3>
          <div className="grid grid-cols-4 gap-3">
            {TIME_OPTIONS.map((minutes) => {
              const isActive = selectedFreeTime === minutes * 60;
              return (
                <Button
                  key={minutes}
                  variant={isActive ? 'outline' : 'secondary'}
                  className={cn(
                      "h-12 w-full text-base font-bold shadow-sm",
                      isActive && "bg-primary/10 text-primary border-primary"
                  )}
                  onClick={() => onSelectedFreeTimeChange(minutes * 60)}
                  disabled={isTimerActive || timerStarted}
                >
                  {minutes}m
                </Button>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}