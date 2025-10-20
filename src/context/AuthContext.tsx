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
      toast({ variant: "destructive", title: "Erro de validação", description: validationResult.error.errors[0].message });
      return false;
    }

    console.log('🔐 Tentando login para:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('❌ Erro no login:', error);
      
      // Mensagens de erro mais específicas
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos. Verifique suas credenciais.';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.';
      }
      
      toast({ variant: "destructive", title: "Falha no login", description: errorMessage });
      return false;
    }

    if (data?.user && data?.session) {
      console.log('✅ Login bem-sucedido:', data.user.id);
      
      // Atualizar estados imediatamente
      setUser(data.user);
      setSession(data.session);
      setIsAuthenticated(true);

      // Verificar tipo de usuário
      const userType = await checkUserTypeInTables(data.user.id);
      setUserType(userType);
      console.log('👤 Tipo de usuário:', userType);

      if (userType) {
        const redirectPaths = {
          customer: '/cliente/dashboard',
          technician: '/tecnico/dashboard',
          company: '/loja/dashboard',
          admin: '/admin/dashboard'
        };
        
        console.log('🚀 Redirecionando para:', redirectPaths[userType]);
        
        toast({ 
          title: "Login realizado com sucesso!", 
          description: `Bem-vindo de volta! Redirecionando para seu painel...` 
        });

        return true;
      } else {
        toast({ variant: "destructive", title: "Erro", description: "Perfil de usuário não encontrado. Entre em contato com o suporte." });
        await supabase.auth.signOut();
        return false;
      }
    }

    return false;
  };

  // Função para verificar tipo de usuário com prioridade nas tabelas específicas
  const checkUserTypeInTables = async (userId: string): Promise<UserType> => {
    console.log('🔍 Identificando tipo de usuário para:', userId);
    try {
      // 1) Priorizar fontes inequívocas (evita classificações incorretas)
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

      // 2) Tentar via RPC (reflete usuarios.tipo_usuario)
      const { data: rpcType } = await supabase.rpc('get_current_user_type');
      if (rpcType) {
        const t = (rpcType as string).toLowerCase();
        if (t === 'cliente') return 'customer';
        if (t === 'tecnico') return 'technician';
        if (t === 'loja' || t === 'empresa' || t === 'company') return 'company';
        if (t === 'admin') return 'admin';
      }

      // 3) Fallback: ler diretamente de usuarios
      const { data: usuario } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('id', userId)
        .maybeSingle();
      if (usuario?.tipo_usuario) {
        const t = (usuario.tipo_usuario as string).toLowerCase();
        if (t === 'cliente') return 'customer';
        if (t === 'tecnico') return 'technician';
        if (t === 'loja' || t === 'empresa' || t === 'company') return 'company';
        if (t === 'admin') return 'admin';
      }

      console.log('❌ Tipo não identificado');
      return null;
    } catch (e) {
      console.error('💥 Erro ao identificar tipo de usuário:', e);
      return null;
    }
  };
  const signup = async (email: string, password: string, userData: any): Promise<boolean> => {
    // First validate with enhanced security checks
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

    // Additional server-side validation for enhanced security
    try {
      const { data: securityCheck, error: securityError } = await supabase.rpc('secure_user_registration', {
        p_email: email,
        p_password: password,
        p_user_type: userData.type,
        p_user_data: userData
      });

      if (securityError || !(securityCheck as any)?.success) {
        toast({ variant: "destructive", title: "Erro de Segurança", description: securityError?.message || "Falha na validação de segurança" });
        return false;
      }
    } catch (securityError: any) {
      console.error('Security validation failed:', securityError);
      toast({ variant: "destructive", title: "Erro de Segurança", description: securityError.message || "Falha na validação de segurança" });
      return false;
    }

    console.log('🔐 Iniciando signup com validação de segurança aprovada...', { email, userType: userData.type });
    
    // 1. Primeiro, criar conta no Supabase Auth com validação de email
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login?confirmed=true`,
        data: { 
          user_type: userData.type, 
          name: userData.nome,
          ...userData 
        },
      },
    });

    console.log('🔐 Resultado do signUp:', { data: data?.user?.id, error });

    if (error || !data.user) {
      console.error('❌ Erro no signUp:', error);
      toast({ variant: "destructive", title: "Erro no cadastro", description: error?.message || "Erro desconhecido" });
      return false;
    }

    // Check if email confirmation is required
    if (!data.session && data.user && !data.user.email_confirmed_at) {
      console.log('📧 Email de confirmação enviado');
      toast({ 
        title: "Cadastro realizado com sucesso!", 
        description: "Verifique seu email e clique no link de confirmação antes de fazer login. Você será redirecionado para a página de login.",
        variant: "default"
      });
      
      setTimeout(() => {
        window.location.href = "/login?message=confirm_email";
      }, 2000);
      return true;
    }

    // If user is immediately confirmed (email confirmation disabled), proceed normally
    const userId = data.user.id;
    console.log('✅ Conta criada no Auth (confirmação automática)');

    // The trigger will automatically create the profile, but let's verify
    try {
      // Call the secure profile creation function
      const { data: profileResult, error: profileError } = await supabase.rpc('create_user_profile', {
        p_user_type: userData.type,
        p_user_data: userData
      });

      if (profileError || !(profileResult as any)?.success) {
        console.warn('⚠️ Profile creation may have failed, but continuing...', profileError);
      }
    } catch (profileError) {
      console.warn('⚠️ Profile creation error (may be handled by trigger):', profileError);
    }

    // If we have a session, the user is automatically logged in
    if (data.session) {
      setUser(data.user);
      setSession(data.session);
      setIsAuthenticated(true);
      
      // Verificar tipo de usuário e redirecionar
      const userType = await checkUserTypeInTables(data.user.id);
      setUserType(userType);

      if (userType) {
        const redirectPaths = {
          customer: '/cliente/dashboard',
          technician: '/tecnico/dashboard',
          company: '/loja/dashboard',
          admin: '/admin/dashboard'
        };
        
        console.log('✅ Signup com login automático bem-sucedido, redirecionando...', { userType });
        
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
          description: "Conta criada, mas erro ao identificar tipo de usuário. Tente fazer login manualmente." 
        });
      }
    } else {
      // Email confirmation required, redirect to login
      toast({ 
        title: "Cadastro realizado", 
        description: "Verifique seu email para confirmar a conta e fazer login.",
        variant: "default"
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }

    return true;
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
            
            // Check if this is a new Google login with pending user type
            const pendingUserType = sessionStorage.getItem('pending_google_user_type');
            if (pendingUserType && event === 'SIGNED_IN') {
              console.log('🔐 Google login detectado, criando perfil para tipo:', pendingUserType);
              sessionStorage.removeItem('pending_google_user_type');
              
              // Create profile in the appropriate table with correct columns
              const selectedType = pendingUserType as 'customer' | 'technician' | 'company';
              const fullName = session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Usuário';
              let tableName = 'clientes';
              let insertPayload: any = { id: session.user.id, email: session.user.email };

              if (selectedType === 'customer') {
                tableName = 'clientes';
                insertPayload = { ...insertPayload, nome: fullName };
              } else if (selectedType === 'technician') {
                tableName = 'tecnicos';
                insertPayload = { ...insertPayload, nome: fullName };
              } else {
                tableName = 'lojas';
                const contato = fullName;
                const empresa = fullName;
                insertPayload = {
                  ...insertPayload,
                  nome_contato: contato,
                  nome_empresa: empresa
                };
              }

              const { error: insertError } = await supabase
                .from(tableName as any)
                .insert(insertPayload);
              
              if (insertError) {
                console.error('❌ Erro ao criar perfil:', insertError);
              } else {
                console.log('✅ Perfil criado com sucesso');
                // Garantir que o app sabe o tipo imediatamente
                setUserType(selectedType);
              }
            }
            
            const userType = await checkUserTypeInTables(session.user.id);
            setUserType(userType);
            
            if (!userType) {
              console.error('❌ Tipo de usuário não encontrado');
              toast({
                variant: "destructive",
                title: "Erro de Configuração",
                description: "Perfil não encontrado. Por favor, complete seu cadastro.",
              });
              await supabase.auth.signOut();
            } else {
              console.log('✅ Tipo de usuário identificado:', userType);
            }
          } catch (error) {
            console.error('💥 Erro crítico ao buscar dados do usuário:', error);
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
