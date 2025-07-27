'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { QrCode, Copy, Download } from 'lucide-react';
import { useState } from 'react';

interface PixPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixData: {
    qr_code: string;
    qr_code_text: string;
    expires_in: number;
  } | null;
  orderId: string;
}

export function PixPaymentModal({ isOpen, onClose, pixData, orderId }: PixPaymentModalProps) {
  const [copied, setCopied] = useState(false);

  const copyPixCode = async () => {
    if (pixData?.qr_code_text) {
      try {
        await navigator.clipboard.writeText(pixData.qr_code_text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Erro ao copiar código PIX:', error);
      }
    }
  };

  const downloadQRCode = () => {
    if (pixData?.qr_code) {
      const link = document.createElement('a');
      link.href = pixData.qr_code;
      link.download = `pix-qr-${orderId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!pixData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="size-5" />
            Pagamento PIX
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">Escaneie o QR Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="flex size-48 items-center justify-center rounded-lg border bg-white p-4">
                <img 
                  src={pixData.qr_code} 
                  alt="QR Code PIX" 
                  className="size-full object-contain"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyPixCode}
                  className="flex items-center gap-2"
                >
                  <Copy className="size-4" />
                  {copied ? 'Copiado!' : 'Copiar Código'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadQRCode}
                  className="flex items-center gap-2"
                >
                  <Download className="size-4" />
                  Baixar QR
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <p className="text-sm font-medium">Como pagar:</p>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Abra o app do seu banco</li>
              <li>Escolha a opção PIX</li>
              <li>Escaneie o QR Code ou cole o código</li>
              <li>Confirme o pagamento</li>
            </ol>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>Este PIX expira em {Math.floor(pixData.expires_in / 60)} minutos</p>
            <p>Pedido: {orderId}</p>
          </div>

          <Button onClick={onClose} className="w-full">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 