
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, RotateCcw, Star, DollarSign, Trophy } from 'lucide-react';
import { KPIMetrics } from '@/types/dashboard';

interface KPIMetricsProps {
  metrics: KPIMetrics;
}

const KPIMetrics: React.FC<KPIMetricsProps> = ({ metrics }) => {
  const kpiItems = [
    {
      label: 'Serviços do Mês',
      value: metrics.totalServices,
      icon: Wrench,
      color: 'text-blue-600',
      suffix: ''
    },
    {
      label: 'Taxa de Retorno',
      value: metrics.returnRate,
      icon: RotateCcw,
      color: 'text-orange-600',
      suffix: '%'
    },
    {
      label: 'Avaliação Média',
      value: metrics.averageRating,
      icon: Star,
      color: 'text-yellow-600',
      suffix: '/5'
    },
    {
      label: 'Ticket Médio',
      value: metrics.averageTicket,
      icon: DollarSign,
      color: 'text-green-600',
      prefix: 'R$ '
    },
    {
      label: 'Ranking',
      value: `${metrics.ranking}º`,
      icon: Trophy,
      color: 'text-purple-600',
      suffix: ' lugar'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores de Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kpiItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Icon className={`h-5 w-5 ${item.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className={`font-bold ${item.color}`}>
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

export default KPIMetrics;
