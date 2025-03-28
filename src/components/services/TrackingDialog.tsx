
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Service } from '@/types/service';

interface TrackingDialogProps {
  open?: boolean;
  isOpen?: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService?: Service | null;
  service?: Service;
  trackingAction?: 'checkin' | 'checkout' | null;
  onConfirm?: () => void;
}

const TrackingDialog: React.FC<TrackingDialogProps> = ({
  open,
  isOpen,
  onOpenChange,
  selectedService,
  service,
  trackingAction,
  onConfirm,
}) => {
  const activeService = service || selectedService;
  const dialogOpen = open || isOpen;
  
  if (!activeService) return null;

  return (
    <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
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
        
        <div className="py-4">
          <div className="mb-4">
            <h3 className="font-medium">{activeService.client}</h3>
            <p className="text-sm text-muted-foreground">{activeService.type}</p>
          </div>
          
          <div className="flex items-center text-sm mb-4">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{activeService.address}</span>
          </div>
          
          <p className="text-sm">
            {trackingAction === 'checkin' 
              ? 'Ao confirmar, você estará registrando seu horário de chegada.' 
              : 'Ao confirmar, você estará registrando seu horário de saída e marcando o serviço como concluído.'}
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          {onConfirm && (
            <Button onClick={onConfirm}>
              {trackingAction === 'checkin' 
                ? 'Confirmar Check-in' 
                : 'Confirmar Check-out'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrackingDialog;
