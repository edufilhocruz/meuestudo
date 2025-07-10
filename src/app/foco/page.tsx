'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Settings, Play, Pause } from 'lucide-react';
import BottomNav from '@/components/bottom-nav';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';

// --- Tipos e Constantes ---
type FocusMode = 'pomodoro' | 'livre';
type PomodoroSession = 'focus' | 'break';
const POMODORO_TIME = 25 * 60;
const BREAK_TIME = 10 * 60;
const TIME_OPTIONS = [15, 30, 45, 60];
const CIRCLE_RADIUS = 120;

const initialState = {
  time: POMODORO_TIME,
  isActive: false,
  totalDuration: POMODORO_TIME,
  pomodoroSession: 'focus' as PomodoroSession,
  timeStudied: 0,
  subject: '',
  questionsDone: '',
  questionsCorrect: '',
  timerStarted: false,
  isSubjectDialogOpen: false,
  dialogSubject: '',
};

export default function Foco() {
  const [focusMode, setFocusMode] = useState<FocusMode>('pomodoro');
  const [selectedFreeTime, setSelectedFreeTime] = useState(TIME_OPTIONS[0] * 60);
  const [state, setState] = useState(initialState);
  const { toast } = useToast();

  const resetTimerState = useCallback(() => {
    const newTime = focusMode === 'pomodoro' ? POMODORO_TIME : selectedFreeTime;
    setState({
      ...initialState,
      time: newTime,
      totalDuration: newTime,
      pomodoroSession: 'focus',
    });
  }, [focusMode, selectedFreeTime]);

  const handlePomodoroEnd = useCallback(() => {
    const isFocusSession = state.pomodoroSession === 'focus';
    toast({ 
      title: "Sessão Concluída!", 
      description: isFocusSession ? "Hora de uma pausa." : "Pausa finalizada. Vamos voltar ao foco!"
    });
    setState(s => ({
      ...s,
      isActive: false,
      pomodoroSession: isFocusSession ? 'break' : 'focus',
      time: isFocusSession ? BREAK_TIME : POMODORO_TIME,
      totalDuration: isFocusSession ? BREAK_TIME : POMODORO_TIME,
    }));
  }, [state.pomodoroSession, toast]);
  
  // Efeito principal do timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (state.isActive && state.time > 0) {
      interval = setInterval(() => {
        setState(s => ({ ...s, time: s.time - 1, timeStudied: s.pomodoroSession === 'focus' ? s.timeStudied + 1 : s.timeStudied }));
      }, 1000);
    } else if (state.isActive && state.time === 0) {
      if (focusMode === 'pomodoro') handlePomodoroEnd();
      else setState(s => ({ ...s, isActive: false }));
    }
    return () => { if (interval) clearInterval(interval) };
  }, [state.isActive, state.time, focusMode, state.pomodoroSession, handlePomodoroEnd]);

  useEffect(() => {
    resetTimerState();
  }, [focusMode, selectedFreeTime, resetTimerState]);

  const handleStartButtonClick = useCallback(() => {
    if (state.isActive) setState(s => ({ ...s, isActive: false }));
    else if (!state.subject) setState(s => ({ ...s, dialogSubject: '', isSubjectDialogOpen: true }));
    else setState(s => ({ ...s, isActive: true }));
  }, [state.isActive, state.subject]);

  const handleConfirmSubject = useCallback(() => {
    if (!state.dialogSubject.trim()) {
      toast({ variant: 'destructive', title: 'Obrigatório', description: 'Por favor, informe a disciplina.' });
      return;
    }
    setState(s => ({ ...s, subject: s.dialogSubject, isSubjectDialogOpen: false, isActive: true, timerStarted: true }));
  }, [state.dialogSubject, toast]);

  const handleFinishAndSave = useCallback(() => {
    const done = parseInt(state.questionsDone || '0', 10);
    const correct = parseInt(state.questionsCorrect || '0', 10);
    if (correct > done) {
      toast({ variant: 'destructive', title: 'Erro', description: 'O número de acertos não pode ser maior que o de questões feitas.' });
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    if (state.timeStudied > 0) {
      const studyProgress = JSON.parse(localStorage.getItem('studyProgress') || '{}');
      const todayProgress = studyProgress[today] || { time: 0 };
      todayProgress.time += state.timeStudied;
      localStorage.setItem('studyProgress', JSON.stringify({ ...studyProgress, [today]: todayProgress }));
    }
    if (done > 0) {
      const performanceData = JSON.parse(localStorage.getItem('performanceProgress') || '{}');
      const todayPerformance = performanceData[today] || { questionsDone: 0, questionsCorrect: 0 };
      todayPerformance.questionsDone += done;
      todayPerformance.questionsCorrect += correct;
      localStorage.setItem('performanceProgress', JSON.stringify({ ...performanceData, [today]: todayPerformance }));
    }
    toast({ title: "Sessão Finalizada!", description: `Progresso salvo em ${state.subject}.` });
    resetTimerState();
  }, [state.questionsDone, state.questionsCorrect, state.timeStudied, state.subject, toast, resetTimerState]);
  
  const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  
  const progressCircle = useMemo(() => {
    const circumference = 2 * Math.PI * CIRCLE_RADIUS;
    const progress = state.totalDuration > 0 ? ((state.totalDuration - state.time) / state.totalDuration) * 100 : 0;
    return { circumference, strokeDashoffset: circumference - (progress / 100) * circumference };
  }, [state.time, state.totalDuration]);

  const sessionLabel = useMemo(() => {
    if (focusMode !== 'pomodoro') return state.subject || 'Livre';
    return state.pomodoroSession === 'focus' ? state.subject || 'Foco' : 'Pausa';
  }, [focusMode, state.subject, state.pomodoroSession]);

  return (
    <>
      <Dialog open={state.isSubjectDialogOpen} onOpenChange={(isOpen) => setState(s => ({...s, isSubjectDialogOpen: isOpen}))}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Qual disciplina você vai estudar?</DialogTitle>
            <DialogDescription>
              Informe a disciplina para iniciar sua sessão de foco.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="disciplina-modal"
              placeholder="Ex: Matemática"
              value={state.dialogSubject}
              onChange={(e) => setState(s => ({...s, dialogSubject: e.target.value}))}
              autoComplete="off"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleConfirmSubject} className="w-full">Confirmar e Iniciar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex min-h-screen bg-background text-foreground font-body">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between bg-card p-4 pb-2 md:hidden">
            <div className="w-12"></div>
            <h1 className="flex-1 text-center text-lg font-bold text-foreground">Foco</h1>
            <div className="flex w-12 items-center justify-end">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary"><Settings className="size-6" /></Button>
            </div>
          </header>
          <div className="hidden md:block">
              <DesktopHeader />
          </div>

          <main className="flex-1 px-4 py-5 pb-24 md:flex md:items-center md:justify-center">
            <div className="w-full max-w-6xl md:grid md:grid-cols-2 md:gap-16">
              
              <section className="flex flex-col items-center justify-center text-center">
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
                    <div className="text-5xl font-bold tracking-tighter text-foreground">{formatTime(state.time)}</div>
                  </div>
                </div>
                <div className="mt-8 flex w-full max-w-sm flex-col items-center justify-center gap-4">
                  <Button size="lg" className="h-16 w-full transform px-8 text-xl font-bold leading-normal tracking-wide text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" onClick={handleStartButtonClick}>
                    {state.isActive ? <Pause className="size-8" /> : <Play className="size-8" />}
                    <span className="truncate">{state.isActive ? 'Pausar' : 'Iniciar'}</span>
                  </Button>
                  {state.timerStarted && (
                     <Button size="lg" variant="destructive" className="h-16 w-full text-xl font-bold" onClick={handleFinishAndSave}>
                        Finalizar Estudo
                    </Button>
                  )}
                </div>
              </section>
              
              <div className="mt-12 md:mt-0">
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
                          onClick={() => setSelectedFreeTime(minutes * 60)}
                          disabled={state.isActive || state.timerStarted}
                        >
                          {minutes}m
                        </Button>
                      ))}
                    </div>
                  </section>
                )}

                <section className="pb-16">
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">Registrar Desempenho da Sessão</h2>
                  <Card className="flex flex-col gap-4 rounded-xl border p-4 shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="questoes-feitas">Questões Feitas</Label>
                        <Input id="questoes-feitas" type="number" placeholder="0" value={state.questionsDone} onChange={e => setState(s => ({ ...s, questionsDone: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="questoes-acertadas">Questões Acertadas</Label>
                        <Input id="questoes-acertadas" type="number" placeholder="0" value={state.questionsCorrect} onChange={e => setState(s => ({ ...s, questionsCorrect: e.target.value }))} />
                      </div>
                    </div>
                  </Card>
                </section>
              </div>
            </div>
          </main>
        </div>
        
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </>
  );
}