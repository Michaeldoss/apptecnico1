
import React from 'react';
import { cn } from '@/lib/utils';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ChatMessageProps {
  message: ChatMessageType;
  isCurrentUser: boolean;
  onServiceRequest?: (message: ChatMessageType) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isCurrentUser,
  onServiceRequest
}) => {
  const formattedTime = () => {
    try {
      return formatDistanceToNow(new Date(message.timestamp), { 
        addSuffix: true,
        locale: ptBR
      });
    } catch (e) {
      return message.timestamp;
    }
  };

  return (
    <div 
      className={cn(
        "flex mb-4",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isCurrentUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        )}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium">
            {isCurrentUser ? 'Você' : message.senderName}
          </span>
          <span className="text-xs ml-2 opacity-70">
            {formattedTime()}
          </span>
        </div>
        
        <p className="text-sm">{message.content}</p>
        
        {/* Mostra indicador de lido para mensagens enviadas */}
        {isCurrentUser && (
          <div className="flex justify-end mt-1">
            <CheckCheck 
              size={16} 
              className={cn(
                "opacity-70",
                message.read ? "text-blue-500" : ""
              )} 
            />
          </div>
        )}
        
        {/* Se existir uma solicitação de serviço */}
        {message.serviceRequest && !isCurrentUser && (
          <div className="mt-2 border-t pt-2">
            <div className="text-xs font-medium mb-1">Solicitação de Serviço:</div>
            <div className="text-xs">
              <div>Tipo: {message.serviceRequest.type}</div>
              <div>Equipamento: {message.serviceRequest.equipmentType}</div>
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="mt-2 w-full"
              onClick={() => onServiceRequest?.(message)}
            >
              Aceitar Solicitação
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
