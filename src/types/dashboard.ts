
export interface DashboardStats {
  monthlyEarnings: number;
  pendingEarnings: number;
  weeklyGrowth: number;
  topClient: {
    name: string;
    amount: number;
  };
}

export interface WeeklySchedule {
  day: string;
  appointments: number;
  conflicts: number;
}

export interface ServiceMetrics {
  completedToday: number;
  pending: number;
  returns: number;
  cancelled: number;
  inNegotiation: number;
}

export interface StockItem {
  id: number;
  name: string;
  currentStock: number;
  minStock: number;
  urgent: boolean;
}

export interface KPIMetrics {
  totalServices: number;
  returnRate: number;
  averageRating: number;
  averageTicket: number;
  ranking: number;
}

export interface WeeklyEarnings {
  week: string;
  earnings: number;
}

export interface Alert {
  id: number;
  type: 'message' | 'stock' | 'schedule' | 'payment';
  title: string;
  description: string;
  urgent: boolean;
  time: string;
}
