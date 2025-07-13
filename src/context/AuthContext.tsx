import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

type UserType = 'technician' | 'customer' | 'admin' | 'company' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userType: UserType;
  user: any | null;
  login: (email: string, password: string, selectedUserType?: 'customer' | 'technician' | 'company') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  getSession: () => Promise<{ user: any } | null>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userType: null,
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
  getSession: async () => null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn('useAuth deve ser usado dentro de AuthProvider');
    return {
      isAuthenticated: false,
      userType: null,
      user: null,
      login: async () => false,
      logout: () => {},
      isLoading: false,
      getSession: async () => null,
    };
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getSession = async () => {
    console.log('[DEBUG] getSession chamado');
    try {
      const storedUser = localStorage.getItem('techSupportUser');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log('[DEBUG] Sessão encontrada:', userData);
        return { user: userData };
      }
      console.log('[DEBUG] Nenhuma sessão encontrada');
      return null;
    } catch (error) {
      console.error('[DEBUG] Erro ao obter sessão:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('[DEBUG] AuthProvider - Inicializando autenticação');
    
    const initAuth = async () => {
      try {
        const session = await getSession();
        
        if (session?.user) {
          const userData = session.user;
          console.log('[DEBUG] Dados do usuário carregados:', userData);
          
          if (userData && (userData.type || userData.tipo)) {
            setUser(userData);
            setUserType(userData.type as UserType);
            setIsAuthenticated(true);
            console.log('[DEBUG] Estado definido como autenticado');
          } else {
            console.log('[DEBUG] Dados de usuário inválidos');
            localStorage.removeItem('techSupportUser');
          }
        } else {
          console.log('[DEBUG] Nenhum usuário encontrado');
        }
      } catch (error) {
        console.error('[DEBUG] Erro ao carregar dados:', error);
        localStorage.removeItem('techSupportUser');
        setUser(null);
        setUserType(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
        console.log('[DEBUG] Inicialização concluída');
      }
    };

    const timer = setTimeout(initAuth, 50);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string, selectedUserType?: 'customer' | 'technician' | 'company'): Promise<boolean> => {
    console.log('[DEBUG] Iniciando login para:', email);
    
    try {
      // Primeiro, verificar se é um usuário real do banco
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        
        // Buscar usuário no banco de dados
        const { data: userData, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('email', email)
          .eq('ativo', true)
          .single();

        console.log('[DEBUG] Consulta no banco:', { userData, error });

        if (userData && !error) {
          // Usuário encontrado no banco - usar dados reais
          console.log('[DEBUG] Usuário real encontrado:', userData.nome);
          
          const userForSession = {
            id: userData.id,
            name: userData.nome,
            email: userData.email,
            type: userData.tipo_usuario === 'admin' ? 'admin' : 
                  userData.tipo_usuario === 'tecnico' ? 'technician' :
                  userData.tipo_usuario === 'cliente' ? 'customer' : 'company',
            tipo: userData.tipo_usuario,
            isRealUser: true
          };
          
          setUser(userForSession);
          setUserType(userForSession.type as UserType);
          setIsAuthenticated(true);
          
          localStorage.setItem('techSupportUser', JSON.stringify(userForSession));
          
          console.log('[DEBUG] Login do usuário real bem-sucedido');
          
          toast({
            title: "Login realizado com sucesso",
            description: `Bem-vindo, ${userData.nome}!`,
          });
          
          return true;
        }
      } catch (dbError) {
        console.log('[DEBUG] Erro na consulta do banco, continuando com mock:', dbError);
      }

      // Se não encontrou no banco, usar sistema mock
      const mockUsers = [
        { 
          id: 1, 
          name: 'Técnico Demo', 
          email: 'tecnico@exemplo.com', 
          password: '123456', 
          type: 'technician',
          tipo: 'tecnico'
        },
        { 
          id: 2, 
          name: 'Cliente Demo', 
          email: 'cliente@exemplo.com', 
          password: '123456', 
          type: 'customer',
          tipo: 'cliente'
        },
        { 
          id: 3, 
          name: 'Admin Demo', 
          email: 'admin@exemplo.com', 
          password: '123456', 
          type: 'admin',
          tipo: 'admin'
        },
        { 
          id: 4, 
          name: 'Doss Group', 
          email: 'loja@exemplo.com', 
          password: '123456', 
          type: 'company',
          tipo: 'loja',
          description: 'Peças originais e componentes para impressoras industriais.',
          location: 'Rio de Janeiro, RJ',
          logo: '/placeholder.svg',
          rating: 4.8,
          productCount: 87,
          phone: '(21) 99999-9999',
          address: 'Av. Rio Branco, 156 - Centro',
          city: 'Rio de Janeiro',
          state: 'RJ',
          zipCode: '20040-901',
          cnpj: '12345678000190',
          contactName: 'João Silva'
        },
      ];

      // Tratamento especial para login com Google
      if (password === 'google_login') {
        console.log('[DEBUG] Login com Google detectado');
        
        // Buscar se o usuário já existe por email
        let foundUser = mockUsers.find(u => u.email === email);
        
        // Se não existir, criar um novo usuário com o tipo selecionado
        if (!foundUser) {
          const userTypeMap = {
            'customer': 'cliente',
            'technician': 'tecnico', 
            'company': 'loja'
          };
          
          foundUser = {
            id: Date.now(), // ID único baseado no timestamp
            name: email.split('@')[0], // Nome baseado no email
            email: email,
            password: 'google_user',
            type: selectedUserType || 'customer', // Usar tipo selecionado ou padrão
            tipo: userTypeMap[selectedUserType || 'customer']
          };
          console.log('[DEBUG] Novo usuário Google criado:', foundUser.name, 'como', foundUser.type);
        } else {
          // Se o usuário já existe, usar o tipo selecionado se fornecido
          if (selectedUserType) {
            foundUser = { ...foundUser, type: selectedUserType };
            console.log('[DEBUG] Tipo de usuário atualizado para:', selectedUserType);
          }
        }
        
        const { password: _, ...userWithoutPassword } = foundUser;
        
        setUser(userWithoutPassword);
        setUserType(foundUser.type as UserType);
        setIsAuthenticated(true);
        
        localStorage.setItem('techSupportUser', JSON.stringify(userWithoutPassword));
        
        console.log('[DEBUG] Login com Google bem-sucedido');
        return true;
      }

      // Login tradicional com email e senha
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        console.log('[DEBUG] Credenciais inválidas');
        toast({
          variant: "destructive",
          title: "Falha na autenticação",
          description: "Email ou senha incorretos.",
        });
        return false;
      }

      console.log('[DEBUG] Usuário encontrado:', foundUser.name, foundUser.type);

      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      setUserType(foundUser.type as UserType);
      setIsAuthenticated(true);
      
      localStorage.setItem('techSupportUser', JSON.stringify(userWithoutPassword));
      
      console.log('[DEBUG] Login bem-sucedido, estado atualizado');
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${foundUser.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('[DEBUG] Erro no login:', error);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Ocorreu um erro durante o login. Tente novamente.",
      });
      return false;
    }
  };

  const logout = () => {
    console.log('[DEBUG] Fazendo logout');
    
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    localStorage.removeItem('techSupportUser');
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta.",
    });
  };

  console.log('[DEBUG] Estado atual:', { 
    isAuthenticated, 
    userType, 
    user: user?.name || user?.email,
    isLoading 
  });

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userType, 
      user, 
      login, 
      logout, 
      isLoading,
      getSession
    }}>
      {children}
    </AuthContext.Provider>
  );
};
