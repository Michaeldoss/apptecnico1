
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  DollarSign,
  PieChart
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CustomerServiceMetrics {
  activeServices: number;
  pendingQuotes: number;
  completedThisMonth: number;
  totalSpent: number;
  averageResponseTime: string;
  equipmentCount: number;
}

interface CustomerServiceMetricsProps {
  metrics: CustomerServiceMetrics;
}

const CustomerServiceMetricsComponent = ({ metrics }: CustomerServiceMetricsProps) => {
  const serviceData = [
    { name: 'Ativos', value: metrics.activeServices, color: '#3b82f6' },
    { name: 'Concluídos', value: metrics.completedThisMonth, color: '#22c55e' },
    { name: 'Orçamentos', value: metrics.pendingQuotes, color: '#f59e0b' }
  ];

  const chartConfig = {
    value: {
      label: "Serviços"
    }
  };

  const metricCards = [
    {
      title: 'Serviços Ativos',
      value: metrics.activeServices,
      icon: Wrench,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Em andamento no momento'
    },
    {
      title: 'Orçamentos Pendentes',
      value: metrics.pendingQuotes,
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Aguardando sua aprovação'
    },
    {
      title: 'Finalizados no Mês',
      value: metrics.completedThisMonth,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Serviços concluídos'
    },
    {
      title: 'Investimento Total',
      value: `R$ ${metrics.totalSpent.toLocaleString('pt-BR')}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Gasto acumulado este ano'
    },
    {
      title: 'Tempo de Resposta',
      value: metrics.averageResponseTime,
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      description: 'Tempo médio de atendimento'
    },
    {
      title: 'Equipamentos Ativos',
      value: metrics.equipmentCount,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      description: 'Total em funcionamento'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cards de Métricas */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            Panorama dos Serviços
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Visão completa dos seus atendimentos e equipamentos
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {metricCards.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center p-4 rounded-xl border-2 ${metric.borderColor} ${metric.bgColor} hover:shadow-md transition-all duration-300 hover:scale-105`}
                >
                  <div className="p-3 bg-white rounded-full mb-3 shadow-sm">
                    <IconComponent className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 text-center mb-1">
                    {metric.title}
                  </div>
                  <div className="text-xs text-gray-500 text-center leading-tight">
                    {metric.description}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Distribuição de Serviços */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
            Distribuição dos Serviços
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Proporção entre serviços ativos, concluídos e orçamentos pendentes
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full lg:w-1/2">
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [`${value} serviços`, name]}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="w-full lg:w-1/2 space-y-3">
              {serviceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerServiceMetricsComponent;
