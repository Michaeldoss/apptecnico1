import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import CustomerLayout from '@/components/layout/CustomerLayout';
import StatusBadge from '@/components/services/StatusBadge';
import TrackingStatus from '@/components/services/TrackingStatus';
import TrackingDialog from '@/components/services/TrackingDialog';
import { useServices } from '@/hooks/useServices';
import { Service } from '@/types/service';
import { MapPin, CreditCard } from 'lucide-react';

const CustomerServices = () => {
  const { data: services, isLoading, error } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [showTrackingDialog, setShowTrackingDialog] = useState(false);

  // Filter services
  const filteredServices = services?.filter(service => 
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openTrackingDialog = (service: Service) => {
    setActiveService(service);
    setShowTrackingDialog(true);
  };

  return (
    <CustomerLayout title="Meus Serviços">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="max-w-sm flex-1">
            <Input
              placeholder="Buscar serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm bg-white/90 text-gray-900 placeholder:text-gray-600"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/store">Solicitar Novo Serviço</Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <Card className="bg-white/95">
            <CardContent className="pt-6">
              <div className="text-center text-red-600">
                Erro ao carregar serviços. Por favor, tente novamente.
              </div>
            </CardContent>
          </Card>
        ) : filteredServices && filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden bg-white/95 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl text-gray-900">{service.type}</CardTitle>
                      <CardDescription className="text-sm text-gray-700">{service.description}</CardDescription>
                    </div>
                    <StatusBadge status={service.status} />
                  </div>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">Data</div>
                      <div className="text-gray-900">{service.date}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        Local
                      </div>
                      <div className="text-gray-900">{service.address}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <CreditCard className="h-3.5 w-3.5" />
                        Pagamento
                      </div>
                      <div className="flex items-center gap-2">
                        {service.payment?.status === 'pago' ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Pago
                          </Badge>
                        ) : service.payment?.status === 'parcial' ? (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Parcial
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Pendente
                          </Badge>
                        )}
                        <span className="text-gray-900">{service.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  {service.tracking && (
                    <div className="mt-4 pt-4 border-t">
                      <TrackingStatus tracking={service.tracking} />
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="bg-gray-50 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openTrackingDialog(service)}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Rastreamento
                  </Button>
                  
                  <Button 
                    variant="default" 
                    size="sm" 
                    asChild
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Link to={`/cliente/servicos/${service.id}`}>
                      Detalhes
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white/95">
            <CardContent className="pt-6">
              <div className="text-center text-gray-900">
                Nenhum serviço encontrado.
              </div>
            </CardContent>
          </Card>
        )}

        {activeService && (
          <TrackingDialog
            open={showTrackingDialog}
            onOpenChange={setShowTrackingDialog}
            service={activeService}
          />
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerServices;