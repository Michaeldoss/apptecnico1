
export interface ServiceOrderCompany {
  name: string;
  cnpj: string;
  ie?: string;
  address: string;
  phone: string;
  email?: string;
}

export interface ServiceOrderClient {
  name: string;
  document: string; // CNPJ ou CPF
  ie?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email?: string;
}

export interface ServiceOrderItem {
  id: string;
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface ServiceOrderAttachment {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export type ServiceOrderStatus = 'aberta' | 'em_andamento' | 'concluida' | 'cancelada' | 'em_negociacao';

export interface ServiceOrder {
  id: string;
  number: string; // OS #261532820
  status: ServiceOrderStatus;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  
  // Dados do cliente
  client: ServiceOrderClient;
  
  // Dados técnicos
  equipment: string;
  serialNumber?: string;
  manufactureNumber?: string;
  reportedProblem: string;
  technician: string;
  attendant: string;
  
  // Produtos/Serviços
  items: ServiceOrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentCondition: string;
  
  // Serviços realizados
  servicesPerformed: string;
  observations: string;
  
  // Assinatura
  clientSignature?: {
    signed: boolean;
    signedAt?: string;
    clientName?: string;
    signatureData?: string; // Base64 da assinatura
  };
  
  // Anexos
  attachments: ServiceOrderAttachment[];
  
  // Histórico
  history: {
    action: string;
    timestamp: string;
    user: string;
    details?: string;
  }[];
}
