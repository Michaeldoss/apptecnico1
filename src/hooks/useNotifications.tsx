
import { useState, useEffect } from 'react';
import { useChat } from './useChat';

export const useNotifications = () => {
  const { unreadTotal } = useChat();
  const [hasNew, setHasNew] = useState(false);
  
  useEffect(() => {
    if (unreadTotal > 0) {
      setHasNew(true);
      
      // Atualizar o título da página para notificar o usuário
      const originalTitle = document.title;
      document.title = `(${unreadTotal}) Nova mensagem - TechSupport`;
      
      return () => {
        document.title = originalTitle;
      };
    }
  }, [unreadTotal]);
  
  const clearNotification = () => {
    setHasNew(false);
  };
  
  return {
    hasNewMessages: hasNew,
    unreadCount: unreadTotal,
    clearNotification
  };
};
