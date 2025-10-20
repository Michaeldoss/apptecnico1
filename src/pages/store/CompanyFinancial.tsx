import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardChart from '@/components/store/DashboardChart';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  BarChart3, 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Calendar,
  Download,
  Eye,
  Lock,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

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
    amount: 1250.00,
    type: 'credit',
    status: 'completed',
    method: 'Cartão de Crédito'
  },
  {
    id: 'TXN-002',
    date: '2024-03-14',
    description: 'Taxa de Plataforma',
    amount: -62.50,
    type: 'debit',
    status: 'completed',
    method: 'Débito Automático'
  },
  {
    id: 'TXN-003',
    date: '2024-03-13',
    description: 'Venda - Pedido ORD-2024-003',
    amount: 775.00,
    type: 'credit',
    status: 'processing',
    method: 'Pix'
  },
  {
    id: 'TXN-004',
    date: '2024-03-12',
    description: 'Estorno - Pedido ORD-2024-005',
    amount: -320.00,
    type: 'debit',
    status: 'completed',
    method: 'Transferência'
  },
];

const CompanyFinancial = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const { toast } = useToast();

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.receita, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.despesas, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  const pendingAmount = transactionHistory
    .filter(t => t.status === 'processing' && t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const availableBalance = transactionHistory
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : t.amount), 0);

  // Export functions
  const exportTransactionsToExcel = () => {
    const wsData = [
      ['ID', 'Data', 'Descrição', 'Valor', 'Tipo', 'Status', 'Método'],
      ...transactionHistory.map(t => [
        t.id,
        new Date(t.date).toLocaleDateString('pt-BR'),
        t.description,
        t.amount,
        t.type === 'credit' ? 'Crédito' : 'Débito',
        t.status === 'completed' ? 'Concluído' : 'Processando',
        t.method
      ])
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
      { wch: 18 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Transações');
    XLSX.writeFile(wb, `transacoes_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Exportado com sucesso",
      description: "Transações exportadas para Excel"
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
      body: transactionHistory.map(t => [
        t.id,
        new Date(t.date).toLocaleDateString('pt-BR'),
        t.description,
        `R$ ${Math.abs(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        t.type === 'credit' ? 'Crédito' : 'Débito',
        t.status === 'completed' ? 'Concluído' : 'Processando'
      ]),
      headStyles: { fillColor: [37, 99, 235] },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });

    doc.save(`transacoes_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "Exportado com sucesso",
      description: "Transações exportadas para PDF"
    });
  };

  const exportRevenueToExcel = () => {
    const wsData = [
      ['Mês', 'Receita', 'Despesas', 'Lucro'],
      ...revenueData.map(r => [
        r.name,
        r.receita,
        r.despesas,
        r.lucro
      ]),
      [],
      ['Total', totalRevenue, totalExpenses, totalProfit],
      ['Margem de Lucro', '', '', `${profitMargin}%`]
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    ws['!cols'] = [
      { wch: 10 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Receitas vs Despesas');
    XLSX.writeFile(wb, `receitas_despesas_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Exportado com sucesso",
      description: "Relatório de receitas exportado para Excel"
    });
  };

  const exportRevenueToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Receitas vs Despesas', 14, 22);
    doc.setFontSize(11);
    doc.text(`Período: Últimos 6 meses | Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 30);

    autoTable(doc, {
      startY: 35,
      head: [['Mês', 'Receita', 'Despesas', 'Lucro']],
      body: revenueData.map(r => [
        r.name,
        `R$ ${r.receita.toLocaleString('pt-BR')}`,
        `R$ ${r.despesas.toLocaleString('pt-BR')}`,
        `R$ ${r.lucro.toLocaleString('pt-BR')}`
      ]),
      headStyles: { fillColor: [37, 99, 235] },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      foot: [
        ['Total', `R$ ${totalRevenue.toLocaleString('pt-BR')}`, `R$ ${totalExpenses.toLocaleString('pt-BR')}`, `R$ ${totalProfit.toLocaleString('pt-BR')}`],
        ['Margem de Lucro', '', '', `${profitMargin}%`]
      ],
      footStyles: { fillColor: [229, 231, 235], textColor: [0, 0, 0], fontStyle: 'bold' }
    });

    doc.save(`receitas_despesas_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "Exportado com sucesso",
      description: "Relatório de receitas exportado para PDF"
    });
  };

  const exportCategoriesToExcel = () => {
    const wsData = [
      ['Categoria', 'Valor', 'Percentual'],
      ...categoryData.map(c => [
        c.name,
        c.valor,
        `${c.percentual}%`
      ]),
      [],
      ['Total', categoryData.reduce((sum, c) => sum + c.valor, 0), '100%']
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    ws['!cols'] = [
      { wch: 20 },
      { wch: 15 },
      { wch: 12 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Vendas por Categoria');
    XLSX.writeFile(wb, `vendas_categoria_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Exportado com sucesso",
      description: "Vendas por categoria exportadas para Excel"
    });
  };

  const exportCategoriesToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Vendas por Categoria', 14, 22);
    doc.setFontSize(11);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 30);

    autoTable(doc, {
      startY: 35,
      head: [['Categoria', 'Valor', 'Percentual']],
      body: categoryData.map(c => [
        c.name,
        `R$ ${c.valor.toLocaleString('pt-BR')}`,
        `${c.percentual}%`
      ]),
      headStyles: { fillColor: [37, 99, 235] },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      foot: [
        ['Total', `R$ ${categoryData.reduce((sum, c) => sum + c.valor, 0).toLocaleString('pt-BR')}`, '100%']
      ],
      footStyles: { fillColor: [229, 231, 235], textColor: [0, 0, 0], fontStyle: 'bold' }
    });

    doc.save(`vendas_categoria_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "Exportado com sucesso",
      description: "Vendas por categoria exportadas para PDF"
    });
  };

  const exportCompleteReportToExcel = () => {
    const wb = XLSX.utils.book_new();

    // Resumo Executivo
    const resumoData = [
      ['Relatório Financeiro Completo'],
      [`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`],
      [],
      ['Métrica', 'Valor'],
      ['Receita Total', totalRevenue],
      ['Despesas Totais', totalExpenses],
      ['Lucro Líquido', totalProfit],
      ['Margem de Lucro', `${profitMargin}%`],
      ['Saldo Disponível', availableBalance],
      ['Pagamentos Pendentes', pendingAmount]
    ];
    const wsResumo = XLSX.utils.aoa_to_sheet(resumoData);
    wsResumo['!cols'] = [{ wch: 25 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo');

    // Receitas vs Despesas
    const receitasData = [
      ['Mês', 'Receita', 'Despesas', 'Lucro'],
      ...revenueData.map(r => [r.name, r.receita, r.despesas, r.lucro])
    ];
    const wsReceitas = XLSX.utils.aoa_to_sheet(receitasData);
    XLSX.utils.book_append_sheet(wb, wsReceitas, 'Receitas e Despesas');

    // Categorias
    const categoriasData = [
      ['Categoria', 'Valor', 'Percentual'],
      ...categoryData.map(c => [c.name, c.valor, `${c.percentual}%`])
    ];
    const wsCategorias = XLSX.utils.aoa_to_sheet(categoriasData);
    XLSX.utils.book_append_sheet(wb, wsCategorias, 'Categorias');

    // Transações
    const transacoesData = [
      ['ID', 'Data', 'Descrição', 'Valor', 'Tipo', 'Status', 'Método'],
      ...transactionHistory.map(t => [
        t.id,
        new Date(t.date).toLocaleDateString('pt-BR'),
        t.description,
        t.amount,
        t.type === 'credit' ? 'Crédito' : 'Débito',
        t.status === 'completed' ? 'Concluído' : 'Processando',
        t.method
      ])
    ];
    const wsTransacoes = XLSX.utils.aoa_to_sheet(transacoesData);
    XLSX.utils.book_append_sheet(wb, wsTransacoes, 'Transações');

    XLSX.writeFile(wb, `relatorio_completo_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Exportado com sucesso",
      description: "Relatório completo exportado para Excel"
    });
  };

  const exportCompleteReportToPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // Título
    doc.setFontSize(20);
    doc.text('Relatório Financeiro Completo', 14, yPos);
    yPos += 10;
    doc.setFontSize(11);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, yPos);
    yPos += 10;

    // Resumo Executivo
    doc.setFontSize(14);
    doc.text('Resumo Executivo', 14, yPos);
    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [['Métrica', 'Valor']],
      body: [
        ['Receita Total', `R$ ${totalRevenue.toLocaleString('pt-BR')}`],
        ['Despesas Totais', `R$ ${totalExpenses.toLocaleString('pt-BR')}`],
        ['Lucro Líquido', `R$ ${totalProfit.toLocaleString('pt-BR')}`],
        ['Margem de Lucro', `${profitMargin}%`],
        ['Saldo Disponível', `R$ ${availableBalance.toLocaleString('pt-BR')}`],
        ['Pagamentos Pendentes', `R$ ${pendingAmount.toLocaleString('pt-BR')}`]
      ],
      headStyles: { fillColor: [37, 99, 235] },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });

    // Nova página - Receitas vs Despesas
    doc.addPage();
    yPos = 20;
    doc.setFontSize(14);
    doc.text('Receitas vs Despesas', 14, yPos);
    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [['Mês', 'Receita', 'Despesas', 'Lucro']],
      body: revenueData.map(r => [
        r.name,
        `R$ ${r.receita.toLocaleString('pt-BR')}`,
        `R$ ${r.despesas.toLocaleString('pt-BR')}`,
        `R$ ${r.lucro.toLocaleString('pt-BR')}`
      ]),
      headStyles: { fillColor: [37, 99, 235] },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });

    // Nova página - Vendas por Categoria
    doc.addPage();
    yPos = 20;
    doc.setFontSize(14);
    doc.text('Vendas por Categoria', 14, yPos);
    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [['Categoria', 'Valor', 'Percentual']],
      body: categoryData.map(c => [
        c.name,
        `R$ ${c.valor.toLocaleString('pt-BR')}`,
        `${c.percentual}%`
      ]),
      headStyles: { fillColor: [37, 99, 235] },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });

    doc.save(`relatorio_completo_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "Exportado com sucesso",
      description: "Relatório completo exportado para PDF"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/loja/dashboard" className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center">
              <BarChart3 className="h-10 w-10 text-yellow-300 mr-4" />
              <div>
                <h1 className="text-4xl font-black text-white">Financeiro</h1>
                <p className="text-blue-100 text-lg">Dashboard completo de receitas e despesas</p>
              </div>
            </div>
          </div>

          {/* Métricas principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-300" />
                <div className="text-2xl font-bold text-white">R$ {totalRevenue.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-blue-100 text-sm">Receita Total</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-4 w-4 text-green-300" />
                <span className="text-green-300 text-xs">+12.5% vs mês anterior</span>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-5 w-5 text-red-300" />
                <div className="text-2xl font-bold text-white">R$ {totalExpenses.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-blue-100 text-sm">Despesas Totais</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingDown className="h-4 w-4 text-red-300" />
                <span className="text-red-300 text-xs">-3.2% vs mês anterior</span>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-yellow-300" />
                <div className="text-2xl font-bold text-white">R$ {totalProfit.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-blue-100 text-sm">Lucro Líquido</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-300 text-xs">Margem: {profitMargin}%</span>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-blue-300" />
                <div className="text-2xl font-bold text-white">R$ {availableBalance.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-blue-100 text-sm">Saldo Disponível</div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4 text-yellow-300" />
                <span className="text-yellow-300 text-xs">R$ {pendingAmount.toLocaleString('pt-BR')} pendente</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="revenue">Receitas</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Receita vs Despesas */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Receitas vs Despesas
                    </CardTitle>
                    <CardDescription>
                      Comparativo dos últimos 6 meses
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={exportRevenueToExcel}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Exportar para Excel (.xlsx)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={exportRevenueToPDF}>
                        <FileText className="mr-2 h-4 w-4" />
                        Exportar para PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <DashboardChart 
                    data={revenueData} 
                    type="bar" 
                    dataKeys={['receita', 'despesas', 'lucro']}
                    height={300}
                  />
                </CardContent>
              </Card>

              {/* Vendas por Categoria */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Vendas por Categoria</CardTitle>
                    <CardDescription>
                      Distribuição de receita por categoria de produto
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={exportCategoriesToExcel}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Exportar para Excel (.xlsx)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={exportCategoriesToPDF}>
                        <FileText className="mr-2 h-4 w-4" />
                        Exportar para PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-blue-600" style={{backgroundColor: `hsl(${index * 60}, 70%, 50%)`}}></div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">R$ {category.valor.toLocaleString('pt-BR')}</div>
                          <div className="text-sm text-gray-600">{category.percentual}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Métricas adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Pagamentos Pendentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    R$ {pendingAmount.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-sm text-gray-600">
                    2 transações aguardando processamento
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Taxa de Conversão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    85.2%
                  </div>
                  <p className="text-sm text-gray-600">
                    Dos visitantes que fazem pedidos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    R$ 750,00
                  </div>
                  <p className="text-sm text-gray-600">
                    Valor médio por pedido
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Receitas</CardTitle>
                <CardDescription>
                  Detalhamento completo das receitas por período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardChart 
                  data={revenueData} 
                  type="area" 
                  dataKeys={['receita']}
                  height={400}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Histórico de Transações</CardTitle>
                  <CardDescription>
                    Últimas movimentações financeiras
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={exportTransactionsToExcel}>
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Exportar para Excel (.xlsx)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={exportTransactionsToPDF}>
                      <FileText className="mr-2 h-4 w-4" />
                      Exportar para PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionHistory.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? 
                            <TrendingUp className="h-4 w-4 text-green-600" /> : 
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          }
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('pt-BR')} • {transaction.method}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          {transaction.status === 'completed' ? 
                            <CheckCircle className="h-3 w-3 text-green-600" /> : 
                            <Clock className="h-3 w-3 text-yellow-600" />
                          }
                          <span className={transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}>
                            {transaction.status === 'completed' ? 'Concluído' : 'Processando'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Disponíveis</CardTitle>
                  <CardDescription>
                    Gere relatórios detalhados para análise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Relatório Completo
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      <DropdownMenuItem onClick={exportCompleteReportToExcel}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Exportar para Excel (.xlsx)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={exportCompleteReportToPDF}>
                        <FileText className="mr-2 h-4 w-4" />
                        Exportar para PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Receitas e Despesas
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      <DropdownMenuItem onClick={exportRevenueToExcel}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Exportar para Excel (.xlsx)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={exportRevenueToPDF}>
                        <FileText className="mr-2 h-4 w-4" />
                        Exportar para PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Extrato de Transações
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      <DropdownMenuItem onClick={exportTransactionsToExcel}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Exportar para Excel (.xlsx)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={exportTransactionsToPDF}>
                        <FileText className="mr-2 h-4 w-4" />
                        Exportar para PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Análise de Categorias
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      <DropdownMenuItem onClick={exportCategoriesToExcel}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Exportar para Excel (.xlsx)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={exportCategoriesToPDF}>
                        <FileText className="mr-2 h-4 w-4" />
                        Exportar para PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configurações Fiscais</CardTitle>
                  <CardDescription>
                    Gerencie informações tributárias
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">CNPJ Verificado</span>
                    </div>
                    <p className="text-sm text-gray-600">-</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">Nota Fiscal</span>
                    </div>
                    <p className="text-sm text-gray-600">Configure emissão automática</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyFinancial;