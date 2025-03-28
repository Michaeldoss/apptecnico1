
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FileText } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Service } from '@/types/service';
import ServiceCard from '@/components/services/ServiceCard';
import { useServices } from '@/hooks/useServices';
import { Link } from 'react-router-dom';

const CustomerServices = () => {
  const { services, searchQuery, setSearchQuery } = useServices();
  
  // Filter to only show services for the current client
  // In a real app, this would use the logged-in user's ID
  const clientServices = services;
  
  return (
    <CustomerLayout title="Meus Serviços">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar serviços"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link to="/cliente/solicitar-servico">Solicitar Novo Serviço</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <CustomerServicesList services={clientServices} />
          </TabsContent>
          
          {['pending', 'in-progress', 'completed'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <CustomerServicesList
                services={clientServices}
                statusFilter={tab}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

interface ServiceListProps {
  services: Service[];
  statusFilter?: string;
}

const CustomerServicesList: React.FC<ServiceListProps> = ({ services, statusFilter }) => {
  const filteredServices = statusFilter && statusFilter !== 'all'
    ? services.filter(service => {
        const statusMap: Record<string, string> = {
          'pending': 'pendente',
          'in-progress': 'em andamento',
          'completed': 'concluído',
          'canceled': 'cancelado'
        };
        return service.status === statusMap[statusFilter];
      })
    : services;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div key={service.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{service.type}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        service.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                        service.status === 'em andamento' ? 'bg-blue-100 text-blue-800' :
                        service.status === 'concluído' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                    <p className="text-sm">{service.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Agendado para: {service.date}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Endereço: {service.address}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      Valor: {service.price}
                    </p>
                    
                    {service.serviceOrderId && (
                      <div className="mt-2">
                        <Button variant="outline" size="sm" asChild className="flex items-center gap-1">
                          <Link to={`/cliente/servicos/${service.id}/os`}>
                            <FileText className="h-3 w-3" />
                            <span>Ver O.S. #{service.serviceOrderId}</span>
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/cliente/servicos/${service.id}`}>Detalhes</Link>
                    </Button>
                    
                    {service.tracking?.checkedIn && !service.tracking?.checkedOut && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/cliente/rastreamento/${service.id}`}>
                          <MapPin className="h-3 w-3 mr-1" />
                          Rastrear
                        </Link>
                      </Button>
                    )}
                    
                    {service.status === 'concluído' && service.payment?.status !== 'pago' && (
                      <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50" asChild>
                        <Link to={`/cliente/pagamentos/${service.id}`}>
                          <CreditCard className="h-3 w-3 mr-1" />
                          Pagar
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Nenhum serviço encontrado.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerServices;
