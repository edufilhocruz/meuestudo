import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

export default function ProfileSection() {
  return (
    <section className="flex items-center gap-4">
      <div className="relative size-24 shrink-0">
        <Image
          alt="Foto de perfil de Ana Silva"
          className="size-full rounded-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbXsqAcm0JJ19GJrBMTjXojz2pbTIFBTTCD5vgkxvUOaG4m0_gYLdPYW-kkVhB0xsnz4Y3woiZwjgvTB6stKVy_Z_iVacg-5p_PkfG65eo9NcBv_Dez3LVK16XQlS1tAl5tuJVSpUYDaExYL0omIyQR7XdxpEMc9JhHGeD8m0bQ57-WK8UOLsBwa70xA-5r-uUWmrMAiovMjKcEw-nA989dYd6pMzkezzZwSd1s4iZiEkQlnKKzVI5-ybfK4X8ZHQMN6P1qOCj2e4"
          width={96}
          height={96}
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-0 right-0 size-8 rounded-full border-2 border-background"
        >
          <Camera className="size-4" />
          <span className="sr-only">Editar foto de perfil</span>
        </Button>
      </div>
      <div className="flex-1 space-y-2">
        <h2 className="text-2xl font-bold">Ana Silva</h2>
        <div>
          <p className="text-sm text-muted-foreground">
            Nível 5 - <span className="font-semibold text-foreground/80">1200/1500 XP</span>
          </p>
          <Progress value={(1200 / 1500) * 100} className="mt-1 h-2" />
        </div>
      </div>
    </section>
  );
}
