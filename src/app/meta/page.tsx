'use client';

import { Button } from '@/components/ui/button';
import BottomNav from '@/components/bottom-nav';
import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';
import { useGoalsManager } from '@/features/goals/hooks/useGoalsManager';
import { GoalSection } from '@/features/goals/components/GoalSection';
import { EditGoalDialog } from '@/features/goals/components/EditGoalDialog';
import { useState } from 'react';

export default function MetaPage() {
  const { goals, dialogState, handleEditClick } = useGoalsManager();

  // Estados controlados
  const [score, setScore] = useState(25);
  const [performance, setPerformance] = useState([
    { subject: 'Português', score: 50, color: 'text-gray-900' },
    { subject: 'Matemática', score: 0, color: 'text-destructive' },
    { subject: 'Conhecimentos Gerais', score: 25, color: 'text-gray-900' },
  ]);

  function handleRefazer() {
    setScore(0);
    setPerformance([
      { subject: 'Português', score: 0, color: 'text-gray-900' },
      { subject: 'Matemática', score: 0, color: 'text-destructive' },
      { subject: 'Conhecimentos Gerais', score: 0, color: 'text-gray-900' },
    ]);
    // Limpe outros estados relacionados ao simulado aqui
  }

  return (
    <>
      <EditGoalDialog {...dialogState} />
      
      <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col">
              <DesktopHeader title="Metas de Estudo" />
              {/* Header Mobile pode ser adicionado aqui se necessário */}
              
              <main className="flex-grow p-4 md:p-10">
                  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
                      {/* Coluna Esquerda */}
                      <div className="space-y-8">
                          <GoalSection title="Metas Semanais" goals={goals.weeklyGoals} onEditGoal={handleEditClick} />
                          <GoalSection title="Metas Diárias" goals={goals.dailyGoals} onEditGoal={handleEditClick} />
                      </div>

                      {/* Coluna Direita */}
                      <div className="space-y-8 flex flex-col">
                           <div className="flex-grow space-y-8">
                                <GoalSection title="Metas Adicionais" goals={goals.additionalGoals} onEditGoal={handleEditClick} />
                                <GoalSection title="Preferências" goals={goals.preferences} onEditGoal={handleEditClick} />
                           </div>
                           <footer className="bg-card shadow-[0_-2px_4px_rgba(0,0,0,0.05)] pb-20 md:pb-0">
                                <div className="flex gap-3 p-4 max-w-md mx-auto">
                                    <Button variant="secondary" size="lg" className="h-12 flex-1 text-base font-bold text-foreground">Ver Gabarito</Button>
                                    <Button size="lg" className="h-12 flex-1 text-base font-bold" onClick={handleRefazer}>Refazer</Button>
                                </div>
                            </footer>
                      </div>
                  </div>
              </main>
          </div>
          
          <div className="md:hidden">
            <BottomNav />
          </div>
      </div>
    </>
  );
}