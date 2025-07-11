'use client';

import { GoalCard } from './GoalCard';
import { Goal } from '../hooks/useGoalsManager';

interface GoalSectionProps {
  title: string;
  goals: Goal[];
  onEditGoal: (goal: Goal) => void;
}

export function GoalSection({ title, goals, onEditGoal }: GoalSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-foreground">{title}</h2>
      <div className="space-y-3">
        {goals.map((goal) => (
          <GoalCard 
            key={goal.title} 
            title={goal.title} 
            value={goal.value} 
            onEdit={() => onEditGoal(goal)} 
          />
        ))}
      </div>
    </section>
  );
}