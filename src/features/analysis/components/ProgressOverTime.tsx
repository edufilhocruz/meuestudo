'use client';

import { Card } from '@/components/ui/card';

// O gráfico em si pode ser mantido como um sub-componente aqui ou movido para um ficheiro separado no futuro, se necessário.
const PerformanceChart = () => (
    <svg fill="none" height="150" preserveAspectRatio="none" viewBox="0 0 475 150" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="236" x2="236" y1="1" y2="149">
                <stop stopColor="hsl(var(--primary))" stopOpacity="0.3"></stop>
                <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0"></stop>
            </linearGradient>
        </defs>
        <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z" fill="url(#paint0_linear_chart)"></path>
        <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="hsl(var(--primary))" strokeLinecap="round" strokeWidth="3"></path>
    </svg>
);


export function ProgressOverTime() {
  return (
    <section>
      <h2 className="px-2 pb-4 text-2xl font-bold leading-tight tracking-tight text-foreground">Progresso ao Longo do Tempo</h2>
      <Card className="p-6 rounded-2xl shadow-sm">
        <p className="mb-4 text-base font-medium leading-normal text-card-foreground">Progresso Semanal</p>
        <div className="flex flex-1 flex-col gap-8">
            <PerformanceChart />
            <div className="flex justify-between">
                <p className="text-xs font-medium text-muted-foreground">Sem 1</p>
                <p className="text-xs font-medium text-muted-foreground">Sem 2</p>
                <p className="text-xs font-medium text-muted-foreground">Sem 3</p>
                <p className="text-xs font-medium text-muted-foreground">Sem 4</p>
            </div>
        </div>
      </Card>
    </section>
  );
}