import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SellEquipmentItem } from '@/types/sellEquipment';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const { toast } = useToast();

  // Check WebGL support
  const checkWebGLSupport = (): boolean => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      canvas.remove();
      return !!gl;
    } catch (e) {
      return false;
    }
  };

  // Buscar token do Mapbox
  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        // Check WebGL support first
        if (!checkWebGLSupport()) {
          setWebglSupported(false);
          setError('WebGL não é suportado neste browser. Use um browser mais moderno.');
          setIsLoading(false);
          return;
        }

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

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken || isLoading || !webglSupported) return;

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

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError('Erro ao carregar o mapa. Tente recarregar a página.');
      });

    } catch (error) {
      console.error('Erro ao inicializar o mapa:', error);
      setError('Erro ao carregar mapa');
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
    if (mapboxToken && !isLoading && !map.current && webglSupported) {
      initializeMap();
    } else if (mapboxToken && map.current && webglSupported) {
      addEquipmentMarkers();
    }
  }, [equipments, mapboxToken, isLoading, webglSupported]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando mapa...</p>
        </div>
      </div>
    );
  }

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <Settings className="h-16 w-16 text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-orange-600">WebGL não suportado</h3>
            <p className="text-sm text-gray-600 mb-4">Use um browser mais moderno para visualizar o mapa</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-red-600">Erro no Mapa</h3>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-2"
            >
              Recarregar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg overflow-hidden"
      />
      
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>{equipments.length} equipamentos</span>
        </div>
      </div>
    </div>
  );
};

export default SellEquipmentMap;