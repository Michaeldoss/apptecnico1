import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

interface CreateSubscriptionPaymentRequest {
  plano_id: string;
  usuario_id: string;
  valor: number;
  meio_pagamento: 'pix' | 'cartao_credito' | 'cartao_debito' | 'boleto';
  plano_nome: string;
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

    const body: CreateSubscriptionPaymentRequest = await req.json();
    
    const { plano_id, usuario_id, valor, meio_pagamento, plano_nome } = body;

    // Validar campos obrigatórios
    if (!plano_id || !usuario_id || !valor || !meio_pagamento || !plano_nome) {
      return new Response(
        JSON.stringify({ error: 'Campos obrigatórios em falta' }),
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

    console.log('Token MercadoPago configurado, criando preferência...');
    console.log('Dados da requisição:', { plano_id, usuario_id, valor, meio_pagamento, plano_nome });

    // Criar preferência no Mercado Pago
    const preferenceData = {
      items: [
        {
          title: `Assinatura ${plano_nome}`,
          description: `Plano de assinatura mensal - ${plano_nome}`,
          unit_price: Number(valor),
          quantity: 1,
          currency_id: 'BRL',
        }
      ],
      payment_methods: {
        excluded_payment_types: [],
        installments: meio_pagamento === 'cartao_credito' ? 12 : 1,
      },
      back_urls: {
        success: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pagamento-callback?tipo=assinatura&status=success`,
        failure: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pagamento-callback?tipo=assinatura&status=failure`,
        pending: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pagamento-callback?tipo=assinatura&status=pending`,
      },
      auto_return: 'approved',
      external_reference: `assinatura_${plano_id}_${usuario_id}`,
      notification_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/mercadopago-webhook`,
    };

    console.log('Preferência a ser criada:', JSON.stringify(preferenceData));

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mercadoPagoAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData),
    });

    const responseText = await mpResponse.text();
    console.log('Resposta MercadoPago (raw):', responseText);
    
    let mpData;
    try {
      mpData = responseText ? JSON.parse(responseText) : {};
    } catch (parseError) {
      console.error('Erro ao fazer parse da resposta:', parseError);
      return new Response(
        JSON.stringify({ error: 'Resposta inválida do MercadoPago', details: responseText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!mpResponse.ok) {
      console.error('Erro no Mercado Pago:', JSON.stringify(mpData));
      console.error('Status:', mpResponse.status);
      
      // Mensagem mais detalhada para debug
      let errorMessage = 'Falha ao processar pagamento';
      if (mpData.message) {
        errorMessage = `Erro MercadoPago: ${mpData.message}`;
      }
      if (mpResponse.status === 401 || mpResponse.status === 403) {
        errorMessage = 'Token do MercadoPago inválido ou sem permissões. Verifique se está usando o Access Token de produção correto.';
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage, details: mpData }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Preferência de assinatura criada:', mpData.id);

    // Salvar pagamento de assinatura no banco
    const { data: pagamento, error: dbError } = await supabaseClient
      .from('pagamentos_assinatura')
      .insert({
        usuario_id,
        valor,
        meio_pagamento,
        status: 'pendente',
        mercadopago_preference_id: mpData.id,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Erro ao salvar pagamento:', dbError);
      return new Response(
        JSON.stringify({ error: 'Erro ao registrar pagamento' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        pagamento_id: pagamento.id,
        preference_id: mpData.id,
        init_point: mpData.init_point,
        sandbox_init_point: mpData.sandbox_init_point,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro na função pagamento-assinatura:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
