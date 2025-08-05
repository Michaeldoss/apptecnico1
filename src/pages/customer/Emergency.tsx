
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin,
  Zap,
  Wrench,
  Package
} from 'lucide-react';

const CustomerEmergency = () => {
  const [emergencyType, setEmergencyType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const emergencyTypes = [
    { id: 'fire', label: 'Incêndio/Fumaça', color: 'bg-red-500', icon: AlertTriangle },
    { id: 'electrical', label: 'Problema Elétrico', color: 'bg-yellow-500', icon: Zap },
    { id: 'breakdown', label: 'Quebra Total', color: 'bg-orange-500', icon: Wrench },
    { id: 'leak', label: 'Vazamento', color: 'bg-blue-500', icon: Package }
  ];

  const handleEmergencyCall = () => {
    window.open('tel:+5511999999999');
  };

  const handleWhatsAppEmergency = () => {
    const message = `🚨 EMERGÊNCIA - ${emergencyType}
Localização: ${location}
Descrição: ${description}
Horário: ${new Date().toLocaleString()}`;
    
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="min-h-screen bg-blue-600">
      <CustomerLayout title="Atendimento de Emergência">
        <div className="space-y-6">
          {/* Contatos de Emergência */}
          <Card className="bg-white/95 border-2 border-red-500">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-6 w-6" />
                Contatos de Emergência 24h
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={handleEmergencyCall}
                  className="bg-red-600 hover:bg-red-700 h-16 text-lg"
                >
                  <Phone className="h-6 w-6 mr-3" />
                  Ligar Emergência: (11) 99999-9999
                </Button>
                
                <Button 
                  onClick={() => window.open('https://wa.me/5511999999999?text=🚨 EMERGÊNCIA - Preciso de atendimento URGENTE', '_blank')}
                  className="bg-green-600 hover:bg-green-700 h-16 text-lg"
                >
                  <MessageCircle className="h-6 w-6 mr-3" />
                  WhatsApp Emergência
                </Button>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium">
                  ⚡ <strong>Tempo de Resposta:</strong> Emergências são atendidas em até 30 minutos durante horário comercial, 
                  e 1 hora em finais de semana/feriados.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Emergência */}
          <Card className="bg-white/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Descrever Emergência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Emergência:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {emergencyTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Button
                        key={type.id}
                        variant={emergencyType === type.id ? "default" : "outline"}
                        onClick={() => setEmergencyType(type.label)}
                        className={`h-16 flex flex-col gap-1 ${emergencyType === type.id ? type.color : ''}`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Localização Exata:</label>
                <Input
                  placeholder="Ex: Galpão Principal, Sala 2, próximo à DTF..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição Detalhada:</label>
                <Textarea
                  placeholder="Descreva o problema com o máximo de detalhes possível..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button
                onClick={handleWhatsAppEmergency}
                disabled={!emergencyType || !location || !description}
                className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Enviar Solicitação de Emergência
              </Button>
            </CardContent>
          </Card>

          {/* Status de Técnicos */}
          <Card className="bg-white/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Técnicos Disponíveis Agora
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium">Técnico Disponível</p>
                      <p className="text-sm text-gray-600">Especialista DTF/Sublimática</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <Clock className="h-3 w-3 mr-1" />
                    15 min
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium">Técnico Disponível</p>
                      <p className="text-sm text-gray-600">CNC/Laser/Eletrônica</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">
                    <Clock className="h-3 w-3 mr-1" />
                    25 min
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium">Técnico Disponível</p>
                      <p className="text-sm text-gray-600">Prensas/Acabamento</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">
                    <Clock className="h-3 w-3 mr-1" />
                    40 min
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CustomerLayout>
    </div>
  );
};

export default CustomerEmergency;
