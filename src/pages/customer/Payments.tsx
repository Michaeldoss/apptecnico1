
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
      <div className="min-h-screen bg-blue-600">
        <CustomerLayout title="Pagamentos">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </CustomerLayout>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-600">
      <CustomerLayout title="Pagamentos">
        <div className="space-y-6">
          {paymentServices.length > 0 ? (
            <Card className="bg-white/95 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">Histórico de Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-700">Serviço</TableHead>
                      <TableHead className="text-gray-700">Data</TableHead>
                      <TableHead className="text-gray-700">Valor</TableHead>
                      <TableHead className="text-gray-700">Status</TableHead>
                      <TableHead className="text-gray-700">Método</TableHead>
                      <TableHead className="text-right text-gray-700">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium text-gray-900">{service.type}</TableCell>
                        <TableCell className="text-gray-900">{service.date}</TableCell>
                        <TableCell className="text-gray-900">{service.price}</TableCell>
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
                        <TableCell className="text-gray-900">
                          {service.payment?.method || "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          {!service.payment || service.payment.status !== 'pago' ? (
                            <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
                              <Link to={`/cliente/pagamentos/${service.id}`}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Pagar
                              </Link>
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" asChild className="border-blue-600 text-blue-600 hover:bg-blue-50">
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
            <Card className="bg-white/95 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900">Nenhum pagamento encontrado</h3>
                <p className="text-gray-700 mb-4">
                  Você ainda não tem nenhum pagamento para fazer ou já finalizou todos os pagamentos.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/cliente/servicos">Ver Meus Serviços</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </CustomerLayout>
    </div>
  );
};

export default CustomerPayments;
