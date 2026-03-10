import type { ChatResponse } from './chat.types';
import { InternalApiService } from '../tools/internal-api.service';
import { RagService } from '../rag/rag.service';
export declare class ChatService {
    private readonly internalApi;
    private readonly rag;
    private readonly conversations;
    constructor(internalApi: InternalApiService, rag: RagService);
    handleMessage(params: {
        conversationId?: string;
        message: string;
        requestId?: string;
    }): Promise<ChatResponse>;
    private getOrCreateConversation;
    private generateAssistantReply;
}
