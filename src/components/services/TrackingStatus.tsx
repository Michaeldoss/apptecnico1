
import React from 'react';
import { Check, Clock, Truck, Tools, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ServiceTracking } from '@/types/service';

export interface TrackingStatusProps {
  tracking: ServiceTracking;
  service?: any; // Adding this to make it optional
}

const TrackingStatus: React.FC<TrackingStatusProps> = ({ tracking, service }) => {
  // Status do rastreamento
  const statuses = [
    { key: 'received', label: 'Recebido', icon: Clock, date: tracking.receivedAt },
    { key: 'inProgress', label: 'Em Andamento', icon: Tools, date: tracking.inProgressAt },
    { key: 'shipped', label: 'Enviado', icon: Truck, date: tracking.shippedAt },
    { key: 'delivered', label: 'Entregue', icon: ThumbsUp, date: tracking.deliveredAt },
  ];

  // Encontrar o índice do status atual
  const getCurrentStatusIndex = () => {
    if (tracking.deliveredAt) return 3;
    if (tracking.shippedAt) return 2;
    if (tracking.inProgressAt) return 1;
    return 0;
  };

  const currentIndex = getCurrentStatusIndex();

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        {/* Linha de progresso */}
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {statuses.map((status, index) => {
          const StatusIcon = status.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={status.key} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <StatusIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {status.label}
                </p>
                {status.date && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(status.date).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingStatus;
