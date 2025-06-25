
export type SellEquipmentCondition = 'novo' | 'seminovo' | 'usado' | 'para-pecas';

export type SellEquipmentItem = {
  id: string;
  title: string;
  type: string;
  brand: string;
  model: string;
  year?: number;
  condition: SellEquipmentCondition;
  price: number;
  description: string;
  location: {
    city: string;
    state: string;
  };
  images: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    whatsapp?: string;
  };
  specifications?: {
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  sold?: boolean;
};

export const equipmentConditionLabels: Record<SellEquipmentCondition, string> = {
  'novo': 'Novo',
  'seminovo': 'Seminovo',
  'usado': 'Usado',
  'para-pecas': 'Para Peças'
};
