import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Wrench, User2, MapPin, Mail, Phone, FileText, Settings } from 'lucide-react';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import GoogleAuthProvider from '@/components/auth/GoogleAuthProvider';

const technicianFormSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "E-mail inválido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  confirmPassword: z.string(),
  phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 dígitos.",
  }),
  cpf: z.string().length(11, {
    message: "CPF deve ter 11 dígitos.",
  }),
  address: z.string().min(5, {
    message: "Endereço deve ter pelo menos 5 caracteres.",
  }),
  city: z.string().min(2, {
    message: "Cidade deve ter pelo menos 2 caracteres.",
  }),
  state: z.string().length(2, {
    message: "Informe a sigla do estado com 2 letras.",
  }),
  zipCode: z.string().min(8, {
    message: "CEP deve ter pelo menos 8 caracteres.",
  }),
  specialties: z.string().min(10, {
    message: "Descreva suas especialidades (mínimo 10 caracteres).",
  }),
  experience: z.string().min(10, {
    message: "Descreva sua experiência (mínimo 10 caracteres).",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().email({
    message: "E-mail inválido.",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
});

type TechnicianFormValues = z.infer<typeof technicianFormSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

const TechnicianRegister = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<TechnicianFormValues>({
    resolver: zodResolver(technicianFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      cpf: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      specialties: "",
      experience: "",
    },
  });
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TechnicianFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Dados do técnico enviados:', data);
      
      // Criar objeto com dados para o signup
      const userData = {
        type: 'technician',
        nome: data.name,
        telefone: data.phone,
        cpf_cnpj: data.cpf,
        endereco: data.address,
        cidade: data.city,
        estado: data.state,
        cep: data.zipCode,
        especialidades: [data.specialties],
        // Converter experiência em anos aproximados (pode ser melhorado)
        experiencia_anos: 1, // placeholder
      };
      
      // Fazer signup real usando o contexto
      const signupResult = await signup(data.email, data.password, userData);

      if (signupResult.success) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: signupResult.requiresConfirmation
            ? "Verifique seu email para ativar a conta."
            : "Bem-vindo! Redirecionando para seu painel...",
        });

        form.reset();

        if (signupResult.redirectPath) {
          navigate(signupResult.redirectPath);
        } else {
          navigate('/login');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erro no cadastro",
          description: "Não foi possível criar a conta. Tente novamente.",
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar técnico:', error);
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao processar o cadastro. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const onLogin = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await login(data.email, data.password);

      if (result.success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta. Você será redirecionado para o painel.",
        });

        if (result.redirectPath) {
          navigate(result.redirectPath, { replace: true });
        } else {
          navigate('/tecnico/painel');
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <Wrench className="h-12 w-12 mx-auto text-primary mb-2" />
            <h1 className="text-3xl font-bold">Portal do Técnico</h1>
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
                  <div className="border-b pb-2">
                    <h2 className="text-xl font-semibold flex items-center">
                      <User2 className="mr-2 h-5 w-5" /> 
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
                                <Input placeholder="00000000000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="border-b pb-2 pt-4">
                        <h2 className="text-xl font-semibold flex items-center">
                          <MapPin className="mr-2 h-5 w-5" />
                          Endereço
                        </h2>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                              <Input placeholder="Rua, número, complemento" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input placeholder="Sua cidade" {...field} />
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
                                <Input placeholder="UF" maxLength={2} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CEP</FormLabel>
                              <FormControl>
                                <Input placeholder="00000000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="border-b pb-2 pt-4">
                        <h2 className="text-xl font-semibold flex items-center">
                          <Mail className="mr-2 h-5 w-5" />
                          Contato e Acesso
                        </h2>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <Input placeholder="(00) 00000-0000" {...field} />
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
                              <FormLabel>E-mail</FormLabel>
                              <FormControl>
                                <Input placeholder="seu@email.com" {...field} />
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
                                <Input type="password" placeholder="******" {...field} />
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
                                <Input type="password" placeholder="******" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="border-b pb-2 pt-4">
                        <h2 className="text-xl font-semibold flex items-center">
                          <Settings className="mr-2 h-5 w-5" />
                          Informações Profissionais
                        </h2>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="specialties"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Especialidades</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Descreva suas especialidades técnicas (ex: impressoras UV, DTF, plotters, router CNC, laser CO²...)" 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Informe quais tipos de equipamentos e serviços você atende.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experiência Profissional</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Descreva sua experiência, tempo de atuação, certificações..." 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Conte um pouco sobre sua trajetória profissional.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Processando..." : "Enviar Cadastro"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>
              
              <TabsContent value="login">
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Wrench className="mr-2 h-5 w-5" />
                      Acesso para Técnicos
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Faça login com sua conta de técnico para gerenciar seus serviços
                    </p>
                  </div>
                  
                  {/* Login com Google */}
                  <div className="mb-4">
                    <GoogleAuthProvider>
                      <GoogleLoginButton />
                    </GoogleAuthProvider>
                  </div>
                  
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative px-4 bg-card text-sm">Ou com email</div>
                  </div>
                  
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="seu@email.com" 
                                {...field} 
                                defaultValue="tecnico@exemplo.com"
                              />
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
                              <Input 
                                type="password" 
                                placeholder="******" 
                                {...field} 
                                defaultValue="123456"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Entrando..." : "Acessar minha conta"}
                      </Button>
                    </form>
                  </Form>
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

export default TechnicianRegister;