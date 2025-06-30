
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Eye, 
  EyeOff, 
  Clock, 
  Navigation,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LocationSharingControlProps {
  serviceId: string;
  customerName: string;
  customerAddress: string;
  estimatedDistance: string;
  estimatedTime: string;
}

const LocationSharingControl: React.FC<LocationSharingControlProps> = ({
  serviceId,
  customerName,
  customerAddress,
  estimatedDistance,
  estimatedTime
}) => {
  const [isTrackingActive, setIsTrackingActive] = useState(false);
  const [autoActivateDistance, setAutoActivateDistance] = useState<number | null>(null);
  const [autoActivateTime, setAutoActivateTime] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();

  // Obter localização atual
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Erro ao obter localização:', error);
          // Usar localização padrão de São Paulo
          setCurrentLocation({
            lat: -23.5505,
            lng: -46.6333
          });
        }
      );
    }
  }, []);

  const toggleTracking = () => {
    setIsTrackingActive(!isTrackingActive);
    
    if (!isTrackingActive) {
      toast({
        title: "Rastreamento ativado",
        description: `${customerName} agora pode acompanhar sua localização.`,
      });
    } else {
      toast({
        title: "Rastreamento desativado",
        description: "O cliente não pode mais ver sua localização.",
      });
    }
  };

  const setAutoActivateByDistance = (km: number) => {
    setAutoActivateDistance(km);
    setAutoActivateTime(null);
    toast({
      title: "Ativação automática configurada",
      description: `Rastreamento será ativado quando você estiver a ${km}km do cliente.`,
    });
  };

  const setAutoActivateByTime = (minutes: number) => {
    setAutoActivateTime(minutes);
    setAutoActivateDistance(null);
    toast({
      title: "Ativação automática configurada",
      description: `Rastreamento será ativado ${minutes} minutos antes da chegada.`,
    });
  };

  const openRoute = () => {
    if (currentLocation) {
      const destination = encodeURIComponent(customerAddress);
      const origin = `${currentLocation.lat},${currentLocation.lng}`;
      const url = `https://www.google.com/maps/dir/${origin}/${destination}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      {/* Status atual */}
      <Card className={isTrackingActive ? 'border-green-200 bg-green-50' : 'border-gray-200'}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {isTrackingActive ? (
                <>
                  <Eye className="h-5 w-5 text-green-600" />
                  Compartilhamento Ativo
                </>
              ) : (
                <>
                  <EyeOff className="h-5 w-5 text-gray-600" />
                  Localização Privada
                </>
              )}
            </CardTitle>
            <Switch
              checked={isTrackingActive}
              onCheckedChange={toggleTracking}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Cliente:</span>
              <span className="font-medium">{customerName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Distância:</span>
              <span className="font-medium">{estimatedDistance}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tempo estimado:</span>
              <span className="font-medium">{estimatedTime}</span>
            </div>
            
            {isTrackingActive && (
              <div className="mt-3 p-2 bg-green-100 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>O cliente pode ver sua localização em tempo real</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ativação automática */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Ativação Automática
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-3">Por distância:</p>
              <div className="flex gap-2 flex-wrap">
                {[5, 10, 20, 50].map((km) => (
                  <Button
                    key={km}
                    variant={autoActivateDistance === km ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAutoActivateByDistance(km)}
                  >
                    {km}km
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-3">Por tempo:</p>
              <div className="flex gap-2 flex-wrap">
                {[15, 30, 60, 120].map((minutes) => (
                  <Button
                    key={minutes}
                    variant={autoActivateTime === minutes ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAutoActivateByTime(minutes)}
                  >
                    {minutes}min
                  </Button>
                ))}
              </div>
            </div>

            {(autoActivateDistance || autoActivateTime) && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    {autoActivateDistance && `Ativará automaticamente a ${autoActivateDistance}km do destino`}
                    {autoActivateTime && `Ativará automaticamente ${autoActivateTime} minutos antes da chegada`}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ações rápidas */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Button onClick={openRoute} className="w-full" variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Abrir Rota no Google Maps
            </Button>
            
            <div className="text-center text-xs text-gray-500">
              <p>💡 Dica: Ative o rastreamento quando estiver próximo para melhor experiência do cliente</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationSharingControl;
