import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Filter
} from 'lucide-react';
import { format, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { TechnicianAppointment, ViewMode, ScheduleFilters } from '@/types/technician-schedule';

interface TechnicianScheduleCalendarProps {
  appointments: TechnicianAppointment[];
  onAppointmentSelect: (appointment: TechnicianAppointment) => void;
  onCheckIn: (appointmentId: number) => void;
  onCheckOut: (appointmentId: number) => void;
  onReschedule: (appointmentId: number) => void;
  onCancel: (appointmentId: number) => void;
}

const TechnicianScheduleCalendar: React.FC<TechnicianScheduleCalendarProps> = ({
  appointments,
  onAppointmentSelect,
  onCheckIn,
  onCheckOut,
  onReschedule,
  onCancel
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [filters, setFilters] = useState<ScheduleFilters>({});

  // Filtrar appointments baseado nos filtros
  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      if (filters.serviceType && appointment.serviceType !== filters.serviceType) return false;
      if (filters.status && appointment.status !== filters.status) return false;
      if (filters.dateRange) {
        const appointmentDate = new Date(appointment.date);
        if (appointmentDate < filters.dateRange.start || appointmentDate > filters.dateRange.end) return false;
      }
      return true;
    });
  }, [appointments, filters]);

  // Appointments do dia selecionado
  const dailyAppointments = useMemo(() => {
    return filteredAppointments
      .filter(app => isSameDay(new Date(app.date), selectedDate))
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [filteredAppointments, selectedDate]);

  // Appointments da semana
  const weeklyAppointments = useMemo(() => {
    const weekStart = startOfWeek(selectedDate, { locale: ptBR });
    const weekEnd = endOfWeek(selectedDate, { locale: ptBR });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
    
    return weekDays.map(day => ({
      date: day,
      appointments: filteredAppointments.filter(app => isSameDay(new Date(app.date), day))
    }));
  }, [filteredAppointments, selectedDate]);

  // Verificar se tem appointments em uma data
  const hasAppointments = (date: Date) => {
    return filteredAppointments.some(app => isSameDay(new Date(app.date), date));
  };

  // Verificar conflitos de horário
  const hasTimeConflict = (appointment: TechnicianAppointment) => {
    const sameDay = filteredAppointments.filter(app => 
      app.date === appointment.date && app.id !== appointment.id
    );
    return sameDay.some(app => app.time === appointment.time);
  };

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
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, '_blank');
  };

  const getDirectionsToClient = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/dir/Current+Location/${encodedAddress}`;
    window.open(url, '_blank');
  };

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${cleanPhone}`, '_blank');
  };

  const callClient = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header com controles */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Minha Agenda</h2>
          <p className="text-muted-foreground">
            {dailyAppointments.length} agendamentos para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'daily' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('daily')}
          >
            Diário
          </Button>
          <Button
            variant={viewMode === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('weekly')}
          >
            Semanal
          </Button>
          <Button
            variant={viewMode === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('monthly')}
          >
            Mensal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border w-full pointer-events-auto"
              modifiers={{
                hasAppointments: (date) => hasAppointments(date),
              }}
              modifiersStyles={{
                hasAppointments: { 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  fontWeight: 'bold',
                  color: '#3b82f6',
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Lista de Agendamentos */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Agendamentos - {format(selectedDate, "dd/MM/yyyy")}
              </CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {dailyAppointments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum agendamento para este dia</p>
              </div>
            ) : (
              dailyAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className={cn(
                    "p-4 border rounded-lg space-y-3 cursor-pointer hover:bg-muted/50 transition-colors",
                    hasTimeConflict(appointment) && "border-red-300 bg-red-50"
                  )}
                  onClick={() => onAppointmentSelect(appointment)}
                >
                  {/* Header do agendamento */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-semibold">{appointment.time}</div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      {hasTimeConflict(appointment) && (
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Conflito
                        </Badge>
                      )}
                    </div>
                    {appointment.estimatedValue && (
                      <div className="text-lg font-bold text-green-600">
                        R$ {appointment.estimatedValue.toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Informações do cliente */}
                  <div className="space-y-2">
                    <div className="font-medium text-lg">{appointment.clientName}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.serviceType} - {appointment.equipment}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {appointment.address}
                    </div>
                  </div>

                  {/* Ações atualizadas com Google Maps */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        callClient(appointment.clientPhone);
                      }}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Ligar
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        openWhatsApp(appointment.clientPhone);
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        openGoogleMaps(appointment.address);
                      }}
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Ver Local
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        getDirectionsToClient(appointment.address);
                      }}
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Rota
                    </Button>

                    {appointment.status === 'confirmado' && !appointment.checkedIn && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCheckIn(appointment.id);
                        }}
                      >
                        Check-in
                      </Button>
                    )}

                    {appointment.checkedIn && !appointment.checkedOut && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCheckOut(appointment.id);
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Finalizar
                      </Button>
                    )}
                  </div>

                  {appointment.clientNotes && (
                    <div className="mt-3 p-3 bg-muted rounded border-l-4 border-blue-500">
                      <div className="text-sm font-medium mb-1">Observações do cliente:</div>
                      <div className="text-sm text-muted-foreground">{appointment.clientNotes}</div>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechnicianScheduleCalendar;
