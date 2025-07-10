'use client';

import { ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BottomNav from '@/components/bottom-nav';
import Link from 'next/link';

const weeklyGoals = [{ title: 'Horas de estudo por semana', value: '10 horas' }];

const dailyGoals = [
  { title: 'Tempo de estudo por dia', value: '2 horas' },
  { title: 'Questões por dia', value: '50 questões' },
];

const additionalGoals = [
  { title: 'Redações por semana', value: '2 redações' },
  { title: 'Simulados por mês', value: '1 simulado' },
];

const preferences = [
    { title: 'Notificações', value: 'Ativadas' },
    { title: 'Rastreamento de Desempenho', value: 'Ativado' },
];

export default function Meta() {
  return (
    <div className="relative flex min-h-screen flex-col bg-secondary">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/80 p-4 backdrop-blur-sm">
        <Button asChild variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
          <Link href="/">
            <ArrowLeft />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="text-lg font-bold text-card-foreground">Metas de Estudo</h1>
        <div className="size-10"></div>
      </header>

      <main className="flex-grow space-y-6 p-6 pb-24">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Metas Semanais</h2>
          {weeklyGoals.map((goal) => (
            <Card key={goal.title} className="flex items-center justify-between gap-4 rounded-xl p-4 shadow-sm">
              <div>
                <p className="font-medium text-card-foreground">{goal.title}</p>
                <p className="text-sm text-muted-foreground">{goal.value}</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-full text-muted-foreground">
                <Pencil className="size-5" />
                <span className="sr-only">Editar meta</span>
              </Button>
            </Card>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Metas Diárias</h2>
          <div className="space-y-3">
            {dailyGoals.map((goal) => (
              <Card key={goal.title} className="flex items-center justify-between gap-4 rounded-xl p-4 shadow-sm">
                <div>
                  <p className="font-medium text-card-foreground">{goal.title}</p>
                  <p className="text-sm text-muted-foreground">{goal.value}</p>
                </div>
                <Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-full text-muted-foreground">
                    <Pencil className="size-5" />
                    <span className="sr-only">Editar meta</span>
                </Button>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Metas Adicionais</h2>
          <div className="space-y-3">
            {additionalGoals.map((goal) => (
              <Card key={goal.title} className="flex items-center justify-between gap-4 rounded-xl p-4 shadow-sm">
                <div>
                  <p className="font-medium text-card-foreground">{goal.title}</p>
                  <p className="text-sm text-muted-foreground">{goal.value}</p>
                </div>
                <Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-full text-muted-foreground">
                    <Pencil className="size-5" />
                    <span className="sr-only">Editar meta</span>
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Preferências</h2>
          <Card className="divide-y rounded-xl shadow-sm">
            {preferences.map((pref) => (
              <div key={pref.title} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-card-foreground">{pref.title}</p>
                  <p className="text-sm text-muted-foreground">{pref.value}</p>
                </div>
                <Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-full text-muted-foreground">
                    <Pencil className="size-5" />
                    <span className="sr-only">Editar preferência</span>
                </Button>
              </div>
            ))}
          </Card>
        </section>
      </main>

      <footer className="sticky bottom-0 bg-card/80 p-4 backdrop-blur-sm">
        <Button size="lg" className="h-12 w-full text-base font-bold shadow-lg">
          Editar Plano de Estudo
        </Button>
      </footer>
      <div className="pb-16"></div>
      <BottomNav />
    </div>
  );
}
