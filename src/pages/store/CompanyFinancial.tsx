import React, { useState } from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Lock,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const revenueData = [
  { name: 'Jan', receita: 12450, despesas: 3200, lucro: 9250 },
  { name: 'Fev', receita: 15600, despesas: 4100, lucro: 11500 },
  { name: 'Mar', receita: 18900, despesas: 4800, lucro: 14100 },
  { name: 'Abr', receita: 16780, despesas: 3900, lucro: 12880 },
  { name: 'Mai', receita: 21890, despesas: 5200, lucro: 16690 },
  { name: 'Jun', receita: 19500, despesas: 4600, lucro: 14900 },
];

const categoryData = [
  { name: 'Impressoras', valor: 45000, percentual: 35 },
  { name: 'Peças', valor: 32000, percentual: 25 },
  { name: 'Componentes', valor: 25600, percentual: 20 },
  { name: 'Sensores', valor: 16000, percentual: 12.5 },
  { name: 'Motores', valor: 9600, percentual: 7.5 },
];

const transactionHistory = [
  {
    id: 'TXN-001',
    date: '2024-03-15',
    description: 'Venda - Pedido ORD-2024-001',
    amount: 1250.0,
    type: 'credit',
    status: 'completed',
    method: 'Cartão de Crédito',
  },
  {
    id: 'TXN-002',
    date: '2024-03-14',
    description: 'Taxa de Plataforma',
    amount: -62.5,
    type: 'debit',
    status: 'completed',
    method: 'Débito Automático',
  },
  {
    id: 'TXN-003',
    date: '2024-03-13',
    description: 'Venda - Pedido ORD-2024-003',
    amount: 775.0,
    type: 'credit',
    status: 'processing',
    method: 'Pix',
  },
  {
    id: 'TXN-004',
    date: '2024-03-12',
    description: 'Estorno - Pedido ORD-2024-005',
    amount: -320.0,
    type: 'debit',
    status: 'completed',
    method: 'Transferência',
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

const CompanyFinancial = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const { toast } = useToast();

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.receita, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.despesas, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  const pendingAmount = transactionHistory
    .filter((transaction) => transaction.status === 'processing' && transaction.type === 'credit')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const availableBalance = transactionHistory
    .filter((transaction) => transaction.status === 'completed')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const exportTransactionsToExcel = () => {
    const wsData = [
      ['ID', 'Data', 'Descrição', 'Valor', 'Tipo', 'Status', 'Método'],
      ...transactionHistory.map((transaction) => [
        transaction.id,
        new Date(transaction.date).toLocaleDateString('pt-BR'),
        transaction.description,
        transaction.amount,
        transaction.type === 'credit' ? 'Crédito' : 'Débito',
        transaction.status === 'completed' ? 'Concluído' : 'Processando',
        transaction.method,
      ]),
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    ws['!cols'] = [
      { wch: 12 },
      { wch: 12 },
      { wch: 35 },
      { wch: 12 },
      { wch: 10 },
      { wch: 12 },
      { wch: 18 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Transações');
    XLSX.writeFile(wb, `transacoes_${new Date().toISOString().split('T')[0]}.xlsx`);

    toast({
      title: 'Exportado com sucesso',
      description: 'Transações exportadas para Excel',
    });
  };

  const exportTransactionsToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Histórico de Transações', 14, 22);
    doc.setFontSize(11);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 30);

    autoTable(doc, {
      startY: 35,
      head: [['ID', 'Data', 'Descrição', 'Valor', 'Tipo', 'Status']],
      body: transactionHistory.map((transaction) => [
        transaction.id,
        new Date(transaction.date).toLocaleDateString('pt-BR'),
        transaction.description,
        formatCurrency(Math.abs(transaction.amount)),
        transaction.type === 'credit' ? 'Crédito' : 'Débito',
        transaction.status === 'completed' ? 'Concluído' : 'Processando',
      ]),
      headStyles: { fillColor: [109, 40, 217] },
      alternateRowStyles: { fillColor: [245, 247, 250] },
    });

    doc.save(`transacoes_${new Date().toISOString().split('T')[0]}.pdf`);

    toast({
      title: 'Exportado com sucesso',
      description: 'Transações exportadas para PDF',
    });
  };

  const exportRevenueToExcel = () => {
    const wsData = [
      ['Mês', 'Receita', 'Despesas', 'Lucro'],
      ...revenueData.map((row) => [row.name, row.receita, row.despesas, row.lucro]),
      [],
      ['Total', totalRevenue, totalExpenses, totalProfit],
      ['Margem de Lucro', '', '', `${profitMargin}%`],
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    ws['!cols'] = [{ wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];

    XLSX.utils.book_append_sheet(wb, ws, 'Receitas vs Despesas');
    XLSX.writeFile(wb, `receitas_despesas_${new Date().toISOString().split('T')[0]}.xlsx`);

    toast({
      title: 'Exportado com sucesso',
      description: 'Relatório financeiro exportado para Excel',
    });
  };

  const exportRevenueToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Receitas vs Despesas', 14, 22);
    doc.setFontSize(11);
    doc.text(
      `Período: Últimos 6 meses | Gerado em: ${new Date().toLocaleDateString('pt-BR')}`,
      14,
      30
    );

    autoTable(doc, {
      startY: 35,
      head: [['Mês', 'Receita', 'Despesas', 'Lucro']],
      body: revenueData.map((row) => [
        row.name,
        formatCurrency(row.receita),
        formatCurrency(row.despesas),
        formatCurrency(row.lucro),
      ]),
      headStyles: { fillColor: [109, 40, 217] },
    });

    doc.save(`receitas_despesas_${new Date().toISOString().split('T')[0]}.pdf`);

    toast({
      title: 'Exportado com sucesso',
      description: 'Relatório financeiro exportado para PDF',
    });
  };

  const getTransactionBadge = (status: string) => {
    if (status === 'completed') {
      return (
        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
          Concluído
        </Badge>
      );
    }

    return (
      <Badge className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
        Processando
      </Badge>
    );
  };

  const metricCards = [
    {
      label: 'Receita total',
      value: formatCurrency(totalRevenue),
      description: 'Últimos 6 meses',
      icon: TrendingUp,
    },
    {
      label: 'Lucro líquido',
      value: formatCurrency(totalProfit),
      description: `${profitMargin}% de margem`,
      icon: Wallet,
    },
    {
      label: 'Saldo disponível',
      value: formatCurrency(availableBalance),
      description: 'Valores liberados',
      icon: CheckCircle,
    },
    {
      label: 'A receber',
      value: formatCurrency(pendingAmount),
      description: 'Em processamento',
      icon: Clock,
    },
  ];

  return (
    <StoreLayout
      title="Financeiro"
      subtitle="Acompanhe receitas, repasses, saldo disponível, transações e desempenho financeiro da loja."
      action={
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            onClick={exportTransactionsToPDF}
          >
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>

          <Button
            className="bg-white text-violet-950 hover:bg-violet-100"
            onClick={exportTransactionsToExcel}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-2xl font-black text-slate-950">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{metric.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <Lock className="mt-0.5 h-5 w-5 text-emerald-700" />
              <div>
                <p className="font-black text-emerald-950">Pagamento protegido</p>
                <p className="text-sm text-emerald-800">
                  Os valores ficam registrados e podem ser acompanhados por status de liberação.
                </p>
              </div>
            </div>

            <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
              Solicitar repasse
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-5">
          <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl bg-slate-100 p-1">
            <TabsTrigger
              value="overview"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Visão geral
            </TabsTrigger>

            <TabsTrigger
              value="transactions"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Transações
            </TabsTrigger>

            <TabsTrigger
              value="categories"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Categorias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <CardTitle className="text-slate-950">Receitas vs despesas</CardTitle>
                    <CardDescription>
                      Acompanhe a evolução financeira dos últimos meses.
                    </CardDescription>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={selectedPeriod}
                      onChange={(event) => setSelectedPeriod(event.target.value)}
                      className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-violet-200"
                    >
                      <option value="6months">Últimos 6 meses</option>
                      <option value="12months">Últimos 12 meses</option>
                      <option value="year">Este ano</option>
                    </select>

                    <Button variant="outline" className="border-slate-200" onClick={exportRevenueToPDF}>
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {revenueData.slice(-3).map((row) => (
                    <Card key={row.name} className="border-slate-200 bg-slate-50">
                      <CardContent className="p-5">
                        <p className="text-sm font-bold text-slate-500">{row.name}</p>
                        <p className="mt-2 text-xl font-black text-slate-950">
                          {formatCurrency(row.receita)}
                        </p>
                        <div className="mt-3 space-y-1 text-sm">
                          <div className="flex justify-between text-slate-600">
                            <span>Despesas</span>
                            <span>{formatCurrency(row.despesas)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-emerald-700">
                            <span>Lucro</span>
                            <span>{formatCurrency(row.lucro)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <CardTitle className="text-slate-950">Histórico de transações</CardTitle>
                    <CardDescription>
                      Entradas, saídas, taxas, estornos e valores em processamento.
                    </CardDescription>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-slate-200"
                      onClick={exportTransactionsToPDF}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      PDF
                    </Button>

                    <Button
                      className="bg-violet-700 text-white hover:bg-violet-800"
                      onClick={exportTransactionsToExcel}
                    >
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Excel
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-black uppercase tracking-wide text-slate-500">
                    <div className="col-span-2">Data</div>
                    <div className="col-span-4">Descrição</div>
                    <div className="col-span-2">Método</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Valor</div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {transactionHistory.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="grid grid-cols-12 items-center px-4 py-4 text-sm hover:bg-violet-50/40"
                      >
                        <div className="col-span-2 text-slate-600">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </div>

                        <div className="col-span-4">
                          <p className="font-bold text-slate-950">{transaction.description}</p>
                          <p className="text-xs text-slate-500">{transaction.id}</p>
                        </div>

                        <div className="col-span-2 text-slate-600">{transaction.method}</div>

                        <div className="col-span-2">{getTransactionBadge(transaction.status)}</div>

                        <div
                          className={`col-span-2 flex items-center justify-end gap-1 text-right font-black ${
                            transaction.amount >= 0 ? 'text-emerald-700' : 'text-red-700'
                          }`}
                        >
                          {transaction.amount >= 0 ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-950">Receita por categoria</CardTitle>
                <CardDescription>
                  Distribuição de faturamento por tipo de produto.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="font-black text-slate-950">{category.name}</p>
                        <p className="text-sm text-slate-500">
                          {category.percentual}% do faturamento
                        </p>
                      </div>

                      <p className="font-black text-slate-950">{formatCurrency(category.valor)}</p>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-violet-700"
                        style={{ width: `${category.percentual}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StoreLayout>
  );
};

export default CompanyFinancial;
