import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PerformanceLoggerProps {
  questionsDone: string;
  onQuestionsDoneChange: (value: string) => void;
  questionsCorrect: string;
  onQuestionsCorrectChange: (value: string) => void;
}

export function PerformanceLogger({
  questionsDone, onQuestionsDoneChange, questionsCorrect, onQuestionsCorrectChange
}: PerformanceLoggerProps) {
  return (
    <section className="pb-16">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">Registrar Desempenho da Sessão</h2>
      <Card className="flex flex-col gap-4 rounded-xl border p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="questoes-feitas">Questões Feitas</Label>
            <Input id="questoes-feitas" type="number" placeholder="0" value={questionsDone} onChange={e => onQuestionsDoneChange(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="questoes-acertadas">Questões Acertadas</Label>
            <Input id="questoes-acertadas" type="number" placeholder="0" value={questionsCorrect} onChange={e => onQuestionsCorrectChange(e.target.value)} />
          </div>
        </div>
      </Card>
    </section>
  );
}