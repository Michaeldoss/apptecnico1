
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Receipt, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CommissionData {
  servicesCompleted: number;
  appCommission: number;
  availableBalance: number;
  commissionRate: number;
}

interface CommissionSummaryProps {
  commissions: CommissionData;
}

const CommissionSummary: React.FC<CommissionSummaryProps> = ({ commissions }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return (value * 100).toFixed(0) + '%';
  };

  return (
    <Card className="border-2 border-gray-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-tech-primary" />
          <CardTitle className="text-lg">Suas Comissões (últimos 30 dias)</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Serviços Finalizados */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Serviços finalizados</span>
            </div>
            <p className="text-xl font-bold text-tech-primary">
              {formatCurrency(commissions.servicesCompleted)}
            </p>
          </div>

          {/* Comissão do App */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-gray-700">
                Comissão do app ({formatPercentage(commissions.commissionRate)})
              </span>
            </div>
            <p className="text-xl font-bold text-red-600">
              -{formatCurrency(commissions.appCommission)}
            </p>
          </div>

          {/* Saldo Disponível */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Seu saldo disponível</span>
            </div>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(commissions.availableBalance)}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <Link to="/tecnico/pagamentos">
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              Ver relatório completo
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionSummary;
