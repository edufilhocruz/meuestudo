'use client';

import Link from 'next/link';
import { Home, Clock, Target, BarChart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/home', icon: Home, label: 'Início' },
  { href: '/foco', icon: Clock, label: 'Foco' },
  { href: '/meta', icon: Target, label: 'Meta' },
  { href: '/analise', icon: BarChart, label: 'Análise' },
  { href: '/perfil', icon: User, label: 'Perfil' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 z-10 w-full">
      <div className="flex justify-around border-t bg-background/80 px-2 py-2 backdrop-blur-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/home' && pathname === '/');
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-end gap-1 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary',
                isActive && 'bg-primary/10 text-primary'
              )}
            >
              <div className="flex h-6 items-center justify-center">
                <item.icon className="size-6" />
              </div>
              <p className={cn(
                'text-xs tracking-wide',
                isActive ? 'font-bold' : 'font-medium'
              )}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
