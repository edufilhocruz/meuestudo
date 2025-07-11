'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Goal } from '../hooks/useGoalsManager';

interface EditGoalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onSave: (newGoal: Goal) => void;
}

export function EditGoalDialog({ isOpen, onOpenChange, goal, onSave }: EditGoalDialogProps) {
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    if (goal) setCurrentValue(goal.value);
  }, [goal]);

  const handleSaveClick = () => {
    if (goal) onSave({ ...goal, value: currentValue });
  };

  if (!goal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Meta</DialogTitle>
          <DialogDescription>{goal.title}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="goal-value" className="sr-only">Valor</Label>
          <Input id="goal-value" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} />
        </div>
        <DialogFooter>
          <Button onClick={handleSaveClick}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}