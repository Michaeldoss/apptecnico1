import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Enhanced security validation
    const userAgent = req.headers.get('user-agent') || '';
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Validate MercadoPago webhook
    if (!userAgent.includes('MercadoPago')) {
      await supabaseClient.rpc('log_security_event', {
        event_type: 'webhook_invalid_user_agent',
        details: { user_agent: userAgent, ip: clientIp }
      });
      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      await supabaseClient.rpc('log_security_event', {
        event_type: 'webhook_invalid_json',
        details: { error: 'Invalid JSON payload', ip: clientIp }
      });
      return new Response('OK', { status: 200, headers: corsHeaders });
    }
    
    // Validate webhook structure
    if (!body.type || !body.data?.id) {
      await supabaseClient.rpc('log_security_event', {
        event_type: 'webhook_invalid_structure',
        details: { body: body, ip: clientIp }
      });
      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    // Verificar se é notificação de pagamento
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      const mercadoPagoAccessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN');

      if (!mercadoPagoAccessToken) {
        console.error('Token do Mercado Pago não configurado');
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      // Buscar detalhes do pagamento no Mercado Pago
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${mercadoPagoAccessToken}`,
        },
      });

      const paymentData = await paymentResponse.json();
      console.log('Dados do pagamento:', JSON.stringify(paymentData, null, 2));

      if (!paymentResponse.ok) {
        console.error('Erro ao buscar pagamento:', paymentData);
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      // Buscar transação no banco pela referência externa (servico_id)
      const servicoId = paymentData.external_reference;
      
      const { data: transacao, error: findError } = await supabaseClient
        .from('transacoes')
        .select('*')
        .eq('servico_id', servicoId)
        .single();

      if (findError || !transacao) {
        console.error('Transação não encontrada:', findError);
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      console.log('Transação encontrada:', transacao.id);

      // Atualizar status da transação baseado no status do pagamento
      let novoStatus = 'pendente';
      let dataLiberacao = null;

      switch (paymentData.status) {
        case 'approved':
          novoStatus = 'retido'; // Pagamento aprovado, valor fica retido
          // Liberar automaticamente em 24 horas
          dataLiberacao = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          break;
        case 'pending':
          novoStatus = 'pendente';
          break;
        case 'rejected':
        case 'cancelled':
          novoStatus = 'falhado';
          break;
        default:
          novoStatus = 'pendente';
      }

      console.log('Atualizando transação para status:', novoStatus);

      // Atualizar transação
      const { error: updateError } = await supabaseClient
        .from('transacoes')
        .update({
          status: novoStatus,
          mercadopago_payment_id: paymentId,
          data_pagamento: paymentData.status === 'approved' ? new Date().toISOString() : null,
          data_liberacao: dataLiberacao,
        })
        .eq('id', transacao.id);

      if (updateError) {
        console.error('Erro ao atualizar transação:', updateError);
      } else {
        console.log('Transação atualizada com sucesso');
      }

      // Se foi aprovado, enviar notificação para o técnico
      if (paymentData.status === 'approved') {
        console.log('Pagamento aprovado - valor retido, será liberado em 24h');
        
        // Aqui você pode implementar notificação por email/push
        // usando a função de envio de emails ou notificações
      }
    }

    return new Response('OK', { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('Erro no webhook:', error);
    return new Response('OK', { status: 200, headers: corsHeaders });
  }
});