
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

type UserType = 'technician' | 'customer' | 'admin' | 'company' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userType: UserType;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userType: null,
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
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
    };
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider - Inicializando autenticação');
    
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem('techSupportUser');
        console.log('AuthProvider - Dados no localStorage:', storedUser);
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          console.log('AuthProvider - Dados do usuário carregados:', userData);
          
          // Verificação de segurança para dados válidos
          if (userData && (userData.type || userData.tipo)) {
            setUser(userData);
            setUserType(userData.type as UserType);
            setIsAuthenticated(true);
            
            console.log('AuthProvider - Estado definido como autenticado');
          } else {
            console.log('AuthProvider - Dados de usuário inválidos');
            localStorage.removeItem('techSupportUser');
          }
        } else {
          console.log('AuthProvider - Nenhum usuário encontrado');
        }
      } catch (error) {
        console.error('AuthProvider - Erro ao carregar dados:', error);
        localStorage.removeItem('techSupportUser');
        setUser(null);
        setUserType(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
        console.log('AuthProvider - Inicialização concluída');
      }
    };

    const timer = setTimeout(initAuth, 50);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthProvider - Iniciando login para:', email);
    
    try {
      const mockUsers = [
        { 
          id: 1, 
          name: 'Técnico Demo', 
          email: 'tecnico@exemplo.com', 
          password: '123456', 
          type: 'technician',
          tipo: 'tecnico' // Adicionado para compatibilidade
        },
        { 
          id: 2, 
          name: 'Cliente Demo', 
          email: 'cliente@exemplo.com', 
          password: '123456', 
          type: 'customer',
          tipo: 'cliente' // Adicionado para compatibilidade
        },
        { 
          id: 3, 
          name: 'Admin Demo', 
          email: 'admin@exemplo.com', 
          password: '123456', 
          type: 'admin',
          tipo: 'admin' // Adicionado para compatibilidade
        },
        { 
          id: 4, 
          name: 'Doss Group', 
          email: 'loja@exemplo.com', 
          password: '123456', 
          type: 'company',
          tipo: 'loja', // Adicionado para compatibilidade
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

      const foundUser = mockUsers.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        console.log('AuthProvider - Credenciais inválidas');
        toast({
          variant: "destructive",
          title: "Falha na autenticação",
          description: "Email ou senha incorretos.",
        });
        return false;
      }

      console.log('AuthProvider - Usuário encontrado:', foundUser.name, foundUser.type);

      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      setUserType(foundUser.type as UserType);
      setIsAuthenticated(true);
      
      localStorage.setItem('techSupportUser', JSON.stringify(userWithoutPassword));
      
      console.log('AuthProvider - Login bem-sucedido, estado atualizado');
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${foundUser.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('AuthProvider - Erro no login:', error);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Ocorreu um erro durante o login. Tente novamente.",
      });
      return false;
    }
  };

  const logout = () => {
    console.log('AuthProvider - Fazendo logout');
    
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    localStorage.removeItem('techSupportUser');
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta.",
    });
  };

  console.log('AuthProvider - Estado atual:', { 
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
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
