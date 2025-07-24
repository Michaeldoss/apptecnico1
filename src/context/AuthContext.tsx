import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erro ao logar:", error.message);
      return false;
    }

    const user = data.user;
    setUser(user);
    setIsAuthenticated(true);

    // Detectar tipo do usuário baseado nas tabelas
    const { data: cliente } = await supabase.from('clientes').select('id').eq('user_id', user.id).single();
    if (cliente) {
      setUserType('customer');
      return true;
    }

    const { data: tecnico } = await supabase.from('tecnicos').select('id').eq('user_id', user.id).single();
    if (tecnico) {
      setUserType('technician');
      return true;
    }

    const { data: loja } = await supabase.from('lojas').select('id').eq('user_id', user.id).single();
    if (loja) {
      setUserType('company');
      return true;
    }

    const { data: admin } = await supabase.from('admins').select('id').eq('user_id', user.id).single();
    if (admin) {
      setUserType('admin');
      return true;
    }

    setUserType(null); // fallback
    return true;
  };
  
  // continue com o restante do contexto...


type UserType = 'technician' | 'customer' | 'admin' | 'company' | null;

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

  // Buscar dados do usuário baseado no tipo
  const fetchUserData = async (userId: string, userTypeToFetch: UserType) => {
    try {
      let userData = null;
      
      switch (userTypeToFetch) {
        case 'customer':
          const { data: clienteData } = await supabase
            .from('clientes')
            .select('*')
            .eq('id', userId)
            .single();
          userData = clienteData;
          break;
          
        case 'technician':
          const { data: tecnicoData } = await supabase
            .from('tecnicos')
            .select('*')
            .eq('id', userId)
            .single();
          userData = tecnicoData;
          break;
          
        case 'company':
          const { data: lojaData } = await supabase
            .from('lojas')
            .select('*')
            .eq('id', userId)
            .single();
          userData = lojaData;
          break;
          
        case 'admin':
          const { data: usuarioData } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', userId)
            .single();
          userData = usuarioData;
          break;
      }
      
      return userData;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  };

  useEffect(() => {
    // Configurar listener de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Descobrir o tipo de usuário baseado no metadata
          const userMetadata = session.user.user_metadata;
          const userTypeFromMetadata = userMetadata?.user_type as UserType;
          
          if (userTypeFromMetadata) {
            setUserType(userTypeFromMetadata);
            setIsAuthenticated(true);
            
            // Buscar dados completos do usuário
            const fullUserData = await fetchUserData(session.user.id, userTypeFromMetadata);
            if (fullUserData) {
              setUser({ ...session.user, ...fullUserData });
            }
          } else {
            // Tentar determinar o tipo consultando as tabelas
            const tables = ['usuarios', 'clientes', 'tecnicos', 'lojas'];
            const types: UserType[] = ['admin', 'customer', 'technician', 'company'];
            
            for (let i = 0; i < tables.length; i++) {
              try {
                const { data, error } = await supabase
                  .from(tables[i] as any)
                  .select('*')
                  .eq('id', session.user.id)
                  .maybeSingle();
                
                if (!error && data) {
                  const detectedType = types[i];
                  console.log(`Usuário detectado como ${detectedType} na tabela ${tables[i]}`);
                  setUserType(detectedType);
                  setIsAuthenticated(true);
                  setUser(Object.assign({}, session.user, data));
                  break;
                }
              } catch (error) {
                console.error(`Erro ao consultar tabela ${tables[i]}:`, error);
                continue; // Tentar próxima tabela
              }
            }
          }
        } else {
          setUserType(null);
          setIsAuthenticated(false);
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Verificar sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Já será processado pelo onAuthStateChange
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erro no login:', error.message);
        toast({
          variant: "destructive",
          title: "Falha na autenticação",
          description: error.message,
        });
        return false;
      }

      if (data.user) {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
        return true;
      }

      return false;
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Ocorreu um erro durante o login. Tente novamente.",
      });
      return false;
    }
  };

  const signup = async (email: string, password: string, userData: any): Promise<boolean> => {
    try {
      // 1. Criar usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            user_type: userData.type,
            name: userData.nome,
          }
        }
      });

      if (error) {
        console.error('Erro no signup:', error.message);
        toast({
          variant: "destructive",
          title: "Erro no cadastro",
          description: error.message,
        });
        return false;
      }

      if (data.user) {
        // 2. Salvar dados específicos na tabela apropriada
        const userId = data.user.id;
        let insertError = null;

        switch (userData.type) {
          case 'customer':
            const { error: clienteError } = await supabase
              .from('clientes')
              .insert({
                id: userId,
                nome: userData.nome,
                email: userData.email,
                telefone: userData.telefone,
                cpf_cnpj: userData.cpf_cnpj,
                cep: userData.cep,
                endereco: userData.endereco,
                numero: userData.numero,
                complemento: userData.complemento,
                bairro: userData.bairro,
                cidade: userData.cidade,
                estado: userData.estado,
              });
            insertError = clienteError;
            break;

          case 'technician':
            const { error: tecnicoError } = await supabase
              .from('tecnicos')
              .insert({
                id: userId,
                nome: userData.nome,
                email: userData.email,
                telefone: userData.telefone,
                cpf_cnpj: userData.cpf_cnpj,
                cep: userData.cep,
                endereco: userData.endereco,
                numero: userData.numero,
                complemento: userData.complemento,
                bairro: userData.bairro,
                cidade: userData.cidade,
                estado: userData.estado,
                especialidades: userData.especialidades || [],
                experiencia_anos: userData.experiencia_anos || 0,
              });
            insertError = tecnicoError;
            break;

          case 'company':
            const { error: lojaError } = await supabase
              .from('lojas')
              .insert({
                id: userId,
                nome_empresa: userData.nome_empresa,
                nome_contato: userData.nome_contato,
                email: userData.email,
                telefone: userData.telefone,
                cnpj: userData.cnpj,
                cep: userData.cep,
                endereco: userData.endereco,
                numero: userData.numero,
                complemento: userData.complemento,
                bairro: userData.bairro,
                cidade: userData.cidade,
                estado: userData.estado,
                descricao: userData.descricao,
              });
            insertError = lojaError;
            break;
        }

        if (insertError) {
          console.error('Erro ao inserir dados específicos:', insertError);
          toast({
            variant: "destructive",
            title: "Erro no cadastro",
            description: "Erro ao salvar dados específicos do usuário.",
          });
          return false;
        }

        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique seu email para confirmar sua conta.",
        });
        return true;
      }

      return false;
    } catch (error: any) {
      console.error('Erro no signup:', error);
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Ocorreu um erro durante o cadastro. Tente novamente.",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      setUser(null);
      setSession(null);
      setUserType(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta.",
      });
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userType, 
      user, 
      session,
      login, 
      signup,
      logout, 
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
