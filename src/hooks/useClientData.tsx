
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement?: string;
}

interface Partner {
  name: string;
  cpf: string;
  position: string;
  participation: string;
  phone: string;
  email: string;
  address: Address;
}

interface LegalRepresentative {
  name: string;
  cpf: string;
  rg: string;
  position: string;
  phone: string;
  email: string;
  birthDate: string;
  nationality: string;
  maritalStatus: string;
  address: Address;
}

interface Contact {
  name: string;
  position: string;
  phone: string;
  email: string;
  whatsapp?: string;
  type: 'tecnico' | 'financeiro' | 'administrativo' | 'comercial';
}

interface ClientData {
  id: string;
  name: string;
  fantasyName?: string;
  email: string;
  alternativeEmails?: string[];
  type: 'juridica' | 'fisica';
  cnpj?: string;
  cpf?: string;
  ie?: string;
  im?: string;
  rg?: string;
  birthDate?: string;
  nationality?: string;
  maritalStatus?: string;
  whatsapp: string;
  phone: string;
  alternativePhones?: string[];
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  foundedYear?: number;
  employeeCount?: string;
  businessSegment: string;
  businessActivity: string;
  description: string;
  mission?: string;
  vision?: string;
  values?: string[];
  address: Address;
  billingAddress?: Address;
  deliveryAddress?: Address;
  legalRepresentative?: LegalRepresentative;
  partners?: Partner[];
  contacts: Contact[];
  services: string[];
  preferredServiceTime: string;
  specialRequirements?: string;
  companySize: 'small' | 'medium' | 'large';
  annualRevenue?: string;
  taxRegime?: string;
  bankData?: {
    bank: string;
    agency: string;
    account: string;
    accountType: string;
  };
  observations?: string;
}

export const useClientData = () => {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchClientData = async () => {
      console.log('[DEBUG] Buscando dados detalhados do cliente...');
      
      try {
        if (!isAuthenticated || !user) {
          throw new Error('Usuário não autenticado');
        }

        // Dados iniciais vazios para preenchimento manual
        const mockClientData: ClientData = {
          id: user.id?.toString() || '',
          name: user.name || 'Digite o nome da empresa',
          fantasyName: '',
          email: user.email || '',
          alternativeEmails: [],
          type: 'juridica',
          cnpj: '',
          ie: '',
          im: '',
          whatsapp: '',
          phone: '',
          alternativePhones: [],
          website: '',
          socialMedia: {
            facebook: '',
            instagram: '',
            linkedin: ''
          },
          foundedYear: new Date().getFullYear(),
          employeeCount: '',
          businessSegment: '',
          businessActivity: '',
          description: '',
          mission: '',
          vision: '',
          values: [],
          address: {
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
            complement: ''
          },
          billingAddress: {
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
            complement: ''
          },
          deliveryAddress: {
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
            complement: ''
          },
          legalRepresentative: {
            name: '',
            cpf: '',
            rg: '',
            position: '',
            phone: '',
            email: '',
            birthDate: '',
            nationality: 'Brasileira',
            maritalStatus: '',
            address: {
              street: '',
              number: '',
              neighborhood: '',
              city: '',
              state: '',
              zipCode: '',
              complement: ''
            }
          },
          partners: [],
          contacts: [],
          services: [],
          preferredServiceTime: '',
          specialRequirements: '',
          companySize: 'small',
          annualRevenue: '',
          taxRegime: '',
          bankData: {
            bank: '',
            agency: '',
            account: '',
            accountType: ''
          },
          observations: ''
        };

        console.log('[DEBUG] Dados completos do cliente carregados:', mockClientData);
        setClientData(mockClientData);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
        console.error('[DEBUG] Erro ao carregar dados do cliente:', errorMessage);
        setError(errorMessage);
        setClientData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [user, isAuthenticated]);

  return { clientData, loading, error };
};
