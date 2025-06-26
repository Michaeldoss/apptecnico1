
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { ServiceFilters } from '@/types/service-status';

interface ServiceCallsFiltersProps {
  filters: ServiceFilters;
  onFiltersChange: (filters: ServiceFilters) => void;
}

const ServiceCallsFilters: React.FC<ServiceCallsFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const clearFilters = () => {
    onFiltersChange({ search: '' });
  };

  const hasActiveFilters = filters.search || filters.city || filters.serviceType || filters.valueRange;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pesquisa */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente ou #chamado"
              className="pl-8"
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            />
          </div>

          {/* Cidade */}
          <Select
            value={filters.city || 'todas'}
            onValueChange={(value) => onFiltersChange({ ...filters, city: value === 'todas' ? undefined : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as cidades</SelectItem>
              <SelectItem value="São Paulo">São Paulo</SelectItem>
              <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
              <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
              <SelectItem value="Brasília">Brasília</SelectItem>
            </SelectContent>
          </Select>

          {/* Tipo de Serviço */}
          <Select
            value={filters.serviceType || 'todos'}
            onValueChange={(value) => onFiltersChange({ ...filters, serviceType: value === 'todos' ? undefined : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tipo de serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="Manutenção">Manutenção</SelectItem>
              <SelectItem value="Instalação">Instalação</SelectItem>
              <SelectItem value="Orçamento">Orçamento</SelectItem>
              <SelectItem value="Retorno">Retorno</SelectItem>
              <SelectItem value="Visita Técnica">Visita Técnica</SelectItem>
            </SelectContent>
          </Select>

          {/* Faixa de Valor */}
          <Select
            value={filters.valueRange ? `${filters.valueRange.min}-${filters.valueRange.max}` : 'todos'}
            onValueChange={(value) => {
              if (value === 'todos') {
                onFiltersChange({ ...filters, valueRange: undefined });
              } else {
                const [min, max] = value.split('-').map(Number);
                onFiltersChange({ ...filters, valueRange: { min, max } });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Faixa de valor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os valores</SelectItem>
              <SelectItem value="0-100">R$ 0 - R$ 100</SelectItem>
              <SelectItem value="101-250">R$ 101 - R$ 250</SelectItem>
              <SelectItem value="251-500">R$ 251 - R$ 500</SelectItem>
              <SelectItem value="501-1000">R$ 501 - R$ 1.000</SelectItem>
              <SelectItem value="1001-9999">Acima de R$ 1.000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCallsFilters;
