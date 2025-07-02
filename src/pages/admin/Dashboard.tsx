
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Users, 
  Wrench, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  Settings,
  BarChart3,
  FileText,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Package
} from 'lucide-react';

// Mock data
const mockStats = {
  totalTechnicians: 247,
  totalCustomers: 1456,
  totalRevenue: 125480.50,
  platformProfit: 18822.08,
  pendingPayments: 12,
  activeServices: 89
};

const mockRecentServices = [
  {
    id: 'OS-2024-001',
    technician: 'João Silva',
    customer: 'Empresa ABC Ltda',
    service: 'Manutenção Preventiva',
    value: 450.00,
    status: 'completed',
    date: '2024-03-15'
  },
  {
    id: 'OS-2024-002',
    technician: 'Maria Santos',
    customer: 'Indústria XYZ',
    service: 'Reparo Urgente',
    value: 780.00,
    status: 'in_progress',
    date: '2024-03-15'
  },
  {
    id: 'OS-2024-003',
    technician: 'Carlos Lima',
    customer: 'Fábrica 123',
    service: 'Instalação Equipamento',
    value: 1200.00,
    status: 'pending',
    date: '2024-03-14'
  }
];

const AdminDashboard = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Concluído</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Em Andamento</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <Settings className="h-10 w-10 text-blue-400 mr-4" />
            <div>
              <h1 className="text-4xl font-black text-white">Painel Administrativo</h1>
              <p className="text-gray-300 text-lg">Controle total da plataforma</p>
            </div>
          </div>

          {/* Métricas principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="h-5 w-5 text-blue-400" />
                <div className="text-2xl font-bold text-white">{mockStats.totalTechnicians}</div>
              </div>
              <div className="text-gray-300 text-sm">Técnicos Ativos</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-green-400" />
                <div className="text-2xl font-bold text-white">{mockStats.totalCustomers}</div>
              </div>
              <div className="text-gray-300 text-sm">Clientes Ativos</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-yellow-400" />
                <div className="text-2xl font-bold text-white">R$ {mockStats.totalRevenue.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-gray-300 text-sm">Receita Total</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <div className="text-2xl font-bold text-white">R$ {mockStats.platformProfit.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-gray-300 text-sm">Lucro Plataforma</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <div className="text-2xl font-bold text-white">{mockStats.pendingPayments}</div>
              </div>
              <div className="text-gray-300 text-sm">Pagamentos Pendentes</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-purple-400" />
                <div className="text-2xl font-bold text-white">{mockStats.activeServices}</div>
              </div>
              <div className="text-gray-300 text-sm">Serviços Ativos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Menu de acesso rápido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/admin/users" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  Gestão de Usuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Gerenciar técnicos, clientes e empresas</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/payments" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Pagamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Controlar transações e liberações</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/services" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wrench className="h-5 w-5 text-orange-600" />
                  Ordens de Serviço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Acompanhar chamados e OSs</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/reports" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Relatórios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Dashboards e análises</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Últimos serviços */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Últimos Serviços Executados
              </div>
              <Link to="/admin/services">
                <Button variant="outline" size="sm">Ver Todos</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>OS</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecentServices.map((service) => (
                  <TableRow key={service.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{service.id}</TableCell>
                    <TableCell>{service.technician}</TableCell>
                    <TableCell>{service.customer}</TableCell>
                    <TableCell>{service.service}</TableCell>
                    <TableCell className="font-semibold">
                      R$ {service.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>{getStatusBadge(service.status)}</TableCell>
                    <TableCell>{new Date(service.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
