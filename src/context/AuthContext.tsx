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

      // Verificar tipo de usuário de forma sequencial
      const userType = await checkUserTypeInTables(data.user.id);
      setUserType(userType);

      if (userType) {
        const redirectPaths = {
          customer: '/cliente/dashboard',
          technician: '/tecnico/dashboard',
          company: '/loja/dashboard',
          admin: '/admin/dashboard'
        };
        
        toast({ title: "Login realizado", description: "Bem-vindo de volta!" });
        
        setTimeout(() => {
          window.location.href = redirectPaths[userType];
        }, 500);
      } else {
        toast({ variant: "destructive", title: "Erro", description: "Tipo de usuário não identificado" });
      }

      return true;
    }

    return false;
  };

  // Função para verificar tipo de usuário nas tabelas específicas
  const checkUserTypeInTables = async (userId: string): Promise<UserType> => {
    console.log('🔍 Verificando tipo de usuário nas tabelas específicas para:', userId);

    // Verificar se é cliente
    const { data: clienteData } = await supabase
      .from('clientes')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (clienteData) {
      console.log('✅ Usuário encontrado na tabela clientes');
      return 'customer';
    }

    // Verificar se é técnico
    const { data: tecnicoData } = await supabase
      .from('tecnicos')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (tecnicoData) {
      console.log('✅ Usuário encontrado na tabela tecnicos');
      return 'technician';
    }

    // Verificar se é loja
    const { data: lojaData } = await supabase
      .from('lojas')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (lojaData) {
      console.log('✅ Usuário encontrado na tabela lojas');
      return 'company';
    }

    // Verificar se é admin na tabela usuarios
    const { data: usuarioData } = await supabase
      .from('usuarios')
      .select('tipo_usuario')
      .eq('id', userId)
      .maybeSingle();

    if (usuarioData?.tipo_usuario === 'admin') {
      console.log('✅ Usuário encontrado como admin');
      return 'admin';
    }

    console.log('❌ Usuário não encontrado em nenhuma tabela específica');
    return null;
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

    console.log('🔐 Iniciando signup...', { email, userType: userData.type });
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { user_type: userData.type, name: userData.nome },
      },
    });

    console.log('🔐 Resultado do signUp:', { data: data?.user?.id, error });

    if (error || !data.user) {
      console.error('❌ Erro no signUp:', error);
      toast({ variant: "destructive", title: "Erro no cadastro", description: error?.message || "Erro desconhecido" });
      return false;
    }

    const userId = data.user.id;
    const tabela = userData.type === 'technician' ? 'tecnicos' : userData.type === 'company' ? 'lojas' : 'clientes';

    // Mapear campos específicos para cada tipo de usuário
    let cleanUserData: any = {};
    
    if (userData.type === 'company') {
      cleanUserData = {
        id: userId,
        nome_empresa: userData.nome || userData.name || '',
        nome_contato: userData.nome || userData.name || '',
        email: email
      };
    } else {
      cleanUserData = {
        id: userId,
        nome: userData.nome || userData.name || '',
        email: email
      };
    }

    console.log('📝 Inserindo dados na tabela específica...', { tabela, userId, cleanUserData });
    
    const { error: insertError } = await supabase.from(tabela as any).insert(cleanUserData);

    if (insertError) {
      console.error('❌ Erro ao inserir na tabela específica:', insertError);
      toast({ variant: "destructive", title: "Erro ao salvar dados", description: insertError.message });
      return false;
    }

    console.log('✅ Dados inseridos na tabela específica com sucesso');

    // Inserir também na tabela usuarios para controle central
    const usuarioData = {
      id: userId,
      nome: userData.nome || userData.name || '',
      email: email,
      tipo_usuario: userData.type === 'customer' ? 'cliente' : userData.type
    };
    
    console.log('📝 Inserindo dados na tabela usuarios...', usuarioData);
    
    const { error: usuarioError } = await supabase.from('usuarios').insert(usuarioData);

    if (usuarioError) {
      console.error('❌ Erro ao inserir na tabela usuarios:', usuarioError);
      // Não bloquear o fluxo se houver erro na tabela usuarios, pois o principal é a tabela específica
      console.warn('⚠️ Continuando sem inserir na tabela usuarios');
    } else {
      console.log('✅ Dados inseridos na tabela usuarios com sucesso');
    }

    // Automaticamente faz login após o cadastro
    console.log('🔐 Fazendo login automático...');
    
    try {
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('🔐 Resultado do login automático:', { userId: loginData?.user?.id, error: loginError });

      if (loginError || !loginData.user) {
        console.error('❌ Erro no login automático:', loginError);
        toast({ variant: "destructive", title: "Erro no login automático", description: "Conta criada, mas erro no login. Tente fazer login manualmente." });
        return false;
      }

      // Atualizar estados locais
      setUser(loginData.user);
      setSession(loginData.session);
      setIsAuthenticated(true);
      
      // Verificar tipo de usuário usando a nova função
      const userType = await checkUserTypeInTables(loginData.user.id);
      setUserType(userType);

      if (userType) {
        const redirectPaths = {
          customer: '/cliente/dashboard',
          technician: '/tecnico/dashboard',
          company: '/loja/dashboard',
          admin: '/admin/dashboard'
        };
        
        console.log('✅ Signup bem-sucedido, redirecionando para dashboard...', { userType });
        
        toast({ title: "Cadastro realizado", description: "Bem-vindo! Redirecionando para seu dashboard..." });
        
        setTimeout(() => {
          console.log('🚀 Redirecionando para:', redirectPaths[userType]);
          window.location.href = redirectPaths[userType];
        }, 1000);
      } else {
        console.error('❌ Erro ao buscar tipo de usuário após cadastro');
        toast({ 
          variant: "destructive", 
          title: "Erro no redirecionamento", 
          description: "Conta criada, mas erro ao identificar tipo de usuário. Faça login manualmente." 
        });
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
            console.log('🔍 Buscando tipo de usuário para:', session.user.id);
            const userType = await checkUserTypeInTables(session.user.id);
            setUserType(userType);
            
            if (!userType) {
              console.error('❌ Tipo de usuário não encontrado');
            } else {
              console.log('✅ Tipo de usuário identificado:', userType);
            }
          } catch (error) {
            console.error('💥 Erro crítico ao buscar dados do usuário:', error);
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
