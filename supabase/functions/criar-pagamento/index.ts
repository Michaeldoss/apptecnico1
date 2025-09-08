import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Enhanced CORS configuration - restrict to specific origins in production
const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGINS') || 'https://f4bbe0c8-b3f0-447f-9168-55f9a39cfcf9.sandbox.lovable.dev',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-csrf-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Credentials': 'false',
  'Access-Control-Max-Age': '3600',
  // Security headers
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
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

    // Parse and validate request body with enhanced security
    let body: CreatePaymentRequest;
    try {
      body = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Enhanced input validation
    const requiredFields = ['cliente_id', 'tecnico_id', 'servico_id', 'valor_total', 'meio_pagamento', 'descricao'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      await supabaseClient.rpc('log_security_event', {
        event_type: 'payment_creation_missing_fields',
        details: { missing_fields: missingFields, cliente_id: body.cliente_id }
      });
      return new Response(
        JSON.stringify({ error: `Campos obrigatórios em falta: ${missingFields.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate payment amount using database function
    const { data: isValidAmount } = await supabaseClient.rpc('validate_payment_amount', { amount: body.valor_total });
    
    if (!isValidAmount) {
      await supabaseClient.rpc('log_security_event', {
        event_type: 'payment_creation_invalid_amount',
        details: { amount: body.valor_total, cliente_id: body.cliente_id }
      });
      return new Response(
        JSON.stringify({ error: 'Valor inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate UUIDs
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const uuidFields = ['cliente_id', 'tecnico_id', 'servico_id'];
    
    for (const field of uuidFields) {
      if (!uuidRegex.test(body[field])) {
        return new Response(
          JSON.stringify({ error: `Campo ${field} deve ser um UUID válido` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const { 
      cliente_id, 
      tecnico_id, 
      servico_id, 
      valor_total, 
      meio_pagamento, 
      descricao 
    }: CreatePaymentRequest = body;

    // Log security event for payment creation
    await supabaseClient.rpc('log_security_event', {
      event_type: 'payment_creation_started',
      details: { servico_id, valor_total, meio_pagamento, cliente_id: body.cliente_id }
    });

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