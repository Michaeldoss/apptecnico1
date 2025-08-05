import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, ChatConversation, TechnicianSettings } from '@/types/chat';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

// Dados fake removidos - array vazio
const mockConversations: ChatConversation[] = [];

// Mensagens mockadas - vazias
const mockMessages: Record<number, ChatMessage[]> = {};

export const useChat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [unreadTotal, setUnreadTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<TechnicianSettings>({
    responseTimeLimit: 30, // 30 minutos
    whatsappPhone: '(11) 99999-9999',
    workingHours: {
      start: '08:00',
      end: '18:00',
    },
    pauseNotifications: false,
  });

  // Calcula total de mensagens não lidas
  useEffect(() => {
    const total = conversations.reduce((sum, convo) => sum + convo.unreadCount, 0);
    setUnreadTotal(total);
  }, [conversations]);

  // Carrega mensagens da conversa ativa
  useEffect(() => {
    if (activeConversation) {
      setIsLoading(true);
      setTimeout(() => {
        const conversationMessages = mockMessages[activeConversation] || [];
        setMessages(conversationMessages);
        setIsLoading(false);
      }, 300);
    }
  }, [activeConversation]);

  // Verifica mensagens pendentes e envia lembretes
  useEffect(() => {
    if (settings.pauseNotifications) return;

    const checkPendingMessages = () => {
      const now = new Date();
      
      conversations.forEach(conversation => {
        if (conversation.needsResponse && !conversation.reminderSent) {
          const lastMessageTime = new Date(conversation.lastResponseTime || now);
          const timeDiff = now.getTime() - lastMessageTime.getTime();
          const minutesPassed = timeDiff / (1000 * 60);

          if (minutesPassed >= settings.responseTimeLimit) {
            sendWhatsAppReminder(conversation);
            
            // Marca como lembrete enviado
            setConversations(prev => 
              prev.map(conv => 
                conv.id === conversation.id 
                  ? { ...conv, reminderSent: true }
                  : conv
              )
            );
          }
        }
      });
    };

    const interval = setInterval(checkPendingMessages, 60000); // Verifica a cada minuto
    return () => clearInterval(interval);
  }, [conversations, settings]);

  const sendWhatsAppReminder = (conversation: ChatConversation) => {
    const message = `🔔 Você tem mensagens de ${conversation.participantName} aguardando resposta no aplicativo técnico. Acesse sua agenda de mensagens para visualizar e responder.`;
    
    // Simula envio do lembrete via WhatsApp
    console.log(`Enviando lembrete via WhatsApp para ${settings.whatsappPhone}:`, message);
    
    toast({
      title: "Lembrete enviado",
      description: `WhatsApp enviado para ${settings.whatsappPhone} sobre mensagem de ${conversation.participantName}`,
    });

    // Em produção, aqui seria feita a integração com API do WhatsApp
    // Por exemplo: sendWhatsAppMessage(settings.whatsappPhone, message);
  };

  const handleSelectConversation = useCallback((id: number) => {
    setActiveConversation(id);
  }, []);

  const handleSendMessage = useCallback((content: string) => {
    if (!activeConversation || !content.trim()) return;

    const conversation = conversations.find(c => c.id === activeConversation);
    if (!conversation) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      senderId: user?.id || 0,
      senderName: user?.name || 'Técnico',
      receiverId: conversation.participantId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
      delivered: true,
      type: 'text',
    };

    // Adiciona mensagem ao mock
    if (mockMessages[activeConversation]) {
      mockMessages[activeConversation] = [...mockMessages[activeConversation], newMessage];
    } else {
      mockMessages[activeConversation] = [newMessage];
    }

    setMessages(prev => [...prev, newMessage]);

    // Atualiza conversa
    setConversations(prev =>
      prev.map(convo =>
        convo.id === activeConversation
          ? {
              ...convo,
              lastMessage: content,
              lastMessageTime: 'Agora',
              needsResponse: false,
              reminderSent: false,
            }
          : convo
      )
    );

    toast({
      title: "Mensagem enviada",
      description: `Mensagem enviada para ${conversation.participantName}`,
    });
  }, [activeConversation, conversations, user]);

  const handleMarkAsRead = useCallback((conversationId: number) => {
    // Marca mensagens como lidas
    if (mockMessages[conversationId]) {
      mockMessages[conversationId] = mockMessages[conversationId].map(msg => 
        msg.receiverId === (user?.id || 0) ? { ...msg, read: true } : msg
      );
    }

    // Atualiza contagem de não lidas
    setConversations(prev => 
      prev.map(convo => 
        convo.id === conversationId ? { ...convo, unreadCount: 0 } : convo
      )
    );
  }, [user?.id]);

  const handleUpdateSettings = useCallback((newSettings: TechnicianSettings) => {
    setSettings(newSettings);
    
    toast({
      title: "Configurações atualizadas",
      description: "Suas configurações de resposta foram salvas",
    });
  }, []);

  return {
    conversations,
    messages,
    activeConversation,
    unreadTotal,
    isLoading,
    settings,
    setActiveConversation: handleSelectConversation,
    sendMessage: handleSendMessage,
    handleServiceRequest: () => {}, // Manter compatibilidade
    onMarkAsRead: handleMarkAsRead,
    onUpdateSettings: handleUpdateSettings,
  };
};