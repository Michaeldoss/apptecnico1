import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';
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

  const login = async (email: string, password: string): Promise<boolean> => {
    // Basic input validation
    if (!email || !password) {
      toast({ variant: "destructive", title: "Erro", description: "Email e senha são obrigatórios" });
      return false;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Don't log sensitive error details
      const userFriendlyMessage = error.message.includes('Invalid login credentials') 
        ? 'Email ou senha incorretos'
        : 'Erro ao realizar login';
      toast({ variant: "destructive", title: "Falha no login", description: userFriendlyMessage });
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
      const { data: resultado, error } = await supabase.from(tabela).select('*').eq('id', user.id).maybeSingle();
      
      if (error) {
        console.error(`Erro ao consultar ${tabela}:`, error);
        continue;
      }
      
      if (resultado) {
        setUserType(tipo as UserType);
        setUser({ ...user, ...resultado });
        return true;
      }
    }

    // Se chegou aqui, usuário não foi encontrado em nenhuma tabela
    console.error('Usuário autenticado mas perfil não encontrado em nenhuma tabela');
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
  };

  const signup = async (email: string, password: string, userData: any): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: { user_type: userData.type, name: userData.nome }
        }
      });

      if (error) {
        toast({ variant: "destructive", title: "Erro no cadastro", description: error.message });
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

        const { error: insertError } = await supabase.from(tabela).insert(payload);
        if (insertError) {
          toast({ variant: "destructive", title: "Erro ao salvar dados", description: insertError.message });
          return false;
        }

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
          const { data: resultado, error } = await supabase.from(tabela).select('*').eq('id', id).maybeSingle();
          
          if (error) {
            console.error(`Erro ao consultar ${tabela}:`, error);
            continue;
          }
          
          if (resultado) {
            setUserType(tipo as UserType);
            setIsAuthenticated(true);
            setUser({ ...session.user, ...resultado });
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
