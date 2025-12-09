import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Carteira {
  id: string;
  cliente_id: string;
  saldo: number;
  saldo_bloqueado: number;
  created_at: string;
  updated_at: string;
}

interface Movimentacao {
  id: string;
  carteira_id: string;
  tipo: 'deposito' | 'saque' | 'pagamento_servico' | 'pagamento_peca' | 'pagamento_assinatura' | 'reembolso' | 'bonus';
  valor: number;
  saldo_anterior: number;
  saldo_posterior: number;
  descricao: string | null;
  referencia_id: string | null;
  referencia_tipo: string | null;
  mercadopago_payment_id: string | null;
  status: 'pendente' | 'aprovado' | 'rejeitado' | 'cancelado';
  created_at: string;
}

export const useCarteira = () => {
  const [carteira, setCarteira] = useState<Carteira | null>(null);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCarteira = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      // Buscar carteira
      let { data: carteiraData, error: carteiraError } = await supabase
        .from('carteira_cliente')
        .select('*')
        .eq('cliente_id', user.id)
        .single();

      if (carteiraError && carteiraError.code !== 'PGRST116') {
        throw carteiraError;
      }

      // Se não existe, criar carteira
      if (!carteiraData) {
        const { data: novaCarteira, error: novaError } = await supabase
          .from('carteira_cliente')
          .insert({ cliente_id: user.id, saldo: 0, saldo_bloqueado: 0 })
          .select()
          .single();

        if (novaError) throw novaError;
        carteiraData = novaCarteira;
      }

      setCarteira(carteiraData as Carteira);

      // Buscar movimentações
      if (carteiraData) {
        const { data: movsData, error: movsError } = await supabase
          .from('carteira_movimentacoes')
          .select('*')
          .eq('carteira_id', carteiraData.id)
          .order('created_at', { ascending: false })
          .limit(50);

        if (movsError) throw movsError;
        setMovimentacoes((movsData || []) as Movimentacao[]);
      }

    } catch (err) {
      console.error('Erro ao buscar carteira:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const depositar = async (valor: number, meioPagamento: 'pix' | 'cartao_credito' | 'cartao_debito' | 'boleto') => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase.functions.invoke('carteira-deposito', {
        body: {
          cliente_id: user.id,
          valor,
          meio_pagamento: meioPagamento,
        },
      });

      if (error) throw error;

      toast({
        title: "Depósito iniciado!",
        description: "Redirecionando para o pagamento...",
      });

      // Redirecionar para o checkout do Mercado Pago
      if (data.init_point) {
        window.open(data.init_point, '_blank');
      }

      return data;
    } catch (err) {
      console.error('Erro ao depositar:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar depósito';
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

  const pagarComCarteira = async (
    valor: number, 
    tipo: 'pagamento_servico' | 'pagamento_peca' | 'pagamento_assinatura',
    referenciaId: string,
    descricao: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!carteira || carteira.saldo < valor) {
        throw new Error('Saldo insuficiente');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const novoSaldo = carteira.saldo - valor;

      // Criar movimentação
      const { error: movError } = await supabase
        .from('carteira_movimentacoes')
        .insert({
          carteira_id: carteira.id,
          tipo,
          valor: -valor,
          saldo_anterior: carteira.saldo,
          saldo_posterior: novoSaldo,
          descricao,
          referencia_id: referenciaId,
          referencia_tipo: tipo,
          status: 'aprovado',
        });

      if (movError) throw movError;

      // Atualizar saldo
      const { error: updateError } = await supabase
        .from('carteira_cliente')
        .update({ saldo: novoSaldo })
        .eq('id', carteira.id);

      if (updateError) throw updateError;

      toast({
        title: "Pagamento realizado!",
        description: `R$ ${valor.toFixed(2)} debitado da carteira`,
      });

      await fetchCarteira();
      return true;

    } catch (err) {
      console.error('Erro ao pagar com carteira:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar pagamento';
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

  useEffect(() => {
    fetchCarteira();
  }, []);

  return {
    carteira,
    movimentacoes,
    isLoading,
    error,
    depositar,
    pagarComCarteira,
    fetchCarteira,
    saldoDisponivel: carteira ? carteira.saldo - carteira.saldo_bloqueado : 0,
  };
};
