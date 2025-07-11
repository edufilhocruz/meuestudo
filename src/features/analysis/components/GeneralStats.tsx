import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Stat {
  label: string;
  value: string;
  isPrimary?: boolean;
}

interface GeneralStatsProps {
  stats: Stat[];
}

export function GeneralStats({ stats }: GeneralStatsProps) {
  return (
    <section>
      <h2 className="px-2 pb-4 text-2xl font-bold tracking-tight text-foreground">Desempenho Geral</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
        {stats.map(({ label, value, isPrimary }) => (
          <Card key={label} className="flex flex-col gap-2 rounded-2xl p-6 shadow-sm">
            <p className="text-base font-medium leading-normal text-muted-foreground">{label}</p>
            <p className={cn("text-3xl font-bold leading-tight tracking-tight", isPrimary ? "text-primary" : "text-card-foreground")}>
              {value}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}