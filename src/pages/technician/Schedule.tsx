
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import TechnicianScheduleCalendar from '@/components/technician/TechnicianScheduleCalendar';
import AppointmentDetailsModal from '@/components/technician/AppointmentDetailsModal';
import LocationSharingControl from '@/components/technician/LocationSharingControl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useTechnicianSchedule } from '@/hooks/useTechnicianSchedule';

const TechnicianSchedule = () => {
  const {
    appointments,
    selectedAppointment,
    isDetailsModalOpen,
    dailyStats,
    handleCheckIn,
    handleCheckOut,
    handleReschedule,
    handleCancel,
    handleAppointmentSelect,
    handleCloseDetailsModal,
  } = useTechnicianSchedule();

  // Dados mock para o controle de localização
  const nextAppointment = appointments.find(apt => apt.status === 'confirmed');

  return (
    <TechnicianLayout title="Minha Agenda">
      <div className="space-y-6">
        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dailyStats.total}</div>
              <p className="text-xs text-muted-foreground">
                agendamentos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dailyStats.confirmed}</div>
              <p className="text-xs text-muted-foreground">
                prontos para atender
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{dailyStats.pending}</div>
              <p className="text-xs text-muted-foreground">
                aguardando confirmação
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{dailyStats.completed}</div>
              <p className="text-xs text-muted-foreground">
                serviços finalizados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alertas importantes */}
        {dailyStats.pending > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                Atenção Necessária
              </CardTitle>
              <CardDescription className="text-yellow-700">
                Você tem {dailyStats.pending} agendamento{dailyStats.pending > 1 ? 's' : ''} pendente{dailyStats.pending > 1 ? 's' : ''} de confirmação.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Tabs para agenda e rastreamento */}
        <Tabs defaultValue="agenda" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="agenda">Minha Agenda</TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Rastreamento
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="agenda" className="space-y-6">
            {/* Calendário principal */}
            <TechnicianScheduleCalendar
              appointments={appointments}
              onAppointmentSelect={handleAppointmentSelect}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
            />
          </TabsContent>
          
          <TabsContent value="tracking" className="space-y-6">
            {nextAppointment ? (
              <LocationSharingControl
                serviceId={nextAppointment.id}
                customerName={nextAppointment.client}
                customerAddress={nextAppointment.address}
                estimatedDistance="8.5 km"
                estimatedTime="20-25 min"
              />
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Nenhum agendamento ativo</h3>
                  <p className="text-gray-600">
                    O controle de rastreamento ficará disponível quando você tiver um agendamento confirmado.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Modal de detalhes */}
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
        />
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianSchedule;
