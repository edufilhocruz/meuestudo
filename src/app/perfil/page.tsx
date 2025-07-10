'use client';

import { ArrowLeft, Pencil, MessageSquare, Mail, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import BottomNav from '@/components/bottom-nav';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';

// --- DADOS FICTÍCIOS PARA VISUALIZAÇÃO ---
const userProfile = {
    personal: {
        name: 'João da Silva',
        email: 'user@email.com',
        birthDate: '15/02/1997',
    },
    account: {
        device: 'macOS, Chrome',
        lastLogin: '10/07/2025 às 16:45',
        status: 'Ativa / Verificada',
    },
    subscription: {
        status: 'Ativa',
        plan: 'Premium Anual',
        nextBilling: '15/07/2026',
        paymentMethod: 'Mastercard •••• 1234',
    },
    academic: {
        goal: 'Concurso para Polícia Federal',
    },
    support: {
        mainChannel: 'Chat ao vivo',
        responseTime: 'Menos de 5 minutos',
        faqLink: '/faq',
    },
    stats: {
        xp: 1250,
        level: 11,
        xpToNextLevel: 2000,
    }
};

const achievements = [
    { image: 'https://placehold.co/400x400.png', label: '100 dias de estudo' },
    { image: 'https://placehold.co/400x400.png', label: '1000 XP' },
    { image: 'https://placehold.co/400x400.png', label: 'Rei da Matemática' },
];

const InfoRow = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="flex justify-between items-center text-sm">
        <p className="font-medium text-muted-foreground">{label}</p>
        <p className="font-semibold text-card-foreground text-right">{value}</p>
    </div>
);

export default function Perfil() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header para Mobile */}
        <header className="sticky top-0 z-10 flex items-center border-b bg-card p-4 md:hidden">
          <Button asChild variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
            <Link href="/"><ArrowLeft /><span className="sr-only">Voltar</span></Link>
          </Button>
          <h1 className="flex-1 text-center text-xl font-bold text-card-foreground">Perfil</h1>
          <div className="w-10 shrink-0" />
        </header>

        {/* Header para Desktop */}
        <div className="hidden md:block">
            <DesktopHeader title="Meu Perfil" />
        </div>

        <main className="flex-grow p-4 pb-28 md:p-10 md:pb-10">
            <div className="mx-auto max-w-7xl">
                {/* --- Seção Principal do Perfil --- */}
                <Card className="shadow-sm mb-8">
                    <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbXsqAcm0JJ19GJrBMTjXojz2pbTIFBTTCD5vgkxvUOaG4m0_gYLdPYW-kkVhB0xsnz4Y3woiZwjgvTB6stKVy_Z_iVacg-5p_PkfG65eo9NcBv_Dez3LVK16XQlS1tAl5tuJVSpUYDaExYL0omIyQR7XdxpEMc9JhHGeD8m0bQ57-WK8UOLsBwa70xA-5r-uUWmrMAiovMjKcEw-nA989dYd6pMzkezzZwSd1s4iZiEkQlnKKzVI5-ybfK4X8ZHQMN6P1qOCj2e4" alt="Foto de perfil" width={128} height={128}
                                className="size-32 rounded-full border-4 border-background object-cover" />
                            <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-full border-4 border-card bg-primary font-bold text-sm text-primary-foreground">
                                {userProfile.stats.level}
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold tracking-tight text-card-foreground">{userProfile.personal.name}</h2>
                            <p className="text-base text-muted-foreground">{userProfile.stats.xp} XP</p>
                            <div className="mt-4">
                                <Progress value={(userProfile.stats.xp / userProfile.stats.xpToNextLevel) * 100} className="h-2.5" />
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs font-medium text-muted-foreground">Próximo nível</p>
                                    <p className="text-xs font-semibold text-card-foreground">{userProfile.stats.xp}/{userProfile.stats.xpToNextLevel} XP</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* --- Grid de Detalhes com 3 colunas --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Coluna 1: Dados da Conta e Objetivo */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Dados da Conta</CardTitle>
                                <Button variant="ghost" size="icon" className="size-8 shrink-0 text-muted-foreground"><Pencil className="size-4" /></Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <InfoRow label="Nome" value={userProfile.personal.name} />
                                <InfoRow label="E-mail" value={userProfile.personal.email} />
                                <InfoRow label="Nascimento" value={userProfile.personal.birthDate} />
                                <InfoRow label="Dispositivo" value={userProfile.account.device} />
                                <InfoRow label="Último Login" value={userProfile.account.lastLogin} />
                                <InfoRow label="Status da Conta" value={userProfile.account.status} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Meu Objetivo</CardTitle>
                                <Button variant="ghost" size="icon" className="size-8 shrink-0 text-muted-foreground"><Pencil className="size-4" /></Button>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold text-primary">{userProfile.academic.goal}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Coluna 2: Assinatura e Suporte */}
                    <div className="space-y-8">
                         <Card>
                            <CardHeader>
                                <CardTitle>Assinatura e Pagamento</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <InfoRow label="Status" value={userProfile.subscription.status} />
                                <InfoRow label="Plano Atual" value={userProfile.subscription.plan} />
                                <InfoRow label="Próxima Cobrança" value={userProfile.subscription.nextBilling} />
                                <InfoRow label="Forma de Pagamento" value={userProfile.subscription.paymentMethod} />
                            </CardContent>
                        </Card>
                        {/* NOVO CARD: SUPORTE E AJUDA */}
                        <Card>
                            <CardHeader><CardTitle>Suporte e Ajuda</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">Estamos aqui para te ajudar sempre que precisar!</p>
                                <InfoRow label="Canal Principal" value={userProfile.support.mainChannel} />
                                <InfoRow label="Tempo de Resposta" value={userProfile.support.responseTime} />
                                <div className="space-y-2 pt-2">
                                    <Button className="w-full">
                                        <MessageSquare className="mr-2 size-4"/> Falar com o Suporte
                                    </Button>
                                    <Button variant="secondary" className="w-full">
                                        <Mail className="mr-2 size-4"/> Abrir Chamado
                                    </Button>
                                    <Button variant="link" className="w-full" asChild>
                                        <Link href={userProfile.support.faqLink}>
                                            <HelpCircle className="mr-2 size-4"/> Ver Perguntas Frequentes (FAQ)
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Coluna 3: Conquistas */}
                    <div className="space-y-8">
                         <section>
                            <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">Conquistas</h2>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
                                {achievements.map((achievement, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 text-center">
                                    <Image
                                        src={achievement.image} alt={achievement.label} width={400} height={400}
                                        className="aspect-square w-full rounded-xl object-cover shadow-sm" />
                                    <p className="text-sm font-medium leading-snug text-foreground">{achievement.label}</p>
                                </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
      </div>
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}