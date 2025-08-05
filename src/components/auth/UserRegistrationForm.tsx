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

// Schema base para todos os tipos de usuário
const baseSchema = {
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  cpf: z.string().min(11, "CPF deve ter 11 dígitos"),
  password: z.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número"),
  confirmPassword: z.string(),
};

// Schemas específicos por tipo
const clientSchema = z.object({
  ...baseSchema,
  dataNascimento: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

const technicianSchema = z.object({
  ...baseSchema,
  especialidade: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

const storeSchema = z.object({
  ...baseSchema,
  nomeEmpresa: z.string().min(2, "Nome da empresa é obrigatório"),
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
  const [cpfValidation, setCpfValidation] = useState({
    isValidating: false,
    isValid: null as boolean | null,
    message: '',
    validated: false
  });

  const { signup } = useAuth();

  // Selecionar schema baseado no tipo
  const getSchema = () => {
    switch (userType) {
      case 'client':
        return clientSchema;
      case 'technician':
        return technicianSchema;
      case 'store':
        return storeSchema;
      default:
        return clientSchema;
    }
  };

  const form = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      nome: '',
      email: '',
      cpf: '',
      password: '',
      confirmPassword: '',
      ...(userType === 'client' && { dataNascimento: '' }),
      ...(userType === 'technician' && { especialidade: '' }),
      ...(userType === 'store' && { nomeEmpresa: '' }),
    },
  });

  const formatCpf = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const validateCpf = async (cpf: string, nome: string, dataNascimento?: string) => {
    if (!cpf || !nome || (userType === 'client' && !dataNascimento)) {
      return;
    }

    setCpfValidation({ isValidating: true, isValid: null, message: '', validated: false });

    try {
      const { data, error } = await supabase.functions.invoke('validate-cpf', {
        body: {
          cpf: cpf.replace(/\D/g, ''),
          nome: nome,
          data_nascimento: dataNascimento || ''
        }
      });

      if (error) {
        setCpfValidation({
          isValidating: false,
          isValid: false,
          message: 'Erro ao validar CPF. Tente novamente.',
          validated: false
        });
        return;
      }

      setCpfValidation({
        isValidating: false,
        isValid: data.valid,
        message: data.message || (data.valid ? 'CPF validado com sucesso!' : 'CPF não validado'),
        validated: true
      });

      if (data.valid) {
        toast({
          title: "CPF Validado!",
          description: "Os dados conferem com a Receita Federal.",
        });
      } else if (!data.limitReached) {
        toast({
          title: "CPF não validado",
          description: data.message || "Nome não confere com o CPF informado.",
          variant: "destructive"
        });
      }

    } catch (error) {
      setCpfValidation({
        isValidating: false,
        isValid: false,
        message: 'Erro ao conectar com o serviço de validação.',
        validated: false
      });
    }
  };

  const onSubmit = async (data: any) => {
    // Verificar validação do CPF para clientes
    if (userType === 'client' && !cpfValidation.isValid) {
      toast({
        title: "CPF não validado",
        description: "Por favor, valide seu CPF antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        nome: data.nome,
        email: data.email,
        cpf_cnpj: data.cpf.replace(/\D/g, ''),
        type: userType === 'client' ? 'customer' : userType === 'store' ? 'company' : userType,
        ...(userType === 'client' && { 
          data_nascimento: data.dataNascimento,
          cpf_validated: cpfValidation.isValid 
        }),
        ...(userType === 'technician' && { especialidade: data.especialidade }),
        ...(userType === 'store' && { nome_empresa: data.nomeEmpresa }),
      };

      const success = await signup(data.email, data.password, userData);
      
      if (success) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Você será redirecionado para fazer login.",
        });
        onSuccess();
      }
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
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
            {typeInfo.description}
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

              {/* CPF */}
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF *</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="000.000.000-00"
                          value={formatCpf(field.value)}
                          onChange={(e) => {
                            const formatted = formatCpf(e.target.value);
                            field.onChange(formatted);
                            setCpfValidation({ isValidating: false, isValid: null, message: '', validated: false });
                          }}
                          className={`${cpfValidation.isValid === true ? 'border-green-500' : cpfValidation.isValid === false ? 'border-red-500' : ''}`}
                        />
                      </FormControl>
                      {cpfValidation.isValidating && (
                        <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />
                      )}
                      {cpfValidation.isValid === true && (
                        <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                      )}
                    </div>
                    {cpfValidation.message && (
                      <p className={`text-sm ${cpfValidation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                        {cpfValidation.message}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo específico por tipo de usuário */}
              {userType === 'client' && (
                <FormField
                  control={form.control}
                  name="dataNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Data de Nascimento (opcional)
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {userType === 'technician' && (
                <FormField
                  control={form.control}
                  name="especialidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Área de Especialidade (opcional)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Ar condicionado, Refrigeração..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {userType === 'store' && (
                <FormField
                  control={form.control}
                  name="nomeEmpresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Nome da Empresa *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da sua empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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

              {/* Validar CPF para clientes */}
              {userType === 'client' && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const cpf = form.getValues('cpf');
                    const nome = form.getValues('nome');
                    const dataNascimento = form.getValues('dataNascimento');
                    validateCpf(cpf, nome, dataNascimento);
                  }}
                  disabled={cpfValidation.isValidating}
                >
                  {cpfValidation.isValidating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Validar CPF na Receita Federal
                </Button>
              )}

              {/* Botão de cadastro */}
              <Button
                type="submit"
                className={`w-full bg-gradient-to-r ${typeInfo.color} hover:opacity-90 text-white font-semibold`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Criar Conta
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRegistrationForm;