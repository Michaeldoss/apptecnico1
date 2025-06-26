
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Package,
  Wrench,
  Truck,
  Shield,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FinancialBreakdown {
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

interface MostUsedPart {
  name: string;
  quantity: number;
  totalCost: number;
  equipment: string;
  lastUsed: string;
}

interface CustomerBusinessAnalyticsProps {
  financialBreakdown: FinancialBreakdown[];
  mostUsedParts: MostUsedPart[];
  equipmentCosts: { name: string; cost: number; parts: number; hours: number }[];
}

const CustomerBusinessAnalytics = ({
  financialBreakdown,
  mostUsedParts,
  equipmentCosts
}: CustomerBusinessAnalyticsProps) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Peças')) return <Package className="h-5 w-5" />;
    if (category.includes('Mão de Obra')) return <Wrench className="h-5 w-5" />;
    if (category.includes('Deslocamento')) return <Truck className="h-5 w-5" />;
    if (category.includes('Preventiva')) return <Shield className="h-5 w-5" />;
    return <DollarSign className="h-5 w-5" />;
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const chartConfig = {
    cost: { label: "Custo" },
    amount: { label: "Valor" }
  };

  return (
    <div className="space-y-6">
      {/* Análise de Custos Operacionais */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            Análise de Custos Operacionais - Dezembro 2024
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Breakdown detalhado dos seus investimentos em manutenção
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Pizza */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Distribuição de Custos</h4>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={financialBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                    >
                      {financialBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value) => [`R$ ${value}`, 'Valor']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            {/* Lista Detalhada */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Detalhamento por Categoria</h4>
              <div className="space-y-3">
                {financialBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg`} style={{ backgroundColor: COLORS[index % COLORS.length] + '20' }}>
                        {getCategoryIcon(item.category)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.category}</div>
                        <div className="text-sm text-gray-600">{item.percentage}% do total</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className="text-xs text-gray-500">vs mês anterior</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Peças Mais Utilizadas */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            Peças Mais Utilizadas - Controle de Estoque
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Identifique padrões de consumo para otimizar seu estoque
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mostUsedParts.map((part, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-gray-900">{part.name}</div>
                    <div className="text-sm text-gray-600 mb-1">
                      <strong>Equipamento:</strong> {part.equipment}
                    </div>
                    <div className="text-xs text-gray-500">
                      Última utilização: {part.lastUsed}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {part.quantity} unidades
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    R$ {part.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-500">
                    R$ {(part.totalCost / part.quantity).toFixed(2)} por unidade
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custos por Equipamento */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            Custos por Equipamento - ROI Analysis
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Compare os custos de manutenção entre suas máquinas
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={equipmentCosts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
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
                  formatter={(value, name) => {
                    if (name === 'cost') return [`R$ ${value}`, 'Custo Total'];
                    if (name === 'parts') return [`${value} peças`, 'Peças Utilizadas'];
                    if (name === 'hours') return [`${value}h`, 'Horas de Trabalho'];
                    return [value, name];
                  }}
                />
                <Bar dataKey="cost" fill="#8b5cf6" name="cost" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerBusinessAnalytics;
