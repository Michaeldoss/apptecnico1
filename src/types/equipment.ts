
export type EquipmentType = 
  | 'eco-solvent'
  | 'uv-flexible'
  | 'solvent'
  | 'sublimation'
  | 'dtf-textile'
  | 'dtf-uv'
  | 'uv-flatbed'
  | 'cutting'
  | 'cylindrical-uv'
  | 'sublimation-calander'
  | 'thermal-press'
  | 'silk-carousel'
  | 'dtf-carousel'
  | 'mixed-carousel'
  | 'sewing-machine'
  | 'offset'
  | 'cnc-co2'
  | 'cnc-router'
  | 'laser-engraver'
  | 'other';

export type Equipment = {
  id: number;
  name: string;
  type: EquipmentType;
  model: string;
  brand: string;
  serialNumber: string;
  purchaseDate: string;
  lastMaintenanceDate?: string;
  status: 'operational' | 'maintenance' | 'broken' | 'inactive';
  notes?: string;
  image?: string;
};
