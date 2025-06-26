
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Payment, PaymentSummary, MonthlyEarnings, ServiceTypeEarnings } from '@/types/payment';

// Mock data para demonstração
const mockPayments: Payment[] = [
  {
    id: 1,
    serviceId: 'OS-001',
    clientId: 101,
    clientName: 'João Silva',
    technicianId: 1,
    amount: 250.00,
    status: 'released',
    serviceStatus: 'completed',
    paymentMethod: 'pix',
    paidDate: '2024-01-10',
    releasedDate: '2024-01-12',
    transactionCode: 'TXN-001-2024',
    serviceType: 'Manutenção',
    equipment: 'Plotter Eco Solvente'
  },
  {
    id: 2,
    serviceId: 'OS-002',
    clientId: 102,
    clientName: 'Maria Santos',
    technicianId: 1,
    amount: 180.00,
    status: 'retained',
    serviceStatus: 'awaiting_confirmation',
    paymentMethod: 'credit_card',
    paidDate: '2024-01-15',
    expectedReleaseDate: '2024-01-17',
    transactionCode: 'TXN-002-2024',
    serviceType: 'Orçamento',
    equipment: 'Plotter de Recorte'
  },
  {
    id: 3,
    serviceId: 'OS-003',
    clientId: 103,
    clientName: 'Pedro Costa',
    technicianId: 1,
    amount: 320.00,
    status: 'retained',
    serviceStatus: 'in_progress',
    paymentMethod: 'pix',
    paidDate: '2024-01-16',
    expectedReleaseDate: '2024-01-18',
    transactionCode: 'TXN-003-2024',
    serviceType: 'Instalação',
    equipment: 'CNC Router'
  },
  {
    id: 4,
    serviceId: 'OS-004',
    clientId: 104,
    clientName: 'Ana Ferreira',
    technicianId: 1,
    amount: 150.00,
    status: 'contested',
    serviceStatus: 'contested',
    paymentMethod: 'debit_card',
    paidDate: '2024-01-14',
    transactionCode: 'TXN-004-2024',
    contestReason: 'Serviço não foi executado conforme solicitado',
    serviceType: 'Visita Técnica',
    equipment: 'Impressora UV'
  }
];

const mockMonthlyEarnings: MonthlyEarnings[] = [
  { month: 'Nov', retained: 850, released: 1200 },
  { month: 'Dez', retained: 650, released: 1800 },
  { month: 'Jan', retained: 900, released: 1400 }
];

const mockServiceTypeEarnings: ServiceTypeEarnings[] = [
  { type: 'Manutenção', amount: 1250, count: 8 },
  { type: 'Instalação', amount: 980, count: 4 },
  { type: 'Orçamento', amount: 720, count: 12 },
  { type: 'Visita Técnica', amount: 450, count: 6 }
];

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<PaymentSummary>({
    totalRetained: 650.00,
    totalReleased: 900.00,
    pendingRelease: 500.00,
    monthlyEarnings: 1550.00,
    averageTicket: 225.00,
    completedServices: 15,
    clientsServed: 12,
    satisfactionRate: 4.8
  });

  const handleWithdraw = (amount: number) => {
    setIsLoading(true);
    
    // Simula processo de saque
    setTimeout(() => {
      setSummary(prev => ({
        ...prev,
        totalReleased: prev.totalReleased - amount,
        pendingRelease: prev.pendingRelease - amount
      }));
      
      toast({
        title: "Saque solicitado com sucesso!",
        description: `R$ ${amount.toFixed(2)} será transferido para sua conta em até 2 dias úteis.`,
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleReleasePayment = (paymentId: number) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId 
          ? { 
              ...payment, 
              status: 'released',
              serviceStatus: 'completed',
              releasedDate: new Date().toISOString().split('T')[0]
            }
          : payment
      )
    );

    toast({
      title: "Pagamento liberado!",
      description: "O valor foi creditado em sua conta.",
    });
  };

  const handleContestPayment = (paymentId: number, reason: string) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId 
          ? { 
              ...payment, 
              status: 'contested',
              serviceStatus: 'contested',
              contestReason: reason
            }
          : payment
      )
    );

    toast({
      title: "Contestação registrada",
      description: "O pagamento foi marcado como contestado e será analisado.",
      variant: "destructive"
    });
  };

  return {
    payments,
    summary,
    monthlyEarnings: mockMonthlyEarnings,
    serviceTypeEarnings: mockServiceTypeEarnings,
    isLoading,
    handleWithdraw,
    handleReleasePayment,
    handleContestPayment
  };
};
