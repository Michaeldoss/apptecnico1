
import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Service } from '@/types/service';

interface TrackingStatusProps {
  service: Service;
  tracking?: any;
}

const TrackingStatus: React.FC<TrackingStatusProps> = ({ service, tracking }) => {
  // Use the passed tracking prop if available, otherwise use the service's tracking
  const trackingData = tracking || service.tracking;
  
  if (!trackingData) return null;
  
  if (trackingData.checkedIn && trackingData.checkedOut) {
    return (
      <div className="mt-2 text-xs flex items-center text-green-600">
        <CheckCircle className="h-3 w-3 mr-1" />
        <span>Serviço finalizado em {trackingData.checkoutTime}</span>
      </div>
    );
  }
  
  if (trackingData.checkedIn) {
    return (
      <div className="mt-2 text-xs flex items-center text-blue-600">
        <Clock className="h-3 w-3 mr-1" />
        <span>Em atendimento desde {trackingData.checkinTime}</span>
      </div>
    );
  }
  
  return null;
};

export default TrackingStatus;
