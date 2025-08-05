import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
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
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useViaCep } from '@/hooks/useViaCep';
import { supabase } from '@/integrations/supabase/client';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import BlurContainer from '@/components/ui/BlurContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import { User, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const clientFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  cep: z.string().min(8, 'CEP deve ter 8 dígitos'),
  street: z.string().min(1, 'Logradouro é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado é obrigatório'),
  complement: z.string().optional(),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

const ClientRegister = () => {
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cpfValidation, setCpfValidation] = useState({
    isValidating: false,
    isValid: null as boolean | null,
    message: '',
    validated: false
  });
  const { fetchAddress, isLoading: cepLoading, error: cepError } = useViaCep();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: '',
      cpf: '',
      birthDate: '',
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formatCpf = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatCep = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const validateCpf = async (cpf: string, nome: string, dataNascimento: string) => {
    if (!cpf || !nome || !dataNascimento) {
      return;
    }

    setCpfValidation({ isValidating: true, isValid: null, message: '', validated: false });

    try {
      const { data, error } = await supabase.functions.invoke('validate-cpf', {
        body: {
          cpf: cpf,
          nome: nome,
          data_nascimento: dataNascimento
        }
      });

      if (error) {
        console.error('Erro na validação do CPF:', error);
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
        message: data.message || (data.valid ? 'CPF validado com sucesso!' : 'CPF não pôde ser validado'),
        validated: true
      });

      if (data.limitReached) {
        toast({
          title: "Limite de consultas atingido",
          description: data.error,
          variant: "destructive"
        });
      } else if (data.valid) {
        toast({
          title: "CPF Validado!",
          description: "Os dados conferem com a Receita Federal.",
          variant: "default"
        });
      } else {
        toast({
          title: "CPF não validado",
          description: data.message || "Nome não confere com o CPF informado.",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('Erro na validação do CPF:', error);
      setCpfValidation({
        isValidating: false,
        isValid: false,
        message: 'Erro ao conectar com o serviço de validação.',
        validated: false
      });
    }
  };

  const handleCepChange = async (value: string) => {
    const cepValue = value.replace(/\D/g, '');
    
    if (cepValue.length === 8) {
      const addressData = await fetchAddress(cepValue);
      if (addressData) {
        form.setValue('street', addressData.street);
        form.setValue('neighborhood', addressData.neighborhood);
        form.setValue('city', addressData.city);
        form.setValue('state', addressData.state);
      }
    }
  };

  const onSubmit = async (data: ClientFormValues) => {
    if (!cpfValidation.isValid) {
      toast({
        title: "CPF não validado",
        description: "Por favor, valide seu CPF na Receita Federal antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = {
        nome: data.name,
        email: data.email,
        telefone: data.phone,
        cpf_cnpj: data.cpf,
        type: 'customer',
        cpf_validated: cpfValidation.isValid
      };

      const success = await signup(data.email, data.password, userData);
      
      if (success) {
        toast({
          title: "Cadastro realizado!",
          description: "Bem-vindo à plataforma. Faça login para continuar.",
        });
        navigate('/login');
      } else {
        toast({ 
          variant: "destructive", 
          title: "Erro no cadastro", 
          description: "Verifique os dados e tente novamente." 
        });
      }
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast({ 
        variant: "destructive", 
        title: "Erro no cadastro", 
        description: "Ocorreu um erro inesperado. Tente novamente." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta!",
        });
        navigate('/customer/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: "Email ou senha incorretos.",
        });
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <User className="h-12 w-12 mx-auto text-primary mb-2" />
            <h1 className="text-3xl font-bold">Portal do Cliente</h1>
            <p className="text-muted-foreground mt-2">
              Cadastre-se ou acesse sua conta para gerenciar seus serviços na plataforma
            </p>
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="register">Novo Cadastro</TabsTrigger>
                <TabsTrigger value="login">Já tem conta</TabsTrigger>
              </TabsList>
              
              <TabsContent value="register">
                <div className="space-y-4">
                  {/* Google Login Section */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Cadastro Rápido</h4>
                    <GoogleLoginButton />
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-50 text-gray-500">ou cadastre-se com email</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-2">
                    <h2 className="text-xl font-semibold flex items-center">
                      <User className="mr-2 h-5 w-5" /> 
                      Dados Pessoais
                    </h2>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu nome completo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cpf"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CPF</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="000.000.000-00" 
                                  {...field}
                                  onChange={(e) => {
                                    const formatted = formatCpf(e.target.value);
                                    field.onChange(formatted);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* CPF Validation Button and Status */}
                      <div className="space-y-3">
                        <Button
                          type="button"
                          onClick={() => {
                            const cpf = form.getValues('cpf');
                            const name = form.getValues('name');
                            const birthDate = form.getValues('birthDate');
                            
                            if (cpf && name && birthDate) {
                              validateCpf(cpf, name, birthDate);
                            } else {
                              toast({
                                title: "Campos obrigatórios",
                                description: "Preencha nome, CPF e data de nascimento.",
                                variant: "destructive"
                              });
                            }
                          }}
                          disabled={cpfValidation.isValidating}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {cpfValidation.isValidating ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Validando CPF...
                            </>
                          ) : (
                            'Validar CPF na Receita Federal'
                          )}
                        </Button>
                        
                        {cpfValidation.validated && (
                          <div className={`p-3 rounded-lg border-l-4 ${
                            cpfValidation.isValid 
                              ? 'bg-green-50 border-green-400 text-green-700' 
                              : 'bg-red-50 border-red-400 text-red-700'
                          }`}>
                            <div className="flex items-center">
                              {cpfValidation.isValid ? (
                                <CheckCircle className="h-5 w-5 mr-2" />
                              ) : (
                                <div className="h-5 w-5 mr-2 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">!</div>
                              )}
                              <span className="font-medium">{cpfValidation.message}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="border-b pb-2 pt-4">
                        <h2 className="text-xl font-semibold flex items-center">
                          <MapPin className="mr-2 h-5 w-5" />
                          Endereço
                        </h2>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-6">
                        <FormField
                          control={form.control}
                          name="cep"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CEP</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="00000-000" 
                                  {...field}
                                  onChange={(e) => {
                                    const formatted = formatCep(e.target.value);
                                    field.onChange(formatted);
                                    handleCepChange(e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                              {cepLoading && <p className="text-xs text-blue-600">Buscando endereço...</p>}
                              {cepError && <p className="text-xs text-red-600">{cepError}</p>}
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Logradouro</FormLabel>
                              <FormControl>
                                <Input placeholder="Rua, número, complemento" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="neighborhood"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bairro</FormLabel>
                              <FormControl>
                                <Input placeholder="Centro" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input placeholder="São Paulo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <FormControl>
                                <Input placeholder="SP" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Complemento (opcional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Apartamento 12B" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <Input placeholder="(11) 98765-4321" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="seu@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Senha</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmar Senha</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading || !cpfValidation.isValid}
                      >
                        {isLoading ? 'Cadastrando...' : 'Criar Conta'}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>
              
              <TabsContent value="login">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">Bem-vindo de volta!</h2>
                    <p className="text-muted-foreground">Faça login para acessar sua conta</p>
                  </div>
                  
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Entrando...' : 'Entrar'}
                      </Button>
                    </form>
                  </Form>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-card text-gray-500">ou</span>
                    </div>
                  </div>
                  
                  <GoogleLoginButton />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClientRegister;