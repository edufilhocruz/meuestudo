'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import DesktopHeader from '@/components/desktop-header';
import BottomNav from '@/components/bottom-nav';
import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';
import { PaymentSummary } from '@/features/checkout/components/PaymentSummary';
import { OrderConfirmation } from '@/features/checkout/components/OrderConfirmation';
import { EmailCapture } from '@/features/checkout/components/EmailCapture';
import { useCheckoutManager } from '@/features/checkout/hooks/useCheckoutManager';

export default function CheckoutPage() {
  const [step, setStep] = useState<'email' | 'form' | 'confirmation'>('email');
  const [orderData, setOrderData] = useState(null);
  const { updateField } = useCheckoutManager();

  const handleEmailCaptured = (email: string) => {
    // Preencher o email no formulário
    updateField('personalInfo.email', email);
    setStep('form');
  };

  const handleEmailSkip = () => {
    setStep('form');
  };

  const handleOrderComplete = (data: any) => {
    setOrderData(data);
    setStep('confirmation');
  };

  const handleBackToForm = () => {
    setStep('form');
    setOrderData(null);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground font-body">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="hidden md:block">
          <DesktopHeader title="Checkout" />
        </div>
        
        <main className="flex-1 px-4 py-5 pb-24 md:flex md:items-start md:justify-center md:py-10">
          <div className="w-full max-w-6xl">
            {step === 'email' ? (
              <div className="max-w-md mx-auto">
                <EmailCapture 
                  onEmailCaptured={handleEmailCaptured}
                  onSkip={handleEmailSkip}
                />
              </div>
            ) : step === 'form' ? (
              <div className="md:grid md:grid-cols-2 md:gap-16">
                <CheckoutForm onOrderComplete={handleOrderComplete} />
                <div className="mt-8 md:mt-0">
                  <PaymentSummary />
                </div>
              </div>
            ) : (
              <OrderConfirmation 
                orderData={orderData} 
                onBackToForm={handleBackToForm} 
              />
            )}
          </div>
        </main>
      </div>
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
} 