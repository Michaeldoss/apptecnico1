
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, User, ExternalLink } from 'lucide-react';
import { Technician } from '@/types/technician';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface TechnicianMapProps {
  technicians: Technician[];
  selectedTechnician: Technician | null;
  setSelectedTechnician: (technician: Technician | null) => void;
}

const TechnicianMap: React.FC<TechnicianMapProps> = ({
  technicians,
  selectedTechnician,
  setSelectedTechnician
}) => {
  const mapRef = useRef<HTMLIFrameElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [currentMapBounds, setCurrentMapBounds] = useState<{ center: { lat: number; lng: number }, zoom: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Obter localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Define São Paulo como localização padrão se não conseguir obter a localização
          setUserLocation({
            lat: -23.5505,
            lng: -46.6333
          });
          toast({
            title: "Localização padrão",
            description: "Usando São Paulo como localização de referência.",
          });
        }
      );
    } else {
      // Define São Paulo como localização padrão
      setUserLocation({
        lat: -23.5505,
        lng: -46.6333
      });
    }
  }, [toast]);

  // Função para calcular o centro e zoom baseado nos técnicos
  const getMapCenter = () => {
    if (technicians.length === 0) {
      // Se não há técnicos, mostrar Brasil inteiro
      return {
        lat: -14.2350,
        lng: -51.9253,
        zoom: 4
      };
    }
    
    if (technicians.length === 1) {
      const tech = technicians[0];
      return {
        lat: tech.coordinates ? tech.coordinates[0] : -23.5505,
        lng: tech.coordinates ? tech.coordinates[1] : -46.6333,
        zoom: 12
      };
    }
    
    // Calcular centro baseado nos técnicos disponíveis
    const avgLat = technicians.reduce((sum, tech) => {
      const lat = tech.coordinates ? tech.coordinates[0] : -23.5505;
      return sum + lat;
    }, 0) / technicians.length;
    
    const avgLng = technicians.reduce((sum, tech) => {
      const lng = tech.coordinates ? tech.coordinates[1] : -46.6333;
      return sum + lng;
    }, 0) / technicians.length;
    
    return {
      lat: avgLat,
      lng: avgLng,
      zoom: 8
    };
  };

  const mapCenter = getMapCenter();

  // Atualizar bounds do mapa quando mudar o centro
  useEffect(() => {
    setCurrentMapBounds({ center: mapCenter, zoom: mapCenter.zoom });
  }, [mapCenter.lat, mapCenter.lng, mapCenter.zoom]);

  // Converter coordenadas geográficas para posições no mapa
  const calculateMapPosition = (technician: Technician, mapCenter: any) => {
    const techLat = technician.coordinates ? technician.coordinates[0] : -23.5505 + (technician.id * 0.01);
    const techLng = technician.coordinates ? technician.coordinates[1] : -46.6333 + (technician.id * 0.01);
    
    // Calcular posição relativa baseada no centro do mapa
    const latDiff = techLat - mapCenter.lat;
    const lngDiff = techLng - mapCenter.lng;
    
    // Converter diferenças para posições percentuais no mapa
    // Ajustar escala baseada no zoom
    const scale = mapCenter.zoom >= 12 ? 0.8 : mapCenter.zoom >= 8 ? 0.4 : 0.2;
    
    const x = 50 + (lngDiff * scale * 100);
    const y = 50 - (latDiff * scale * 100);
    
    // Limitar posições dentro do mapa visível
    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y))
    };
  };

  const handleMarkerClick = (technician: Technician) => {
    setSelectedTechnician(technician);
  };

  const openGoogleMapsWithTechnicians = () => {
    if (userLocation) {
      // Criar uma URL do Google Maps com múltiplos pontos (técnicos)
      let url = `https://www.google.com/maps/search/técnicos+assistência+técnica/@${userLocation.lat},${userLocation.lng},12z`;
      
      // Adicionar técnicos como pontos de interesse
      if (technicians.length > 0) {
        const locations = technicians.map((tech, index) => {
          const lat = tech.coordinates ? tech.coordinates[0] : -23.5505 + (tech.id * 0.01);
          const lng = tech.coordinates ? tech.coordinates[1] : -46.6333 + (tech.id * 0.01);
          return `${lat},${lng}`;
        }).join('|');
        
        url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${locations}`;
      }
      
      window.open(url, '_blank');
    }
  };

  const viewTechnicianOnGoogleMaps = (technician: Technician) => {
    const lat = technician.coordinates ? technician.coordinates[0] : -23.5505 + (technician.id * 0.01);
    const lng = technician.coordinates ? technician.coordinates[1] : -46.6333 + (technician.id * 0.01);
    const query = encodeURIComponent(`${technician.name} - ${technician.location}`);
    const url = `https://www.google.com/maps/search/${query}/@${lat},${lng},15z`;
    window.open(url, '_blank');
  };

  const getDirectionsToTechnician = (technician: Technician) => {
    if (userLocation) {
      const techLat = technician.coordinates ? technician.coordinates[0] : -23.5505 + (technician.id * 0.01);
      const techLng = technician.coordinates ? technician.coordinates[1] : -46.6333 + (technician.id * 0.01);
      const destination = encodeURIComponent(`${technician.name} - ${technician.location}`);
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${techLat},${techLng}`;
      window.open(url, '_blank');
    }
  };

  const openInGoogleMaps = () => {
    if (technicians.length > 0) {
      // Se há técnicos filtrados, calcular centro baseado neles
      const avgLat = technicians.reduce((sum, tech) => {
        const lat = tech.coordinates ? tech.coordinates[0] : -23.5505;
        return sum + lat;
      }, 0) / technicians.length;
      
      const avgLng = technicians.reduce((sum, tech) => {
        const lng = tech.coordinates ? tech.coordinates[1] : -46.6333;
        return sum + lng;
      }, 0) / technicians.length;
      
      const query = encodeURIComponent('técnicos assistência técnica equipamentos');
      const url = `https://www.google.com/maps/search/${query}/@${avgLat},${avgLng},10z`;
      window.open(url, '_blank');
    } else if (userLocation) {
      // Fallback para localização do usuário
      const centerLat = userLocation.lat;
      const centerLng = userLocation.lng;
      const query = encodeURIComponent('técnicos assistência técnica equipamentos');
      const url = `https://www.google.com/maps/search/${query}/@${centerLat},${centerLng},12z`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg border">
      {/* Google Maps Embed */}
      <div className="absolute inset-0">
        <iframe
          ref={mapRef}
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${mapCenter.zoom === 4 ? '15000000' : mapCenter.zoom === 8 ? '400000' : '100000'}!2d${mapCenter.lng}!3d${mapCenter.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f${mapCenter.zoom}.1!3m3!1m2!1s0x0%3A0x0!2zVMOpY25pY29z!5e0!3m2!1spt!2sbr!4v1699999999999!5m2!1spt!2sbr`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
          key={`${mapCenter.lat}-${mapCenter.lng}-${mapCenter.zoom}-${technicians.length}`}
        />
        
        {/* Overlay que força reposicionamento dos marcadores */}
        <div 
          className="absolute inset-0 opacity-0 pointer-events-none"
          key={`overlay-${mapCenter.lat}-${mapCenter.lng}-${mapCenter.zoom}`}
        />
      </div>
      
      {/* Overlay com marcadores dos técnicos */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Marcador para localização do usuário */}
        {userLocation && (
          <div 
            className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
            style={{ left: '50%', top: '50%' }}
            title="Sua localização"
          >
            <div className="animate-ping absolute h-full w-full rounded-full bg-blue-500 opacity-30"></div>
            <User className="absolute h-6 w-6 text-blue-600 fill-blue-100" />
          </div>
        )}
        
        {/* Marcadores dos técnicos */}
        {technicians.map((technician, index) => {
          const position = calculateMapPosition(technician, mapCenter);
          const isSelected = selectedTechnician?.id === technician.id;
          
          return (
            <div
              key={technician.id}
              className={`absolute cursor-pointer transition-all transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto ${isSelected ? 'scale-125' : ''}`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              onClick={() => handleMarkerClick(technician)}
              title={`${technician.name} - Clique para ver detalhes`}
            >
              <div className="flex flex-col items-center">
                <MapPin 
                  className={`h-8 w-8 ${isSelected ? 'text-red-600 fill-red-500' : 'text-green-600 fill-green-500'} drop-shadow-lg`} 
                />
                {isSelected && (
                  <div className="bg-white shadow-lg rounded-lg p-3 text-xs font-medium whitespace-nowrap mt-2 border min-w-[200px]">
                    <div className="font-semibold">{technician.name}</div>
                    <div className="text-gray-600 mb-2">{technician.location}</div>
                    <div className="flex gap-1 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewTechnicianOnGoogleMaps(technician);
                        }}
                        className="text-xs h-6 px-2 py-1"
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        Ver no Maps
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirectionsToTechnician(technician);
                        }}
                        className="text-xs h-6 px-2 py-1"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Rota
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Botões de controle */}
      <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
        <Button 
          onClick={openInGoogleMaps}
          variant="secondary"
          size="sm"
          className="bg-white hover:bg-gray-50 shadow-lg flex items-center gap-2"
        >
          <MapPin className="h-4 w-4 text-blue-600" />
          Abrir no Google Maps
        </Button>
        
        <Button 
          onClick={openGoogleMapsWithTechnicians}
          variant="secondary"
          size="sm"
          className="bg-white hover:bg-gray-50 shadow-lg flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4 text-green-600" />
          Ver Todos os Técnicos
        </Button>
      </div>
      
      {/* Informação sobre integração com Google Maps */}
      <div className="absolute left-0 right-0 bottom-4 flex justify-center pointer-events-none z-30">
        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs text-center shadow">
          Clique nos técnicos para interagir • Botões abrem no Google Maps
        </div>
      </div>
    </div>
  );
};

export default TechnicianMap;
