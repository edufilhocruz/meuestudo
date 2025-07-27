'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Package, Zap, CheckCircle, Star, RefreshCw } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type?: 'subscription' | 'one-time';
}

interface PaymentSummaryProps {
  items?: CartItem[];
  subtotal?: number;
  total?: number;
}

// Dados mockados para demonstração - SaaS por assinatura
const mockItems: CartItem[] = [
  {
    id: '1',
    name: 'StudySmart Premium',
    price: 29.90,
    quantity: 1,
    type: 'subscription',
  },
  {
    id: '2',
    name: 'Simulados Ilimitados',
    price: 19.90,
    quantity: 1,
    type: 'subscription',
  },
];

const mockSubtotal = 49.80;
const mockTotal = mockSubtotal;

export function PaymentSummary({ 
  items = mockItems, 
  subtotal = mockSubtotal, 
  total = mockTotal
}: PaymentSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="size-5" />
          Resumo da Assinatura
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Lista de Produtos */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
                {item.type === 'subscription' ? (
                  <RefreshCw className="size-6 text-muted-foreground" />
                ) : (
                  <Package className="size-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.type === 'subscription' ? 'Assinatura mensal' : 'Acesso único'}
                </p>
              </div>
              <div className="text-sm font-semibold text-foreground">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Valores */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-lg font-bold">
          <span>Total Mensal</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>

        {/* Informação de Renovação */}
        <div className="rounded-lg bg-blue-50 p-3 space-y-2">
          <p className="text-xs font-medium text-blue-800 flex items-center gap-2">
            <RefreshCw className="size-3" />
            Renovação Automática
          </p>
          <div className="text-xs text-blue-700 space-y-1">
            <div>• Cobrança mensal automática</div>
            <div>• Cancele a qualquer momento</div>
            <div>• Sem taxa de cancelamento</div>
          </div>
        </div>

        {/* Benefícios Destacados */}
        <div className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 p-4 space-y-3">
          <p className="text-sm font-semibold text-primary flex items-center gap-2">
            <Star className="size-4" />
            Benefícios Premium Inclusos
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="size-3 text-green-600" />
              <span>Acesso ilimitado a todos os cursos</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="size-3 text-green-600" />
              <span>Simulados personalizados</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="size-3 text-green-600" />
              <span>Suporte prioritário 24/7</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="size-3 text-green-600" />
              <span>Atualizações automáticas</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="size-3 text-green-600" />
              <span>Comunidade exclusiva</span>
            </div>
          </div>
        </div>

        {/* Comparação de Valor */}
        <div className="rounded-lg bg-blue-50 p-3 space-y-2">
          <p className="text-xs font-medium text-blue-800">💡 Você está economizando:</p>
          <div className="text-xs text-blue-700 space-y-1">
            <div>• R$ 297/mês em cursos individuais</div>
            <div>• R$ 89/mês em simulados</div>
            <div>• R$ 150/mês em aulas particulares</div>
            <div className="font-semibold mt-1">Total: R$ 536/mês de economia!</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 