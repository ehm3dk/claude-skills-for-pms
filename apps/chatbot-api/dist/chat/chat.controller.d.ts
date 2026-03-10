import { MessageEvent } from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { ChatRequestDto } from './chat.dto';
import { ChatService } from './chat.service';
import type { ChatResponse } from './chat.types';
export declare class ChatController {
    private readonly chat;
    constructor(chat: ChatService);
    chatMessage(body: ChatRequestDto, req: Request): Promise<ChatResponse>;
    chatStream(message: string, conversationId: string | undefined, req: Request): Observable<MessageEvent>;
}
