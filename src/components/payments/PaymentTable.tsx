
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { MoreVertical, Eye, Download, AlertTriangle } from 'lucide-react';
import { Payment } from '@/types/payment';

interface PaymentTableProps {
  payments: Payment[];
  onReleasePayment: (paymentId: number) => void;
  onContestPayment: (paymentId: number, reason: string) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  onReleasePayment,
  onContestPayment
}) => {
  const getStatusBadge = (status: string, serviceStatus: string) => {
    switch (status) {
      case 'released':
        return <Badge className="bg-green-100 text-green-800">Liberado</Badge>;
      case 'retained':
        if (serviceStatus === 'awaiting_confirmation') {
          return <Badge className="bg-yellow-100 text-yellow-800">Aguardando Confirmação</Badge>;
        }
        return <Badge className="bg-blue-100 text-blue-800">Retido</Badge>;
      case 'contested':
        return <Badge className="bg-red-100 text-red-800">Contestado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'pix':
        return 'PIX';
      case 'credit_card':
        return 'Cartão de Crédito';
      case 'debit_card':
        return 'Cartão de Débito';
      case 'bank_transfer':
        return 'Transferência';
      default:
        return method;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Pagamentos</CardTitle>
        <CardDescription>
          Acompanhe todos os seus recebimentos e status de liberação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>O.S.</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Data Pagamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Liberação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.serviceId}</TableCell>
                  <TableCell>{payment.clientName}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{payment.serviceType}</p>
                      <p className="text-xs text-muted-foreground">{payment.equipment}</p>
                    </div>
                  </TableCell>
                  <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{getPaymentMethodLabel(payment.paymentMethod)}</TableCell>
                  <TableCell>{new Date(payment.paidDate).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{getStatusBadge(payment.status, payment.serviceStatus)}</TableCell>
                  <TableCell>
                    {payment.releasedDate ? (
                      <span className="text-sm text-green-600">
                        {new Date(payment.releasedDate).toLocaleDateString('pt-BR')}
                      </span>
                    ) : payment.expectedReleaseDate ? (
                      <span className="text-sm text-yellow-600">
                        Prev: {new Date(payment.expectedReleaseDate).toLocaleDateString('pt-BR')}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Baixar comprovante
                        </DropdownMenuItem>
                        {payment.status === 'retained' && payment.serviceStatus === 'awaiting_confirmation' && (
                          <DropdownMenuItem onClick={() => onReleasePayment(payment.id)}>
                            Liberar pagamento
                          </DropdownMenuItem>
                        )}
                        {payment.status !== 'contested' && (
                          <DropdownMenuItem 
                            className="text-red-500"
                            onClick={() => onContestPayment(payment.id, 'Problema no serviço')}
                          >
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Contestar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground">
                  Nenhum pagamento encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentTable;
