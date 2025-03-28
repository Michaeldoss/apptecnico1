
import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Service } from '@/types/service';

interface TrackingStatusProps {
  service: Service;
}

const TrackingStatus: React.FC<TrackingStatusProps> = ({ service }) => {
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

export default TrackingStatus;
