'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface GoalProgressProps {
  label: string;
  value: number;
}

export function GoalProgress({ label, value }: GoalProgressProps) {
  return (
    <section>
      <h2 className="px-2 pb-4 text-2xl font-bold tracking-tight text-foreground">Acompanhamento de Metas</h2>
      <Card className="p-6 rounded-2xl shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-base font-medium text-card-foreground">{label}</p>
          <p className="text-sm font-bold text-primary">{value}%</p>
        </div>
        <Progress value={value} className="h-2.5" />
      </Card>
    </section>
  );
}