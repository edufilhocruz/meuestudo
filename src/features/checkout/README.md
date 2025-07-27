# Feature: Checkout - SaaS por Assinatura

## Responsabilidade
Esta feature é responsável por gerenciar o processo de checkout e ativação de assinaturas SaaS, incluindo formulários de dados pessoais, métodos de pagamento e confirmação de assinatura. Integra com o gateway de pagamento **Getnet** para processamento seguro de transações recorrentes.

## Integração Getnet

### Configuração
A integração com Getnet requer as seguintes variáveis de ambiente:

```env
NEXT_PUBLIC_GETNET_CLIENT_ID=your-client-id-here
GETNET_CLIENT_SECRET=your-client-secret-here
NEXT_PUBLIC_GETNET_SELLER_ID=your-seller-id-here
NEXT_PUBLIC_GETNET_ENVIRONMENT=sandbox
```

### Funcionalidades
- ✅ **Checkout Transparente**: Processamento direto no app
- ✅ **Cartão de Crédito/Débito**: Com validação e parcelamento
- ✅ **PIX**: Geração de QR Code e código PIX
- ✅ **Validação de Dados**: CPF, cartão, dados pessoais
- ✅ **Tratamento de Erros**: Mensagens específicas do gateway
- ✅ **Ambiente Sandbox**: Para testes e desenvolvimento
- ✅ **Assinatura Recorrente**: Modelo SaaS mensal

## Componentes

### CheckoutForm
Formulário principal de checkout que coleta dados pessoais e informações de pagamento para ativação de assinatura.

**Props:**
- `onOrderComplete: (data: OrderData) => void` - Callback executado quando a assinatura é ativada

**Funcionalidades:**
- Validação em tempo real
- Formatação automática de campos (CPF, cartão, data)
- Seleção de parcelas (1x a 6x sem juros)
- Campos condicionais baseados no método de pagamento
- Foco em dados pessoais (sem endereço físico)

**Uso:**
```tsx
<CheckoutForm onOrderComplete={(data) => console.log(data)} />
```

### PaymentSummary
Exibe o resumo da assinatura com produtos digitais, valores e benefícios.

**Props:**
- `items?: CartItem[]` - Lista de produtos da assinatura
- `subtotal?: number` - Subtotal da assinatura
- `total?: number` - Valor total mensal

**Funcionalidades:**
- Exibição de produtos digitais (cursos, simulados)
- Benefícios da assinatura
- Informações sobre renovação automática
- Sem referências a frete ou entrega física

**Uso:**
```tsx
<PaymentSummary 
  items={subscriptionItems}
  subtotal={49.80}
  total={49.80}
/>
```

### OrderConfirmation
Tela de confirmação exibida após a assinatura ser ativada com sucesso.

**Props:**
- `orderData: OrderData` - Dados da assinatura ativada
- `onBackToForm: () => void` - Callback para voltar ao formulário

**Funcionalidades:**
- Confirmação de ativação da assinatura
- Benefícios incluídos
- Informações sobre renovação automática
- Dados de acesso à plataforma

**Uso:**
```tsx
<OrderConfirmation 
  orderData={orderData}
  onBackToForm={() => setStep('form')}
/>
```

### PixPaymentModal
Modal para exibir QR Code e código PIX para pagamento.

**Props:**
- `isOpen: boolean` - Estado de abertura do modal
- `onClose: () => void` - Função para fechar o modal
- `pixData: PixData` - Dados do PIX (QR Code, código, expiração)
- `orderId: string` - ID da assinatura

**Uso:**
```tsx
<PixPaymentModal
  isOpen={showPixModal}
  onClose={() => setShowPixModal(false)}
  pixData={pixData}
  orderId="SUB-123"
/>
```

## Hooks

### useCheckoutManager
Hook para gerenciar o estado do checkout, validações e submissão do formulário com integração Getnet para assinaturas.

**Retorna:**
- `formData: CheckoutFormData` - Dados do formulário
- `errors: ValidationErrors` - Erros de validação
- `isSubmitting: boolean` - Estado de submissão
- `handleSubmit: () => void` - Função para submeter o formulário
- `updateField: (field: string, value: any) => void` - Função para atualizar campos

**Funcionalidades:**
- Validação de campos obrigatórios
- Formatação automática de dados
- Integração com API Getnet
- Tratamento de erros específicos do gateway
- Processamento de cartão e PIX
- Foco em dados pessoais (sem endereço)

**Uso:**
```tsx
const { formData, errors, isSubmitting, handleSubmit, updateField } = useCheckoutManager();
```

## Serviços

### getnetService
Serviço de integração com a API Getnet para processamento de pagamentos de assinatura.

**Métodos:**
- `createPayment()` - Processa pagamento com cartão
- `processPixPayment()` - Gera PIX para pagamento
- `getAccessToken()` - Gerencia autenticação OAuth2

**Uso:**
```tsx
import { getnetService } from '@/features/checkout/services/getnetService';

// Processar pagamento com cartão
const payment = await getnetService.createPayment({
  amount: 4980, // R$ 49,80 em centavos
  orderId: 'SUB-123',
  customerInfo: formData,
  cardData: cardInfo,
  installments: 1,
});

// Processar PIX
const pix = await getnetService.processPixPayment({
  amount: 4980,
  orderId: 'SUB-123',
  customerInfo: formData,
});
```

## Tipos

```typescript
interface CheckoutFormData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    cpf?: string; // Obrigatório para cartão
  };
  payment: {
    method: 'credit' | 'debit' | 'pix';
    cardNumber?: string;
    cardName?: string;
    cardExpiry?: string;
    cardCvv?: string;
    installments?: number; // 1-6x sem juros
  };
}

interface OrderData {
  id: string;
  paymentId: string; // ID do pagamento Getnet
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  customerInfo: CheckoutFormData;
  paymentMethod: string;
  getnetResponse: GetnetPaymentResponse;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type?: 'subscription' | 'one-time';
}

interface GetnetPaymentResponse {
  payment_id: string;
  seller_id: string;
  amount: number;
  currency: string;
  order_id: string;
  status: string;
  received_at: string;
  credit?: {
    authorized: boolean;
    reason_code: string;
    reason_message: string;
    transaction_id: string;
  };
  pix?: {
    qr_code: string;
    qr_code_text: string;
    expires_in: number;
  };
}
```

## Fluxo de Assinatura

1. **Dados Pessoais**: Nome, email, telefone, CPF (para cartão)
2. **Método de Pagamento**: Cartão (crédito/débito) ou PIX
3. **Validação**: Verificação de todos os campos obrigatórios
4. **Processamento**: Integração com Getnet
5. **Ativação**: Confirmação da assinatura e acesso à plataforma

## Benefícios da Assinatura

- ✅ **Acesso Ilimitado**: A todos os cursos e simulados
- ✅ **Simulados Personalizados**: Baseados no seu desempenho
- ✅ **Suporte Prioritário**: Atendimento exclusivo
- ✅ **Atualizações Automáticas**: Conteúdo sempre atualizado
- ✅ **Renovação Automática**: Mensal, cancele quando quiser

## Segurança

- ✅ Dados sensíveis não são armazenados
- ✅ Tokenização de cartão via Getnet
- ✅ Validação de campos no frontend e backend
- ✅ Tratamento seguro de erros
- ✅ Ambiente sandbox para desenvolvimento

## Documentação Getnet

Baseado na [documentação oficial da Getnet](https://developers.getnet.com.br/documentations/plataforma-digital):
- API de Pagamentos
- Checkout Transparente
- PIX
- Autenticação OAuth2 