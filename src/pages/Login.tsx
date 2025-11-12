import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import BlurContainer from '@/components/ui/BlurContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import GoogleAuthProvider from '@/components/auth/GoogleAuthProvider';
import { supabase } from '@/integrations/supabase/client';
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    login,
    isAuthenticated,
    userType,
    isLoading: authLoading
  } = useAuth();
  const navigate = useNavigate();

  // Development-only logging
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Login - Componente renderizado');
    console.log('🔍 Login - isAuthenticated:', isAuthenticated);
    console.log('🔍 Login - userType:', userType);
    console.log('🔍 Login - authLoading:', authLoading);
  }

  // Detectar se há sessão ativa sem login explícito
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      console.log('🚨 SESSÃO ATIVA DETECTADA SEM LOGIN EXPLÍCITO!');
      console.log('🚨 isAuthenticated:', isAuthenticated);
      console.log('🚨 userType:', userType);
      console.log('🚨 Isso indica que há uma sessão persistente que não foi limpa');
    }
  }, [isAuthenticated, userType, authLoading]);

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (!authLoading && isAuthenticated && userType) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Login - Usuário já autenticado, redirecionando...');
      }
      switch (userType) {
        case 'technician':
          if (process.env.NODE_ENV === 'development') {
            console.log('Login - Redirecionando para dashboard do técnico');
          }
          navigate('/tecnico/dashboard', {
            replace: true
          });
          break;
        case 'customer':
          if (process.env.NODE_ENV === 'development') {
            console.log('Login - Redirecionando para painel do cliente');
          }
          navigate('/cliente/dashboard', {
            replace: true
          });
          break;
        case 'company':
          if (process.env.NODE_ENV === 'development') {
            console.log('Login - Redirecionando para dashboard da empresa');
          }
          navigate('/loja/dashboard', {
            replace: true
          });
          break;
        case 'admin':
          if (process.env.NODE_ENV === 'development') {
            console.log('Login - Redirecionando para admin');
          }
          navigate('/admin/dashboard', {
            replace: true
          });
          break;
        default:
          if (process.env.NODE_ENV === 'development') {
            console.log('Login - Tipo de usuário desconhecido, redirecionando para home');
          }
          navigate('/', {
            replace: true
          });
      }
    }
  }, [isAuthenticated, userType, authLoading, navigate]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Login - Iniciando tentativa de login');
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha email e senha para continuar."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await login(email, password);

      if (result.success) {
        console.log('✅ Login realizado com sucesso');
        const redirectPaths = {
          customer: '/cliente/dashboard',
          technician: '/tecnico/dashboard',
          company: '/loja/dashboard',
          admin: '/admin/dashboard'
        } as const;

        const redirectTarget = result.redirectPath || (result.userType ? redirectPaths[result.userType] : null);

        if (redirectTarget) {
          navigate(redirectTarget, { replace: true });
        }
      }
    } catch (error) {
      console.error('💥 Erro no login:', error);
      toast({
        variant: "destructive",
        title: "Erro de conexão",
        description: "Não foi possível conectar. Verifique sua internet e tente novamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo de Volta</h1>
            <p className="text-muted-foreground">Entre na sua conta para continuar</p>
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Login com Google */}
              <div className="space-y-4">
                <GoogleAuthProvider>
                  <GoogleLoginButton />
                </GoogleAuthProvider>
              </div>
              
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative px-4 bg-card text-sm text-muted-foreground">Ou continue com email</div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    required 
                    className="w-full" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    disabled={isLoading} 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="w-full" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    disabled={isLoading} 
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Lembrar de mim</Label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-[#ff6b2c] hover:bg-[#f2551a] text-white rounded-lg shadow-md transition-all duration-200"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </span>
                ) : 'Entrar'}
              </Button>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Login;