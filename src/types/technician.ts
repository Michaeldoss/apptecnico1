
export interface Technician {
  id: number;
  name: string;
  location: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  description: string;
  coordinates: [number, number];
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
