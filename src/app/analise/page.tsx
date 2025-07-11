'use client';

import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';
import BottomNav from '@/components/bottom-nav';
import { useAnalysisData } from '@/features/analysis/hooks/useAnalysisData';
import AiRecommendation from '@/components/ai-recommendation'; // Reutilizamos este componente
import { DataCard } from '@/features/analysis/components/DataCard';
import { SubjectPerformance } from '@/features/analysis/components/SubjectPerformance';
import { TopicInsights } from '@/features/analysis/components/TopicInsights';
import { GoalProgress } from '@/features/analysis/components/GoalProgress';
import { ProgressOverTime } from '@/features/analysis/components/ProgressOverTime';

export default function AnalisePage() {
    const { subjects, generalStats, topicInsights, goalProgress } = useAnalysisData();

    return (
        <>
            <div className="flex min-h-screen bg-background text-foreground">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <div className="hidden md:block"><DesktopHeader title="Análise de Desempenho" /></div>
                    <main className="flex-grow p-4 pb-28 md:p-10 md:pb-10">
                        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 md:gap-8">
                            
                            {/* Coluna Esquerda */}
                            <div className="space-y-8">
                                <section>
                                    <h2 className="px-2 pb-4 text-2xl font-bold">Desempenho Geral</h2>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {generalStats.map(stat => <DataCard key={stat.label} {...stat} />)}
                                    </div>
                                </section>
                                <section>
                                    <h2 className="px-2 pb-4 text-2xl font-bold">Análise por Disciplina</h2>
                                    <SubjectPerformance subjects={subjects} />
                                </section>
                                <TopicInsights strengths={topicInsights.strengths} weaknesses={topicInsights.weaknesses} />
                            </div>
                            
                            {/* Coluna Direita */}
                            <div className="space-y-8 mt-8 md:mt-0">
                                <section>
                                    <h2 className="px-2 pb-4 text-2xl font-bold">Recomendações da IA</h2>
                                    <AiRecommendation performanceData={subjects} />
                                </section>
                                <GoalProgress label={goalProgress.label} value={goalProgress.value} />
                                <ProgressOverTime />
                            </div>
                        </div>
                    </main>
                </div>
                <div className="md:hidden"><BottomNav /></div>
            </div>
        </>
    );
}