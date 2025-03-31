
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, MoreVertical, LogIn, LogOut, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Service } from '@/types/service';
import StatusBadge from './StatusBadge';
import TrackingStatus from './TrackingStatus';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  service: Service;
  onShowTrackingDialog: (service: Service, action: 'checkin' | 'checkout') => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onShowTrackingDialog }) => {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{service.client}</h3>
            <StatusBadge status={service.status} />
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
          {service.tracking && <TrackingStatus tracking={service.tracking} />}
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
                    <DropdownMenuItem 
                      onClick={() => onShowTrackingDialog(service, 'checkin')}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Fazer check-in
                    </DropdownMenuItem>
                  )}
                  {service.tracking?.checkedIn && !service.tracking?.checkedOut && (
                    <DropdownMenuItem 
                      onClick={() => onShowTrackingDialog(service, 'checkout')}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Fazer check-out
                    </DropdownMenuItem>
                  )}
                </>
              )}
              <DropdownMenuItem asChild>
                <Link to={`/tecnico/servicos/${service.id}/os`}>
                  <FileText className="h-4 w-4 mr-2" />
                  Ordem de Serviço
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Cancelar serviço</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
