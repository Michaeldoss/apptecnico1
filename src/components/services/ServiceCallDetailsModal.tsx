
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  DollarSign,
  CreditCard,
  FileText,
  History,
  MessageSquare
} from 'lucide-react';
import { ServiceCall, statusConfig } from '@/types/service-status';
import { format } from 'date-fns';

interface ServiceCallDetailsModalProps {
  call: ServiceCall | null;
  isOpen: boolean;
  onClose: () => void;
  onAddNotes: (callId: number, notes: string) => void;
}

const ServiceCallDetailsModal: React.FC<ServiceCallDetailsModalProps> = ({
  call,
  isOpen,
  onClose,
  onAddNotes
}) => {
  const [technicianNotes, setTechnicianNotes] = useState('');
  
  if (!call) return null;

  const config = statusConfig[call.status];

  const handleCall = () => {
    window.open(`tel:${call.clientPhone}`, '_self');
  };

  const handleWhatsApp = () => {
    if (call.clientWhatsApp) {
      window.open(`https://wa.me/${call.clientWhatsApp}`, '_blank');
    }
  };

  const handleMaps = () => {
    const encodedAddress = encodeURIComponent(call.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleSaveNotes = () => {
    if (technicianNotes.trim()) {
      onAddNotes(call.id, technicianNotes);
      setTechnicianNotes('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">
                Chamado #{call.id} - {call.clientName}
              </DialogTitle>
              <DialogDescription>
                {call.serviceType} • {call.equipment}
              </DialogDescription>
            </div>
            <Badge className={config.color}>
              {config.icon} {config.label}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            {call.negotiation && (
              <TabsTrigger value="negotiation">Negociação</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {/* Informações do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Informações do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome completo</p>
                    <p className="font-medium">{call.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{call.clientPhone}</p>
                      <Button size="sm" variant="outline" onClick={handleCall}>
                        <Phone className="h-3 w-3 mr-1" />
                        Ligar
                      </Button>
                      {call.clientWhatsApp && (
                        <Button size="sm" variant="outline" onClick={handleWhatsApp}>
                          <MessageCircle className="h-3 w-3 mr-1" />
                          WhatsApp
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Endereço</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium flex-1">{call.address}</p>
                    <Button size="sm" variant="outline" onClick={handleMaps}>
                      <MapPin className="h-3 w-3 mr-1" />
                      Abrir no Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detalhes do Serviço */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Detalhes do Serviço
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Data/Hora Agendada</p>
                    <p className="font-medium">
                      {format(new Date(call.scheduledDate), 'dd/MM/yyyy')} às {call.scheduledTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo de Serviço</p>
                    <p className="font-medium">{call.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Equipamento</p>
                    <p className="font-medium">{call.equipment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Acordado</p>
                    <p className="font-medium">R$ {call.agreedValue.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Forma de Pagamento</p>
                    <p className="font-medium capitalize">{call.paymentMethod.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status do Pagamento</p>
                    <Badge variant={call.paymentStatus === 'released' ? 'default' : 'secondary'}>
                      {call.paymentStatus === 'awaiting' && 'Aguardando'}
                      {call.paymentStatus === 'retained' && 'Retido'}
                      {call.paymentStatus === 'released' && 'Liberado'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Observações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Observações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {call.clientNotes && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Observações do Cliente:</p>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm">{call.clientNotes}</p>
                    </div>
                  </div>
                )}
                
                {call.technicianNotes && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Suas Observações:</p>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm">{call.technicianNotes}</p>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Adicionar Observação:</p>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Digite suas observações sobre este chamado..."
                      value={technicianNotes}
                      onChange={(e) => setTechnicianNotes(e.target.value)}
                    />
                    <Button onClick={handleSaveNotes} disabled={!technicianNotes.trim()}>
                      Salvar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Timeline do Atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {call.timeline.map((item, index) => (
                    <div key={item.id} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                      <div className="text-2xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{item.status}</h4>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(item.date), 'dd/MM/yyyy')} às {item.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Histórico do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent>
                {call.callHistory.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Este é o primeiro atendimento para este cliente.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {call.callHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.serviceType}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(item.date), 'dd/MM/yyyy')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {item.value.toFixed(2)}</p>
                          <Badge variant="outline" className="text-xs">
                            {statusConfig[item.status].label}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {call.negotiation && (
            <TabsContent value="negotiation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Negociação em Andamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                      <h4 className="font-medium text-orange-800">Motivo da Negociação</h4>
                      <p className="text-sm text-orange-700 mt-1">{call.negotiation.reason}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Histórico de Mensagens</h4>
                      {call.negotiation.messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`p-3 rounded-lg ${
                            message.sender === 'technician' 
                              ? 'bg-blue-50 ml-8' 
                              : message.sender === 'client'
                              ? 'bg-gray-50 mr-8'
                              : 'bg-yellow-50 mx-4'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium capitalize">
                              {message.sender === 'technician' ? 'Você' : 
                               message.sender === 'client' ? 'Cliente' : 'Suporte'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(message.timestamp), 'dd/MM HH:mm')}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceCallDetailsModal;
