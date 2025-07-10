'use client';

import { ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BottomNav from '@/components/bottom-nav';
import Link from 'next/link';
import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';

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
    <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            
            {/* Header para Mobile */}
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/80 p-4 backdrop-blur-sm md:hidden">
                <Button asChild variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                <Link href="/">
                    <ArrowLeft />
                    <span className="sr-only">Voltar</span>
                </Link>
                </Button>
                <h1 className="text-lg font-bold text-card-foreground">Metas de Estudo</h1>
                <div className="size-10"></div>
            </header>

            {/* Header para Desktop */}
            <div className="hidden md:block">
                <DesktopHeader title="Metas de Estudo" />
            </div>

            <main className="flex-grow p-4 md:p-10">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
                    
                    {/* Coluna Esquerda */}
                    <div className="space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground">Metas Semanais</h2>
                            {weeklyGoals.map((goal) => (
                                <Card key={goal.title} className="flex items-center justify-between gap-4 rounded-xl p-4 shadow-sm bg-card">
                                    <div>
                                        <p className="font-medium text-card-foreground">{goal.title}</p>
                                        <p className="text-sm text-muted-foreground">{goal.value}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-full text-muted-foreground">
                                        <Pencil className="size-5" />
                                    </Button>
                                </Card>
                            ))}
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground">Metas Diárias</h2>
                            <div className="space-y-3">
                                {dailyGoals.map((goal) => (
                                    <Card key={goal.title} className="flex items-center justify-between gap-4 rounded-xl p-4 shadow-sm bg-card">
                                        <div>
                                        <p className="font-medium text-card-foreground">{goal.title}</p>
                                        <p className="text-sm text-muted-foreground">{goal.value}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-full text-muted-foreground">
                                            <Pencil className="size-5" />
                                        </Button>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Coluna Direita */}
                    <div className="space-y-8 flex flex-col">
                        <div className="flex-grow">
                            <section className="space-y-4">
                                <h2 className="text-xl font-bold text-foreground">Metas Adicionais</h2>
                                <div className="space-y-3">
                                    {additionalGoals.map((goal) => (
                                    <Card key={goal.title} className="flex items-center justify-between gap-4 rounded-xl p-4 shadow-sm bg-card">
                                        <div>
                                        <p className="font-medium text-card-foreground">{goal.title}</p>
                                        <p className="text-sm text-muted-foreground">{goal.value}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-full text-muted-foreground">
                                            <Pencil className="size-5" />
                                        </Button>
                                    </Card>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-4 mt-8">
                                <h2 className="text-xl font-bold text-foreground">Preferências</h2>
                                <Card className="divide-y rounded-xl shadow-sm bg-card">
                                    {preferences.map((pref) => (
                                    <div key={pref.title} className="flex items-center justify-between gap-4 p-4">
                                        <div>
                                        <p className="font-medium text-card-foreground">{pref.title}</p>
                                        <p className="text-sm text-muted-foreground">{pref.value}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-full text-muted-foreground">
                                            <Pencil className="size-5" />
                                        </Button>
                                    </div>
                                    ))}
                                </Card>
                            </section>
                        </div>

                         {/* --- RODAPÉ COM BOTÃO DENTRO DA COLUNA DIREITA --- */}
                        <footer className="mt-8 flex justify-end">
                            <Button size="lg" className="h-12 w-full text-base font-bold shadow-lg md:w-auto">
                                Editar Plano de Estudo
                            </Button>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
        
        <div className="md:hidden">
            <BottomNav />
        </div>
    </div>
  );
}