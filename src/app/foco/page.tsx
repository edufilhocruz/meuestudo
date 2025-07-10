
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Settings, Play, Pause } from 'lucide-react';
import BottomNav from '@/components/bottom-nav';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type FocusMode = 'pomodoro' | 'livre';
type PomodoroSession = 'focus' | 'break';

const POMODORO_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 10 * 60; // 10 minutes
const TIME_OPTIONS = [15, 30, 45, 60];

export default function Foco() {
  const [focusMode, setFocusMode] = useState<FocusMode>('pomodoro');
  const [pomodoroSession, setPomodoroSession] = useState<PomodoroSession>('focus');
  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(POMODORO_TIME);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [selectedFreeTime, setSelectedFreeTime] = useState(TIME_OPTIONS[0] * 60);
  const [timeStudied, setTimeStudied] = useState(0);

  // States for performance tracking
  const [subject, setSubject] = useState('');
  const [questionsDone, setQuestionsDone] = useState('');
  const [questionsCorrect, setQuestionsCorrect] = useState('');
  const [timerStarted, setTimerStarted] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
        if (time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
                setTimeStudied((prev) => prev + 1);
            }, 1000);
        } else {
          audioRef.current?.play();
          if (focusMode === 'pomodoro') {
            handlePomodoroEnd();
          } else {
            setIsActive(false);
          }
        }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time, pomodoroSession, focusMode]);

  const handlePomodoroEnd = () => {
    // In Pomodoro, we don't force save, just switch sessions.
    setIsActive(false);
    if (pomodoroSession === 'focus') {
      setPomodoroSession('break');
      setTime(BREAK_TIME);
      setTotalDuration(BREAK_TIME);
    } else {
      setPomodoroSession('focus');
      setTime(POMODORO_TIME);
      setTotalDuration(POMODORO_TIME);
    }
    toast({ title: "Sessão Concluída!", description: "Hora de uma pausa." });
  }
  
  useEffect(() => {
    if (totalDuration > 0) {
      const newProgress = ((totalDuration - time) / totalDuration) * 100;
      setProgress(newProgress);
    } else {
      setProgress(0);
    }
  }, [time, totalDuration]);

  useEffect(() => {
    resetTimerState();
  }, [focusMode, selectedFreeTime]);

  const toggleTimer = () => {
    if (time > 0) {
      setIsActive(!isActive);
      if (!timerStarted) {
        setTimerStarted(true);
      }
    }
  };

  const resetTimerState = () => {
     setIsActive(false);
    setTimerStarted(false);
    if (focusMode === 'pomodoro') {
      setPomodoroSession('focus');
      setTime(POMODORO_TIME);
      setTotalDuration(POMODORO_TIME);
    } else {
      setTime(selectedFreeTime);
      setTotalDuration(selectedFreeTime);
    }
    setProgress(0);
    setTimeStudied(0);
    setSubject('');
    setQuestionsDone('');
    setQuestionsCorrect('');
  }

  const handleFinishAndSave = () => {
    const done = parseInt(questionsDone || '0', 10);
    const correct = parseInt(questionsCorrect || '0', 10);
    
    if (!subject.trim()) {
        toast({ variant: 'destructive', title: 'Erro', description: 'A disciplina é obrigatória.' });
        return;
    }
    if (isNaN(done) || isNaN(correct)) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Valores de questões inválidos.' });
        return;
    }
    if (correct > done) {
        toast({ variant: 'destructive', title: 'Erro', description: 'O número de acertos não pode ser maior que o de questões feitas.' });
        return;
    }
    
    const today = new Date().toISOString().split('T')[0];

    // Save study time
    if (timeStudied > 0) {
        const currentProgressJSON = localStorage.getItem('studyProgress');
        const currentProgress = currentProgressJSON ? JSON.parse(currentProgressJSON) : {};
        const todayProgress = currentProgress[today] || { time: 0, day: new Date().getDay() };
        todayProgress.time += timeStudied;
        currentProgress[today] = todayProgress;
        localStorage.setItem('studyProgress', JSON.stringify(currentProgress));
    }

    // Save performance
    const performanceJSON = localStorage.getItem('performanceProgress');
    const performanceData = performanceJSON ? JSON.parse(performanceJSON) : {};
    const todayPerformance = performanceData[today] || { questionsDone: 0, questionsCorrect: 0 };
    todayPerformance.questionsDone += done;
    todayPerformance.questionsCorrect += correct;
    performanceData[today] = todayPerformance;
    localStorage.setItem('performanceProgress', JSON.stringify(performanceData));
    
    toast({
        title: "Sessão Finalizada!",
        description: `Progresso em ${subject} e tempo de estudo foram salvos.`,
    });

    resetTimerState();
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
    <div className="relative flex min-h-screen flex-col justify-between bg-background">
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
        <main className="px-4 py-5 pb-24">
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
                    disabled={isActive || timerStarted}
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
              {timerStarted && (
                 <Button size="lg" variant="destructive" className="h-16 w-full text-xl font-bold" onClick={handleFinishAndSave}>
                    Finalizar Estudo
                </Button>
              )}
            </div>
          </section>

          <section className="pb-16">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">Registrar Desempenho</h2>
            <Card className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-background p-4 shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="disciplina" className="font-semibold text-foreground">Disciplina</Label>
                <Input id="disciplina" placeholder="Ex: Matemática" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="questoes-feitas" className="font-semibold text-foreground">Questões Feitas</Label>
                  <Input id="questoes-feitas" type="number" placeholder="0" value={questionsDone} onChange={(e) => setQuestionsDone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="questoes-acertadas" className="font-semibold text-foreground">Questões Acertadas</Label>
                  <Input id="questoes-acertadas" type="number" placeholder="0" value={questionsCorrect} onChange={(e) => setQuestionsCorrect(e.target.value)} />
                </div>
              </div>
            </Card>
          </section>
        </main>
      </div>
      <BottomNav />
      <audio ref={audioRef} src="https://firebasestorage.googleapis.com/v0/b/genkit-llm-f0896.appspot.com/o/notification.mp3?alt=media&token=e9d3434b-c96b-4e61-8332-d35c446522f2" />
    </div>
  );
}
