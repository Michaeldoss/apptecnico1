
export interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  content: string;
  timestamp: string;
  read: boolean;
  serviceRequest?: {
    id: number;
    type: string;
    equipmentType: string;
  };
}

export interface ChatConversation {
  id: number;
  participantId: number;
  participantName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  avatar?: string;
}
