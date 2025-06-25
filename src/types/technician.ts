
export interface Technician {
  id: number;
  name: string;
  location: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  description: string;
  coordinates: [number, number];
  state?: string;
  city?: string;
  availability?: string[];
  equipmentTypes?: string[];
  pricing?: {
    quotePrice: number; // Sempre 0 (gratuito)
    visitPrice: number; // Custo de deslocamento para visita técnica
    laborPrice: number; // Valor por hora de mão de obra
  };
}

export interface TechnicianFilters {
  searchQuery: string;
  location: string;
  service: string;
  state: string;
  city: string;
  equipmentType: string;
}

export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

export const serviceTypeLabels: Record<string, string> = {
  installation: 'Instalação',
  maintenance: 'Manutenção',
  repair: 'Reparo',
  consultation: 'Consultoria',
  training: 'Treinamento',
  upgrade: 'Upgrade',
  cleaning: 'Limpeza'
};
