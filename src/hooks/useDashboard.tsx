
import { useState, useMemo } from 'react';
import { DashboardStats, WeeklySchedule, ServiceMetrics, StockItem, KPIMetrics, WeeklyEarnings, Alert } from '@/types/dashboard';

const mockWeeklyEarnings: WeeklyEarnings[] = [
  { week: 'Sem 1', earnings: 1200 },
  { week: 'Sem 2', earnings: 1450 },
  { week: 'Sem 3', earnings: 1680 },
  { week: 'Sem 4', earnings: 1850 },
];

const mockWeeklySchedule: WeeklySchedule[] = [
  { day: 'Seg', appointments: 4, conflicts: 0 },
  { day: 'Ter', appointments: 6, conflicts: 1 },
  { day: 'Qua', appointments: 3, conflicts: 0 },
  { day: 'Qui', appointments: 5, conflicts: 0 },
  { day: 'Sex', appointments: 4, conflicts: 0 },
  { day: 'Sáb', appointments: 2, conflicts: 0 },
  { day: 'Dom', appointments: 1, conflicts: 0 },
];

const mockStockItems: StockItem[] = [
  { id: 1, name: 'TPU para Plotter', currentStock: 3, minStock: 10, urgent: true },
  { id: 2, name: 'Tinta Eco Solvente', currentStock: 8, minStock: 15, urgent: false },
  { id: 3, name: 'Cabos USB', currentStock: 2, minStock: 20, urgent: true },
  { id: 4, name: 'Fita Transfer', currentStock: 12, minStock: 8, urgent: false },
];

const mockAlerts: Alert[] = [
  {
    id: 1,
    type: 'message',
    title: '3 mensagens não lidas',
    description: 'Clientes aguardando resposta',
    urgent: true,
    time: '2 min atrás'
  },
  {
    id: 2,
    type: 'stock',
    title: 'Estoque baixo',
    description: 'TPU e cabos USB precisam reposição',
    urgent: true,
    time: '1 hora atrás'
  },
  {
    id: 3,
    type: 'schedule',
    title: 'Conflito de agenda',
    description: 'Terça-feira com sobreposição',
    urgent: false,
    time: '3 horas atrás'
  }
];

export const useDashboard = () => {
  const [stats] = useState<DashboardStats>({
    monthlyEarnings: 5450.00,
    pendingEarnings: 1200.00,
    weeklyGrowth: 15.5,
    topClient: {
      name: 'João Silva',
      amount: 850.00
    }
  });

  const [serviceMetrics] = useState<ServiceMetrics>({
    completedToday: 3,
    pending: 8,
    returns: 2,
    cancelled: 1,
    inNegotiation: 1
  });

  const [kpiMetrics] = useState<KPIMetrics>({
    totalServices: 45,
    returnRate: 8.5,
    averageRating: 4.8,
    averageTicket: 285.50,
    ranking: 3
  });

  const urgentStockItems = useMemo(() => {
    return mockStockItems.filter(item => item.urgent || item.currentStock <= item.minStock);
  }, []);

  const totalConflicts = useMemo(() => {
    return mockWeeklySchedule.reduce((total, day) => total + day.conflicts, 0);
  }, []);

  const urgentAlerts = useMemo(() => {
    return mockAlerts.filter(alert => alert.urgent);
  }, []);

  return {
    stats,
    weeklyEarnings: mockWeeklyEarnings,
    weeklySchedule: mockWeeklySchedule,
    serviceMetrics,
    stockItems: mockStockItems,
    urgentStockItems,
    kpiMetrics,
    alerts: mockAlerts,
    urgentAlerts,
    totalConflicts
  };
};
