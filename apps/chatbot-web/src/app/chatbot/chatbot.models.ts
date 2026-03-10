export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: Exclude<ChatRole, 'system'>;
  content: string;
  createdAtIso: string;
}

export interface ChatRequest {
  conversationId?: string;
  message: string;
}

export interface ChatResponse {
  conversationId: string;
  message: ChatMessage;
  quickReplies?: string[];
  requestId?: string;
}

