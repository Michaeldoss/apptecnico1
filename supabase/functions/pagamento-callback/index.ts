import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const tipo = url.searchParams.get('tipo') || 'servico';
    const paymentId = url.searchParams.get('payment_id');
    const preferenceId = url.searchParams.get('preference_id');
    const externalReference = url.searchParams.get('external_reference');

    console.log('Callback recebido:', { status, tipo, paymentId, preferenceId, externalReference });

    // URL base do frontend
    const frontendUrl = Deno.env.get('FRONTEND_URL') || 'https://f4bbe0c8-b3f0-447f-9168-55f9a39cfcf9.lovableproject.com';

    let redirectPath = '/';

    switch (tipo) {
      case 'assinatura':
        redirectPath = status === 'success' 
          ? '/tecnico/planos?pagamento=sucesso' 
          : '/tecnico/planos?pagamento=erro';
        break;
      case 'carteira':
        redirectPath = status === 'success'
          ? '/cliente/carteira?deposito=sucesso'
          : '/cliente/carteira?deposito=erro';
        break;
      case 'servico':
      default:
        redirectPath = status === 'success'
          ? '/cliente/pagamentos?pagamento=sucesso'
          : '/cliente/pagamentos?pagamento=erro';
        break;
    }

    // Redirecionar para o frontend
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': `${frontendUrl}${redirectPath}`,
      },
    });

  } catch (error) {
    console.error('Erro no callback:', error);
    return new Response(
      JSON.stringify({ error: 'Erro no processamento' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
