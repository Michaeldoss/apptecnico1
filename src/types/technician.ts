
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
}
