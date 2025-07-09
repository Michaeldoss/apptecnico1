import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/format';
import { AffiliateSale } from '@/types/affiliate';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AffiliateSalesProps {
  sales: AffiliateSale[];
}

export const AffiliateSales: React.FC<AffiliateSalesProps> = ({ sales }) => {
  const isMobile = useIsMobile();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'pago':
        return 'bg-blue-100 text-blue-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado';
      case 'pago':
        return 'Pago';
      case 'pendente':
        return 'Pendente';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getOriginText = (origin: string) => {
    switch (origin) {
      case 'link':
        return 'Link';
      case 'qr':
        return 'QR Code';
      case 'app_indicacao':
        return 'Indicação no App';
      default:
        return origin;
    }
  };

  if (isMobile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Suas Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma venda realizada ainda</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sales.map((sale) => (
                <div key={sale.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{sale.product_name}</h4>
                    <Badge className={getStatusColor(sale.status)}>
                      {getStatusText(sale.status)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Valor:</span> {formatCurrency(sale.sale_amount)}
                    </div>
                    <div>
                      <span className="font-medium">Comissão:</span> {formatCurrency(sale.commission_value)}
                    </div>
                    <div>
                      <span className="font-medium">Origem:</span> {getOriginText(sale.origin)}
                    </div>
                    <div>
                      <span className="font-medium">Data:</span> {format(new Date(sale.created_at), 'dd/MM/yy', { locale: ptBR })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suas Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        {sales.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma venda realizada ainda</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Valor da Venda</TableHead>
                <TableHead>Comissão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.product_name}</TableCell>
                  <TableCell>{formatCurrency(sale.sale_amount)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>{formatCurrency(sale.commission_value)}</div>
                      <div className="text-xs text-gray-500">
                        {sale.commission_percent}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(sale.status)}>
                      {getStatusText(sale.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{getOriginText(sale.origin)}</TableCell>
                  <TableCell>
                    {format(new Date(sale.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};