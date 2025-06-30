import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Phone, 
  MessageCircle,
  Calendar,
  Wrench,
  Navigation
} from 'lucide-react';
import { ServiceCall, statusConfig } from '@/types/service-status';
import { format } from 'date-fns';

interface ServiceCallCardProps {
  call: ServiceCall;
  onOpenDetails: (call: ServiceCall) => void;
}

const ServiceCallCard: React.FC<ServiceCallCardProps> = ({ call, onOpenDetails }) => {
  const config = statusConfig[call.status];
  
  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const handleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const getDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/Current+Location/${encodedAddress}`, '_blank');
  };

  return (
    <Card className={`${config.bgColor} border-l-4 ${config.color.split(' ')[2]} hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">{call.clientName}</h3>
            <p className="text-sm text-muted-foreground">#{call.id}</p>
          </div>
          <Badge className={config.color}>
            {config.icon} {config.label}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(call.scheduledDate), 'dd/MM/yyyy')} às {call.scheduledTime}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <span>{call.serviceType}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{call.address}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>R$ {call.agreedValue.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1">Equipamento:</p>
          <p className="text-sm font-medium">{call.equipment}</p>
        </div>

        {call.clientNotes && (
          <div className="mb-4 p-2 bg-blue-50 rounded text-sm">
            <p className="text-muted-foreground mb-1">Observações do cliente:</p>
            <p>{call.clientNotes}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleCall(call.clientPhone)}
            className="flex items-center gap-1"
          >
            <Phone className="h-3 w-3" />
            Ligar
          </Button>
          
          {call.clientWhatsApp && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleWhatsApp(call.clientWhatsApp!)}
              className="flex items-center gap-1"
            >
              <MessageCircle className="h-3 w-3" />
              WhatsApp
            </Button>
          )}
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleMaps(call.address)}
            className="flex items-center gap-1"
          >
            <MapPin className="h-3 w-3" />
            Ver Local
          </Button>

          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => getDirections(call.address)}
            className="flex items-center gap-1"
          >
            <Navigation className="h-3 w-3" />
            Rota
          </Button>
          
          <Button 
            size="sm" 
            onClick={() => onOpenDetails(call)}
            className="ml-auto"
          >
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCallCard;
