
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
  selectedEquipmentType: EquipmentType | 'all' | '';
  setSelectedEquipmentType: (type: EquipmentType | 'all' | '') => void;
  onSearch?: () => void;
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
  setSelectedEquipmentType,
  onSearch
}) => {
  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Search Query */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#374151]">
            Buscar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Técnico ou especialidade"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-300"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#374151]">
            Localização
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Digite a localização"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10 bg-white border-gray-300"
            />
          </div>
        </div>

        {/* Service Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#374151]">
            Tipo de Serviço
          </label>
          <Select value={filterByService} onValueChange={setFilterByService}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Selecione o serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os serviços</SelectItem>
              {Object.entries(serviceTypeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* State Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#374151]">
            Estado
          </label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>
              {brazilianStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#374151]">
            Cidade
          </label>
          <Input
            placeholder="Digite a cidade"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-white border-gray-300"
          />
        </div>

        {/* Equipment Type Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#374151]">
            Tipo de Equipamento
          </label>
          <Select value={selectedEquipmentType} onValueChange={(value) => setSelectedEquipmentType(value as EquipmentType | 'all' | '')}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Selecione o equipamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os equipamentos</SelectItem>
              {Object.entries(equipmentTypeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Search Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSearch}
          className="bg-[#ff6b2c] text-white hover:bg-[#f2551a] font-semibold px-8 py-2"
        >
          <Search className="h-4 w-4 mr-2" />
          Pesquisar Técnicos
        </Button>
      </div>
    </div>
  );
};

export default TechnicianFilters;
