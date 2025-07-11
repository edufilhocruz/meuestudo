import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DataCardProps {
  label: string;
  value: string;
  isPrimary?: boolean;
}

export function DataCard({ label, value, isPrimary = false }: DataCardProps) {
  return (
    <Card className="flex flex-col gap-2 rounded-2xl p-6 shadow-sm">
      <p className="text-base font-medium leading-normal text-muted-foreground">{label}</p>
      <p className={cn("text-3xl font-bold leading-tight tracking-tight", isPrimary ? "text-primary" : "text-card-foreground")}>
        {value}
      </p>
    </Card>
  );
}