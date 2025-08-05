import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface CustomerStats {
  totalPaid: number;
  pendingPayments: number;
  weeklyGrowth: number;
  favoredTechnician: {
    name: string;
    amount: number;
  };
  monthlyOperatingCosts: number;
  averageCallCost: number;
}

interface CustomerServiceMetrics {
  activeServices: number;
  pendingQuotes: number;
  completedThisMonth: number;
  totalSpent: number;
  averageResponseTime: string;
  equipmentCount: number;
  emergencyCalls: number;
  preventiveMaintenance: number;
}

interface ServiceOrder {
  id: string;
  number: string;
  date: string;
  technician: string;
  status: 'aberta' | 'em_andamento' | 'concluida' | 'cancelada';
  problem: string;
  solution?: string;
  parts: string[];
  cost: number;
}

interface Equipment {
  id: number;
  type: string;
  brand: string;
  model: string;
  status: 'active' | 'maintenance' | 'inactive';
  location: string;
  lastMaintenance: string;
  totalCost: number;
  partsUsed: number;
  laborHours: number;
  mostUsedPart: string;
  image?: string;
  serialNumber: string;
  purchaseDate: string;
  serviceOrders: ServiceOrder[];
}

interface FinancialBreakdown {
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

interface MostUsedPart {
  name: string;
  quantity: number;
  totalCost: number;
  equipment: string;
  lastUsed: string;
}

const mockEquipment: Equipment[] = [];

const mockFinancialBreakdown: FinancialBreakdown[] = [];

const mockMostUsedParts: MostUsedPart[] = [];

export const useCustomerDashboard = () => {
  const { user } = useAuth();
  const [isNewUser, setIsNewUser] = useState(false);

  // Verificar se é um usuário novo (sem dados)
  useEffect(() => {
    // Para novos usuários, vamos mostrar dados vazios inicialmente
    // TODO: Implementar verificação real do banco de dados
    if (user) {
      // Por enquanto, considerar usuários específicos como "novos"
      const newUserEmails = ['comercial@dossgroup.com.br', 'dossgroupequipa@gmail.com'];
      setIsNewUser(newUserEmails.includes(user.email || ''));
    }
  }, [user]);

  // Dados vazios para usuários novos
  const emptyStats: CustomerStats = {
    totalPaid: 0,
    pendingPayments: 0,
    weeklyGrowth: 0,
    favoredTechnician: {
      name: 'Nenhum técnico ainda',
      amount: 0
    },
    monthlyOperatingCosts: 0,
    averageCallCost: 0
  };

  const emptyServiceMetrics: CustomerServiceMetrics = {
    activeServices: 0,
    pendingQuotes: 0,
    completedThisMonth: 0,
    totalSpent: 0,
    averageResponseTime: '--',
    equipmentCount: 0,
    emergencyCalls: 0,
    preventiveMaintenance: 0
  };

  const emptyWeeklyPayments = [
    { week: 'Sem 1', payments: 0 },
    { week: 'Sem 2', payments: 0 },
    { week: 'Sem 3', payments: 0 },
    { week: 'Sem 4', payments: 0 }
  ];

  const emptyFinancialBreakdown: FinancialBreakdown[] = [
    { category: 'Peças e Componentes', amount: 0, percentage: 0, trend: 'stable' },
    { category: 'Mão de Obra', amount: 0, percentage: 0, trend: 'stable' },
    { category: 'Deslocamento', amount: 0, percentage: 0, trend: 'stable' },
    { category: 'Manutenção Preventiva', amount: 0, percentage: 0, trend: 'stable' }
  ];

  const emptyMostUsedParts: MostUsedPart[] = [];

  // Dados com conteúdo para usuários existentes  
  const populatedStats: CustomerStats = {
    totalPaid: 10800.00,
    pendingPayments: 1850.00,
    weeklyGrowth: 8.5,
    favoredTechnician: {
      name: 'Carlos Silva',
      amount: 4200.00
    },
    monthlyOperatingCosts: 3600.00,
    averageCallCost: 275.00
  };

  const populatedServiceMetrics: CustomerServiceMetrics = {
    activeServices: 3,
    pendingQuotes: 2,
    completedThisMonth: 12,
    totalSpent: 28950,
    averageResponseTime: '1h 45min',
    equipmentCount: 4,
    emergencyCalls: 5,
    preventiveMaintenance: 7
  };

  const populatedWeeklyPayments = [
    { week: 'Sem 1', payments: 2400 },
    { week: 'Sem 2', payments: 3200 },
    { week: 'Sem 3', payments: 2850 },
    { week: 'Sem 4', payments: 3350 }
  ];

  // Escolher dados baseado se é usuário novo ou não
  const stats = isNewUser ? emptyStats : populatedStats;
  const serviceMetrics = isNewUser ? emptyServiceMetrics : populatedServiceMetrics;
  const weeklyPayments = isNewUser ? emptyWeeklyPayments : populatedWeeklyPayments;
  const equipment = isNewUser ? [] : mockEquipment;
  const financialBreakdown = isNewUser ? emptyFinancialBreakdown : mockFinancialBreakdown;
  const mostUsedParts = isNewUser ? emptyMostUsedParts : mockMostUsedParts;

  const equipmentCosts = equipment.map(eq => ({
    name: eq.type,
    cost: eq.totalCost,
    parts: eq.partsUsed,
    hours: eq.laborHours
  }));

  // New function to get equipment by ID
  const getEquipmentById = (id: number) => {
    return equipment.find(eq => eq.id === id);
  };

  // New function to get service orders by equipment
  const getServiceOrdersByEquipment = (equipmentId: number) => {
    const foundEquipment = getEquipmentById(equipmentId);
    return foundEquipment ? foundEquipment.serviceOrders : [];
  };

  return {
    stats,
    serviceMetrics,
    equipment,
    weeklyPayments,
    financialBreakdown,
    mostUsedParts,
    equipmentCosts,
    getEquipmentById,
    getServiceOrdersByEquipment,
    isNewUser  // Exposar se é usuário novo para componentes que precisem
  };
};
