'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCheckoutManager } from '@/features/checkout/hooks/useCheckoutManager';
import { CreditCard, QrCode, User } from 'lucide-react';

interface CheckoutFormProps {
  onOrderComplete: (data: any) => void;
}

export function CheckoutForm({ onOrderComplete }: CheckoutFormProps) {
  const { formData, errors, isSubmitting, handleSubmit, updateField } = useCheckoutManager();

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, '');
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onOrderComplete);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Dados Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Dados da Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.personalInfo.name}
              onChange={(e) => updateField('personalInfo.name', e.target.value)}
              placeholder="Digite seu nome completo"
              className={errors.personalInfo?.name ? 'border-destructive' : ''}
            />
            {errors.personalInfo?.name && (
              <p className="text-sm text-destructive mt-1">{errors.personalInfo.name}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => updateField('personalInfo.email', e.target.value)}
                placeholder="seu@email.com"
                className={errors.personalInfo?.email ? 'border-destructive' : ''}
              />
              {errors.personalInfo?.email && (
                <p className="text-sm text-destructive mt-1">{errors.personalInfo.email}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.personalInfo.phone}
                onChange={(e) => updateField('personalInfo.phone', e.target.value)}
                placeholder="(11) 99999-9999"
                className={errors.personalInfo?.phone ? 'border-destructive' : ''}
              />
              {errors.personalInfo?.phone && (
                <p className="text-sm text-destructive mt-1">{errors.personalInfo.phone}</p>
              )}
            </div>
          </div>

          {formData.payment.method !== 'pix' && (
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={formData.personalInfo.cpf}
                onChange={(e) => updateField('personalInfo.cpf', formatCPF(e.target.value))}
                placeholder="000.000.000-00"
                maxLength={14}
                className={errors.personalInfo?.cpf ? 'border-destructive' : ''}
              />
              {errors.personalInfo?.cpf && (
                <p className="text-sm text-destructive mt-1">{errors.personalInfo.cpf}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Método de Pagamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Método de Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={formData.payment.method}
            onValueChange={(value) => updateField('payment.method', value)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="credit" id="credit" className="sr-only" />
              <Label
                htmlFor="credit"
                className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <CreditCard className="mb-2 size-4" />
                <span className="text-sm font-medium">Cartão de Crédito</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="debit" id="debit" className="sr-only" />
              <Label
                htmlFor="debit"
                className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <CreditCard className="mb-2 size-4" />
                <span className="text-sm font-medium">Cartão de Débito</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="pix" id="pix" className="sr-only" />
              <Label
                htmlFor="pix"
                className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <QrCode className="mb-2 size-4" />
                <span className="text-sm font-medium">PIX</span>
              </Label>
            </div>
          </RadioGroup>

          {formData.payment.method !== 'pix' && (
            <>
              <Separator />
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input
                    id="cardNumber"
                    value={formData.payment.cardNumber}
                    onChange={(e) => updateField('payment.cardNumber', formatCardNumber(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className={errors.payment?.cardNumber ? 'border-destructive' : ''}
                  />
                  {errors.payment?.cardNumber && (
                    <p className="text-sm text-destructive mt-1">{errors.payment.cardNumber}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input
                    id="cardName"
                    value={formData.payment.cardName}
                    onChange={(e) => updateField('payment.cardName', e.target.value.toUpperCase())}
                    placeholder="Nome como está no cartão"
                    className={errors.payment?.cardName ? 'border-destructive' : ''}
                  />
                  {errors.payment?.cardName && (
                    <p className="text-sm text-destructive mt-1">{errors.payment.cardName}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry">Data de Validade</Label>
                    <Input
                      id="cardExpiry"
                      value={formData.payment.cardExpiry}
                      onChange={(e) => updateField('payment.cardExpiry', formatExpiry(e.target.value))}
                      placeholder="MM/AA"
                      maxLength={5}
                      className={errors.payment?.cardExpiry ? 'border-destructive' : ''}
                    />
                    {errors.payment?.cardExpiry && (
                      <p className="text-sm text-destructive mt-1">{errors.payment.cardExpiry}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input
                      id="cardCvv"
                      value={formData.payment.cardCvv}
                      onChange={(e) => updateField('payment.cardCvv', e.target.value.replace(/\D/g, ''))}
                      placeholder="123"
                      maxLength={4}
                      className={errors.payment?.cardCvv ? 'border-destructive' : ''}
                    />
                    {errors.payment?.cardCvv && (
                      <p className="text-sm text-destructive mt-1">{errors.payment.cardCvv}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Botão de Finalizar */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-14 text-lg font-bold"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processando...' : 'Ativar Assinatura'}
      </Button>
    </form>
  );
} 