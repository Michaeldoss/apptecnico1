
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatusBadge from '@/components/services/StatusBadge';
import RatingStars from '@/components/services/RatingStars';
import { ArrowLeft, MapPin, Clock, Phone, CheckCircle, User } from 'lucide-react';

const CustomerTracking = () => {
  const { id } = useParams<{ id: string }>();
  const { data: services, isLoading, rateTechnician } = useServices();
  const [showRating, setShowRating] = useState(false);
  
  // Find active service or use the one from the URL
  const service = id 
    ? services.find(s => s.id === Number(id))
    : services.find(s => s.tracking?.checkedIn && !s.tracking?.checkedOut);
  
  const handleRateTechnician = (rating: number) => {
    if (service) {
      rateTechnician(service.id, rating);
      setShowRating(false);
    }
  };
  
  // Check if there's a technician in the field
  const isTechnicianActive = service?.tracking?.checkedIn && !service?.tracking?.checkedOut;
  
  // Mock technician location with simulated coordinates
  const [location, setLocation] = useState({ lat: 40.712776, lng: -74.005974 });
  const [arrived, setArrived] = useState(false);
  
  useEffect(() => {
    // For demo purposes, simulate the technician's movement
    if (isTechnicianActive && !arrived) {
      const interval = setInterval(() => {
        setLocation(prev => ({
          lat: prev.lat + (Math.random() * 0.002 - 0.001),
          lng: prev.lng + (Math.random() * 0.002 - 0.001),
        }));
      }, 5000);
      
      // Simulate arrival after some time
      const arrivalTimeout = setTimeout(() => {
        setArrived(true);
        clearInterval(interval);
      }, 30000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(arrivalTimeout);
      };
    }
  }, [isTechnicianActive, arrived]);
  
  if (isLoading) {
    return (
      <CustomerLayout title="Carregando...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </CustomerLayout>
    );
  }
  
  if (!service) {
    return (
      <CustomerLayout title="Rastreamento de Técnico">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Nenhum técnico em campo</h3>
            <p className="text-muted-foreground mb-4">
              Não há técnicos em atendimento no momento.
            </p>
            <Button asChild>
              <Link to="/cliente/servicos">Ver Meus Serviços</Link>
            </Button>
          </CardContent>
        </Card>
      </CustomerLayout>
    );
  }
  
  return (
    <CustomerLayout title="Rastreamento de Técnico">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Técnico em Atendimento</CardTitle>
              <StatusBadge status={service.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium">Técnico Demo</h4>
                <p className="text-sm text-muted-foreground">Especialista em {service.type}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Serviço</p>
                <p>{service.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Data</p>
                <p className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {service.tracking?.checkinTime || service.date}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Local</p>
                <p className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {service.address}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Contato</p>
                <p className="flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-1" />
                  (11) 98765-4321
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-3">Status do Técnico</p>
              
              {service.tracking?.checkedOut ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Serviço finalizado às {service.tracking.checkoutTime}</span>
                </div>
              ) : service.tracking?.checkedIn ? (
                <div className="space-y-4">
                  <div className="flex items-center text-blue-600">
                    {arrived ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>Técnico chegou ao local e está realizando o atendimento</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-5 w-5 mr-2" />
                        <span>Técnico a caminho - Chegada prevista em aproximadamente 15 minutos</span>
                      </>
                    )}
                  </div>
                  
                  <div className="rounded-md overflow-hidden h-64 bg-gray-100 flex items-center justify-center">
                    {/* This would be a real map in a production app */}
                    <div className="text-center p-4">
                      <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p>Mapa de localização em tempo real</p>
                      <p className="text-sm text-muted-foreground">Coordenadas: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Aguardando o técnico iniciar o atendimento</span>
                </div>
              )}
            </div>
          </CardContent>
          
          {service.tracking?.checkedOut && !service.technicianRating && !showRating && (
            <CardFooter className="flex justify-center border-t pt-4">
              <Button 
                variant="outline"
                onClick={() => setShowRating(true)}
              >
                Avaliar Técnico
              </Button>
            </CardFooter>
          )}
          
          {showRating && (
            <CardFooter className="flex flex-col items-center border-t pt-4 space-y-4">
              <p className="font-medium">Como você avalia o serviço do técnico?</p>
              <RatingStars onChange={handleRateTechnician} />
            </CardFooter>
          )}
          
          {service.technicianRating && (
            <CardFooter className="flex flex-col items-center border-t pt-4 space-y-2">
              <p className="text-sm">Sua avaliação para este técnico:</p>
              <RatingStars initialRating={service.technicianRating} readOnly />
              <p className="text-xs text-muted-foreground">Obrigado pelo feedback!</p>
            </CardFooter>
          )}
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default CustomerTracking;
