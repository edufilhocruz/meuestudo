'use client';

import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getnetService, GetnetPaymentResponse } from '@/features/checkout/services/getnetService';
import { analyticsService, trackEvent, trackError, trackConversion } from '@/features/checkout/services/analyticsService';

interface CheckoutFormData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    cpf?: string;
  };
  payment: {
    method: 'credit' | 'debit' | 'pix';
    cardNumber?: string;
    cardName?: string;
    cardExpiry?: string;
    cardCvv?: string;
  };
}

interface ValidationErrors {
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    cpf?: string;
  };
  payment?: {
    method?: string;
    cardNumber?: string;
    cardName?: string;
    cardExpiry?: string;
    cardCvv?: string;
  };
}

const initialFormData: CheckoutFormData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    cpf: '',
  },
  payment: {
    method: 'credit',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  },
};

export function useCheckoutManager() {
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Captura de email prévia para recuperação de abandono
  useEffect(() => {
    if (formData.personalInfo.email) {
      // Salvar email no localStorage para recuperação
      localStorage.setItem('checkout_email', formData.personalInfo.email);
      
      // Tracking de captura de email
      trackEvent('checkout_email_captured', {
        email: formData.personalInfo.email,
        timestamp: new Date().toISOString(),
      });
    }
  }, [formData.personalInfo.email]);

  // Tracking de início do checkout
  useEffect(() => {
    analyticsService.trackCheckoutStep('checkout_started', 1, {
      timestamp: new Date().toISOString(),
    });
  }, []);

  const validateField = useCallback((field: string, value: any): string | undefined => {
    switch (field) {
      case 'personalInfo.name':
        return !value.trim() ? 'Nome é obrigatório' : undefined;
      case 'personalInfo.email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value.trim() ? 'Email é obrigatório' : !emailRegex.test(value) ? 'Email inválido' : undefined;
      case 'personalInfo.phone':
        return !value.trim() ? 'Telefone é obrigatório' : undefined;
      case 'personalInfo.cpf':
        if (formData.payment.method !== 'pix') {
          const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
          return !value.trim() ? 'CPF é obrigatório' : !cpfRegex.test(value) ? 'CPF inválido' : undefined;
        }
        return undefined;
      case 'payment.cardNumber':
        return formData.payment.method !== 'pix' && !value.trim() ? 'Número do cartão é obrigatório' : undefined;
      case 'payment.cardName':
        return formData.payment.method !== 'pix' && !value.trim() ? 'Nome no cartão é obrigatório' : undefined;
      case 'payment.cardExpiry':
        return formData.payment.method !== 'pix' && !value.trim() ? 'Data de validade é obrigatória' : undefined;
      case 'payment.cardCvv':
        return formData.payment.method !== 'pix' && !value.trim() ? 'CVV é obrigatório' : undefined;
      default:
        return undefined;
    }
  }, [formData.payment.method]);

  const updateField = useCallback((field: string, value: any) => {
    const fieldPath = field.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < fieldPath.length - 1; i++) {
        current = current[fieldPath[i]];
      }
      current[fieldPath[fieldPath.length - 1]] = value;
      
      return newData;
    });

    // Tracking de preenchimento de campo
    trackEvent('checkout_field_filled', {
      field: field,
      has_value: !!value,
    });

    // Validar campo
    const error = validateField(field, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      let current: any = newErrors;
      
      for (let i = 0; i < fieldPath.length - 1; i++) {
        if (!current[fieldPath[i]]) current[fieldPath[i]] = {};
        current = current[fieldPath[i]];
      }
      
      if (error) {
        current[fieldPath[fieldPath.length - 1]] = error;
        
        // Tracking de erro de validação
        trackError('validation_error', error, {
          field: field,
        });
      } else {
        delete current[fieldPath[fieldPath.length - 1]];
      }
      
      return newErrors;
    });
  }, [validateField]);

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validar dados pessoais
    const personalInfoErrors: any = {};
    Object.keys(formData.personalInfo).forEach(key => {
      const error = validateField(`personalInfo.${key}`, formData.personalInfo[key as keyof typeof formData.personalInfo]);
      if (error) {
        personalInfoErrors[key] = error;
        isValid = false;
      }
    });
    if (Object.keys(personalInfoErrors).length > 0) {
      newErrors.personalInfo = personalInfoErrors;
    }

    // Validar pagamento
    if (formData.payment.method !== 'pix') {
      const paymentErrors: any = {};
      Object.keys(formData.payment).forEach(key => {
        if (key !== 'method') {
          const error = validateField(`payment.${key}`, formData.payment[key as keyof typeof formData.payment]);
          if (error) {
            paymentErrors[key] = error;
            isValid = false;
          }
        }
      });
      if (Object.keys(paymentErrors).length > 0) {
        newErrors.payment = paymentErrors;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  const processPaymentWithGetnet = useCallback(async (amount: number, orderId: string): Promise<GetnetPaymentResponse> => {
    if (formData.payment.method === 'pix') {
      return await getnetService.processPixPayment({
        amount,
        orderId,
        customerInfo: formData,
      });
    } else {
      const [expiryMonth, expiryYear] = formData.payment.cardExpiry!.split('/');
      
      return await getnetService.createPayment({
        amount,
        orderId,
        customerInfo: formData,
        cardData: {
          number: formData.payment.cardNumber!.replace(/\s/g, ''),
          holderName: formData.payment.cardName!,
          cvv: formData.payment.cardCvv!,
          expiryMonth: expiryMonth,
          expiryYear: `20${expiryYear}`,
        },
        installments: 1, // Assinatura recorrente sempre em 1x
      });
    }
  }, [formData]);

  const handleSubmit = useCallback(async (onOrderComplete: (data: any) => void) => {
    if (!validateForm()) {
      // Tracking de erro de validação no submit
      trackError('submit_validation_error', 'Erro de validação no formulário', {
        errors: errors,
      });

      toast({
        variant: 'destructive',
        title: 'Erro de validação',
        description: 'Por favor, corrija os erros no formulário antes de continuar.',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Tracking de início do pagamento
    analyticsService.trackCheckoutStep('payment_started', 3, {
      payment_method: formData.payment.method,
    });
    
    try {
      const orderId = `SUB-${Date.now()}`;
      const amount = 4980; // R$ 49,80 em centavos (assinatura mensal)

      const paymentResponse = await processPaymentWithGetnet(amount, orderId);

      if (paymentResponse.status === 'APPROVED' || paymentResponse.credit?.authorized) {
        const orderData = {
          id: orderId,
          paymentId: paymentResponse.payment_id,
          items: [],
          total: amount / 100,
          originalTotal: 49.80,
          discount: 0,
          status: 'confirmed' as const,
          createdAt: new Date(),
          customerInfo: formData,
          paymentMethod: formData.payment.method,
          getnetResponse: paymentResponse,
        };

        // Tracking de sucesso
        analyticsService.trackCheckoutStep('subscription_activated', 4, {
          order_id: orderId,
          payment_id: paymentResponse.payment_id,
          amount: amount / 100,
          payment_method: formData.payment.method,
        });

        // Tracking de conversão
        trackConversion(orderData);

        // Limpar email do localStorage após sucesso
        localStorage.removeItem('checkout_email');

        toast({
          title: 'Assinatura ativada!',
          description: 'Sua assinatura foi processada com sucesso.',
        });

        onOrderComplete(orderData);
      } else {
        throw new Error(paymentResponse.credit?.reason_message || 'Pagamento não aprovado');
      }
    } catch (error: any) {
      console.error('Erro no pagamento:', error);
      
      // Tracking de erro no pagamento
      trackError('payment_error', error.message, {
        payment_method: formData.payment.method,
      });
      
      let errorMessage = 'Não foi possível processar sua assinatura. Tente novamente.';
      
      if (error.message.includes('card')) {
        errorMessage = 'Dados do cartão inválidos. Verifique e tente novamente.';
      } else if (error.message.includes('insufficient')) {
        errorMessage = 'Saldo insuficiente no cartão.';
      } else if (error.message.includes('expired')) {
        errorMessage = 'Cartão expirado.';
      } else if (error.message.includes('PIX')) {
        errorMessage = 'Erro ao gerar PIX. Tente novamente.';
      }

      toast({
        variant: 'destructive',
        title: 'Erro no pagamento',
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, processPaymentWithGetnet, toast, errors]);

  return {
    formData,
    errors,
    isSubmitting,
    handleSubmit,
    updateField,
  };
} 