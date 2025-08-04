import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  name: string;
  email: string;
  userType: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, userType }: ConfirmationEmailRequest = await req.json();

    console.log("Sending confirmation email to:", email);

    const userTypeText = {
      client: "Cliente",
      technician: "Técnico",
      store: "Loja"
    }[userType] || "Usuário";

    const emailResponse = await resend.emails.send({
      from: "TechHelper <onboarding@resend.dev>",
      to: [email],
      subject: "Bem-vindo ao TechHelper - Cadastro realizado com sucesso!",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); padding: 40px 0;">
          <div style="background: white; margin: 0 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">TechHelper</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Plataforma de Assistência Técnica</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 36px;">✓</span>
                </div>
                <h2 style="color: #1f2937; margin: 0 0 10px 0; font-size: 24px; font-weight: bold;">Cadastro Realizado com Sucesso!</h2>
                <p style="color: #6b7280; margin: 0; font-size: 16px;">Seja bem-vindo(a) à nossa plataforma</p>
              </div>
              
              <div style="background: #f8fafc; border-radius: 8px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #1e40af;">
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Informações do Cadastro</h3>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Nome:</strong> ${name}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Tipo de Conta:</strong> ${userTypeText}</p>
              </div>
              
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="http://localhost:3000/login" style="background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);">
                  Acessar Plataforma
                </a>
              </div>
              
              <div style="border-top: 1px solid #e5e7eb; padding-top: 25px;">
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Próximos Passos:</h3>
                <ul style="color: #4b5563; line-height: 1.6; padding-left: 20px;">
                  <li>Complete seu perfil na plataforma</li>
                  <li>Explore nossos serviços disponíveis</li>
                  <li>Entre em contato conosco se precisar de ajuda</li>
                </ul>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                © 2024 TechHelper. Todos os direitos reservados.<br>
                <span style="color: #9ca3af;">Este é um email automático, não responda a esta mensagem.</span>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);