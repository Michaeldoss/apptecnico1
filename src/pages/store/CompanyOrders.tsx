import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  ShoppingBag, 
  Search, 
  ArrowLeft,
  Eye,
  Download,
  Filter,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  FileSpreadsheet,
  FileText,
  MapPin,
  CreditCard,
  Calendar
} from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from '@/hooks/use-toast';

const mockOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'João Silva',
    customerEmail: 'joao@empresa.com',
    date: '2024-03-15',
    status: 'completed',
    total: 1250.00,
    items: [
      { id: '8006', name: 'BOMBA DE TINTA 100/200ML', quantity: 2, price: 155.00 },
      { id: '8007', name: 'CABEÇA DE IMPRESSÃO TÉRMICA', quantity: 1, price: 320.00 },
      { id: '8010', name: 'MOTOR PASO A PASO NEMA 23', quantity: 1, price: 450.00 }
    ],
    paymentMethod: 'Cartão de Crédito',
    shippingAddress: 'Rua das Flores, 123 - São Paulo, SP'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Maria Oliveira',
    customerEmail: 'maria@tecnico.com',
    date: '2024-03-14',
    status: 'processing',
    total: 450.90,
    items: [
      { id: '8008', name: 'CORREIA DENTADA 150MM', quantity: 2, price: 89.90 },
      { id: '8009', name: 'SENSOR DE PROXIMIDADE', quantity: 1, price: 210.00 }
    ],
    paymentMethod: 'Pix',
    shippingAddress: 'Av. Industrial, 456 - Rio de Janeiro, RJ'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Carlos Santos',
    customerEmail: 'carlos@manutencao.com',
    date: '2024-03-13',
    status: 'shipped',
    total: 775.00,
    items: [
      { id: '8006', name: 'BOMBA DE TINTA 100/200ML', quantity: 5, price: 155.00 }
    ],
    paymentMethod: 'Boleto',
    shippingAddress: 'Rua da Oficina, 789 - Belo Horizonte, MG'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Ana Costa',
    customerEmail: 'ana@industria.com',
    date: '2024-03-12',
    status: 'pending',
    total: 320.00,
    items: [
      { id: '8007', name: 'CABEÇA DE IMPRESSÃO TÉRMICA', quantity: 1, price: 320.00 }
    ],
    paymentMethod: 'Transferência',
    shippingAddress: 'Zona Industrial, 321 - Salvador, BA'
  },
  {
    id: 'ORD-2024-005',
    customer: 'Pedro Lima',
    customerEmail: 'pedro@automatica.com',
    date: '2024-03-11',
    status: 'cancelled',
    total: 1350.00,
    items: [
      { id: '8010', name: 'MOTOR PASO A PASO NEMA 23', quantity: 3, price: 450.00 }
    ],
    paymentMethod: 'Cartão de Crédito',
    shippingAddress: 'Distrito Industrial, 654 - Fortaleza, CE'
  }
];

const CompanyOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const exportToExcel = () => {
    try {
      const dataToExport = filteredOrders.map(order => ({
        'ID do Pedido': order.id,
        'Cliente': order.customer,
        'Email': order.customerEmail,
        'Data': new Date(order.date).toLocaleDateString('pt-BR'),
        'Status': getStatusText(order.status),
        'Total': `R$ ${order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        'Pagamento': order.paymentMethod,
        'Endereço': order.shippingAddress,
        'Itens': order.items.map(item => `${item.name} (${item.quantity}x)`).join(', ')
      }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Pedidos');
      
      const colWidths = [
        { wch: 15 }, { wch: 20 }, { wch: 25 }, { wch: 12 }, { wch: 12 },
        { wch: 15 }, { wch: 18 }, { wch: 35 }, { wch: 50 }
      ];
      ws['!cols'] = colWidths;
      
      XLSX.writeFile(wb, `pedidos_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast({ title: 'Sucesso', description: 'Arquivo Excel exportado com sucesso!' });
    } catch (error) {
      toast({ title: 'Erro', description: 'Erro ao exportar arquivo Excel', variant: 'destructive' });
      console.error(error);
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(18);
      doc.text('Relatório de Pedidos', 14, 22);
      
      doc.setFontSize(10);
      doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 14, 30);
      
      doc.setFontSize(12);
      doc.text('Resumo:', 14, 40);
      doc.setFontSize(10);
      doc.text(`Total de Pedidos: ${filteredOrders.length}`, 14, 47);
      doc.text(`Pedidos Concluídos: ${filteredOrders.filter(o => o.status === 'completed').length}`, 14, 53);
      doc.text(`Receita Total: R$ ${filteredOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 14, 59);
      
      const tableData = filteredOrders.map(order => [
        order.id,
        order.customer,
        new Date(order.date).toLocaleDateString('pt-BR'),
        getStatusText(order.status),
        `R$ ${order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        order.paymentMethod
      ]);

      autoTable(doc, {
        startY: 70,
        head: [['ID', 'Cliente', 'Data', 'Status', 'Total', 'Pagamento']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10, fontStyle: 'bold' },
        styles: { fontSize: 9, cellPadding: 3 },
        columnStyles: {
          0: { cellWidth: 30 }, 1: { cellWidth: 40 }, 2: { cellWidth: 25 },
          3: { cellWidth: 25 }, 4: { cellWidth: 30 }, 5: { cellWidth: 30 }
        }
      });
      
      doc.save(`pedidos_${new Date().toISOString().split('T')[0]}.pdf`);
      toast({ title: 'Sucesso', description: 'Arquivo PDF exportado com sucesso!' });
    } catch (error) {
      toast({ title: 'Erro', description: 'Erro ao exportar arquivo PDF', variant: 'destructive' });
      console.error(error);
    }
  };

  const exportOrderToExcel = (order: typeof mockOrders[0]) => {
    try {
      const dataToExport = [
        { Campo: 'ID do Pedido', Valor: order.id },
        { Campo: 'Cliente', Valor: order.customer },
        { Campo: 'Email', Valor: order.customerEmail },
        { Campo: 'Data', Valor: new Date(order.date).toLocaleDateString('pt-BR') },
        { Campo: 'Status', Valor: getStatusText(order.status) },
        { Campo: 'Total', Valor: `R$ ${order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
        { Campo: 'Forma de Pagamento', Valor: order.paymentMethod },
        { Campo: 'Endereço de Entrega', Valor: order.shippingAddress },
      ];

      const itemsData = order.items.map(item => ({
        'Produto': item.name,
        'Quantidade': item.quantity,
        'Preço Unitário': `R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        'Subtotal': `R$ ${(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      }));

      const wb = XLSX.utils.book_new();
      const ws1 = XLSX.utils.json_to_sheet(dataToExport);
      const ws2 = XLSX.utils.json_to_sheet(itemsData);
      
      XLSX.utils.book_append_sheet(wb, ws1, 'Informações');
      XLSX.utils.book_append_sheet(wb, ws2, 'Itens');
      
      XLSX.writeFile(wb, `pedido_${order.id}.xlsx`);
      toast({ title: 'Sucesso', description: `Pedido ${order.id} exportado para Excel!` });
    } catch (error) {
      toast({ title: 'Erro', description: 'Erro ao exportar pedido', variant: 'destructive' });
      console.error(error);
    }
  };

  const exportOrderToPDF = (order: typeof mockOrders[0]) => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text('Detalhes do Pedido', 14, 22);
      
      doc.setFontSize(12);
      doc.text(`Pedido: ${order.id}`, 14, 35);
      doc.text(`Data: ${new Date(order.date).toLocaleDateString('pt-BR')}`, 14, 42);
      doc.text(`Status: ${getStatusText(order.status)}`, 14, 49);
      
      doc.setFontSize(14);
      doc.text('Informações do Cliente', 14, 60);
      doc.setFontSize(10);
      doc.text(`Nome: ${order.customer}`, 14, 68);
      doc.text(`Email: ${order.customerEmail}`, 14, 74);
      doc.text(`Endereço: ${order.shippingAddress}`, 14, 80);
      
      doc.setFontSize(14);
      doc.text('Itens do Pedido', 14, 92);
      
      const itemsData = order.items.map(item => [
        item.name,
        item.quantity.toString(),
        `R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        `R$ ${(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      ]);

      autoTable(doc, {
        startY: 98,
        head: [['Produto', 'Qtd', 'Preço Unit.', 'Subtotal']],
        body: itemsData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] },
      });
      
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.text(`Forma de Pagamento: ${order.paymentMethod}`, 14, finalY);
      doc.setFontSize(14);
      doc.text(`Total: R$ ${order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 14, finalY + 10);
      
      doc.save(`pedido_${order.id}.pdf`);
      toast({ title: 'Sucesso', description: `Pedido ${order.id} exportado para PDF!` });
    } catch (error) {
      toast({ title: 'Erro', description: 'Erro ao exportar pedido', variant: 'destructive' });
      console.error(error);
    }
  };

  const handleViewOrder = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'processing': return 'Processando';
      case 'shipped': return 'Enviado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'pending', label: 'Pendente' },
    { value: 'processing', label: 'Processando' },
    { value: 'shipped', label: 'Enviado' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Concluído</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Processando</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Enviado</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'shipped':
        return <Package className="h-4 w-4 text-purple-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const totalOrders = mockOrders.length;
  const completedOrders = mockOrders.filter(o => o.status === 'completed').length;
  const pendingOrders = mockOrders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const totalRevenue = mockOrders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

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
              <ShoppingBag className="h-10 w-10 text-yellow-300 mr-4" />
              <div>
                <h1 className="text-4xl font-black text-white">Pedidos</h1>
                <p className="text-blue-100 text-lg">Gerencie seus pedidos e vendas</p>
              </div>
            </div>
          </div>

          {/* Métricas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="h-5 w-5 text-yellow-300" />
                <div className="text-2xl font-bold text-white">{totalOrders}</div>
              </div>
              <div className="text-blue-100 text-sm">Total de Pedidos</div>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <div className="text-2xl font-bold text-white">{completedOrders}</div>
              </div>
              <div className="text-blue-100 text-sm">Pedidos Concluídos</div>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-300" />
                <div className="text-2xl font-bold text-white">{pendingOrders}</div>
              </div>
              <div className="text-blue-100 text-sm">Pedidos Pendentes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-300" />
                <div className="text-2xl font-bold text-white">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              </div>
              <div className="text-blue-100 text-sm">Receita Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filtros e busca */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por ID, cliente ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportToExcel} className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-green-600" />
                Exportar para Excel (.xlsx)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF} className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                Exportar para PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tabela de pedidos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Lista de Pedidos
            </CardTitle>
            <CardDescription>
              Visualize e gerencie todos os pedidos recebidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID do Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-gray-600">{order.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => exportOrderToExcel(order)}
                              className="flex items-center gap-2"
                            >
                              <FileSpreadsheet className="h-4 w-4 text-green-600" />
                              Excel (.xlsx)
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => exportOrderToPDF(order)}
                              className="flex items-center gap-2"
                            >
                              <FileText className="h-4 w-4 text-red-600" />
                              PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum pedido encontrado</h3>
                <p className="text-gray-600">Tente ajustar os filtros de busca.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de Visualização do Pedido */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Detalhes do Pedido</DialogTitle>
              <DialogDescription>
                Informações completas sobre o pedido {selectedOrder?.id}
              </DialogDescription>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                {/* Status e Data */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(selectedOrder.status)}
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedOrder.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                {/* Informações do Cliente */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Informações do Cliente</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm"><span className="font-medium">Nome:</span> {selectedOrder.customer}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <p className="text-sm flex-1"><span className="font-medium">Endereço:</span> {selectedOrder.shippingAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Itens do Pedido */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Itens do Pedido</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produto</TableHead>
                          <TableHead className="text-center">Qtd</TableHead>
                          <TableHead className="text-right">Preço Unit.</TableHead>
                          <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-right">
                              R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Resumo do Pagamento */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Forma de Pagamento:</span>
                    </div>
                    <span className="text-sm">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold mt-4 pt-4 border-t">
                    <span>Total do Pedido:</span>
                    <span className="text-blue-600">
                      R$ {selectedOrder.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => exportOrderToExcel(selectedOrder)}
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600" />
                    Exportar Excel
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => exportOrderToPDF(selectedOrder)}
                  >
                    <FileText className="h-4 w-4 mr-2 text-red-600" />
                    Exportar PDF
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyOrders;