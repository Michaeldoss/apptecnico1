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

    console.log('Processando liberações automáticas...');

    // Buscar transações que devem ser liberadas (24h após pagamento)
    const agora = new Date().toISOString();
    
    const { data: transacoesParaLiberar, error: findError } = await supabaseClient
      .from('transacoes')
      .select('*')
      .eq('status', 'retido')
      .lte('data_liberacao', agora);

    if (findError) {
      console.error('Erro ao buscar transações:', findError);
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar transações' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Encontradas ${transacoesParaLiberar?.length || 0} transações para liberar`);

    if (!transacoesParaLiberar || transacoesParaLiberar.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Nenhuma transação para liberar', processadas: 0 }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    let liberadas = 0;
    let erros = 0;

    // Processar cada transação
    for (const transacao of transacoesParaLiberar) {
      try {
        console.log(`Liberando transação ${transacao.id}...`);

        // Liberar pagamento via função
        const liberarResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/liberar-pagamento`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          },
          body: JSON.stringify({
            transacao_id: transacao.id,
            motivo: 'tempo_automatico',
          }),
        });

        if (liberarResponse.ok) {
          liberadas++;
          console.log(`Transação ${transacao.id} liberada com sucesso`);
        } else {
          erros++;
          console.error(`Erro ao liberar transação ${transacao.id}:`, await liberarResponse.text());
        }

      } catch (error) {
        erros++;
        console.error(`Erro ao processar transação ${transacao.id}:`, error);
      }
    }

    console.log(`Processamento concluído: ${liberadas} liberadas, ${erros} erros`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Processamento de liberações concluído',
        total_encontradas: transacoesParaLiberar.length,
        liberadas,
        erros,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Erro na função processar-liberacao-automatica:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});