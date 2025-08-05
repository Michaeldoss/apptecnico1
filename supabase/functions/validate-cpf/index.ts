import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CPFValidationRequest {
  cpf: string;
  data_nascimento: string;
  nome: string;
}

interface CPFHubResponse {
  status: string;
  nome: string;
  cpf: string;
  data_nascimento: string;
  situacao_cpf: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cpf, data_nascimento, nome }: CPFValidationRequest = await req.json();
    
    if (!cpf || !data_nascimento || !nome) {
      return new Response(
        JSON.stringify({ 
          error: "CPF, data de nascimento e nome são obrigatórios",
          valid: false
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const token = Deno.env.get("CPFHUB_API_KEY");
    if (!token) {
      console.error("CPFHUB_API_KEY not configured");
      return new Response(
        JSON.stringify({ 
          error: "Serviço de validação não configurado",
          valid: false
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Remove formatação do CPF
    const cleanCpf = cpf.replace(/\D/g, '');
    
    // Construir URL da API
    const apiUrl = `https://api.cpfhub.io/consult?cpf=${cleanCpf}&data_nascimento=${data_nascimento}&token=${token}`;
    
    console.log(`Validating CPF: ${cleanCpf} with birth date: ${data_nascimento}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`CPFHub API error: ${response.status} ${response.statusText}`);
      return new Response(
        JSON.stringify({ 
          error: "Erro ao consultar CPF na Receita Federal",
          valid: false
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const data: CPFHubResponse = await response.json();
    console.log("CPFHub response:", data);

    // Verificar se a consulta foi bem-sucedida
    if (data.status !== "success") {
      // Verificar se é problema de limite de consultas
      if (data.message && data.message.includes("limit")) {
        return new Response(
          JSON.stringify({ 
            error: "Limite de consultas diárias atingido. Aguarde até amanhã ou contrate um plano pago.",
            valid: false,
            limitReached: true
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: data.message || "Erro ao validar CPF",
          valid: false
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Normalizar nomes para comparação (remover acentos, converter para maiúsculas)
    const normalizeString = (str: string) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .trim();
    };

    const nomeInformado = normalizeString(nome);
    const nomeReceita = normalizeString(data.nome);

    // Verificar se os nomes correspondem (pelo menos 80% de similaridade)
    const similarity = calculateSimilarity(nomeInformado, nomeReceita);
    const isValidName = similarity >= 0.8;

    console.log(`Nome informado: ${nomeInformado}`);
    console.log(`Nome da Receita: ${nomeReceita}`);
    console.log(`Similaridade: ${similarity}`);

    return new Response(
      JSON.stringify({
        valid: isValidName,
        cpf_status: data.situacao_cpf,
        nome_receita: data.nome,
        nome_informado: nome,
        similarity: similarity,
        message: isValidName 
          ? "CPF validado para o nome informado"
          : "Nome não confere com o CPF informado"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in validate-cpf function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Erro interno do servidor",
        valid: false
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

// Função para calcular similaridade entre strings
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) {
    return 1.0;
  }
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

// Algoritmo de distância de Levenshtein
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

serve(handler);