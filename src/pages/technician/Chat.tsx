
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import Chat from '@/components/chat/Chat';
import { useNotifications } from '@/hooks/useNotifications';

const TechnicianChat = () => {
  const { clearNotification } = useNotifications();

  // Limpa as notificações quando acessa a página de chat
  React.useEffect(() => {
    clearNotification();
  }, [clearNotification]);

  return (
    <TechnicianLayout title="Mensagens">
      <div className="space-y-6">
        <p className="text-muted-foreground mb-4">
          Gerencie suas conversas com clientes e receba solicitações de serviço diretamente pelo chat.
        </p>
        
        <Chat />
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianChat;
