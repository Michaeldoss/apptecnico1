
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import ChatMessage from './ChatMessage';
import { cn } from '@/lib/utils';

interface ChatPanelProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  currentUserId: number;
  onSendMessage: (content: string) => void;
  onServiceRequest?: (message: ChatMessageType) => void;
  selectedName?: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  isLoading,
  currentUserId,
  onSendMessage,
  onServiceRequest,
  selectedName
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedName) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center text-muted-foreground">
        Selecione uma conversa para começar a enviar mensagens
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-3">
        <h3 className="font-medium">{selectedName}</h3>
      </div>
      
      <div 
        className={cn(
          "flex-1 overflow-y-auto p-4",
          isLoading ? "opacity-70" : ""
        )}
      >
        {isLoading ? (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : messages.length > 0 ? (
          messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.senderId === currentUserId}
              onServiceRequest={onServiceRequest}
            />
          ))
        ) : (
          <div className="text-center text-muted-foreground mt-4">
            Nenhuma mensagem. Seja o primeiro a enviar!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t">
        <div className="flex">
          <Textarea
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button 
            className="ml-2 self-end" 
            onClick={handleSend}
            disabled={isLoading || !newMessage.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
