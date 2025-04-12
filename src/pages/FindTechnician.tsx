
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Filter, Star, ArrowRight, AlertCircle, Printer, Scissors, Wrench } from 'lucide-react';
import TechnicianMap from '@/components/maps/TechnicianMap';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTechnicianSearch } from '@/hooks/useTechnicianSearch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlurContainer from '@/components/ui/BlurContainer';

const equipmentCategories = [
  { id: 'printers', label: 'Plotters', icon: <Printer className="h-4 w-4 mr-2" /> },
  { id: 'finishing', label: 'Acabamento', icon: <Scissors className="h-4 w-4 mr-2" /> },
  { id: 'cnc', label: 'Máquinas CNC', icon: <Wrench className="h-4 w-4 mr-2" /> },
];

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
    setFilterByService
  } = useTechnicianSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleContactRequest = (technicianId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para contactar um técnico",
        variant: "destructive",
      });
    } else {
      // Redirecionar para a página de solicitação de serviço
      window.location.href = `/cliente/solicitar?technician=${technicianId}`;
    }
  };

  // Filter technicians by category if selected
  const filteredTechnicians = selectedCategory 
    ? technicians.filter(tech => {
        if (selectedCategory === 'printers') {
          return tech.specialties.some(s => 
            s.includes('plotter') || 
            s.includes('impressora') || 
            s.includes('impressão')
          );
        } else if (selectedCategory === 'finishing') {
          return tech.specialties.some(s => 
            s.includes('calandra') || 
            s.includes('prensa') || 
            s.includes('carrossel') || 
            s.includes('costura')
          );
        } else if (selectedCategory === 'cnc') {
          return tech.specialties.some(s => 
            s.includes('cnc') || 
            s.includes('router') || 
            s.includes('laser') || 
            s.includes('gravadora')
          );
        }
        return true;
      })
    : technicians;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white p-6">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center mb-6">
            <span className="text-2xl font-bold">AssistAnywhere</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Encontre Técnicos Especializados</h1>
          <p className="text-lg opacity-90 mb-6">Localize profissionais qualificados para seus equipamentos</p>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Buscar por tipo de equipamento" 
                value={filterByService}
                onChange={(e) => setFilterByService(e.target.value)}
                className="pl-10 bg-white text-black w-full"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Localização (ex: São Paulo, SP)" 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10 bg-white text-black w-full"
              />
            </div>
            <Button variant="secondary" className="whitespace-nowrap">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </div>
        </div>
      </header>

      {/* Equipment Categories Filter */}
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
              className="flex items-center"
            >
              {category.icon} {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="map">Mapa</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
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
                
                {/* Mobile Technician Detail (shows when technician is selected on mobile) */}
                {selectedTechnician && (
                  <div className="lg:hidden mt-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{selectedTechnician.name}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              {selectedTechnician.location}
                            </CardDescription>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 font-medium">{selectedTechnician.rating}</span>
                            <span className="text-xs text-muted-foreground ml-1">({selectedTechnician.reviewCount})</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Especialidades</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedTechnician.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline">{specialty}</Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedTechnician.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => handleContactRequest(selectedTechnician.id)}
                        >
                          Solicitar Serviço
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </div>
              
              {/* Technicians List - Desktop */}
              <div className="hidden lg:block">
                {selectedTechnician ? (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedTechnician.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            {selectedTechnician.location}
                          </CardDescription>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 font-medium">{selectedTechnician.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({selectedTechnician.reviewCount})</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Especialidades</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTechnician.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline">{specialty}</Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{selectedTechnician.description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Horários Disponíveis</h4>
                        <p className="text-sm text-muted-foreground">Segunda à Sexta: 8h às 18h</p>
                        <p className="text-sm text-muted-foreground">Sábado: 8h às 12h</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleContactRequest(selectedTechnician.id)}
                      >
                        Solicitar Serviço
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Detalhes do Técnico</CardTitle>
                      <CardDescription>
                        Selecione um técnico no mapa para ver mais informações
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <MapPin className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-center text-muted-foreground">
                        Clique em um marcador no mapa para ver os detalhes do técnico
                      </p>
                    </CardContent>
                  </Card>
                )}
                
                {/* Help Card */}
                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                      <CardTitle className="text-lg">Como funciona</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">1.</span>
                        <span>Encontre um técnico especializado em seu tipo de equipamento</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">2.</span>
                        <span>Verifique suas especialidades e disponibilidade</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">3.</span>
                        <span>Solicite um serviço diretamente pela plataforma</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">4.</span>
                        <span>Toda comunicação acontece dentro do aplicativo</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/register" className="w-full">
                      <Button variant="outline" className="w-full">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTechnicians.map((technician) => (
                <Card 
                  key={technician.id} 
                  className={`cursor-pointer transition-all ${selectedTechnician?.id === technician.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedTechnician(technician)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>{technician.name}</CardTitle>
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
                    <p className="text-sm text-muted-foreground line-clamp-2">{technician.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactRequest(technician.id);
                      }}
                    >
                      Solicitar Serviço
                    </Button>
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
                <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                <CardTitle className="text-lg">Como funciona</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>Encontre um técnico especializado em seu tipo de equipamento</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Verifique suas especialidades e disponibilidade</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>Solicite um serviço diretamente pela plataforma</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>Toda comunicação acontece dentro do aplicativo</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/register" className="w-full">
                <Button variant="outline" className="w-full">
                  Cadastre-se para solicitar serviços
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FindTechnician;
