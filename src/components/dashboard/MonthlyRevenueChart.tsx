import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface MonthlyRevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface MonthlyRevenueChartProps {
  isNewUser?: boolean;
}

const MonthlyRevenueChart: React.FC<MonthlyRevenueChartProps> = ({ isNewUser = false }) => {
  // Dados vazios para novos usuários
  const emptyData: MonthlyRevenueData[] = [
    { month: 'Jan', revenue: 0, expenses: 0, profit: 0 },
    { month: 'Fev', revenue: 0, expenses: 0, profit: 0 },
    { month: 'Mar', revenue: 0, expenses: 0, profit: 0 },
    { month: 'Abr', revenue: 0, expenses: 0, profit: 0 },
    { month: 'Mai', revenue: 0, expenses: 0, profit: 0 },
    { month: 'Jun', revenue: 0, expenses: 0, profit: 0 },
  ];

  // Dados populados para usuários existentes
  const populatedData: MonthlyRevenueData[] = [
    { month: 'Jan', revenue: 4200, expenses: 1800, profit: 2400 },
    { month: 'Fev', revenue: 3800, expenses: 1600, profit: 2200 },
    { month: 'Mar', revenue: 5100, expenses: 2200, profit: 2900 },
    { month: 'Abr', revenue: 4600, expenses: 1900, profit: 2700 },
    { month: 'Mai', revenue: 5800, expenses: 2400, profit: 3400 },
    { month: 'Jun', revenue: 6200, expenses: 2600, profit: 3600 },
  ];

  const data = isNewUser ? emptyData : populatedData;

  const currentMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];
  const growthRate = previousMonth.revenue > 0 
    ? ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1)
    : '0.0';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground mb-2">{payload[0].payload.month}</p>
          <div className="space-y-1">
            <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              Receita: R$ {payload[0].value.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              Despesas: R$ {payload[1].value.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Lucro: R$ {payload[2].value.toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg font-bold">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Evolução de Faturamento
            </span>
          </CardTitle>
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-lg">
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {growthRate}% vs mês anterior
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
                formatter={(value) => {
                  const labels: Record<string, string> = {
                    revenue: 'Receita',
                    expenses: 'Despesas',
                    profit: 'Lucro'
                  };
                  return labels[value] || value;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={2}
                fill="url(#colorRevenue)" 
                name="revenue"
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="#f43f5e" 
                strokeWidth={2}
                fill="url(#colorExpenses)" 
                name="expenses"
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fill="url(#colorProfit)" 
                name="profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {isNewUser && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Comece a registrar seus serviços para ver o faturamento
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyRevenueChart;
