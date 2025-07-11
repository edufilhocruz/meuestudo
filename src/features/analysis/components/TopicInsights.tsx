'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface TopicInsightsProps {
  strengths: string;
  weaknesses: string;
}

export function TopicInsights({ strengths, weaknesses }: TopicInsightsProps) {
  return (
    <section>
      <h2 className="px-2 pb-4 text-2xl font-bold tracking-tight text-foreground">Insights por Tópico</h2>
      <div className="space-y-4">
        <Card className="flex items-center gap-4 p-4 rounded-2xl shadow-sm">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500">
            <CheckCircle className="size-7" />
          </div>
          <div>
            <p className="font-semibold text-card-foreground">Pontos Fortes</p>
            <p className="text-sm text-muted-foreground">{strengths}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-4 rounded-2xl shadow-sm">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
            <XCircle className="size-7" />
          </div>
          <div>
            <p className="font-semibold text-card-foreground">Pontos a Melhorar</p>
            <p className="text-sm text-muted-foreground">{weaknesses}</p>
          </div>
        </Card>
      </div>
    </section>
  );
}