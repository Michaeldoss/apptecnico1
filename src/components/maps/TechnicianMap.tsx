
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, User } from 'lucide-react';
import { Technician } from '@/types/technician';
import { useToast } from '@/hooks/use-toast';

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
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
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

  const handleMarkerClick = (technician: Technician) => {
    setSelectedTechnician(technician);
  };

  const openGoogleMaps = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps/search/técnicos+assistência+técnica/@${userLocation.lat},${userLocation.lng},13z`;
      window.open(url, '_blank');
    }
  };

  const viewTechnicianOnGoogleMaps = (technician: Technician) => {
    // Simular coordenadas baseadas no ID do técnico para demonstração
    const lat = -23.5505 + (technician.id * 0.01);
    const lng = -46.6333 + (technician.id * 0.01);
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${technician.name}`;
    window.open(url, '_blank');
  };

  const getDirectionsToTechnician = (technician: Technician) => {
    if (userLocation) {
      // Simular coordenadas do técnico baseadas no ID para demonstração
      const techLat = -23.5505 + (technician.id * 0.01);
      const techLng = -46.6333 + (technician.id * 0.01);
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${techLat},${techLng}`;
      window.open(url, '_blank');
    }
  };

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calcular posição relativa dos marcadores no mapa simulado
  const calculatePosition = (index: number, total: number) => {
    const radius = 40;
    const angle = (index / total) * 2 * Math.PI;
    const centerX = 50;
    const centerY = 50;
    
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    return { x, y };
  };

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full bg-blue-50 relative overflow-hidden rounded-lg border"
    >
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50/80">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Carregando localização dos técnicos...</p>
          </div>
        </div>
      )}
      
      {/* Área do mapa simulado com marcadores */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
        {/* Marcador para localização do usuário */}
        {userLocation && (
          <div 
            className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: '50%', top: '50%' }}
            title="Sua localização"
          >
            <div className="animate-ping absolute h-full w-full rounded-full bg-blue-500 opacity-30"></div>
            <User className="absolute h-6 w-6 text-blue-600 fill-blue-100" />
          </div>
        )}
        
        {/* Marcadores dos técnicos */}
        {technicians.map((technician, index) => {
          const position = calculatePosition(index, technicians.length);
          const isSelected = selectedTechnician?.id === technician.id;
          
          return (
            <div
              key={technician.id}
              className={`absolute cursor-pointer transition-all transform -translate-x-1/2 -translate-y-1/2 z-10 ${isSelected ? 'scale-125' : ''}`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              onClick={() => handleMarkerClick(technician)}
              title={`${technician.name} - Clique para ver detalhes`}
            >
              <div className="flex flex-col items-center">
                <MapPin 
                  className={`h-8 w-8 ${isSelected ? 'text-red-600 fill-red-500' : 'text-green-600 fill-green-500'} drop-shadow-lg`} 
                />
                {isSelected && (
                  <div className="bg-white shadow-lg rounded-lg p-2 text-xs font-medium whitespace-nowrap mt-2 border">
                    <div className="font-semibold">{technician.name}</div>
                    <div className="text-gray-600">{technician.location}</div>
                    <div className="flex gap-1 mt-1">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          viewTechnicianOnGoogleMaps(technician);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Ver no Maps
                      </button>
                      <span className="text-gray-400">|</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirectionsToTechnician(technician);
                        }}
                        className="text-green-600 hover:text-green-800 text-xs"
                      >
                        Rota
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Botão para abrir Google Maps completo */}
        <div className="absolute top-4 left-4">
          <button 
            onClick={openGoogleMaps}
            className="bg-white px-3 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <MapPin className="h-4 w-4 text-blue-600" />
            Abrir no Google Maps
          </button>
        </div>
        
        {/* Controles do mapa simulado */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button 
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
            title="Zoom in"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
              <path d="M5 12h14"/><path d="M12 5v14"/>
            </svg>
          </button>
          <button 
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
            title="Zoom out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
              <path d="M5 12h14"/>
            </svg>
          </button>
        </div>
        
        {/* Informação sobre integração com Google Maps */}
        <div className="absolute left-0 right-0 bottom-4 flex justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs text-center shadow">
            Integrado com Google Maps - Clique nos técnicos para ver rotas
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianMap;
