
export type ServiceCallStatus = 
  | 'novos' 
  | 'pendentes' 
  | 'retornos' 
  | 'concluidos' 
  | 'cancelados' 
  | 'negociacao';

export interface ServiceCall {
  id: number;
  clientId: number;
  clientName: string;
  clientPhone: string;
  clientWhatsApp?: string;
  address: string;
  coordinates?: [number, number];
  scheduledDate: string;
  scheduledTime: string;
  serviceType: string;
  equipment: string;
  agreedValue: number;
  paymentMethod: 'pix' | 'credit_card' | 'debit_card' | 'balance';
  paymentStatus: 'awaiting' | 'retained' | 'released';
  status: ServiceCallStatus;
  clientNotes?: string;
  technicianNotes?: string;
  callHistory: ServiceCallHistoryItem[];
  timeline: ServiceTimelineItem[];
  negotiation?: {
    reason: string;
    messages: NegotiationMessage[];
    evidence: string[];
    status: 'pending' | 'resolved' | 'escalated';
  };
}

export interface ServiceCallHistoryItem {
  id: number;
  date: string;
  serviceType: string;
  status: ServiceCallStatus;
  value: number;
}

export interface ServiceTimelineItem {
  id: number;
  status: string;
  date: string;
  time: string;
  description: string;
  icon: string;
}

export interface NegotiationMessage {
  id: number;
  sender: 'client' | 'technician' | 'support';
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface ServiceFilters {
  search: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  city?: string;
  serviceType?: string;
  valueRange?: {
    min: number;
    max: number;
  };
}

export const statusConfig = {
  novos: {
    label: 'Novos',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: '🆕',
    bgColor: 'bg-blue-50'
  },
  pendentes: {
    label: 'Pendentes',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: '⏳',
    bgColor: 'bg-yellow-50'
  },
  retornos: {
    label: 'Retornos',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    icon: '🔄',
    bgColor: 'bg-orange-50'
  },
  concluidos: {
    label: 'Concluídos',
    color: 'bg-green-100 text-green-800 border-green-300',
    icon: '✅',
    bgColor: 'bg-green-50'
  },
  cancelados: {
    label: 'Cancelados',
    color: 'bg-gray-100 text-gray-800 border-gray-300',
    icon: '❌',
    bgColor: 'bg-gray-50'
  },
  negociacao: {
    label: 'Negociação',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: '🤝',
    bgColor: 'bg-purple-50'
  }
};
