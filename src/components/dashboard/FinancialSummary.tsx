
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, User, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import type { DashboardStats, WeeklyEarnings } from '@/types/dashboard';

interface FinancialSummaryProps {
  stats: DashboardStats;
  weeklyEarnings: WeeklyEarnings[];
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ stats, weeklyEarnings }) => {
  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[120px]">
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-base font-semibold">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            Faturamento Mensal
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold text-green-600">
            R$ {stats.monthlyEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-base font-semibold">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-orange-600" />
            </div>
            Pendente Recebimento
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold text-orange-600">
            R$ {stats.pendingEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-base font-semibold">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            Crescimento Semanal
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold text-blue-600">
            +{stats.weeklyGrowth}%
          </div>
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-base font-semibold">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <User className="h-4 w-4 text-purple-600" />
            </div>
            Melhor Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-lg font-bold text-purple-600">
            {stats.topClient.name}
          </div>
          <div className="text-sm text-muted-foreground">
            R$ {stats.topClient.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
