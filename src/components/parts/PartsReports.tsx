
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, TrendingUp, Package, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

const PartsReports = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const stockTurnoverData = [
    { name: 'Capping DX5', vendas: 8, valor: 2400 },
    { name: 'Damper Epson', vendas: 12, valor: 1920 },
    { name: 'Correia Motor', vendas: 6, valor: 1200 },
    { name: 'Placa Principal', vendas: 3, valor: 1350 },
    { name: 'Sensor Papel', vendas: 2, valor: 320 }
  ];

  const profitData = [
    { name: 'Cabeçote', lucro: 3200, custo: 2100 },
    { name: 'Damper', lucro: 1920, custo: 780 },
    { name: 'Correia', lucro: 1200, custo: 660 },
    { name: 'Placa', lucro: 1350, custo: 900 },
    { name: 'Sensor', lucro: 320, custo: 195 }
  ];

  const categoryDistribution = [
    { name: 'Cabeçote', value: 35, color: '#8884d8' },
    { name: 'Damper', value: 25, color: '#82ca9d' },
    { name: 'Correia', value: 20, color: '#ffc658' },
    { name: 'Placa', value: 12, color: '#ff7300' },
    { name: 'Outros', value: 8, color: '#0088fe' }
  ];

  const summaryStats = {
    totalParts: 147,
    totalValue: 28450.00,
    monthlyProfit: 8990.00,
    lowStockItems: 8
  };

  const exportReport = (type: 'pdf' | 'excel') => {
    console.log(`Exportando relatório em ${type}...`);
  };

  return (
    <div className="space-y-6">
      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total de Peças</p>
                <p className="text-2xl font-bold">{summaryStats.totalParts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">{formatCurrency(summaryStats.totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Lucro Mensal</p>
                <p className="text-2xl font-bold">{formatCurrency(summaryStats.monthlyProfit)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                <p className="text-2xl font-bold text-red-600">{summaryStats.lowStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles de Exportação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Relatórios e Exportação
          </CardTitle>
          <CardDescription>
            Exporte dados detalhados do seu estoque e movimentações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportReport('excel')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar Excel
            </Button>
            <Button variant="outline" onClick={() => exportReport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="turnover" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="turnover">Giro de Estoque</TabsTrigger>
          <TabsTrigger value="profit">Análise de Lucro</TabsTrigger>
          <TabsTrigger value="distribution">Distribuição</TabsTrigger>
        </TabsList>
        
        <TabsContent value="turnover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Peças com Maior Giro (Últimos 30 dias)</CardTitle>
              <CardDescription>
                Ranking das peças mais vendidas e seu faturamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockTurnoverData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'vendas' ? `${value} unidades` : formatCurrency(Number(value)),
                      name === 'vendas' ? 'Vendas' : 'Faturamento'
                    ]}
                  />
                  <Bar dataKey="vendas" fill="#8884d8" name="vendas" />
                  <Bar dataKey="valor" fill="#82ca9d" name="valor" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Lucro por Categoria</CardTitle>
              <CardDescription>
                Comparação entre custo e lucro por categoria de peças
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="custo" fill="#ffc658" name="Custo" />
                  <Bar dataKey="lucro" fill="#82ca9d" name="Lucro" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Categoria</CardTitle>
              <CardDescription>
                Percentual de peças por categoria no estoque
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartsReports;
