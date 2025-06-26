
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { CreditCard, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import StatusBadge from '@/components/services/StatusBadge';

const CustomerPayments = () => {
  const { data: services, isLoading } = useServices();
  
  // Filter services that have payment info or are completed and need payment
  const paymentServices = services?.filter(service => 
    service.payment || (service.status === 'concluído' && (!service.payment || service.payment?.status !== 'pago'))
  ) || [];

  if (isLoading) {
    return (
      <CustomerLayout title="Pagamentos">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout title="Pagamentos">
      <div className="space-y-6">
        {paymentServices.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.type}</TableCell>
                      <TableCell>{service.date}</TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell>
                        {service.payment ? (
                          <Badge 
                            variant="outline" 
                            className={
                              service.payment.status === 'pago' 
                                ? "bg-green-50 text-green-700 border-green-200"
                                : service.payment.status === 'parcial'
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : service.payment.status === 'cancelado'
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }
                          >
                            {service.payment.status === 'pago' ? 'Pago' : 
                             service.payment.status === 'parcial' ? 'Parcial' :
                             service.payment.status === 'cancelado' ? 'Cancelado' :
                             'Pendente'}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Pendente
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {service.payment?.method || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {!service.payment || service.payment.status !== 'pago' ? (
                          <Button size="sm" asChild>
                            <Link to={`/cliente/pagamentos/${service.id}`}>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Pagar
                            </Link>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/cliente/servicos/${service.id}`}>
                              <FileText className="mr-2 h-4 w-4" />
                              Detalhes
                            </Link>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Nenhum pagamento encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Você ainda não tem nenhum pagamento para fazer ou já finalizou todos os pagamentos.
              </p>
              <Button asChild>
                <Link to="/cliente/servicos">Ver Meus Serviços</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerPayments;
