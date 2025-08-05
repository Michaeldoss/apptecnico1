import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { loginSchema, signupSchema, createRateLimiter } from '@/lib/validation';
import type { User, Session } from '@supabase/supabase-js';

export type UserType = 'technician' | 'customer' | 'admin' | 'company' | null;

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

  const login = async (email: string, password: string): Promise<boolean> => {
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      toast({ variant: "destructive", title: "Erro", description: validationResult.error.errors[0].message });
      return false;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({ variant: "destructive", title: "Falha no login", description: error.message });
      return false;
    }

    if (data?.user) {
      setUser(data.user);
      setIsAuthenticated(true);
      setSession(data.session);

      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('id', data.user.id)
        .single();

      if (userData && !userError) {
        const tipoMap: Record<string, UserType> = {
          cliente: 'customer',
          tecnico: 'technician',
          company: 'company',
          admin: 'admin',
        };
        setUserType(tipoMap[userData.tipo_usuario]);
      } else {
        setUserType(null);
        toast({ variant: "destructive", title: "Erro", description: "Tipo de usuário não identificado" });
      }

      toast({ title: "Login realizado", description: "Bem-vindo de volta!" });
      return true;
    }

    return false;
  };

  const signup = async (email: string, password: string, userData: any): Promise<boolean> => {
    const validationResult = signupSchema.safeParse({
      email,
      password,
      confirmPassword: password,
      nome: userData.nome,
      type: userData.type,
    });

    if (!validationResult.success) {
      toast({ variant: "destructive", title: "Erro", description: validationResult.error.errors[0].message });
      return false;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { user_type: userData.type, name: userData.nome },
      },
    });

    if (error || !data.user) {
      toast({ variant: "destructive", title: "Erro no cadastro", description: error?.message || "Erro desconhecido" });
      return false;
    }

    const userId = data.user.id;
    const tabela = userData.type === 'technician' ? 'tecnicos' : userData.type === 'company' ? 'lojas' : 'clientes';

    const { password: _, confirmPassword: __, ...cleanUserData } = userData;

    const { error: insertError } = await supabase.from(tabela as any).insert({ id: userId, ...cleanUserData });

    if (insertError) {
      toast({ variant: "destructive", title: "Erro ao salvar dados", description: insertError.message });
      return false;
    }

    // Automaticamente faz login após o cadastro
    try {
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError || !loginData.user) {
        toast({ variant: "destructive", title: "Erro no login automático", description: "Conta criada, mas erro no login. Tente fazer login manualmente." });
        return false;
      }

      // Atualizar estados locais
      setUser(loginData.user);
      setSession(loginData.session);
      setIsAuthenticated(true);
      
      // Buscar tipo de usuário
      const { data: userTypeData } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('id', loginData.user.id)
        .single();

      if (userTypeData) {
        const tipoMap: Record<string, UserType> = {
          cliente: 'customer',
          tecnico: 'technician',
          company: 'company',
          admin: 'admin',
        };
        setUserType(tipoMap[userTypeData.tipo_usuario]);
      }

      return true;
    } catch (loginError) {
      console.error('Erro no login automático:', loginError);
      toast({ variant: "destructive", title: "Erro no login automático", description: "Conta criada, mas erro no login. Tente fazer login manualmente." });
      return false;
    }
  };

  const logout = async () => {
    console.log('🚪 Iniciando logout completo...');
    
    try {
      // 1. Primeiro limpar estados locais IMEDIATAMENTE
      setUser(null);
      setSession(null);
      setUserType(null);
      setIsAuthenticated(false);
      console.log('✅ Estados locais limpos');
      
      // 2. Limpar TODOS os dados do navegador
      localStorage.clear();
      sessionStorage.clear();
      console.log('✅ Storage local limpo');
      
      // 3. Tentar fazer signOut do Supabase (pode falhar, mas não importa)
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.warn('⚠️ Aviso no signOut do Supabase:', error.message);
        } else {
          console.log('✅ SignOut do Supabase realizado');
        }
      } catch (supabaseError) {
        console.warn('⚠️ Erro no signOut do Supabase (ignorado):', supabaseError);
      }
      
      console.log('🎉 Logout completo concluído');
      
      toast({ 
        title: "Logout realizado", 
        description: "Sessão encerrada com sucesso!" 
      });
      
      // 4. Force refresh para garantir estado limpo
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      
    } catch (error) {
      console.error('💥 Erro crítico no logout:', error);
      
      // Mesmo com erro, forçar limpeza
      setUser(null);
      setSession(null);
      setUserType(null);
      setIsAuthenticated(false);
      localStorage.clear();
      sessionStorage.clear();
      
      toast({ 
        title: "Logout forçado", 
        description: "Sessão encerrada (com limpeza forçada)." 
      });
      
      // Force refresh mesmo com erro
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };

  // Função para resetar completamente o estado de autenticação
  const hardReset = async () => {
    console.log('🔄 Executando hard reset do sistema de autenticação...');
    
    // Limpar todos os estados
    setUser(null);
    setSession(null);
    setUserType(null);
    setIsAuthenticated(false);
    
    // Limpar storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Tentar fazer signOut do Supabase
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.warn('Erro no signOut durante hard reset:', error);
    }
    
    console.log('✅ Hard reset concluído');
  };

  useEffect(() => {
    // Executar hard reset na inicialização se necessário
    const shouldReset = localStorage.getItem('force_auth_reset');
    if (shouldReset) {
      console.log('🚨 Force reset detectado, executando...');
      localStorage.removeItem('force_auth_reset');
      hardReset();
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state change:', event, session?.user?.email);
      
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        setUserType(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);

      if (session?.user) {
        // Defer database call to prevent blocking auth state
        setTimeout(async () => {
          try {
            const { data: userData, error } = await supabase
              .from('usuarios')
              .select('tipo_usuario')
              .eq('id', session.user.id)
              .maybeSingle();

            if (error || !userData) {
              console.error('Erro ao buscar tipo de usuário:', error);
              setUserType(null);
            } else {
              const tipoMap: Record<string, UserType> = {
                cliente: 'customer',
                tecnico: 'technician',
                company: 'company',
                admin: 'admin',
              };
              setUserType(tipoMap[userData.tipo_usuario] || null);
            }
          } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            setUserType(null);
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
