
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Plus, 
  FileText, 
  Eye, 
  Edit, 
  Download, 
  Share2,
  MoreVertical,
  Filter
} from 'lucide-react';
import { useServiceOrders } from '@/hooks/useServiceOrders';
import { ServiceOrderStatus } from '@/types/service-order';
import { formatCurrency } from '@/lib/format';
import ServiceOrderForm from '@/components/service-orders/ServiceOrderForm';
import ServiceOrderView from '@/components/service-orders/ServiceOrderView';

const TechnicianServiceOrders = () => {
  const { 
    serviceOrders, 
    loading, 
    filters, 
    setFilters, 
    createServiceOrder 
  } = useServiceOrders();
  
  const [isCreating, setIsCreating] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'view' | 'edit'>('list');

  const getStatusColor = (status: ServiceOrderStatus) => {
    switch (status) {
      case 'aberta': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      case 'em_negociacao': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: ServiceOrderStatus) => {
    switch (status) {
      case 'aberta': return 'Aberta';
      case 'em_andamento': return 'Em Andamento';
      case 'concluida': return 'Concluída';
      case 'cancelada': return 'Cancelada';
      case 'em_negociacao': return 'Em Negociação';
      default: return status;
    }
  };

  const handleCreateOrder = () => {
    setIsCreating(true);
    setViewMode('edit');
  };

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setViewMode('view');
  };

  const handleEditOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setViewMode('edit');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedOrderId(null);
    setIsCreating(false);
  };

  if (viewMode === 'view' && selectedOrderId) {
    const order = serviceOrders.find(o => o.id === selectedOrderId);
    if (order) {
      return (
        <ServiceOrderView 
          order={order} 
          onBack={handleBackToList}
          onEdit={() => handleEditOrder(selectedOrderId)}
        />
      );
    }
  }

  if (viewMode === 'edit') {
    const order = selectedOrderId ? serviceOrders.find(o => o.id === selectedOrderId) : null;
    return (
      <ServiceOrderForm 
        order={order}
        onSave={handleBackToList}
        onCancel={handleBackToList}
      />
    );
  }

  return (
    <TechnicianLayout title="Ordens de Serviço">
      <div className="space-y-6">
        {/* Informativo */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            📋 Central de Ordens de Serviço
          </h3>
          <p className="text-blue-700 text-sm mb-3">
            Gerencie todas as suas ordens de serviço com controle completo. Cada OS é gerada 
            automaticamente e pode ser exportada em PDF, impressa ou compartilhada digitalmente.
          </p>
          <div className="flex gap-4 text-xs text-blue-600">
            <span>✓ Geração automática de código</span>
            <span>✓ Exportação em PDF</span>
            <span>✓ Assinatura digital</span>
            <span>✓ Histórico completo</span>
          </div>
        </div>

        {/* Controles e Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por OS, cliente ou equipamento..."
                className="pl-8 w-full sm:w-80"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            
            <Select 
              value={filters.status} 
              onValueChange={(value) => setFilters(prev => ({ 
                ...prev, 
                status: value as ServiceOrderStatus | '' 
              }))}
            >
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os status</SelectItem>
                <SelectItem value="aberta">Abertas</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluídas</SelectItem>
                <SelectItem value="cancelada">Canceladas</SelectItem>
                <SelectItem value="em_negociacao">Em Negociação</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleCreateOrder}>
            <Plus className="h-4 w-4 mr-2" />
            Nova OS
          </Button>
        </div>

        {/* Lista de Ordens de Serviço */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Ordens de Serviço
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Carregando ordens de serviço...</p>
              </div>
            ) : serviceOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma ordem de serviço encontrada</p>
                <Button onClick={handleCreateOrder} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar primeira OS
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Equipamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <span className="font-mono font-medium">{order.number}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.client.name}</p>
                          <p className="text-sm text-muted-foreground">{order.client.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.equipment}</p>
                          {order.serialNumber && (
                            <p className="text-sm text-muted-foreground">S/N: {order.serialNumber}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-green-600">
                          {formatCurrency(order.total)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">
                            {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewOrder(order.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditOrder(order.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Baixar PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Compartilhar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianServiceOrders;
