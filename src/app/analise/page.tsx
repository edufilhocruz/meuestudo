
'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import BottomNav from '@/components/bottom-nav';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';
import AiRecommendation from '@/components/ai-recommendation';

const subjects = [
    { subject: 'Matemática', score: 85, color: 'bg-primary' },
    { subject: 'Português', score: 72, color: 'bg-primary' },
    { subject: 'Ciências', score: 65, color: 'bg-primary' },
    { subject: 'História', score: 40, color: 'bg-red-400' },
];

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

export default function Analise() {
    return (
        <div className="relative flex min-h-screen flex-col bg-secondary">
            <div className="flex flex-col">
                <header className="sticky top-0 z-10 flex items-center justify-between bg-card p-4 shadow-sm">
                    <Button asChild variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                        <Link href="/">
                            <ArrowLeft />
                            <span className="sr-only">Voltar</span>
                        </Link>
                    </Button>
                    <h1 className="flex-1 text-center text-lg font-bold text-card-foreground">Análise de Desempenho</h1>
                    <div className="w-10"></div>
                </header>

                <main className="flex-1 space-y-8 p-4 pb-28">
                    <section>
                        <h2 className="px-2 pb-4 text-2xl font-bold leading-tight tracking-tight text-foreground">Recomendações da IA</h2>
                        <AiRecommendation performanceData={subjects.map(({subject, score}) => ({subject, score}))} />
                    </section>
                    
                    <section>
                        <h2 className="px-2 pb-4 text-2xl font-bold leading-tight tracking-tight text-foreground">Desempenho Geral</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <Card className="flex flex-col gap-2 rounded-2xl p-6 shadow-sm">
                                <p className="text-base font-medium leading-normal text-muted-foreground">Pontuação Média</p>
                                <p className="text-3xl font-bold leading-tight tracking-tight text-card-foreground">78%</p>
                            </Card>
                            <Card className="flex flex-col gap-2 rounded-2xl p-6 shadow-sm">
                                <p className="text-base font-medium leading-normal text-muted-foreground">Taxa de Acerto</p>
                                <p className="text-3xl font-bold leading-tight tracking-tight text-primary">85%</p>
                            </Card>
                            <Card className="flex flex-col gap-2 rounded-2xl p-6 shadow-sm">
                                <p className="text-base font-medium leading-normal text-muted-foreground">Tempo Médio</p>
                                <p className="text-3xl font-bold leading-tight tracking-tight text-card-foreground">25s</p>
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="px-2 pb-4 text-2xl font-bold leading-tight tracking-tight text-foreground">Acompanhamento de Metas</h2>
                        <Card className="p-6 rounded-2xl shadow-sm">
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-base font-medium text-card-foreground">Meta de Estudos</p>
                                <p className="text-sm font-bold text-primary">60%</p>
                            </div>
                            <Progress value={60} className="h-2.5" />
                        </Card>
                    </section>
                    
                    <section>
                        <h2 className="px-2 pb-4 text-2xl font-bold leading-tight tracking-tight text-foreground">Análise por Disciplina</h2>
                        <Card className="p-6 rounded-2xl shadow-sm">
                            <div className="space-y-4">
                                {subjects.map((subject, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <p className="w-24 text-sm font-medium text-muted-foreground">{subject.subject}</p>
                                        <Progress value={subject.score} className="h-3 flex-1" />
                                        <p className="text-sm font-bold text-card-foreground">{subject.score}%</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </section>
                    
                    <section>
                        <h2 className="px-2 pb-4 text-2xl font-bold leading-tight tracking-tight text-foreground">Insights por Tópico</h2>
                        <div className="space-y-4">
                            <Card className="flex items-center gap-4 p-4 rounded-2xl shadow-sm">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500">
                                    <CheckCircle className="size-7" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-base font-semibold leading-normal text-card-foreground">Pontos Fortes</p>
                                    <p className="text-sm font-normal leading-normal text-muted-foreground">Álgebra, Geometria e Análise Combinatória.</p>
                                </div>
                            </Card>
                            <Card className="flex items-center gap-4 p-4 rounded-2xl shadow-sm">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                                    <XCircle className="size-7" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-base font-semibold leading-normal text-card-foreground">Pontos a Melhorar</p>
                                    <p className="text-sm font-normal leading-normal text-muted-foreground">Equações, Probabilidade e Funções.</p>
                                </div>
                            </Card>
                        </div>
                    </section>

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

                </main>
            </div>
            <BottomNav />
        </div>
    );
}

    