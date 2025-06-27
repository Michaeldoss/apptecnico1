
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

        // Simula busca de dados mais completos do cliente
        const mockClientData: ClientData = {
          id: user.id?.toString() || '2',
          name: user.name || 'TechSoluções Ltda',
          fantasyName: 'TechSoluções',
          email: user.email || 'contato@techsolucoes.com.br',
          alternativeEmails: ['financeiro@techsolucoes.com.br', 'comercial@techsolucoes.com.br'],
          type: 'juridica',
          cnpj: '12.345.678/0001-90',
          ie: '123.456.789.012',
          im: '987654321',
          whatsapp: '(11) 99999-8888',
          phone: '(11) 3333-4444',
          alternativePhones: ['(11) 3333-4445', '(11) 99999-7777'],
          website: 'www.techsolucoes.com.br',
          socialMedia: {
            facebook: 'facebook.com/techsolucoes',
            instagram: '@techsolucoes',
            linkedin: 'linkedin.com/company/techsolucoes'
          },
          foundedYear: 2015,
          employeeCount: '25-50',
          businessSegment: 'Tecnologia da Informação',
          businessActivity: 'Desenvolvimento de software, consultoria em TI e suporte técnico',
          description: 'Empresa especializada em soluções tecnológicas para pequenas e médias empresas, oferecendo consultoria em TI, desenvolvimento de sistemas e suporte técnico especializado. Atuamos no mercado há mais de 8 anos, com foco em inovação e excelência no atendimento aos nossos clientes.',
          mission: 'Transformar negócios através da tecnologia, oferecendo soluções inovadoras e personalizadas que aumentem a produtividade e competitividade de nossos clientes.',
          vision: 'Ser referência em soluções tecnológicas na região, reconhecida pela qualidade, inovação e compromisso com o sucesso dos nossos clientes.',
          values: ['Inovação', 'Excelência', 'Transparência', 'Compromisso', 'Sustentabilidade', 'Ética Profissional'],
          address: {
            street: 'Av. Paulista',
            number: '1000',
            neighborhood: 'Bela Vista',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-100',
            complement: 'Sala 1205 - Torre A'
          },
          billingAddress: {
            street: 'Av. Paulista',
            number: '1000',
            neighborhood: 'Bela Vista',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-100',
            complement: 'Sala 1205 - Torre A'
          },
          deliveryAddress: {
            street: 'Rua da Consolação',
            number: '500',
            neighborhood: 'Consolação',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01302-000',
            complement: 'Depósito 2'
          },
          legalRepresentative: {
            name: 'Carlos Roberto Silva',
            cpf: '123.456.789-00',
            rg: '12.345.678-9',
            position: 'Diretor Presidente',
            phone: '(11) 99999-1111',
            email: 'carlos.silva@techsolucoes.com.br',
            birthDate: '15/03/1980',
            nationality: 'Brasileira',
            maritalStatus: 'Casado',
            address: {
              street: 'Rua das Flores',
              number: '123',
              neighborhood: 'Jardim Paulista',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01401-000',
              complement: 'Apartamento 45'
            }
          },
          partners: [
            {
              name: 'Carlos Roberto Silva',
              cpf: '123.456.789-00',
              position: 'Diretor Presidente',
              participation: '60%',
              phone: '(11) 99999-1111',
              email: 'carlos.silva@techsolucoes.com.br',
              address: {
                street: 'Rua das Flores',
                number: '123',
                neighborhood: 'Jardim Paulista',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '01401-000',
                complement: 'Apartamento 45'
              }
            },
            {
              name: 'Maria Fernanda Santos',
              cpf: '987.654.321-00',
              position: 'Diretora Técnica',
              participation: '40%',
              phone: '(11) 99999-2222',
              email: 'maria.santos@techsolucoes.com.br',
              address: {
                street: 'Av. Brigadeiro Faria Lima',
                number: '2000',
                neighborhood: 'Itaim Bibi',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '01451-000',
                complement: 'Cobertura 1'
              }
            }
          ],
          contacts: [
            {
              name: 'Carlos Silva',
              position: 'Diretor de TI',
              phone: '(11) 99999-1111',
              email: 'carlos.silva@techsolucoes.com.br',
              whatsapp: '(11) 99999-1111',
              type: 'tecnico'
            },
            {
              name: 'Maria Santos',
              position: 'Gerente Financeiro',
              phone: '(11) 99999-2222',
              email: 'maria.santos@techsolucoes.com.br',
              whatsapp: '(11) 99999-2222',
              type: 'financeiro'
            },
            {
              name: 'João Oliveira',
              position: 'Coordenador Administrativo',
              phone: '(11) 99999-3333',
              email: 'joao.oliveira@techsolucoes.com.br',
              whatsapp: '(11) 99999-3333',
              type: 'administrativo'
            },
            {
              name: 'Ana Costa',
              position: 'Gerente Comercial',
              phone: '(11) 99999-4444',
              email: 'ana.costa@techsolucoes.com.br',
              whatsapp: '(11) 99999-4444',
              type: 'comercial'
            }
          ],
          services: ['Consultoria em TI', 'Desenvolvimento de Sistemas', 'Suporte Técnico', 'Infraestrutura de Rede', 'Segurança da Informação'],
          preferredServiceTime: 'Horário comercial (8h às 18h)',
          specialRequirements: 'Preferência por atendimento presencial para questões críticas. Ambiente com alta segurança de dados. Necessário agendamento prévio para visitas técnicas.',
          companySize: 'medium',
          annualRevenue: 'R$ 2-5 milhões',
          taxRegime: 'Lucro Presumido',
          bankData: {
            bank: 'Banco do Brasil',
            agency: '1234-5',
            account: '12345-6',
            accountType: 'Conta Corrente'
          },
          observations: 'Cliente muito exigente com prazos. Sempre solicita relatórios detalhados dos serviços executados. Prefere comunicação por e-mail para questões formais.'
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
