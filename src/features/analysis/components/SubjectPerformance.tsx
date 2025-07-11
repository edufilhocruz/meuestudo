import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Subject {
  subject: string;
  score: number;
}

interface SubjectPerformanceProps {
  subjects: Subject[];
}

export function SubjectPerformance({ subjects }: SubjectPerformanceProps) {
  return (
    <section>
      <h2 className="px-2 pb-4 text-2xl font-bold tracking-tight text-foreground">Análise por Disciplina</h2>
      <Card className="p-6 rounded-2xl shadow-sm">
        <div className="space-y-4">
          {subjects.map(({ subject, score }, index) => (
            <div key={index} className="flex items-center gap-4">
              <p className="w-24 text-sm font-medium text-muted-foreground">{subject}</p>
              <Progress value={score} className="h-3 flex-1" />
              <p className="text-sm font-bold text-card-foreground">{score}%</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}