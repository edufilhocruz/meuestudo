import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ActionButtons() {
  return (
    <section className="flex flex-col gap-3">
      <Button asChild size="lg" className="h-12 w-full text-base font-bold shadow-sm">
        <Link href="/foco">Estudar Agora</Link>
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button asChild variant="secondary" size="lg" className="h-12 w-full text-base font-bold text-foreground shadow-sm">
          <Link href="/simulado">Simulado</Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="h-12 w-full text-base font-bold text-foreground shadow-sm">
          <Link href="/analise">Ver Análise</Link>
        </Button>
      </div>
    </section>
  );
}
