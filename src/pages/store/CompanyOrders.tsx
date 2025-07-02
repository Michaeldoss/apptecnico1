import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  DollarSign
} from 'lucide-react';

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

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
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
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyOrders;