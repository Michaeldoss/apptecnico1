
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Filter } from 'lucide-react';
import { brazilianStates, serviceTypeLabels } from '@/types/technician';
import { equipmentTypeLabels, EquipmentType } from '@/types/equipment';

interface TechnicianFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchLocation: string;
  setSearchLocation: (location: string) => void;
  filterByService: string;
  setFilterByService: (service: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedEquipmentType: EquipmentType | '';
  setSelectedEquipmentType: (type: EquipmentType | '') => void;
}

const TechnicianFilters: React.FC<TechnicianFiltersProps> = ({
  searchQuery,
  setSearchQuery,
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
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search Query */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
          <Input
            placeholder="Buscar técnico ou especialidade"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
          <Input
            placeholder="Localização"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
          />
        </div>

        {/* Service Filter */}
        <Select value={filterByService} onValueChange={setFilterByService}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white">
            <SelectValue placeholder="Tipo de serviço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os serviços</SelectItem>
            {Object.entries(serviceTypeLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* State Filter */}
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os estados</SelectItem>
            {brazilianStates.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City Filter */}
        <Input
          placeholder="Cidade"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
        />

        {/* Equipment Type Filter */}
        <Select value={selectedEquipmentType} onValueChange={(value) => setSelectedEquipmentType(value as EquipmentType | '')}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white">
            <SelectValue placeholder="Tipo de equipamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os equipamentos</SelectItem>
            {Object.entries(equipmentTypeLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TechnicianFilters;
