
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { useServiceCalls } from '@/hooks/useServiceCalls';
import ServiceCallsFilters from '@/components/services/ServiceCallsFilters';
import ServiceCallsPanel from '@/components/services/ServiceCallsPanel';
import ServiceCallDetailsModal from '@/components/services/ServiceCallDetailsModal';

const TechnicianServices = () => {
  const {
    callsByStatus,
    filters,
    setFilters,
    selectedCall,
    isDetailsModalOpen,
    addTechnicianNotes,
    openCallDetails,
    closeCallDetails
  } = useServiceCalls();

  return (
    <TechnicianLayout title="Gerenciamento de Serviços">
      <div className="space-y-6">
        {/* Informativo sobre o sistema */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            🛠️ Central de Chamados Técnicos
          </h3>
          <p className="text-blue-700 text-sm mb-3">
            Gerencie todos os seus chamados organizados por status. Cada categoria pode ser expandida 
            ou recolhida para melhor visualização. Clique em "Ver Detalhes" para acessar informações 
            completas do cliente e histórico de atendimentos.
          </p>
          <div className="flex gap-4 text-xs text-blue-600">
            <span>✓ Acesso rápido aos contatos</span>
            <span>✓ Navegação GPS integrada</span>
            <span>✓ Timeline completa do atendimento</span>
            <span>✓ Histórico do cliente</span>
          </div>
        </div>

        {/* Filtros */}
        <ServiceCallsFilters
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Painel de Chamados */}
        <ServiceCallsPanel
          callsByStatus={callsByStatus}
          onOpenDetails={openCallDetails}
        />

        {/* Modal de Detalhes */}
        <ServiceCallDetailsModal
          call={selectedCall}
          isOpen={isDetailsModalOpen}
          onClose={closeCallDetails}
          onAddNotes={addTechnicianNotes}
        />
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianServices;
