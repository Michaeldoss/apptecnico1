
export interface Technician {
  id: number;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  availability: string[];
  photo?: string;
  equipmentTypes?: string[]; // This property tracks equipment types the technician works with
  state?: string; // Estado (UF)
  city?: string; // Cidade
}

export type ServiceType = 
  | 'installation' 
  | 'maintenance' 
  | 'repair' 
  | 'periodic' 
  | 'reform';

export const serviceTypeLabels: Record<ServiceType, string> = {
  'installation': 'Instalação',
  'maintenance': 'Manutenção',
  'repair': 'Reparo',
  'periodic': 'Manutenção periódica',
  'reform': 'Reforma'
};

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
