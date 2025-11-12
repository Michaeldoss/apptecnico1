// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { loginSchema, signupSchema, createRateLimiter } from '@/lib/validation';
import type { Session, User } from '@supabase/supabase-js';

export type UserType = 'technician' | 'customer' | 'admin' | 'company' | null;
type ResolvedUserType = Exclude<UserType, null>;

interface AuthActionResult {
  success: boolean;
  userType?: ResolvedUserType;
  redirectPath?: string;
  requiresConfirmation?: boolean;
  error?: string;
  errorCode?: 'rate_limit' | 'validation' | 'auth' | 'profile_missing' | 'security';
  retryAfterSeconds?: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userType: UserType;
  user: any | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<AuthActionResult>;
  signup: (email: string, password: string, userData: any) => Promise<AuthActionResult>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AUTH_REDIRECT_PATHS: Record<ResolvedUserType, string> = {
  customer: '/cliente/dashboard',
  technician: '/tecnico/dashboard',
  company: '/loja/dashboard',
  admin: '/admin/dashboard',
};

/** ---------- Helpers para inferir tipo de usuário ---------- */

const normalizeText = (value?: unknown): string => {
  if (typeof value !== 'string') return '';
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const USER_TYPE_ALIASES: Record<ResolvedUserType, string[]> = {
  technician: [
    'tecnico', 'tecnica', 'tecnico parceiro', 'tecnico credenciado', 'tecnico instalador',
    'tecnico assistencia', 'tecnico campo', 'tecnico externo', 'tecnico especialista',
    'tecnic', 'instalador', 'especialista', 'profissional tecnico', 'suporte tecnico'
  ],
  customer: ['cliente', 'client', 'customer', 'contratante', 'solicitante', 'demandante', 'usuario final'],
  company: ['loja', 'company', 'store', 'empresa', 'lojista', 'revenda', 'parceiro', 'fornecedor', 'seller', 'comercial'],
  admin: ['admin', 'administrador', 'gestor', 'suporte'],
};

const resolveUserTypeAlias = (rawValue?: unknown): ResolvedUserType | null => {
  const normalized = normalizeText(rawValue);
  if (!normalized) return null;

  const searchTargets = new Set(normalized.split(' '));
  searchTargets.add(normalized);

  for (const [userType, aliases] of Object.entries(USER_TYPE_ALIASES) as [ResolvedUserType, string[]][]) {
    for (const alias of aliases) {
      const a = normalizeText(alias);
      if (!a) continue;
      if (searchTargets.has(a) || normalized.includes(a)) return userType;
    }
  }

  if (normalized.includes('tec')) return 'technician';
  if (normalized.includes('client')) return 'customer';
  if (normalized.includes('loj') || normalized.includes('empres') || normalized.includes('store')) return 'company';

  return null;
};

const extractUserTypeFromMetadata = (user: User | null): ResolvedUserType | null => {
  if (!user) return null;

  const candidates: unknown[] = [
    (user as any)?.user_metadata?.user_type,
    (user as any)?.user_metadata?.tipo_usuario,
    (user as any)?.user_metadata?.perfil,
    (user as any)?.user_metadata?.role,
    (user as any)?.app_metadata?.user_type,
    (user as any)?.app_metadata?.tipo_usuario,
    (user as any)?.app_metadata?.perfil,
    (user as any)?.app_metadata?.role,
  ];

  for (const c of candidates) {
    const r = resolveUserTypeAlias(c);
    if (r) return r;
  }
  return null;
};

/** ---------- Rate limiters ---------- */

const loginLimiter = createRateLimiter(5, 15 * 60 * 1000);
const signupLimiter = createRateLimiter(3, 60 * 60 * 1000);

/** ---------- Contexto ---------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica tipo com prioridade por tabelas e aceita “dica” por metadados
  const checkUserTypeInTables = async (
    userId: string,
    metadataHint?: ResolvedUserType | null
  ): Promise<UserType> => {
    console.log('🔍 Identificando tipo de usuário para:', userId, metadataHint);
    if (metadataHint) return metadataHint;

    try {
      const [{ data: adminRole }, { data: tech }, { data: store }, { data: customer }] = await Promise.all([
        supabase.from('user_roles').select('role').eq('user_id', userId).eq('role', 'admin').maybeSingle(),
        supabase.from('tecnicos').select('id').eq('id', userId).maybeSingle(),
        supabase.from('lojas').select('id').eq('id', userId).maybeSingle(),
        supabase.from('clientes').select('id').eq('id', userId).maybeSingle(),
      ]);

      if (adminRole) return 'admin';
      if (tech) return 'technician';
      if (store) return 'company';
      if (customer) return 'customer';

      const { data: usuario } = await supabase
        .from('usuarios')
        .select('tipo_usuario, perfil, perfil_tipo, categoria, segmento')
        .eq('id', userId)
        .maybeSingle();

      if (usuario) {
        const hint =
          resolveUserTypeAlias((usuario as any)?.tipo_usuario) ||
          resolveUserTypeAlias((usuario as any)?.perfil) ||
          resolveUserTypeAlias((usuario as any)?.perfil_tipo) ||
          resolveUserTypeAlias((usuario as any)?.categoria) ||
          resolveUserTypeAlias((usuario as any)?.segmento);
        if (hint) return hint;
      }

      const { data: rpcType } = await supabase.rpc('get_current_user_type');
      if (rpcType) {
        const rpcHint = resolveUserTypeAlias(rpcType as any);
        if (rpcHint) return rpcHint;
      }

      console.log('❌ Tipo não identificado');
      return null;
    } catch (e) {
      console.error('💥 Erro ao identificar tipo de usuário:', e);
      return null;
    }
  };

  const login = async (email: string, password: string): Promise<AuthActionResult> => {
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      const message = validationResult.error.errors[0].message;
      toast({ variant: 'destructive', title: 'Erro de validação', description: message });
      return { success: false, error: message, errorCode: 'validation' };
    }

    const normalizedEmail = validationResult.data.email.trim().toLowerCase();
    const rateLimit = loginLimiter.attempt(normalizedEmail);
    if (!rateLimit.allowed) {
      const retryAfterSeconds = Math.max(1, Math.ceil(rateLimit.retryAfter / 1000));
      const minutes = Math.ceil(retryAfterSeconds / 60);
      const waitMessage = minutes > 1 ? `${minutes} minutos` : `${retryAfterSeconds} segundos`;
      toast({ variant: 'destructive', title: 'Muitas tentativas', description: `Detectamos várias tentativas de login. Aguarde ${waitMessage} antes de tentar novamente.` });
      return { success: false, error: 'Limite de tentativas de login atingido', errorCode: 'rate_limit', retryAfterSeconds };
    }

    console.log('🔐 Tentando login para:', normalizedEmail);
    const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });

    if (error) {
      console.error('❌ Erro no login:', error);
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      let requiresConfirmation = false;

      if (error.message.includes('Invalid login credentials')) errorMessage = 'Email ou senha incorretos. Verifique suas credenciais.';
      else if (error.message.includes('Email not confirmed')) { errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.'; requiresConfirmation = true; }

      toast({ variant: 'destructive', title: 'Falha no login', description: errorMessage });
      return { success: false, error: errorMessage, errorCode: 'auth', requiresConfirmation };
    }

    if (data?.user && data?.session) {
      console.log('✅ Login bem-sucedido:', data.user.id);
      setUser(data.user);
      setSession(data.session);
      setIsAuthenticated(true);

      const metadataUserType =
        extractUserTypeFromMetadata(data.user) ||
        extractUserTypeFromMetadata(data.session.user);

      const detectedUserType = await checkUserTypeInTables(data.user.id, metadataUserType);
      setUserType(detectedUserType);
      console.log('👤 Tipo de usuário:', detectedUserType);

      if (detectedUserType) {
        loginLimiter.reset(normalizedEmail);
        const redirectPath = AUTH_REDIRECT_PATHS[detectedUserType];
        toast({ title: 'Login realizado com sucesso!', description: 'Bem-vindo de volta! Redirecionando para seu painel...' });
        return { success: true, userType: detectedUserType, redirectPath };
      }

      toast({ variant: 'destructive', title: 'Erro', description: 'Perfil de usuário não encontrado. Entre em contato com o suporte.' });
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      return { success: false, error: 'Perfil de usuário não encontrado', errorCode: 'profile_missing' };
    }

    return { success: false, error: 'Sessão não foi criada.', errorCode: 'auth' };
  };

  const signup = async (email: string, password: string, userData: any): Promise<AuthActionResult> => {
    const validationResult = await signupSchema.safeParseAsync({
      email,
      password,
      confirmPassword: password,
      nome: userData.nome,
      type: userData.type,
    });

    if (!validationResult.success) {
      const message = validationResult.error.errors[0].message;
      toast({ variant: 'destructive', title: 'Erro', description: message });
      return { success: false, error: message, errorCode: 'validation' };
    }

    const normalizedEmail = validationResult.data.email.trim().toLowerCase();
    const rateLimit = signupLimiter.attempt(normalizedEmail);
    if (!rateLimit.allowed) {
      const retryAfterSeconds = Math.max(1, Math.ceil(rateLimit.retryAfter / 1000));
      const minutes = Math.ceil(retryAfterSeconds / 60);
      const waitMessage = minutes > 1 ? `${minutes} minutos` : `${retryAfterSeconds} segundos`;
      toast({ variant: 'destructive', title: 'Muitas tentativas', description: `Detectamos várias tentativas de cadastro. Aguarde ${waitMessage} antes de tentar novamente.` });
      return { success: false, error: 'Limite de tentativas de cadastro atingido', errorCode: 'rate_limit', retryAfterSeconds };
    }

    // Validação extra via RPC (se existir)
    try {
      const { data: securityCheck, error: securityError } = await supabase.rpc('secure_user_registration', {
        p_email: normalizedEmail,
        p_password: validationResult.data.password,
        p_user_type: userData.type,
        p_user_data: userData
      });

      const securityResponse = securityCheck as { success?: boolean; message?: string } | null;
      if (securityError) {
        const msg = securityError.message?.toLowerCase?.() ?? '';
        const isMissingRpc = msg.includes('secure_user_registration') && (msg.includes('not found') || msg.includes('does not exist'));
        if (!isMissingRpc) {
          const message = securityError.message || 'Falha na validação de segurança';
          toast({ variant: 'destructive', title: 'Erro de Segurança', description: message });
          return { success: false, error: message, errorCode: 'security' };
        }
      } else if (securityResponse && securityResponse.success === false) {
        const message = securityResponse.message || 'Falha na validação de segurança';
        toast({ variant: 'destructive', title: 'Erro de Segurança', description: message });
        return { success: false, error: message, errorCode: 'security' };
      }
    } catch (securityError: any) {
      const msg = securityError?.message?.toLowerCase?.() ?? '';
      const isMissingRpc = msg.includes('secure_user_registration') && (msg.includes('not found') || msg.includes('does not exist'));
      if (!isMissingRpc) {
        console.error('Security validation failed:', securityError);
        const message = securityError?.message || 'Falha na validação de segurança';
        toast({ variant: 'destructive', title: 'Erro de Segurança', description: message });
        return { success: false, error: message, errorCode: 'security' };
      }
    }

    console.log('🔐 Iniciando signup...', { email: normalizedEmail, userType: userData.type });
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: validationResult.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login?confirmed=true`,
        data: { user_type: userData.type, name: userData.nome, ...userData },
      },
    });

    console.log('🔐 Resultado do signUp:', { id: data?.user?.id, error });

    if (error || !data.user) {
      const message = error?.message || 'Erro desconhecido';
      toast({ variant: 'destructive', title: 'Erro no cadastro', description: message });
      return { success: false, error: message, errorCode: 'auth' };
    }

    // Caso precise confirmar email
    if (!data.session && data.user && !data.user.email_confirmed_at) {
      toast({ title: 'Cadastro realizado com sucesso!', description: 'Verifique seu email e confirme a conta antes de fazer login.' });
      signupLimiter.reset(normalizedEmail);
      setTimeout(() => { window.location.href = '/login?message=confirm_email'; }, 2000);
      return { success: true, requiresConfirmation: true, redirectPath: '/login' };
    }

    const userId = data.user.id;

    // Tenta criar perfil via RPC (caso exista)
    try {
      const { data: profileResult, error: profileError } = await supabase.rpc('create_user_profile', {
        p_user_type: userData.type,
        p_user_data: userData
      });
      if (profileError || !(profileResult as any)?.success) {
        console.warn('⚠️ Profile creation may have failed, but continuing...', profileError);
      }
    } catch (e) {
      console.warn('⚠️ Profile creation error (may be handled by trigger):', e);
    }

    signupLimiter.reset(normalizedEmail);

    if (data.session) {
      setUser(data.user);
      setSession(data.session);
      setIsAuthenticated(true);

      const metadataUserType =
        extractUserTypeFromMetadata(data.user) ||
        extractUserTypeFromMetadata(data.session.user) ||
        resolveUserTypeAlias(userData?.type);

      const detectedUserType = await checkUserTypeInTables(userId, metadataUserType);
      setUserType(detectedUserType);

      if (detectedUserType) {
        const redirectPath = AUTH_REDIRECT_PATHS[detectedUserType];
        toast({ title: 'Cadastro realizado', description: 'Bem-vindo! Redirecionando para seu dashboard...' });
        setTimeout(() => { window.location.href = redirectPath; }, 1000);
        return { success: true, userType: detectedUserType, redirectPath };
      }

      toast({
        variant: 'destructive',
        title: 'Erro no redirecionamento',
        description: 'Conta criada, mas não foi possível identificar o tipo de usuário. Tente fazer login.'
      });
      return { success: false, error: 'Tipo de usuário não identificado após cadastro', errorCode: 'profile_missing' };
    }

    toast({ title: 'Cadastro realizado', description: 'Verifique seu email para confirmar a conta e fazer login.' });
    setTimeout(() => { window.location.href = '/login'; }, 2000);
    return { success: true, requiresConfirmation: true, redirectPath: '/login' };
  };

  const logout = async () => {
    console.log('🚪 Iniciando logout completo...');
    try {
      setUser(null);
      setSession(null);
      setUserType(null);
      setIsAuthenticated(false);
      localStorage.clear();
      sessionStorage.clear();

      try {
        const { error } = await supabase.auth.signOut();
        if (error) console.warn('⚠️ Aviso no signOut do Supabase:', error.message);
      } catch (e) {
        console.warn('⚠️ Erro no signOut do Supabase (ignorado):', e);
      }

      toast({ title: 'Logout realizado', description: 'Sessão encerrada com sucesso!' });
      setTimeout(() => { window.location.href = '/'; }, 500);
    } catch (e) {
      console.error('💥 Erro crítico no logout:', e);
      setUser(null);
      setSession(null);
      setUserType(null);
      setIsAuthenticated(false);
      localStorage.clear();
      sessionStorage.clear();
      toast({ title: 'Logout forçado', description: 'Sessão encerrada (com limpeza forçada).' });
      setTimeout(() => { window.location.href = '/'; }, 500);
    }
  };

  const hardReset = async () => {
    console.log('🔄 Executando hard reset do sistema de autenticação...');
    setUser(null);
    setSession(null);
    setUserType(null);
    setIsAuthenticated(false);
    localStorage.clear();
    sessionStorage.clear();
    try { await supabase.auth.signOut(); } catch (e) { console.warn('Erro no signOut durante hard reset:', e); }
    console.log('✅ Hard reset concluído');
  };

  useEffect(() => {
    const shouldReset = localStorage.getItem('force_auth_reset');
    if (shouldReset) {
      localStorage.removeItem('force_auth_reset');
      hardReset();
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, s) => {
      console.log('🔄 Auth state change:', event, s?.user?.email);

      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        setUserType(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setSession(s);
      setUser(s?.user ?? null);
      setIsAuthenticated(!!s?.user);

      if (s?.user) {
        setTimeout(async () => {
          try {
            console.log('🔍 Buscando tipo de usuário para:', s.user.id);

            const pendingUserType = sessionStorage.getItem('pending_google_user_type');
            if (pendingUserType && event === 'SIGNED_IN') {
              sessionStorage.removeItem('pending_google_user_type');
              const selectedType = pendingUserType as 'customer' | 'technician' | 'company';
              const fullName = s.user.user_metadata?.name || s.user.email?.split('@')[0] || 'Usuário';
              let tableName = 'clientes';
              let insertPayload: any = { id: s.user.id, email: s.user.email };

              if (selectedType === 'customer') {
                tableName = 'clientes'; insertPayload = { ...insertPayload, nome: fullName };
              } else if (selectedType === 'technician') {
                tableName = 'tecnicos'; insertPayload = { ...insertPayload, nome: fullName };
              } else {
                tableName = 'lojas';
                insertPayload = { ...insertPayload, nome_contato: fullName, nome_empresa: fullName };
              }

              const { error: insertError } = await supabase.from(tableName as any).insert(insertPayload);
              if (insertError) console.error('❌ Erro ao criar perfil:', insertError);
              else setUserType(selectedType);
            }

            const t = await checkUserTypeInTables(s.user.id);
            setUserType(t);

            if (!t) {
              toast({ variant: 'destructive', title: 'Erro de Configuração', description: 'Perfil não encontrado. Por favor, complete seu cadastro.' });
              await supabase.auth.signOut();
            } else {
              console.log('✅ Tipo de usuário identificado:', t);
            }
          } catch (e) {
            console.error('💥 Erro crítico ao buscar dados do usuário:', e);
            setUserType(null);
            await supabase.auth.signOut();
          }
        }, 0);
      } else {
        setUserType(null);
      }

      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, user, session, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
