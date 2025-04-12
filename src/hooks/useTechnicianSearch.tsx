
import { useState, useEffect } from 'react';
import { Technician } from '@/types/technician';

// Dados simulados de técnicos
const mockTechnicians: Technician[] = [
  {
    id: 1,
    name: "Carlos Silva",
    description: "Especialista em manutenção de computadores e notebooks com mais de 10 anos de experiência.",
    rating: 4.8,
    reviewCount: 156,
    specialties: ["Computadores", "Notebooks", "Formatação", "Redes"],
    location: "São Paulo, SP",
    coordinates: { lat: -23.5505, lng: -46.6333 },
    availability: ["Segunda-Feira", "Terça-Feira", "Quinta-Feira", "Sexta-Feira"]
  },
  {
    id: 2,
    name: "Ana Oliveira",
    description: "Técnica especializada em impressoras e scanners. Atendimento rápido e eficiente.",
    rating: 4.9,
    reviewCount: 98,
    specialties: ["Impressoras", "Scanners", "Plotters", "Multifuncionais"],
    location: "São Paulo, SP",
    coordinates: { lat: -23.5605, lng: -46.6233 },
    availability: ["Segunda-Feira", "Quarta-Feira", "Sexta-Feira"]
  },
  {
    id: 3,
    name: "Ricardo Martins",
    description: "Assistência técnica em celulares e tablets. Troca de tela, bateria e outros componentes.",
    rating: 4.7,
    reviewCount: 203,
    specialties: ["Celulares", "Tablets", "Smartphones", "Troca de Peças"],
    location: "Guarulhos, SP",
    coordinates: { lat: -23.4543, lng: -46.5337 },
    availability: ["Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sábado"]
  },
  {
    id: 4,
    name: "Fernanda Costa",
    description: "Serviços de TI para pequenas empresas. Instalação e manutenção de redes e servidores.",
    rating: 4.6,
    reviewCount: 87,
    specialties: ["Redes", "Servidores", "Instalação", "Configuração"],
    location: "Osasco, SP",
    coordinates: { lat: -23.5324, lng: -46.7916 },
    availability: ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira"]
  },
  {
    id: 5,
    name: "Paulo Mendes",
    description: "Especialista em montagem e manutenção de computadores gamer e estações de trabalho.",
    rating: 4.9,
    reviewCount: 142,
    specialties: ["PCs Gamer", "Estações de Trabalho", "Montagem", "Overclock"],
    location: "São Bernardo do Campo, SP",
    coordinates: { lat: -23.6944, lng: -46.5654 },
    availability: ["Segunda-Feira", "Quarta-Feira", "Sexta-Feira", "Sábado"]
  },
  {
    id: 6,
    name: "Luciana Ferreira",
    description: "Técnica em eletrônicos diversos. Manutenção de TVs, som, home theater e muito mais.",
    rating: 4.7,
    reviewCount: 76,
    specialties: ["TVs", "Som", "Home Theater", "Eletrônicos"],
    location: "Santo André, SP",
    coordinates: { lat: -23.6639, lng: -46.5383 },
    availability: ["Terça-Feira", "Quinta-Feira", "Sábado"]
  },
  {
    id: 7,
    name: "Marcos Souza",
    description: "Especialista em segurança digital. Instalação de câmeras, alarmes e sistemas de segurança.",
    rating: 4.8,
    reviewCount: 112,
    specialties: ["Câmeras", "Alarmes", "Segurança", "CFTV"],
    location: "Taboão da Serra, SP",
    coordinates: { lat: -23.6019, lng: -46.7526 },
    availability: ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira"]
  },
  {
    id: 8,
    name: "Juliana Santos",
    description: "Suporte em software e sistemas operacionais. Instalação, configuração e resolução de problemas.",
    rating: 4.5,
    reviewCount: 93,
    specialties: ["Windows", "Linux", "macOS", "Software"],
    location: "Diadema, SP",
    coordinates: { lat: -23.6813, lng: -46.6205 },
    availability: ["Segunda-Feira", "Quarta-Feira", "Sexta-Feira"]
  }
];

export const useTechnicianSearch = () => {
  const [technicians, setTechnicians] = useState<Technician[]>(mockTechnicians);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [filterByService, setFilterByService] = useState<string>('');
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  
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
    
    if (filterByService) {
      filtered = filtered.filter(tech => 
        tech.specialties.some(s => s.toLowerCase().includes(filterByService.toLowerCase()))
      );
    }
    
    setTechnicians(filtered);
    
    // Resetar o técnico selecionado se ele não estiver mais nos resultados filtrados
    if (selectedTechnician && !filtered.some(t => t.id === selectedTechnician.id)) {
      setSelectedTechnician(null);
    }
  }, [searchQuery, searchLocation, filterByService, selectedTechnician]);
  
  return {
    technicians,
    searchQuery,
    setSearchQuery,
    searchLocation,
    setSearchLocation,
    filterByService,
    setFilterByService,
    selectedTechnician,
    setSelectedTechnician
  };
};
