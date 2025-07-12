'use client';

import { Button } from '@/components/ui/button';
import BottomNav from '@/components/bottom-nav';
import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';
import { useGoalsManager } from '@/features/goals/hooks/useGoalsManager';
import { GoalSection } from '@/features/goals/components/GoalSection';
import { EditGoalDialog } from '@/features/goals/components/EditGoalDialog';

export default function MetaPage() {
  const { goals, dialogState, handleEditClick } = useGoalsManager();

  return (
    <>
      <EditGoalDialog {...dialogState} />
      
      <div className="flex min-h-screen bg-background text-foreground">
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
                           <footer className="mt-auto flex justify-end pb-20 md:pb-0">
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
    </>
  );
}