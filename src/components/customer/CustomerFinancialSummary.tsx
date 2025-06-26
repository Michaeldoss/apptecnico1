
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DollarSign, TrendingUp, User, AlertCircle, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

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
  const chartConfig = {
    payments: {
      label: "Pagamentos",
      color: "#22c55e"
    }
  };

  return (
    <div className="space-y-6">
      {/* Cards de Resumo Financeiro */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">
              Total Investido Este Mês
            </CardTitle>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              R$ {stats.totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-green-600 font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +{stats.weeklyGrowth}% vs mês anterior
            </p>
            <p className="text-xs text-gray-500 mt-1">Valor total pago em serviços</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">
              Aguardando Liberação
            </CardTitle>
            <div className="p-2 bg-orange-100 rounded-full">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              R$ {stats.pendingPayments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-orange-600 font-medium">
              Pendente de aprovação
            </p>
            <p className="text-xs text-gray-500 mt-1">Valores retidos temporariamente</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">
              Evolução Semanal
            </CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">+{stats.weeklyGrowth}%</div>
            <p className="text-sm text-blue-600 font-medium">
              Crescimento constante
            </p>
            <p className="text-xs text-gray-500 mt-1">Comparado à semana passada</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">
              Técnico Principal
            </CardTitle>
            <div className="p-2 bg-purple-100 rounded-full">
              <User className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-gray-900 truncate mb-1">
              {stats.favoredTechnician.name}
            </div>
            <p className="text-sm text-purple-600 font-medium">
              R$ {stats.favoredTechnician.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500 mt-1">Seu técnico mais ativo</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Evolução de Pagamentos */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            Evolução dos Investimentos - Últimas 4 Semanas
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Acompanhe sua evolução de gastos com manutenção e serviços técnicos
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyPayments} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `R$ ${value}`}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`R$ ${value}`, 'Investimento']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar 
                  dataKey="payments" 
                  fill="#22c55e" 
                  radius={[4, 4, 0, 0]}
                  name="Investimento"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerFinancialSummary;
