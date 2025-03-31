
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

type UserType = 'technician' | 'customer' | 'admin' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userType: UserType;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userType: null,
  user: null,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário está logado ao carregar a aplicação
    const storedUser = localStorage.getItem('techSupportUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setUserType(userData.type);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('techSupportUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simular verificação de credenciais (em produção, isso seria uma chamada de API)
      // Dados mockados para simulação:
      const mockUsers = [
        { id: 1, name: 'Técnico Demo', email: 'tecnico@exemplo.com', password: '123456', type: 'technician' },
        { id: 2, name: 'Cliente Demo', email: 'cliente@exemplo.com', password: '123456', type: 'customer' },
        { id: 3, name: 'Admin Demo', email: 'admin@exemplo.com', password: '123456', type: 'admin' },
      ];

      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        // Simular um pequeno atraso para dar feedback visual
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remover senha antes de armazenar
        const { password: _, ...userWithoutPassword } = foundUser;
        
        // Armazenar dados do usuário
        setUser(userWithoutPassword);
        setUserType(foundUser.type as UserType);
        setIsAuthenticated(true);
        
        // Persistir dados de autenticação
        localStorage.setItem('techSupportUser', JSON.stringify(userWithoutPassword));
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo, ${foundUser.name}!`,
        });
        
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Falha na autenticação",
          description: "Email ou senha incorretos.",
        });
        return false;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Ocorreu um erro durante o login. Tente novamente.",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    localStorage.removeItem('techSupportUser');
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta.",
    });
  };

  if (isLoading) {
    return null; // ou um componente de carregamento
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
