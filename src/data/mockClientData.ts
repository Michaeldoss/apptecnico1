// Dados removidos - sistema agora usa apenas dados reais
export const clientData = {
  id: 0,
  name: "",
  type: "juridica",
  cnpj: "",
  ie: "",
  cpf: "",
  email: "",
  phoneFixed: "",
  phoneMobile: "",
  whatsapp: "",
  address: {
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    complement: ""
  },
  contacts: [],
  emergencyContact: {
    name: "",
    phone: ""
  },
  location: {
    equipmentLocation: "",
    grounding: false,
    airConditioning: false,
    employees: 0,
    environmentalConditions: "",
    electricalInstallation: "",
    protectionEquipment: false,
    hasNobreak: false,
    hasFilters: false,
    hasStabilizers: false,
    photos: []
  },
  equipment: [],
  history: {
    totalServices: 0,
    totalValue: "R$ 0,00",
    responseTime: "0 horas",
    activeEquipment: 0,
    inactiveEquipment: 0,
    monthlyCallFrequency: 0,
    overallRating: 0
  },
  technicians: [],
  documents: [],
  installationChecklist: false
};