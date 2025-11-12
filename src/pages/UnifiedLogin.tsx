import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import GoogleAuthProvider from '@/components/auth/GoogleAuthProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Eye, EyeOff, Mail, Lock, Loader2, LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const UnifiedLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, userType, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirecionamento automático quando o usuário estiver autenticado e o userType estiver definido
  useEffect(() => {
    if (isAuthenticated && userType) {
      console.log('🎯 UnifiedLogin - Usuário autenticado, redirecionando...', { userType });
      
      const redirectPaths = {
        customer: '/cliente/dashboard',
        technician: '/tecnico/dashboard', 
        company: '/loja/dashboard',
        admin: '/admin/dashboard'
      };
      
      const targetPath = redirectPaths[userType as keyof typeof redirectPaths];
      if (targetPath) {
        console.log('🚀 Redirecionando para:', targetPath);
        navigate(targetPath, { replace: true });
      }
    }
  }, [isAuthenticated, userType, navigate]);

  // Redirecionamento automático baseado no tipo de usuário
  const redirectToUserDashboard = (userType: string | null) => {
    const redirectPaths = {
      customer: '/cliente/dashboard',
      technician: '/tecnico/dashboard', 
      company: '/loja/dashboard',
      admin: '/admin/dashboard'
    };
    
    if (userType && redirectPaths[userType as keyof typeof redirectPaths]) {
      console.log('🔄 Redirecionamento manual para:', redirectPaths[userType as keyof typeof redirectPaths]);
      navigate(redirectPaths[userType as keyof typeof redirectPaths], { replace: true });
    }
  };

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      console.log('🔐 Tentando fazer login...', data.email);
      const result = await login(data.email, data.password);

      if (result.success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o dashboard...",
        });
        console.log('✅ Login bem-sucedido, aguardando redirecionamento automático...');

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
      console.error('❌ Erro no login:', error);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Email ou senha incorretos. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Faça seu login
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto font-medium">
            Acesse sua conta e continue de onde parou
          </p>
        </div>
      </section>
      
      <main className="flex-grow flex items-center justify-center px-4 py-12 -mt-8 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <LogIn className="h-6 w-6 text-white" />
              </div>
              
              <CardTitle className="text-2xl font-bold text-gray-900">
                Entrar na sua conta
              </CardTitle>
              <CardDescription className="text-gray-600">
                Digite suas credenciais para acessar
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google Login */}
              <div className="space-y-4">
                <GoogleAuthProvider>
                  <GoogleLoginButton />
                </GoogleAuthProvider>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500">ou continue com email</span>
                  </div>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700">
                          <Mail className="h-4 w-4" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="seu@email.com" 
                            className="h-12"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Senha */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700">
                          <Lock className="h-4 w-4" />
                          Senha
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Sua senha"
                              className="h-12 pr-12"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Esqueci a senha */}
                  <div className="text-right">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Esqueci minha senha
                    </Link>
                  </div>

                  {/* Botão de login */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 text-white font-semibold text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <LogIn className="h-5 w-5 mr-2" />
                    )}
                    Entrar
                  </Button>
                </form>
              </Form>

              {/* Link para cadastro */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 mb-4">Ainda não tem uma conta?</p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/register')}
                  className="w-full h-12 font-semibold"
                >
                  Criar nova conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UnifiedLogin;