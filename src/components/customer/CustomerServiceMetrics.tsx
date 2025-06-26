
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  DollarSign
} from 'lucide-react';

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
  const metricCards = [
    {
      title: 'Serviços Ativos',
      value: metrics.activeServices,
      icon: Wrench,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Em andamento'
    },
    {
      title: 'Orçamentos Pendentes',
      value: metrics.pendingQuotes,
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Aguardando resposta'
    },
    {
      title: 'Concluídos no Mês',
      value: metrics.completedThisMonth,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Finalizados'
    },
    {
      title: 'Total Investido',
      value: `R$ ${metrics.totalSpent.toLocaleString('pt-BR')}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Este ano'
    },
    {
      title: 'Tempo Resposta',
      value: metrics.averageResponseTime,
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Média geral'
    },
    {
      title: 'Equipamentos',
      value: metrics.equipmentCount,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Cadastrados'
    }
  ];

  return (
    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
          <Wrench className="h-6 w-6 text-blue-600" />
          Métricas de Atendimento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metricCards.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow bg-white"
              >
                <div className={`p-3 rounded-full ${metric.bgColor} mb-3`}>
                  <IconComponent className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-gray-700 text-center mb-1">
                  {metric.title}
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {metric.description}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerServiceMetricsComponent;
