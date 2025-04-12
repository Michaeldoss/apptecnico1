
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Printer, Scissors, Wrench } from 'lucide-react';
import { Service } from '@/types/service';
import ServicesList from '@/components/services/ServicesList';
import TrackingDialog from '@/components/services/TrackingDialog';
import { useServices } from '@/hooks/useServices';

const equipmentCategories = [
  { id: 'printers', label: 'Plotters', icon: <Printer className="h-4 w-4 mr-2" /> },
  { id: 'finishing', label: 'Acabamento', icon: <Scissors className="h-4 w-4 mr-2" /> },
  { id: 'cnc', label: 'Máquinas CNC', icon: <Wrench className="h-4 w-4 mr-2" /> },
];

const TechnicianServices = () => {
  const { services, searchQuery, setSearchQuery, handleTrackingAction } = useServices();
  
  // States for tracking dialog
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [trackingAction, setTrackingAction] = useState<'checkin' | 'checkout' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
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

  // Filter services by equipment category if selected
  const filteredServices = selectedCategory 
    ? services.filter(service => {
        if (selectedCategory === 'printers') {
          return service.equipmentType?.includes('plotter') || 
                 service.description?.toLowerCase().includes('impressora') || 
                 service.description?.toLowerCase().includes('plotter');
        } else if (selectedCategory === 'finishing') {
          return service.equipmentType?.includes('calandra') || 
                 service.equipmentType?.includes('prensa') ||
                 service.equipmentType?.includes('carrossel') ||
                 service.equipmentType?.includes('costura');
        } else if (selectedCategory === 'cnc') {
          return service.equipmentType?.includes('cnc') || 
                 service.equipmentType?.includes('router') ||
                 service.equipmentType?.includes('laser');
        }
        return true;
      })
    : services;
  
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

        {/* Equipment Categories Filter */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          
          {equipmentCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center"
            >
              {category.icon} {category.label}
            </Button>
          ))}
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
              services={filteredServices} 
              onShowTrackingDialog={handleShowTrackingDialog} 
            />
          </TabsContent>
          
          {['pending', 'in-progress', 'completed', 'canceled'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <ServicesList 
                services={filteredServices.filter(service => service.status === tab)} 
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
