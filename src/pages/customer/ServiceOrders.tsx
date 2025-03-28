
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from 'react-router-dom';
import { FilePlus, FileText, Search } from 'lucide-react';
import StatusBadge from '@/components/services/StatusBadge';

const CustomerServiceOrders = () => {
  const { data: services, isLoading } = useServices();
  
  // Filter services that have service orders
  const servicesWithOrders = services.filter(service => service.serviceOrderId);

  return (
    <CustomerLayout title="Ordens de Serviço">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : servicesWithOrders.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Minhas Ordens de Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº OS</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servicesWithOrders.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">OS-{service.serviceOrderId}</TableCell>
                      <TableCell>{service.type}</TableCell>
                      <TableCell>{service.date}</TableCell>
                      <TableCell>
                        <StatusBadge status={service.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/cliente/ordens/${service.serviceOrderId}`}>
                            <Search className="mr-2 h-4 w-4" />
                            Visualizar
                          </Link>
                        </Button>
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
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Nenhuma ordem de serviço encontrada</h3>
              <p className="text-muted-foreground mb-4">
                Você ainda não possui ordens de serviço registradas.
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

export default CustomerServiceOrders;
