import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface TimerControlsProps {
  isActive: boolean;
  timerStarted: boolean;
  onStartClick: () => void;
  onFinishClick: () => void;
}

export function TimerControls({ isActive, timerStarted, onStartClick, onFinishClick }: TimerControlsProps) {
  return (
    <div className="mt-8 flex w-full max-w-sm flex-col items-center justify-center gap-4">
      <Button size="lg" className="h-16 w-full transform px-8 text-xl font-bold ..." onClick={onStartClick}>
        {isActive ? <Pause className="size-8" /> : <Play className="size-8" />}
        <span className="truncate">{isActive ? 'Pausar' : 'Iniciar'}</span>
      </Button>
      {timerStarted && (
         <Button size="lg" variant="destructive" className="h-16 w-full text-xl font-bold" onClick={onFinishClick}>
            Finalizar Estudo
        </Button>
      )}
    </div>
  );
}