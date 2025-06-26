
import { useState, useMemo } from 'react';

interface CustomerStats {
  totalPaid: number;
  pendingPayments: number;
  weeklyGrowth: number;
  favoredTechnician: {
    name: string;
    amount: number;
  };
}

interface CustomerServiceMetrics {
  activeServices: number;
  pendingQuotes: number;
  completedThisMonth: number;
  totalSpent: number;
  averageResponseTime: string;
  equipmentCount: number;
}

interface Equipment {
  id: number;
  type: string;
  brand: string;
  model: string;
  status: 'active' | 'maintenance' | 'inactive';
  location: string;
  lastMaintenance: string;
}

const mockEquipment: Equipment[] = [
  {
    id: 1,
    type: 'DTF',
    brand: 'Epson',
    model: 'F570',
    status: 'active',
    location: 'Galpão Principal',
    lastMaintenance: '15/12/2024'
  },
  {
    id: 2,
    type: 'Sublimática',
    brand: 'Roland',
    model: 'RT-640',
    status: 'maintenance',
    location: 'Sala 2',
    lastMaintenance: '10/12/2024'
  },
  {
    id: 3,
    type: 'CNC Router',
    brand: 'Laguna',
    model: 'IQ HTS',
    status: 'active',
    location: 'Oficina',
    lastMaintenance: '08/12/2024'
  },
  {
    id: 4,
    type: 'Prensa Térmica',
    brand: 'Hotronix',
    model: 'Auto Open',
    status: 'active',
    location: 'Acabamento',
    lastMaintenance: '20/11/2024'
  }
];

export const useCustomerDashboard = () => {
  const [stats] = useState<CustomerStats>({
    totalPaid: 3250.00,
    pendingPayments: 850.00,
    weeklyGrowth: 12.5,
    favoredTechnician: {
      name: 'Carlos Silva',
      amount: 1200.00
    }
  });

  const [serviceMetrics] = useState<CustomerServiceMetrics>({
    activeServices: 2,
    pendingQuotes: 3,
    completedThisMonth: 8,
    totalSpent: 15750,
    averageResponseTime: '2h 30min',
    equipmentCount: 4
  });

  const weeklyPayments = [
    { week: 'Sem 1', payments: 800 },
    { week: 'Sem 2', payments: 1200 },
    { week: 'Sem 3', payments: 950 },
    { week: 'Sem 4', payments: 1450 }
  ];

  return {
    stats,
    serviceMetrics,
    equipment: mockEquipment,
    weeklyPayments
  };
};
