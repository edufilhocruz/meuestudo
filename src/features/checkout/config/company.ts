// Configuração da empresa para transações
// Este arquivo centraliza o nome que aparece no cartão de crédito e faturas

export const COMPANY_CONFIG = {
  // Nome que aparece no cartão de crédito e faturas
  STATEMENT_DESCRIPTOR: 'MEUESTUDO',
  
  // Nome da empresa para notificações
  COMPANY_NAME: 'MEUESTUDO',
  
  // Nome legal da empresa (não aparece nas transações)
  LEGAL_NAME: 'fexolsoftware e sistemas ltda',
  
  // Configurações de transação
  TRANSACTION: {
    // Nome que aparece na fatura do cartão
    CARD_DESCRIPTOR: 'MEUESTUDO',
    
    // Nome que aparece no PIX
    PIX_DESCRIPTOR: 'MEUESTUDO',
    
    // Nome que aparece nas notificações push
    NOTIFICATION_NAME: 'MEUESTUDO',
  }
};

// Headers para configuração no Getnet
export const GETNET_HEADERS = {
  'X-Company-Name': COMPANY_CONFIG.COMPANY_NAME,
  'X-Statement-Descriptor': COMPANY_CONFIG.STATEMENT_DESCRIPTOR,
};

// Função para obter o nome da empresa baseado no tipo de transação
export function getCompanyName(type: 'card' | 'pix' | 'notification' = 'card'): string {
  switch (type) {
    case 'card':
      return COMPANY_CONFIG.TRANSACTION.CARD_DESCRIPTOR;
    case 'pix':
      return COMPANY_CONFIG.TRANSACTION.PIX_DESCRIPTOR;
    case 'notification':
      return COMPANY_CONFIG.TRANSACTION.NOTIFICATION_NAME;
    default:
      return COMPANY_CONFIG.STATEMENT_DESCRIPTOR;
  }
}

// Função para obter headers do Getnet
export function getGetnetHeaders(): Record<string, string> {
  return {
    'X-Company-Name': COMPANY_CONFIG.COMPANY_NAME,
    'X-Statement-Descriptor': COMPANY_CONFIG.STATEMENT_DESCRIPTOR,
  };
} 