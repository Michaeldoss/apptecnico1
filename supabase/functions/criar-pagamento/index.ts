import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreatePaymentRequest {
  cliente_id: string;
  tecnico_id: string;
  servico_id: string;
  valor_total: number;
  meio_pagamento: 'pix' | 'boleto' | 'cartao_credito' | 'cartao_debito';
  descricao: string;
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

    const body = await req.json();
    
    // Validate input data
    if (!body.cliente_id || !body.tecnico_id || !body.servico_id || 
        !body.valor_total || !body.meio_pagamento || !body.descricao) {
      return new Response(
        JSON.stringify({ error: 'Dados obrigatórios não fornecidos' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate amount
    if (body.valor_total <= 0 || body.valor_total > 999999) {
      return new Response(
        JSON.stringify({ error: 'Valor inválido' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { 
      cliente_id, 
      tecnico_id, 
      servico_id, 
      valor_total, 
      meio_pagamento, 
      descricao 
    }: CreatePaymentRequest = body;

    console.log('Criando pagamento:', { servico_id, valor_total, meio_pagamento });

    // Verificar se o técnico tem configuração do Mercado Pago
    const { data: tecnicoConfig, error: configError } = await supabaseClient
      .from('tecnico_pagamento_config')
      .select('*')
      .eq('tecnico_id', tecnico_id)
      .single();

    if (configError || !tecnicoConfig) {
      console.log('Técnico precisa configurar Mercado Pago');
      return new Response(
        JSON.stringify({ 
          error: 'Técnico precisa configurar conta do Mercado Pago primeiro',
          redirect_to_config: true
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Calcular taxa da plataforma
    const taxaPlataforma = tecnicoConfig.taxa_plataforma || 5.0;
    const valorTaxa = (valor_total * taxaPlataforma) / 100;
    const valorTecnico = valor_total - valorTaxa;

    // Criar preferência no Mercado Pago
    const mercadoPagoAccessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN');
    
    if (!mercadoPagoAccessToken) {
      console.error('Token do Mercado Pago não configurado');
      return new Response(
        JSON.stringify({ error: 'Configuração de pagamento não encontrada' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const preferenceData = {
      items: [
        {
          title: descricao,
          unit_price: valor_total,
          quantity: 1,
        }
      ],
      payment_methods: {
        excluded_payment_types: [],
        installments: meio_pagamento === 'cartao_credito' ? 12 : 1,
      },
      back_urls: {
        success: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pagamento-callback?status=success`,
        failure: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pagamento-callback?status=failure`,
        pending: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pagamento-callback?status=pending`,
      },
      auto_return: 'approved',
      external_reference: servico_id,
      notification_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/mercadopago-webhook`,
      marketplace_fee: valorTaxa,
      // Split de pagamento - valor vai para conta do técnico menos a taxa
      marketplace: tecnicoConfig.mercadopago_user_id,
    };

    console.log('Criando preferência no Mercado Pago:', preferenceData);

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
        JSON.stringify({ error: 'Erro ao criar pagamento', details: mpData }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Preferência criada:', mpData.id);

    // Salvar transação no banco
    const { data: transacao, error: dbError } = await supabaseClient
      .from('transacoes')
      .insert({
        cliente_id,
        tecnico_id,
        servico_id,
        valor_total,
        meio_pagamento,
        status: 'pendente',
        mercadopago_preference_id: mpData.id,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Erro ao salvar transação:', dbError);
      return new Response(
        JSON.stringify({ error: 'Erro ao criar transação' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Transação criada:', transacao.id);

    return new Response(
      JSON.stringify({
        success: true,
        transacao_id: transacao.id,
        preference_id: mpData.id,
        init_point: mpData.init_point,
        sandbox_init_point: mpData.sandbox_init_point,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Erro na função criar-pagamento:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});