import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { loginSchema, signupSchema, createRateLimiter } from '@/lib/validation';
import type { User, Session } from '@supabase/supabase-js';

// Tipagem para tipos de usuário
export type UserType = 'technician' | 'customer' | 'admin' | 'company' | null;

// Interface do contexto
interface AuthContextType {
  isAuthenticated: boolean;
  userType: UserType;
  user: any | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userType: null,
  user: null,
  session: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Rate limiting for login attempts
  const loginRateLimit = createRateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 AuthContext - Iniciando login para:', email);
      
      // Rate limiting check
      if (!loginRateLimit(email)) {
        console.log('⛔ AuthContext - Rate limit atingido para:', email);
        toast({ 
          variant: "destructive", 
          title: "Muitas tentativas", 
          description: "Aguarde 15 minutos antes de tentar novamente." 
        });
        return false;
      }

      // Validate input using Zod schemas
      const validationResult = loginSchema.safeParse({ email, password });
      
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        console.log('❌ AuthContext - Erro de validação:', firstError.message);
        toast({ variant: "destructive", title: "Erro de validação", description: firstError.message });
        return false;
      }

      console.log('✅ AuthContext - Dados validados, tentando login no Supabase...');

      // Log security event (sem await para não bloquear)
      try {
        await supabase.rpc('log_security_event', {
          event_type: 'login_attempt',
          details: { email: validationResult.data.email }
        });
      } catch (logError) {
        console.warn('Erro ao registrar evento de segurança:', logError);
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: validationResult.data.email,
        password: validationResult.data.password,
      });

      console.log('🔍 AuthContext - Resposta do Supabase:', { data: !!data?.user, error: error?.message });

      if (error) {
        console.log('❌ AuthContext - Erro no login:', error);
        
        let userFriendlyMessage = 'Erro ao realizar login';
        let shouldRedirectToRegister = false;
        
        if (error.message.includes('Invalid login credentials')) {
          userFriendlyMessage = 'Email ou senha incorretos';
          shouldRedirectToRegister = true;
          console.log('🚫 AuthContext - Credenciais inválidas, sugerindo cadastro');
        } else if (error.message.includes('Email not confirmed')) {
          userFriendlyMessage = 'Email não verificado. Verifique sua caixa de entrada.';
          console.log('📧 AuthContext - Email não confirmado');
        } else if (error.message.includes('Too many requests')) {
          userFriendlyMessage = 'Muitas tentativas. Aguarde um momento e tente novamente.';
          console.log('⏰ AuthContext - Muitas tentativas');
        } else {
          console.log('🔥 AuthContext - Erro desconhecido:', error.message);
          userFriendlyMessage = `Erro: ${error.message}`;
        }
        
        if (shouldRedirectToRegister) {
          toast({ 
            variant: "destructive", 
            title: "Usuário não encontrado", 
            description: `${userFriendlyMessage}. Que tal criar uma conta?`,
          });
          
          // Mostrar toast adicional para cadastro após 3 segundos
          setTimeout(() => {
            toast({
              title: "✨ Novo por aqui?",
              description: "Crie sua conta em poucos passos!",
              action: (
                <button 
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  onClick={() => window.location.href = '/register'}
                >
                  Cadastrar agora
                </button>
              )
            });
          }, 3000);
        } else {
          toast({ 
            variant: "destructive", 
            title: "Falha no login", 
            description: userFriendlyMessage
          });
        }
        
        // Log security event (sem await para não bloquear)
        try {
          await supabase.rpc('log_security_event', {
            event_type: 'login_failed',
            details: { email: validationResult.data.email, error: error.message }
          });
        } catch (logError) {
          console.warn('Erro ao registrar evento de segurança:', logError);
        }
        
        return false;
      }

      const user = data.user;
      setUser(user);
      setIsAuthenticated(true);

      // Detectar tipo do usuário baseado nas tabelas
      const tipos = [
        { tabela: 'clientes', tipo: 'customer' },
        { tabela: 'tecnicos', tipo: 'technician' },
        { tabela: 'lojas', tipo: 'company' },
        { tabela: 'admins', tipo: 'admin' },
      ];

      for (const { tabela, tipo } of tipos) {
        const { data: resultado, error } = await supabase.from(tabela as any).select('*').eq('id', user.id).maybeSingle();
        
        if (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Failed to check ${tabela}:`, error);
          }
          continue;
        }
        
        if (resultado) {
          setUserType(tipo as UserType);
          setUser({ ...user, ...(resultado as any) });
          
          await supabase.rpc('log_security_event', {
            event_type: 'login_success',
            details: { email: user.email, type: tipo }
          });
          return true;
        }
      }

      // Se chegou aqui, usuário não foi encontrado em nenhuma tabela
      toast({ 
        variant: "destructive", 
        title: "Perfil não encontrado", 
        description: "Conta sem perfil associado. Contate o suporte." 
      });
      
      // Fazer logout por segurança
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUserType(null);
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      toast({ variant: "destructive", title: "Erro", description: errorMessage });
      return false;
    }
  };

  const signup = async (email: string, password: string, userData: any): Promise<boolean> => {
    try {
      // Validate input using Zod schemas
      const validationResult = signupSchema.safeParse({
        email,
        password,
        confirmPassword: password, // For validation only
        nome: userData.nome,
        type: userData.type
      });

      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast({ variant: "destructive", title: "Erro", description: firstError.message });
        return false;
      }

      // Log security event
      await supabase.rpc('log_security_event', {
        event_type: 'signup_attempt',
        details: { email: validationResult.data.email, type: userData.type }
      });

      const { data, error } = await supabase.auth.signUp({
        email: validationResult.data.email,
        password: validationResult.data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: { user_type: userData.type, name: userData.nome }
        }
      });

      if (error) {
        toast({ variant: "destructive", title: "Erro no cadastro", description: error.message });
        await supabase.rpc('log_security_event', {
          event_type: 'signup_failed',
          details: { email: validationResult.data.email, error: error.message }
        });
        return false;
      }

      if (data.user) {
        const userId = data.user.id;
        
        // Corrigir mapeamento de tipos: 'store' -> 'company'
        const tabela = userData.type === 'technician' ? 'tecnicos' : 
                     (userData.type === 'company' || userData.type === 'store') ? 'lojas' : 
                     'clientes';
        
        // Filtrar apenas campos relevantes para evitar erro de inserção
        const { password: _, confirmPassword: __, acceptTerms: ___, ...cleanUserData } = userData;
        const payload = { id: userId, ...cleanUserData };

        const { error: insertError } = await supabase.from(tabela as any).insert(payload);
        if (insertError) {
          toast({ variant: "destructive", title: "Erro ao salvar dados", description: insertError.message });
          return false;
        }

        await supabase.rpc('log_security_event', {
          event_type: 'signup_success',
          details: { email: data.user.email, type: userData.type }
        });

        toast({ title: "Conta criada com sucesso", description: "Verifique seu email para ativar a conta." });
        return true;
      }

      return false;
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro inesperado", description: error.message });
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserType(null);
    setIsAuthenticated(false);
    toast({ title: "Logout realizado", description: "Até logo!" });
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const id = session.user.id;
        const tipos = [
          { tabela: 'clientes', tipo: 'customer' },
          { tabela: 'tecnicos', tipo: 'technician' },
          { tabela: 'lojas', tipo: 'company' },
          { tabela: 'admins', tipo: 'admin' },
        ];

        for (const { tabela, tipo } of tipos) {
          const { data: resultado, error } = await supabase.from(tabela as any).select('*').eq('id', id).maybeSingle();
          
          if (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Failed to check ${tabela} in auth state change:`, error);
            }
            continue;
          }
          
          if (resultado) {
            setUserType(tipo as UserType);
            setIsAuthenticated(true);
            setUser({ ...session.user, ...(resultado as any) });
            break;
          }
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserType(null);
      }

      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, user, session, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
