import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, User, ExternalLink } from 'lucide-react';
import { Technician } from '@/types/technician';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface MapboxTechnicianMapProps {
  technicians: Technician[];
  selectedTechnician: Technician | null;
  setSelectedTechnician: (technician: Technician | null) => void;
}

const MapboxTechnicianMap: React.FC<MapboxTechnicianMapProps> = ({
  technicians,
  selectedTechnician,
  setSelectedTechnician
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const markers = useRef<mapboxgl.Marker[]>([]);
  const { toast } = useToast();

  // Buscar token do Mapbox
  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        
        if (error) {
          console.error('Erro ao buscar token:', error);
          setError('Token do Mapbox não configurado');
          setIsLoading(false);
          return;
        }

        if (data?.token) {
          setMapboxToken(data.token);
          setError('');
        } else {
          setError('Token do Mapbox não encontrado');
        }
      } catch (err) {
        console.error('Erro:', err);
        setError('Erro ao carregar mapa');
      }
      setIsLoading(false);
    };

    fetchMapboxToken();
  }, []);

  // Obter localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Define São Paulo como localização padrão
          setUserLocation({
            lat: -23.5505,
            lng: -46.6333
          });
        }
      );
    } else {
      setUserLocation({
        lat: -23.5505,
        lng: -46.6333
      });
    }
  }, []);

  // Inicializar mapa quando token estiver disponível
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || isLoading) return;

    // Verificar suporte WebGL
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setError('WebGL não suportado no seu navegador');
      return;
    }

    // Configurar token do Mapbox
    mapboxgl.accessToken = mapboxToken;

    // Calcular centro baseado nos técnicos
    const getMapCenter = () => {
      if (technicians.length === 0) {
        return { lat: -14.2350, lng: -51.9253, zoom: 4 };
      }
      
      if (technicians.length === 1) {
        const tech = technicians[0];
        return {
          lat: tech.coordinates ? tech.coordinates[0] : -23.5505,
          lng: tech.coordinates ? tech.coordinates[1] : -46.6333,
          zoom: 12
        };
      }
      
      const avgLat = technicians.reduce((sum, tech) => {
        const lat = tech.coordinates ? tech.coordinates[0] : -23.5505;
        return sum + lat;
      }, 0) / technicians.length;
      
      const avgLng = technicians.reduce((sum, tech) => {
        const lng = tech.coordinates ? tech.coordinates[1] : -46.6333;
        return sum + lng;
      }, 0) / technicians.length;
      
      return { lat: avgLat, lng: avgLng, zoom: 8 };
    };

    const mapCenter = getMapCenter();

    try {
      // Inicializar mapa
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [mapCenter.lng, mapCenter.lat],
        zoom: mapCenter.zoom,
        attributionControl: false
      });

      // Adicionar controles de navegação
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Limpar marcadores existentes
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // Adicionar marcador do usuário
      if (userLocation) {
        const userMarker = new mapboxgl.Marker({
          color: '#3B82F6',
          scale: 0.8
        })
          .setLngLat([userLocation.lng, userLocation.lat])
          .setPopup(new mapboxgl.Popup().setHTML('<div>Sua localização</div>'))
          .addTo(map.current);
        
        markers.current.push(userMarker);
      }

      // Adicionar marcadores dos técnicos
      technicians.forEach((technician) => {
        const techLat = technician.coordinates ? technician.coordinates[0] : -23.5505 + (technician.id * 0.01);
        const techLng = technician.coordinates ? technician.coordinates[1] : -46.6333 + (technician.id * 0.01);

        // Criar elemento personalizado para o marcador
        const el = document.createElement('div');
        el.className = 'cursor-pointer transition-transform hover:scale-110';
        el.innerHTML = `
          <div class="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${selectedTechnician?.id === technician.id ? '#DC2626' : '#16A34A'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `;

        const marker = new mapboxgl.Marker(el)
          .setLngLat([techLng, techLat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="p-2">
                <h3 class="font-semibold">${technician.name}</h3>
                <p class="text-sm text-gray-600">${technician.location}</p>
                <p class="text-sm">${technician.specialties.slice(0, 2).join(', ')}</p>
                <div class="mt-2 flex gap-1">
                  <button onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(technician.name + ' - ' + technician.location)}/@${techLat},${techLng},15z', '_blank')" class="text-xs bg-blue-500 text-white px-2 py-1 rounded">Ver no Maps</button>
                  <button onclick="window.open('https://www.google.com/maps/dir/${userLocation?.lat || -23.5505},${userLocation?.lng || -46.6333}/${techLat},${techLng}', '_blank')" class="text-xs bg-green-500 text-white px-2 py-1 rounded">Rota</button>
                </div>
              </div>
            `)
          )
          .addTo(map.current);

        // Adicionar evento de clique
        el.addEventListener('click', () => {
          setSelectedTechnician(technician);
        });

        markers.current.push(marker);
      });

    } catch (error) {
      console.error('Erro ao inicializar mapa:', error);
      setError('Erro ao carregar o mapa');
      return;
    }

    // Cleanup
    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [technicians, selectedTechnician, userLocation, mapboxToken, isLoading, setSelectedTechnician]);

  const openGoogleMaps = () => {
    if (technicians.length > 0) {
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
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg border">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando mapa...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg border">
        <div className="text-center p-8 max-w-md">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-red-600">Erro no Mapa</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          
          <div className="mt-6 pt-4 border-t">
            <Button 
              onClick={openGoogleMaps}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir no Google Maps
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg border">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Botão para abrir no Google Maps */}
      <div className="absolute top-4 left-4 z-10">
        <Button 
          onClick={openGoogleMaps}
          variant="secondary"
          size="sm"
          className="bg-white hover:bg-gray-50 shadow-lg flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4 text-green-600" />
          Ver no Google Maps
        </Button>
      </div>
      
      {/* Informação sobre o mapa */}
      <div className="absolute left-0 right-0 bottom-4 flex justify-center pointer-events-none z-10">
        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs text-center shadow">
          Mapa interativo • Técnicos fixos nas coordenadas reais
        </div>
      </div>
    </div>
  );
};

export default MapboxTechnicianMap;