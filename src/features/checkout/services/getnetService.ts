// Serviço de integração com Getnet
// Baseado na documentação: https://developers.getnet.com.br/documentations/plataforma-digital

import { getGetnetHeaders } from '@/features/checkout/config/company';

interface GetnetCredentials {
  clientId: string;
  clientSecret: string;
  sellerId: string;
  environment: 'sandbox' | 'production';
}

interface GetnetTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface GetnetOrderRequest {
  seller_id: string;
  amount: number;
  currency_id: string;
  order_id: string;
  customer: {
    customer_id: string;
    first_name: string;
    last_name: string;
    name: string;
    email: string;
    document_type: string;
    document_number: string;
    phone_number: string;
  };
  credit?: {
    delayed: boolean;
    save_card: boolean;
    transaction_type: string;
    number_installments: number;
    card: {
      number_token: string;
      security_code: string;
      brand: string;
    };
  };
  pix?: {
    amount: number;
    currency: string;
    order_id: string;
    customer_id: string;
  };
}

interface GetnetPaymentResponse {
  payment_id: string;
  status: string;
  credit?: {
    authorized: boolean;
    reason_code?: string;
    reason_message?: string;
  };
  pix?: {
    qr_code: string;
    qr_code_text: string;
    expiration_date: string;
  };
}

class GetnetService {
  private credentials: GetnetCredentials;
  private baseUrl: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(credentials: GetnetCredentials) {
    this.credentials = credentials;
    this.baseUrl = credentials.environment === 'production' 
      ? 'https://api.getnet.com.br' 
      : 'https://api-sandbox.getnet.com.br';
  }

  private async getAccessToken(): Promise<string> {
    // Verificar se o token ainda é válido
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const response = await fetch(`${this.baseUrl}/auth/oauth/v2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${this.credentials.clientId}:${this.credentials.clientSecret}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error('Falha na autenticação com Getnet');
    }

    const tokenData: GetnetTokenResponse = await response.json();
    this.accessToken = tokenData.access_token;
    this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000) - 60000; // 1 minuto de margem

    return this.accessToken;
  }

  async createPayment(paymentData: {
    amount: number;
    orderId: string;
    customerInfo: any;
    cardData: {
      number: string;
      holderName: string;
      cvv: string;
      expiryMonth: string;
      expiryYear: string;
    };
    installments: number;
  }): Promise<GetnetPaymentResponse> {
    const token = await this.getAccessToken();
    const cardToken = await this.generateCardToken(paymentData.cardData, token);

    const requestBody: GetnetOrderRequest = {
      seller_id: this.credentials.sellerId,
      amount: paymentData.amount,
      currency_id: 'BRL',
      order_id: paymentData.orderId,
      customer: {
        customer_id: paymentData.customerInfo.personalInfo.email,
        first_name: paymentData.customerInfo.personalInfo.name.split(' ')[0],
        last_name: paymentData.customerInfo.personalInfo.name.split(' ').slice(1).join(' '),
        name: paymentData.customerInfo.personalInfo.name,
        email: paymentData.customerInfo.personalInfo.email,
        document_type: 'CPF',
        document_number: paymentData.customerInfo.personalInfo.cpf || '00000000000',
        phone_number: paymentData.customerInfo.personalInfo.phone,
      },
      credit: {
        delayed: false,
        save_card: false, // Pode ser true para salvar cartão
        transaction_type: 'FULL',
        number_installments: paymentData.installments,
        card: {
          number_token: cardToken,
          security_code: paymentData.cardData.cvv,
          brand: this.detectCardBrand(paymentData.cardData.number),
        },
      },
    };

    const response = await fetch(`${this.baseUrl}/v1/payments/credit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'seller_id': this.credentials.sellerId,
        ...getGetnetHeaders(), // Usar configuração centralizada
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro no processamento do pagamento');
    }

    return response.json();
  }

  private async generateCardToken(cardData: any, token: string): Promise<string> {
    // Em produção, isso seria uma chamada real para tokenizar o cartão
    // Por enquanto, simulamos a tokenização
    const response = await fetch(`${this.baseUrl}/v1/tokens/card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'seller_id': this.credentials.sellerId,
      },
      body: JSON.stringify({
        card_number: cardData.number,
        cardholder_name: cardData.holderName,
        expiration_month: cardData.expiryMonth,
        expiration_year: cardData.expiryYear,
        security_code: cardData.cvv,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro na tokenização do cartão');
    }

    const tokenData = await response.json();
    return tokenData.number_token;
  }

  private detectCardBrand(cardNumber: string): string {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'Amex';
    if (/^6/.test(cleanNumber)) return 'Discover';
    if (/^606282|^3841/.test(cleanNumber)) return 'Hipercard';
    if (/^636368|^438935|^504175|^451416|^636297/.test(cleanNumber)) return 'Elo';
    
    return 'Unknown';
  }

  async processPixPayment(paymentData: {
    amount: number;
    orderId: string;
    customerInfo: any;
  }): Promise<GetnetPaymentResponse> {
    const token = await this.getAccessToken();

    const requestBody: GetnetOrderRequest = {
      seller_id: this.credentials.sellerId,
      amount: paymentData.amount,
      currency_id: 'BRL',
      order_id: paymentData.orderId,
      customer: {
        customer_id: paymentData.customerInfo.personalInfo.email,
        first_name: paymentData.customerInfo.personalInfo.name.split(' ')[0],
        last_name: paymentData.customerInfo.personalInfo.name.split(' ').slice(1).join(' '),
        name: paymentData.customerInfo.personalInfo.name,
        email: paymentData.customerInfo.personalInfo.email,
        document_type: 'CPF',
        document_number: paymentData.customerInfo.personalInfo.cpf || '00000000000',
        phone_number: paymentData.customerInfo.personalInfo.phone,
      },
      pix: {
        amount: paymentData.amount,
        currency: 'BRL',
        order_id: paymentData.orderId,
        customer_id: paymentData.customerInfo.personalInfo.email,
      },
    };

    const response = await fetch(`${this.baseUrl}/v1/payments/pix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'seller_id': this.credentials.sellerId,
        ...getGetnetHeaders(), // Usar configuração centralizada
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro no processamento do PIX');
    }

    return response.json();
  }
}

export const getnetService = new GetnetService({
  clientId: process.env.NEXT_PUBLIC_GETNET_CLIENT_ID || 'your-client-id',
  clientSecret: process.env.GETNET_CLIENT_SECRET || 'your-client-secret',
  sellerId: process.env.NEXT_PUBLIC_GETNET_SELLER_ID || 'your-seller-id',
  environment: (process.env.NEXT_PUBLIC_GETNET_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
});

export type { GetnetPaymentResponse, GetnetOrderRequest }; 