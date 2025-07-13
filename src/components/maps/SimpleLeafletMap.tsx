import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Technician } from '@/types/technician';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

// Fix for default markers in leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface SimpleLeafletMapProps {
  technicians: Technician[];
  selectedTechnician: Technician | null;
  setSelectedTechnician: (technician: Technician | null) => void;
}

const SimpleLeafletMap: React.FC<SimpleLeafletMapProps> = ({
  technicians,
  selectedTechnician,
  setSelectedTechnician
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstance.current = L.map(mapRef.current).setView([-23.5505, -46.6333], 10);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance.current);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: L.LatLngExpression = [position.coords.latitude, position.coords.longitude];
          
          // Add user marker
          const userIcon = L.divIcon({
            html: '<div style="background: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
          
          L.marker(userLocation, { icon: userIcon })
            .addTo(mapInstance.current!)
            .bindPopup('<strong>Sua localização</strong>');
            
          // Center map on user location if no technicians
          if (technicians.length === 0) {
            mapInstance.current?.setView(userLocation, 12);
          }
        },
        (error) => {
          console.warn('Erro ao obter localização:', error);
        }
      );
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update markers when technicians change
  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstance.current?.removeLayer(marker);
    });
    markersRef.current = [];

    if (technicians.length === 0) return;

    const bounds = L.latLngBounds([]);

    // Add technician markers
    technicians.forEach((technician) => {
      if (!technician.coordinates) return;

      const position: L.LatLngExpression = [technician.coordinates[0], technician.coordinates[1]];
      bounds.extend(position);

      const marker = L.marker(position)
        .addTo(mapInstance.current!)
        .bindPopup(`
          <div style="max-width: 250px;">
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">${technician.name}</div>
            
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
              <span style="color: #fbbf24;">★</span>
              <span style="font-weight: 600;">${technician.rating}</span>
              <span style="color: #6b7280; font-size: 14px;">(${technician.reviewCount} avaliações)</span>
            </div>
            
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
              <span style="color: #6b7280;">📍</span>
              <span style="font-size: 14px;">${technician.location}</span>
            </div>
            
            <div style="margin-bottom: 12px;">
              <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Especialidades:</div>
              <div style="color: #6b7280; font-size: 14px;">
                ${technician.specialties.slice(0, 3).join(', ')}${technician.specialties.length > 3 ? '...' : ''}
              </div>
            </div>
            
            ${technician.pricing ? `
              <div style="background: #f9fafb; padding: 8px; border-radius: 6px; margin-bottom: 12px; font-size: 14px;">
                <div>Orçamento: <span style="color: #059669; font-weight: 600;">Gratuito</span></div>
                <div>Visita: <span style="font-weight: 600;">R$ ${technician.pricing.visitPrice}</span></div>
                <div>Mão de obra: <span style="font-weight: 600;">R$ ${technician.pricing.laborPrice}/h</span></div>
              </div>
            ` : ''}
            
            <button 
              onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(technician.name + ' ' + technician.location)}', '_blank')"
              style="background: #3b82f6; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; width: 100%; font-size: 14px;"
            >
              🔗 Ver no Google Maps
            </button>
          </div>
        `);

      marker.on('click', () => {
        setSelectedTechnician(technician);
      });

      markersRef.current.push(marker);
    });

    // Fit map to bounds if we have technicians
    if (bounds.isValid()) {
      mapInstance.current.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [technicians, setSelectedTechnician]);

  const openGoogleMapsGeneral = () => {
    const query = encodeURIComponent('Técnicos especializados próximos');
    const url = `https://www.google.com/maps/search/${query}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />
      
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

export default SimpleLeafletMap;