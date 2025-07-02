import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SellEquipmentItem } from '@/types/sellEquipment';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SellEquipmentMapProps {
  equipments: SellEquipmentItem[];
  onEquipmentClick?: (equipment: SellEquipmentItem) => void;
}

// Coordenadas aproximadas das cidades brasileiras
const cityCoordinates: { [key: string]: [number, number] } = {
  'São Paulo,SP': [-46.6333, -23.5505],
  'Rio de Janeiro,RJ': [-43.1729, -22.9068],
  'Belo Horizonte,MG': [-43.9378, -19.9208],
  'Brasília,DF': [-47.8826, -15.7942],
  'Salvador,BA': [-38.5014, -12.9714],
  'Fortaleza,CE': [-38.5423, -3.7319],
  'Recife,PE': [-34.8755, -8.0476],
  'Porto Alegre,RS': [-51.2177, -30.0346],
  'Curitiba,PR': [-49.2731, -25.4284],
  'Goiânia,GO': [-49.2532, -16.6864]
};

const SellEquipmentMap: React.FC<SellEquipmentMapProps> = ({ 
  equipments, 
  onEquipmentClick 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState(() => 
    localStorage.getItem('mapbox-token') || ''
  );
  const [showTokenInput, setShowTokenInput] = useState(() => 
    !localStorage.getItem('mapbox-token')
  );
  const markers = useRef<mapboxgl.Marker[]>([]);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-46.6333, -23.5505], // São Paulo como centro
        zoom: 5
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      map.current.on('load', () => {
        addEquipmentMarkers();
      });

      localStorage.setItem('mapbox-token', mapboxToken);
      setShowTokenInput(false);
    } catch (error) {
      console.error('Erro ao inicializar o mapa:', error);
    }
  };

  const addEquipmentMarkers = () => {
    if (!map.current) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    equipments.forEach((equipment, index) => {
      const cityKey = `${equipment.location.city},${equipment.location.state}`;
      let coordinates = cityCoordinates[cityKey];
      
      // Se não encontrar a cidade, use São Paulo como padrão com pequeno offset
      if (!coordinates) {
        coordinates = [-46.6333 + (Math.random() - 0.5) * 0.1, -23.5505 + (Math.random() - 0.5) * 0.1];
      } else {
        // Adiciona pequeno offset para evitar sobreposição
        coordinates = [
          coordinates[0] + (Math.random() - 0.5) * 0.05,
          coordinates[1] + (Math.random() - 0.5) * 0.05
        ];
      }

      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'equipment-marker';
      markerElement.innerHTML = `
        <div class="relative">
          <div class="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer transform transition-transform hover:scale-110">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
          </div>
        </div>
      `;

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(coordinates)
        .addTo(map.current!);

      // Create popup
      const popup = new mapboxgl.Popup({ 
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px'
      }).setHTML(`
        <div class="p-2">
          <div class="font-semibold text-sm mb-1">${equipment.title}</div>
          <div class="text-xs text-gray-600 mb-2">${equipment.location.city}, ${equipment.location.state}</div>
          <div class="text-lg font-bold text-blue-600 mb-2">R$ ${equipment.price.toLocaleString('pt-BR')}</div>
          <div class="text-xs text-gray-500 mb-2">${equipment.brand} ${equipment.model}</div>
          <button class="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors w-full">
            Ver Detalhes
          </button>
        </div>
      `);

      markerElement.addEventListener('click', () => {
        popup.addTo(map.current!);
        marker.setPopup(popup);
        marker.togglePopup();
        
        if (onEquipmentClick) {
          onEquipmentClick(equipment);
        }
      });

      markers.current.push(marker);
    });
  };

  useEffect(() => {
    if (mapboxToken && !showTokenInput && !map.current) {
      initializeMap();
    } else if (mapboxToken && map.current) {
      addEquipmentMarkers();
    }
  }, [equipments, mapboxToken, showTokenInput]);

  return (
    <div className="w-full h-full relative">
      {showTokenInput ? (
        <Card className="absolute inset-0 z-10 flex items-center justify-center">
          <CardContent className="text-center max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5" />
                Configurar Mapa
              </CardTitle>
            </CardHeader>
            <p className="text-sm text-gray-600 mb-4">
              Para usar o mapa interativo, insira seu token público do Mapbox.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Insira seu token público do Mapbox"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                type="password"
              />
              <Button 
                onClick={initializeMap}
                disabled={!mapboxToken.trim()}
                className="w-full"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Inicializar Mapa
              </Button>
              <p className="text-xs text-gray-500">
                Crie uma conta gratuita em{' '}
                <a 
                  href="https://mapbox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  mapbox.com
                </a>
                {' '}para obter seu token
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTokenInput(true)}
            className="bg-white/90 backdrop-blur-sm"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg"
        style={{ display: showTokenInput ? 'none' : 'block' }}
      />
      
      {!showTokenInput && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>{equipments.length} equipamentos</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellEquipmentMap;