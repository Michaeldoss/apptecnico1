import { useState, useMemo } from 'react';
import { toast } from '@/hooks/use-toast';
import { ServiceCall, ServiceCallStatus, ServiceFilters } from '@/types/service-status';

// Dados fake removidos - array vazio
const mockServiceCalls: ServiceCall[] = [];

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