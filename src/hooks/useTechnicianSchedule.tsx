
import { useState, useCallback, useMemo } from 'react';
import { TechnicianAppointment, ScheduleFilters } from '@/types/technician-schedule';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

export const useTechnicianSchedule = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<TechnicianAppointment[]>([
    {
      id: 1,
      clientId: 101,
      clientName: 'Mariana Costa',
      clientPhone: '(11) 99999-1234',
      clientWhatsApp: '(11) 99999-1234',
      address: 'Rua Vergueiro, 500, Vila Mariana, São Paulo - SP',
      serviceType: 'manutencao',
      equipment: 'Notebook Dell Inspiron 15',
      estimatedValue: 150.00,
      clientNotes: 'Notebook está com tela piscando e às vezes fica preta. Problema começou há 3 dias.',
      date: '2024-01-15',
      time: '09:00',
      status: 'confirmado',
      technicianId: user?.id || 1,
      checkedIn: false,
      checkedOut: false,
    },
    {
      id: 2,
      clientId: 102,
      clientName: 'Rafael Gomes',
      clientPhone: '(11) 98888-5678',
      address: 'Av. Paulista, 1000, Bela Vista, São Paulo - SP',
      serviceType: 'instalacao',
      equipment: 'Sistema de Backup',
      estimatedValue: 300.00,
      date: '2024-01-15',
      time: '14:30',
      status: 'pendente',
      technicianId: user?.id || 1,
      checkedIn: false,
      checkedOut: false,
    },
    {
      id: 3,
      clientId: 103,
      clientName: 'Carla Mendes',
      clientPhone: '(11) 97777-9012',
      address: 'Rua Augusta, 1200, Consolação, São Paulo - SP',
      serviceType: 'visita_tecnica',
      equipment: 'PC Desktop',
      clientNotes: 'PC não liga, precisa de diagnóstico completo.',
      date: '2024-01-16',
      time: '10:00',
      status: 'confirmado',
      technicianId: user?.id || 1,
      checkedIn: false,
      checkedOut: false,
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState<TechnicianAppointment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filtrar apenas appointments do técnico logado
  const technicianAppointments = useMemo(() => {
    return appointments.filter(apt => apt.technicianId === (user?.id || 1));
  }, [appointments, user?.id]);

  const handleCheckIn = useCallback((appointmentId: number) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { 
            ...apt, 
            checkedIn: true, 
            checkinTime: new Date().toISOString(),
            status: 'confirmado' as const
          }
        : apt
    ));
    
    toast({
      title: "Check-in realizado",
      description: "Atendimento iniciado com sucesso.",
    });
  }, []);

  const handleCheckOut = useCallback((appointmentId: number) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { 
            ...apt, 
            checkedOut: true, 
            checkoutTime: new Date().toISOString(),
            status: 'concluido' as const
          }
        : apt
    ));
    
    toast({
      title: "Atendimento finalizado",
      description: "Serviço concluído com sucesso.",
    });
  }, []);

  const handleReschedule = useCallback((appointmentId: number) => {
    // Aqui seria implementada a lógica de reagendamento
    toast({
      title: "Reagendamento",
      description: "Funcionalidade de reagendamento será implementada.",
    });
  }, []);

  const handleCancel = useCallback((appointmentId: number) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'cancelado' as const }
        : apt
    ));
    
    toast({
      title: "Agendamento cancelado",
      description: "O agendamento foi cancelado.",
      variant: "destructive",
    });
  }, []);

  const handleAppointmentSelect = useCallback((appointment: TechnicianAppointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsModalOpen(true);
  }, []);

  const handleCloseDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setSelectedAppointment(null);
  }, []);

  // Calcular estatísticas
  const dailyStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = technicianAppointments.filter(apt => apt.date === today);
    
    return {
      total: todayAppointments.length,
      confirmed: todayAppointments.filter(apt => apt.status === 'confirmado').length,
      completed: todayAppointments.filter(apt => apt.status === 'concluido').length,
      pending: todayAppointments.filter(apt => apt.status === 'pendente').length,
    };
  }, [technicianAppointments]);

  return {
    appointments: technicianAppointments,
    selectedAppointment,
    isDetailsModalOpen,
    dailyStats,
    handleCheckIn,
    handleCheckOut,
    handleReschedule,
    handleCancel,
    handleAppointmentSelect,
    handleCloseDetailsModal,
  };
};
