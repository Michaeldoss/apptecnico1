
import React from 'react';
import { Link } from 'react-router-dom';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, DollarSign, MessageSquare } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useNotifications } from '@/hooks/useNotifications';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { useAuth } from '@/context/AuthContext';

const TechnicianDashboard = () => {
  // Dados de exemplo
  const pendingServices = 5;
  const completedServices = 12;
  const scheduledServices = 3;
  const monthlyEarnings = 'R$ 2.850,00';
  
  const { unreadCount } = useNotifications();
  const { user } = useAuth();
  const { conversations, messages } = useChat();
  
  // Obter as últimas 3 mensagens não lidas
  const recentMessages = messages
    .filter(msg => !msg.read && msg.senderId !== user?.id)
    .slice(0, 3);
  
  // Serviços recentes de exemplo
  const recentServices = [
    {
      id: 1,
      client: 'Carlos Silva',
      serviceType: 'Reparo de Computador',
      date: '20/07/2023',
      status: 'concluído',
    },
    {
      id: 2,
      client: 'Ana Soares',
      serviceType: 'Instalação de Rede',
      date: '18/07/2023',
      status: 'em andamento',
    },
    {
      id: 3,
      client: 'Ricardo Oliveira',
      serviceType: 'Manutenção de Impressora',
      date: '15/07/2023',
      status: 'concluído',
    },
  ];

  return (
    <TechnicianLayout title="Painel do Técnico">
      {/* Cards principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Serviços Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingServices}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ontem
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Serviços Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedServices}</div>
            <p className="text-xs text-muted-foreground">
              +3 neste mês
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Serviços Agendados</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledServices}</div>
            <p className="text-xs text-muted-foreground">
              Para os próximos 7 dias
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ganhos do Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyEarnings}</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Dividir em duas colunas para mensagens e serviços recentes */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Mensagens recentes */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center">
              <h2 className="font-semibold">Mensagens Recentes</h2>
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full h-5 px-2">
                  {unreadCount} {unreadCount === 1 ? 'nova' : 'novas'}
                </span>
              )}
            </div>
            <Link to="/tecnico/chat">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <MessageSquare size={16} />
                Ver Todas
              </Button>
            </Link>
          </div>
          <div className="divide-y">
            {recentMessages.length > 0 ? (
              recentMessages.map((message) => (
                <div key={message.id} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{message.senderName}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm truncate">{message.content}</p>
                  {message.serviceRequest && (
                    <div className="mt-1">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Nova solicitação
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Nenhuma mensagem não lida
              </div>
            )}
            
            {recentMessages.length === 0 && conversations.length > 0 && (
              <div className="p-4 text-center">
                <Link to="/tecnico/chat">
                  <Button variant="secondary" size="sm">
                    Ver todas as conversas
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Lista de serviços recentes */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="font-semibold">Serviços Recentes</h2>
            <Link to="/tecnico/servicos">
              <Button variant="outline" size="sm">Ver Todos</Button>
            </Link>
          </div>
          <div className="divide-y">
            {recentServices.map((service) => (
              <div key={service.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{service.client}</p>
                    <p className="text-sm text-muted-foreground">{service.serviceType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{service.date}</p>
                    <span 
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        service.status === 'concluído' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianDashboard;
