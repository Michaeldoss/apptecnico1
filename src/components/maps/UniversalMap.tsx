import React, { useState, useEffect, useRef } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Technician } from '@/types/technician';
import { supabase } from '@/integrations/supabase/client';

// Lazy load mapbox
const LazyMapboxMap = React.lazy(() => import('./MapboxTechnicianMap'));

// Lazy load leaflet
const LazyLeafletMap = React.lazy(() => import('./SimpleLeafletMap'));

interface UniversalMapProps {
  technicians: Technician[];
  selectedTechnician: Technician | null;
  setSelectedTechnician: (technician: Technician | null) => void;
  height?: string;
  style?: React.CSSProperties;
}

export const UniversalMap: React.FC<UniversalMapProps> = ({
  technicians,
  selectedTechnician,
  setSelectedTechnician,
  height = "500px",
  style
}) => {
  const [mapType, setMapType] = useState<'mapbox' | 'leaflet' | 'loading'>('loading');
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  // Function to check WebGL support
  const checkWebGLSupport = (): boolean => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        canvas.remove();
        return false;
      }
      
      // Simple WebGL validation
      const webglContext = gl as WebGLRenderingContext;
      const renderer = webglContext.getParameter(webglContext.RENDERER);
      canvas.remove();
      
      // Check if it's software rendering (not hardware accelerated)
      if (renderer && (renderer.includes('SwiftShader') || renderer.includes('Software'))) {
        return false;
      }
      
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to fetch Mapbox token
  const fetchMapboxToken = async (): Promise<string | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('get-mapbox-token');
      
      if (error) {
        console.error('Erro ao buscar token do Mapbox:', error);
        return null;
      }
      
      if (!data?.token) {
        console.error('Token do Mapbox não encontrado na resposta');
        return null;
      }
      
      return data.token;
    } catch (error) {
      console.error('Erro na requisição do token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initializeMap = async () => {
      try {
        // Force Leaflet for now since WebGL issues persist
        console.log('Usando Leaflet (forçado para resolver problemas de WebGL)');
        setMapType('leaflet');
        return;
        
        // Check WebGL support first (commented out for now)
        // const hasWebGL = checkWebGLSupport();
        // console.log('WebGL Support:', hasWebGL);
        
        // if (!hasWebGL) {
        //   console.log('WebGL não suportado, usando Leaflet');
        //   setMapType('leaflet');
        //   return;
        // }

        // Only try Mapbox if WebGL is supported (commented out for now)
        // const token = await fetchMapboxToken();
        
        // if (token) {
        //   console.log('Usando Mapbox com WebGL');
        //   setMapboxToken(token);
        //   setMapType('mapbox');
        // } else {
        //   console.log('Token do Mapbox indisponível, usando Leaflet');
        //   setMapType('leaflet');
        // }
      } catch (error) {
        console.error('Erro ao inicializar mapa:', error);
        setMapType('leaflet'); // Always fallback to Leaflet on error
      }
    };

    initializeMap();
  }, []);

  // Loading state
  if (mapType === 'loading') {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height, ...style }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Carregando mapa...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Render appropriate map
  return (
    <div style={{ height, ...style }} className="w-full">
      <React.Suspense 
        fallback={
          <div 
            className="flex items-center justify-center bg-gray-100 rounded-lg"
            style={{ height: '100%' }}
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Carregando mapa...</p>
            </div>
          </div>
        }
      >
        {mapType === 'mapbox' && mapboxToken ? (
          <LazyMapboxMap
            technicians={technicians}
            selectedTechnician={selectedTechnician}
            setSelectedTechnician={setSelectedTechnician}
          />
        ) : (
          <LazyLeafletMap
            technicians={technicians}
            selectedTechnician={selectedTechnician}
            setSelectedTechnician={setSelectedTechnician}
          />
        )}
      </React.Suspense>
    </div>
  );
};

export default UniversalMap;