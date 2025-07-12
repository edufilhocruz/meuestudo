'use client';

import Header from '@/components/header';
import ProfileSection from '@/components/profile-section';
import StatsSection from '@/components/stats-section';
import WeeklyProgress from '@/components/weekly-progress';
import ActionButtons from '@/components/action-buttons';
import AiNotificationSection from '@/components/ai-notification-section';
import BottomNav from '@/components/bottom-nav';
import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-secondary text-foreground font-body">
      {/* Sidebar para Desktop */}
      <Sidebar />

      {/* Conteúdo Principal Flexível */}
      <div className="flex-1 flex flex-col">
        
        {/* Header - Visível apenas em mobile */}
        <div className="md:hidden">
          <Header />
        </div>

        {/* Header - Visível apenas em desktop */}
        <div className="hidden md:block">
            <DesktopHeader />
        </div>
        
        {/* Corpo principal */}
        <div className="flex-1 p-4 pb-20 md:p-10 md:pb-10">
          <div className="max-w-4xl mx-auto">
            {/* Componentes compartilhados com estilos responsivos */}
            <ProfileSection />
            <div className="mt-8">
              <AiNotificationSection />
            </div>
            <div className="mt-8">
              <StatsSection />
            </div>
            {/* Componente visível apenas em mobile */}
            <div className="mt-8 md:hidden">
              <WeeklyProgress />
            </div>
            <div className="mt-8">
              <ActionButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Navegação Inferior - Visível apenas em mobile */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}