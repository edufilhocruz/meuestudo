'use client';

import { useState } from 'react';
import { useFocusTimer } from '@/features/focus/hooks/useFocusTimer';
import { TimerDisplay } from '@/features/focus/components/TimerDisplay';
import { TimerControls } from '@/features/focus/components/TimerControls';
import { FocusModeSelector } from '@/features/focus/components/FocusModeSelector';
import { PerformanceLogger } from '@/features/focus/components/PerformanceLogger';
import { SubjectDialog } from '@/features/focus/components/SubjectDialog';
import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';
import BottomNav from '@/components/bottom-nav';

const TIME_OPTIONS = [15, 30, 45, 60];

export default function FocoPage() {
  const [focusMode, setFocusMode] = useState<'pomodoro' | 'livre'>('pomodoro');
  const [selectedFreeTime, setSelectedFreeTime] = useState(TIME_OPTIONS[0] * 60);
  
  const {
    state,
    setState,
    handleStartButtonClick,
    handleConfirmSubject,
    handleFinishAndSave,
    sessionLabel,
  } = useFocusTimer(focusMode, selectedFreeTime);

  return (
    <>
      <SubjectDialog
        isOpen={state.isSubjectDialogOpen}
        onOpenChange={(isOpen) => setState(s => ({...s, isSubjectDialogOpen: isOpen}))}
        dialogSubject={state.dialogSubject}
        onDialogSubjectChange={(value) => setState(s => ({ ...s, dialogSubject: value }))}
        onConfirm={handleConfirmSubject}
      />

      <div className="flex min-h-screen bg-background text-foreground font-body">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="hidden md:block"><DesktopHeader title="Foco" /></div>
          {/* Header Mobile Omitido por Brevidade - adicione se necessário */}
          <main className="flex-1 px-4 py-5 pb-24 md:flex md:items-center md:justify-center">
            <div className="w-full max-w-6xl md:grid md:grid-cols-2 md:gap-16">
              
              <section className="flex flex-col items-center justify-center text-center">
                <TimerDisplay
                  time={state.time}
                  totalDuration={state.totalDuration}
                  sessionLabel={sessionLabel}
                  subject={focusMode === 'livre' ? state.subject : undefined}
                />
                <TimerControls
                  isActive={state.isActive}
                  timerStarted={state.timerStarted}
                  onStartClick={handleStartButtonClick}
                  onFinishClick={handleFinishAndSave}
                />
              </section>
              
              <div className="mt-12 md:mt-0">
                <FocusModeSelector
                  focusMode={focusMode}
                  onFocusModeChange={setFocusMode}
                  selectedFreeTime={selectedFreeTime}
                  onSelectedFreeTimeChange={setSelectedFreeTime}
                  isTimerActive={state.isActive}
                  timerStarted={state.timerStarted}
                />
                <PerformanceLogger
                  questionsDone={state.questionsDone}
                  onQuestionsDoneChange={(value) => setState(s => ({ ...s, questionsDone: value }))}
                  questionsCorrect={state.questionsCorrect}
                  onQuestionsCorrectChange={(value) => setState(s => ({ ...s, questionsCorrect: value }))}
                />
              </div>
            </div>
          </main>
        </div>
        <div className="md:hidden"><BottomNav /></div>
      </div>
    </>
  );
}