
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, RotateCcw, XCircle, AlertCircle } from 'lucide-react';
import { ServiceMetrics } from '@/types/dashboard';

interface ServiceMetricsProps {
  metrics: ServiceMetrics;
}

const ServiceMetrics: React.FC<ServiceMetricsProps> = ({ metrics }) => {
  const statusItems = [
    {
      label: 'Concluídos Hoje',
      value: metrics.completedToday,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'Pendentes',
      value: metrics.pending,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      label: 'Retornos',
      value: metrics.returns,
      icon: RotateCcw,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      label: 'Cancelados',
      value: metrics.cancelled,
      icon: XCircle,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      label: 'Em Negociação',
      value: metrics.inNegotiation,
      icon: AlertCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chamados em Tempo Real</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
          {statusItems.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.label}
                className={`flex items-center justify-between p-3 rounded-lg border ${item.bgColor} ${item.borderColor}`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${item.color}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <Badge variant="secondary" className={item.color}>
                  {item.value}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceMetrics;
