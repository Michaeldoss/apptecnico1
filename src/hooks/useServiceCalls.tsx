
import { useState, useMemo } from 'react';
import { toast } from '@/hooks/use-toast';
import { ServiceCall, ServiceCallStatus, ServiceFilters } from '@/types/service-status';

// Mock data para demonstração
const mockServiceCalls: ServiceCall[] = [
  {
    id: 1,
    clientId: 101,
    clientName: 'João Silva',
    clientPhone: '(11) 99999-1111',
    clientWhatsApp: '5511999991111',
    address: 'Rua Augusta, 1500, São Paulo - SP',
    coordinates: [-23.5505, -46.6333],
    scheduledDate: '2024-01-20',
    scheduledTime: '14:00',
    serviceType: 'Manutenção',
    equipment: 'Plotter Eco Solvente',
    agreedValue: 250.00,
    paymentMethod: 'pix',
    paymentStatus: 'retained',
    status: 'novos',
    clientNotes: 'Equipamento apresentando problemas na impressão',
    callHistory: [
      { id: 1, date: '2023-12-15', serviceType: 'Instalação', status: 'concluidos', value: 180 }
    ],
    timeline: [
      { id: 1, status: 'Chamado aberto', date: '2024-01-18', time: '10:30', description: 'Cliente solicitou manutenção', icon: '📞' },
      { id: 2, status: 'Agendado', date: '2024-01-19', time: '09:15', description: 'Agendamento confirmado para 20/01', icon: '📅' }
    ]
  },
  {
    id: 2,
    clientId: 102,
    clientName: 'Maria Santos',
    clientPhone: '(11) 88888-2222',
    clientWhatsApp: '5511888882222',
    address: 'Av. Paulista, 900, São Paulo - SP',
    scheduledDate: '2024-01-18',
    scheduledTime: '09:00',
    serviceType: 'Instalação',
    equipment: 'CNC Router',
    agreedValue: 450.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'released',
    status: 'pendentes',
    clientNotes: 'Instalação em novo endereço, precisa de configuração completa',
    callHistory: [],
    timeline: [
      { id: 1, status: 'Chamado aberto', date: '2024-01-15', time: '14:20', description: 'Solicitação de instalação', icon: '📞' },
      { id: 2, status: 'Agendado', date: '2024-01-16', time: '11:00', description: 'Agendamento para 18/01', icon: '📅' },
      { id: 3, status: 'Em atendimento', date: '2024-01-18', time: '09:00', description: 'Técnico iniciou o atendimento', icon: '🔧' }
    ]
  },
  {
    id: 3,
    clientId: 103,
    clientName: 'Pedro Costa',
    clientPhone: '(11) 77777-3333',
    address: 'Rua Consolação, 250, São Paulo - SP',
    scheduledDate: '2024-01-19',
    scheduledTime: '16:00',
    serviceType: 'Retorno',
    equipment: 'Impressora UV',
    agreedValue: 0,
    paymentMethod: 'balance',
    paymentStatus: 'awaiting',
    status: 'retornos',
    clientNotes: 'Problema persistiu após primeiro atendimento',
    technicianNotes: 'Necessário trocar peça que não estava disponível',
    callHistory: [
      { id: 1, date: '2024-01-10', serviceType: 'Manutenção', status: 'concluidos', value: 180 }
    ],
    timeline: [
      { id: 1, status: 'Primeiro atendimento', date: '2024-01-10', time: '14:00', description: 'Manutenção realizada', icon: '🔧' },
      { id: 2, status: 'Problema reportado', date: '2024-01-17', time: '10:30', description: 'Cliente reportou que problema persistiu', icon: '⚠️' },
      { id: 3, status: 'Retorno agendado', date: '2024-01-18', time: '13:15', description: 'Novo agendamento para completar reparo', icon: '📅' }
    ]
  },
  {
    id: 4,
    clientId: 104,
    clientName: 'Ana Ferreira',
    clientPhone: '(11) 66666-4444',
    address: 'Av. Brigadeiro Faria Lima, 1200, São Paulo - SP',
    scheduledDate: '2024-01-15',
    scheduledTime: '10:00',
    serviceType: 'Orçamento',
    equipment: 'Plotter de Recorte',
    agreedValue: 350.00,
    paymentMethod: 'pix',
    paymentStatus: 'released',
    status: 'concluidos',
    clientNotes: 'Orçamento para reparo completo do equipamento',
    callHistory: [],
    timeline: [
      { id: 1, status: 'Chamado aberto', date: '2024-01-12', time: '15:20', description: 'Solicitação de orçamento', icon: '📞' },
      { id: 2, status: 'Visita realizada', date: '2024-01-15', time: '10:00', description: 'Técnico realizou avaliação', icon: '🔍' },
      { id: 3, status: 'Orçamento aprovado', date: '2024-01-15', time: '11:30', description: 'Cliente aprovou proposta', icon: '✅' },
      { id: 4, status: 'Concluído', date: '2024-01-15', time: '12:00', description: 'Serviço finalizado', icon: '🎉' }
    ]
  },
  {
    id: 5,
    clientId: 105,
    clientName: 'Carlos Mendes',
    clientPhone: '(11) 55555-5555',
    address: 'Rua Oscar Freire, 500, São Paulo - SP',
    scheduledDate: '2024-01-16',
    scheduledTime: '14:30',
    serviceType: 'Manutenção',
    equipment: 'Laser Engraver',
    agreedValue: 200.00,
    paymentMethod: 'debit_card',
    paymentStatus: 'retained',
    status: 'negociacao',
    clientNotes: 'Equipamento não funcionou após manutenção',
    technicianNotes: 'Cliente alega que o problema piorou',
    callHistory: [],
    timeline: [
      { id: 1, status: 'Atendimento realizado', date: '2024-01-16', time: '14:30', description: 'Manutenção executada', icon: '🔧' },
      { id: 2, status: 'Problema reportado', date: '2024-01-17', time: '09:00', description: 'Cliente reportou novo problema', icon: '⚠️' },
      { id: 3, status: 'Em negociação', date: '2024-01-17', time: '15:30', description: 'Caso em análise', icon: '🤝' }
    ],
    negotiation: {
      reason: 'Cliente alega que equipamento ficou pior após manutenção',
      status: 'pending',
      messages: [
        {
          id: 1,
          sender: 'client',
          message: 'O equipamento não está funcionando depois da manutenção',
          timestamp: '2024-01-17T09:00:00Z'
        },
        {
          id: 2,
          sender: 'technician',
          message: 'Vou verificar o que aconteceu, posso fazer uma nova visita',
          timestamp: '2024-01-17T10:30:00Z'
        }
      ],
      evidence: []
    }
  }
];

export const useServiceCalls = () => {
  const [serviceCalls, setServiceCalls] = useState<ServiceCall[]>(mockServiceCalls);
  const [filters, setFilters] = useState<ServiceFilters>({
    search: ''
  });
  const [selectedCall, setSelectedCall] = useState<ServiceCall | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filtrar chamados baseado nos filtros aplicados
  const filteredCalls = useMemo(() => {
    return serviceCalls.filter(call => {
      const matchesSearch = filters.search === '' || 
        call.clientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        call.id.toString().includes(filters.search);

      const matchesCity = !filters.city || 
        call.address.toLowerCase().includes(filters.city.toLowerCase());

      const matchesServiceType = !filters.serviceType || 
        call.serviceType === filters.serviceType;

      const matchesValueRange = !filters.valueRange || 
        (call.agreedValue >= filters.valueRange.min && call.agreedValue <= filters.valueRange.max);

      return matchesSearch && matchesCity && matchesServiceType && matchesValueRange;
    });
  }, [serviceCalls, filters]);

  // Agrupar chamados por status
  const callsByStatus = useMemo(() => {
    const grouped: Record<ServiceCallStatus, ServiceCall[]> = {
      novos: [],
      pendentes: [],
      retornos: [],
      concluidos: [],
      cancelados: [],
      negociacao: []
    };

    filteredCalls.forEach(call => {
      grouped[call.status].push(call);
    });

    return grouped;
  }, [filteredCalls]);

  const updateCallStatus = (callId: number, newStatus: ServiceCallStatus) => {
    setServiceCalls(prev => 
      prev.map(call => 
        call.id === callId ? { ...call, status: newStatus } : call
      )
    );

    toast({
      title: "Status atualizado!",
      description: `Chamado #${callId} foi movido para ${newStatus}.`,
    });
  };

  const addTechnicianNotes = (callId: number, notes: string) => {
    setServiceCalls(prev => 
      prev.map(call => 
        call.id === callId ? { ...call, technicianNotes: notes } : call
      )
    );

    toast({
      title: "Observações salvas!",
      description: "Suas anotações foram adicionadas ao chamado.",
    });
  };

  const openCallDetails = (call: ServiceCall) => {
    setSelectedCall(call);
    setIsDetailsModalOpen(true);
  };

  const closeCallDetails = () => {
    setSelectedCall(null);
    setIsDetailsModalOpen(false);
  };

  return {
    serviceCalls: filteredCalls,
    callsByStatus,
    filters,
    setFilters,
    selectedCall,
    isDetailsModalOpen,
    updateCallStatus,
    addTechnicianNotes,
    openCallDetails,
    closeCallDetails
  };
};
