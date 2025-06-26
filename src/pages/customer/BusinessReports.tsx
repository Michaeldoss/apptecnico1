
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, TrendingUp, DollarSign, Package, Wrench, Calendar } from 'lucide-react';

const CustomerBusinessReports = () => {
  const monthlyTrends = [
    { month: 'Jul', costs: 4200, services: 8 },
    { month: 'Ago', costs: 3800, services: 6 },
    { month: 'Set', costs: 5200, services: 12 },
    { month: 'Out', costs: 4900, services: 10 },
    { month: 'Nov', costs: 3600, services: 7 },
    { month: 'Dez', costs: 6200, services: 15 }
  ];

  const equipmentROI = [
    { equipment: 'DTF Epson', revenue: 15000, costs: 2850, profit: 12150 },
    { equipment: 'Sublimática', revenue: 22000, costs: 4200, profit: 17800 },
    { equipment: 'CNC Router', revenue: 8500, costs: 1650, profit: 6850 },
    { equipment: 'Prensa', revenue: 4200, costs: 850, profit: 3350 }
  ];

  const chartConfig = {
    costs: { label: "Custos" },
    services: { label: "Serviços" },
    profit: { label: "Lucro" },
    revenue: { label: "Receita" }
  };

  return (
    <div className="min-h-screen bg-blue-600">
      <CustomerLayout title="Relatórios Empresariais">
        <div className="space-y-6">
          {/* Botões de Exportação */}
          <Card className="bg-white/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Exportar Relatórios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Relatório Completo (PDF)
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Dados Financeiros (Excel)
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Análise de Peças (CSV)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tendências Mensais */}
          <Card className="bg-white/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Evolução de Custos vs Serviços - Últimos 6 Meses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="costs" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Custos (R$)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="services" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      name="Nº Serviços"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* ROI por Equipamento */}
          <Card className="bg-white/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                ROI por Equipamento - Análise de Rentabilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={equipmentROI}>
                    <XAxis dataKey="equipment" />
                    <YAxis tickFormatter={(value) => `R$ ${value}`} />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value) => [`R$ ${value}`, '']}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" name="Receita" />
                    <Bar dataKey="costs" fill="#ef4444" name="Custos" />
                    <Bar dataKey="profit" fill="#22c55e" name="Lucro Líquido" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Resumo Executivo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/95">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Economia Mensal</p>
                    <p className="text-2xl font-bold text-green-600">R$ 1.240</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Peças Otimizadas</p>
                    <p className="text-2xl font-bold text-blue-600">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Wrench className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Eficiência</p>
                    <p className="text-2xl font-bold text-purple-600">92%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Tempo Médio</p>
                    <p className="text-2xl font-bold text-orange-600">1.5h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CustomerLayout>
    </div>
  );
};

export default CustomerBusinessReports;
