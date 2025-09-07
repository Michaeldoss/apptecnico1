import { useState, useEffect, useCallback } from 'react';
import { Technician } from '@/types/technician';
import { supabase } from '@/integrations/supabase/client';

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
    const fetchTechnicians = async () => {
      try {
        setLoading(true);
        
        // Fetch only public-safe technician data
        const { data, error } = await supabase
          .from('tecnicos')
          .select(`
            id,
            nome,
            especialidades,
            nota_perfil,
            cidade,
            estado,
            foto_perfil_url,
            experiencia_anos,
            verificado,
            latitude,
            longitude,
            created_at
          `)
          .eq('ativo', true)
          .order('nota_perfil', { ascending: false });

        if (error) {
          console.error('Error fetching technicians:', error);
          setTechnicians([]);
          setFilteredTechnicians([]);
          return;
        }

        // Transform database data to match Technician interface
        const transformedTechnicians: Technician[] = (data || []).map(tech => ({
          id: parseInt(tech.id) || 0,
          name: tech.nome || '',
          location: `${tech.cidade || ''}, ${tech.estado || ''}`.trim().replace(/^,\s*|,\s*$/g, '') || 'Localização não informada',
          specialties: tech.especialidades || [],
          rating: tech.nota_perfil || 0,
          reviewCount: 0, // This would need to come from a reviews table
          description: `Técnico especializado em ${(tech.especialidades || []).join(', ')} com ${tech.experiencia_anos || 0} anos de experiência.`,
          coordinates: [tech.latitude || 0, tech.longitude || 0] as [number, number],
          state: tech.estado || '',
          city: tech.cidade || '',
          availability: ['Segunda a Sexta'], // Default availability
          equipmentTypes: tech.especialidades || [],
          pricing: {
            quotePrice: 0, // Always free
            visitPrice: 50, // Default visit price 
            laborPrice: 80, // Default labor price
          },
        }));

        setTechnicians(transformedTechnicians);
        setFilteredTechnicians(transformedTechnicians);
      } catch (error) {
        console.error('Error in fetchTechnicians:', error);
        setTechnicians([]);
        setFilteredTechnicians([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
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