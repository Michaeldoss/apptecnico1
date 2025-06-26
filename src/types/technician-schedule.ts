
export type AppointmentStatus = 'pendente' | 'confirmado' | 'cancelado' | 'concluido';
export type ServiceType = 'visita_tecnica' | 'orcamento' | 'instalacao' | 'manutencao';
export type ViewMode = 'monthly' | 'weekly' | 'daily';

export interface TechnicianAppointment {
  id: number;
  clientId: number;
  clientName: string;
  clientPhone: string;
  clientWhatsApp?: string;
  address: string;
  coordinates?: [number, number];
  serviceType: ServiceType;
  equipment: string;
  estimatedValue?: number;
  clientNotes?: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  technicianId: number;
  checkedIn?: boolean;
  checkedOut?: boolean;
  checkinTime?: string;
  checkoutTime?: string;
  previousServices?: TechnicianAppointment[];
}

export interface DailyWorkload {
  date: string;
  appointments: TechnicianAppointment[];
  totalAppointments: number;
  estimatedDuration: number;
  suggestedRoute?: string;
}

export interface ScheduleFilters {
  serviceType?: ServiceType;
  status?: AppointmentStatus;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
