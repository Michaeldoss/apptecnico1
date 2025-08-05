
import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
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
  const { user } = useAuth();
  const [isNewUser, setIsNewUser] = useState(false);

  // Verificar se é um usuário novo (sem dados)
  useEffect(() => {
    if (user) {
      // Para novos usuários, vamos mostrar dados vazios inicialmente
      const newUserEmails = ['comercial@dossgroup.com.br', 'dossgroupequipa@gmail.com'];
      setIsNewUser(newUserEmails.includes(user.email || ''));
    }
  }, [user]);

  // Dados vazios para usuários novos
  const emptyStats: DashboardStats = {
    monthlyEarnings: 0,
    pendingEarnings: 0,
    weeklyGrowth: 0,
    topClient: {
      name: 'Nenhum cliente ainda',
      amount: 0
    }
  };

  const emptyServiceMetrics: ServiceMetrics = {
    completedToday: 0,
    pending: 0,
    returns: 0,
    cancelled: 0,
    inNegotiation: 0
  };

  const emptyKpiMetrics: KPIMetrics = {
    totalServices: 0,
    returnRate: 0,
    averageRating: 0,
    averageTicket: 0,
    ranking: 0
  };

  const emptyWeeklyEarnings: WeeklyEarnings[] = [
    { week: 'Sem 1', earnings: 0 },
    { week: 'Sem 2', earnings: 0 },
    { week: 'Sem 3', earnings: 0 },
    { week: 'Sem 4', earnings: 0 }
  ];

  const emptyWeeklySchedule: WeeklySchedule[] = [
    { day: 'Seg', appointments: 0, conflicts: 0 },
    { day: 'Ter', appointments: 0, conflicts: 0 },
    { day: 'Qua', appointments: 0, conflicts: 0 },
    { day: 'Qui', appointments: 0, conflicts: 0 },
    { day: 'Sex', appointments: 0, conflicts: 0 },
    { day: 'Sáb', appointments: 0, conflicts: 0 },
    { day: 'Dom', appointments: 0, conflicts: 0 }
  ];

  const emptyStockItems: StockItem[] = [];
  const emptyAlerts: Alert[] = [];

  // Dados com conteúdo para usuários existentes
  const populatedStats: DashboardStats = {
    monthlyEarnings: 5450.00,
    pendingEarnings: 1200.00,
    weeklyGrowth: 15.5,
    topClient: {
      name: 'João Silva',
      amount: 850.00
    }
  };

  const populatedServiceMetrics: ServiceMetrics = {
    completedToday: 3,
    pending: 8,
    returns: 2,
    cancelled: 1,
    inNegotiation: 1
  };

  const populatedKpiMetrics: KPIMetrics = {
    totalServices: 45,
    returnRate: 8.5,
    averageRating: 4.8,
    averageTicket: 285.50,
    ranking: 3
  };

  // Escolher dados baseado se é usuário novo ou não
  const stats = isNewUser ? emptyStats : populatedStats;
  const serviceMetrics = isNewUser ? emptyServiceMetrics : populatedServiceMetrics;
  const kpiMetrics = isNewUser ? emptyKpiMetrics : populatedKpiMetrics;
  const weeklyEarnings = isNewUser ? emptyWeeklyEarnings : mockWeeklyEarnings;
  const weeklySchedule = isNewUser ? emptyWeeklySchedule : mockWeeklySchedule;
  const stockItems = isNewUser ? emptyStockItems : mockStockItems;
  const alerts = isNewUser ? emptyAlerts : mockAlerts;

  const urgentStockItems = useMemo(() => {
    return stockItems.filter(item => item.urgent || item.currentStock <= item.minStock);
  }, [stockItems]);

  const totalConflicts = useMemo(() => {
    return weeklySchedule.reduce((total, day) => total + day.conflicts, 0);
  }, [weeklySchedule]);

  const urgentAlerts = useMemo(() => {
    return alerts.filter(alert => alert.urgent);
  }, [alerts]);

  return {
    stats,
    weeklyEarnings,
    weeklySchedule,
    serviceMetrics,
    stockItems,
    urgentStockItems,
    kpiMetrics,
    alerts,
    urgentAlerts,
    totalConflicts,
    isNewUser  // Exposar se é usuário novo
  };
};
