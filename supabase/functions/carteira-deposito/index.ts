import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

interface DepositoRequest {
  cliente_id: string;
  valor: number;
  meio_pagamento: 'pix' | 'cartao_credito' | 'cartao_debito' | 'boleto';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const body: DepositoRequest = await req.json();
    const { cliente_id, valor, meio_pagamento } = body;

    // Validar campos
    if (!cliente_id || !valor || valor <= 0 || !meio_pagamento) {
      return new Response(
        JSON.stringify({ error: 'Dados inválidos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const mercadoPagoAccessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN');
    
    if (!mercadoPagoAccessToken) {
      console.error('Token do Mercado Pago não configurado');
      return new Response(
        JSON.stringify({ error: 'Configuração de pagamento não encontrada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verificar ou criar carteira
    let { data: carteira, error: carteiraError } = await supabaseClient
      .from('carteira_cliente')
      .select('*')
      .eq('cliente_id', cliente_id)
      .single();

    if (!carteira) {
      const { data: novaCarteira, error: novaCarteiraError } = await supabaseClient
        .from('carteira_cliente')
        .insert({ cliente_id, saldo: 0, saldo_bloqueado: 0 })
        .select()
        .single();

      if (novaCarteiraError) {
        console.error('Erro ao criar carteira:', novaCarteiraError);
        return new Response(
          JSON.stringify({ error: 'Erro ao processar carteira' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      carteira = novaCarteira;
    }

    // Criar preferência no Mercado Pago
    const preferenceData = {
      items: [
        {
          title: 'Depósito na Carteira',
          description: 'Adicionar saldo à carteira digital',
          unit_price: valor,
          quantity: 1,
          category_id: 'wallet',
        }
      ],
      payment_methods: {
        excluded_payment_types: [],
        installments: meio_pagamento === 'cartao_credito' ? 12 : 1,
      },
      back_urls: {
        success: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pagamento-callback?tipo=carteira&status=success`,
        failure: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pagamento-callback?tipo=carteira&status=failure`,
        pending: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pagamento-callback?tipo=carteira&status=pending`,
      },
      auto_return: 'approved',
      external_reference: `deposito_${carteira.id}_${Date.now()}`,
      notification_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/mercadopago-webhook`,
    };

    console.log('Criando preferência de depósito:', preferenceData);

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mercadoPagoAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData),
    });

    const mpData = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error('Erro no Mercado Pago:', mpData);
      return new Response(
        JSON.stringify({ error: 'Falha ao processar pagamento' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Criar movimentação pendente
    const { data: movimentacao, error: movError } = await supabaseClient
      .from('carteira_movimentacoes')
      .insert({
        carteira_id: carteira.id,
        tipo: 'deposito',
        valor,
        saldo_anterior: carteira.saldo,
        saldo_posterior: carteira.saldo, // Será atualizado quando aprovado
        descricao: 'Depósito via MercadoPago',
        mercadopago_payment_id: mpData.id,
        status: 'pendente',
      })
      .select()
      .single();

    if (movError) {
      console.error('Erro ao criar movimentação:', movError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        movimentacao_id: movimentacao?.id,
        preference_id: mpData.id,
        init_point: mpData.init_point,
        sandbox_init_point: mpData.sandbox_init_point,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro na função carteira-deposito:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
