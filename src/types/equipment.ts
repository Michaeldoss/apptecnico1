
export type EquipmentType = 
  | 'eco-solvent'
  | 'uv-flexible'
  | 'cutting'
  | 'dtf-textile'
  | 'sublimation'
  | 'laser'
  | 'cnc'
  | 'industrial'
  | 'finishing';

export const equipmentTypeLabels: Record<EquipmentType, string> = {
  'eco-solvent': 'Eco Solvente',
  'uv-flexible': 'UV Flexível',
  'cutting': 'Recorte',
  'dtf-textile': 'DTF Têxtil',
  'sublimation': 'Sublimação',
  'laser': 'Laser',
  'cnc': 'CNC',
  'industrial': 'Industrial',
  'finishing': 'Acabamento'
};
