'use client';

import Header from '@/components/header';
import ProfileSection from '@/components/profile-section';
import StatsSection from '@/components/stats-section';
import WeeklyProgress from '@/components/weekly-progress';
import ActionButtons from '@/components/action-buttons';
import AiNotificationSection from '@/components/ai-notification-section';
import BottomNav from '@/components/bottom-nav';

export default function HomePage() {
  return (
    <div className="bg-background text-foreground font-body">
      <div className="relative mx-auto flex max-w-md min-h-screen flex-col">
        <div className="flex flex-col gap-4 pb-24">
          <Header />
          <main className="flex flex-col gap-8 px-4">
            <ProfileSection />
            <AiNotificationSection />
            <StatsSection />
            <WeeklyProgress />
            <ActionButtons />
          </main>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
