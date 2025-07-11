import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

interface ProfileHeaderCardProps {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export function ProfileHeaderCard({ name, level, xp, xpToNextLevel }: ProfileHeaderCardProps) {
  return (
    <Card className="shadow-sm mb-8">
      <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbXsqAcm0JJ19GJrBMTjXojz2pbTIFBTTCD5vgkxvUOaG4m0_gYLdPYW-kkVhB0xsnz4Y3woiZwjgvTB6stKVy_Z_iVacg-5p_PkfG65eo9NcBv_Dez3LVK16XQlS1tAl5tuJVSpUYDaExYL0omIyQR7XdxpEMc9JhHGeD8m0bQ57-WK8UOLsBwa70xA-5r-uUWmrMAiovMjKcEw-nA989dYd6pMzkezzZwSd1s4iZiEkQlnKKzVI5-ybfK4X8ZHQMN6P1qOCj2e4" alt="Foto de perfil" width={128} height={128} className="size-32 rounded-full border-4 border-background object-cover" />
          <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-full border-4 border-card bg-primary font-bold text-sm text-primary-foreground">{level}</div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">{name}</h2>
          <p className="text-base text-muted-foreground">{xp} XP</p>
          <div className="mt-4">
            <Progress value={(xp / xpToNextLevel) * 100} className="h-2.5" />
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs font-medium text-muted-foreground">Próximo nível</p>
              <p className="text-xs font-semibold text-card-foreground">{xp}/{xpToNextLevel} XP</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}