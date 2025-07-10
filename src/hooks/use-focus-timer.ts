// src/hooks/use-focus-timer.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

type FocusMode = 'pomodoro' | 'livre';
type PomodoroSession = 'focus' | 'break';

const POMODORO_TIME = 25 * 60;
const BREAK_TIME = 10 * 60;
const TIME_OPTIONS = [15, 30, 45, 60];

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

export function useFocusTimer() {
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
    
    // Persistência no localStorage...
    
    toast({ title: "Sessão Finalizada!", description: `Progresso salvo em ${state.subject}.` });
    resetTimerState();
  }, [state.questionsDone, state.questionsCorrect, state.timeStudied, state.subject, toast, resetTimerState]);
  
  const sessionLabel = useMemo(() => {
    if (focusMode !== 'pomodoro') return state.subject || 'Livre';
    return state.pomodoroSession === 'focus' ? state.subject || 'Foco' : 'Pausa';
  }, [focusMode, state.subject, state.pomodoroSession]);
  
  return {
    state,
    setState,
    focusMode,
    setFocusMode,
    selectedFreeTime,
    setSelectedFreeTime,
    handleStartButtonClick,
    handleConfirmSubject,
    handleFinishAndSave,
    sessionLabel,
  };
}