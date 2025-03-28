
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  Clock, 
  MoreVertical, 
  Search, 
  AlertCircle, 
  XCircle,
  MapPin,
  LogIn,
  LogOut
} from 'lucide-react';

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
  tracking?: {
    checkedIn: boolean;
    checkedOut: boolean;
    checkinTime?: string;
    checkoutTime?: string;
    location?: string;
  };
};

const TechnicianServices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      client: 'João Silva',
      type: 'Reparo de Computador',
      description: 'PC não liga, possível problema na fonte',
      status: 'pendente',
      date: '24/07/2023',
      address: 'Rua Augusta, 1500, São Paulo - SP',
      price: 'R$ 150,00',
      tracking: {
        checkedIn: false,
        checkedOut: false
      }
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
      tracking: {
        checkedIn: true,
        checkedOut: false,
        checkinTime: '22/07/2023 14:30'
      }
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
      tracking: {
        checkedIn: true,
        checkedOut: true,
        checkinTime: '20/07/2023 09:15',
        checkoutTime: '20/07/2023 10:45'
      }
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
      tracking: {
        checkedIn: true,
        checkedOut: true,
        checkinTime: '18/07/2023 13:00',
        checkoutTime: '18/07/2023 16:30'
      }
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
      tracking: {
        checkedIn: false,
        checkedOut: false
      }
    },
  ]);
  
  // Estados para controle do modal de check-in/check-out
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [trackingAction, setTrackingAction] = useState<'checkin' | 'checkout' | null>(null);
  
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
  
  const handleShowTrackingDialog = (service: Service, action: 'checkin' | 'checkout') => {
    setSelectedService(service);
    setTrackingAction(action);
    setIsTrackingDialogOpen(true);
  };
  
  const handleTrackingAction = () => {
    if (!selectedService) return;
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR') + ' ' + 
                          now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
    
    const updatedServices = services.map(service => {
      if (service.id === selectedService.id) {
        if (trackingAction === 'checkin') {
          return {
            ...service,
            status: 'em andamento' as ServiceStatus,
            tracking: {
              ...service.tracking,
              checkedIn: true,
              checkinTime: formattedDate
            }
          };
        } else if (trackingAction === 'checkout') {
          return {
            ...service,
            status: 'concluído' as ServiceStatus,
            tracking: {
              ...service.tracking,
              checkedOut: true,
              checkoutTime: formattedDate
            }
          };
        }
      }
      return service;
    });
    
    setServices(updatedServices);
    setIsTrackingDialogOpen(false);
    
    // Mostrar notificação de sucesso
    toast({
      title: trackingAction === 'checkin' ? "Check-in realizado!" : "Check-out realizado!",
      description: trackingAction === 'checkin' 
        ? `Você iniciou o serviço para ${selectedService.client} às ${formattedDate}.`
        : `Você finalizou o serviço para ${selectedService.client} às ${formattedDate}.`,
    });
  };
  
  const getTrackingStatus = (service: Service) => {
    if (!service.tracking) return null;
    
    if (service.tracking.checkedIn && service.tracking.checkedOut) {
      return (
        <div className="mt-2 text-xs flex items-center text-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          <span>Serviço finalizado em {service.tracking.checkoutTime}</span>
        </div>
      );
    }
    
    if (service.tracking.checkedIn) {
      return (
        <div className="mt-2 text-xs flex items-center text-blue-600">
          <Clock className="h-3 w-3 mr-1" />
          <span>Em atendimento desde {service.tracking.checkinTime}</span>
        </div>
      );
    }
    
    return null;
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
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{service.address}</span>
                              </div>
                              <span>•</span>
                              <span className="font-medium">{service.price}</span>
                            </div>
                            {getTrackingStatus(service)}
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
                                {service.status !== 'cancelado' && service.status !== 'concluído' && (
                                  <>
                                    {!service.tracking?.checkedIn && (
                                      <DropdownMenuItem onClick={() => handleShowTrackingDialog(service, 'checkin')}>
                                        <LogIn className="h-4 w-4 mr-2" />
                                        Fazer check-in
                                      </DropdownMenuItem>
                                    )}
                                    {service.tracking?.checkedIn && !service.tracking?.checkedOut && (
                                      <DropdownMenuItem onClick={() => handleShowTrackingDialog(service, 'checkout')}>
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Fazer check-out
                                      </DropdownMenuItem>
                                    )}
                                  </>
                                )}
                                <DropdownMenuItem className="text-red-500">Cancelar serviço</DropdownMenuItem>
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
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{service.address}</span>
                                </div>
                                <span>•</span>
                                <span className="font-medium">{service.price}</span>
                              </div>
                              {getTrackingStatus(service)}
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
                                  {service.status !== 'cancelado' && service.status !== 'concluído' && (
                                    <>
                                      {!service.tracking?.checkedIn && (
                                        <DropdownMenuItem onClick={() => handleShowTrackingDialog(service, 'checkin')}>
                                          <LogIn className="h-4 w-4 mr-2" />
                                          Fazer check-in
                                        </DropdownMenuItem>
                                      )}
                                      {service.tracking?.checkedIn && !service.tracking?.checkedOut && (
                                        <DropdownMenuItem onClick={() => handleShowTrackingDialog(service, 'checkout')}>
                                          <LogOut className="h-4 w-4 mr-2" />
                                          Fazer check-out
                                        </DropdownMenuItem>
                                      )}
                                    </>
                                  )}
                                  <DropdownMenuItem className="text-red-500">Cancelar serviço</DropdownMenuItem>
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
      
      {/* Diálogo de Check-in/Check-out */}
      <Dialog open={isTrackingDialogOpen} onOpenChange={setIsTrackingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {trackingAction === 'checkin' ? 'Confirmar Check-in' : 'Confirmar Check-out'}
            </DialogTitle>
            <DialogDescription>
              {trackingAction === 'checkin' 
                ? 'Confirme que você chegou ao local do cliente para iniciar o serviço.'
                : 'Confirme que você completou o serviço e está deixando o local do cliente.'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedService && (
            <div className="py-4">
              <div className="mb-4">
                <h3 className="font-medium">{selectedService.client}</h3>
                <p className="text-sm text-muted-foreground">{selectedService.type}</p>
              </div>
              
              <div className="flex items-center text-sm mb-4">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{selectedService.address}</span>
              </div>
              
              <p className="text-sm">
                {trackingAction === 'checkin' 
                  ? 'Ao confirmar, você estará registrando seu horário de chegada.' 
                  : 'Ao confirmar, você estará registrando seu horário de saída e marcando o serviço como concluído.'}
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTrackingDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleTrackingAction}>
              {trackingAction === 'checkin' 
                ? 'Confirmar Check-in' 
                : 'Confirmar Check-out'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TechnicianLayout>
  );
};

export default TechnicianServices;
