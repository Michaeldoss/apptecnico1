
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MonthlyEarnings, ServiceTypeEarnings } from '@/types/payment';

interface PaymentChartsProps {
  monthlyEarnings: MonthlyEarnings[];
  serviceTypeEarnings: ServiceTypeEarnings[];
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const PaymentCharts: React.FC<PaymentChartsProps> = ({
  monthlyEarnings,
  serviceTypeEarnings
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Faturamento Mensal</CardTitle>
          <CardDescription>
            Comparativo entre valores retidos e liberados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyEarnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, '']} />
                <Bar dataKey="retained" fill="#f59e0b" name="Retido" />
                <Bar dataKey="released" fill="#22c55e" name="Liberado" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ganhos por Tipo de Serviço</CardTitle>
          <CardDescription>
            Distribuição de receita por categoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceTypeEarnings}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, amount }) => `${type}: R$ ${amount}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {serviceTypeEarnings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`R$ ${value}`, 'Valor']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCharts;
