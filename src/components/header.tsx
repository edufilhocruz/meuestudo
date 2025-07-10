import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="flex items-center p-4">
      <Button variant="ghost" size="icon" className="size-10 shrink-0 rounded-full text-muted-foreground">
        <ArrowLeft className="size-6" />
        <span className="sr-only">Voltar</span>
      </Button>
      <h1 className="flex-1 text-center text-xl font-bold">Progresso de Estudo</h1>
      <div className="size-10 shrink-0"></div>
    </header>
  );
}
