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
  Users, 
  ArrowLeft,
  Search,
  Plus,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Filter
} from 'lucide-react';

// Mock data
const mockUsers = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@tecnico.com',
    tipo_usuario: 'tecnico',
    ativo: true,
    telefone: '(11) 99999-9999',
    cidade: 'São Paulo',
    created_at: '2024-01-15',
    last_login: '2024-03-15'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@empresa.com',
    tipo_usuario: 'cliente',
    ativo: true,
    telefone: '(11) 88888-8888',
    cidade: 'Rio de Janeiro',
    created_at: '2024-02-10',
    last_login: '2024-03-14'
  },
  {
    id: '3',
    nome: 'Empresa ABC Ltda',
    email: 'contato@empresaabc.com',
    tipo_usuario: 'company',
    ativo: true,
    telefone: '(11) 77777-7777',
    cidade: 'Belo Horizonte',
    created_at: '2024-01-20',
    last_login: '2024-03-13'
  },
  {
    id: '4',
    nome: 'Carlos Lima',
    email: 'carlos@tecnico2.com',
    tipo_usuario: 'tecnico',
    ativo: false,
    telefone: '(11) 66666-6666',
    cidade: 'Salvador',
    created_at: '2024-03-01',
    last_login: '2024-03-10'
  }
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const userTypes = [
    { value: 'all', label: 'Todos os Tipos' },
    { value: 'admin', label: 'Administradores' },
    { value: 'tecnico', label: 'Técnicos' },
    { value: 'cliente', label: 'Clientes' },
    { value: 'company', label: 'Empresas' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'active', label: 'Ativos' },
    { value: 'inactive', label: 'Inativos' }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || user.tipo_usuario === selectedType;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && user.ativo) ||
                         (selectedStatus === 'inactive' && !user.ativo);
    return matchesSearch && matchesType && matchesStatus;
  });

  const getUserTypeBadge = (type: string) => {
    switch (type) {
      case 'admin':
        return <Badge variant="destructive">Admin</Badge>;
      case 'tecnico':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Técnico</Badge>;
      case 'cliente':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Cliente</Badge>;
      case 'company':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Empresa</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStatusBadge = (ativo: boolean) => {
    return ativo ? 
      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Ativo</Badge> :
      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Inativo</Badge>;
  };

  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.ativo).length;
  const technicians = mockUsers.filter(u => u.tipo_usuario === 'tecnico').length;
  const customers = mockUsers.filter(u => u.tipo_usuario === 'cliente').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/admin/dashboard" className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center">
              <Users className="h-10 w-10 text-yellow-300 mr-4" />
              <div>
                <h1 className="text-4xl font-black text-white">Gestão de Usuários</h1>
                <p className="text-blue-100 text-lg">Gerencie técnicos, clientes e empresas</p>
              </div>
            </div>
          </div>

          {/* Métricas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-yellow-300" />
                <div className="text-2xl font-bold text-white">{totalUsers}</div>
              </div>
              <div className="text-blue-100 text-sm">Total de Usuários</div>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <div className="text-2xl font-bold text-white">{activeUsers}</div>
              </div>
              <div className="text-blue-100 text-sm">Usuários Ativos</div>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="h-5 w-5 text-blue-300" />
                <div className="text-2xl font-bold text-white">{technicians}</div>
              </div>
              <div className="text-blue-100 text-sm">Técnicos</div>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-green-300" />
                <div className="text-2xl font-bold text-white">{customers}</div>
              </div>
              <div className="text-blue-100 text-sm">Clientes</div>
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
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {userTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        {/* Tabela de usuários */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Lista de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.nome}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {user.telefone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>{getUserTypeBadge(user.tipo_usuario)}</TableCell>
                    <TableCell>{getStatusBadge(user.ativo)}</TableCell>
                    <TableCell>{user.cidade}</TableCell>
                    <TableCell>{new Date(user.last_login).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={user.ativo ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}
                        >
                          {user.ativo ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum usuário encontrado</h3>
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

export default AdminUsers;