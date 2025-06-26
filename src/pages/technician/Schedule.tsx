
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import TechnicianScheduleCalendar from '@/components/technician/TechnicianScheduleCalendar';
import AppointmentDetailsModal from '@/components/technician/AppointmentDetailsModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp
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

        {/* Calendário principal */}
        <TechnicianScheduleCalendar
          appointments={appointments}
          onAppointmentSelect={handleAppointmentSelect}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
        />

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
