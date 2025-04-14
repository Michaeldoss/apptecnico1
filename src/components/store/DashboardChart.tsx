
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  AreaChart,
  Area
} from 'recharts';

interface ChartDataItem {
  name: string;
  [key: string]: string | number;
}

interface DashboardChartProps {
  data: ChartDataItem[];
  type: 'bar' | 'line' | 'area';
  dataKeys: string[];
  colors?: string[];
  height?: number;
  title?: string;
  subtitle?: string;
}

const DashboardChart: React.FC<DashboardChartProps> = ({
  data,
  type,
  dataKeys,
  colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'],
  height = 300,
  title,
  subtitle
}) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '8px' }} />
            <Legend />
            {dataKeys.map((key, index) => (
              <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
            ))}
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '8px' }} />
            <Legend />
            {dataKeys.map((key, index) => (
              <Line 
                key={key} 
                type="monotone" 
                dataKey={key} 
                stroke={colors[index % colors.length]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '8px' }} />
            <Legend />
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.5}
              />
            ))}
          </AreaChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {title && <h4 className="text-lg font-medium">{title}</h4>}
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
