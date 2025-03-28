
export type ServiceStatus = 'pendente' | 'em andamento' | 'concluído' | 'cancelado';
export type PaymentStatus = 'aguardando' | 'pago' | 'parcial' | 'cancelado';

export interface ServiceTracking {
  checkedIn: boolean;
  checkedOut: boolean;
  checkinTime?: string;
  checkoutTime?: string;
  location?: string;
}

export interface Service {
  id: number;
  client: string;
  type: string;
  description: string;
  status: ServiceStatus;
  date: string;
  address: string;
  price: string;
  tracking?: ServiceTracking;
  clientId?: number;
  serviceOrderId?: number;
  payment?: {
    status: PaymentStatus;
    method?: string;
    date?: string;
  };
}

export interface ServiceOrder {
  id: number;
  number: string;
  serviceId: number;
  createdAt: string;
  completedAt?: string;
  materials?: {
    id: number;
    name: string;
    quantity: number;
    price: string;
  }[];
  laborHours?: number;
  technicalReport?: string;
  clientSignature?: boolean;
}
