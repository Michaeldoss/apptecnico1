import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Webhook verification
    if (req.method === 'GET') {
      const url = new URL(req.url);
      const mode = url.searchParams.get('hub.mode');
      const token = url.searchParams.get('hub.verify_token');
      const challenge = url.searchParams.get('hub.challenge');

      console.log('Webhook verification request:', { mode, token });

      if (mode === 'subscribe' && token) {
        // Buscar verify_token do primeiro usuário ativo (pode ser melhorado)
        const { data: configs } = await supabase
          .from('whatsapp_config')
          .select('verify_token')
          .eq('is_active', true)
          .limit(1);

        if (configs && configs.length > 0 && configs[0].verify_token === token) {
          console.log('Webhook verified successfully');
          return new Response(challenge, { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
          });
        }
      }

      console.log('Webhook verification failed');
      return new Response('Forbidden', { status: 403, headers: corsHeaders });
    }

    // Handle incoming messages
    if (req.method === 'POST') {
      const body = await req.json();
      console.log('Received webhook:', JSON.stringify(body, null, 2));

      // Process WhatsApp messages
      if (body.object === 'whatsapp_business_account') {
        for (const entry of body.entry || []) {
          for (const change of entry.changes || []) {
            if (change.field === 'messages') {
              const messageData = change.value;
              
              // Process incoming messages
              for (const message of messageData.messages || []) {
                const customerPhone = messageData.contacts?.[0]?.wa_id || message.from;
                const customerName = messageData.contacts?.[0]?.profile?.name || 'Cliente';

                // Find user by phone_number_id
                const { data: config } = await supabase
                  .from('whatsapp_config')
                  .select('user_id')
                  .eq('phone_number_id', messageData.metadata.phone_number_id)
                  .eq('is_active', true)
                  .single();

                if (!config) {
                  console.log('Config not found for phone_number_id:', messageData.metadata.phone_number_id);
                  continue;
                }

                // Save message to database
                await supabase.from('whatsapp_messages').insert({
                  user_id: config.user_id,
                  customer_phone: customerPhone,
                  customer_name: customerName,
                  message_type: message.type,
                  message_content: message.text?.body || JSON.stringify(message),
                  direction: 'inbound',
                  whatsapp_message_id: message.id,
                  status: 'delivered',
                  metadata: {
                    timestamp: message.timestamp,
                    context: message.context,
                  },
                });

                console.log('Message saved:', { customerPhone, type: message.type });
              }

              // Process message status updates
              for (const status of messageData.statuses || []) {
                await supabase
                  .from('whatsapp_messages')
                  .update({ status: status.status })
                  .eq('whatsapp_message_id', status.id);

                console.log('Status updated:', { id: status.id, status: status.status });
              }
            }
          }
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
