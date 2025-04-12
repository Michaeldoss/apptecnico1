
import React from 'react';
import { ChatConversation } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ConversationListProps {
  conversations: ChatConversation[];
  activeConversation: number | null;
  onSelectConversation: (id: number) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversation,
  onSelectConversation,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConversations = conversations.filter(conversation =>
    conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas"
            className="pl-8"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              className={cn(
                "flex items-center p-3 cursor-pointer hover:bg-muted/50 transition-colors",
                activeConversation === conversation.id ? "bg-muted" : ""
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={conversation.avatar} />
                <AvatarFallback>
                  {conversation.participantName.split(' ').map(name => name[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">
                    {conversation.participantName}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {conversation.lastMessageTime}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              
              {conversation.unreadCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 bg-primary text-primary-foreground"
                >
                  {conversation.unreadCount}
                </Badge>
              )}
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-muted-foreground">
            Nenhuma conversa encontrada
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
