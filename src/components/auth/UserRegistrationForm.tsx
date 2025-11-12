import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import { Eye, EyeOff, User, Mail, Lock, Building, Calendar, Briefcase, Loader2, CheckCircle, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Schema simplificado para o primeiro passo do cadastro
const registrationSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  password: z.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

type UserType = 'client' | 'technician' | 'store';

interface UserRegistrationFormProps {
  userType: UserType;
  onSuccess: () => void;
  onBack: () => void;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({ 
  userType, 
  onSuccess, 
  onBack 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup } = useAuth();

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      nome: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });


  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const userData = {
        nome: data.nome,
        email: data.email,
        type: userType === 'client' ? 'customer' : userType === 'store' ? 'company' : userType,
      };

      const result = await signup(data.email, data.password, userData);

      if (result.success) {
        toast({
          title: "Conta criada com sucesso!",
          description: result.requiresConfirmation
            ? "Verifique seu email para confirmar a conta."
            : "Redirecionando para seu dashboard...",
        });

        // O AuthContext irá redirecionar automaticamente após o signup
        console.log('📝 Cadastro concluído, aguardando redirecionamento automático...');
      }
      
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      
      let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
      
      if (error?.message?.includes('already registered')) {
        errorMessage = "Este email já está cadastrado. Tente fazer login.";
      } else if (error?.message?.includes('invalid email')) {
        errorMessage = "Email inválido. Verifique o endereço digitado.";
      } else if (error?.message?.includes('weak password')) {
        errorMessage = "Senha muito fraca. Use pelo menos 8 caracteres com letras e números.";
      }
      
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTypeInfo = () => {
    switch (userType) {
      case 'client':
        return {
          title: 'Cadastro de Cliente',
          description: 'Encontre técnicos especializados para seus equipamentos',
          icon: User,
          color: 'from-blue-600 to-blue-700'
        };
      case 'technician':
        return {
          title: 'Cadastro de Técnico',
          description: 'Ofereça seus serviços técnicos especializados',
          icon: Briefcase,
          color: 'from-yellow-500 to-yellow-600'
        };
      case 'store':
        return {
          title: 'Cadastro de Lojista',
          description: 'Venda produtos e equipamentos na plataforma',
          icon: Building,
          color: 'from-purple-600 to-purple-700'
        };
    }
  };

  const typeInfo = getUserTypeInfo();
  const IconComponent = typeInfo.icon;

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-xl">
        <CardHeader className="text-center pb-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="self-start mb-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${typeInfo.color} rounded-full flex items-center justify-center`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          
          <CardTitle className="text-2xl font-bold">{typeInfo.title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            Preencha os dados básicos para criar sua conta
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Login */}
          <div className="space-y-4">
            <GoogleLoginButton />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">ou continue com email</span>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Nome Completo */}
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nome Completo *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="seu@email.com" 
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
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Senha *
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Sua senha segura"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirmar Senha */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha *</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirme sua senha"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isLoading}
                className={`w-full bg-gradient-to-r ${typeInfo.color} text-white font-semibold py-3 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  'Criar Conta'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRegistrationForm;