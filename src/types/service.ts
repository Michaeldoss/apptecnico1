
export type ServiceStatus = 'pendente' | 'em andamento' | 'concluído' | 'cancelado';

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
}
