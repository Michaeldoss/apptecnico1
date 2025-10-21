import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useViaCep } from '@/hooks/useViaCep';
import ProfileCompleteness from '@/components/profile/ProfileCompleteness';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import BlurContainer from '@/components/ui/BlurContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import GoogleAuthProvider from '@/components/auth/GoogleAuthProvider';
import { User, MapPin, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
const registerSchema = z.object({
  // CEP primeiro
  cep: z.string().min(8, "CEP deve ter 8 dígitos").max(9, "CEP inválido"),
  // Dados pessoais
  firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  cpf: z.string().min(11, "CPF deve ter 11 dígitos"),
  // Endereço (preenchido automaticamente via CEP)
  street: z.string().min(5, "Rua deve ter pelo menos 5 caracteres"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro deve ter pelo menos 2 caracteres"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().length(2, "Estado deve ter 2 caracteres"),
  // Acesso
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  // Específicos por tipo
  companyName: z.string().optional(),
  cnpj: z.string().optional(),
  experience: z.string().optional(),
  specialties: z.string().optional(),
  // Termos
  acceptTerms: z.boolean().refine(val => val === true, "Você deve aceitar os termos")
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"]
});
type RegisterFormData = z.infer<typeof registerSchema>;
const NewRegister = () => {
  const [userType, setUserType] = useState<'client' | 'technician' | 'store'>('client');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [cepValidated, setCepValidated] = useState(false);
  const {
    signup
  } = useAuth();
  const navigate = useNavigate();
  const {
    fetchAddress,
    isLoading: cepLoading,
    error: cepError
  } = useViaCep();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      cep: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      cpf: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      cnpj: '',
      experience: '',
      specialties: '',
      acceptTerms: false
    }
  });
  const watchedCep = form.watch('cep');

  // Auto-preencher endereço quando CEP é digitado
  useEffect(() => {
    const handleCepLookup = async () => {
      if (watchedCep && watchedCep.length >= 8) {
        const cleanCep = watchedCep.replace(/\D/g, '');
        if (cleanCep.length === 8) {
          const addressData = await fetchAddress(cleanCep);
          if (addressData) {
            form.setValue('street', addressData.street);
            form.setValue('neighborhood', addressData.neighborhood);
            form.setValue('city', addressData.city);
            form.setValue('state', addressData.state);
            setCepValidated(true);
            toast({
              title: "Endereço encontrado",
              description: "Dados preenchidos automaticamente via CEP"
            });
          } else {
            setCepValidated(false);
          }
        }
      }
    };
    const timeoutId = setTimeout(handleCepLookup, 500);
    return () => clearTimeout(timeoutId);
  }, [watchedCep, fetchAddress, form]);
  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Preparar dados do usuário
      const userData = {
        ...data,
        type: userType,
        documents,
        profilePicture
      };
      console.log('Dados salvos:', userData);
      toast({
        title: "Conta criada com sucesso!",
        description: "Agora você pode fazer login com suas credenciais."
      });

      // Tentar login automático
      const loginSuccess = await signup(data.email, data.password, userData);
      if (loginSuccess) {
        // Redirecionar baseado no tipo de usuário
        switch (userType) {
          case 'technician':
            navigate('/tecnico/dashboard');
            break;
          case 'store':
            navigate('/loja/dashboard');
            break;
          default:
            navigate('/cliente/dashboard');
        }
      } else {
        // Se login falhar, redirecionar para página de login
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Ocorreu um erro. Tente novamente."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const formatCep = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 5) return cleanValue;
    return `${cleanValue.slice(0, 5)}-${cleanValue.slice(5, 8)}`;
  };
  const validateRealTime = (field: string, value: string) => {
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'cpf':
        return value.replace(/\D/g, '').length === 11;
      case 'phone':
        return value.replace(/\D/g, '').length >= 10;
      default:
        return true;
    }
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedContainer animation="scale" className="text-center mb-8">
            <h1 className="text-3xl font-bold">Criar Conta</h1>
            <p className="text-muted-foreground mt-2">
              Preencha seus dados para começar a usar nossa plataforma
            </p>
          </AnimatedContainer>

          <BlurContainer className="p-6">
            {/* Seletor de tipo de conta */}
            <Tabs value={userType} onValueChange={value => setUserType(value as any)} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="client">Cliente</TabsTrigger>
                
                
              </TabsList>
            </Tabs>

            {/* Login com Google */}
            <div className="mb-6">
              <GoogleAuthProvider>
                <GoogleLoginButton />
              </GoogleAuthProvider>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-4 text-muted-foreground">Ou cadastre-se com email</span>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* PRIMEIRO: CEP para preenchimento automático */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Localização</h3>
                    {cepValidated && <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                  
                  <FormField control={form.control} name="cep" render={({
                  field
                }) => <FormItem>
                        <FormLabel>CEP *</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input placeholder="00000-000" value={formatCep(field.value)} onChange={e => {
                        const formatted = formatCep(e.target.value);
                        field.onChange(formatted);
                        setCepValidated(false);
                      }} className={`${cepValidated ? 'border-green-500' : ''}`} />
                          </FormControl>
                          {cepLoading && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />}
                        </div>
                        {cepError && <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {cepError}
                          </p>}
                        <FormMessage />
                      </FormItem>} />
                </div>

                {/* Endereço - preenchido automaticamente */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="street" render={({
                  field
                }) => <FormItem className="md:col-span-2">
                        <FormLabel>Rua/Avenida *</FormLabel>
                        <FormControl>
                          <Input placeholder="Será preenchido automaticamente" {...field} disabled={cepLoading} className="bg-muted/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="number" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Número *</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="complement" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input placeholder="Apto 101, Sala 10..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="neighborhood" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Bairro *</FormLabel>
                        <FormControl>
                          <Input placeholder="Será preenchido automaticamente" {...field} disabled={cepLoading} className="bg-muted/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="city" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Cidade *</FormLabel>
                        <FormControl>
                          <Input placeholder="Será preenchido automaticamente" {...field} disabled={cepLoading} className="bg-muted/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="state" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Estado *</FormLabel>
                        <FormControl>
                          <Input placeholder="SP" {...field} disabled={cepLoading} className="bg-muted/50" maxLength={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                {/* Dados pessoais */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Dados Pessoais</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Nome *</FormLabel>
                          <FormControl>
                            <Input placeholder="João" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="lastName" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Sobrenome *</FormLabel>
                          <FormControl>
                            <Input placeholder="Silva" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="email" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="joao@exemplo.com" {...field} className={`${validateRealTime('email', field.value) && field.value ? 'border-green-500' : ''}`} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="phone" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Telefone *</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 99999-9999" {...field} className={`${validateRealTime('phone', field.value) ? 'border-green-500' : ''}`} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="cpf" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>CPF *</FormLabel>
                          <FormControl>
                            <Input placeholder="000.000.000-00" {...field} className={`${validateRealTime('cpf', field.value) ? 'border-green-500' : ''}`} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>
                </div>

                {/* Campos específicos por tipo */}
                {userType === 'store' && <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Dados da Empresa</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="companyName" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Nome da Empresa *</FormLabel>
                            <FormControl>
                              <Input placeholder="Sua Empresa Ltda" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <FormField control={form.control} name="cnpj" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>CNPJ *</FormLabel>
                            <FormControl>
                              <Input placeholder="00.000.000/0001-00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                    </div>
                  </div>}

                {userType === 'technician' && <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informações Profissionais</h3>
                    <FormField control={form.control} name="specialties" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Especialidades *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Descreva suas especialidades técnicas..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="experience" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Experiência *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Descreva sua experiência profissional..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>}

                {/* Senha */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="password" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Senha *</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Mínimo 6 caracteres" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="confirmPassword" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Confirmar Senha *</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Repita a senha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                {/* Termos */}
                <FormField control={form.control} name="acceptTerms" render={({
                field
              }) => <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="text-sm">
                        Aceito os{' '}
                        <Link to="/terms" className="text-primary hover:underline">
                          termos de uso
                        </Link>{' '}
                        e{' '}
                        <Link to="/privacy" className="text-primary hover:underline">
                          política de privacidade
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>} />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Criando conta...
                    </div> : 'Criar Conta'}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm mt-6">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </BlurContainer>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default NewRegister;