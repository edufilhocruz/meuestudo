# Configuração Getnet - Gateway de Pagamento

## Visão Geral

Este projeto integra com o **Getnet** como gateway de pagamento, oferecendo checkout transparente com suporte a cartão de crédito/débito e PIX para **assinaturas recorrentes mensais**.

## Configuração Inicial

### 1. Conta Getnet

1. Acesse [Getnet Developers](https://developers.getnet.com.br/)
2. Crie uma conta de desenvolvedor
3. Solicite credenciais de sandbox para testes
4. Configure sua conta com dados da empresa

### 2. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Getnet API Credentials
NEXT_PUBLIC_GETNET_CLIENT_ID=your-client-id-here
GETNET_CLIENT_SECRET=your-client-secret-here
NEXT_PUBLIC_GETNET_SELLER_ID=your-seller-id-here
NEXT_PUBLIC_GETNET_ENVIRONMENT=sandbox
```

### 3. Configuração do Nome da Empresa

**IMPORTANTE**: O nome que aparece no cartão de crédito e faturas está configurado como **"MEUESTUDO"**.

Para alterar o nome que aparece nas transações:

1. **No cartão de crédito**: O cliente verá "MEUESTUDO" na fatura
2. **Nas notificações**: O nome "MEUESTUDO" aparecerá nas notificações push
3. **No extrato bancário**: A transação será identificada como "MEUESTUDO"

**Configuração atual**:
```typescript
headers: {
  'X-Company-Name': 'MEUESTUDO',
  'X-Statement-Descriptor': 'MEUESTUDO',
}
```

**Para alterar**: Edite o arquivo `src/features/checkout/config/company.ts` e substitua "MEUESTUDO" pelo nome desejado.

## Funcionalidades Implementadas

### ✅ Cartão de Crédito/Débito
- **Tokenização segura** do cartão
- **Assinatura recorrente** (sem parcelamento)
- **Validação** de dados do cartão
- **Detecção automática** da bandeira
- **Nome da empresa**: "MEUESTUDO" aparece na fatura

### ✅ PIX
- **Geração de QR Code**
- **Código PIX** para copiar e colar
- **Expiração automática** (1 hora)
- **Nome da empresa**: "MEUESTUDO" aparece no PIX

### ✅ Assinatura Recorrente
- **Cobrança mensal automática**
- **Sem parcelamento** (sempre 1x)
- **Cancelamento fácil** a qualquer momento
- **Renovação automática** até cancelamento

### ✅ Validações
- **CPF** (formato e validação)
- **Email** (formato válido)
- **Cartão** (número, validade, CVV)
- **Dados obrigatórios** (nome, telefone)

## Estrutura de Arquivos

```
src/features/checkout/
├── services/
│   ├── getnetService.ts     # Integração com Getnet
│   └── analyticsService.ts  # Tracking de eventos
├── components/
│   ├── CheckoutForm.tsx     # Formulário principal
│   ├── PaymentSummary.tsx   # Resumo do pedido
│   ├── OrderConfirmation.tsx # Confirmação
│   ├── EmailCapture.tsx     # Captura de email
│   └── PixPaymentModal.tsx  # Modal PIX
├── hooks/
│   └── useCheckoutManager.ts # Lógica do checkout
└── README.md                # Documentação
```

## Fluxo de Pagamento

### 1. Cartão de Crédito/Débito
```
Cliente preenche dados → Tokenização → Processamento → Confirmação
```

### 2. PIX
```
Cliente escolhe PIX → Geração QR Code → Cliente paga → Confirmação
```

### 3. Assinatura Recorrente
```
Primeira cobrança → Renovação mensal automática → Cancelamento opcional
```

## Tratamento de Erros

### Erros Comuns
- **Cartão inválido**: "Dados do cartão inválidos"
- **Saldo insuficiente**: "Saldo insuficiente no cartão"
- **Cartão expirado**: "Cartão expirado"
- **Erro PIX**: "Erro ao gerar PIX"

### Mapeamento de Erros Getnet
```typescript
// Erros específicos do Getnet são mapeados para mensagens amigáveis
if (error.message.includes('card')) {
  errorMessage = 'Dados do cartão inválidos. Verifique e tente novamente.';
} else if (error.message.includes('insufficient')) {
  errorMessage = 'Saldo insuficiente no cartão.';
}
```

## Segurança

### ✅ Implementado
- **Tokenização** de cartão
- **HTTPS** obrigatório
- **Validação** client-side
- **Sanitização** de dados

### ⚠️ Para Produção
- **Implementar** tokenização no frontend
- **Configurar** webhooks para notificações
- **Adicionar** logs de auditoria
- **Implementar** rate limiting

## Testes

### Cartões de Teste (Sandbox)

#### Visa
- **Número**: 4012001037141112
- **CVV**: 123
- **Validade**: 12/25

#### Mastercard
- **Número**: 5425233430109903
- **CVV**: 123
- **Validade**: 12/25

#### PIX
- Use qualquer QR Code gerado pelo sandbox

### Cenários de Teste
1. **Pagamento aprovado** com cartão válido
2. **Pagamento recusado** com cartão inválido
3. **PIX** com QR Code válido
4. **Validação** de campos obrigatórios
5. **Assinatura recorrente** (teste de renovação)

## Checklist para Produção

### ✅ Configuração
- [ ] Credenciais de produção configuradas
- [ ] Webhooks configurados
- [ ] Logs de auditoria ativos
- [ ] Monitoramento de transações

### ✅ Segurança
- [ ] Tokenização no frontend
- [ ] Rate limiting implementado
- [ ] Validação server-side
- [ ] Sanitização de dados

### ✅ Testes
- [ ] Testes com cartões reais
- [ ] Testes de PIX em produção
- [ ] Testes de webhooks
- [ ] Testes de recuperação de erro

### ✅ Nome da Empresa
- [ ] "MEUESTUDO" configurado corretamente
- [ ] Teste de transação para verificar nome na fatura
- [ ] Confirmação de nome nas notificações

### ✅ Assinatura Recorrente
- [ ] Configuração de renovação automática
- [ ] Teste de cobrança mensal
- [ ] Sistema de cancelamento
- [ ] Notificações de renovação

## Suporte

### Documentação Getnet
- [Plataforma Digital](https://developers.getnet.com.br/documentations/plataforma-digital)
- [API Reference](https://developers.getnet.com.br/api)
- [Sandbox](https://developers.getnet.com.br/sandbox)

### Contato
- **Getnet Support**: support@getnet.com.br
- **Documentação**: developers.getnet.com.br

## Notas Importantes

1. **Nome da Empresa**: Configurado como "MEUESTUDO" para aparecer no cartão de crédito e faturas
2. **Sandbox**: Use apenas para testes, não para transações reais
3. **Tokenização**: Em produção, implemente no frontend para maior segurança
4. **Webhooks**: Configure para receber notificações de status das transações
5. **Logs**: Mantenha logs detalhados para auditoria e suporte
6. **Assinatura Recorrente**: Sempre em 1x, renovação mensal automática 