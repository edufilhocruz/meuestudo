'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import BottomNav from '@/components/bottom-nav';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const dailyProgress = [
  { day: 'S', value: 40, isToday: false },
  { day: 'T', value: 60, isToday: false },
  { day: 'Q', value: 10, isToday: false },
  { day: 'Q', value: 80, isToday: true },
  { day: 'S', value: 70, isToday: false },
  { day: 'S', value: 10, isToday: false },
  { day: 'D', value: 10, isToday: false },
];

const weeklyProgress = [
  { week: 'S', value: 30 },
  { week: 'S', value: 20 },
  { week: 'S', value: 70 },
  { week: 'S', value: 50 },
  { week: 'S', value: 60 },
  { week: 'S', value: 100 },
  { week: 'S', value: 30 },
];

const achievements = [
    {
        image: 'https://placehold.co/400x400.png',
        'data-ai-hint': 'study badge',
        label: '100 dias de estudo',
    },
    {
        image: 'https://placehold.co/400x400.png',
        'data-ai-hint': 'trophy xp',
        label: '1000 XP',
    },
]

export default function Perfil() {
  return (
    <div className="relative flex min-h-screen flex-col bg-secondary">
      <header className="sticky top-0 z-10 flex items-center border-b bg-card p-4">
        <Button asChild variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
          <Link href="/">
            <ArrowLeft />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="flex-1 text-center text-xl font-bold text-card-foreground">Perfil</h1>
        <div className="w-10 shrink-0" />
      </header>

      <main className="flex-grow pb-28">
        <div className="bg-card pb-4">
          <div className="flex flex-col items-center p-6 pt-4">
            <div className="relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbXsqAcm0JJ19GJrBMTjXojz2pbTIFBTTCD5vgkxvUOaG4m0_gYLdPYW-kkVhB0xsnz4Y3woiZwjgvTB6stKVy_Z_iVacg-5p_PkfG65eo9NcBv_Dez3LVK16XQlS1tAl5tuJVSpUYDaExYL0omIyQR7XdxpEMc9JhHGeD8m0bQ57-WK8UOLsBwa70xA-5r-uUWmrMAiovMjKcEw-nA989dYd6pMzkezzZwSd1s4iZiEkQlnKKzVI5-ybfK4X8ZHQMN6P1qOCj2e4"
                alt="Foto de perfil de Beatriz"
                width={128}
                height={128}
                className="size-32 rounded-full border-4 border-card object-cover shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-full border-4 border-card bg-primary font-bold text-sm text-primary-foreground">
                10
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold tracking-tight text-card-foreground">Beatriz</p>
              <p className="text-base text-muted-foreground">1000 XP</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-card-foreground">Próximo nível</p>
              <p className="text-sm text-muted-foreground">750/1000 XP</p>
            </div>
            <Progress value={75} className="h-2.5" />
          </div>
        </div>

        <div className="p-4">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">Progresso</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-medium">XP Diário</CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">Hoje</Badge>
                </div>
                <p className="pt-2 text-4xl font-bold tracking-tight text-primary">
                  150 <span className="text-2xl font-medium text-muted-foreground">XP</span>
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid h-[120px] grid-flow-col items-end justify-items-center gap-3 pt-4">
                  {dailyProgress.map((item, index) => (
                    <div key={index} className="flex h-full w-full flex-col items-center justify-end gap-1">
                      <div
                        className={`w-full rounded-md ${item.isToday ? 'bg-primary' : 'bg-secondary'}`}
                        style={{ height: `${item.value}%` }}
                      />
                      <p className={`text-xs ${item.isToday ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'}`}>
                        {item.day}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-medium">XP Semanal</CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">Esta semana</Badge>
                </div>
                <p className="pt-2 text-4xl font-bold tracking-tight text-primary">
                  750 <span className="text-2xl font-medium text-muted-foreground">XP</span>
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid h-[120px] grid-flow-col items-end justify-items-center gap-3 pt-4">
                  {weeklyProgress.map((item, index) => (
                     <div key={index} className="flex h-full w-full flex-col items-center justify-end gap-1">
                        <div
                            className="w-full rounded-md bg-secondary"
                            style={{ height: `${item.value}%` }}
                        />
                        <p className="text-xs font-medium text-muted-foreground">{item.week}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="p-4">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">Conquistas</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex flex-col items-center gap-2 text-center">
                <Image
                  src={achievement.image}
                  alt={achievement.label}
                  data-ai-hint={achievement['data-ai-hint']}
                  width={400}
                  height={400}
                  className="aspect-square w-full rounded-xl object-cover shadow-sm"
                />
                <p className="text-sm font-medium leading-snug text-foreground">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
