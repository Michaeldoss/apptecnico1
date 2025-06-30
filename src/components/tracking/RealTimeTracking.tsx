
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Car, 
  Phone, 
  MessageCircle,
  Eye,
  EyeOff 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TechnicianLocation {
  lat: number;
  lng: number;
  timestamp: string;
  speed?: number;
  heading?: number;
}

interface RealTimeTrackingProps {
  serviceId: string;
  technicianName: string;
  technicianPhone: string;
  customerAddress: string;
  isTrackingActive: boolean;
  estimatedArrival?: string;
  distance?: string;
}

const RealTimeTracking: React.FC<RealTimeTrackingProps> = ({
  serviceId,
  technicianName,
  technicianPhone,
  customerAddress,
  isTrackingActive,
  estimatedArrival,
  distance
}) => {
  const [technicianLocation, setTechnicianLocation] = useState<TechnicianLocation | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { toast } = useToast();

  // Simular localização do técnico em movimento
  useEffect(() => {
    if (!isTrackingActive) return;

    const interval = setInterval(() => {
      // Simular movimento do técnico
      const baseLocation = { lat: -23.5505, lng: -46.6333 };
      const randomOffset = () => (Math.random() - 0.5) * 0.01;
      
      setTechnicianLocation({
        lat: baseLocation.lat + randomOffset(),
        lng: baseLocation.lng + randomOffset(),
        timestamp: new Date().toISOString(),
        speed: Math.random() * 60 + 20, // 20-80 km/h
        heading: Math.random() * 360
      });
    }, 5000); // Atualizar a cada 5 segundos

    return () => clearInterval(interval);
  }, [isTrackingActive]);

  const openLiveMap = () => {
    if (technicianLocation) {
      const destination = encodeURIComponent(customerAddress);
      const origin = `${technicianLocation.lat},${technicianLocation.lng}`;
      const url = `https://www.google.com/maps/dir/${origin}/${destination}`;
      window.open(url, '_blank');
    }
  };

  const handleCall = () => {
    window.open(`tel:${technicianPhone}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Estou acompanhando o atendimento ${serviceId}. Quando você chegará?`);
    window.open(`https://wa.me/55${technicianPhone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  if (!isTrackingActive) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <EyeOff className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Rastreamento não disponível</h3>
          <p className="text-gray-600 mb-4">
            O técnico ainda não ativou o compartilhamento de localização.
          </p>
          <p className="text-sm text-gray-500">
            Você será notificado quando o técnico estiver a caminho.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status do rastreamento */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Eye className="h-5 w-5" />
              Rastreamento Ativo
            </CardTitle>
            <Badge className="bg-green-600 text-white">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              Ao vivo
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span>Chegada: {estimatedArrival || '15-20 min'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-green-600" />
              <span>Distância: {distance || '5.2 km'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mapa em tempo real */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Localização do Técnico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
            {technicianLocation && (
              <iframe
                src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBVhq1HrZhP9VCFRvGF8_Y8w8Z3P1m2p3M&origin=${technicianLocation.lat},${technicianLocation.lng}&destination=${encodeURIComponent(customerAddress)}&mode=driving`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsMapLoaded(true)}
              />
            )}
            
            {!isMapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Carregando mapa...</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={openLiveMap} className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              Abrir Rota Completa
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações do técnico */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold">{technicianName}</h3>
              <p className="text-sm text-gray-600">Técnico responsável</p>
            </div>
            <div className="text-right">
              {technicianLocation?.speed && (
                <p className="text-sm font-medium">
                  {Math.round(technicianLocation.speed)} km/h
                </p>
              )}
              <p className="text-xs text-gray-500">
                Atualizado agora
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCall} className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Ligar
            </Button>
            <Button variant="outline" size="sm" onClick={handleWhatsApp} className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações adicionais */}
      <div className="text-center text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
        <p>🚗 O técnico está a caminho do seu endereço</p>
        <p>📍 Localização atualizada automaticamente</p>
        <p>📞 Entre em contato se precisar de mais informações</p>
      </div>
    </div>
  );
};

export default RealTimeTracking;
