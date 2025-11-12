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

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { to, message, messageType = 'text' } = await req.json();

    if (!to || !message) {
      throw new Error('Missing required fields: to, message');
    }

    // Get user's WhatsApp config
    const { data: config, error: configError } = await supabase
      .from('whatsapp_config')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    if (configError || !config) {
      throw new Error('WhatsApp not configured or inactive');
    }

    // Send message via WhatsApp API
    const whatsappResponse = await fetch(
      `https://graph.facebook.com/v18.0/${config.phone_number_id}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace(/\D/g, ''), // Remove non-numeric characters
          type: messageType,
          text: {
            body: message,
          },
        }),
      }
    );

    const whatsappData = await whatsappResponse.json();

    if (!whatsappResponse.ok) {
      console.error('WhatsApp API error:', whatsappData);
      throw new Error(whatsappData.error?.message || 'Failed to send message');
    }

    // Save message to database
    const { error: saveError } = await supabase.from('whatsapp_messages').insert({
      user_id: user.id,
      customer_phone: to,
      message_type: messageType,
      message_content: message,
      direction: 'outbound',
      whatsapp_message_id: whatsappData.messages?.[0]?.id,
      status: 'sent',
      metadata: {
        sent_at: new Date().toISOString(),
      },
    });

    if (saveError) {
      console.error('Error saving message:', saveError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        messageId: whatsappData.messages?.[0]?.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Send message error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
