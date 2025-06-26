
export const clientData = {
  id: 1,
  name: "ABC Comunicação Visual Ltda",
  type: "juridica",
  cnpj: "12.345.678/0001-90",
  ie: "123.456.789.123",
  cpf: "",
  email: "contato@abccomunicacao.com.br",
  phoneFixed: "(11) 3456-7890",
  phoneMobile: "(11) 98765-4321",
  whatsapp: "(11) 98765-4321",
  address: {
    street: "Rua das Gráficas, 1234",
    neighborhood: "Distrito Industrial",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    complement: "Galpão B"
  },
  contacts: [
    {
      name: "José Silva",
      position: "Responsável Técnico",
      phone: "(11) 99999-9999",
      email: "jose@abccomunicacao.com.br",
      type: "tecnico"
    },
    {
      name: "Maria Santos",
      position: "Responsável Financeiro",
      phone: "(11) 88888-8888",
      email: "financeiro@abccomunicacao.com.br",
      type: "financeiro"
    }
  ],
  emergencyContact: {
    name: "Pedro Costa",
    phone: "(11) 77777-7777"
  },
  location: {
    equipmentLocation: "Galpão B - Setor de Produção",
    grounding: true,
    airConditioning: true,
    employees: 8,
    environmentalConditions: "Ambiente controlado, baixa umidade",
    electricalInstallation: "Trifásico 220V",
    protectionEquipment: true,
    hasNobreak: true,
    hasFilters: true,
    hasStabilizers: true,
    photos: ["local1.jpg", "local2.jpg"]
  },
  equipment: [
    {
      id: 1,
      type: "DTF",
      brand: "Grando",
      model: "DTF 60cm",
      width: "60cm",
      heads: "2x i3200",
      serialNumber: "DTF001234",
      manufactureYear: "2023",
      installDate: "2023-01-15",
      status: "active",
      location: "Galpão B - Setor 1",
      oven: {
        model: "Forno Nacional Esteira",
        temperature: "150°C",
        belt: "Esteira automática",
        power: "220V Trifásico"
      },
      maintenanceHistory: 3,
      lastMaintenance: "2023-12-01"
    },
    {
      id: 2,
      type: "CNC Router",
      brand: "CNC Tech",
      model: "Router 1224",
      area: "1.2x2.4m",
      motorType: "Servo motor",
      control: "Mach3",
      software: "ArtCAM, Vectric",
      lubrication: "Manual",
      usage: "Alta",
      serialNumber: "CNC005678",
      installDate: "2023-02-20",
      status: "active",
      location: "Galpão B - Setor 2",
      maintenanceHistory: 2
    },
    {
      id: 3,
      type: "Prensa Térmica",
      brand: "Metalnox",
      model: "Pneumática 40x60",
      activation: "Pneumático",
      voltage: "220V",
      serialNumber: "PRS009876",
      installDate: "2023-03-10",
      status: "active",
      location: "Galpão B - Acabamento",
      maintenanceHistory: 1
    }
  ],
  history: {
    totalServices: 12,
    totalValue: "R$ 18.750,00",
    responseTime: "1.8 horas",
    activeEquipment: 3,
    inactiveEquipment: 0,
    monthlyCallFrequency: 2.1,
    overallRating: 4.9
  },
  technicians: [
    {
      name: "Ricardo Silva",
      photo: "",
      services: 8,
      rating: 4.9,
      lastVisit: "2023-12-15"
    },
    {
      name: "Ana Costa",
      photo: "",
      services: 4,
      rating: 4.8,
      lastVisit: "2023-12-01"
    }
  ],
  documents: [
    { type: "Fotos do Local", count: 5 },
    { type: "Laudos de Instalação", count: 2 },
    { type: "Notas Fiscais", count: 8 },
    { type: "Contratos", count: 1 },
    { type: "Vídeos", count: 3 }
  ],
  installationChecklist: true
};
