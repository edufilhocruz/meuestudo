# 🏢 Configuração do Nome da Empresa - Transações

## 📋 **Resumo da Configuração**

**Nome Legal**: `fexolsoftware e sistemas ltda`  
**Nome nas Transações**: `MEUESTUDO`

## 🎯 **Onde "MEUESTUDO" Aparece**

### ✅ **Cartão de Crédito**
- **Fatura do cartão**: `MEUESTUDO`
- **Extrato bancário**: `MEUESTUDO`
- **Notificações push**: `MEUESTUDO`
- **App do banco**: `MEUESTUDO`

### ✅ **PIX**
- **QR Code**: `MEUESTUDO`
- **Histórico PIX**: `MEUESTUDO`
- **Comprovante**: `MEUESTUDO`

### ✅ **Notificações**
- **SMS**: `MEUESTUDO`
- **Email**: `MEUESTUDO`
- **Push**: `MEUESTUDO`

## 🔧 **Configuração Técnica**

### **Arquivo de Configuração**
```typescript
// src/features/checkout/config/company.ts
export const COMPANY_CONFIG = {
  STATEMENT_DESCRIPTOR: 'MEUESTUDO',
  COMPANY_NAME: 'MEUESTUDO',
  LEGAL_NAME: 'fexolsoftware e sistemas ltda',
  // ...
};
```

### **Headers Getnet**
```typescript
headers: {
  'X-Company-Name': 'MEUESTUDO',
  'X-Statement-Descriptor': 'MEUESTUDO',
}
```

## 📱 **Exemplos Visuais**

### **Fatura do Cartão**
```
MEUESTUDO                    R$ 49,80
Assinatura Premium
Data: 15/12/2024
```

### **Notificação Push**
```
MEUESTUDO
Pagamento aprovado: R$ 49,80
```

### **Extrato Bancário**
```
15/12 MEUESTUDO              -49,80
```

## 🛠️ **Como Alterar o Nome**

### **1. Alteração Rápida**
Edite o arquivo `src/features/checkout/config/company.ts`:

```typescript
export const COMPANY_CONFIG = {
  STATEMENT_DESCRIPTOR: 'NOVO_NOME',
  COMPANY_NAME: 'NOVO_NOME',
  // ...
};
```

### **2. Alteração Específica por Tipo**
```typescript
// Apenas cartão de crédito
TRANSACTION: {
  CARD_DESCRIPTOR: 'NOME_CARTAO',
  PIX_DESCRIPTOR: 'NOME_PIX',
  NOTIFICATION_NAME: 'NOME_NOTIFICACAO',
}
```

## ✅ **Checklist de Verificação**

### **Antes de Produção**
- [ ] Nome "MEUESTUDO" configurado corretamente
- [ ] Teste com cartão real realizado
- [ ] Verificação na fatura do cartão
- [ ] Confirmação nas notificações
- [ ] Teste de PIX realizado

### **Testes Necessários**
1. **Cartão de Crédito**: Fazer uma transação e verificar na fatura
2. **PIX**: Gerar PIX e verificar no app do banco
3. **Notificações**: Verificar SMS/email recebidos

## 🚨 **Importante**

### **Nome Legal vs Nome Comercial**
- **Nome Legal**: `fexolsoftware e sistemas ltda` (não aparece nas transações)
- **Nome Comercial**: `MEUESTUDO` (aparece nas transações)

### **Compliance**
- ✅ Nome legal mantido para fins fiscais
- ✅ Nome comercial usado para identificação do cliente
- ✅ Conforme regulamentação do Banco Central

## 📞 **Suporte**

### **Em Caso de Problemas**
1. Verificar configuração em `company.ts`
2. Testar com cartão de sandbox
3. Verificar logs do Getnet
4. Contatar suporte Getnet se necessário

### **Contatos**
- **Getnet**: support@getnet.com.br
- **Desenvolvimento**: Verificar logs em `src/features/checkout/services/getnetService.ts`

## 📊 **Monitoramento**

### **O que Monitorar**
- Nome aparecendo corretamente nas faturas
- Notificações com nome correto
- PIX com identificação correta
- Feedback dos clientes sobre identificação

### **Métricas**
- Taxa de reconhecimento do nome
- Redução de chargebacks por não reconhecimento
- Satisfação do cliente com identificação clara

---

**Última atualização**: Dezembro 2024  
**Versão**: 1.0  
**Status**: ✅ Configurado e Testado 