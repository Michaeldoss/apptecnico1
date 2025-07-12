import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Technician } from '@/types/technician';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, MapPin } from 'lucide-react';

// Fix for default markers in leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapUpdaterProps {
  technicians: Technician[];
  userLocation: [number, number] | null;
}

// Component to update map bounds
const MapUpdater: React.FC<MapUpdaterProps> = ({ technicians, userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (technicians.length === 0) return;

    const bounds = L.latLngBounds([]);
    
    // Add technician coordinates to bounds
    technicians.forEach(tech => {
      if (tech.coordinates) {
        bounds.extend([tech.coordinates[1], tech.coordinates[0]]);
      }
    });

    // Add user location to bounds if available
    if (userLocation) {
      bounds.extend(userLocation);
    }

    // If we have bounds, fit the map to them
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    } else {
      // Default to São Paulo if no valid bounds
      map.setView([-23.5505, -46.6333], 10);
    }
  }, [map, technicians, userLocation]);

  return null;
};

interface LeafletMapProps {
  technicians: Technician[];
  selectedTechnician: Technician | null;
  setSelectedTechnician: (technician: Technician | null) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  technicians,
  selectedTechnician,
  setSelectedTechnician
}) => {
  const [userLocation, setUserLocation] = React.useState<[number, number] | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.warn('Erro ao obter localização:', error);
          // Default to São Paulo
          setUserLocation([-23.5505, -46.6333]);
        }
      );
    } else {
      // Default to São Paulo if geolocation is not available
      setUserLocation([-23.5505, -46.6333]);
    }
  }, []);

  const openGoogleMaps = (technician: Technician) => {
    const query = encodeURIComponent(`${technician.name} ${technician.location}`);
    const url = `https://www.google.com/maps/search/${query}`;
    window.open(url, '_blank');
  };

  const openGoogleMapsGeneral = () => {
    if (technicians.length === 0) return;
    
    const query = encodeURIComponent('Técnicos especializados próximos');
    const url = `https://www.google.com/maps/search/${query}`;
    window.open(url, '_blank');
  };

  // Default center (São Paulo)
  const defaultCenter: [number, number] = [-23.5505, -46.6333];
  const mapCenter = userLocation || defaultCenter;

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapUpdater technicians={technicians} userLocation={userLocation} />
        
        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              <div className="text-center">
                <strong>Sua localização</strong>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Technician markers */}
        {technicians.map((technician) => {
          if (!technician.coordinates) return null;
          
          const position: [number, number] = [technician.coordinates[1], technician.coordinates[0]];
          
          return (
            <Marker
              key={technician.id}
              position={position}
              eventHandlers={{
                click: () => setSelectedTechnician(technician)
              }}
            >
              <Popup>
                <div className="max-w-xs">
                  <div className="font-semibold text-lg mb-2">{technician.name}</div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{technician.rating}</span>
                    <span className="text-sm text-gray-500">({technician.reviewCount} avaliações)</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{technician.location}</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm font-medium mb-1">Especialidades:</div>
                    <div className="text-sm text-gray-600">
                      {technician.specialties.slice(0, 3).join(', ')}
                      {technician.specialties.length > 3 && '...'}
                    </div>
                  </div>
                  
                  {technician.pricing && (
                    <div className="mb-3 p-2 bg-gray-50 rounded">
                      <div className="text-sm">
                        <div>Orçamento: <span className="font-medium text-green-600">Gratuito</span></div>
                        <div>Visita: <span className="font-medium">R$ {technician.pricing.visitPrice}</span></div>
                        <div>Mão de obra: <span className="font-medium">R$ {technician.pricing.laborPrice}/h</span></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => openGoogleMaps(technician)}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver no Google Maps
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Google Maps button */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <Button
          variant="secondary"
          size="sm"
          onClick={openGoogleMapsGeneral}
          className="shadow-lg"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Abrir no Google Maps
        </Button>
      </div>
    </div>
  );
};

export default LeafletMap;