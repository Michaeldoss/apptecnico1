
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckCircle, Clock, MoreVertical, Search, AlertCircle, XCircle } from 'lucide-react';

type ServiceStatus = 'pendente' | 'em andamento' | 'concluído' | 'cancelado';

type Service = {
  id: number;
  client: string;
  type: string;
  description: string;
  status: ServiceStatus;
  date: string;
  address: string;
  price: string;
};

const TechnicianServices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dados de exemplo
  const services: Service[] = [
    {
      id: 1,
      client: 'João Silva',
      type: 'Reparo de Computador',
      description: 'PC não liga, possível problema na fonte',
      status: 'pendente',
      date: '24/07/2023',
      address: 'Rua Augusta, 1500, São Paulo - SP',
      price: 'R$ 150,00',
    },
    {
      id: 2,
      client: 'Maria Oliveira',
      type: 'Instalação de Rede',
      description: 'Instalação de rede Wi-Fi e configuração',
      status: 'em andamento',
      date: '22/07/2023',
      address: 'Av. Paulista, 900, São Paulo - SP',
      price: 'R$ 200,00',
    },
    {
      id: 3,
      client: 'Pedro Santos',
      type: 'Manutenção de Impressora',
      description: 'Impressora com problema de papel preso',
      status: 'concluído',
      date: '20/07/2023',
      address: 'Rua Consolação, 250, São Paulo - SP',
      price: 'R$ 100,00',
    },
    {
      id: 4,
      client: 'Ana Costa',
      type: 'Formatação de Notebook',
      description: 'Formatação completa e instalação de softwares',
      status: 'concluído',
      date: '18/07/2023',
      address: 'Av. Brigadeiro Faria Lima, 1200, São Paulo - SP',
      price: 'R$ 180,00',
    },
    {
      id: 5,
      client: 'Carlos Mendes',
      type: 'Reparo de Smartphone',
      description: 'Troca de tela quebrada',
      status: 'cancelado',
      date: '15/07/2023',
      address: 'Rua Oscar Freire, 500, São Paulo - SP',
      price: 'R$ 250,00',
    },
  ];
  
  const filteredServices = services.filter(service => 
    service.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'pendente':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'em andamento':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'concluído':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelado':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: ServiceStatus) => {
    const colors = {
      'pendente': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      'em andamento': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      'concluído': 'bg-green-100 text-green-800 hover:bg-green-100',
      'cancelado': 'bg-red-100 text-red-800 hover:bg-red-100',
    };
    
    return (
      <Badge variant="outline" className={colors[status]}>
        <span className="flex items-center gap-1">
          {getStatusIcon(status)}
          <span>{status}</span>
        </span>
      </Badge>
    );
  };
  
  return (
    <TechnicianLayout title="Gerenciamento de Serviços">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, tipo ou descrição"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>Novo Serviço</Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
            <TabsTrigger value="canceled">Cancelados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <div key={service.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{service.client}</h3>
                              {getStatusBadge(service.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">{service.type}</p>
                            <p className="text-sm">{service.description}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                              <span>{service.date}</span>
                              <span>•</span>
                              <span>{service.address}</span>
                              <span>•</span>
                              <span className="font-medium">{service.price}</span>
                            </div>
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Atualizar status</DropdownMenuItem>
                                <DropdownMenuItem>Contatar cliente</DropdownMenuItem>
                                <DropdownMenuItem>Cancelar serviço</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
          </TabsContent>
          
          {['pending', 'in-progress', 'completed', 'canceled'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredServices
                      .filter(service => {
                        const statusMap = {
                          'pending': 'pendente',
                          'in-progress': 'em andamento',
                          'completed': 'concluído',
                          'canceled': 'cancelado'
                        };
                        return service.status === statusMap[tab as keyof typeof statusMap];
                      })
                      .map((service) => (
                        <div key={service.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{service.client}</h3>
                                {getStatusBadge(service.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">{service.type}</p>
                              <p className="text-sm">{service.description}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                                <span>{service.date}</span>
                                <span>•</span>
                                <span>{service.address}</span>
                                <span>•</span>
                                <span className="font-medium">{service.price}</span>
                              </div>
                            </div>
                            <div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                  <DropdownMenuItem>Atualizar status</DropdownMenuItem>
                                  <DropdownMenuItem>Contatar cliente</DropdownMenuItem>
                                  <DropdownMenuItem>Cancelar serviço</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianServices;
