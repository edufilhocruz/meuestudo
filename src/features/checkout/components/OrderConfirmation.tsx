'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, ArrowLeft, Mail, Zap, User } from 'lucide-react';

interface OrderData {
  id: string;
  items: any[];
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  customerInfo?: any;
}

interface OrderConfirmationProps {
  orderData: OrderData | null;
  onBackToForm: () => void;
}

export function OrderConfirmation({ orderData, onBackToForm }: OrderConfirmationProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (!orderData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Nenhuma assinatura encontrada.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Cabeçalho de Sucesso */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="size-8 text-green-600" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assinatura Ativada!</h1>
          <p className="text-muted-foreground mt-2">
            Sua assinatura foi processada com sucesso. Você receberá um email com os dados de acesso.
          </p>
        </div>
      </div>

      {/* Informações da Assinatura */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Detalhes da Assinatura</span>
            <Badge variant="secondary" className="text-sm">
              #{orderData.id}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Data de Ativação</p>
              <p className="font-medium">{formatDate(orderData.createdAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Ativa
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Valor Mensal</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(orderData.total)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Próximos Passos */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <Mail className="size-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Email de Boas-vindas</p>
              <p className="text-sm text-muted-foreground">
                Enviaremos um email com seus dados de acesso em até 5 minutos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-100">
              <Zap className="size-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Acesso Imediato</p>
              <p className="text-sm text-muted-foreground">
                Você já pode acessar a plataforma através da sua conta.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-100">
              <User className="size-4 text-orange-600" />
            </div>
            <div>
              <p className="font-medium">Suporte Premium</p>
              <p className="text-sm text-muted-foreground">
                Nossa equipe está disponível para ajudar com qualquer dúvida.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Cliente */}
      {orderData.customerInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Dados da Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">{orderData.customerInfo.personalInfo?.name}</p>
            <p className="text-muted-foreground">{orderData.customerInfo.personalInfo?.email}</p>
            <p className="text-muted-foreground">{orderData.customerInfo.personalInfo?.phone}</p>
          </CardContent>
        </Card>
      )}

      {/* Benefícios da Assinatura */}
      <Card>
        <CardHeader>
          <CardTitle>Benefícios da Sua Assinatura</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="size-4 text-primary" />
            </div>
            <span className="text-sm">Acesso ilimitado a todos os cursos</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="size-4 text-primary" />
            </div>
            <span className="text-sm">Simulados personalizados</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="size-4 text-primary" />
            </div>
            <span className="text-sm">Suporte prioritário</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="size-4 text-primary" />
            </div>
            <span className="text-sm">Atualizações automáticas</span>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onBackToForm}
          className="flex-1"
        >
          <ArrowLeft className="size-4 mr-2" />
          Voltar ao Início
        </Button>
        <Button className="flex-1">
          <Download className="size-4 mr-2" />
          Baixar Comprovante
        </Button>
      </div>

      {/* Informações Adicionais */}
      <div className="rounded-lg bg-muted/50 p-4 space-y-2">
        <p className="text-sm font-medium">Precisa de ajuda?</p>
        <p className="text-xs text-muted-foreground">
          Entre em contato conosco através do email suporte@studysmart.com ou pelo WhatsApp (11) 99999-9999
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          <strong>Lembre-se:</strong> Sua assinatura será renovada automaticamente todo mês. 
          Você pode cancelar a qualquer momento através da sua conta.
        </p>
      </div>
    </div>
  );
} 