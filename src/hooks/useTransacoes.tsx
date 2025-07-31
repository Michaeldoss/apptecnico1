import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Transacao, CreatePaymentRequest, PaymentStatus } from '@/types/payment';
import { useToast } from '@/hooks/use-toast';

export const useTransacoes = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Buscar transações do usuário atual
  const fetchTransacoes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .or(`cliente_id.eq.${user.id},tecnico_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTransacoes((data || []) as Transacao[]);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao buscar transações:', err);
      }
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  // Criar nova transação/pagamento
  const criarPagamento = async (dadosPagamento: CreatePaymentRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase.functions.invoke('criar-pagamento', {
        body: dadosPagamento,
      });

      if (error) throw error;

      toast({
        title: "Pagamento criado!",
        description: "Redirecionando para o checkout...",
      });

      // Redirecionar para o checkout do Mercado Pago
      if (data.init_point) {
        window.open(data.init_point, '_blank');
      }

      // Atualizar lista de transações
      await fetchTransacoes();

      return data;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao criar pagamento:', err);
      }
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar pagamento';
      setError(errorMessage);
      
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Liberar pagamento (para técnicos ou administradores)
  const liberarPagamento = async (transacaoId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('liberar-pagamento', {
        body: {
          transacao_id: transacaoId,
          motivo: 'manual',
        },
      });

      if (error) throw error;

      toast({
        title: "Pagamento liberado!",
        description: "O valor foi liberado para o técnico.",
      });

      // Atualizar lista de transações
      await fetchTransacoes();

      return data;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao liberar pagamento:', err);
      }
      const errorMessage = err instanceof Error ? err.message : 'Erro ao liberar pagamento';
      setError(errorMessage);
      
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular resumo financeiro
  const calcularResumo = () => {
    const totalRetido = transacoes
      .filter(t => t.status === 'retido')
      .reduce((acc, t) => acc + t.valor_total, 0);

    const totalLiberado = transacoes
      .filter(t => t.status === 'liberado')
      .reduce((acc, t) => acc + t.valor_total, 0);

    const pendenteLiberacao = transacoes
      .filter(t => t.status === 'retido' && t.data_liberacao && new Date(t.data_liberacao) <= new Date())
      .reduce((acc, t) => acc + t.valor_total, 0);

    return {
      totalRetido,
      totalLiberado,
      pendenteLiberacao,
      totalTransacoes: transacoes.length,
    };
  };

  useEffect(() => {
    fetchTransacoes();
  }, []);

  return {
    transacoes,
    isLoading,
    error,
    criarPagamento,
    liberarPagamento,
    fetchTransacoes,
    resumo: calcularResumo(),
  };
};