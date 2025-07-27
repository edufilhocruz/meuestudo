// Serviço de Analytics para Tracking de Eventos do Checkout
// Integração com GA4, PostHog, Hotjar e outros provedores

interface TrackingEvent {
  eventName: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

interface CheckoutStep {
  step: string;
  stepNumber: number;
  timestamp: string;
}

class AnalyticsService {
  private sessionId: string;
  private checkoutSteps: CheckoutStep[] = [];
  private isInitialized: boolean = false;

  constructor() {
    this.sessionId = `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.initialize();
  }

  private initialize() {
    if (typeof window === 'undefined') return;

    // Inicializar GA4
    if ((window as any).gtag) {
      this.isInitialized = true;
      console.log('📊 Analytics inicializado: GA4');
    }

    // Inicializar PostHog (se disponível)
    if ((window as any).posthog) {
      console.log('📊 Analytics inicializado: PostHog');
    }

    // Inicializar Hotjar (se disponível)
    if ((window as any).hj) {
      console.log('📊 Analytics inicializado: Hotjar');
    }
  }

  // Tracking principal
  track(eventName: string, properties?: Record<string, any>) {
    const event: TrackingEvent = {
      eventName,
      properties: {
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
        ...properties,
      },
    };

    // Log local para desenvolvimento
    console.log('📊 Event:', event);

    // Enviar para GA4
    this.trackGA4(event);

    // Enviar para PostHog
    this.trackPostHog(event);

    // Enviar para Hotjar
    this.trackHotjar(event);

    // Salvar no localStorage para análise posterior
    this.saveEventLocally(event);
  }

  // Tracking específico do checkout
  trackCheckoutStep(step: string, stepNumber: number, properties?: Record<string, any>) {
    const checkoutStep: CheckoutStep = {
      step,
      stepNumber,
      timestamp: new Date().toISOString(),
    };

    this.checkoutSteps.push(checkoutStep);

    this.track('checkout_step', {
      step,
      step_number: stepNumber,
      total_steps: 4, // Formulário, Pagamento, Confirmação, Sucesso
      ...properties,
    });
  }

  // Tracking de cupom
  trackCouponApplied(code: string, discount: number) {
    this.track('coupon_applied', {
      coupon_code: code,
      discount_percentage: discount,
      discount_value: (49.80 * discount) / 100,
    });
  }

  // Tracking de erro
  trackError(errorType: string, errorMessage: string, properties?: Record<string, any>) {
    this.track('checkout_error', {
      error_type: errorType,
      error_message: errorMessage,
      ...properties,
    });
  }

  // Tracking de conversão
  trackConversion(orderData: any) {
    this.track('subscription_activated', {
      order_id: orderData.id,
      payment_id: orderData.paymentId,
      amount: orderData.total,
      payment_method: orderData.paymentMethod,
      has_coupon: !!orderData.appliedCoupon,
      coupon_code: orderData.appliedCoupon?.code,
      installments: orderData.customerInfo?.payment?.installments,
      customer_email: orderData.customerInfo?.personalInfo?.email,
      checkout_duration: this.calculateCheckoutDuration(),
      total_steps: this.checkoutSteps.length,
    });
  }

  // Tracking de abandono
  trackAbandonment(reason?: string) {
    this.track('checkout_abandoned', {
      reason,
      step_reached: this.checkoutSteps.length,
      last_step: this.checkoutSteps[this.checkoutSteps.length - 1]?.step,
      checkout_duration: this.calculateCheckoutDuration(),
    });
  }

  // GA4 Integration
  private trackGA4(event: TrackingEvent) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.eventName, {
        ...event.properties,
        custom_parameters: {
          session_id: this.sessionId,
        },
      });
    }
  }

  // PostHog Integration
  private trackPostHog(event: TrackingEvent) {
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture(event.eventName, {
        ...event.properties,
        session_id: this.sessionId,
      });
    }
  }

  // Hotjar Integration
  private trackHotjar(event: TrackingEvent) {
    if (typeof window !== 'undefined' && (window as any).hj) {
      (window as any).hj('event', {
        event_name: event.eventName,
        properties: event.properties,
      });
    }
  }

  // Salvar eventos localmente
  private saveEventLocally(event: TrackingEvent) {
    try {
      const events = JSON.parse(localStorage.getItem('checkout_events') || '[]');
      events.push(event);
      
      // Manter apenas os últimos 100 eventos
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem('checkout_events', JSON.stringify(events));
    } catch (error) {
      console.error('Erro ao salvar evento localmente:', error);
    }
  }

  // Calcular duração do checkout
  private calculateCheckoutDuration(): number {
    if (this.checkoutSteps.length < 2) return 0;
    
    const start = new Date(this.checkoutSteps[0].timestamp);
    const end = new Date(this.checkoutSteps[this.checkoutSteps.length - 1].timestamp);
    
    return Math.round((end.getTime() - start.getTime()) / 1000); // em segundos
  }

  // Obter relatório de eventos
  getEventsReport() {
    try {
      const events = JSON.parse(localStorage.getItem('checkout_events') || '[]');
      return {
        total_events: events.length,
        session_id: this.sessionId,
        checkout_steps: this.checkoutSteps,
        events: events.slice(-10), // últimos 10 eventos
      };
    } catch (error) {
      console.error('Erro ao obter relatório:', error);
      return null;
    }
  }

  // Limpar dados locais
  clearLocalData() {
    localStorage.removeItem('checkout_events');
    this.checkoutSteps = [];
  }
}

// Instância global do serviço
export const analyticsService = new AnalyticsService();

// Função helper para tracking rápido
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  analyticsService.track(eventName, properties);
};

// Função helper para tracking de erro
export const trackError = (errorType: string, errorMessage: string, properties?: Record<string, any>) => {
  analyticsService.trackError(errorType, errorMessage, properties);
};

// Função helper para tracking de conversão
export const trackConversion = (orderData: any) => {
  analyticsService.trackConversion(orderData);
};

// Função helper para tracking de abandono
export const trackAbandonment = (reason?: string) => {
  analyticsService.trackAbandonment(reason);
};

export default analyticsService; 