'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

// Tipos para os dados do perfil
export interface ProfileData {
  personal: { name: string; email: string; birthDate: string; };
  account: { device: string; lastLogin: string; status: string; };
  subscription: { status: string; plan: string; nextBilling: string; paymentMethod: string; };
  academic: { goal: string; };
  stats: { xp: number; level: number; xpToNextLevel: number; };
}

const initialProfile: ProfileData = {
    personal: { name: 'João da Silva', email: 'user@email.com', birthDate: '15/02/1997' },
    account: { device: 'macOS, Chrome', lastLogin: '10/07/2025 às 16:45', status: 'Ativa / Verificada' },
    subscription: { status: 'Ativa', plan: 'Premium Anual', nextBilling: '15/07/2026', paymentMethod: 'Mastercard •••• 1234' },
    academic: { goal: 'Concurso para Polícia Federal' },
    stats: { xp: 1250, level: 11, xpToNextLevel: 2000 }
};

export function useProfileManager() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<keyof ProfileData | null>(null);
  const { toast } = useToast();

  const handleEditClick = useCallback((section: keyof ProfileData) => {
    setEditingSection(section);
    setIsEditDialogOpen(true);
  }, []);

  const handleSaveChanges = useCallback((section: keyof ProfileData, newData: Partial<ProfileData[keyof ProfileData]>) => {
    setProfile(currentProfile => ({
      ...currentProfile,
      [section]: {
        ...currentProfile[section],
        ...newData,
      }
    }));
    toast({ title: "Dados Atualizados!", description: `Suas informações de "${section}" foram salvas.` });
    setIsEditDialogOpen(false);
  }, [toast]);

  return {
    profile,
    dialogState: {
      isOpen: isEditDialogOpen,
      section: editingSection,
      data: editingSection ? profile[editingSection] : null,
      onOpenChange: setIsEditDialogOpen,
      onSave: handleSaveChanges,
    },
    handleEditClick,
  };
}