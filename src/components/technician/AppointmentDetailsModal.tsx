
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  User, 
  Wrench,
  DollarSign,
  FileText,
  History,
  Navigation,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { TechnicianAppointment } from '@/types/technician-schedule';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AppointmentDetailsModalProps {
  appointment: TechnicianAppointment | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckIn: (appointmentId: number) => void;
  onCheckOut: (appointmentId: number) => void;
  onReschedule: (appointmentId: number) => void;
  onCancel: (appointmentId: number) => void;
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onCheckIn,
  onCheckOut,
  onReschedule,
  onCancel
}) => {
  if (!appointment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'confirmado': return 'bg-blue-100 text-blue-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${cleanPhone}`, '_blank');
  };

  const callClient = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Calendar className="h-5 w-5" />
            Detalhes do Agendamento
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">{appointment.clientName}</div>
                  <div className="text-sm text-muted-foreground">Cliente</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">
                    {format(new Date(appointment.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </div>
                  <div className="text-sm text-muted-foreground">{appointment.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Wrench className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">{appointment.serviceType}</div>
                  <div className="text-sm text-muted-foreground">{appointment.equipment}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {appointment.estimatedValue && (
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-600">
                      R$ {appointment.estimatedValue.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Valor estimado</div>
                  </div>
                </div>
              )}

              {appointment.checkedIn && (
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold">Check-in realizado</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.checkinTime && format(new Date(appointment.checkinTime), 'HH:mm')}
                    </div>
                  </div>
                </div>
              )}

              {appointment.checkedOut && (
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">Serviço finalizado</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.checkoutTime && format(new Date(appointment.checkoutTime), 'HH:mm')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Endereço */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="font-semibold">Endereço</div>
            </div>
            <div className="pl-8">
              <div className="mb-3">{appointment.address}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openGoogleMaps(appointment.address)}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Ver no Google Maps
              </Button>
            </div>
          </div>

          <Separator />

          {/* Contato */}
          <div className="space-y-3">
            <div className="font-semibold">Contato</div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => callClient(appointment.clientPhone)}
              >
                <Phone className="h-4 w-4 mr-2" />
                {appointment.clientPhone}
              </Button>
              <Button
                variant="outline"
                onClick={() => openWhatsApp(appointment.clientPhone)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Observações do cliente */}
          {appointment.clientNotes && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="font-semibold">Observações do Cliente</div>
                </div>
                <div className="pl-8 p-3 bg-muted rounded border-l-4 border-blue-500">
                  {appointment.clientNotes}
                </div>
              </div>
            </>
          )}

          {/* Histórico de atendimentos */}
          {appointment.previousServices && appointment.previousServices.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <History className="h-5 w-5 text-primary" />
                  <div className="font-semibold">Histórico de Atendimentos</div>
                </div>
                <div className="pl-8 space-y-2">
                  {appointment.previousServices.map((service, index) => (
                    <div key={index} className="p-3 bg-muted rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{service.serviceType}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(service.date), "dd/MM/yyyy")} - {service.equipment}
                          </div>
                        </div>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Ações */}
          <div className="flex flex-wrap gap-3">
            {appointment.status === 'confirmado' && !appointment.checkedIn && (
              <Button onClick={() => onCheckIn(appointment.id)}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Fazer Check-in
              </Button>
            )}

            {appointment.checkedIn && !appointment.checkedOut && (
              <Button 
                variant="secondary"
                onClick={() => onCheckOut(appointment.id)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Finalizar Atendimento
              </Button>
            )}

            {appointment.status !== 'concluido' && appointment.status !== 'cancelado' && (
              <>
                <Button 
                  variant="outline"
                  onClick={() => onReschedule(appointment.id)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Reagendar
                </Button>
                
                <Button 
                  variant="destructive"
                  onClick={() => onCancel(appointment.id)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsModal;
