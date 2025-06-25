
import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from '@/components/ui/label';
import { getAllEquipmentTypes } from '@/types/equipment';
import { brazilianStates } from '@/types/technician';
import { EquipmentType } from '@/types/equipment';

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
  selectedEquipmentType: string;
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
  const equipmentOptions = getAllEquipmentTypes();
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Buscar por tipo de equipamento" 
            value={filterByService}
            onChange={(e) => setFilterByService(e.target.value)}
            className="pl-10 bg-white text-black w-full"
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Localização (ex: São Paulo, SP)" 
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="pl-10 bg-white text-black w-full"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="whitespace-nowrap">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <div className="space-y-4">
              <h3 className="font-medium">Filtros avançados</h3>
              
              <div className="space-y-2">
                <Label htmlFor="equipment-type">Tipo de Equipamento</Label>
                <Select 
                  value={selectedEquipmentType || "all"} 
                  onValueChange={(value) => setSelectedEquipmentType(value === "all" ? '' : value as EquipmentType)}
                >
                  <SelectTrigger id="equipment-type">
                    <SelectValue placeholder="Selecione um tipo de equipamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {equipmentOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select 
                  value={selectedState || "all"} 
                  onValueChange={(value) => setSelectedState(value === "all" ? '' : value)}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Selecione um estado" />
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
              
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  placeholder="Digite a cidade"
                />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedEquipmentType('');
                  setSelectedState('');
                  setSelectedCity('');
                  setSearchLocation('');
                  setFilterByService('');
                }}
              >
                Limpar filtros
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TechnicianFilters;
