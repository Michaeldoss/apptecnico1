
import React from 'react';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/context/AuthContext';
import ConversationList from './ConversationList';
import ChatPanel from './ChatPanel';

const Chat: React.FC = () => {
  const { user } = useAuth();
  const { 
    conversations, 
    messages, 
    activeConversation, 
    isLoading,
    setActiveConversation, 
    sendMessage,
    handleServiceRequest
  } = useChat();

  const selectedConversation = conversations.find(c => c.id === activeConversation);

  return (
    <div className="h-[600px] border rounded-lg flex overflow-hidden">
      <div className="w-1/3 border-r">
        <ConversationList
          conversations={conversations}
          activeConversation={activeConversation}
          onSelectConversation={setActiveConversation}
        />
      </div>
      <div className="w-2/3">
        <ChatPanel
          messages={messages}
          isLoading={isLoading}
          currentUserId={user?.id || 0}
          onSendMessage={sendMessage}
          onServiceRequest={handleServiceRequest}
          selectedName={selectedConversation?.participantName}
        />
      </div>
    </div>
  );
};

export default Chat;
