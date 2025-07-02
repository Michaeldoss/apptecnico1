import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, ArrowRight, AlertCircle, Printer, Scissors, Wrench, Calculator, Clock } from 'lucide-react';
import TechnicianMap from '@/components/maps/TechnicianMap';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTechnicianSearch } from '@/hooks/useTechnicianSearch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BlurContainer from '@/components/ui/BlurContainer';
import TechnicianFilters from '@/components/technician/TechnicianFilters';
import QuoteRequestForm from '@/components/services/QuoteRequestForm';
import TechnicalVisitForm from '@/components/services/TechnicalVisitForm';
import { equipmentCategories, EquipmentType } from '@/types/equipment';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TechnicianPricing from '@/components/technician/TechnicianPricing';

const FindTechnician = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { 
    technicians, 
    searchQuery, 
    setSearchQuery, 
    selectedTechnician, 
    setSelectedTechnician,
    searchLocation,
    setSearchLocation,
    filterByService,
    setFilterByService,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    selectedEquipmentType,
    setSelectedEquipmentType
  } = useTechnicianSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [visitDialogOpen, setVisitDialogOpen] = useState(false);

  // Mock pricing data - in real app this would come from the technician data
  const getTechnicianPricing = (technicianId: number) => ({
    quotePrice: 0,
    visitPrice: 80,
    laborPrice: 120
  });

  const handleSearch = () => {
    // A pesquisa já é executada automaticamente através dos useEffect no hook
    // Este botão pode ser usado para feedback visual
    toast({
      title: "Pesquisa executada",
      description: `Encontrados ${technicians.length} técnicos`,
    });
    
    // Reset do técnico selecionado para refletir os novos resultados
    setSelectedTechnician(null);
  };

  const handleContactRequest = (technicianId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para contactar um técnico",
        variant: "destructive",
      });
    } else {
      // Redirect to service request page
      window.location.href = `/customer/service-request?technician=${technicianId}`;
    }
  };

  const handleQuoteRequest = (technicianId: number) => {
    setSelectedTechnician(technicians.find(t => t.id === technicianId) || null);
    setQuoteDialogOpen(true);
  };

  const handleVisitRequest = (technicianId: number) => {
    setSelectedTechnician(technicians.find(t => t.id === technicianId) || null);
    setVisitDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setQuoteDialogOpen(false);
    setVisitDialogOpen(false);
  };

  // Filter technicians by equipment category if selected
  const filteredTechnicians = selectedCategory 
    ? technicians.filter(tech => {
        const category = equipmentCategories.find(cat => cat.id === selectedCategory);
        if (!category) return true;
        
        return tech.equipmentTypes?.some(type => category.types.includes(type as EquipmentType));
      })
    : technicians;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Encontre Técnicos Especializados</h1>
          <p className="text-xl mb-8 text-white opacity-90">Localize profissionais qualificados para seus equipamentos</p>
          
          {/* Search Filters */}
          <TechnicianFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            filterByService={filterByService}
            setFilterByService={setFilterByService}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedEquipmentType={selectedEquipmentType}
            setSelectedEquipmentType={setSelectedEquipmentType}
            onSearch={handleSearch}
          />
        </div>
      </header>

      {/* Equipment Categories Filter */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </Button>
            
            {equipmentCategories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.id === 'printers' && <Printer className="h-4 w-4" />}
                {category.id === 'finishing' && <Scissors className="h-4 w-4" />}
                {category.id === 'cnc' && <Wrench className="h-4 w-4" />}
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="map">Visualização em Mapa</TabsTrigger>
            <TabsTrigger value="list">Lista de Técnicos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map */}
              <div className="lg:col-span-2">
                <BlurContainer className="h-[600px] rounded-xl overflow-hidden">
                  <TechnicianMap 
                    technicians={filteredTechnicians} 
                    selectedTechnician={selectedTechnician}
                    setSelectedTechnician={setSelectedTechnician}
                  />
                </BlurContainer>
                
                {/* Mobile Technician Detail */}
                {selectedTechnician && (
                  <div className="lg:hidden mt-4 space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-blue-600">{selectedTechnician.name}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {selectedTechnician.location}
                            </CardDescription>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 font-medium">{selectedTechnician.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">({selectedTechnician.reviewCount})</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 text-gray-800">Especialidades</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedTechnician.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline">{specialty}</Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{selectedTechnician.description}</p>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-2">
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700" 
                          onClick={() => handleContactRequest(selectedTechnician.id)}
                        >
                          Solicitar Serviço
                        </Button>
                        <div className="flex gap-2 w-full">
                          <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handleQuoteRequest(selectedTechnician.id)}
                              >
                                <Calculator className="h-4 w-4 mr-2" />
                                Orçamento Grátis
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Solicitar Orçamento Gratuito</DialogTitle>
                                <DialogDescription>
                                  Solicite um orçamento gratuito para {selectedTechnician?.name}
                                </DialogDescription>
                              </DialogHeader>
                              <QuoteRequestForm 
                                onSuccess={handleFormSuccess} 
                                technicianId={selectedTechnician?.id}
                              />
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog open={visitDialogOpen} onOpenChange={setVisitDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handleVisitRequest(selectedTechnician.id)}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Visita R$ {getTechnicianPricing(selectedTechnician.id).visitPrice}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Agendar Visita Técnica</DialogTitle>
                                <DialogDescription>
                                  Agende uma visita técnica com {selectedTechnician?.name}
                                </DialogDescription>
                              </DialogHeader>
                              <TechnicalVisitForm 
                                onSuccess={handleFormSuccess} 
                                technicianId={selectedTechnician?.id}
                                visitPrice={getTechnicianPricing(selectedTechnician.id).visitPrice}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardFooter>
                    </Card>
                    
                    {/* Mobile Pricing */}
                    <TechnicianPricing pricing={getTechnicianPricing(selectedTechnician.id)} />
                  </div>
                )}
              </div>
              
              {/* Technicians Detail - Desktop */}
              <div className="hidden lg:block space-y-4">
                {selectedTechnician ? (
                  <>
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-blue-600">{selectedTechnician.name}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {selectedTechnician.location}
                            </CardDescription>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 font-medium">{selectedTechnician.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">({selectedTechnician.reviewCount})</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 text-gray-800">Especialidades</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedTechnician.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline">{specialty}</Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{selectedTechnician.description}</p>
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-800">Horários Disponíveis</h4>
                          <p className="text-sm text-gray-600">Segunda à Sexta: 8h às 18h</p>
                          <p className="text-sm text-gray-600">Sábado: 8h às 12h</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-2">
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700" 
                          onClick={() => handleContactRequest(selectedTechnician.id)}
                        >
                          Solicitar Serviço
                        </Button>
                        <div className="flex gap-2 w-full">
                          <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handleQuoteRequest(selectedTechnician.id)}
                              >
                                <Calculator className="h-4 w-4 mr-2" />
                                Orçamento Grátis
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Solicitar Orçamento Gratuito</DialogTitle>
                                <DialogDescription>
                                  Solicite um orçamento gratuito para {selectedTechnician?.name}
                                </DialogDescription>
                              </DialogHeader>
                              <QuoteRequestForm 
                                onSuccess={handleFormSuccess} 
                                technicianId={selectedTechnician?.id}
                              />
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog open={visitDialogOpen} onOpenChange={setVisitDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handleVisitRequest(selectedTechnician.id)}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Visita R$ {getTechnicianPricing(selectedTechnician.id).visitPrice}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Agendar Visita Técnica</DialogTitle>
                                <DialogDescription>
                                  Agende uma visita técnica com {selectedTechnician?.name}
                                </DialogDescription>
                              </DialogHeader>
                              <TechnicalVisitForm 
                                onSuccess={handleFormSuccess} 
                                technicianId={selectedTechnician?.id}
                                visitPrice={getTechnicianPricing(selectedTechnician.id).visitPrice}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardFooter>
                    </Card>
                    
                    {/* Desktop Pricing */}
                    <TechnicianPricing pricing={getTechnicianPricing(selectedTechnician.id)} />
                  </>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-600">Detalhes do Técnico</CardTitle>
                      <CardDescription>
                        Selecione um técnico no mapa para ver mais informações
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <MapPin className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-center text-gray-500">
                        Clique em um marcador no mapa para ver os detalhes do técnico
                      </p>
                    </CardContent>
                  </Card>
                )}
                
                {/* Help Card */}
                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                      <CardTitle className="text-lg text-blue-600">Como funciona</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">1.</span>
                        <span className="text-gray-700">Encontre um técnico especializado em seu tipo de equipamento</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">2.</span>
                        <span className="text-gray-700">Verifique suas especialidades e disponibilidade</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">3.</span>
                        <span className="text-gray-700">Solicite um serviço diretamente pela plataforma</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">4.</span>
                        <span className="text-gray-700">Toda comunicação acontece dentro do aplicativo</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/register" className="w-full">
                      <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                        Cadastre-se para solicitar serviços
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTechnicians.map((technician) => (
                <Card 
                  key={technician.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${selectedTechnician?.id === technician.id ? 'ring-2 ring-blue-600' : ''}`}
                  onClick={() => setSelectedTechnician(technician)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-blue-600">{technician.name}</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{technician.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {technician.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {technician.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">{specialty}</Badge>
                      ))}
                      {technician.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{technician.specialties.length - 3}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{technician.description}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactRequest(technician.id);
                      }}
                    >
                      Solicitar Serviço
                    </Button>
                    <div className="flex gap-2 w-full">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuoteRequest(technician.id);
                            }}
                          >
                            <Calculator className="h-4 w-4 mr-1" />
                            Grátis
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Solicitar Orçamento Gratuito</DialogTitle>
                            <DialogDescription>
                              Solicite um orçamento gratuito para {technician.name}
                            </DialogDescription>
                          </DialogHeader>
                          <QuoteRequestForm 
                            onSuccess={handleFormSuccess} 
                            technicianId={technician.id}
                          />
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVisitRequest(technician.id);
                            }}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            R$ {getTechnicianPricing(technician.id).visitPrice}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Agendar Visita Técnica</DialogTitle>
                            <DialogDescription>
                              Agende uma visita técnica com {technician.name}
                            </DialogDescription>
                          </DialogHeader>
                          <TechnicalVisitForm 
                            onSuccess={handleFormSuccess} 
                            technicianId={technician.id}
                            visitPrice={getTechnicianPricing(technician.id).visitPrice}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Mobile Help Section */}
        <div className="lg:hidden mt-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                <CardTitle className="text-lg text-blue-600">Como funciona</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span className="text-gray-700">Encontre um técnico especializado em seu tipo de equipamento</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span className="text-gray-700">Verifique suas especialidades e disponibilidade</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span className="text-gray-700">Solicite um serviço diretamente pela plataforma</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">4.</span>
                  <span className="text-gray-700">Toda comunicação acontece dentro do aplicativo</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/register" className="w-full">
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Cadastre-se para solicitar serviços
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindTechnician;
