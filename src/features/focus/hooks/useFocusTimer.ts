// src/features/focus/hooks/useFocusTimer.ts
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

type FocusMode = 'pomodoro' | 'livre';
type PomodoroSession = 'focus' | 'break';

const POMODORO_TIME = 25 * 60;
const BREAK_TIME = 10 * 60;

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

export function useFocusTimer(focusMode: FocusMode, selectedFreeTime: number) {
  const [state, setState] = useState(initialState);
  const { toast } = useToast();

  const resetTimerState = useCallback(() => {
    let newTime, newTotalDuration;
    if (focusMode === 'pomodoro') {
      newTime = POMODORO_TIME;
      newTotalDuration = POMODORO_TIME;
    } else {
      newTime = 0;
      newTotalDuration = 0;
    }
    setState({
      ...initialState,
      time: newTime,
      totalDuration: newTotalDuration,
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
  
  const sessionLabel = useMemo(() => {
    if (focusMode !== 'pomodoro') return state.subject || 'Livre';
    return state.pomodoroSession === 'focus' ? state.subject || 'Foco' : 'Pausa';
  }, [focusMode, state.subject, state.pomodoroSession]);
  
  return {
    state,
    setState,
    handleStartButtonClick,
    handleConfirmSubject,
    handleFinishAndSave,
    sessionLabel,
  };
}