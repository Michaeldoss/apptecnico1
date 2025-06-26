
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface ClientData {
  id: string;
  name: string;
  email: string;
  type: 'customer';
  // Adicione outros campos conforme necessário
}

export const useClientData = () => {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchClientData = async () => {
      console.log('[DEBUG] Buscando dados do cliente...');
      
      try {
        if (!isAuthenticated || !user) {
          throw new Error('Usuário não autenticado');
        }

        // Simula busca de dados do cliente
        // Em um ambiente real, aqui seria uma chamada para API
        const mockClientData: ClientData = {
          id: user.id?.toString() || '2',
          name: user.name || 'Cliente Demo',
          email: user.email || 'cliente@exemplo.com',
          type: 'customer'
        };

        console.log('[DEBUG] Dados do cliente carregados:', mockClientData);
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
