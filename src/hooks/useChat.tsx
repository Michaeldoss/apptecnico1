
import { useState, useEffect } from 'react';
import { ChatMessage, ChatConversation } from '@/types/chat';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

// Dados de exemplo para conversas
const mockConversations: ChatConversation[] = [
  {
    id: 1,
    participantId: 101,
    participantName: 'Carlos Silva',
    lastMessage: 'Oi, preciso de ajuda com minha plotter eco solvente',
    lastMessageTime: '10:30',
    unreadCount: 2,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    participantId: 102,
    participantName: 'Ana Ferreira',
    lastMessage: 'Quando você poderia vir verificar minha máquina de corte?',
    lastMessageTime: '09:15',
    unreadCount: 0,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    participantId: 103,
    participantName: 'Roberto Mendes',
    lastMessage: 'Obrigado pelo serviço, ficou excelente!',
    lastMessageTime: 'Ontem',
    unreadCount: 1,
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
];

// Dados de exemplo para mensagens
const mockMessages: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      senderId: 101,
      senderName: 'Carlos Silva',
      receiverId: 1,
      content: 'Olá, tudo bem? Tenho uma plotter eco solvente que não está funcionando corretamente.',
      timestamp: '2023-07-29T10:15:00',
      read: true,
    },
    {
      id: 2,
      senderId: 101,
      senderName: 'Carlos Silva',
      receiverId: 1,
      content: 'A máquina está apresentando problemas na impressão, as cores estão saindo distorcidas.',
      timestamp: '2023-07-29T10:16:00',
      read: true,
    },
    {
      id: 3,
      senderId: 1,
      senderName: 'Técnico Demo',
      receiverId: 101,
      content: 'Olá Carlos, posso verificar sua plotter amanhã pela manhã. Pode ser?',
      timestamp: '2023-07-29T10:20:00',
      read: true,
    },
    {
      id: 4,
      senderId: 101,
      senderName: 'Carlos Silva',
      receiverId: 1,
      content: 'Perfeito! Que horas você poderia vir?',
      timestamp: '2023-07-29T10:29:00',
      read: true,
    },
    {
      id: 5,
      senderId: 101,
      senderName: 'Carlos Silva',
      receiverId: 1,
      content: 'Também preciso de uma manutenção preventiva na minha plotter UV.',
      timestamp: '2023-07-29T10:30:00',
      read: false,
    },
    {
      id: 6,
      senderId: 101,
      senderName: 'Carlos Silva',
      receiverId: 1,
      content: 'Pode me enviar um orçamento para esse serviço adicional?',
      timestamp: '2023-07-29T10:30:30',
      read: false,
      serviceRequest: {
        id: 101,
        type: 'Manutenção Preventiva',
        equipmentType: 'Plotter UV flexivel'
      }
    }
  ],
  2: [
    {
      id: 7,
      senderId: 102,
      senderName: 'Ana Ferreira',
      receiverId: 1,
      content: 'Bom dia, gostaria de saber se você faz manutenção em plotters de recorte?',
      timestamp: '2023-07-29T09:10:00',
      read: true,
    },
    {
      id: 8,
      senderId: 1,
      senderName: 'Técnico Demo',
      receiverId: 102,
      content: 'Bom dia Ana, sim, trabalho com manutenção de plotters de recorte. Qual o modelo do seu equipamento?',
      timestamp: '2023-07-29T09:15:00',
      read: true,
    },
    {
      id: 9,
      senderId: 102,
      senderName: 'Ana Ferreira',
      receiverId: 1,
      content: 'É um modelo XYZ123. Quando você poderia vir verificar minha máquina de corte?',
      timestamp: '2023-07-29T09:15:30',
      read: true,
    },
  ],
  3: [
    {
      id: 10,
      senderId: 103,
      senderName: 'Roberto Mendes',
      receiverId: 1,
      content: 'Olá, minha CNC Router está com problema no cabeçote. Pode me ajudar?',
      timestamp: '2023-07-28T14:30:00',
      read: true,
    },
    {
      id: 11,
      senderId: 1,
      senderName: 'Técnico Demo',
      receiverId: 103,
      content: 'Boa tarde Roberto, posso sim. Vou precisar verificar presencialmente. Tem disponibilidade essa semana?',
      timestamp: '2023-07-28T14:45:00',
      read: true,
    },
    {
      id: 12,
      senderId: 103,
      senderName: 'Roberto Mendes',
      receiverId: 1,
      content: 'Tenho disponibilidade na quinta-feira pela manhã.',
      timestamp: '2023-07-28T15:00:00',
      read: true,
    },
    {
      id: 13,
      senderId: 1,
      senderName: 'Técnico Demo',
      receiverId: 103,
      content: 'Perfeito, agendado para quinta às 10h.',
      timestamp: '2023-07-28T15:15:00',
      read: true,
    },
    {
      id: 14,
      senderId: 103,
      senderName: 'Roberto Mendes',
      receiverId: 1,
      content: 'Obrigado pelo serviço, ficou excelente!',
      timestamp: '2023-07-29T08:30:00',
      read: false,
    }
  ],
};

export const useChat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [unreadTotal, setUnreadTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // Calcula o total de mensagens não lidas
  useEffect(() => {
    const total = conversations.reduce((sum, convo) => sum + convo.unreadCount, 0);
    setUnreadTotal(total);
  }, [conversations]);

  // Carrega as mensagens da conversa ativa
  useEffect(() => {
    if (activeConversation) {
      setIsLoading(true);
      // Simula a chamada de API
      setTimeout(() => {
        const conversationMessages = mockMessages[activeConversation] || [];
        setMessages(conversationMessages);
        setIsLoading(false);
        
        // Marca as mensagens como lidas
        markMessagesAsRead(activeConversation);
      }, 500);
    }
  }, [activeConversation]);

  // Marca mensagens como lidas
  const markMessagesAsRead = (conversationId: number) => {
    // Atualiza as mensagens
    if (mockMessages[conversationId]) {
      mockMessages[conversationId] = mockMessages[conversationId].map(msg => 
        msg.senderId !== user?.id ? { ...msg, read: true } : msg
      );
    }

    // Atualiza a contagem de não lidas na conversa
    setConversations(prev => 
      prev.map(convo => 
        convo.id === conversationId ? { ...convo, unreadCount: 0 } : convo
      )
    );
  };

  // Envia uma nova mensagem
  const sendMessage = (content: string) => {
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
    };

    // Adiciona a mensagem ao mock de mensagens
    if (mockMessages[activeConversation]) {
      mockMessages[activeConversation] = [...mockMessages[activeConversation], newMessage];
    } else {
      mockMessages[activeConversation] = [newMessage];
    }

    // Atualiza o estado das mensagens
    setMessages(prev => [...prev, newMessage]);

    // Atualiza a última mensagem na conversa
    setConversations(prev =>
      prev.map(convo =>
        convo.id === activeConversation
          ? {
              ...convo,
              lastMessage: content,
              lastMessageTime: 'Agora',
            }
          : convo
      )
    );

    toast({
      title: "Mensagem enviada",
      description: `Mensagem enviada para ${conversation.participantName}`,
    });
  };

  // Lida com solicitações de serviço
  const handleServiceRequest = (message: ChatMessage) => {
    if (!message.serviceRequest) return;

    toast({
      title: "Solicitação de serviço",
      description: `Nova solicitação de serviço: ${message.serviceRequest.type} para ${message.serviceRequest.equipmentType}`,
    });

    // Aqui você poderia adicionar lógica para criar um novo serviço no sistema
    // ou redirecionar o técnico para a página de criação de serviço
  };

  return {
    conversations,
    messages,
    activeConversation,
    unreadTotal,
    isLoading,
    setActiveConversation,
    sendMessage,
    handleServiceRequest,
  };
};
