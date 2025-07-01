
import { useState, useEffect } from 'react';
import { Technician } from '@/types/technician';
import { equipmentTypeLabels, EquipmentType } from '@/types/equipment';

// Dados simulados de técnicos
const mockTechnicians: Technician[] = [
  {
    id: 1,
    name: "Carlos Silva",
    description: "Especialista em manutenção de plotters eco solvente e UV com mais de 10 anos de experiência.",
    rating: 4.8,
    reviewCount: 156,
    specialties: ["Plotter eco solvente", "Plotter UV flexível", "Instalação", "Reparo"],
    location: "São Paulo, SP",
    state: "SP",
    city: "São Paulo",
    coordinates: [-23.5505, -46.6333],
    availability: ["Segunda-Feira", "Terça-Feira", "Quinta-Feira", "Sexta-Feira"],
    equipmentTypes: ["eco-solvent", "uv-flexible"],
    pricing: {
      quotePrice: 0,
      visitPrice: 80,
      laborPrice: 120
    }
  },
  {
    id: 2,
    name: "Ana Oliveira",
    description: "Técnica especializada em plotters e equipamentos de sublimação. Atendimento rápido e eficiente.",
    rating: 4.9,
    reviewCount: 98,
    specialties: ["Plotter sublimática", "Calandra para sublimação", "Prensa térmica para sublimação", "Manutenção"],
    location: "São Paulo, SP",
    state: "SP",
    city: "São Paulo",
    coordinates: [-23.5605, -46.6233],
    availability: ["Segunda-Feira", "Quarta-Feira", "Sexta-Feira"],
    equipmentTypes: ["sublimation", "sublimation-calander", "thermal-press"],
    pricing: {
      quotePrice: 0,
      visitPrice: 75,
      laborPrice: 110
    }
  },
  {
    id: 3,
    name: "Ricardo Martins",
    description: "Assistência técnica em plotters DTF e equipamentos de acabamento têxtil.",
    rating: 4.7,
    reviewCount: 203,
    specialties: ["Plotter DTF Têxtil", "Plotter DTF UV", "Carrossel para DTF", "Carrossel misto"],
    location: "Guarulhos, SP",
    state: "SP",
    city: "Guarulhos",
    coordinates: [-23.4543, -46.5337],
    availability: ["Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sábado"],
    equipmentTypes: ["dtf-textile", "dtf-uv", "dtf-carousel", "mixed-carousel"],
    pricing: {
      quotePrice: 0,
      visitPrice: 90,
      laborPrice: 130
    }
  },
  {
    id: 4,
    name: "Fernanda Costa",
    description: "Serviços de manutenção para equipamentos CNC e máquinas de corte a laser.",
    rating: 4.6,
    reviewCount: 87,
    specialties: ["CNC CO²", "CNC Router", "Gravadora laser (Fiber)", "Manutenção periódica"],
    location: "Osasco, SP",
    state: "SP",
    city: "Osasco",
    coordinates: [-23.5324, -46.7916],
    availability: ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira"],
    equipmentTypes: ["cnc-co2", "cnc-router", "laser-engraver"],
    pricing: {
      quotePrice: 0,
      visitPrice: 85,
      laborPrice: 140
    }
  },
  {
    id: 5,
    name: "Paulo Mendes",
    description: "Especialista em plotters de recorte e UV flatbed para sinalização e comunicação visual.",
    rating: 4.9,
    reviewCount: 142,
    specialties: ["Plotter de recorte", "Plotter Flatbed UV", "Instalação", "Reforma"],
    location: "São Bernardo do Campo, SP",
    state: "SP",
    city: "São Bernardo do Campo",
    coordinates: [-23.6944, -46.5654],
    availability: ["Segunda-Feira", "Quarta-Feira", "Sexta-Feira", "Sábado"],
    equipmentTypes: ["cutting", "uv-flatbed"],
    pricing: {
      quotePrice: 0,
      visitPrice: 95,
      laborPrice: 125
    }
  },
  {
    id: 6,
    name: "Luciana Ferreira",
    description: "Técnica em equipamentos para indústria gráfica. Instalação e manutenção de OFF-SET e máquinas de costura.",
    rating: 4.7,
    reviewCount: 76,
    specialties: ["OFF-SET", "Máquina de costura", "Instalação", "Manutenção"],
    location: "Santo André, SP",
    state: "SP",
    city: "Santo André",
    coordinates: [-23.6639, -46.5383],
    availability: ["Terça-Feira", "Quinta-Feira", "Sábado"],
    equipmentTypes: ["offset", "sewing-machine"],
    pricing: {
      quotePrice: 0,
      visitPrice: 70,
      laborPrice: 115
    }
  },
  {
    id: 7,
    name: "Marcos Souza",
    description: "Especialista em plotters UV cilíndricas e solvente. Instalação e reparos emergenciais.",
    rating: 4.8,
    reviewCount: 112,
    specialties: ["Plotter UV cilíndrica", "Plotter solvente", "Instalação", "Reparo"],
    location: "Taboão da Serra, SP",
    state: "SP",
    city: "Taboão da Serra",
    coordinates: [-23.6019, -46.7526],
    availability: ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira"],
    equipmentTypes: ["cylindrical-uv", "solvent"],
    pricing: {
      quotePrice: 0,
      visitPrice: 100,
      laborPrice: 135
    }
  },
  {
    id: 8,
    name: "Juliana Santos",
    description: "Suporte em carrosseis para silk screen e DTF. Instalação, configuração e manutenção periódica.",
    rating: 4.5,
    reviewCount: 93,
    specialties: ["Carrossel para silk", "Carrossel para DTF", "Carrossel misto", "Manutenção periódica"],
    location: "Diadema, SP",
    state: "SP",
    city: "Diadema",
    coordinates: [-23.6813, -46.6205],
    availability: ["Segunda-Feira", "Quarta-Feira", "Sexta-Feira"],
    equipmentTypes: ["silk-carousel", "dtf-carousel", "mixed-carousel"],
    pricing: {
      quotePrice: 0,
      visitPrice: 80,
      laborPrice: 120
    }
  }
];

export const useTechnicianSearch = () => {
  const [technicians, setTechnicians] = useState<Technician[]>(mockTechnicians);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [filterByService, setFilterByService] = useState<string>('');
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedEquipmentType, setSelectedEquipmentType] = useState<EquipmentType | 'all' | ''>('');
  
  useEffect(() => {
    // Filtrar técnicos com base nos critérios de pesquisa
    let filtered = [...mockTechnicians];
    
    if (searchQuery) {
      filtered = filtered.filter(tech => 
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (searchLocation) {
      filtered = filtered.filter(tech => 
        tech.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    
    if (filterByService && filterByService !== 'all') {
      filtered = filtered.filter(tech => 
        tech.specialties.some(s => s.toLowerCase().includes(filterByService.toLowerCase()))
      );
    }
    
    if (selectedState && selectedState !== 'all') {
      filtered = filtered.filter(tech => tech.state === selectedState);
    }
    
    if (selectedCity) {
      filtered = filtered.filter(tech => tech.city?.toLowerCase().includes(selectedCity.toLowerCase()));
    }
    
    if (selectedEquipmentType && selectedEquipmentType !== 'all' && selectedEquipmentType !== '') {
      filtered = filtered.filter(tech => 
        tech.equipmentTypes?.includes(selectedEquipmentType as EquipmentType)
      );
    }
    
    setTechnicians(filtered);
    
    // Resetar o técnico selecionado se ele não estiver mais nos resultados filtrados
    if (selectedTechnician && !filtered.some(t => t.id === selectedTechnician.id)) {
      setSelectedTechnician(null);
    }
  }, [searchQuery, searchLocation, filterByService, selectedTechnician, selectedState, selectedCity, selectedEquipmentType]);
  
  return {
    technicians,
    searchQuery,
    setSearchQuery,
    searchLocation,
    setSearchLocation,
    filterByService,
    setFilterByService,
    selectedTechnician,
    setSelectedTechnician,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    selectedEquipmentType,
    setSelectedEquipmentType
  };
};
