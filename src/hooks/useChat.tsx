
import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, ChatConversation, TechnicianSettings } from '@/types/chat';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

// Dados mockados com configurações mais realistas
const mockConversations: ChatConversation[] = [
  {
    id: 1,
    participantId: 101,
    participantName: 'Carlos Silva',
    participantPhone: '(11) 99999-1234',
    lastMessage: 'Preciso de ajuda com minha plotter',
    lastMessageTime: '10:30',
    unreadCount: 2,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    needsResponse: true,
    reminderSent: false,
  },
  {
    id: 2,
    participantId: 102,
    participantName: 'Ana Ferreira',
    participantPhone: '(11) 98888-5678',
    lastMessage: 'Quando você pode vir?',
    lastMessageTime: '09:15',
    unreadCount: 1,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    needsResponse: true,
    reminderSent: false,
  },
  {
    id: 3,
    participantId: 103,
    participantName: 'Roberto Mendes',
    participantPhone: '(11) 97777-9012',
    lastMessage: 'Obrigado pelo excelente serviço!',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    needsResponse: false,
  },
];

// Mensagens mockadas
const mockMessages: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      senderId: 101,
      senderName: 'Carlos Silva',
      receiverId: 1,
      content: 'Oi, minha plotter eco solvente não está funcionando direito',
      timestamp: '2024-01-15T10:15:00',
      read: false,
      delivered: true,
      type: 'text',
    },
    {
      id: 2,
      senderId: 101,
      senderName: 'Carlos Silva',
      receiverId: 1,
      content: 'As cores estão saindo distorcidas, pode me ajudar?',
      timestamp: '2024-01-15T10:30:00',
      read: false,
      delivered: true,
      type: 'text',
    },
  ],
  2: [
    {
      id: 3,
      senderId: 102,
      senderName: 'Ana Ferreira',
      receiverId: 1,
      content: 'Preciso de manutenção na minha plotter de recorte',
      timestamp: '2024-01-15T09:10:00',
      read: true,
      delivered: true,
      type: 'text',
    },
    {
      id: 4,
      senderId: 102,
      senderName: 'Ana Ferreira',
      receiverId: 1,
      content: 'Quando você pode vir verificar?',
      timestamp: '2024-01-15T09:15:00',
      read: false,
      delivered: true,
      type: 'text',
    },
  ],
  3: [
    {
      id: 5,
      senderId: 103,
      senderName: 'Roberto Mendes',
      receiverId: 1,
      content: 'Obrigado pelo excelente serviço na minha CNC!',
      timestamp: '2024-01-14T16:30:00',
      read: true,
      delivered: true,
      type: 'text',
    },
  ],
};

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
