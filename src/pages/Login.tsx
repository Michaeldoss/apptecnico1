
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
          navigate('/admin', { replace: true });
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
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Login - Iniciando processo de login');
      const success = await login(email, password);
      
      if (success) {
        console.log('Login - Login bem-sucedido, redirecionamento será feito pelo useEffect');
        // O redirecionamento será feito pelo useEffect após o estado ser atualizado
      } else {
        console.log('Login - Login falhou');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login - Erro durante login:', error);
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
      
      <main className="flex-grow flex items-center justify-center px-6 py-32">
        <div className="w-full max-w-md">
          <AnimatedContainer animation="scale" className="text-center mb-8">
            <h1 className="text-3xl font-bold">Bem-vindo de Volta</h1>
            <p className="text-muted-foreground mt-2">Entre na sua conta</p>
          </AnimatedContainer>
          
          <BlurContainer className="p-6">
            <form onSubmit={handleLogin} className="space-y-5">
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
                  fontWeight: '600'
                }}
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" style={{ color: '#111827' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </Button>
              
              <div className="relative flex items-center justify-center mt-8 mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative px-4 bg-card text-sm">Ou continue com</div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" type="button" className="rounded-lg" disabled={isLoading}>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
              </div>
            </form>

            {/* Área de teste com credenciais */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Credenciais de teste:</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>Cliente:</strong> cliente@exemplo.com / 123456</p>
                <p><strong style={{ fontWeight: '700' }}>Técnico:</strong> tecnico@exemplo.com / 123456</p>
                <p><strong>Empresa:</strong> loja@exemplo.com / 123456</p>
                <p><strong>Admin:</strong> admin@exemplo.com / 123456</p>
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
