import { useState, useMemo } from 'react';

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

const mockEquipment: Equipment[] = [
  {
    id: 1,
    type: 'DTF',
    brand: 'Epson',
    model: 'F570',
    status: 'active',
    location: 'Galpão Principal',
    lastMaintenance: '15/12/2024',
    totalCost: 2850.00,
    partsUsed: 12,
    laborHours: 8,
    mostUsedPart: 'Cabeçote DX5',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop',
    serialNumber: 'EP-F570-2024-001',
    purchaseDate: '15/03/2024',
    serviceOrders: [
      {
        id: '1',
        number: 'OS-001',
        date: '15/12/2024',
        technician: 'Carlos Silva',
        status: 'concluida',
        problem: 'Entupimento nos bicos',
        solution: 'Limpeza completa do sistema de tinta',
        parts: ['Cabeçote DX5', 'Damper'],
        cost: 450.00
      },
      {
        id: '2',
        number: 'OS-002',
        date: '20/11/2024',
        technician: 'Ana Santos',
        status: 'concluida',
        problem: 'Problema na alimentação de papel',
        solution: 'Troca dos rolos de alimentação',
        parts: ['Rolo Alimentador'],
        cost: 180.00
      }
    ]
  },
  {
    id: 2,
    type: 'Sublimática',
    brand: 'Roland',
    model: 'RT-640',
    status: 'maintenance',
    location: 'Sala 2',
    lastMaintenance: '10/12/2024',
    totalCost: 4200.00,
    partsUsed: 18,
    laborHours: 12,
    mostUsedPart: 'Damper',
    image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop',
    serialNumber: 'RL-RT640-2024-002',
    purchaseDate: '10/01/2024',
    serviceOrders: [
      {
        id: '3',
        number: 'OS-003',
        date: '10/12/2024',
        technician: 'Roberto Lima',
        status: 'em_andamento',
        problem: 'Falha na impressão de cores',
        parts: ['Damper', 'Mangueira de Tinta'],
        cost: 680.00
      }
    ]
  },
  {
    id: 3,
    type: 'CNC Router',
    brand: 'Laguna',
    model: 'IQ HTS',
    status: 'active',
    location: 'Oficina',
    lastMaintenance: '08/12/2024',
    totalCost: 1650.00,
    partsUsed: 6,
    laborHours: 4,
    mostUsedPart: 'Broca Router',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    serialNumber: 'LG-IQHTS-2024-003',
    purchaseDate: '05/02/2024',
    serviceOrders: [
      {
        id: '4',
        number: 'OS-004',
        date: '08/12/2024',
        technician: 'Marcos Oliveira',
        status: 'concluida',
        problem: 'Desgaste nas brocas',
        solution: 'Troca completa do conjunto de brocas',
        parts: ['Broca Router', 'Mandril'],
        cost: 320.00
      }
    ]
  },
  {
    id: 4,
    type: 'Prensa Térmica',
    brand: 'Hotronix',
    model: 'Auto Open',
    status: 'active',
    location: 'Acabamento',
    lastMaintenance: '20/11/2024',
    totalCost: 850.00,
    partsUsed: 3,
    laborHours: 2,
    mostUsedPart: 'Resistência',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    serialNumber: 'HT-AO-2024-004',
    purchaseDate: '25/04/2024',
    serviceOrders: [
      {
        id: '5',
        number: 'OS-005',
        date: '20/11/2024',
        technician: 'Patricia Costa',
        status: 'concluida',
        problem: 'Aquecimento irregular',
        solution: 'Substituição da resistência principal',
        parts: ['Resistência'],
        cost: 150.00
      }
    ]
  }
];

const mockFinancialBreakdown: FinancialBreakdown[] = [
  { category: 'Peças e Componentes', amount: 4850.00, percentage: 45, trend: 'up' },
  { category: 'Mão de Obra', amount: 3200.00, percentage: 30, trend: 'stable' },
  { category: 'Deslocamento', amount: 1450.00, percentage: 13, trend: 'down' },
  { category: 'Manutenção Preventiva', amount: 1300.00, percentage: 12, trend: 'up' }
];

const mockMostUsedParts: MostUsedPart[] = [
  { name: 'Cabeçote DX5', quantity: 8, totalCost: 1600.00, equipment: 'DTF Epson F570', lastUsed: '15/12/2024' },
  { name: 'Damper Epson', quantity: 12, totalCost: 960.00, equipment: 'Sublimática Roland', lastUsed: '12/12/2024' },
  { name: 'Correia Motor', quantity: 6, totalCost: 720.00, equipment: 'CNC Router', lastUsed: '08/12/2024' },
  { name: 'Resistência 220V', quantity: 4, totalCost: 320.00, equipment: 'Prensa Térmica', lastUsed: '05/12/2024' },
  { name: 'Sensor Papel', quantity: 3, totalCost: 450.00, equipment: 'DTF Epson F570', lastUsed: '10/12/2024' }
];

export const useCustomerDashboard = () => {
  const [stats] = useState<CustomerStats>({
    totalPaid: 10800.00,
    pendingPayments: 1850.00,
    weeklyGrowth: 8.5,
    favoredTechnician: {
      name: 'Carlos Silva',
      amount: 4200.00
    },
    monthlyOperatingCosts: 3600.00,
    averageCallCost: 275.00
  });

  const [serviceMetrics] = useState<CustomerServiceMetrics>({
    activeServices: 3,
    pendingQuotes: 2,
    completedThisMonth: 12,
    totalSpent: 28950,
    averageResponseTime: '1h 45min',
    equipmentCount: 4,
    emergencyCalls: 5,
    preventiveMaintenance: 7
  });

  const weeklyPayments = [
    { week: 'Sem 1', payments: 2400 },
    { week: 'Sem 2', payments: 3200 },
    { week: 'Sem 3', payments: 2850 },
    { week: 'Sem 4', payments: 3350 }
  ];

  const equipmentCosts = mockEquipment.map(eq => ({
    name: eq.type,
    cost: eq.totalCost,
    parts: eq.partsUsed,
    hours: eq.laborHours
  }));

  return {
    stats,
    serviceMetrics,
    equipment: mockEquipment,
    weeklyPayments,
    financialBreakdown: mockFinancialBreakdown,
    mostUsedParts: mockMostUsedParts,
    equipmentCosts
  };
};
