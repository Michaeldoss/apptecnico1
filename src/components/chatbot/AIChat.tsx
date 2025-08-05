
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Bot, User, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useChatbot } from '@/hooks/useChatbot';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    messages, 
    isTyping, 
    sendMessage, 
    sendFeedback,
    quickReplies 
  } = useChatbot();

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold">Assistente Instalei</h3>
            <p className="text-xs opacity-90">Online agora</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white hover:bg-blue-500"
        >
          <X size={20} />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index}>
            <div
              className={cn(
                "flex",
                message.isBot ? "justify-start" : "justify-end"
              )}
            >
              <div className={cn(
                "max-w-[80%] rounded-lg px-4 py-2 relative",
                message.isBot 
                  ? "bg-gray-100 text-gray-800" 
                  : "bg-blue-600 text-white"
              )}>
                {message.isBot && (
                  <div className="flex items-center gap-2 mb-1">
                    <Bot size={16} className="text-blue-600" />
                    <span className="text-xs font-medium">Assistente</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp}
                </span>
              </div>
            </div>

            {/* Quick Replies */}
            {message.isBot && message.quickReplies && (
              <div className="flex flex-wrap gap-2 mt-2 ml-4">
                {message.quickReplies.map((reply, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            )}

            {/* Feedback */}
            {message.isBot && message.showFeedback && !message.feedbackGiven && (
              <div className="flex items-center gap-2 mt-2 ml-4">
                <span className="text-xs text-gray-500">Esta resposta foi útil?</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => sendFeedback(message.id, true)}
                  className="text-green-600 hover:bg-green-50"
                >
                  <ThumbsUp size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => sendFeedback(message.id, false)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <ThumbsDown size={16} />
                </Button>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">
              <Bot size={16} className="text-blue-600" />
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies Area */}
      {quickReplies.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua dúvida ou fale conosco..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send size={18} />
          </Button>
          <Button variant="outline" className="text-blue-600">
            <Mic size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
