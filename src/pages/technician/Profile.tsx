
import React, { useState, useEffect } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Calculator, MapPin, Wrench, Star, Settings, FileText, CreditCard, Plus, Trash2 } from 'lucide-react';
import { getAllEquipmentTypes } from '@/types/equipment';
import { serviceTypeLabels } from '@/types/technician';
import { useToast } from '@/hooks/use-toast';
import TechnicianPricing from '@/components/technician/TechnicianPricing';
import ImageUpload from '@/components/ui/image-upload';
import FileUploadSection from '@/components/technician/FileUploadSection';
import AppSettings from '@/components/technician/AppSettings';
import { useViaCep } from '@/hooks/useViaCep';
import { brazilianStates } from '@/types/technician';

const TechnicianProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([
    'eco-solvent', 'uv-flexible', 'solvent'
  ]);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'installation', 'maintenance'
  ]);
  
  // Estado para a foto do perfil
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  
  // Estado para dados do perfil
  const [profileData, setProfileData] = useState({
    name: 'Ricardo Oliveira',
    email: 'ricardo.oliveira@exemplo.com',
    phone: '(11) 98765-4321',
    document: '123.456.789-00',
    description: 'Técnico especializado em manutenção de plotters e equipamentos gráficos. Mais de 5 anos de experiência no mercado.',
    serviceArea: 10,
  });

  // Estado para endereço principal
  const [mainAddress, setMainAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  // Estado para endereços de entrega adicionais
  const [deliveryAddresses, setDeliveryAddresses] = useState<Array<{
    id: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    label: string;
  }>>([]);

  // Estado para contas bancárias
  const [bankAccounts, setBankAccounts] = useState<Array<{
    id: string;
    bank: string;
    accountType: string;
    agency: string;
    account: string;
    pix: string;
  }>>([
    {
      id: '1',
      bank: '',
      accountType: 'corrente',
      agency: '',
      account: '',
      pix: ''
    }
  ]);
  
  // Estado para preços
  const [pricing, setPricing] = useState({
    visitPrice: 80,
    laborPrice: 120
  });
  
  const { toast } = useToast();
  const { fetchAddress, isLoading: isLoadingCep, error: cepError } = useViaCep();
  
  // Dados de exemplo do perfil
  const profile = {
    rating: 4.8,
    reviewCount: 36 
  };

  // Buscar endereço pelo CEP
  const handleCepBlur = async () => {
    if (mainAddress.cep.length === 8 || mainAddress.cep.replace(/\D/g, '').length === 8) {
      const addressData = await fetchAddress(mainAddress.cep);
      if (addressData) {
        setMainAddress(prev => ({
          ...prev,
          street: addressData.street,
          neighborhood: addressData.neighborhood,
          city: addressData.city,
          state: addressData.state
        }));
        toast({
          title: "Endereço encontrado!",
          description: "Os dados foram preenchidos automaticamente.",
        });
      } else if (cepError) {
        toast({
          title: "Erro ao buscar CEP",
          description: cepError,
          variant: "destructive"
        });
      }
    }
  };

  // Buscar endereço de entrega pelo CEP
  const handleDeliveryCepBlur = async (id: string, cep: string) => {
    if (cep.length === 8 || cep.replace(/\D/g, '').length === 8) {
      const addressData = await fetchAddress(cep);
      if (addressData) {
        setDeliveryAddresses(prev => prev.map(addr => 
          addr.id === id 
            ? {
                ...addr,
                street: addressData.street,
                neighborhood: addressData.neighborhood,
                city: addressData.city,
                state: addressData.state
              }
            : addr
        ));
        toast({
          title: "Endereço encontrado!",
          description: "Os dados foram preenchidos automaticamente.",
        });
      }
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

  const handleImageChange = (file: File | null, imageUrl: string | null) => {
    setProfileImageFile(file);
    setProfileImage(imageUrl);
    
    if (file) {
      toast({
        title: "Foto carregada",
        description: `Arquivo "${file.name}" foi carregado com sucesso.`,
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Adicionar endereço de entrega
  const handleAddDeliveryAddress = () => {
    const newAddress = {
      id: Date.now().toString(),
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      label: ''
    };
    setDeliveryAddresses(prev => [...prev, newAddress]);
    toast({
      title: "Endereço adicionado",
      description: "Novo endereço de entrega adicionado.",
    });
  };

  // Remover endereço de entrega
  const handleRemoveDeliveryAddress = (id: string) => {
    setDeliveryAddresses(prev => prev.filter(addr => addr.id !== id));
    toast({
      title: "Endereço removido",
      description: "Endereço de entrega removido.",
    });
  };

  // Adicionar conta bancária
  const handleAddBankAccount = () => {
    const newAccount = {
      id: Date.now().toString(),
      bank: '',
      accountType: 'corrente',
      agency: '',
      account: '',
      pix: ''
    };
    setBankAccounts(prev => [...prev, newAccount]);
    toast({
      title: "Conta adicionada",
      description: "Nova conta bancária adicionada.",
    });
  };

  // Remover conta bancária
  const handleRemoveBankAccount = (id: string) => {
    if (bankAccounts.length > 1) {
      setBankAccounts(prev => prev.filter(acc => acc.id !== id));
      toast({
        title: "Conta removida",
        description: "Conta bancária removida.",
      });
    } else {
      toast({
        title: "Atenção",
        description: "Você precisa ter pelo menos uma conta bancária.",
        variant: "destructive"
      });
    }
  };

  const handleSavePersonalData = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Salvando dados pessoais...', { profileData });
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dados pessoais salvos!",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    }, 1500);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Salvando endereço...', { mainAddress });
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Endereço salvo!",
        description: "Seu endereço foi atualizado com sucesso.",
      });
    }, 1500);
  };

  const handleSaveDeliveryAddresses = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Salvando endereços de entrega...', { deliveryAddresses });
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Endereços de entrega salvos!",
        description: "Seus endereços foram atualizados com sucesso.",
      });
    }, 1500);
  };

  const handleSaveBankAccounts = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Salvando contas bancárias...', { bankAccounts });
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Contas bancárias salvas!",
        description: "Suas contas foram atualizadas com sucesso.",
      });
    }, 1500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Salvando perfil...', { 
      profileData, 
      profileImageFile, 
      profileImage,
      selectedEquipment,
      selectedServices 
    });
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    }, 1500);
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Salvando preços...', pricing);
    
    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Preços atualizados!",
        description: "Sua tabela de preços foi atualizada com sucesso.",
      });
    }, 1500);
  };
  
  const equipmentOptions = getAllEquipmentTypes();
  
  return (
    <TechnicianLayout title="Meu Perfil">
      <div className="space-y-6 font-inter">
        {/* Header do Perfil */}
        <Card className="bg-white border-2 border-gray-border shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-start justify-between bg-gradient-to-r from-tech-primary to-blue-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage 
                  src={profileImage || ""} 
                  alt={profileData.name} 
                />
                <AvatarFallback className="text-xl bg-white text-tech-primary font-bold">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold text-white">{profileData.name}</CardTitle>
                <CardDescription className="text-blue-100">
                  <div className="flex items-center mt-2">
                    <span className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-tech-accent mr-1 fill-current" />
                      <span className="font-semibold text-white">{profile.rating}</span>
                    </span>
                    <span className="mx-3 text-blue-200">•</span>
                    <span className="text-blue-100">{profile.reviewCount} avaliações</span>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-secondary text-base leading-relaxed">{profileData.description}</p>
            <div className="flex items-center mt-4 bg-green-50 p-3 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-success mr-3" />
              <span className="text-success font-medium">Perfil verificado</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-light border border-gray-border">
            <TabsTrigger 
              value="personal" 
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Pessoal
            </TabsTrigger>
            <TabsTrigger 
              value="professional"
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Profissional
            </TabsTrigger>
            <TabsTrigger 
              value="pricing"
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Preços
            </TabsTrigger>
            <TabsTrigger 
              value="files"
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Arquivos
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Configurações
            </TabsTrigger>
            <TabsTrigger 
              value="photo"
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Foto
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="mt-6">
            <div className="space-y-6">
              {/* Dados Pessoais */}
              <Card className="bg-white border-2 border-gray-border shadow-sm">
                <form onSubmit={handleSavePersonalData}>
                  <CardHeader className="bg-gray-light border-b border-gray-border">
                    <CardTitle className="text-xl font-bold text-tech-primary">Dados Pessoais</CardTitle>
                    <CardDescription className="text-gray-secondary">
                      Informações básicas do perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="full-name" className="text-gray-800 font-semibold">Nome Completo</Label>
                        <Input 
                          id="full-name" 
                          value={profileData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-800 font-semibold">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-800 font-semibold">Telefone</Label>
                        <Input 
                          id="phone" 
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="document" className="text-gray-800 font-semibold">CPF/CNPJ</Label>
                        <Input 
                          id="document" 
                          value={profileData.document}
                          onChange={(e) => handleInputChange('document', e.target.value)}
                          className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-light border-t border-gray-border">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-tech-primary hover:bg-tech-primary-hover text-white font-semibold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:scale-105"
                    >
                      {isLoading ? 'Salvando...' : 'Salvar Dados Pessoais'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              {/* Endereço Principal */}
              <Card className="bg-white border-2 border-gray-border shadow-sm">
                <form onSubmit={handleSaveAddress}>
                  <CardHeader className="bg-gray-light border-b border-gray-border">
                    <CardTitle className="text-xl font-bold text-tech-primary">Endereço Principal</CardTitle>
                    <CardDescription className="text-gray-secondary">
                      Endereço residencial ou comercial
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="cep" className="text-gray-800 font-semibold">CEP</Label>
                        <Input 
                          id="cep" 
                          value={mainAddress.cep}
                          onChange={(e) => setMainAddress(prev => ({ ...prev, cep: e.target.value }))}
                          onBlur={handleCepBlur}
                          placeholder="00000-000"
                          maxLength={9}
                          className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                        {isLoadingCep && <p className="text-sm text-blue-600">Buscando endereço...</p>}
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="street" className="text-gray-800 font-semibold">Rua</Label>
                        <Input 
                          id="street" 
                          value={mainAddress.street}
                          onChange={(e) => setMainAddress(prev => ({ ...prev, street: e.target.value }))}
                          className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="number" className="text-gray-800 font-semibold">Número</Label>
                        <Input 
                          id="number" 
                          value={mainAddress.number}
                          onChange={(e) => setMainAddress(prev => ({ ...prev, number: e.target.value }))}
                          className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="complement" className="text-gray-800 font-semibold">Complemento</Label>
                        <Input 
                          id="complement" 
                          value={mainAddress.complement}
                          onChange={(e) => setMainAddress(prev => ({ ...prev, complement: e.target.value }))}
                          placeholder="Apartamento, sala, etc."
                          className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood" className="text-gray-800 font-semibold">Bairro</Label>
                        <Input 
                          id="neighborhood" 
                          value={mainAddress.neighborhood}
                          onChange={(e) => setMainAddress(prev => ({ ...prev, neighborhood: e.target.value }))}
                          className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-800 font-semibold">Cidade</Label>
                        <Input 
                          id="city" 
                          value={mainAddress.city}
                          onChange={(e) => setMainAddress(prev => ({ ...prev, city: e.target.value }))}
                          className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-gray-800 font-semibold">Estado</Label>
                        <select
                          id="state"
                          value={mainAddress.state}
                          onChange={(e) => setMainAddress(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full border-2 border-gray-300 rounded-md px-3 py-2 focus:border-tech-primary focus:ring-tech-primary"
                        >
                          <option value="">Selecione</option>
                          {brazilianStates.map(state => (
                            <option key={state.value} value={state.value}>{state.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-light border-t border-gray-border">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-tech-primary hover:bg-tech-primary-hover text-white font-semibold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:scale-105"
                    >
                      {isLoading ? 'Salvando...' : 'Salvar Endereço'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              {/* Endereços de Entrega */}
              <Card className="bg-white border-2 border-gray-border shadow-sm">
                <form onSubmit={handleSaveDeliveryAddresses}>
                  <CardHeader className="bg-gray-light border-b border-gray-border">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl font-bold text-tech-primary">Endereços de Entrega</CardTitle>
                        <CardDescription className="text-gray-secondary">
                          Endereços adicionais para recebimento de peças
                        </CardDescription>
                      </div>
                      <Button 
                        type="button"
                        onClick={handleAddDeliveryAddress}
                        variant="outline"
                        className="border-tech-primary text-tech-primary hover:bg-tech-primary hover:text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Endereço
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    {deliveryAddresses.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Nenhum endereço de entrega cadastrado</p>
                    ) : (
                      deliveryAddresses.map((address, index) => (
                        <div key={address.id} className="border border-gray-300 rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-gray-800">Endereço {index + 1}</h4>
                            <Button
                              type="button"
                              onClick={() => handleRemoveDeliveryAddress(address.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`label-${address.id}`} className="text-gray-800 font-semibold">Identificação</Label>
                            <Input 
                              id={`label-${address.id}`}
                              value={address.label}
                              onChange={(e) => setDeliveryAddresses(prev => prev.map(addr => 
                                addr.id === address.id ? { ...addr, label: e.target.value } : addr
                              ))}
                              placeholder="Ex: Oficina, Depósito, etc."
                              className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`del-cep-${address.id}`} className="text-gray-800 font-semibold">CEP</Label>
                              <Input 
                                id={`del-cep-${address.id}`}
                                value={address.cep}
                                onChange={(e) => setDeliveryAddresses(prev => prev.map(addr => 
                                  addr.id === address.id ? { ...addr, cep: e.target.value } : addr
                                ))}
                                onBlur={() => handleDeliveryCepBlur(address.id, address.cep)}
                                placeholder="00000-000"
                                maxLength={9}
                                className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                              />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor={`del-street-${address.id}`} className="text-gray-800 font-semibold">Rua</Label>
                              <Input 
                                id={`del-street-${address.id}`}
                                value={address.street}
                                onChange={(e) => setDeliveryAddresses(prev => prev.map(addr => 
                                  addr.id === address.id ? { ...addr, street: e.target.value } : addr
                                ))}
                                className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`del-number-${address.id}`} className="text-gray-800 font-semibold">Número</Label>
                              <Input 
                                id={`del-number-${address.id}`}
                                value={address.number}
                                onChange={(e) => setDeliveryAddresses(prev => prev.map(addr => 
                                  addr.id === address.id ? { ...addr, number: e.target.value } : addr
                                ))}
                                className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                              />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor={`del-complement-${address.id}`} className="text-gray-800 font-semibold">Complemento</Label>
                              <Input 
                                id={`del-complement-${address.id}`}
                                value={address.complement}
                                onChange={(e) => setDeliveryAddresses(prev => prev.map(addr => 
                                  addr.id === address.id ? { ...addr, complement: e.target.value } : addr
                                ))}
                                className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`del-neighborhood-${address.id}`} className="text-gray-800 font-semibold">Bairro</Label>
                              <Input 
                                id={`del-neighborhood-${address.id}`}
                                value={address.neighborhood}
                                onChange={(e) => setDeliveryAddresses(prev => prev.map(addr => 
                                  addr.id === address.id ? { ...addr, neighborhood: e.target.value } : addr
                                ))}
                                className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`del-city-${address.id}`} className="text-gray-800 font-semibold">Cidade</Label>
                              <Input 
                                id={`del-city-${address.id}`}
                                value={address.city}
                                onChange={(e) => setDeliveryAddresses(prev => prev.map(addr => 
                                  addr.id === address.id ? { ...addr, city: e.target.value } : addr
                                ))}
                                className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`del-state-${address.id}`} className="text-gray-800 font-semibold">Estado</Label>
                              <select
                                id={`del-state-${address.id}`}
                                value={address.state}
                                onChange={(e) => setDeliveryAddresses(prev => prev.map(addr => 
                                  addr.id === address.id ? { ...addr, state: e.target.value } : addr
                                ))}
                                className="w-full border-2 border-gray-300 rounded-md px-3 py-2 focus:border-tech-primary focus:ring-tech-primary"
                              >
                                <option value="">Selecione</option>
                                {brazilianStates.map(state => (
                                  <option key={state.value} value={state.value}>{state.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                  <CardFooter className="bg-gray-light border-t border-gray-border">
                    <Button 
                      type="submit" 
                      disabled={isLoading || deliveryAddresses.length === 0}
                      className="bg-tech-primary hover:bg-tech-primary-hover text-white font-semibold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:scale-105"
                    >
                      {isLoading ? 'Salvando...' : 'Salvar Endereços de Entrega'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              {/* Contas Bancárias */}
              <Card className="bg-white border-2 border-gray-border shadow-sm">
                <form onSubmit={handleSaveBankAccounts}>
                  <CardHeader className="bg-gray-light border-b border-gray-border">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl font-bold text-tech-primary">Contas Bancárias</CardTitle>
                        <CardDescription className="text-gray-secondary">
                          Para recebimento de pagamentos
                        </CardDescription>
                      </div>
                      <Button 
                        type="button"
                        onClick={handleAddBankAccount}
                        variant="outline"
                        className="border-tech-primary text-tech-primary hover:bg-tech-primary hover:text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Conta
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    {bankAccounts.map((account, index) => (
                      <div key={account.id} className="border border-gray-300 rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-gray-800">Conta {index + 1}</h4>
                          {bankAccounts.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => handleRemoveBankAccount(account.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`bank-${account.id}`} className="text-gray-800 font-semibold">Banco</Label>
                            <Input 
                              id={`bank-${account.id}`}
                              value={account.bank}
                              onChange={(e) => setBankAccounts(prev => prev.map(acc => 
                                acc.id === account.id ? { ...acc, bank: e.target.value } : acc
                              ))}
                              placeholder="Ex: Banco do Brasil, Itaú, etc."
                              className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`account-type-${account.id}`} className="text-gray-800 font-semibold">Tipo de Conta</Label>
                            <select
                              id={`account-type-${account.id}`}
                              value={account.accountType}
                              onChange={(e) => setBankAccounts(prev => prev.map(acc => 
                                acc.id === account.id ? { ...acc, accountType: e.target.value } : acc
                              ))}
                              className="w-full border-2 border-gray-300 rounded-md px-3 py-2 focus:border-tech-primary focus:ring-tech-primary"
                            >
                              <option value="corrente">Conta Corrente</option>
                              <option value="poupanca">Conta Poupança</option>
                              <option value="salario">Conta Salário</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`agency-${account.id}`} className="text-gray-800 font-semibold">Agência</Label>
                            <Input 
                              id={`agency-${account.id}`}
                              value={account.agency}
                              onChange={(e) => setBankAccounts(prev => prev.map(acc => 
                                acc.id === account.id ? { ...acc, agency: e.target.value } : acc
                              ))}
                              placeholder="0000"
                              className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`account-${account.id}`} className="text-gray-800 font-semibold">Número da Conta</Label>
                            <Input 
                              id={`account-${account.id}`}
                              value={account.account}
                              onChange={(e) => setBankAccounts(prev => prev.map(acc => 
                                acc.id === account.id ? { ...acc, account: e.target.value } : acc
                              ))}
                              placeholder="00000-0"
                              className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`pix-${account.id}`} className="text-gray-800 font-semibold">Chave PIX</Label>
                          <Input 
                            id={`pix-${account.id}`}
                            value={account.pix}
                            onChange={(e) => setBankAccounts(prev => prev.map(acc => 
                              acc.id === account.id ? { ...acc, pix: e.target.value } : acc
                            ))}
                            placeholder="CPF, E-mail, Telefone ou Chave Aleatória"
                            className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="bg-gray-light border-t border-gray-border">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-tech-primary hover:bg-tech-primary-hover text-white font-semibold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:scale-105"
                    >
                      {isLoading ? 'Salvando...' : 'Salvar Contas Bancárias'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="professional" className="mt-6">
            <Card className="bg-white border-2 border-gray-border shadow-sm">
              <form onSubmit={handleSaveProfile}>
                <CardHeader className="bg-gray-light border-b border-gray-border">
                  <CardTitle className="text-xl font-bold text-tech-primary">Perfil Profissional</CardTitle>
                  <CardDescription className="text-gray-secondary">
                    Atualize suas informações profissionais e especialidades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-bold text-tech-primary">Tipos de Equipamentos</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {equipmentOptions.map((equipment) => (
                        <div key={equipment.value} className="flex items-center space-x-3 p-3 border border-gray-border rounded-lg hover:bg-gray-50 transition-colors">
                          <Checkbox 
                            id={`equipment-${equipment.value}`}
                            checked={selectedEquipment.includes(equipment.value)}
                            onCheckedChange={() => handleEquipmentChange(equipment.value)}
                            className="border-2 border-tech-primary data-[state=checked]:bg-tech-primary"
                          />
                          <Label 
                            htmlFor={`equipment-${equipment.value}`}
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            {equipment.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4 border-t border-gray-border pt-6">
                    <Label className="text-lg font-bold text-tech-primary">Tipos de Serviços</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(serviceTypeLabels).map(([value, label]) => (
                        <div key={value} className="flex items-center space-x-3 p-3 border border-gray-border rounded-lg hover:bg-gray-50 transition-colors">
                          <Checkbox 
                            id={`service-${value}`}
                            checked={selectedServices.includes(value)}
                            onCheckedChange={() => handleServiceChange(value)}
                            className="border-2 border-tech-primary data-[state=checked]:bg-tech-primary"
                          />
                          <Label 
                            htmlFor={`service-${value}`}
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            {label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 border-t border-gray-border pt-6">
                    <Label htmlFor="description" className="text-gray-800 font-semibold">Descrição profissional</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Descreva sua experiência, habilidades e serviços oferecidos" 
                      value={profileData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                      maxLength={500}
                    />
                    <p className="text-sm text-muted-foreground">
                      {profileData.description.length}/500 caracteres
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-area" className="text-gray-800 font-semibold">Área de atendimento (raio em km)</Label>
                    <Input 
                      id="service-area" 
                      type="number" 
                      value={profileData.serviceArea}
                      onChange={(e) => handleInputChange('serviceArea', e.target.value)}
                      className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary max-w-32"
                      min="1"
                      max="100"
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-light border-t border-gray-border">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-tech-primary hover:bg-tech-primary-hover text-white font-semibold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:scale-105"
                  >
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border-2 border-gray-border shadow-sm">
                <form onSubmit={handleSavePricing}>
                  <CardHeader className="bg-gray-light border-b border-gray-border">
                    <CardTitle className="text-xl font-bold text-tech-primary">Configurar Preços</CardTitle>
                    <CardDescription className="text-gray-secondary">
                      Defina os valores para seus serviços
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 p-6">
                    {/* Orçamento - sempre gratuito */}
                    <div className="flex items-center justify-between p-4 bg-success-light rounded-lg border-2 border-success">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-success rounded-lg">
                          <Calculator className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-success">Orçamento</h4>
                          <p className="text-sm text-success">Estimativa detalhada</p>
                        </div>
                      </div>
                      <span className="text-success font-bold text-lg">Gratuito</span>
                    </div>

                    {/* Visita Técnica */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-tech-primary rounded-lg">
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <Label htmlFor="visit-price" className="text-base font-bold text-tech-primary">
                          Taxa de Visita Técnica
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">R$</span>
                        <Input
                          id="visit-price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={pricing.visitPrice}
                          onChange={(e) => setPricing({...pricing, visitPrice: Number(e.target.value)})}
                          className="max-w-32 border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>
                      <p className="text-sm text-gray-secondary">
                        Custo de deslocamento para visita técnica
                      </p>
                    </div>

                    {/* Mão de Obra */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-tech-accent rounded-lg">
                          <Wrench className="h-5 w-5 text-white" />
                        </div>
                        <Label htmlFor="labor-price" className="text-base font-bold text-tech-primary">
                          Valor da Mão de Obra (por hora)
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">R$</span>
                        <Input
                          id="labor-price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={pricing.laborPrice}
                          onChange={(e) => setPricing({...pricing, laborPrice: Number(e.target.value)})}
                          className="max-w-32 border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                        <span className="text-sm font-medium">/hora</span>
                      </div>
                      <p className="text-sm text-gray-secondary">
                        Valor cobrado por hora de trabalho
                      </p>
                    </div>

                    <div className="text-xs text-gray-500 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      * Materiais e peças são cobrados à parte conforme necessário
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-light border-t border-gray-border">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-tech-primary hover:bg-tech-primary-hover text-white font-semibold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:scale-105"
                    >
                      {isLoading ? 'Salvando...' : 'Salvar Preços'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              {/* Preview da tabela de preços */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-tech-primary">Preview da Tabela de Preços</h3>
                <TechnicianPricing 
                  pricing={{
                    quotePrice: 0,
                    visitPrice: pricing.visitPrice,
                    laborPrice: pricing.laborPrice
                  }} 
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="files" className="mt-6">
            <FileUploadSection />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <AppSettings />
          </TabsContent>

          <TabsContent value="photo" className="mt-6">
            <Card className="bg-white border-2 border-gray-border shadow-sm">
              <CardHeader className="bg-gray-light border-b border-gray-border">
                <CardTitle className="text-xl font-bold text-tech-primary">Foto do Perfil</CardTitle>
                <CardDescription className="text-gray-secondary">
                  Atualize sua foto de perfil profissional
                </CardDescription>
              </CardHeader>
              <CardContent className="py-8">
                <div className="flex justify-center">
                  <ImageUpload
                    currentImage={profileImage || undefined}
                    onImageChange={handleImageChange}
                    size="lg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianProfile;
