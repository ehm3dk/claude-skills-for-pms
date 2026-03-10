export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAtIso: string;
}

export interface ChatResponse {
  conversationId: string;
  message: ChatMessage;
  quickReplies?: string[];
  requestId?: string;
}

