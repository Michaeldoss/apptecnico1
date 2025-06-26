
export interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  content: string;
  timestamp: string;
  read: boolean;
  delivered: boolean;
  type: 'text' | 'image' | 'document';
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
  participantPhone?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  avatar?: string;
  lastResponseTime?: string;
  needsResponse?: boolean;
  reminderSent?: boolean;
}

export interface TechnicianSettings {
  responseTimeLimit: number; // em minutos
  whatsappPhone: string;
  workingHours: {
    start: string;
    end: string;
  };
  pauseNotifications: boolean;
  pauseUntil?: string;
}
