
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, User, Wallet } from 'lucide-react';
import { DashboardStats, WeeklyEarnings } from '@/types/dashboard';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface FinancialSummaryProps {
  stats: DashboardStats;
  weeklyEarnings: WeeklyEarnings[];
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ stats, weeklyEarnings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Ganhos do Mês */}
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">Ganhos do Mês</CardTitle>
          <DollarSign className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold text-green-600 mb-2">
            R$ {stats.monthlyEarnings.toFixed(2)}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            +{stats.weeklyGrowth}% vs semana anterior
          </div>
        </CardContent>
      </Card>

      {/* Pendente de Liberação */}
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">Pendente Liberação</CardTitle>
          <Wallet className="h-5 w-5 text-yellow-600" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold text-yellow-600 mb-2">
            R$ {stats.pendingEarnings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Liberação em 24-48h
          </p>
        </CardContent>
      </Card>

      {/* Top Cliente */}
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">Top Cliente</CardTitle>
          <User className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-lg font-bold text-blue-600 mb-2">
            {stats.topClient.name}
          </div>
          <p className="text-sm text-muted-foreground">
            R$ {stats.topClient.amount.toFixed(2)} este mês
          </p>
        </CardContent>
      </Card>

      {/* Gráfico Semanal */}
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Evolução Semanal</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col justify-between h-full">
          <div className="h-20 mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyEarnings}>
                <Bar dataKey="earnings" fill="#22c55e" radius={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Button size="sm" className="w-full" variant="outline">
            Solicitar Saque
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
