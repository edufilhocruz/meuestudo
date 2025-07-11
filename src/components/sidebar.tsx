'use client';

import Link from 'next/link';
import { Home, Clock, Target, BarChart, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Início' },
  { href: '/foco', icon: Clock, label: 'Foco' },
  { href: '/meta', icon: Target, label: 'Objetivo' },
  { href: '/analise', icon: BarChart, label: 'Desempenho' },
  { href: '/perfil', icon: User, label: 'Perfil' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-col bg-white shadow-lg hidden md:flex">
      {/* O DIV ABAIXO FOI REMOVIDO PARA TIRAR O LOGO E O NOME */}
      {/* <div className="flex items-center justify-center gap-2 p-6 border-b">
        <PieChart className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold">StudySmart</h1>
      </div> 
      */}
      
      {/* A navegação agora começa diretamente aqui */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/home' && pathname === '/');
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-2 rounded-md font-bold transition-colors',
                isActive
                  ? 'bg-secondary text-primary'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-primary'
              )}
            >
              <item.icon className="mr-3 size-6" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}