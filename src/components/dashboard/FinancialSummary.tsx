
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
    <div className="grid lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950 dark:to-emerald-900/50 border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-sm font-semibold text-foreground">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            Faturamento Mensal
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            R$ {stats.monthlyEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950 dark:to-amber-900/50 border-amber-200 dark:border-amber-800 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-sm font-semibold text-foreground">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            Pendente Recebimento
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            R$ {stats.pendingEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900/50 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-sm font-semibold text-foreground">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            Crescimento Semanal
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            +{stats.weeklyGrowth}%
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-950 dark:to-violet-900/50 border-violet-200 dark:border-violet-800 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-sm font-semibold text-foreground">
            <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center shadow-md">
              <User className="h-5 w-5 text-white" />
            </div>
            Melhor Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl font-bold text-violet-600 dark:text-violet-400">
            {stats.topClient.name}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            R$ {stats.topClient.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
