
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/hooks/useChat';
import WhatsAppChat from '@/components/chat/WhatsAppChat';

const TechnicianChat = () => {
  const { clearNotification } = useNotifications();
  const { user } = useAuth();
  const { 
    conversations, 
    messages, 
    activeConversation, 
    isLoading,
    settings,
    setActiveConversation, 
    sendMessage,
    onMarkAsRead,
    onUpdateSettings
  } = useChat();

  // Limpa as notificações quando acessa a página de chat
  React.useEffect(() => {
    clearNotification();
  }, [clearNotification]);

  return (
    <TechnicianLayout title="Mensagens">
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">
            💬 Sistema de Chat Integrado
          </h3>
          <p className="text-green-700 text-sm mb-3">
            Converse diretamente com seus clientes em tempo real. 
            Configure lembretes automáticos via WhatsApp para não perder nenhuma mensagem importante.
          </p>
          <div className="flex gap-4 text-xs text-green-600">
            <span>✓ Interface similar ao WhatsApp</span>
            <span>✓ Lembretes automáticos</span>
            <span>✓ Status de leitura</span>
            <span>✓ Ligação direta</span>
          </div>
        </div>
        
        <WhatsAppChat
          conversations={conversations}
          activeConversation={activeConversation}
          messages={messages}
          currentUserId={user?.id || 0}
          settings={settings}
          onSelectConversation={setActiveConversation}
          onSendMessage={sendMessage}
          onUpdateSettings={onUpdateSettings}
          onMarkAsRead={onMarkAsRead}
        />
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianChat;
