import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Target } from 'lucide-react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface PerformanceData {
  metric: string;
  value: number;
  target: number;
}

interface PerformanceAnalysisChartProps {
  isNewUser?: boolean;
}

const PerformanceAnalysisChart: React.FC<PerformanceAnalysisChartProps> = ({ isNewUser = false }) => {
  // Dados vazios para novos usuários
  const emptyData: PerformanceData[] = [
    { metric: 'Qualidade', value: 0, target: 100 },
    { metric: 'Pontualidade', value: 0, target: 100 },
    { metric: 'Atendimento', value: 0, target: 100 },
    { metric: 'Resolução', value: 0, target: 100 },
    { metric: 'Comunicação', value: 0, target: 100 },
    { metric: 'Organização', value: 0, target: 100 },
  ];

  // Dados populados para usuários existentes
  const populatedData: PerformanceData[] = [
    { metric: 'Qualidade', value: 92, target: 100 },
    { metric: 'Pontualidade', value: 88, target: 100 },
    { metric: 'Atendimento', value: 95, target: 100 },
    { metric: 'Resolução', value: 85, target: 100 },
    { metric: 'Comunicação', value: 90, target: 100 },
    { metric: 'Organização', value: 87, target: 100 },
  ];

  const data = isNewUser ? emptyData : populatedData;

  // Calcular média de performance
  const averagePerformance = data.reduce((sum, item) => sum + item.value, 0) / data.length;
  const performanceLevel = averagePerformance >= 90 ? 'Excelente' : 
                          averagePerformance >= 75 ? 'Muito Bom' :
                          averagePerformance >= 60 ? 'Bom' : 'Em Desenvolvimento';
  
  const performanceColor = averagePerformance >= 90 ? 'text-emerald-600 dark:text-emerald-400' : 
                          averagePerformance >= 75 ? 'text-blue-600 dark:text-blue-400' :
                          averagePerformance >= 60 ? 'text-amber-600 dark:text-amber-400' : 
                          'text-rose-600 dark:text-rose-400';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground mb-2">{payload[0].payload.metric}</p>
          <div className="space-y-1">
            <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Atual: {payload[0].value}%
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              Meta: {payload[1].value}%
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Análise de Performance
            </span>
          </CardTitle>
          <div className="flex items-center gap-2 bg-violet-50 dark:bg-violet-950/30 px-3 py-1.5 rounded-lg">
            <Target className={`h-4 w-4 ${performanceColor}`} />
            <span className={`text-sm font-semibold ${performanceColor}`}>
              {averagePerformance.toFixed(0)}% - {performanceLevel}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                iconType="circle"
                formatter={(value) => {
                  const labels: Record<string, string> = {
                    value: 'Performance Atual',
                    target: 'Meta'
                  };
                  return labels[value] || value;
                }}
              />
              <Radar 
                name="value" 
                dataKey="value" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Radar 
                name="target" 
                dataKey="target" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.2}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {isNewUser && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Complete serviços e receba avaliações para ver sua performance
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalysisChart;
