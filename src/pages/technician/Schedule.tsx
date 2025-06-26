
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  MessageCircle, 
  Send,
  Wrench,
  DollarSign,
  Package,
  CheckCheck
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Appointment = {
  id: number;
  client: string;
  serviceType: string;
  date: string;
  time: string;
  address: string;
  status: 'agendado' | 'em andamento' | 'concluído' | 'cancelado';
  notes?: string;
};

type ChatMessage = {
  id: number;
  senderId: number;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'service_request' | 'quote_request' | 'parts_request';
  serviceData?: {
    type: string;
    equipment: string;
    urgency: string;
    preferredDate?: string;
  };
  read: boolean;
};

type ChatConversation = {
  id: number;
  clientId: number;
  clientName: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
};

const TechnicianSchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const isMobile = useIsMobile();
  
  // Dados de exemplo
  const appointments: Appointment[] = [
    {
      id: 1,
      client: 'Mariana Costa',
      serviceType: 'Manutenção de Notebook',
      date: '2023-07-24',
      time: '10:00',
      address: 'Rua Vergueiro, 500, São Paulo - SP',
      status: 'agendado',
    },
    {
      id: 2,
      client: 'Rafael Gomes',
      serviceType: 'Instalação de Software',
      date: '2023-07-24',
      time: '14:30',
      address: 'Av. Paulista, 1000, São Paulo - SP',
      status: 'agendado',
    },
    {
      id: 3,
      client: 'Carla Mendes',
      serviceType: 'Reparo de PC Desktop',
      date: '2023-07-25',
      time: '09:00',
      address: 'Rua Augusta, 1200, São Paulo - SP',
      status: 'agendado',
    },
  ];

  const conversations: ChatConversation[] = [
    {
      id: 1,
      clientId: 101,
      clientName: 'Mariana Costa',
      avatar: 'MC',
      lastMessage: 'Gostaria de agendar uma manutenção',
      lastMessageTime: '10:30',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 2,
      clientId: 102,
      clientName: 'Rafael Gomes',
      avatar: 'RG',
      lastMessage: 'Quanto custa uma instalação de software?',
      lastMessageTime: '09:15',
      unreadCount: 1,
      isOnline: false,
    },
    {
      id: 3,
      clientId: 103,
      clientName: 'Carla Mendes',
      avatar: 'CM',
      lastMessage: 'Preciso de peças para meu PC',
      lastMessageTime: 'Ontem',
      unreadCount: 0,
      isOnline: true,
    },
  ];

  const chatMessages: Record<number, ChatMessage[]> = {
    1: [
      {
        id: 1,
        senderId: 101,
        senderName: 'Mariana Costa',
        content: 'Olá! Meu notebook está com problemas na tela. Você poderia me ajudar?',
        timestamp: '2023-07-24T09:30:00',
        type: 'text',
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        senderName: 'Técnico',
        content: 'Claro! Posso ajudá-la. Pode me contar mais detalhes sobre o problema?',
        timestamp: '2023-07-24T09:35:00',
        type: 'text',
        read: true,
      },
      {
        id: 3,
        senderId: 101,
        senderName: 'Mariana Costa',
        content: 'A tela fica piscando e às vezes fica toda preta. Gostaria de agendar uma visita.',
        timestamp: '2023-07-24T09:40:00',
        type: 'service_request',
        serviceData: {
          type: 'Manutenção de Notebook',
          equipment: 'Notebook Dell Inspiron 15',
          urgency: 'normal',
          preferredDate: '2023-07-25',
        },
        read: false,
      },
      {
        id: 4,
        senderId: 101,
        senderName: 'Mariana Costa',
        content: 'Também gostaria de um orçamento para trocar a tela se necessário.',
        timestamp: '2023-07-24T10:30:00',
        type: 'quote_request',
        serviceData: {
          type: 'Troca de Tela',
          equipment: 'Notebook Dell Inspiron 15',
          urgency: 'normal',
        },
        read: false,
      },
    ]
  };
  
  // Filtrar compromissos pela data selecionada
  const selectedDateISO = date?.toISOString().split('T')[0];
  const filteredAppointments = appointments.filter(
    app => app.date === selectedDateISO
  ).sort((a, b) => a.time.localeCompare(b.time));
  
  // Verificar se existem agendamentos em uma data específica
  const hasAppointment = (date: Date) => {
    const dateISO = date.toISOString().split('T')[0];
    return appointments.some(app => app.date === dateISO);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    
    const conversation = conversations.find(c => c.id === activeChat);
    if (!conversation) return;

    // Aqui você adicionaria a lógica para enviar a mensagem
    console.log('Enviando mensagem:', newMessage, 'para:', conversation.clientName);
    setNewMessage('');
  };

  const handleAcceptServiceRequest = (message: ChatMessage) => {
    console.log('Aceitando solicitação de serviço:', message.serviceData);
    // Aqui você adicionaria a lógica para aceitar e agendar o serviço
  };

  const handleSendQuote = (message: ChatMessage) => {
    console.log('Enviando orçamento para:', message.serviceData);
    // Aqui você adicionaria a lógica para enviar orçamento
  };

  const activeConversation = conversations.find(c => c.id === activeChat);
  const messages = activeChat ? chatMessages[activeChat] || [] : [];
  
  return (
    <TechnicianLayout title="Agenda & Conversas">
      <div className={cn(
        "w-full max-w-7xl mx-auto",
        isMobile ? "px-2 space-y-4" : "px-4"
      )}>
        <div className={cn(
          "grid gap-6",
          isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4"
        )}>
          {/* Seção do Calendário */}
          <div className={cn(
            isMobile ? "order-1" : "lg:col-span-1"
          )}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CalendarIcon className="h-5 w-5" />
                  Calendário
                </CardTitle>
                <CardDescription>
                  Seus agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full pointer-events-auto"
                    modifiers={{
                      booked: (date) => hasAppointment(date),
                    }}
                    modifiersStyles={{
                      booked: { 
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fontWeight: 'bold',
                        color: '#3b82f6',
                      }
                    }}
                  />
                </div>
                
                {/* Agendamentos do Dia */}
                {date && filteredAppointments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">
                      {format(date, "dd 'de' MMMM", { locale: ptBR })}
                    </h4>
                    {filteredAppointments.map((appointment) => (
                      <div key={appointment.id} className="bg-muted/50 p-2 rounded text-xs">
                        <div className="font-medium">{appointment.time} - {appointment.client}</div>
                        <div className="text-muted-foreground">{appointment.serviceType}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sistema de Chat */}
          <div className={cn(
            isMobile ? "order-2" : "lg:col-span-3"
          )}>
            <Card className="h-[600px] flex">
              {/* Lista de Conversas */}
              <div className="w-1/3 border-r flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Conversas
                  </CardTitle>
                </CardHeader>
                <ScrollArea className="flex-1 px-3">
                  <div className="space-y-2">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setActiveChat(conversation.id)}
                        className={cn(
                          "p-3 rounded-lg cursor-pointer transition-colors",
                          activeChat === conversation.id 
                            ? "bg-primary/10 border border-primary/20" 
                            : "hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-sm">
                              {conversation.avatar}
                            </div>
                            {conversation.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-sm truncate">
                                {conversation.clientName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {conversation.lastMessageTime}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {conversation.lastMessage}
                            </div>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Painel de Chat */}
              <div className="flex-1 flex flex-col">
                {activeConversation ? (
                  <>
                    {/* Header do Chat */}
                    <div className="border-b p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-medium text-sm">
                          {activeConversation.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{activeConversation.clientName}</div>
                          <div className="text-xs text-muted-foreground">
                            {activeConversation.isOnline ? 'Online' : 'Offline'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mensagens */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div key={message.id} className={cn(
                            "flex",
                            message.senderId === 1 ? "justify-end" : "justify-start"
                          )}>
                            <div className={cn(
                              "max-w-[80%] rounded-lg px-3 py-2",
                              message.senderId === 1 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted"
                            )}>
                              <div className="text-sm">{message.content}</div>
                              
                              {/* Solicitações Especiais */}
                              {message.type === 'service_request' && message.serviceData && (
                                <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border-l-2 border-blue-500">
                                  <div className="flex items-center gap-2 text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
                                    <Wrench className="h-3 w-3" />
                                    Solicitação de Serviço
                                  </div>
                                  <div className="text-xs space-y-1">
                                    <div><strong>Serviço:</strong> {message.serviceData.type}</div>
                                    <div><strong>Equipamento:</strong> {message.serviceData.equipment}</div>
                                    <div><strong>Urgência:</strong> {message.serviceData.urgency}</div>
                                    {message.serviceData.preferredDate && (
                                      <div><strong>Data Preferida:</strong> {new Date(message.serviceData.preferredDate).toLocaleDateString('pt-BR')}</div>
                                    )}
                                  </div>
                                  {message.senderId !== 1 && (
                                    <Button 
                                      size="sm" 
                                      className="mt-2 w-full text-xs"
                                      onClick={() => handleAcceptServiceRequest(message)}
                                    >
                                      Aceitar e Agendar
                                    </Button>
                                  )}
                                </div>
                              )}

                              {message.type === 'quote_request' && message.serviceData && (
                                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border-l-2 border-green-500">
                                  <div className="flex items-center gap-2 text-xs font-medium text-green-700 dark:text-green-300 mb-1">
                                    <DollarSign className="h-3 w-3" />
                                    Solicitação de Orçamento
                                  </div>
                                  <div className="text-xs space-y-1">
                                    <div><strong>Serviço:</strong> {message.serviceData.type}</div>
                                    <div><strong>Equipamento:</strong> {message.serviceData.equipment}</div>
                                  </div>
                                  {message.senderId !== 1 && (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="mt-2 w-full text-xs"
                                      onClick={() => handleSendQuote(message)}
                                    >
                                      Enviar Orçamento
                                    </Button>
                                  )}
                                </div>
                              )}

                              {message.type === 'parts_request' && message.serviceData && (
                                <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded border-l-2 border-orange-500">
                                  <div className="flex items-center gap-2 text-xs font-medium text-orange-700 dark:text-orange-300 mb-1">
                                    <Package className="h-3 w-3" />
                                    Solicitação de Peças
                                  </div>
                                  <div className="text-xs space-y-1">
                                    <div><strong>Equipamento:</strong> {message.serviceData.equipment}</div>
                                  </div>
                                  {message.senderId !== 1 && (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="mt-2 w-full text-xs"
                                    >
                                      Verificar Disponibilidade
                                    </Button>
                                  )}
                                </div>
                              )}

                              <div className="flex items-center justify-between mt-1">
                                <div className="text-xs opacity-70">
                                  {format(new Date(message.timestamp), 'HH:mm')}
                                </div>
                                {message.senderId === 1 && (
                                  <CheckCheck className={cn(
                                    "h-3 w-3",
                                    message.read ? "text-blue-500" : "opacity-50"
                                  )} />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Input de Mensagem */}
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Digite sua mensagem..."
                          className="min-h-[60px] resize-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          size="icon"
                          className="self-end"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    Selecione uma conversa para começar
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianSchedule;
