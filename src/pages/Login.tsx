
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
  const { login, isAuthenticated, userType, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Development-only logging
  if (process.env.NODE_ENV === 'development') {
    console.log('Login - Componente renderizado');
    console.log('Login - isAuthenticated:', isAuthenticated);
    console.log('Login - userType:', userType);
    console.log('Login - authLoading:', authLoading);
  }

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
          navigate('/tecnico/dashboard', { replace: true });
          break;
        case 'customer':
          if (process.env.NODE_ENV === 'development') {
            console.log('Login - Redirecionando para painel do cliente');
          }
          navigate('/cliente/dashboard', { replace: true });
          break;
        case 'company':
          if (process.env.NODE_ENV === 'development') {
            console.log('Login - Redirecionando para dashboard da empresa');
          }
          navigate('/loja/dashboard', { replace: true });
          break;
        case 'admin':
          if (process.env.NODE_ENV === 'development') {
            console.log('Login - Redirecionando para admin');
          }
          navigate('/admin/dashboard', { replace: true });
          break;
        default:
          if (process.env.NODE_ENV === 'development') {
            console.log('Login - Tipo de usuário desconhecido, redirecionando para home');
          }
          navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, userType, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Login - Tentativa de login para:', email);
    }
    
    if (!email || !password) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Login - Email ou senha vazios');
      }
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha email e senha para continuar.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Login - Iniciando processo de login');
      }
      const success = await login(email, password);
      
      if (success) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Login - Login bem-sucedido');
        }
        toast({
          title: "Login realizado",
          description: "Bem-vindo! Redirecionando...",
        });
        // Resetar loading mesmo em caso de sucesso para evitar travamento
        setIsLoading(false);
        // O redirecionamento será feito pelo useEffect após o estado ser atualizado
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('Login - Login falhou');
        }
        toast({
          variant: "destructive",
          title: "Falha no login",
          description: "Email ou senha incorretos. Verifique e tente novamente.",
        });
        setIsLoading(false);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Login - Erro durante login:', error);
      }
      toast({
        variant: "destructive",
        title: "Erro de conexão",
        description: "Não foi possível conectar. Verifique sua internet e tente novamente.",
      });
      setIsLoading(false);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <Navbar />
      
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
      
      <main className="flex-grow flex items-center justify-center px-6 relative z-10" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="w-full max-w-md">
          <AnimatedContainer animation="scale" className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Bem-vindo de Volta</h1>
            <p className="text-gray-100 mt-2 drop-shadow-md">Entre na sua conta</p>
          </AnimatedContainer>
          
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-2 border-white/30">
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Login com Google primeiro */}
              <div className="space-y-4">
                <GoogleAuthProvider>
                  <GoogleLoginButton />
                </GoogleAuthProvider>
              </div>
              
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative px-4 bg-white text-sm text-gray-900 font-medium">Ou continue com email</div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 font-semibold">Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="nome@exemplo.com" 
                    required 
                    className="w-full rounded-lg border-2 border-gray-300 focus:border-blue-600 text-gray-900 bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-900 font-semibold">Senha</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-blue-600 hover:underline font-medium"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="w-full rounded-lg border-2 border-gray-300 focus:border-blue-600 text-gray-900 bg-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm text-gray-900">Lembrar de mim</Label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full rounded-xl h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border-0"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg 
                      className="animate-spin -ml-1 mr-2 h-4 w-4" 
                      style={{ color: '#111827' }} 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </div>
          
          <p className="text-center text-sm mt-6 text-white drop-shadow-md">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-yellow-300 font-medium hover:underline hover:text-yellow-200 transition-colors">
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
