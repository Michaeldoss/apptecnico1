
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Payment, PaymentSummary, MonthlyEarnings, ServiceTypeEarnings } from '@/types/payment';

// Dados limpos - array vazio
const mockPayments: Payment[] = [];

const mockMonthlyEarnings: MonthlyEarnings[] = [];

const mockServiceTypeEarnings: ServiceTypeEarnings[] = [];

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
