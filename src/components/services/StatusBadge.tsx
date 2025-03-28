
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { ServiceStatus } from '@/types/service';

interface StatusBadgeProps {
  status: ServiceStatus;
}

export const getStatusIcon = (status: ServiceStatus) => {
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

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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

export default StatusBadge;
