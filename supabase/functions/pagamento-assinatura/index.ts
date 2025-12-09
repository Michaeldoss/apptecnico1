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
  console.log('=== INÍCIO: pagamento-assinatura ===');
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  
  // Log headers (sem expor tokens completos)
  const authHeader = req.headers.get('Authorization');
  console.log('Authorization header presente:', !!authHeader);
  if (authHeader) {
    console.log('Authorization tipo:', authHeader.substring(0, 20) + '...');
  }

  if (req.method === 'OPTIONS') {
    console.log('Respondendo preflight CORS');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verificar se temos as variáveis de ambiente necessárias
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    console.log('SUPABASE_URL presente:', !!supabaseUrl);
    console.log('SUPABASE_ANON_KEY presente:', !!supabaseAnonKey);

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('ERRO: Variáveis de ambiente Supabase não configuradas');
      return new Response(
        JSON.stringify({ error: 'Configuração do servidor incompleta' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Criar cliente Supabase com autenticação do usuário
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        global: {
          headers: { Authorization: authHeader || '' },
        },
      }
    );

    // Verificar usuário autenticado
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    console.log('Verificação de autenticação:');
    console.log('- Usuário encontrado:', !!user);
    console.log('- Erro de auth:', authError?.message || 'nenhum');
    
    if (authError) {
      console.error('ERRO de autenticação:', authError);
      return new Response(
        JSON.stringify({ 
          error: 'Erro de autenticação', 
          details: authError.message,
          code: 'AUTH_ERROR'
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!user) {
      console.error('ERRO: Usuário não autenticado');
      return new Response(
        JSON.stringify({ 
          error: 'Usuário não autenticado. Faça login para continuar.',
          code: 'NOT_AUTHENTICATED'
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Usuário autenticado:', user.id);

    // Parse do body
    let body: CreateSubscriptionPaymentRequest;
    try {
      body = await req.json();
      console.log('Body recebido:', JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error('ERRO ao fazer parse do body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Body da requisição inválido', code: 'INVALID_BODY' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { plano_id, usuario_id, valor, meio_pagamento, plano_nome } = body;

    // Validar campos obrigatórios
    const camposFaltantes = [];
    if (!plano_id) camposFaltantes.push('plano_id');
    if (!usuario_id) camposFaltantes.push('usuario_id');
    if (!valor) camposFaltantes.push('valor');
    if (!meio_pagamento) camposFaltantes.push('meio_pagamento');
    if (!plano_nome) camposFaltantes.push('plano_nome');

    if (camposFaltantes.length > 0) {
      console.error('ERRO: Campos obrigatórios em falta:', camposFaltantes);
      return new Response(
        JSON.stringify({ 
          error: 'Campos obrigatórios em falta', 
          campos_faltantes: camposFaltantes,
          code: 'MISSING_FIELDS'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verificar token do MercadoPago
    const mercadoPagoAccessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN');
    
    console.log('MERCADOPAGO_ACCESS_TOKEN presente:', !!mercadoPagoAccessToken);
    if (mercadoPagoAccessToken) {
      console.log('Token MP tamanho:', mercadoPagoAccessToken.length);
      console.log('Token MP início:', mercadoPagoAccessToken.substring(0, 10) + '...');
    }
    
    if (!mercadoPagoAccessToken) {
      console.error('ERRO: Token do Mercado Pago não configurado');
      return new Response(
        JSON.stringify({ 
          error: 'Configuração de pagamento não encontrada. Entre em contato com o suporte.',
          code: 'MP_TOKEN_MISSING'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Criando preferência no MercadoPago...');
    console.log('Dados:', { plano_id, usuario_id, valor, meio_pagamento, plano_nome });

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
        success: `${supabaseUrl}/functions/v1/pagamento-callback?tipo=assinatura&status=success`,
        failure: `${supabaseUrl}/functions/v1/pagamento-callback?tipo=assinatura&status=failure`,
        pending: `${supabaseUrl}/functions/v1/pagamento-callback?tipo=assinatura&status=pending`,
      },
      auto_return: 'approved',
      external_reference: `assinatura_${plano_id}_${usuario_id}`,
      notification_url: `${supabaseUrl}/functions/v1/mercadopago-webhook`,
    };

    console.log('Preferência a ser criada:', JSON.stringify(preferenceData, null, 2));

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mercadoPagoAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData),
    });

    console.log('MercadoPago response status:', mpResponse.status);
    console.log('MercadoPago response ok:', mpResponse.ok);

    const responseText = await mpResponse.text();
    console.log('MercadoPago response body (primeiros 500 chars):', responseText.substring(0, 500));
    
    let mpData;
    try {
      mpData = responseText ? JSON.parse(responseText) : {};
    } catch (parseError) {
      console.error('ERRO ao fazer parse da resposta MP:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Resposta inválida do MercadoPago', 
          details: responseText.substring(0, 200),
          code: 'MP_PARSE_ERROR'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!mpResponse.ok) {
      console.error('ERRO no MercadoPago:', JSON.stringify(mpData, null, 2));
      console.error('Status HTTP:', mpResponse.status);
      
      let errorMessage = 'Falha ao processar pagamento';
      let errorCode = 'MP_ERROR';
      
      if (mpData.message) {
        errorMessage = `Erro MercadoPago: ${mpData.message}`;
      }
      if (mpResponse.status === 401) {
        errorMessage = 'Token do MercadoPago inválido ou expirado. Verifique as configurações.';
        errorCode = 'MP_UNAUTHORIZED';
      }
      if (mpResponse.status === 403) {
        errorMessage = 'Acesso negado pelo MercadoPago. Verifique as permissões do token.';
        errorCode = 'MP_FORBIDDEN';
      }
      if (mpResponse.status === 400) {
        errorMessage = `Dados inválidos enviados ao MercadoPago: ${mpData.message || 'verifique os dados'}`;
        errorCode = 'MP_BAD_REQUEST';
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorMessage, 
          details: mpData,
          code: errorCode,
          mp_status: mpResponse.status
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Preferência criada com sucesso! ID:', mpData.id);
    console.log('Init point:', mpData.init_point);

    // Salvar pagamento de assinatura no banco
    console.log('Salvando pagamento no banco...');
    
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
      console.error('ERRO ao salvar pagamento no banco:', dbError);
      return new Response(
        JSON.stringify({ 
          error: 'Erro ao registrar pagamento no banco de dados',
          details: dbError.message,
          code: 'DB_ERROR'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Pagamento salvo com sucesso! ID:', pagamento.id);
    console.log('=== FIM: pagamento-assinatura (sucesso) ===');

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
    console.error('=== ERRO INESPERADO na função pagamento-assinatura ===');
    console.error('Tipo:', error.constructor.name);
    console.error('Mensagem:', error.message);
    console.error('Stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message,
        code: 'INTERNAL_ERROR'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
