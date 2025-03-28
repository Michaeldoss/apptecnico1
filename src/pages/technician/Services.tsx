
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Service } from '@/types/service';
import ServicesList from '@/components/services/ServicesList';
import TrackingDialog from '@/components/services/TrackingDialog';
import { useServices } from '@/hooks/useServices';

const TechnicianServices = () => {
  const { services, searchQuery, setSearchQuery, handleTrackingAction } = useServices();
  
  // States for tracking dialog
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [trackingAction, setTrackingAction] = useState<'checkin' | 'checkout' | null>(null);
  
  const handleShowTrackingDialog = (service: Service, action: 'checkin' | 'checkout') => {
    setSelectedService(service);
    setTrackingAction(action);
    setIsTrackingDialogOpen(true);
  };
  
  const handleConfirmTracking = () => {
    if (!selectedService || !trackingAction) return;
    
    handleTrackingAction(selectedService, trackingAction);
    setIsTrackingDialogOpen(false);
  };
  
  return (
    <TechnicianLayout title="Gerenciamento de Serviços">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, tipo ou descrição"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>Novo Serviço</Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
            <TabsTrigger value="canceled">Cancelados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <ServicesList 
              services={services} 
              onShowTrackingDialog={handleShowTrackingDialog} 
            />
          </TabsContent>
          
          {['pending', 'in-progress', 'completed', 'canceled'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <ServicesList 
                services={services} 
                statusFilter={tab} 
                onShowTrackingDialog={handleShowTrackingDialog} 
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Tracking Dialog */}
      <TrackingDialog
        isOpen={isTrackingDialogOpen}
        onOpenChange={setIsTrackingDialogOpen}
        selectedService={selectedService}
        trackingAction={trackingAction}
        onConfirm={handleConfirmTracking}
      />
    </TechnicianLayout>
  );
};

export default TechnicianServices;
