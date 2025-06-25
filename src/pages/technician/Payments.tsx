
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Download, MoreVertical, CreditCard, DollarSign, Calendar } from 'lucide-react';

const TechnicianPayments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for payments
  const payments = [
    {
      id: 1,
      serviceId: 'OS-001',
      client: 'João Silva',
      amount: 250.00,
      status: 'paid', // paid, pending, overdue
      dueDate: '2024-01-15',
      paidDate: '2024-01-14',
      method: 'PIX'
    },
    {
      id: 2,
      serviceId: 'OS-002',
      client: 'Maria Santos',
      amount: 180.00,
      status: 'pending',
      dueDate: '2024-01-20',
      paidDate: null,
      method: 'Cartão'
    },
    {
      id: 3,
      serviceId: 'OS-003',
      client: 'Pedro Costa',
      amount: 320.00,
      status: 'overdue',
      dueDate: '2024-01-10',
      paidDate: null,
      method: 'Boleto'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Vencido</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.serviceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <TechnicianLayout title="Pagamentos">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">R$ {totalPaid.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Pagamentos confirmados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">A Receber</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">R$ {totalPending.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Pagamentos pendentes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Em Atraso</CardTitle>
              <CreditCard className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">R$ {totalOverdue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Pagamentos vencidos</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente ou O.S."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pagamentos</CardTitle>
            <CardDescription>
              Gerencie e acompanhe todos os seus recebimentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>O.S.</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.serviceId}</TableCell>
                      <TableCell>{payment.client}</TableCell>
                      <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{new Date(payment.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                            {payment.status === 'pending' && (
                              <DropdownMenuItem>Marcar como pago</DropdownMenuItem>
                            )}
                            <DropdownMenuItem>Baixar comprovante</DropdownMenuItem>
                            <DropdownMenuItem>Enviar cobrança</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      Nenhum pagamento encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianPayments;
