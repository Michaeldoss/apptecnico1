
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import BlurContainer from '@/components/ui/BlurContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Printer, Scissors, Wrench, Upload, FileText, Clock, MapPin, CreditCard, Briefcase, Key as KeyIcon, Store, CheckCircle, Mail, User } from 'lucide-react';
import GoogleAuthProvider from '@/components/auth/GoogleAuthProvider';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useViaCep } from '@/hooks/useViaCep';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const equipmentTypes = [
  { id: 'eco-solvent', label: 'Plotter eco solvente' },
  { id: 'uv-flexible', label: 'Plotter UV flexível' },
  { id: 'solvent', label: 'Plotter solvente' },
  { id: 'sublimation', label: 'Plotter sublimática' },
  { id: 'dtf-textile', label: 'Plotter DTF Têxtil' },
  { id: 'dtf-uv', label: 'Plotter DTF UV' },
  { id: 'uv-flatbed', label: 'Plotter Flatbed UV' },
  { id: 'cutting', label: 'Plotter de recorte' },
  { id: 'cylindrical-uv', label: 'Plotter UV cilíndrica' },
  { id: 'sublimation-calander', label: 'Calandra para sublimação' },
  { id: 'thermal-press', label: 'Prensa térmica para sublimação' },
  { id: 'silk-carousel', label: 'Carrossel para silk' },
  { id: 'dtf-carousel', label: 'Carrossel para DTF' },
  { id: 'mixed-carousel', label: 'Carrossel misto' },
  { id: 'sewing-machine', label: 'Máquina de costura' },
  { id: 'offset', label: 'OFF-SET' },
  { id: 'cnc-co2', label: 'CNC CO²' },
  { id: 'cnc-router', label: 'CNC Router' },
  { id: 'laser-engraver', label: 'Gravadora laser (Fiber)' },
];

const serviceTypes = [
  { id: 'installation', label: 'Instalação' },
  { id: 'maintenance', label: 'Manutenção' },
  { id: 'repair', label: 'Reparo' },
  { id: 'periodic', label: 'Manutenção periódica' },
  { id: 'reform', label: 'Reforma' },
];

const Register = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState('client');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [documentFiles, setDocumentFiles] = useState({
    rg: null,
    cpf: null,
    addressProof: null,
    cnpj: null,
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [cep, setCep] = useState('');
  const [cepValidated, setCepValidated] = useState(false);
  const { fetchAddress, isLoading: cepLoading, error: cepError } = useViaCep();

  const sendConfirmationEmail = async (email: string, name: string, userType: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
        body: {
          email,
          name,
          userType
        }
      });

      if (error) {
        console.error('Erro ao enviar email de confirmação:', error);
      } else {
        console.log('Email de confirmação enviado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao enviar email de confirmação:', error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const firstName = formData.get('first-name') as string;
      const lastName = formData.get('last-name') as string;
      const phone = formData.get('phone') as string;
      const document = formData.get('document') as string;
      const fullName = `${firstName} ${lastName}`;
      
      const userData = {
        nome: fullName,
        email,
        telefone: phone,
        cpf_cnpj: document,
        type: accountType === 'client' ? 'customer' : accountType === 'store' ? 'company' : accountType
      };

      console.log('Tentando cadastrar:', userData);
      
      const success = await signup(email, password, userData);
      
      if (success) {
        // Enviar email de confirmação
        await sendConfirmationEmail(email, fullName, accountType);
        
        // Guardar email para exibir no dialog
        setUserEmail(email);
        
        // Mostrar dialog de sucesso
        setShowSuccessDialog(true);
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

  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false);
    navigate('/login');
  };

  const handleEquipmentChange = (equipmentId: string) => {
    setSelectedEquipment(prev => 
      prev.includes(equipmentId) 
        ? prev.filter(id => id !== equipmentId) 
        : [...prev, equipmentId]
    );
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const handleCategoryChange = (category: string) => {
    setProductCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleFileChange = (fileType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (fileType === 'profile') {
        setProfilePicture(e.target.files[0]);
      } else {
        setDocumentFiles(prev => ({
          ...prev,
          [fileType]: e.target.files?.[0] || null
        }));
      }
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value.replace(/\D/g, '');
    setCep(cepValue);
    
    if (cepValue.length === 8) {
      const addressData = await fetchAddress(cepValue);
      if (addressData) {
        // IDs diferentes para cada tipo de usuário
        const prefix = accountType === 'technician' ? 'tech-' : accountType === 'store' ? 'store-' : 'client-';
        
        const streetInput = document.getElementById(`${prefix}street`) as HTMLInputElement;
        const neighborhoodInput = document.getElementById(`${prefix}neighborhood`) as HTMLInputElement;
        const cityInput = document.getElementById(`${prefix}city`) as HTMLInputElement;
        const stateInput = document.getElementById(`${prefix}state`) as HTMLInputElement;
        
        if (streetInput) streetInput.value = addressData.street;
        if (neighborhoodInput) neighborhoodInput.value = addressData.neighborhood;
        if (cityInput) cityInput.value = addressData.city;
        if (stateInput) stateInput.value = addressData.state;
        
        setCepValidated(true);
      }
    } else {
      setCepValidated(false);
    }
  };

  const formatCep = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header azul com gradiente - igual à home */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-4 relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight text-white drop-shadow-2xl">
            Criar Conta
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-3xl mx-auto font-semibold leading-relaxed drop-shadow-lg">
            Preencha seus dados para começar a usar nossa plataforma
          </p>

          {/* Badges de Benefícios */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/30 flex items-center gap-2 hover:bg-white/30 transition-all duration-300 shadow-xl">
              <span className="text-white font-bold text-sm drop-shadow-lg">📱 Acesso Imediato</span>
            </div>
            <div className="bg-white/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/30 flex items-center gap-2 hover:bg-white/30 transition-all duration-300 shadow-xl">
              <span className="text-white font-bold text-sm drop-shadow-lg">🔒 Dados Seguros</span>
            </div>
            <div className="bg-white/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/30 flex items-center gap-2 hover:bg-white/30 transition-all duration-300 shadow-xl">
              <span className="text-white font-bold text-sm drop-shadow-lg">⚡ Setup Rápido</span>
            </div>
          </div>
        </div>
      </section>
      
      <main className="flex-grow flex items-center justify-center px-6 py-12 bg-gradient-to-br from-background via-background/95 to-muted/30">
        <div className="w-full max-w-4xl relative z-10">
          
          <BlurContainer className="p-8 bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-3xl">
            <Tabs defaultValue="client" className="mb-8" onValueChange={setAccountType}>
              <TabsList className="grid w-full grid-cols-3 bg-muted/50 border border-border rounded-xl p-1">
                <TabsTrigger 
                  value="client" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Cliente
                </TabsTrigger>
                <TabsTrigger 
                  value="technician" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-gray-900 data-[state=active]:shadow-md rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <Wrench className="h-4 w-4" />
                  Técnico
                </TabsTrigger>
                <TabsTrigger 
                  value="store" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <Store className="h-4 w-4" />
                  Lojista
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="client" className="mt-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-blue-900">Conta de Cliente</h3>
                      </div>
                      <Link to="/login" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Já tenho conta
                      </Link>
                    </div>
                    <p className="text-blue-800 font-medium mb-4">
                      Encontre técnicos especializados para manutenção e reparo dos seus equipamentos industriais.
                    </p>
                  </div>

                  {/* Google Login Section */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Cadastro Rápido</h4>
                    <GoogleAuthProvider>
                      <GoogleLoginButton />
                    </GoogleAuthProvider>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-50 text-gray-500">ou cadastre-se com email</span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Data Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 pb-3 border-b border-gray-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">Dados Pessoais</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="client-first-name" className="text-sm font-medium text-gray-700">Nome *</Label>
                        <Input 
                          id="client-first-name"
                          name="first-name"
                          placeholder="João" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="client-last-name" className="text-sm font-medium text-gray-700">Sobrenome *</Label>
                        <Input 
                          id="client-last-name"
                          name="last-name"
                          placeholder="Silva" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="client-cpf" className="text-sm font-medium text-gray-700">CPF *</Label>
                        <Input 
                          id="client-cpf"
                          name="document"
                          placeholder="000.000.000-00" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 pb-3 border-b border-gray-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">Endereço</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="client-cep" className="text-sm font-medium text-gray-700">CEP *</Label>
                        <Input 
                          id="client-cep"
                          name="cep"
                          placeholder="00000-000"
                          value={formatCep(cep)}
                          onChange={handleCepChange}
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                        {cepLoading && <p className="text-xs text-blue-600">Buscando endereço...</p>}
                        {cepError && <p className="text-xs text-red-600">{cepError}</p>}
                      </div>
                      
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="client-street" className="text-sm font-medium text-gray-700">Logradouro *</Label>
                        <Input 
                          id="client-street"
                          name="street"
                          placeholder="Rua das Flores" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="client-number" className="text-sm font-medium text-gray-700">Número *</Label>
                        <Input 
                          id="client-number"
                          name="number"
                          placeholder="123" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="client-neighborhood" className="text-sm font-medium text-gray-700">Bairro *</Label>
                        <Input 
                          id="client-neighborhood"
                          name="neighborhood"
                          placeholder="Centro" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="client-city" className="text-sm font-medium text-gray-700">Cidade *</Label>
                        <Input 
                          id="client-city"
                          name="city"
                          placeholder="São Paulo" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="client-state" className="text-sm font-medium text-gray-700">Estado *</Label>
                        <Input 
                          id="client-state"
                          name="state"
                          placeholder="SP" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="client-complement" className="text-sm font-medium text-gray-700">Complemento</Label>
                      <Input 
                        id="client-complement"
                        name="complement"
                        placeholder="Apartamento 12B" 
                        className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                      />
                    </div>
                  </div>

                  {/* Contact and Password Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 pb-3 border-b border-gray-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                        <KeyIcon className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">Contato e Acesso</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="client-phone" className="text-sm font-medium text-gray-700">Telefone *</Label>
                        <Input 
                          id="client-phone"
                          name="phone"
                          type="tel" 
                          placeholder="(11) 98765-4321" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="client-email" className="text-sm font-medium text-gray-700">Email *</Label>
                        <Input 
                          id="client-email"
                          name="email"
                          type="email" 
                          placeholder="joao@exemplo.com" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="client-password" className="text-sm font-medium text-gray-700">Senha *</Label>
                        <Input 
                          id="client-password"
                          name="password"
                          type="password" 
                          placeholder="••••••••" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="client-confirm-password" className="text-sm font-medium text-gray-700">Confirmar Senha *</Label>
                        <Input 
                          id="client-confirm-password"
                          name="confirm-password"
                          type="password" 
                          placeholder="••••••••" 
                          required 
                          className="rounded-lg border-gray-300 focus:border-blue-500 h-11"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="technician" className="mt-8">
                <div className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 backdrop-blur-sm rounded-2xl border border-yellow-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                      <Wrench className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-yellow-900">Conta de Técnico</h3>
                  </div>
                  <p className="text-yellow-800 font-medium">
                    Ofereça seus serviços especializados para máquinas industriais e equipamentos gráficos.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="store" className="mt-8">
                <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 backdrop-blur-sm rounded-2xl border border-purple-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <Store className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-purple-900">Conta de Lojista</h3>
                  </div>
                  <p className="text-purple-800 font-medium">
                    Venda peças, insumos e equipamentos para o mercado gráfico e industrial.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <form onSubmit={handleRegister} className="space-y-8">
              {/* Seção de Informações Pessoais */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b-2 border-gradient-to-r from-blue-200 to-purple-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Informações Pessoais</h3>
                    <p className="text-gray-600">Preencha seus dados básicos</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                     <Label htmlFor="first-name" className="text-sm font-semibold text-gray-700">Nome *</Label>
                     <Input 
                       id="first-name"
                       name="first-name"
                       placeholder="João" 
                       required 
                       className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                     />
                   </div>
                  
                   <div className="space-y-2">
                     <Label htmlFor="last-name" className="text-sm font-semibold text-gray-700">Sobrenome *</Label>
                     <Input 
                       id="last-name"
                       name="last-name"
                       placeholder="Silva" 
                       required 
                       className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                     />
                   </div>
                  
                   <div className="space-y-2">
                     <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Telefone *</Label>
                     <Input 
                       id="phone"
                       name="phone"
                       type="tel" 
                       placeholder="(11) 98765-4321" 
                       required 
                       className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                     />
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email *</Label>
                     <Input 
                       id="email"
                       name="email"
                       type="email" 
                       placeholder="nome@exemplo.com" 
                       required 
                       className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                     />
                   </div>
                  
                   <div className="space-y-2">
                     <Label htmlFor="document" className="text-sm font-semibold text-gray-700">CPF *</Label>
                     <Input 
                       id="document"
                       name="document"
                       placeholder="000.000.000-00" 
                       required 
                       className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                     />
                   </div>
                </div>
              </div>
              
              {/* Seção Endereço - apenas para cliente */}
              {accountType === 'client' && (
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Endereço</h3>
                      <p className="text-gray-600">Informações de localização</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zip" className="text-sm font-semibold text-gray-700">CEP *</Label>
                    <Input 
                      id="zip"
                      name="zip"
                      value={formatCep(cep)}
                      onChange={handleCepChange}
                      placeholder="00000-000" 
                      required 
                      className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                    />
                    {cepLoading && <p className="text-sm text-blue-600">Buscando endereço...</p>}
                    {cepError && <p className="text-sm text-red-600">{cepError}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street" className="text-sm font-semibold text-gray-700">Rua/Avenida *</Label>
                      <Input 
                        id="street"
                        name="street"
                        placeholder="Av. Paulista" 
                        required 
                        className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="number" className="text-sm font-semibold text-gray-700">Número *</Label>
                      <Input 
                        id="number"
                        name="number"
                        placeholder="1000" 
                        required 
                        className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="complement" className="text-sm font-semibold text-gray-700">Complemento</Label>
                      <Input 
                        id="complement"
                        name="complement"
                        placeholder="Apto 101" 
                        className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood" className="text-sm font-semibold text-gray-700">Bairro *</Label>
                      <Input 
                        id="neighborhood"
                        name="neighborhood"
                        placeholder="Centro" 
                        required 
                        className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-semibold text-gray-700">Cidade *</Label>
                      <Input 
                        id="city"
                        name="city"
                        placeholder="São Paulo" 
                        required 
                        className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-semibold text-gray-700">Estado *</Label>
                    <Input 
                      id="state"
                      name="state"
                      placeholder="SP" 
                      required 
                      className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                    />
                  </div>
                </div>
              )}

              {/* Seção Documentos - apenas para cliente */}
              {accountType === 'client' && (
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Documentos</h3>
                      <p className="text-gray-600">Documentos de identificação</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rg-file" className="text-sm font-semibold text-gray-700">RG (frente e verso)</Label>
                      <Input 
                        id="rg-file"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange('rg', e)}
                        className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cpf-file" className="text-sm font-semibold text-gray-700">CPF</Label>
                      <Input 
                        id="cpf-file"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange('cpf', e)}
                        className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address-proof" className="text-sm font-semibold text-gray-700">Comprovante de Residência</Label>
                    <Input 
                      id="address-proof"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange('addressProof', e)}
                      className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Conta de luz, água ou telefone recente (últimos 3 meses)
                    </p>
                  </div>
                </div>
              )}

              {/* Seção Senha - apenas para cliente */}
              {accountType === 'client' && (
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <KeyIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Senha de Acesso</h3>
                      <p className="text-gray-600">Defina sua senha para entrar na plataforma</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Senha *</Label>
                      <Input 
                        id="password"
                        name="password"
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                      />
                    </div>
                   
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700">Confirmar Senha *</Label>
                      <Input 
                        id="confirm-password"
                        name="confirm-password"
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors h-12"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {accountType === 'technician' && (
                <>
                  {/* Seção Endereço - para técnico */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b border-border">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Endereço</h3>
                        <p className="text-gray-600">Informações de localização</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tech-zip" className="text-sm font-semibold text-gray-700">CEP *</Label>
                      <Input 
                        id="tech-zip"
                        name="tech-zip"
                        value={formatCep(cep)}
                        onChange={handleCepChange}
                        placeholder="00000-000" 
                        required 
                        className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                      />
                      {cepLoading && <p className="text-sm text-yellow-600">Buscando endereço...</p>}
                      {cepError && <p className="text-sm text-red-600">{cepError}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="tech-street" className="text-sm font-semibold text-gray-700">Rua/Avenida *</Label>
                        <Input 
                          id="tech-street"
                          name="tech-street"
                          placeholder="Av. Paulista" 
                          required 
                          className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tech-number" className="text-sm font-semibold text-gray-700">Número *</Label>
                        <Input 
                          id="tech-number"
                          name="tech-number"
                          placeholder="1000" 
                          required 
                          className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tech-complement" className="text-sm font-semibold text-gray-700">Complemento</Label>
                        <Input 
                          id="tech-complement"
                          name="tech-complement"
                          placeholder="Sala 1001" 
                          className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tech-neighborhood" className="text-sm font-semibold text-gray-700">Bairro *</Label>
                        <Input 
                          id="tech-neighborhood"
                          name="tech-neighborhood"
                          placeholder="Centro" 
                          required 
                          className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tech-city" className="text-sm font-semibold text-gray-700">Cidade *</Label>
                        <Input 
                          id="tech-city"
                          name="tech-city"
                          placeholder="São Paulo" 
                          required 
                          className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tech-state" className="text-sm font-semibold text-gray-700">Estado *</Label>
                      <Input 
                        id="tech-state"
                        name="tech-state"
                        placeholder="SP" 
                        required 
                        className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                      />
                    </div>
                  </div>
                
                  {/* Seção Documentos - para técnico */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b border-border">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Documentos</h3>
                        <p className="text-gray-600">Documentos de identificação</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tech-rg-file" className="text-sm font-semibold text-gray-700">RG (frente e verso)</Label>
                        <Input 
                          id="tech-rg-file"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('rg', e)}
                          className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tech-cpf-file" className="text-sm font-semibold text-gray-700">CPF</Label>
                        <Input 
                          id="tech-cpf-file"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('cpf', e)}
                          className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tech-address-proof" className="text-sm font-semibold text-gray-700">Comprovante de Residência</Label>
                      <Input 
                        id="tech-address-proof"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange('addressProof', e)}
                        className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Conta de luz, água ou telefone recente (últimos 3 meses)
                      </p>
                    </div>
                  </div>
                
                  {/* Seção Senha - para técnico */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b border-border">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                        <KeyIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Senha de Acesso</h3>
                        <p className="text-gray-600">Defina sua senha para entrar na plataforma</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tech-password" className="text-sm font-semibold text-gray-700">Senha *</Label>
                        <Input 
                          id="tech-password"
                          name="tech-password"
                          type="password" 
                          placeholder="••••••••" 
                          required 
                          className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                        />
                      </div>
                     
                      <div className="space-y-2">
                        <Label htmlFor="tech-confirm-password" className="text-sm font-semibold text-gray-700">Confirmar Senha *</Label>
                        <Input 
                          id="tech-confirm-password"
                          name="tech-confirm-password"
                          type="password" 
                          placeholder="••••••••" 
                          required 
                          className="rounded-xl border-2 border-gray-200 focus:border-yellow-500 transition-colors h-12"
                        />
                      </div>
                    </div>
                  </div>

                
                  {/* Informações Empresariais */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Briefcase className="h-5 w-5" /> Informações Empresariais
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Nome da Empresa</Label>
                        <Input 
                          id="company-name"
                          placeholder="Técnica Especializada Ltda" 
                          required 
                          className="rounded-lg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input 
                          id="cnpj"
                          placeholder="00.000.000/0001-00" 
                          required 
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cnpj-file">Comprovante CNPJ</Label>
                      <Input 
                        id="cnpj-file"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange('cnpj', e)}
                        className="rounded-lg"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Cartão CNPJ ou Contrato Social
                      </p>
                    </div>
                  </div>
                  
                  {/* Experiência Profissional */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Clock className="h-5 w-5" /> Experiência Profissional
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience-years">Anos de Experiência</Label>
                      <Input 
                        id="experience-years"
                        type="number" 
                        min="0"
                        placeholder="5" 
                        required 
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="curriculum">Currículo/Resumo Profissional</Label>
                      <Textarea 
                        id="curriculum"
                        placeholder="Descreva sua experiência, formação e especialidades..." 
                        required 
                        className="rounded-lg min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  {/* Equipamentos e Serviços */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Printer className="h-5 w-5" /> Equipamentos
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Selecione os equipamentos com os quais você trabalha:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {equipmentTypes.map((equipment) => (
                        <div key={equipment.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`equipment-${equipment.id}`}
                            checked={selectedEquipment.includes(equipment.id)}
                            onCheckedChange={() => handleEquipmentChange(equipment.id)}
                          />
                          <Label 
                            htmlFor={`equipment-${equipment.id}`}
                            className="text-sm"
                          >
                            {equipment.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Wrench className="h-5 w-5" /> Serviços
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Selecione os serviços que você oferece:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceTypes.map((service) => (
                        <div key={service.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`service-${service.id}`}
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={() => handleServiceChange(service.id)}
                          />
                          <Label 
                            htmlFor={`service-${service.id}`}
                            className="text-sm"
                          >
                            {service.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Informações Bancárias */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <CreditCard className="h-5 w-5" /> Informações Bancárias
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bank">Banco</Label>
                        <Input 
                          id="bank"
                          placeholder="Banco do Brasil" 
                          required 
                          className="rounded-lg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="agency">Agência</Label>
                        <Input 
                          id="agency"
                          placeholder="0001" 
                          required 
                          className="rounded-lg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="account">Conta</Label>
                        <Input 
                          id="account"
                          placeholder="12345-6" 
                          required 
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="account-type">Tipo de Conta</Label>
                        <select 
                          id="account-type"
                          className="w-full p-2 border rounded-lg"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="checking">Corrente</option>
                          <option value="savings">Poupança</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pix-key">Chave PIX</Label>
                        <Input 
                          id="pix-key"
                          placeholder="CPF, telefone, e-mail ou chave aleatória" 
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {accountType === 'store' && (
                <>
                  {/* Informações da Loja */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Store className="h-5 w-5" /> Informações da Loja
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="store-name">Nome da Loja</Label>
                        <Input 
                          id="store-name"
                          placeholder="Suprimentos Gráficos Ltda" 
                          required 
                          className="rounded-lg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="store-cnpj">CNPJ</Label>
                        <Input 
                          id="store-cnpj"
                          placeholder="00.000.000/0001-00" 
                          required 
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="store-description">Descrição da Loja</Label>
                      <Textarea 
                        id="store-description"
                        placeholder="Descreva sua loja, tipos de produtos, especialidades..." 
                        required 
                        className="rounded-lg min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Esta descrição aparecerá na sua página da loja.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="store-logo">Logo da Loja</Label>
                      <Input 
                        id="store-logo"
                        type="file"
                        accept="image/*"
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="store-cnpj-file">Comprovante CNPJ</Label>
                      <Input 
                        id="store-cnpj-file"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange('cnpj', e)}
                        className="rounded-lg"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Cartão CNPJ ou Contrato Social
                      </p>
                    </div>
                  </div>
                  
                  {/* Categorias de Produtos */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Briefcase className="h-5 w-5" /> Categorias de Produtos
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Selecione as categorias de produtos que você vende:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { id: 'ink', label: 'Tintas' },
                        { id: 'vinyl', label: 'Vinil Adesivo' },
                        { id: 'banner', label: 'Lona para Banner' },
                        { id: 'paper', label: 'Papéis Especiais' },
                        { id: 'textile', label: 'Tecidos para Impressão' },
                        { id: 'hardware', label: 'Peças e Hardware' },
                        { id: 'printers', label: 'Impressoras' },
                        { id: 'cutters', label: 'Máquinas de Recorte' },
                        { id: 'sublimation', label: 'Produtos para Sublimação' },
                        { id: 'tools', label: 'Ferramentas' },
                      ].map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category.id}`}
                            checked={productCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                          />
                          <Label 
                            htmlFor={`category-${category.id}`}
                            className="text-sm"
                          >
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Informações Bancárias */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <CreditCard className="h-5 w-5" /> Informações Bancárias
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="store-bank">Banco</Label>
                        <Input 
                          id="store-bank"
                          placeholder="Banco do Brasil" 
                          required 
                          className="rounded-lg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="store-agency">Agência</Label>
                        <Input 
                          id="store-agency"
                          placeholder="0001" 
                          required 
                          className="rounded-lg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="store-account">Conta</Label>
                        <Input 
                          id="store-account"
                          placeholder="12345-6" 
                          required 
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="store-account-type">Tipo de Conta</Label>
                        <select 
                          id="store-account-type"
                          className="w-full p-2 border rounded-lg"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="checking">Corrente</option>
                          <option value="savings">Poupança</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="store-pix-key">Chave PIX</Label>
                        <Input 
                          id="store-pix-key"
                          placeholder="CPF, telefone, e-mail ou chave aleatória" 
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Senhas */}
              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <KeyIcon className="h-5 w-5" /> Senha de Acesso
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="password">Senha</Label>
                     <Input 
                       id="password"
                       name="password"
                       type="password" 
                       placeholder="••••••••" 
                       required 
                       className="rounded-lg"
                     />
                   </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                    <Input 
                      id="confirm-password"
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 pt-4">
                <Checkbox id="terms" required className="mt-1" />
                <div>
                  <Label htmlFor="terms" className="text-sm">
                    Eu concordo com os{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Termos de Serviço
                    </Link>{' '}
                    e{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Política de Privacidade
                    </Link>
                  </Label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform py-6 text-xl font-black" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Criando conta...
                  </span>
                ) : (
                  'Criar Conta'
                )}
              </Button>
              
              <div className="relative flex items-center justify-center mt-8 mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative px-6 bg-card text-sm text-muted-foreground">Ou cadastre-se com</div>
              </div>
              
              <GoogleAuthProvider>
                <GoogleLoginButton />
              </GoogleAuthProvider>
            </form>
          </BlurContainer>
          
          <p className="text-center text-sm mt-8 text-white drop-shadow-lg">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-yellow-300 font-bold hover:text-yellow-400 hover:underline transition-colors duration-300">
              Entre aqui
            </Link>
          </p>
        </div>
      </main>
      
      {/* Dialog de Sucesso */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-green-600">
              Cadastro Realizado!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-3 mt-4">
              <div className="flex items-center justify-center gap-2 text-lg font-medium text-gray-700">
                <Mail className="w-5 h-5 text-blue-600" />
                Conta criada com sucesso!
              </div>
              <p className="text-gray-600">
                Enviamos um email de confirmação para:
              </p>
              <p className="font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                {userEmail}
              </p>
              <p className="text-sm text-gray-500">
                Verifique sua caixa de entrada e spam.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={handleSuccessConfirm}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Ir para Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default Register;
