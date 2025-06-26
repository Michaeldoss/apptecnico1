
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'maintenance': return 'bg-yellow-100 text-yellow-800';
    case 'inactive': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return CheckCircle;
    case 'maintenance': return AlertTriangle;
    case 'inactive': return XCircle;
    default: return XCircle;
  }
};
