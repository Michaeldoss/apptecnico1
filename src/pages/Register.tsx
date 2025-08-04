
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Printer, Scissors, Wrench, Upload, FileText, Clock, MapPin, CreditCard, Briefcase, Key as KeyIcon, Store } from 'lucide-react';
import GoogleAuthProvider from '@/components/auth/GoogleAuthProvider';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

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
      
      const userData = {
        nome: `${firstName} ${lastName}`,
        email,
        telefone: phone,
        cpf_cnpj: document,
        type: accountType === 'client' ? 'customer' : accountType === 'store' ? 'company' : accountType
      };

      console.log('Tentando cadastrar:', userData);
      
      const success = await signup(email, password, userData);
      
      if (success) {
        toast({ 
          title: "Cadastro realizado com sucesso!", 
          description: "Verifique seu email para confirmar a conta." 
        });
      } else {
        toast({ 
          variant: "destructive", 
          title: "Erro no cadastro", 
          description: "Verifique os dados e tente novamente." 
        });
      }
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/95 to-muted/30">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-10 pt-32 relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="w-full max-w-4xl relative z-10">
          <AnimatedContainer animation="scale" className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 animate-fade-in">Criar Conta</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Preencha seus dados para começar a usar nossa plataforma
            </p>
          </AnimatedContainer>
          
          <BlurContainer className="p-8 bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-3xl">
            <Tabs defaultValue="client" className="mb-6" onValueChange={setAccountType}>
              <TabsList className="grid w-full grid-cols-3 bg-muted/50 border border-border rounded-xl p-1">
                <TabsTrigger 
                  value="client" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg transition-all duration-300 font-medium"
                >
                  Cliente
                </TabsTrigger>
                <TabsTrigger 
                  value="technician" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg transition-all duration-300 font-medium"
                >
                  Técnico
                </TabsTrigger>
                <TabsTrigger 
                  value="store" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg transition-all duration-300 font-medium"
                >
                  Lojista
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="client" className="mt-6">
                <div className="p-4 bg-primary/5 backdrop-blur-sm rounded-lg border border-primary/20 shadow-sm">
                  <p className="text-sm text-foreground mb-2 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    <span className="font-medium">Crie uma conta de cliente para encontrar técnicos especializados para seus equipamentos.</span>
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="technician" className="mt-6">
                <div className="p-4 bg-primary/5 backdrop-blur-sm rounded-lg border border-primary/20 shadow-sm">
                  <p className="text-sm text-foreground mb-2 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    <span className="font-medium">Crie uma conta de técnico para oferecer seus serviços para máquinas industriais.</span>
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="store" className="mt-6">
                <div className="p-4 bg-primary/5 backdrop-blur-sm rounded-lg border border-primary/20 shadow-sm">
                  <p className="text-sm text-foreground mb-2 flex items-center gap-2">
                    <Store className="h-4 w-4 text-primary" />
                    <span className="font-medium">Crie uma conta de lojista para vender peças, insumos e equipamentos para o mercado gráfico.</span>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <form onSubmit={handleRegister} className="space-y-8">
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Informações Pessoais</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="first-name">Nome</Label>
                     <Input 
                       id="first-name"
                       name="first-name"
                       placeholder="João" 
                       required 
                       className="rounded-lg"
                     />
                   </div>
                  
                   <div className="space-y-2">
                     <Label htmlFor="last-name">Sobrenome</Label>
                     <Input 
                       id="last-name"
                       name="last-name"
                       placeholder="Silva" 
                       required 
                       className="rounded-lg"
                     />
                   </div>
                  
                   <div className="space-y-2">
                     <Label htmlFor="phone">Telefone</Label>
                     <Input 
                       id="phone"
                       name="phone"
                       type="tel" 
                       placeholder="(11) 98765-4321" 
                       required 
                       className="rounded-lg"
                     />
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input 
                       id="email"
                       name="email"
                       type="email" 
                       placeholder="nome@exemplo.com" 
                       required 
                       className="rounded-lg"
                     />
                   </div>
                  
                   <div className="space-y-2">
                     <Label htmlFor="document">CPF</Label>
                     <Input 
                       id="document"
                       name="document"
                       placeholder="000.000.000-00" 
                       required 
                       className="rounded-lg"
                     />
                   </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="profile-picture">Foto de Perfil</Label>
                  <Input 
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('profile', e)}
                    className="rounded-lg"
                  />
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-8 space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Endereço</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="street">Rua/Avenida</Label>
                    <Input 
                      id="street"
                      placeholder="Av. Paulista" 
                      required 
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="number">Número</Label>
                    <Input 
                      id="number"
                      placeholder="1000" 
                      required 
                      className="rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input 
                      id="complement"
                      placeholder="Apto 101" 
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input 
                      id="neighborhood"
                      placeholder="Centro" 
                      required 
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zip">CEP</Label>
                    <Input 
                      id="zip"
                      placeholder="00000-000" 
                      required 
                      className="rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input 
                      id="city"
                      placeholder="São Paulo" 
                      required 
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input 
                      id="state"
                      placeholder="SP" 
                      required 
                      className="rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address-proof">Comprovante de Residência</Label>
                  <Input 
                    id="address-proof"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange('addressProof', e)}
                    className="rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Conta de luz, água ou telefone recente (últimos 3 meses)
                  </p>
                </div>
              </div>
              
              {/* Documentos */}
              <div className="border-t border-gray-200 pt-8 space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Documentos</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rg-file">RG (frente e verso)</Label>
                    <Input 
                      id="rg-file"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange('rg', e)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cpf-file">CPF</Label>
                    <Input 
                      id="cpf-file"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange('cpf', e)}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
              
              {accountType === 'technician' && (
                <>
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
      
      <Footer />
    </div>
  );
};

export default Register;
