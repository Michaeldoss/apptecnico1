
import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, MapPin, Settings, PauseCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ChatMessage, ChatConversation, TechnicianSettings } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface WhatsAppChatProps {
  conversations: ChatConversation[];
  activeConversation: number | null;
  messages: ChatMessage[];
  currentUserId: number;
  settings: TechnicianSettings;
  onSelectConversation: (id: number) => void;
  onSendMessage: (content: string) => void;
  onUpdateSettings: (settings: TechnicianSettings) => void;
  onMarkAsRead: (conversationId: number) => void;
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  conversations,
  activeConversation,
  messages,
  currentUserId,
  settings,
  onSelectConversation,
  onSendMessage,
  onUpdateSettings,
  onMarkAsRead
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find(c => c.id === activeConversation);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (activeConversation) {
      onMarkAsRead(activeConversation);
    }
  }, [activeConversation, onMarkAsRead]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageStatus = (message: ChatMessage) => {
    if (message.senderId !== currentUserId) return null;
    
    if (message.read) {
      return <span className="text-blue-500">✓✓</span>;
    } else if (message.delivered) {
      return <span className="text-gray-500">✓✓</span>;
    } else {
      return <span className="text-gray-400">✓</span>;
    }
  };

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank');
  };

  const makeCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="flex h-[600px] bg-white border rounded-lg overflow-hidden">
      {/* Lista de Conversas */}
      <div className="w-1/3 border-r bg-gray-50">
        <div className="p-4 bg-green-600 text-white flex items-center justify-between">
          <h3 className="font-semibold">Conversas</h3>
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
                <Settings size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurações de Resposta</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Tempo limite para resposta</Label>
                  <Select 
                    value={settings.responseTimeLimit.toString()} 
                    onValueChange={(value) => 
                      onUpdateSettings({ ...settings, responseTimeLimit: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="240">4 horas</SelectItem>
                      <SelectItem value="1440">24 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>WhatsApp para lembretes</Label>
                  <Input 
                    value={settings.whatsappPhone}
                    onChange={(e) => 
                      onUpdateSettings({ ...settings, whatsappPhone: e.target.value })
                    }
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={settings.pauseNotifications}
                    onCheckedChange={(checked) => 
                      onUpdateSettings({ ...settings, pauseNotifications: checked })
                    }
                  />
                  <Label>Pausar notificações</Label>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {settings.pauseNotifications && (
          <div className="p-2 bg-yellow-100 border-b flex items-center gap-2 text-sm">
            <PauseCircle size={16} className="text-yellow-600" />
            <span className="text-yellow-800">Notificações pausadas</span>
          </div>
        )}

        <div className="overflow-y-auto h-full">
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              className={cn(
                "p-3 border-b cursor-pointer hover:bg-gray-100 transition-colors",
                activeConversation === conversation.id ? "bg-green-100" : ""
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">
                      {conversation.participantName}
                    </span>
                    {conversation.needsResponse && (
                      <Clock size={14} className="text-red-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-gray-500">
                    {conversation.lastMessageTime}
                  </span>
                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-green-600 text-white text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Painel de Chat */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header da Conversa */}
            <div className="p-4 bg-green-600 text-white flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{selectedConversation.participantName}</h3>
                <p className="text-sm opacity-90">
                  Online agora
                </p>
              </div>
              <div className="flex gap-2">
                {selectedConversation.participantPhone && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white hover:bg-green-700"
                      onClick={() => makeCall(selectedConversation.participantPhone!)}
                    >
                      <Phone size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white hover:bg-green-700"
                      onClick={() => openWhatsApp(selectedConversation.participantPhone!)}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.senderId === currentUserId ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg p-3",
                        message.senderId === currentUserId
                          ? "bg-green-500 text-white rounded-br-none"
                          : "bg-white shadow-sm rounded-bl-none"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">
                          {formatMessageTime(message.timestamp)}
                        </span>
                        {getMessageStatus(message)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Campo de Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <svg className="w-24 h-24 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h3 className="text-lg font-medium mb-2">Bem-vindo ao Chat</h3>
              <p>Selecione uma conversa para começar a conversar com seus clientes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppChat;
