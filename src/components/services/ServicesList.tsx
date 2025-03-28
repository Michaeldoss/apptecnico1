
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/types/service';
import ServiceCard from './ServiceCard';

interface ServicesListProps {
  services: Service[];
  statusFilter?: string;
  onShowTrackingDialog: (service: Service, action: 'checkin' | 'checkout') => void;
}

const ServicesList: React.FC<ServicesListProps> = ({ 
  services, 
  statusFilter,
  onShowTrackingDialog
}) => {
  // Apply status filter if provided
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
              <ServiceCard 
                key={service.id} 
                service={service} 
                onShowTrackingDialog={onShowTrackingDialog}
              />
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

export default ServicesList;
