'use client';

import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';
import BottomNav from '@/components/bottom-nav';
import { useProfileManager } from '@/features/profile/hooks/useProfileManager';
import { ProfileHeaderCard } from '@/features/profile/components/ProfileHeaderCard';
import { ProfileSectionCard } from '@/features/profile/components/ProfileSectionCard';
import { EditProfileDialog } from '@/features/profile/components/EditProfileDialog';

export default function PerfilPage() {
  const { profile, dialogState, handleEditClick } = useProfileManager();

  return (
    <>
      <EditProfileDialog
        isOpen={dialogState.isOpen}
        onOpenChange={dialogState.onOpenChange}
        section={dialogState.section}
        data={dialogState.data}
        onSave={(section, data) => dialogState.onSave(section as any, data)}
      />

      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="hidden md:block"><DesktopHeader title="Meu Perfil" /></div>
          <main className="flex-grow p-4 pb-28 md:p-10 md:pb-10">
            <div className="mx-auto max-w-7xl">
              <ProfileHeaderCard
                name={profile.personal.name}
                level={profile.stats.level}
                xp={profile.stats.xp}
                xpToNextLevel={profile.stats.xpToNextLevel}
              />
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-8">
                  <ProfileSectionCard title="Dados Pessoais" data={profile.personal} onEdit={() => handleEditClick('personal')} />
                  <ProfileSectionCard title="Meu Objetivo" data={profile.academic} onEdit={() => handleEditClick('academic')} />
                </div>
                <div className="space-y-8">
                  <ProfileSectionCard title="Dados da Conta" data={profile.account} onEdit={() => handleEditClick('account')} />
                </div>
                <div className="space-y-8">
                  <ProfileSectionCard title="Assinatura" data={profile.subscription} onEdit={() => handleEditClick('subscription')} />
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="md:hidden"><BottomNav /></div>
      </div>
    </>
  );
}