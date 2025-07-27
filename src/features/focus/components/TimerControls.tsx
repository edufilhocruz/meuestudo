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
      <Button size="lg" className="h-24 w-full max-w-xl mx-auto transform px-16 text-2xl font-bold leading-normal tracking-wide text-primary-foreground shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" onClick={onStartClick}>
        {/* Botão principal de iniciar/pausar, destaque especial para modo livre */}
        {isActive ? <Pause className="size-16" /> : <Play className="size-16" />}
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