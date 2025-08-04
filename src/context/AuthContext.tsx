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
        emailRedirectTo: `${window.location.origin}/login`,
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

    toast({ title: "Conta criada com sucesso", description: "Verifique seu email para ativar a conta." });
    return true;
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);

      if (session?.user) {
        const { data: userData } = await supabase
          .from('usuarios')
          .select('tipo_usuario')
          .eq('id', session.user.id)
          .single();

        if (userData) {
          const tipoMap: Record<string, UserType> = {
            cliente: 'customer',
            tecnico: 'technician',
            company: 'company',
            admin: 'admin',
          };
          setUserType(tipoMap[userData.tipo_usuario]);
        }
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
