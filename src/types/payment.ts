export type PaymentStatus = 'pending' | 'paid' | 'retained' | 'released' | 'contested' | 'cancelled' | 'pendente' | 'pago' | 'retido' | 'liberado' | 'cancelado' | 'falhado';
export type ServicePaymentStatus = 'awaiting_technician' | 'in_progress' | 'awaiting_confirmation' | 'completed' | 'contested';

export interface Payment {
  id: number;
  serviceId: string;
  clientId: number;
  clientName: string;
  technicianId: number;
  amount: number;
  status: PaymentStatus;
  serviceStatus: ServicePaymentStatus;
  paymentMethod: 'pix' | 'credit_card' | 'debit_card' | 'bank_transfer';
  paidDate: string;
  expectedReleaseDate?: string;
  releasedDate?: string;
  transactionCode: string;
  contestReason?: string;
  serviceType: string;
  equipment: string;
}

export interface PaymentSummary {
  totalRetained: number;
  totalReleased: number;
  pendingRelease: number;
  monthlyEarnings: number;
  averageTicket: number;
  completedServices: number;
  clientsServed: number;
  satisfactionRate: number;
}

export interface MonthlyEarnings {
  month: string;
  retained: number;
  released: number;
}

export interface ServiceTypeEarnings {
  type: string;
  amount: number;
  count: number;
}

export interface Transacao {
  id: string;
  cliente_id: string;
  tecnico_id: string;
  servico_id: string;
  valor_total: number;
  status: PaymentStatus;
  meio_pagamento: 'pix' | 'boleto' | 'cartao_credito' | 'cartao_debito';
  data_pagamento?: string;
  data_liberacao?: string;
  comprovante_url?: string;
  mercadopago_payment_id?: string;
  mercadopago_preference_id?: string;
  created_at: string;
  updated_at: string;
}

export interface TecnicoPagamentoConfig {
  id: string;
  tecnico_id: string;
  mercadopago_access_token?: string;
  mercadopago_user_id?: string;
  conta_verificada: boolean;
  taxa_plataforma: number;
  created_at: string;
  updated_at: string;
}

export interface MercadoPagoPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

export interface CreatePaymentRequest {
  cliente_id: string;
  tecnico_id: string;
  servico_id: string;
  valor_total: number;
  meio_pagamento: 'pix' | 'boleto' | 'cartao_credito' | 'cartao_debito';
  descricao: string;
}