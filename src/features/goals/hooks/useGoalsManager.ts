'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Goal {
  title: string;
  value: string;
}

const initialWeeklyGoals: Goal[] = [{ title: 'Horas de estudo por semana', value: '10 horas' }];
const initialDailyGoals: Goal[] = [
  { title: 'Tempo de estudo por dia', value: '2 horas' },
  { title: 'Questões por dia', value: '50 questões' },
];
const initialAdditionalGoals: Goal[] = [
  { title: 'Redações por semana', value: '2 redações' },
  { title: 'Simulados por mês', value: '1 simulado' },
];
const initialPreferences: Goal[] = [
    { title: 'Notificações', value: 'Ativadas' },
    { title: 'Rastreamento de Desempenho', value: 'Ativado' },
];

export function useGoalsManager() {
  const [weeklyGoals, setWeeklyGoals] = useState(initialWeeklyGoals);
  const [dailyGoals, setDailyGoals] = useState(initialDailyGoals);
  const [additionalGoals, setAdditionalGoals] = useState(initialAdditionalGoals);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const { toast } = useToast();

  const handleEditClick = useCallback((goalToEdit: Goal) => {
    setEditingGoal(goalToEdit);
    setIsEditDialogOpen(true);
  }, []);

  const handleSaveChanges = useCallback((updatedGoal: Goal) => {
    setWeeklyGoals(goals => goals.map(g => g.title === updatedGoal.title ? updatedGoal : g));
    setDailyGoals(goals => goals.map(g => g.title === updatedGoal.title ? updatedGoal : g));
    setAdditionalGoals(goals => goals.map(g => g.title === updatedGoal.title ? updatedGoal : g));
    setPreferences(goals => goals.map(g => g.title === updatedGoal.title ? updatedGoal : g));

    toast({ title: "Meta Atualizada!", description: `Sua meta de "${updatedGoal.title}" foi salva.` });
    setIsEditDialogOpen(false);
    setEditingGoal(null);
  }, [toast]);

  return {
    goals: { weeklyGoals, dailyGoals, additionalGoals, preferences },
    dialogState: {
      isOpen: isEditDialogOpen,
      goal: editingGoal,
      onOpenChange: setIsEditDialogOpen,
      onSave: handleSaveChanges,
    },
    handleEditClick,
  };
}