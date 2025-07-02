import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LiberarPagamentoRequest {
  transacao_id: string;
  motivo?: 'tempo_automatico' | 'confirmacao_cliente' | 'manual';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { transacao_id, motivo = 'manual' }: LiberarPagamentoRequest = await req.json();

    console.log('Liberando pagamento:', { transacao_id, motivo });

    // Buscar transação
    const { data: transacao, error: findError } = await supabaseClient
      .from('transacoes')
      .select('*')
      .eq('id', transacao_id)
      .single();

    if (findError || !transacao) {
      console.error('Transação não encontrada:', findError);
      return new Response(
        JSON.stringify({ error: 'Transação não encontrada' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verificar se pode ser liberada
    if (transacao.status !== 'retido') {
      console.log('Transação não está no status retido:', transacao.status);
      return new Response(
        JSON.stringify({ error: 'Transação não pode ser liberada', status_atual: transacao.status }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Liberando valor para o técnico...');

    // Atualizar status para liberado
    const { error: updateError } = await supabaseClient
      .from('transacoes')
      .update({
        status: 'liberado',
        data_liberacao: new Date().toISOString(),
      })
      .eq('id', transacao_id);

    if (updateError) {
      console.error('Erro ao atualizar transação:', updateError);
      return new Response(
        JSON.stringify({ error: 'Erro ao liberar pagamento' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Pagamento liberado com sucesso');

    // Aqui você pode implementar:
    // 1. Transfer automática via Mercado Pago (se usando split)
    // 2. Notificação para o técnico
    // 3. Registro no histórico

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Pagamento liberado com sucesso',
        transacao_id,
        motivo,
        data_liberacao: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Erro na função liberar-pagamento:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});