'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Settings, Play, Pause, RotateCcw } from 'lucide-react';
import BottomNav from './bottom-nav';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

type FocusMode = 'pomodoro' | 'livre';
type PomodoroSession = 'focus' | 'break';

const POMODORO_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 10 * 60; // 10 minutes
const TIME_OPTIONS = [15, 30, 45, 60];

export default function FocusPage() {
  const [focusMode, setFocusMode] = useState<FocusMode>('pomodoro');
  const [pomodoroSession, setPomodoroSession] = useState<PomodoroSession>('focus');
  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(POMODORO_TIME);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [selectedFreeTime, setSelectedFreeTime] = useState(TIME_OPTIONS[0] * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      audioRef.current?.play();
      setIsActive(false);
      if (focusMode === 'pomodoro') {
        if (pomodoroSession === 'focus') {
          setPomodoroSession('break');
          setTime(BREAK_TIME);
          setTotalDuration(BREAK_TIME);
        } else {
          setPomodoroSession('focus');
          setTime(POMODORO_TIME);
          setTotalDuration(POMODORO_TIME);
        }
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time, pomodoroSession, focusMode]);
  
  useEffect(() => {
    if (totalDuration > 0) {
      const newProgress = ((totalDuration - time) / totalDuration) * 100;
      setProgress(newProgress);
    } else {
      setProgress(0);
    }
  }, [time, totalDuration]);

  useEffect(() => {
    setIsActive(false);
    if (focusMode === 'pomodoro') {
      setPomodoroSession('focus');
      setTime(POMODORO_TIME);
      setTotalDuration(POMODORO_TIME);
    } else {
      setTime(selectedFreeTime);
      setTotalDuration(selectedFreeTime);
    }
    setProgress(0);
  }, [focusMode, selectedFreeTime]);

  const toggleTimer = () => {
    if (time > 0) {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    if (focusMode === 'pomodoro') {
      setPomodoroSession('focus');
      setTime(POMODORO_TIME);
      setTotalDuration(POMODORO_TIME);
    } else {
      setTime(selectedFreeTime);
      setTotalDuration(selectedFreeTime);
    }
    setProgress(0);
  };

  const handleFreeTimeSelect = (minutes: number) => {
    const newTimeInSeconds = minutes * 60;
    setSelectedFreeTime(newTimeInSeconds);
    setTime(newTimeInSeconds);
    setTotalDuration(newTimeInSeconds);
    setIsActive(false);
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const getSessionLabel = () => {
    if (focusMode !== 'pomodoro') return 'Livre';
    if (pomodoroSession === 'focus') return 'Foco';
    return 'Pausa';
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col justify-between bg-background">
      <div className="flex-grow">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-background p-4 pb-2">
          <div className="w-12"></div>
          <h1 className="flex-1 text-center text-lg font-bold text-foreground">Foco</h1>
          <div className="flex w-12 items-center justify-end">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
              <Settings className="size-6" />
            </Button>
          </div>
        </header>
        <main className="px-4 py-5">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">Modo Foco</h2>
            <RadioGroup 
              defaultValue="pomodoro" 
              value={focusMode}
              onValueChange={(value: FocusMode) => setFocusMode(value)}
              className="flex h-12 flex-1 items-center justify-center rounded-xl bg-secondary p-1.5"
            >
              <Label htmlFor="pomodoro" className="flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 text-base font-semibold leading-normal text-muted-foreground transition-all duration-300 has-[:checked]:bg-background has-[:checked]:text-foreground has-[:checked]:shadow-md">
                <span className="truncate">Pomodoro</span>
                <RadioGroupItem value="pomodoro" id="pomodoro" className="sr-only" />
              </Label>
              <Label htmlFor="livre" className="flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 text-base font-semibold leading-normal text-muted-foreground transition-all duration-300 has-[:checked]:bg-background has-[:checked]:text-foreground has-[:checked]:shadow-md">
                <span className="truncate">Livre</span>
                <RadioGroupItem value="livre" id="livre" className="sr-only" />
              </Label>
            </RadioGroup>
          </section>

          {focusMode === 'livre' && (
            <section className="mb-8">
              <h3 className="mb-4 text-center text-lg font-semibold text-foreground">Selecione o tempo</h3>
              <div className="grid grid-cols-4 gap-3">
                {TIME_OPTIONS.map((minutes) => (
                  <Button
                    key={minutes}
                    variant={selectedFreeTime === minutes * 60 ? 'default' : 'secondary'}
                    className="h-12 w-full text-base font-bold shadow-sm"
                    onClick={() => handleFreeTimeSelect(minutes)}
                  >
                    {minutes}m
                  </Button>
                ))}
              </div>
            </section>
          )}

          <section className="mb-8 flex flex-col items-center justify-center text-center">
            <div className="relative size-64">
              <svg className="size-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                <circle cx="128" cy="128" r={radius} fill="none" stroke="hsl(var(--secondary))" strokeWidth="16" />
                <circle
                  cx="128"
                  cy="128"
                  r={radius}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 128 128)"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-medium text-muted-foreground">{getSessionLabel()}</p>
                <div className="text-5xl font-bold tracking-tighter text-foreground">
                  {formatTime(time)}
                </div>
              </div>
            </div>
            <div className="mt-8 flex w-full max-w-sm flex-col items-center justify-center gap-4">
              <Button size="lg" className="h-16 w-full transform px-8 text-xl font-bold leading-normal tracking-wide text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" onClick={toggleTimer}>
                {isActive ? <Pause className="size-8" /> : <Play className="size-8" />}
                <span className="truncate">{isActive ? 'Pausar' : 'Iniciar'}</span>
              </Button>
              <Button size="lg" variant="ghost" className="h-16 w-full text-muted-foreground" onClick={resetTimer}>
                Finalizar
              </Button>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">Registrar Desempenho</h2>
            <Card className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-background p-4 shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="disciplina" className="font-semibold text-foreground">Disciplina</Label>
                <Input id="disciplina" placeholder="Ex: Matemática" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="questoes-feitas" className="font-semibold text-foreground">Questões Feitas</Label>
                  <Input id="questoes-feitas" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="questoes-acertadas" className="font-semibold text-foreground">Questões Acertadas</Label>
                  <Input id="questoes-acertadas" type="number" placeholder="0" />
                </div>
              </div>
              <Button className="mt-2 w-full">Salvar Progresso</Button>
            </Card>
          </section>
        </main>
      </div>
      <BottomNav />
      <audio ref={audioRef} src="https://firebasestorage.googleapis.com/v0/b/genkit-llm-f0896.appspot.com/o/notification.mp3?alt=media&token=e9d3434b-c96b-4e61-8332-d35c446522f2" />
    </div>
  );
}
