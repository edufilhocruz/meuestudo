import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import BottomNav from '@/components/bottom-nav';
import { cn } from '@/lib/utils'; // Importar a função 'cn'

export const metadata: Metadata = {
  title: 'Meu Estudo',
  description: 'Acompanhe seu progresso de estudo com IA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      {/* ALTERAÇÕES IMPORTANTES:
        - `h-full`: Garante que o body ocupe 100% da altura.
        - `overflow-x-hidden`: Previne a rolagem horizontal a nível global.
      */}
      <body className={cn("h-full font-body antialiased overflow-x-hidden", "bg-background text-foreground")}>
        {children}
        <Toaster />
        <div className="md:hidden">
          <BottomNav />
        </div>
      </body>
    </html>
  );
}