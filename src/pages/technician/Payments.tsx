
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { usePayments } from '@/hooks/usePayments';
import PaymentSummaryComponent from '@/components/payments/PaymentSummary';
import PaymentCharts from '@/components/payments/PaymentCharts';
import PaymentTable from '@/components/payments/PaymentTable';

const TechnicianPayments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    payments,
    summary,
    monthlyEarnings,
    serviceTypeEarnings,
    isLoading,
    handleWithdraw,
    handleReleasePayment,
    handleContestPayment
  } = usePayments();

  const filteredPayments = payments.filter(payment =>
    payment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.serviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.transactionCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TechnicianLayout title="Pagamentos">
      <div className="space-y-6">
        {/* Informativo sobre intermediação */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            🛡️ Sistema de Intermediação de Pagamentos
          </h3>
          <p className="text-blue-700 text-sm mb-3">
            Todos os pagamentos ficam retidos em conta segura até a confirmação do serviço pelo cliente. 
            Isso garante proteção tanto para você quanto para o cliente.
          </p>
          <div className="flex gap-4 text-xs text-blue-600">
            <span>✓ Pagamento antecipado garantido</span>
            <span>✓ Liberação automática em 48h</span>
            <span>✓ Sistema de contestação</span>
            <span>✓ Saque imediato disponível</span>
          </div>
        </div>

        {/* Resumo Financeiro */}
        <PaymentSummaryComponent
          summary={summary}
          onWithdraw={handleWithdraw}
          isLoading={isLoading}
        />

        {/* Gráficos */}
        <PaymentCharts
          monthlyEarnings={monthlyEarnings}
          serviceTypeEarnings={serviceTypeEarnings}
        />

        {/* Busca e Filtros */}
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, O.S. ou código"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>

        {/* Tabela de Pagamentos */}
        <PaymentTable
          payments={filteredPayments}
          onReleasePayment={handleReleasePayment}
          onContestPayment={handleContestPayment}
        />
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianPayments;
