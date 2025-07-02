import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Wrench, 
  ArrowLeft,
  Search,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';

// Mock data para ordens de serviço
const mockServices = [
  {
    id: 'OS-2024-001',
    cliente: 'Empresa ABC Ltda',
    tecnico: 'João Silva',
    tipo_servico: 'Manutenção Preventiva',
    descricao: 'Manutenção preventiva em equipamentos industriais',
    valor: 450.00,
    status: 'completed',
    prioridade: 'normal',
    data_criacao: '2024-03-12',
    data_conclusao: '2024-03-15',
    endereco: 'Rua Industrial, 123 - São Paulo',
    telefone_contato: '(11) 99999-9999'
  },
  {
    id: 'OS-2024-002',
    cliente: 'Indústria XYZ',
    tecnico: 'Maria Santos',
    tipo_servico: 'Reparo Urgente',
    descricao: 'Reparo em sistema elétrico industrial',
    valor: 780.00,
    status: 'in_progress',
    prioridade: 'alta',
    data_criacao: '2024-03-14',
    data_conclusao: null,
    endereco: 'Av. das Máquinas, 456 - Rio de Janeiro',
    telefone_contato: '(21) 88888-8888'
  },
  {
    id: 'OS-2024-003',
    cliente: 'Fábrica 123',
    tecnico: 'Carlos Lima',
    tipo_servico: 'Instalação Equipamento',
    descricao: 'Instalação de novo equipamento automatizado',
    valor: 1200.00,
    status: 'pending',
    prioridade: 'normal',
    data_criacao: '2024-03-13',
    data_conclusao: null,
    endereco: 'Distrito Industrial, 789 - Belo Horizonte',
    telefone_contato: '(31) 77777-7777'
  },
  {
    id: 'OS-2024-004',
    cliente: 'Empresa DEF',
    tecnico: 'Ana Costa',
    tipo_servico: 'Diagnóstico',
    descricao: 'Diagnóstico de falha em sistema hidráulico',
    valor: 320.00,
    status: 'cancelled',
    prioridade: 'baixa',
    data_criacao: '2024-03-10',
    data_conclusao: null,
    endereco: 'Zona Sul, 321 - Salvador',
    telefone_contato: '(71) 66666-6666'
  }
];

const AdminServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'pending', label: 'Pendente' },
    { value: 'in_progress', label: 'Em Andamento' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'Todas as Prioridades' },
    { value: 'baixa', label: 'Baixa' },
    { value: 'normal', label: 'Normal' },
    { value: 'alta', label: 'Alta' }
  ];

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tecnico.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || service.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || service.prioridade === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Concluído</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Em Andamento</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'alta':
        return <Badge variant="destructive">Alta</Badge>;
      case 'normal':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Normal</Badge>;
      case 'baixa':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Baixa</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  // Cálculos das métricas
  const totalServices = mockServices.length;
  const completedServices = mockServices.filter(s => s.status === 'completed').length;
  const inProgressServices = mockServices.filter(s => s.status === 'in_progress').length;
  const totalRevenue = mockServices.filter(s => s.status === 'completed').reduce((sum, s) => sum + s.valor, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/admin/dashboard" className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center">
              <Wrench className="h-10 w-10 text-yellow-300 mr-4" />
              <div>
                <h1 className="text-4xl font-black text-white">Ordens de Serviço</h1>
                <p className="text-orange-100 text-lg">Acompanhe todos os chamados técnicos</p>
              </div>
            </div>
          </div>

          {/* Métricas de serviços */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-blue-300" />
                <div className="text-2xl font-bold text-white">{totalServices}</div>
              </div>
              <div className="text-orange-100 text-sm">Total de OSs</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <div className="text-2xl font-bold text-white">{completedServices}</div>
              </div>
              <div className="text-orange-100 text-sm">OSs Concluídas</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-300" />
                <div className="text-2xl font-bold text-white">{inProgressServices}</div>
              </div>
              <div className="text-orange-100 text-sm">OSs em Andamento</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-300" />
                <div className="text-2xl font-bold text-white">R$ {totalRevenue.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-orange-100 text-sm">Faturamento</div>
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
              placeholder="Buscar por OS, cliente ou técnico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {priorityOptions.map(option => (
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

        {/* Tabela de ordens de serviço */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Lista de Ordens de Serviço
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>OS</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Tipo de Serviço</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Data Criação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{service.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{service.cliente}</div>
                        <div className="text-sm text-gray-600">{service.endereco}</div>
                      </div>
                    </TableCell>
                    <TableCell>{service.tecnico}</TableCell>
                    <TableCell>{service.tipo_servico}</TableCell>
                    <TableCell className="font-semibold">
                      R$ {service.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(service.status)}
                        {getStatusBadge(service.status)}
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(service.prioridade)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(service.data_criacao).toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
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

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <Wrench className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma OS encontrada</h3>
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

export default AdminServices;