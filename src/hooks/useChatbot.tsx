
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
  quickReplies?: string[];
  showFeedback?: boolean;
  feedbackGiven?: boolean;
}

const FAQ_RESPONSES = {
  'agendar técnico': {
    response: 'Para agendar um técnico, você pode:\n\n1. Navegar em "Encontrar Técnicos"\n2. Filtrar por especialidade e localização\n3. Escolher o profissional ideal\n4. Agendar o horário disponível\n\nPosso te ajudar com alguma especialidade específica?',
    quickReplies: ['Ver técnicos disponíveis', 'Tipos de serviço', 'Falar com humano']
  },
  'tipos de serviços': {
    response: 'Oferecemos diversos serviços técnicos:\n\n• Instalação & Manutenção de equipamentos\n• Impressoras Industriais\n• Automação Industrial\n• Sistemas Hidráulicos\n• Equipamentos de Solda\n• Manutenção Preventiva\n\nQual tipo de equipamento precisa de assistência?',
    quickReplies: ['Impressoras', 'Automação', 'Hidráulicos', 'Ver todos']
  },
  'formas de pagamento': {
    response: 'Aceitamos as seguintes formas de pagamento:\n\n💳 Cartão de crédito/débito\n🏦 PIX (desconto de 5%)\n📄 Boleto bancário\n💰 Transferência bancária\n\nTodos os pagamentos são seguros e processados via gateway criptografado.',
    quickReplies: ['Solicitar orçamento', 'Ver preços', 'Falar com humano']
  },
  'preços': {
    response: 'Os preços variam conforme o tipo de serviço:\n\n🔧 Consulta técnica: R$ 80-120\n⚙️ Manutenção preventiva: R$ 150-300\n🔨 Instalação de equipamentos: R$ 200-500\n🛠️ Reparo especializado: Sob consulta\n\n*Valores podem variar por região e complexidade',
    quickReplies: ['Solicitar orçamento', 'Agendar técnico', 'Falar com humano']
  },
  'técnicos disponíveis': {
    response: 'Temos técnicos especializados em várias regiões:\n\n📍 São Paulo: 15+ técnicos\n📍 Rio de Janeiro: 12+ técnicos\n📍 Belo Horizonte: 8+ técnicos\n📍 Outras cidades: Consulte disponibilidade\n\nEm qual cidade você precisa do atendimento?',
    quickReplies: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Outra cidade']
  }
};

const getAIResponse = (message: string): { response: string; quickReplies?: string[] } => {
  const lowerMessage = message.toLowerCase();

  // Verifica palavras-chave para respostas automáticas
  for (const [key, value] of Object.entries(FAQ_RESPONSES)) {
    if (lowerMessage.includes(key) || 
        key.split(' ').some(word => lowerMessage.includes(word))) {
      return value;
    }
  }

  // Verificações específicas
  if (lowerMessage.includes('boleto') || lowerMessage.includes('pagamento')) {
    return FAQ_RESPONSES['formas de pagamento'];
  }

  if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('custo')) {
    return FAQ_RESPONSES['preços'];
  }

  if (lowerMessage.includes('são paulo') || lowerMessage.includes('sp')) {
    return {
      response: 'Em São Paulo temos mais de 15 técnicos especializados disponíveis! Eles cobrem todas as regiões da Grande SP e trabalham com diversos tipos de equipamentos industriais.\n\nGostaria de ver os técnicos disponíveis na sua região específica?',
      quickReplies: ['Ver técnicos SP', 'Agendar agora', 'Tipos de serviço']
    };
  }

  // Resposta padrão quando não entende
  return {
    response: 'Desculpe, não consegui entender exatamente sua dúvida. Posso te ajudar com:\n\n• Agendamento de técnicos\n• Informações sobre serviços\n• Formas de pagamento\n• Consulta de preços\n\nOu você pode falar diretamente com um de nossos atendentes!',
    quickReplies: ['Agendar técnico', 'Ver preços', 'Tipos de serviço', 'Falar com humano']
  };
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Olá! 👋 Sou o assistente virtual da AtendaJá. Como posso te ajudar hoje?',
      isBot: true,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      quickReplies: ['Agendar técnico', 'Ver preços', 'Tipos de serviço', 'Falar com humano']
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    'Agendar técnico', 'Ver preços', 'Tipos de serviço', 'Falar com humano'
  ]);
  const [attemptCount, setAttemptCount] = useState(0);

  const sendMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setQuickReplies([]);
    setIsTyping(true);

    // Simula delay de digitação
    setTimeout(() => {
      const aiResponse = getAIResponse(content);
      
      // Verifica se precisa escalar para humano
      if (content.toLowerCase().includes('falar com humano') || 
          content.toLowerCase().includes('atendente') ||
          attemptCount >= 2) {
        
        const humanResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: '🤝 Entendi! Vou conectar você com um de nossos atendentes humanos agora.\n\nEm breve um especialista entrará em contato para te ajudar. O histórico da nossa conversa será mantido.\n\n⏱️ Tempo médio de resposta: 2-5 minutos',
          isBot: true,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          quickReplies: ['Aguardar atendente', 'Voltar ao chat automático']
        };

        setMessages(prev => [...prev, humanResponse]);
        setQuickReplies(['Aguardar atendente', 'Voltar ao chat automático']);
        setAttemptCount(0);
        
        toast({
          title: "Conectando com atendente",
          description: "Um especialista entrará em contato em breve.",
        });
      } else {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: aiResponse.response,
          isBot: true,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          quickReplies: aiResponse.quickReplies,
          showFeedback: true
        };

        setMessages(prev => [...prev, botMessage]);
        setQuickReplies(aiResponse.quickReplies || []);
        setAttemptCount(prev => prev + 1);
      }

      setIsTyping(false);
    }, 1500);
  }, [attemptCount]);

  const sendFeedback = useCallback((messageId: string, isPositive: boolean) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedbackGiven: true }
          : msg
      )
    );

    toast({
      title: isPositive ? "Obrigado pelo feedback!" : "Feedback recebido",
      description: isPositive 
        ? "Fico feliz em ter ajudado!" 
        : "Vamos melhorar nosso atendimento. Deseja falar com um atendente?",
    });

    if (!isPositive) {
      setTimeout(() => {
        sendMessage('Falar com humano');
      }, 2000);
    }
  }, [sendMessage]);

  return {
    messages,
    isTyping,
    quickReplies,
    sendMessage,
    sendFeedback
  };
};
