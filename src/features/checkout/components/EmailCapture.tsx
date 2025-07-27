'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { trackEvent } from '@/features/checkout/services/analyticsService';

interface EmailCaptureProps {
  onEmailCaptured: (email: string) => void;
  onSkip: () => void;
}

export function EmailCapture({ onEmailCaptured, onSkip }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);

  // Verificar se já existe email salvo
  useEffect(() => {
    const saved = localStorage.getItem('checkout_email');
    if (saved) {
      setSavedEmail(saved);
      setEmail(saved);
      setIsValid(true);
    }
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) return;

    // Salvar email no localStorage
    localStorage.setItem('checkout_email', email);
    
    // Tracking de captura de email
    trackEvent('email_capture_completed', {
      email: email,
      source: 'checkout_start',
    });

    setIsSubmitted(true);
    onEmailCaptured(email);

    // Auto-continuar após 1 segundo
    setTimeout(() => {
      onSkip();
    }, 1000);
  };

  const handleSkip = () => {
    // Tracking de skip
    trackEvent('email_capture_skipped', {
      had_saved_email: !!savedEmail,
    });

    onSkip();
  };

  if (isSubmitted) {
    return (
      <Card className="mb-6 border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="size-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Email capturado!</p>
              <p className="text-sm text-green-600">
                Continuando para o checkout...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Mail className="size-5" />
          Comece seu checkout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="capture-email" className="text-blue-700">
              {savedEmail ? 'Email salvo' : 'Digite seu email para começar'}
            </Label>
            <Input
              id="capture-email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="seu@email.com"
              className="mt-1"
              required
            />
            {savedEmail && (
              <p className="text-xs text-blue-600 mt-1">
                Email salvo anteriormente - você pode alterar se necessário
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={!isValid}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Continuar
              <ArrowRight className="size-4 ml-2" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSkip}
              className="text-blue-600 border-blue-300 hover:bg-blue-100"
            >
              Pular
            </Button>
          </div>
          
          <p className="text-xs text-blue-600">
            💡 Capturamos seu email para enviar lembretes caso você abandone o checkout
          </p>
        </form>
      </CardContent>
    </Card>
  );
} 