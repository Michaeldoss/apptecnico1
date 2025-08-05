import { useState, useEffect, useCallback } from 'react';
import { Technician } from '@/types/technician';

// Array vazio - dados fake removidos
const mockTechnicians: Technician[] = [];

export const useTechnicianSearch = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [filterByService, setFilterByService] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('');
  const [filters, setFilters] = useState({
    query: '',
    city: '',
    state: '',
    equipmentType: '',
    specialty: '',
    availability: '',
    priceRange: [0, 200] as [number, number],
  });

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setTechnicians(mockTechnicians);
      setFilteredTechnicians(mockTechnicians);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...technicians];

    // Filtro por query (nome, especialidade, localização)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(tech => 
        tech.name.toLowerCase().includes(query) ||
        tech.specialties.some(spec => spec.toLowerCase().includes(query)) ||
        tech.location.toLowerCase().includes(query) ||
        tech.description.toLowerCase().includes(query)
      );
    }

    // Filtro por cidade
    if (filters.city) {
      filtered = filtered.filter(tech => tech.city === filters.city);
    }

    // Filtro por estado
    if (filters.state) {
      filtered = filtered.filter(tech => tech.state === filters.state);
    }

    // Filtro por tipo de equipamento
    if (filters.equipmentType) {
      filtered = filtered.filter(tech => 
        tech.equipmentTypes.includes(filters.equipmentType)
      );
    }

    // Filtro por especialidade
    if (filters.specialty) {
      filtered = filtered.filter(tech =>
        tech.specialties.some(spec => 
          spec.toLowerCase().includes(filters.specialty.toLowerCase())
        )
      );
    }

    // Filtro por disponibilidade
    if (filters.availability) {
      filtered = filtered.filter(tech => 
        tech.availability.includes(filters.availability)
      );
    }

    // Filtro por faixa de preço
    filtered = filtered.filter(tech => {
      const maxPrice = Math.max(tech.pricing.visitPrice, tech.pricing.laborPrice);
      return maxPrice >= filters.priceRange[0] && maxPrice <= filters.priceRange[1];
    });

    setFilteredTechnicians(filtered);
  }, [technicians, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      city: '',
      state: '',
      equipmentType: '',
      specialty: '',
      availability: '',
      priceRange: [0, 200],
    });
  };

  const getUniqueValues = (key: 'city' | 'state' | 'specialties' | 'equipmentTypes') => {
    const values = new Set<string>();
    
    technicians.forEach(tech => {
      if (key === 'specialties' || key === 'equipmentTypes') {
        tech[key].forEach(item => values.add(item));
      } else {
        values.add(tech[key]);
      }
    });
    
    return Array.from(values).sort();
  };

  return {
    technicians: filteredTechnicians,
    loading,
    filters,
    updateFilters,
    clearFilters,
    getUniqueValues,
    totalResults: filteredTechnicians.length,
    hasResults: filteredTechnicians.length > 0,
    // Interface compatibility
    searchQuery,
    setSearchQuery,
    selectedTechnician,
    setSelectedTechnician,
    searchLocation,
    setSearchLocation,
    filterByService,
    setFilterByService,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    selectedEquipmentType,
    setSelectedEquipmentType
  };
};