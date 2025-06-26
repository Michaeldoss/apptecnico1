
export type PaymentStatus = 'pending' | 'paid' | 'retained' | 'released' | 'contested' | 'cancelled';
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
