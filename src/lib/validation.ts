import { z } from 'zod';

// Enhanced password security check using HaveIBeenPwned API with rate limiting
export async function isPasswordCompromised(password: string): Promise<boolean> {
  try {
    // Create rate limiter for password checking (max 10 checks per minute per IP)
    const rateLimitKey = `password_check_${window.location.hostname}`;
    const lastCheck = parseInt(localStorage.getItem(`${rateLimitKey}_timestamp`) || '0');
    const checkCount = parseInt(localStorage.getItem(`${rateLimitKey}_count`) || '0');
    const now = Date.now();
    
    // Reset counter if more than 1 minute has passed
    if (now - lastCheck > 60000) {
      localStorage.setItem(`${rateLimitKey}_count`, '1');
      localStorage.setItem(`${rateLimitKey}_timestamp`, now.toString());
    } else if (checkCount >= 10) {
      console.warn('Password check rate limit exceeded');
      return false; // Don't block if rate limited
    } else {
      localStorage.setItem(`${rateLimitKey}_count`, (checkCount + 1).toString());
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sha1 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    
    const prefix = sha1.substring(0, 5);
    const suffix = sha1.substring(5);

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'User-Agent': 'TecnicoApp-PasswordChecker'
      }
    });
    
    if (!response.ok) {
      console.warn('HaveIBeenPwned API request failed:', response.status);
      return false; // Don't block if API fails
    }
    
    const hashes = await response.text();
    const isCompromised = hashes.split('\n').some((hash) => hash.startsWith(suffix));
    
    if (isCompromised) {
      console.warn('Password found in breach database');
    }
    
    return isCompromised;
  } catch (error) {
    console.warn('Failed to check password security:', error);
    return false; // Don't block registration if API fails
  }
}

// Validation schemas for enhanced security
export const emailSchema = z.string()
  .email('Email inválido')
  .min(1, 'Email é obrigatório')
  .max(255, 'Email muito longo');

export const passwordSchema = z.string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .max(128, 'Senha muito longa')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter pelo menos um caractere especial')
  .refine(async (password) => {
    const isCompromised = await isPasswordCompromised(password);
    return !isCompromised;
  }, 'Esta senha foi encontrada em vazamentos de dados. Escolha uma senha mais segura.');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  type: z.enum(['customer', 'technician', 'company'], {
    required_error: 'Tipo de usuário é obrigatório',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

export const paymentSchema = z.object({
  cliente_id: z.string().uuid('ID do cliente inválido'),
  tecnico_id: z.string().uuid('ID do técnico inválido'),
  servico_id: z.string().uuid('ID do serviço inválido'),
  valor_total: z.number().positive('Valor deve ser positivo').max(999999, 'Valor muito alto'),
  meio_pagamento: z.enum(['pix', 'boleto', 'cartao_credito', 'cartao_debito']),
  descricao: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição muito longa'),
});

// Rate limiting helper
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier);
    
    if (!userAttempts || now > userAttempts.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (userAttempts.count >= maxAttempts) {
      return false;
    }
    
    userAttempts.count++;
    return true;
  };
};