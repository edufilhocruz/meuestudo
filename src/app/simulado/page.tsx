'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AiRecommendation from '@/components/ai-recommendation';
// IMPORTAÇÕES ADICIONADAS
import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';
import BottomNav from '@/components/bottom-nav';


const performanceBySubject = [
  { subject: 'Português', score: 50, color: 'text-gray-900' },
  { subject: 'Matemática', score: 0, color: 'text-destructive' },
  { subject: 'Conhecimentos Gerais', score: 25, color: 'text-gray-900' },
];

const performanceComparison = [
    { label: 'Seu desempenho', score: '25%' },
    { label: 'Média dos seus simulados', score: '30%' },
    { label: 'Média dos outros usuários', score: '20%' },
];

export default function SimuladoPage() {
  const score = 25;

  return (
    // ESTRUTURA PRINCIPAL ATUALIZADA
    <>
      <div className="flex min-h-screen bg-background text-foreground font-body">
        <Sidebar />
        <div className="flex-1 flex flex-col">

          {/* Header para Mobile */}
          <header className="sticky top-0 z-10 w-full border-b bg-card md:hidden">
            <div className="flex items-center p-4">
                <Button asChild variant="ghost" size="icon" className="size-10 shrink-0 rounded-full text-muted-foreground">
                    <Link href="/">
                        <ArrowLeft className="size-6" />
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
              <h1 className="flex-1 text-center text-xl font-bold">Simulado</h1>
              <div className="w-10 shrink-0"></div>
            </div>
            <div className="px-4 pb-4">
              <div className="mb-1 flex justify-between">
                <p className="text-sm font-medium text-muted-foreground">Questão 1 de 4</p>
                <p className="text-sm font-medium text-muted-foreground">25%</p>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </header>

          {/* Header para Desktop */}
           <div className="hidden md:block">
              <DesktopHeader title="Simulado" />
          </div>

          {/* Conteúdo da Página */}
          <main className="flex-grow p-4 pb-20 md:p-10 md:pb-10">
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Todas as seções de conteúdo do simulado permanecem aqui... */}
              <section>
                <h2 className="mb-4 text-xl font-bold">Seu Resultado</h2>
                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-4xl font-bold tracking-tight text-card-foreground">{score}%</p>
                            <p className={cn("text-lg font-semibold", score >= 50 ? 'text-green-600' : 'text-destructive' )}>
                                {score >= 50 ? 'Aprovado' : 'Reprovado'}
                            </p>
                        </div>
                        <div className="size-24">
                            <svg className="size-full" viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--primary))" strokeDasharray={`${score}, 100`} strokeLinecap="round" strokeWidth="3" className="transition-all" />
                            </svg>
                        </div>
                    </CardContent>
                </Card>
              </section>

              <section>
                <h3 className="mb-3 text-lg font-bold">Desempenho por Matéria</h3>
                <Card>
                  <CardContent className="divide-y p-0">
                    {performanceBySubject.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4">
                            <p className="font-medium text-muted-foreground">{item.subject}</p>
                            <p className={cn("font-semibold", item.color)}>{item.score}%</p>
                        </div>
                    ))}
                  </CardContent>
                </Card>
              </section>

              <section>
                <h3 className="mb-3 text-lg font-bold">Recomendação da IA</h3>
                <AiRecommendation performanceData={performanceBySubject} />
              </section>

              <section>
                <h3 className="mb-3 text-lg font-bold">Comparativo de Desempenho</h3>
                <Card>
                  <CardContent className="divide-y p-0">
                    {performanceComparison.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4">
                            <p className="font-medium text-muted-foreground">{item.label}</p>
                            <p className="font-semibold text-card-foreground">{item.score}</p>
                        </div>
                    ))}
                  </CardContent>
                </Card>
              </section>
            </div>
          </main>
        </div>
      </div>
      
      {/* RODAPÉ FINAL */}
      <footer className="bg-card shadow-[0_-2px_4px_rgba(0,0,0,0.05)] pb-20 md:pb-0">
        <div className="flex gap-3 p-4 max-w-md mx-auto">
          <Button variant="secondary" size="lg" className="h-12 flex-1 text-base font-bold text-foreground">Ver Gabarito</Button>
          <Button size="lg" className="h-12 flex-1 text-base font-bold">Refazer</Button>
        </div>
      </footer>
       <div className="md:hidden">
          <BottomNav />
        </div>
    </>
  );
}