'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pencil } from 'lucide-react';

interface GoalCardProps {
  title: string;
  value: string;
  onEdit: () => void;
}

export function GoalCard({ title, value, onEdit }: GoalCardProps) {
  return (
    <Card className="flex items-center justify-between gap-4 rounded-xl p-4 shadow-sm bg-card">
      <div>
        <p className="font-medium text-card-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
      <Button onClick={onEdit} variant="ghost" size="icon" className="size-8 shrink-0 rounded-full text-muted-foreground">
        <Pencil className="size-5" />
        <span className="sr-only">Editar meta</span>
      </Button>
    </Card>
  );
}