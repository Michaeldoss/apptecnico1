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
      
      console.log('Webhook recebido - Payment ID:', paymentId, 'Status:', paymentData.status);

      if (!paymentResponse.ok) {
        console.error('Erro ao buscar pagamento - Status:', paymentResponse.status);
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      const externalReference = paymentData.external_reference || '';
      
      // Identificar tipo de pagamento pela referência externa
      if (externalReference.startsWith('assinatura_')) {
        await processarPagamentoAssinatura(supabaseClient, paymentData, paymentId);
      } else if (externalReference.startsWith('deposito_')) {
        await processarDepositoCarteira(supabaseClient, paymentData, paymentId, externalReference);
      } else {
        await processarPagamentoServico(supabaseClient, paymentData, paymentId, externalReference);
      }
    }

    return new Response('OK', { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('Erro no webhook:', error);
    return new Response('OK', { status: 200, headers: corsHeaders });
  }
});

// Processar pagamento de serviço (técnico)
async function processarPagamentoServico(supabaseClient: any, paymentData: any, paymentId: string, servicoId: string) {
  const { data: transacao, error: findError } = await supabaseClient
    .from('transacoes')
    .select('*')
    .eq('servico_id', servicoId)
    .single();

  if (findError || !transacao) {
    console.error('Transação não encontrada - Serviço ID:', servicoId);
    return;
  }

  let novoStatus = 'pendente';
  let dataLiberacao = null;

  switch (paymentData.status) {
    case 'approved':
      novoStatus = 'retido';
      dataLiberacao = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      break;
    case 'pending':
      novoStatus = 'pendente';
      break;
    case 'rejected':
    case 'cancelled':
      novoStatus = 'falhado';
      break;
  }

  await supabaseClient
    .from('transacoes')
    .update({
      status: novoStatus,
      mercadopago_payment_id: paymentId,
      data_pagamento: paymentData.status === 'approved' ? new Date().toISOString() : null,
      data_liberacao: dataLiberacao,
    })
    .eq('id', transacao.id);

  console.log('Transação serviço atualizada:', transacao.id, 'Status:', novoStatus);
}

// Processar pagamento de assinatura
async function processarPagamentoAssinatura(supabaseClient: any, paymentData: any, paymentId: string) {
  // Buscar pagamento de assinatura pendente
  const { data: pagamento, error: findError } = await supabaseClient
    .from('pagamentos_assinatura')
    .select('*')
    .eq('status', 'pendente')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (findError || !pagamento) {
    console.error('Pagamento de assinatura não encontrado');
    return;
  }

  let novoStatus = 'pendente';

  switch (paymentData.status) {
    case 'approved':
      novoStatus = 'aprovado';
      
      // Ativar o plano contratado
      const dataFim = new Date();
      dataFim.setDate(dataFim.getDate() + 30);

      // Desativar planos anteriores
      await supabaseClient
        .from('planos_contratados')
        .update({ status: 'cancelado' })
        .eq('usuario_id', pagamento.usuario_id)
        .eq('status', 'ativo');

      // Criar ou atualizar plano contratado
      if (pagamento.plano_contratado_id) {
        await supabaseClient
          .from('planos_contratados')
          .update({
            status: 'ativo',
            data_fim: dataFim.toISOString(),
          })
          .eq('id', pagamento.plano_contratado_id);
      }
      break;
    case 'rejected':
    case 'cancelled':
      novoStatus = 'rejeitado';
      break;
  }

  await supabaseClient
    .from('pagamentos_assinatura')
    .update({
      status: novoStatus,
      mercadopago_payment_id: paymentId,
      data_pagamento: paymentData.status === 'approved' ? new Date().toISOString() : null,
    })
    .eq('id', pagamento.id);

  console.log('Pagamento assinatura atualizado:', pagamento.id, 'Status:', novoStatus);
}

// Processar depósito na carteira
async function processarDepositoCarteira(supabaseClient: any, paymentData: any, paymentId: string, externalReference: string) {
  // Extrair carteira_id da referência (formato: deposito_{carteira_id}_{timestamp})
  const parts = externalReference.split('_');
  const carteiraId = parts[1];

  if (!carteiraId) {
    console.error('Carteira ID não encontrado na referência:', externalReference);
    return;
  }

  // Buscar movimentação pendente
  const { data: movimentacao, error: findError } = await supabaseClient
    .from('carteira_movimentacoes')
    .select('*')
    .eq('carteira_id', carteiraId)
    .eq('tipo', 'deposito')
    .eq('status', 'pendente')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (findError || !movimentacao) {
    console.error('Movimentação de carteira não encontrada');
    return;
  }

  let novoStatus = 'pendente';

  switch (paymentData.status) {
    case 'approved':
      novoStatus = 'aprovado';
      
      // Buscar carteira e atualizar saldo
      const { data: carteira } = await supabaseClient
        .from('carteira_cliente')
        .select('*')
        .eq('id', carteiraId)
        .single();

      if (carteira) {
        const novoSaldo = carteira.saldo + movimentacao.valor;
        
        await supabaseClient
          .from('carteira_cliente')
          .update({ saldo: novoSaldo })
          .eq('id', carteiraId);

        // Atualizar saldo_posterior na movimentação
        await supabaseClient
          .from('carteira_movimentacoes')
          .update({
            status: novoStatus,
            saldo_posterior: novoSaldo,
            mercadopago_payment_id: paymentId,
          })
          .eq('id', movimentacao.id);

        console.log('Carteira atualizada - Novo saldo:', novoSaldo);
      }
      break;
    case 'rejected':
    case 'cancelled':
      novoStatus = 'rejeitado';
      await supabaseClient
        .from('carteira_movimentacoes')
        .update({
          status: novoStatus,
          mercadopago_payment_id: paymentId,
        })
        .eq('id', movimentacao.id);
      break;
  }

  console.log('Depósito carteira atualizado:', movimentacao.id, 'Status:', novoStatus);
}
