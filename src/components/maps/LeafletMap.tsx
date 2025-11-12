import React, { useEffect, useRef, useState } from 'react';
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
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

interface LeafletMapProps {
  technicians: Technician[];
  selectedTechnician: Technician | null;
  setSelectedTechnician: (technician: Technician | null) => void;
}

const defaultCenter: [number, number] = [-23.5505, -46.6333];

const formatCurrency = (value: number | undefined) => {
  if (typeof value !== 'number') return '';
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0
  });
};

const createPopupContent = (technician: Technician) => {
  const specialties = technician.specialties?.length
    ? `${technician.specialties.slice(0, 3).join(', ')}${
        technician.specialties.length > 3 ? '...' : ''
      }`
    : 'Especialidades não informadas';

  const visitPrice = formatCurrency(technician.pricing?.visitPrice);
  const laborPrice = formatCurrency(technician.pricing?.laborPrice);
  const mapUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    `${technician.name} ${technician.location ?? ''}`
  )}`;

  return `
    <div class="max-w-xs">
      <div class="font-semibold text-lg mb-2">${technician.name}</div>
      <div class="flex items-center gap-1 mb-2 text-sm">
        <span class="inline-flex items-center gap-1 font-medium text-yellow-500">
          <span>★</span>
          ${technician.rating ?? 'N/D'}
        </span>
        <span class="text-gray-500">(${technician.reviewCount ?? 0} avaliações)</span>
      </div>
      <div class="flex items-center gap-1 mb-2 text-sm text-gray-600">
        <span>📍</span>
        <span>${technician.location ?? 'Localização não informada'}</span>
      </div>
      <div class="mb-3 text-sm">
        <div class="font-medium">Especialidades:</div>
        <div class="text-gray-600">${specialties}</div>
      </div>
      <div class="mb-3 text-sm bg-gray-50 rounded p-2">
        <div>Orçamento: <span class="font-medium text-green-600">Gratuito</span></div>
        ${visitPrice ? `<div>Visita: <span class="font-medium">${visitPrice}</span></div>` : ''}
        ${laborPrice ? `<div>Mão de obra: <span class="font-medium">${laborPrice}/h</span></div>` : ''}
      </div>
      <a class="inline-flex items-center justify-center gap-2 w-full text-sm font-medium text-[#2563eb] border border-[#2563eb] rounded px-3 py-2 hover:bg-[#2563eb] hover:text-white transition" href="${mapUrl}" target="_blank" rel="noopener noreferrer">
        <span>Ver no Google Maps</span>
        <span>↗</span>
      </a>
    </div>
  `;
};

const LeafletMap: React.FC<LeafletMapProps> = ({
  technicians,
  selectedTechnician,
  setSelectedTechnician
}) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: defaultCenter,
      zoom: 10
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation(defaultCenter);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        setUserLocation(defaultCenter);
      }
    );
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const markersLayer = markersLayerRef.current;

    if (!map || !markersLayer) return;

    markersLayer.clearLayers();
    const bounds = L.latLngBounds([]);

    if (userLocation) {
      const userMarker = L.marker(userLocation);
      userMarker.bindPopup('<div class="font-medium">Sua localização</div>');
      userMarker.addTo(markersLayer);
      bounds.extend(userLocation);
    }

    technicians.forEach((technician) => {
      if (!technician.coordinates) return;

      const position: [number, number] = [
        technician.coordinates[1],
        technician.coordinates[0]
      ];

      const marker = L.marker(position);
      marker.on('click', () => setSelectedTechnician(technician));
      marker.bindPopup(createPopupContent(technician));
      marker.addTo(markersLayer);
      bounds.extend(position);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    } else {
      map.setView(defaultCenter, 10);
    }
  }, [technicians, userLocation, setSelectedTechnician]);

  useEffect(() => {
    const map = mapRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer || !selectedTechnician?.coordinates) return;

    const position: [number, number] = [
      selectedTechnician.coordinates[1],
      selectedTechnician.coordinates[0]
    ];

    map.setView(position, 13, { animate: true });

    let targetMarker: L.Marker | null = null;
    markersLayer.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const markerPosition = layer.getLatLng();
        if (
          Math.abs(markerPosition.lat - position[0]) < 0.0001 &&
          Math.abs(markerPosition.lng - position[1]) < 0.0001
        ) {
          targetMarker = layer;
        }
      }
    });

    targetMarker?.openPopup();
  }, [selectedTechnician]);

  const openGoogleMapsGeneral = () => {
    if (technicians.length === 0) return;

    const query = encodeURIComponent('Técnicos especializados próximos');
    const url = `https://www.google.com/maps/search/${query}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="h-full w-full rounded-lg" />

      <div className="absolute bottom-4 right-4 z-[1000]">
        <Button variant="secondary" size="sm" onClick={openGoogleMapsGeneral} className="shadow-lg">
          <ExternalLink className="h-4 w-4 mr-2" />
          Abrir no Google Maps
        </Button>
      </div>
    </div>
  );
};

export default LeafletMap;
