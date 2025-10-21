import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
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
import GoogleAuthProvider from '@/components/auth/GoogleAuthProvider';
import { Wrench, MapPin, User, Settings, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const technicianFormSchema = z.object({
  // CEP primeiro
  cep: z.string().min(8, "CEP deve ter 8 dígitos").max(9, "CEP inválido"),
  
  // Endereço (preenchido automaticamente via CEP)
  endereco: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(2, "Bairro deve ter pelo menos 2 caracteres"),
  cidade: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  estado: z.string().length(2, "Estado deve ter 2 caracteres"),
  
  // Dados pessoais
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  cpf_cnpj: z.string().min(11, "CPF deve ter 11 dígitos"),
  
  // Dados profissionais
  especialidades: z.array(z.string()).min(1, "Selecione pelo menos uma especialidade"),
  experiencia_anos: z.number().min(0, "Experiência não pode ser negativa"),
  
  // Acesso
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

type TechnicianFormData = z.infer<typeof technicianFormSchema>;

const TechnicianRegister = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cepValidated, setCepValidated] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { fetchAddress, isLoading: cepLoading, error: cepError } = useViaCep();

  const specialtiesOptions = [
    'Impressoras UV',
    'Impressoras DTF',
    'Plotters de Recorte',
    'Router CNC',
    'Laser CO²',
    'Impressoras Sublimáticas',
    'Impressoras Eco-Solvente',
    'Prensas Térmicas',
    'Máquinas de Bordado',
    'Impressoras Off-Set',
    'Outros'
  ];

  const form = useForm<TechnicianFormData>({
    resolver: zodResolver(technicianFormSchema),
    defaultValues: {
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      nome: '',
      email: '',
      telefone: '',
      cpf_cnpj: '',
      especialidades: [],
      experiencia_anos: 0,
      password: '',
      confirmPassword: '',
    },
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
            form.setValue('endereco', addressData.street);
            form.setValue('bairro', addressData.neighborhood);
            form.setValue('cidade', addressData.city);
            form.setValue('estado', addressData.state);
            setCepValidated(true);
            
            toast({
              title: "Endereço encontrado",
              description: "Dados preenchidos automaticamente via CEP",
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

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter(s => s !== specialty)
      : [...selectedSpecialties, specialty];
    
    setSelectedSpecialties(newSpecialties);
    form.setValue('especialidades', newSpecialties);
  };

  const onSubmit = async (data: TechnicianFormData) => {
    setIsSubmitting(true);
    
    try {
      const technicianData = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cpf_cnpj: data.cpf_cnpj,
        cep: data.cep,
        endereco: data.endereco,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        especialidades: selectedSpecialties,
        experiencia_anos: data.experiencia_anos,
        type: 'technician'
      };
      
      const success = await signup(data.email, data.password, technicianData);
      
      if (success) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Faça login para acessar sua conta.",
        });
        navigate('/login');
      }
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Ocorreu um erro. Tente novamente.",
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <AnimatedContainer animation="scale" className="text-center mb-8">
            <Wrench className="h-12 w-12 mx-auto text-primary mb-2" />
            <h1 className="text-3xl font-bold">Cadastro de Técnico</h1>
            <p className="text-muted-foreground mt-2">
              Registre-se para oferecer seus serviços técnicos na plataforma
            </p>
          </AnimatedContainer>

          <BlurContainer className="p-6">
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
                  
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP *</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="00000-000"
                              value={formatCep(field.value)}
                              onChange={(e) => {
                                const formatted = formatCep(e.target.value);
                                field.onChange(formatted);
                                setCepValidated(false);
                              }}
                              className={`${cepValidated ? 'border-green-500' : ''}`}
                            />
                          </FormControl>
                          {cepLoading && (
                            <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />
                          )}
                        </div>
                        {cepError && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {cepError}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Endereço - preenchido automaticamente */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="endereco"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Endereço *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Será preenchido automaticamente"
                            {...field}
                            disabled={cepLoading}
                            className="bg-muted/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número *</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="complemento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input placeholder="Apto 101, Sala 10..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bairro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Será preenchido automaticamente"
                            {...field}
                            disabled={cepLoading}
                            className="bg-muted/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Será preenchido automaticamente"
                            {...field}
                            disabled={cepLoading}
                            className="bg-muted/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="SP"
                            {...field}
                            disabled={cepLoading}
                            className="bg-muted/30"
                            maxLength={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Dados pessoais */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Dados Pessoais</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="João Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="joao@exemplo.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(11) 99999-9999"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="cpf_cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="000.000.000-00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Dados profissionais */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Informações Profissionais</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="especialidades"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especialidades *</FormLabel>
                        <FormDescription>
                          Selecione suas áreas de atuação (pode escolher várias)
                        </FormDescription>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {specialtiesOptions.map((specialty) => (
                            <label
                              key={specialty}
                              className={`flex items-center space-x-2 p-2 rounded border cursor-pointer hover:bg-muted/50 ${
                                selectedSpecialties.includes(specialty) 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-border'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedSpecialties.includes(specialty)}
                                onChange={() => handleSpecialtyChange(specialty)}
                                className="sr-only"
                              />
                              <span className="text-sm">{specialty}</span>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experiencia_anos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anos de Experiência</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Senha */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha *</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Mínimo 6 caracteres" {...field} />
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
                        <FormLabel>Confirmar Senha *</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Repita a senha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
              </form>
            </Form>

            {/* Link para login */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Fazer login
                </Link>
              </p>
            </div>
          </BlurContainer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TechnicianRegister;