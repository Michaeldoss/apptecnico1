
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, User, AlertCircle } from 'lucide-react';

interface CustomerStats {
  totalPaid: number;
  pendingPayments: number;
  weeklyGrowth: number;
  favoredTechnician: {
    name: string;
    amount: number;
  };
}

interface CustomerFinancialSummaryProps {
  stats: CustomerStats;
  weeklyPayments: { week: string; payments: number }[];
}

const CustomerFinancialSummary = ({ stats, weeklyPayments }: CustomerFinancialSummaryProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Pago no Mês
          </CardTitle>
          <DollarSign className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            R$ {stats.totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-green-600 font-medium mt-1">
            +{stats.weeklyGrowth}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Pagamentos Pendentes
          </CardTitle>
          <AlertCircle className="h-5 w-5 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            R$ {stats.pendingPayments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-orange-600 font-medium mt-1">
            Aguardando liberação
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Crescimento Semanal
          </CardTitle>
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">+{stats.weeklyGrowth}%</div>
          <p className="text-xs text-blue-600 font-medium mt-1">
            Comparado à semana anterior
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Técnico Preferido
          </CardTitle>
          <User className="h-5 w-5 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-gray-900 truncate">
            {stats.favoredTechnician.name}
          </div>
          <p className="text-xs text-purple-600 font-medium mt-1">
            R$ {stats.favoredTechnician.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} este mês
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerFinancialSummary;
