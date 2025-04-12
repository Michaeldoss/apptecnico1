
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

  // Simulação do carregamento do mapa (em um aplicativo real, usaríamos uma API como Google Maps ou Mapbox)
  useEffect(() => {
    // Simular tempo de carregamento do mapa
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

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
          toast({
            title: "Localização não disponível",
            description: "Não foi possível obter sua localização. Permitir o acesso à localização melhora a experiência.",
            variant: "destructive",
          });
        }
      );
    }

    return () => clearTimeout(timer);
  }, [toast]);

  const handleMarkerClick = (technician: Technician) => {
    setSelectedTechnician(technician);
  };

  // Calcular posição relativa dos marcadores no mapa simulado
  const calculatePosition = (index: number, total: number) => {
    // Distribuir os técnicos em um padrão circular ao redor do centro
    const radius = 40; // % do tamanho do mapa
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
      className="w-full h-full bg-blue-50 relative overflow-hidden"
      style={{ backgroundImage: 'url("https://maps.googleapis.com/maps/api/staticmap?center=São+Paulo,SP&zoom=12&size=1200x1200&scale=2&maptype=roadmap&key=DEMO_MAP")', backgroundSize: 'cover' }}
    >
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50/80">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Carregando mapa...</p>
          </div>
        </div>
      )}
      
      {/* Área do mapa com marcadores */}
      <div className="absolute inset-0">
        {/* Marcador para localização do usuário */}
        {userLocation && (
          <div 
            className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '50%' }}
          >
            <div className="animate-ping absolute h-full w-full rounded-full bg-primary-foreground opacity-30"></div>
            <User className="absolute h-6 w-6 text-primary fill-primary-foreground" />
          </div>
        )}
        
        {/* Marcadores dos técnicos */}
        {technicians.map((technician, index) => {
          const position = calculatePosition(index, technicians.length);
          const isSelected = selectedTechnician?.id === technician.id;
          
          return (
            <div
              key={technician.id}
              className={`absolute cursor-pointer transition-all transform -translate-x-1/2 -translate-y-1/2 ${isSelected ? 'scale-125 z-10' : ''}`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              onClick={() => handleMarkerClick(technician)}
            >
              <div className={`flex flex-col items-center`}>
                <MapPin 
                  className={`h-8 w-8 ${isSelected ? 'text-primary fill-primary' : 'text-secondary fill-secondary-foreground'}`} 
                />
                {isSelected && (
                  <div className="bg-white shadow-md rounded p-1 text-xs font-medium whitespace-nowrap mt-1">
                    {technician.name}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Interface de controle do mapa (simulada) */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M5 12h14"/></svg>
          </button>
        </div>
        
        {/* Notificação quando o mapa é clicado (será substituído pela API real) */}
        <div className="absolute left-0 right-0 bottom-4 flex justify-center pointer-events-none">
          <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full text-xs text-center shadow">
            Este é um mapa simulado. Em produção, use Google Maps ou Mapbox.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianMap;
