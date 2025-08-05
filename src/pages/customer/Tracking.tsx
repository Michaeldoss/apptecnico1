
import React, { useState, useEffect } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import RealTimeTracking from '@/components/tracking/RealTimeTracking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Search, User, Clock, CheckCircle, MapPin, Navigation } from 'lucide-react';

const CustomerTracking = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showRealTimeTracking, setShowRealTimeTracking] = useState(false);
  
  const handleSearch = () => {
    if (!trackingCode.trim()) return;
    
    // Busca limpa - sem dados fake
    const mockResult = {
      status: 'Serviço não encontrado',
      technician: '',
      technicianPhone: '',
      lastUpdate: '',
      code: trackingCode,
      customerAddress: '',
      isTrackingActive: false,
      estimatedArrival: '',
      distance: ''
    };
    
    setSearchResult(mockResult);
    setShowRealTimeTracking(true);
  };

  const openGoogleMapsRoute = (address) => {
    const destination = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${destination}`;
    window.open(url, '_blank');
  };
  
  return (
    <CustomerLayout title="">
      <div className="min-h-screen flex justify-center items-start px-4 py-8">
        <div className="w-full max-w-2xl space-y-8">
          {/* Título centralizado */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-tech-primary font-inter">
              Rastreamento de Chamado Técnico
            </h1>
          </div>
          
          {/* Campo de entrada e botão */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label 
                htmlFor="trackingCode" 
                className="block text-center text-gray-primary font-inter font-medium"
              >
                Digite o código do atendimento
              </Label>
              <div className="flex justify-center">
                <Input
                  id="trackingCode"
                  placeholder="Ex: DOSS123456"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-96 max-w-full p-3 border-gray-border rounded-lg text-center font-inter"
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleSearch}
                className="bg-tech-primary text-white font-inter font-medium px-8 py-3 rounded-lg transition-all duration-200 hover:bg-tech-primary-hover hover:shadow-lg"
                disabled={!trackingCode.trim()}
              >
                <Search className="h-4 w-4 mr-2" />
                Rastrear Chamado
              </Button>
            </div>
          </div>
          
          {/* Resultado da busca com rastreamento em tempo real */}
          {searchResult && showRealTimeTracking && (
            <div className="space-y-6">
              {/* Informações básicas do chamado */}
              <Card className="bg-white border border-gray-border shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="h-12 w-12 rounded-full bg-tech-primary/10 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-tech-primary" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-primary font-inter mb-4">
                      Chamado Encontrado
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-secondary font-inter">Código:</span>
                      <span className="font-medium text-gray-primary font-inter">{searchResult.code}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-secondary font-inter">Status:</span>
                      <span className="font-medium text-tech-primary font-inter">{searchResult.status}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-secondary font-inter flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Técnico:
                      </span>
                      <span className="font-medium text-gray-primary font-inter">{searchResult.technician}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-secondary font-inter flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Atualização:
                      </span>
                      <span className="font-medium text-gray-primary font-inter text-sm">{searchResult.lastUpdate}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button 
                      onClick={() => openGoogleMapsRoute(searchResult.customerAddress)}
                      variant="outline" 
                      className="w-full"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Ver Endereço no Mapa
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Componente de rastreamento em tempo real */}
              <RealTimeTracking
                serviceId={searchResult.code}
                technicianName={searchResult.technician}
                technicianPhone={searchResult.technicianPhone}
                customerAddress={searchResult.customerAddress}
                isTrackingActive={searchResult.isTrackingActive}
                estimatedArrival={searchResult.estimatedArrival}
                distance={searchResult.distance}
              />
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerTracking;
