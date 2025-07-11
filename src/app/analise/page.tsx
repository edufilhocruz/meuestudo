'use client';

import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';
import BottomNav from '@/components/bottom-nav';
import { useAnalysisData } from '@/features/analysis/hooks/useAnalysisData';
import AiRecommendation from '@/components/ai-recommendation';
import { GeneralStats } from '@/features/analysis/components/GeneralStats';
import { SubjectPerformance } from '@/features/analysis/components/SubjectPerformance';
import { TopicInsights } from '@/features/analysis/components/TopicInsights';
import { ProgressOverTime } from '@/features/analysis/components/ProgressOverTime';
import { GoalProgress } from '@/features/analysis/components/GoalProgress';


export default function AnalisePage() {
    const { subjects, generalStats, topicInsights, goalProgress } = useAnalysisData();

    return (
        <>
            <div className="flex min-h-screen bg-background text-foreground">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-x-hidden">
                    <div className="hidden md:block"><DesktopHeader title="Análise de Desempenho" /></div>
                    <main className="flex-grow p-4 pb-28 md:p-10 md:pb-10">
                        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            
                            {/* Coluna 1 */}
                            <div className="space-y-8 lg:col-span-1">
                                <GeneralStats stats={generalStats} />
                                <TopicInsights strengths={topicInsights.strengths} weaknesses={topicInsights.weaknesses} />
                            </div>
                            
                            {/* Coluna 2 */}
                            <div className="space-y-8 lg:col-span-1">
                                <section>
                                    <h2 className="px-2 pb-4 text-2xl font-bold">Recomendação da IA</h2>
                                    <AiRecommendation performanceData={subjects} />
                                </section>
                                <GoalProgress label={goalProgress.label} value={goalProgress.value} />
                            </div>

                            {/* Coluna 3 */}
                            <div className="space-y-8 lg:col-span-1">
                                <SubjectPerformance subjects={subjects} />
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