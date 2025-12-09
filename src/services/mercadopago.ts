import { supabase } from '@/integrations/supabase/client';

export interface CriarPagamentoParams {
  cliente_id: string;
  tecnico_id: string;
  servico_id: string;
  valor_total: number;
  meio_pagamento: 'pix' | 'boleto' | 'cartao_credito' | 'cartao_debito';
  descricao: string;
}

export interface CriarAssinaturaParams {
  plano_id: string;
  usuario_id: string;
  valor: number;
  meio_pagamento: 'pix' | 'cartao_credito' | 'cartao_debito' | 'boleto';
  plano_nome: string;
}

export interface DepositoCarteiraParams {
  cliente_id: string;
  valor: number;
  meio_pagamento: 'pix' | 'cartao_credito' | 'cartao_debito' | 'boleto';
}

class MercadoPagoService {
  // Criar pagamento de serviço
  async criarPagamentoServico(params: CriarPagamentoParams) {
    const { data, error } = await supabase.functions.invoke('criar-pagamento', {
      body: params,
    });

    if (error) throw error;
    return data;
  }

  // Criar pagamento de assinatura
  async criarPagamentoAssinatura(params: CriarAssinaturaParams) {
    const { data, error } = await supabase.functions.invoke('pagamento-assinatura', {
      body: params,
    });

    if (error) throw error;
    return data;
  }

  // Criar depósito na carteira
  async criarDepositoCarteira(params: DepositoCarteiraParams) {
    const { data, error } = await supabase.functions.invoke('carteira-deposito', {
      body: params,
    });

    if (error) throw error;
    return data;
  }

  // Redirecionar para checkout
  redirectToCheckout(initPoint: string, openInNewTab = true) {
    if (openInNewTab) {
      window.open(initPoint, '_blank');
    } else {
      window.location.href = initPoint;
    }
  }

  // Verificar status de pagamento via transações
  async verificarStatusPagamento(transacaoId: string) {
    const { data, error } = await supabase
      .from('transacoes')
      .select('*')
      .eq('id', transacaoId)
      .single();

    if (error) throw error;
    return data;
  }

  // Verificar status de pagamento de assinatura
  async verificarStatusAssinatura(pagamentoId: string) {
    const { data, error } = await supabase
      .from('pagamentos_assinatura')
      .select('*')
      .eq('id', pagamentoId)
      .single();

    if (error) throw error;
    return data;
  }
}

export const mercadoPagoService = new MercadoPagoService();
