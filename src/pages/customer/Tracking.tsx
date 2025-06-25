
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatusBadge from '@/components/services/StatusBadge';
import RatingStars from '@/components/services/RatingStars';
import { Search, MapPin, Clock, Phone, CheckCircle, User, AlertCircle } from 'lucide-react';

const CustomerTracking = () => {
  const { data: services, isLoading, rateTechnician } = useServices();
  const [searchCode, setSearchCode] = useState('');
  const [searchedService, setSearchedService] = useState(null);
  const [showRating, setShowRating] = useState(false);
  
  // Find active service
  const activeService = services?.find(s => s.tracking?.checkedIn && !s.tracking?.checkedOut);
  
  const handleSearch = () => {
    if (!searchCode.trim()) return;
    
    // Simulate service search (in a real app, this would be an API call)
    const foundService = services?.find(s => 
      s.id.toString() === searchCode || 
      s.client.toLowerCase().includes(searchCode.toLowerCase())
    );
    
    setSearchedService(foundService || null);
  };
  
  const handleRateTechnician = (rating: number) => {
    const service = searchedService || activeService;
    if (service) {
      rateTechnician(service.id, rating);
      setShowRating(false);
    }
  };
  
  const displayService = searchedService || activeService;
  
  if (isLoading) {
    return (
      <CustomerLayout title="Rastreamento de Chamados">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </CustomerLayout>
    );
  }
  
  return (
    <CustomerLayout title="Rastreamento de Chamados">
      <div className="space-y-6">
        {/* Search Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Consultar Status do Chamado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="searchCode">Código do Chamado ou CPF</Label>
              <div className="flex gap-2">
                <Input
                  id="searchCode"
                  placeholder="Digite o código do chamado ou CPF"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-800">
                  Verificar Status
                </Button>
              </div>
            </div>
            
            {searchCode && searchedService === null && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <AlertCircle className="h-4 w-4" />
                Nenhum chamado encontrado com os dados fornecidos.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Service Alert */}
        {activeService && !searchedService && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-blue-800">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Você tem um técnico em atendimento ativo!</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Service Details */}
        {displayService && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {searchedService ? 'Chamado Encontrado' : 'Técnico em Atendimento'}
                </CardTitle>
                <StatusBadge status={displayService.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Técnico Demo</h4>
                  <p className="text-sm text-muted-foreground">Especialista em {displayService.type}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1 text-blue-900">Chamado #</p>
                  <p>{displayService.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1 text-blue-900">Serviço</p>
                  <p>{displayService.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1 text-blue-900">Data</p>
                  <p className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-blue-600" />
                    {displayService.tracking?.checkinTime || displayService.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1 text-blue-900">Local</p>
                  <p className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-blue-600" />
                    {displayService.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1 text-blue-900">Contato</p>
                  <p className="flex items-center">
                    <Phone className="h-3.5 w-3.5 mr-1 text-blue-600" />
                    (11) 98765-4321
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1 text-blue-900">Status</p>
                  <StatusBadge status={displayService.status} />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3 text-blue-900">Andamento do Atendimento</p>
                
                {displayService.tracking?.checkedOut ? (
                  <div className="flex items-center text-emerald-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Serviço finalizado às {displayService.tracking.checkoutTime}</span>
                  </div>
                ) : displayService.tracking?.checkedIn ? (
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Técnico em atendimento - Iniciado às {displayService.tracking.checkinTime}</span>
                    </div>
                    
                    <div className="rounded-md overflow-hidden h-48 bg-gray-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="font-medium text-blue-900">Técnico no Local</p>
                        <p className="text-sm text-muted-foreground">Atendimento em andamento</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Aguardando início do atendimento</span>
                  </div>
                )}
              </div>
            </CardContent>
            
            {displayService.tracking?.checkedOut && !displayService.technicianRating && !showRating && (
              <CardFooter className="flex justify-center border-t pt-4">
                <Button 
                  variant="outline"
                  onClick={() => setShowRating(true)}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Avaliar Técnico
                </Button>
              </CardFooter>
            )}
            
            {showRating && (
              <CardFooter className="flex flex-col items-center border-t pt-4 space-y-4">
                <p className="font-medium text-blue-900">Como você avalia o serviço do técnico?</p>
                <RatingStars onChange={handleRateTechnician} />
              </CardFooter>
            )}
            
            {displayService.technicianRating && (
              <CardFooter className="flex flex-col items-center border-t pt-4 space-y-2">
                <p className="text-sm text-blue-900">Sua avaliação para este técnico:</p>
                <RatingStars initialRating={displayService.technicianRating} readOnly />
                <p className="text-xs text-muted-foreground">Obrigado pelo feedback!</p>
              </CardFooter>
            )}
          </Card>
        )}

        {/* No services message */}
        {!displayService && !searchCode && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-blue-900">Nenhum Atendimento Ativo</h3>
              <p className="text-muted-foreground mb-6">
                Não há técnicos em atendimento no momento. Use o formulário acima para consultar o status de chamados anteriores.
              </p>
              <div className="flex gap-2 justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-800">
                  <Link to="/cliente/servicos">Ver Meus Serviços</Link>
                </Button>
                <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Link to="/cliente/solicitar">Solicitar Novo Serviço</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerTracking;
