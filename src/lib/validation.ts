import { z } from 'zod';

// Password security check using HaveIBeenPwned API
export async function isPasswordCompromised(password: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sha1 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    
    const prefix = sha1.substring(0, 5);
    const suffix = sha1.substring(5);

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const hashes = await response.text();

    return hashes.split('\n').some((hash) => hash.startsWith(suffix));
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
  .regex(/[0-9]/, 'Senha deve conter pelo menos um número');

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