import React, { useState, useEffect, useRef } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Send, Calendar, CheckCircle, Clock, Wrench, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  content: string;
  sender: 'client' | 'technician' | 'system';
  timestamp: Date;
  read: boolean;
}

interface ServiceAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  equipment: string;
  issue: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  status: 'pending' | 'confirmed' | 'completed';
}

const SimulationDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [appointment, setAppointment] = useState<ServiceAppointment | null>(null);
  const [simulationStep, setSimulationStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulação automática
  useEffect(() => {
    const simulationSteps = [
      // Passo 1: Cliente envia mensagem inicial
      () => {
        setTimeout(() => {
          addMessage({
            content: 'Olá! Preciso de ajuda urgente com minha plotter Polar cabeça i3200. Está com defeito na limpeza dos bicos e não consigo mais imprimir direito.',
            sender: 'client',
          });
        }, 1000);
      },
      // Passo 2: Técnico responde
      () => {
        setTimeout(() => {
          addMessage({
            content: 'Olá! Posso te ajudar sim. Me conte mais sobre o problema: quando começou esse defeito? Você já tentou fazer a limpeza manual?',
            sender: 'technician',
          });
        }, 3000);
      },
      // Passo 3: Cliente detalha mais
      () => {
        setTimeout(() => {
          addMessage({
            content: 'Começou há uns 3 dias. Tentei fazer limpeza manual mas não resolveu. Também fiz a limpeza pelo software mas continua saindo listras na impressão.',
            sender: 'client',
          });
        }, 5000);
      },
      // Passo 4: Técnico sugere visita
      () => {
        setTimeout(() => {
          addMessage({
            content: 'Entendi. Pelo que você descreveu, pode ser entupimento mais sério ou problema no sistema de limpeza automática. Vou precisar fazer uma visita técnica para diagnosticar corretamente. Você tem disponibilidade amanhã pela manhã?',
            sender: 'technician',
          });
        }, 7500);
      },
      // Passo 5: Cliente aceita
      () => {
        setTimeout(() => {
          addMessage({
            content: 'Sim, amanhã de manhã pode ser! Quanto ficaria a visita?',
            sender: 'client',
          });
        }, 9500);
      },
      // Passo 6: Técnico informa valores
      () => {
        setTimeout(() => {
          addMessage({
            content: 'A visita técnica é R$ 150,00. Já inclui diagnóstico completo. Se precisar de peças, faço o orçamento separado. Pode ser às 9h da manhã?',
            sender: 'technician',
          });
        }, 11500);
      },
      // Passo 7: Cliente confirma
      () => {
        setTimeout(() => {
          addMessage({
            content: 'Perfeito! Pode vir às 9h sim. Meu endereço é Rua das Flores, 123 - Jardim Primavera, São Paulo',
            sender: 'client',
          });
        }, 13500);
      },
      // Passo 8: Sistema cria agendamento
      () => {
        setTimeout(() => {
          const newAppointment: ServiceAppointment = {
            id: 'OS-2024-001',
            clientName: 'João Silva',
            clientPhone: '(11) 98765-4321',
            equipment: 'Plotter Polar cabeça i3200',
            issue: 'Defeito na limpeza dos bicos - saindo listras na impressão',
            scheduledDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            scheduledTime: '09:00',
            address: 'Rua das Flores, 123 - Jardim Primavera, São Paulo - SP',
            status: 'confirmed',
          };
          setAppointment(newAppointment);
          
          addMessage({
            content: '✅ Agendamento confirmado!\n\n📋 OS: OS-2024-001\n👤 Cliente: João Silva\n🔧 Equipamento: Plotter Polar cabeça i3200\n⚠️ Problema: Defeito na limpeza dos bicos\n📅 Data: Amanhã\n⏰ Horário: 09:00\n📍 Local: Rua das Flores, 123',
            sender: 'system',
          });

          toast({
            title: "✅ Agendamento criado!",
            description: "Visita técnica agendada para amanhã às 09:00",
          });
        }, 15500);
      },
    ];

    if (simulationStep < simulationSteps.length) {
      simulationSteps[simulationStep]();
      setSimulationStep(simulationStep + 1);
    }
  }, [simulationStep]);

  const addMessage = (msg: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMsg: Message = {
      ...msg,
      id: Date.now(),
      timestamp: new Date(),
      read: false,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage({
        content: newMessage,
        sender: 'technician',
      });
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const resetSimulation = () => {
    setMessages([]);
    setAppointment(null);
    setSimulationStep(0);
  };

  return (
    <TechnicianLayout title="Simulação - Chat & Agendamento">
      <div className="space-y-6">
        {/* Header com controles */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-blue-600" />
              Simulação: Agendamento via Chat
            </CardTitle>
            <CardDescription>
              Demonstração de como um cliente solicita manutenção e o técnico agenda o serviço
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={resetSimulation} variant="outline" size="sm">
              🔄 Reiniciar Simulação
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Painel de Chat */}
          <Card className="flex flex-col h-[700px]">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Chat com Cliente</CardTitle>
                  <p className="text-sm text-green-100 mt-1">João Silva</p>
                </div>
                <Badge className="bg-white text-green-600">Online</Badge>
              </div>
            </CardHeader>

            {/* Mensagens */}
            <CardContent className="flex-1 overflow-y-auto bg-gray-50 p-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>Aguardando mensagem do cliente...</p>
                    <div className="mt-4 animate-pulse">
                      <div className="h-2 bg-gray-200 rounded w-12 mx-auto"></div>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex animate-fade-in',
                        message.sender === 'technician' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[75%] rounded-xl p-4 shadow-sm',
                          message.sender === 'client' && 'bg-white border border-gray-200',
                          message.sender === 'technician' && 'bg-gradient-to-br from-green-500 to-green-600 text-white',
                          message.sender === 'system' && 'bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full max-w-full text-center'
                        )}
                      >
                        {message.sender === 'system' && (
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-semibold">Sistema</span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <div className="flex items-center justify-end gap-1 mt-2">
                          <span className={cn(
                            "text-xs",
                            message.sender === 'client' ? 'text-gray-500' : 'text-white/80'
                          )}>
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input de mensagem */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite uma mensagem..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!newMessage.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </Card>

          {/* Painel de Agendamento */}
          <div className="space-y-6">
            {/* Card de Ordem de Serviço */}
            {appointment ? (
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      Agendamento Confirmado
                    </CardTitle>
                    <Badge className="bg-green-600 text-white">
                      {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-green-100 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Ordem de Serviço</p>
                      <p className="text-lg font-bold text-green-700">{appointment.id}</p>
                    </div>

                    <div className="border-t pt-3 space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Data e Horário</p>
                          <p className="font-semibold">
                            {new Date(appointment.scheduledDate).toLocaleDateString('pt-BR')} às {appointment.scheduledTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-100">
                          <Wrench className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Equipamento</p>
                          <p className="font-semibold">{appointment.equipment}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-red-100">
                          <Clock className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Problema Reportado</p>
                          <p className="text-sm">{appointment.issue}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-100">
                          <MapPin className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Endereço</p>
                          <p className="text-sm">{appointment.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-2">Dados do Cliente</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Nome:</span> {appointment.clientName}</p>
                      <p><span className="font-medium">Telefone:</span> {appointment.clientPhone}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Confirmar Presença
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Enviar por WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg text-gray-700 mb-2">
                    Aguardando Agendamento
                  </h3>
                  <p className="text-sm text-gray-500">
                    A ordem de serviço será criada automaticamente quando o cliente confirmar
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Informações adicionais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Sobre esta Simulação</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 text-gray-600">
                <p>✅ Chat em tempo real com cliente</p>
                <p>✅ Criação automática de ordem de serviço</p>
                <p>✅ Todos os detalhes do equipamento registrados</p>
                <p>✅ Endereço e horário confirmados</p>
                <p>✅ Notificação automática para ambas as partes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default SimulationDemo;
