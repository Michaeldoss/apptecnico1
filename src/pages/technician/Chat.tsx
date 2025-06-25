
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { useNotifications } from '@/hooks/useNotifications';
import AIChat from '@/components/chatbot/AIChat';

const TechnicianChat = () => {
  const { clearNotification } = useNotifications();
  const [isOpen, setIsOpen] = React.useState(true);

  // Limpa as notificações quando acessa a página de chat
  React.useEffect(() => {
    clearNotification();
  }, [clearNotification]);

  return (
    <TechnicianLayout title="Mensagens">
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            🤖 Novo Sistema de Atendimento com IA
          </h3>
          <p className="text-blue-700 text-sm mb-3">
            Agora seus clientes podem ser atendidos 24/7 por nosso assistente virtual inteligente.
            O sistema escala automaticamente para atendimento humano quando necessário.
          </p>
          <div className="flex gap-2 text-xs text-blue-600">
            <span>✓ Respostas automáticas para dúvidas comuns</span>
            <span>✓ Agendamento inteligente</span>
            <span>✓ Suporte multilíngue</span>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Visualize aqui o painel de atendimento com IA. Os clientes podem iniciar conversas pelo botão flutuante em qualquer página do site.
        </p>
        
        <div className="relative">
          <AIChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
          {!isOpen && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500 mb-4">Preview do Chatbot AI</p>
              <button 
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Abrir Chat de Demonstração
              </button>
            </div>
          )}
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianChat;
