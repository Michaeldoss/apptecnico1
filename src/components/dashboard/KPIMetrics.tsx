
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, RotateCcw, Star, DollarSign, Trophy, BarChart3 } from 'lucide-react';
import type { KPIMetrics } from '@/types/dashboard';

interface KPIMetricsProps {
  metrics: KPIMetrics;
}

const KPIMetricsComponent: React.FC<KPIMetricsProps> = ({ metrics }) => {
  const kpiItems = [
    {
      label: 'Serviços do Mês',
      value: metrics.totalServices,
      icon: Wrench,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      suffix: ''
    },
    {
      label: 'Taxa de Retorno',
      value: metrics.returnRate,
      icon: RotateCcw,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      suffix: '%'
    },
    {
      label: 'Avaliação Média',
      value: metrics.averageRating,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      suffix: '/5'
    },
    {
      label: 'Ticket Médio',
      value: metrics.averageTicket,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      prefix: 'R$ '
    },
    {
      label: 'Ranking',
      value: `${metrics.ranking}º`,
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      suffix: ' lugar'
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-indigo-600" />
          </div>
          Indicadores de Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 gap-4">
          {kpiItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${item.bgColor} shadow-sm`}>
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                  <p className={`text-lg font-bold ${item.color}`}>
                    {item.prefix}{item.value}{item.suffix}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIMetricsComponent;
