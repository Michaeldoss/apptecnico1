
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
import { supabase } from '@/lib/supabaseClient';


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, userType, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  console.log('Login - Componente renderizado');
  console.log('Login - isAuthenticated:', isAuthenticated);
  console.log('Login - userType:', userType);
  console.log('Login - authLoading:', authLoading);

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (!authLoading && isAuthenticated && userType) {
      console.log('Login - Usuário já autenticado, redirecionando...');
      
      switch (userType) {
        case 'technician':
          console.log('Login - Redirecionando para dashboard do técnico');
          navigate('/tecnico/dashboard', { replace: true });
          break;
        case 'customer':
          console.log('Login - Redirecionando para painel do cliente');
          navigate('/cliente/dashboard', { replace: true });
          break;
        case 'company':
          console.log('Login - Redirecionando para dashboard da empresa');
          navigate('/loja/dashboard', { replace: true });
          break;
        case 'admin':
          console.log('Login - Redirecionando para admin');
          navigate('/admin/dashboard', { replace: true });
          break;
        default:
          console.log('Login - Tipo de usuário desconhecido, redirecionando para home');
          navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, userType, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login - Tentativa de login para:', email);
    
    if (!email || !password) {
      console.log('Login - Email ou senha vazios');
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha email e senha para continuar.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Login - Iniciando processo de login');
      const success = await login(email, password);
      
      if (success) {
        console.log('Login - Login bem-sucedido');
        toast({
          title: "Login realizado",
          description: "Bem-vindo! Redirecionando...",
        });
        // Resetar loading mesmo em caso de sucesso para evitar travamento
        setIsLoading(false);
        // O redirecionamento será feito pelo useEffect após o estado ser atualizado
      } else {
        console.log('Login - Login falhou');
        toast({
          variant: "destructive",
          title: "Falha no login",
          description: "Email ou senha incorretos. Verifique e tente novamente.",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login - Erro durante login:', error);
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="w-full max-w-md">
          <AnimatedContainer animation="scale" className="text-center mb-8">
            <h1 className="text-3xl font-bold">Bem-vindo de Volta</h1>
            <p className="text-muted-foreground mt-2">Entre na sua conta</p>
          </AnimatedContainer>
          
          <BlurContainer style={{ padding: '2rem' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Login com Google primeiro */}
              <div className="space-y-4">
                <GoogleLoginButton />
              </div>
              
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative px-4 bg-card text-sm">Ou continue com email</div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="nome@exemplo.com" 
                    required 
                    className="w-full rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="w-full rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                className="w-full rounded-lg"
                style={{
                  backgroundColor: '#EAB308',
                  color: '#111827',
                  fontWeight: 'bold',
                  border: 'none'
                }}
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

            {/* Debug: Credenciais disponíveis */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800 mb-2">✅ Credencial disponível para teste:</p>
              <div className="text-xs text-green-700">
                <p><strong>Email:</strong> dossgroupequipa@gmail.com</p>
                <p><strong>Senha:</strong> qualquer senha (teste)</p>
                <Button 
                  onClick={() => {
                    setEmail('dossgroupequipa@gmail.com');
                    setPassword('123456');
                  }}
                  variant="outline"
                  size="sm"
                  className="mt-2 text-xs border-green-300 text-green-700 hover:bg-green-50"
                >
                  Preencher automaticamente
                </Button>
              </div>
            </div>
          </BlurContainer>
          
          <p className="text-center text-sm mt-6">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
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
