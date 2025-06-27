
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

interface Contact {
  name: string;
  position: string;
  phone: string;
  email: string;
  type: 'tecnico' | 'financeiro' | 'administrativo';
}

interface ClientData {
  id: string;
  name: string;
  email: string;
  type: 'juridica' | 'fisica';
  cnpj?: string;
  cpf?: string;
  ie?: string;
  rg?: string;
  whatsapp: string;
  phone: string;
  website?: string;
  foundedYear?: number;
  employeeCount?: string;
  businessSegment: string;
  description: string;
  mission?: string;
  vision?: string;
  values?: string[];
  address: Address;
  contacts: Contact[];
  services: string[];
  preferredServiceTime: string;
  specialRequirements?: string;
  companySize: 'small' | 'medium' | 'large';
  annualRevenue?: string;
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
          email: user.email || 'contato@techsolucoes.com.br',
          type: 'juridica',
          cnpj: '12.345.678/0001-90',
          ie: '123.456.789.012',
          whatsapp: '(11) 99999-8888',
          phone: '(11) 3333-4444',
          website: 'www.techsolucoes.com.br',
          foundedYear: 2015,
          employeeCount: '25-50',
          businessSegment: 'Tecnologia da Informação',
          description: 'Empresa especializada em soluções tecnológicas para pequenas e médias empresas, oferecendo consultoria em TI, desenvolvimento de sistemas e suporte técnico especializado. Atuamos no mercado há mais de 8 anos, com foco em inovação e excelência no atendimento.',
          mission: 'Transformar negócios através da tecnologia, oferecendo soluções inovadoras e personalizadas que aumentem a produtividade e competitividade de nossos clientes.',
          vision: 'Ser referência em soluções tecnológicas na região, reconhecida pela qualidade, inovação e compromisso com o sucesso dos nossos clientes.',
          values: ['Inovação', 'Excelência', 'Transparência', 'Compromisso', 'Sustentabilidade'],
          address: {
            street: 'Av. Paulista',
            number: '1000',
            neighborhood: 'Bela Vista',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-100',
            complement: 'Sala 1205'
          },
          contacts: [
            {
              name: 'Carlos Silva',
              position: 'Diretor de TI',
              phone: '(11) 99999-1111',
              email: 'carlos.silva@techsolucoes.com.br',
              type: 'tecnico'
            },
            {
              name: 'Maria Santos',
              position: 'Gerente Financeiro',
              phone: '(11) 99999-2222',
              email: 'maria.santos@techsolucoes.com.br',
              type: 'financeiro'
            },
            {
              name: 'João Oliveira',
              position: 'Coordenador Administrativo',
              phone: '(11) 99999-3333',
              email: 'joao.oliveira@techsolucoes.com.br',
              type: 'administrativo'
            }
          ],
          services: ['Consultoria em TI', 'Desenvolvimento de Sistemas', 'Suporte Técnico', 'Infraestrutura de Rede'],
          preferredServiceTime: 'Horário comercial (8h às 18h)',
          specialRequirements: 'Preferência por atendimento presencial para questões críticas. Ambiente com alta segurança de dados.',
          companySize: 'medium',
          annualRevenue: 'R$ 2-5 milhões'
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
