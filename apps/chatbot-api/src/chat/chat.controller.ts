import { Body, Controller, MessageEvent, Post, Query, Req, Sse } from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { ChatRequestDto } from './chat.dto';
import { ChatService } from './chat.service';
import type { ChatResponse } from './chat.types';

type ChatStreamEvent =
  | { type: 'meta'; conversationId: string; requestId?: string }
  | { type: 'delta'; text: string }
  | { type: 'done' };

@Controller()
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  @Post('/chat')
  async chatMessage(@Body() body: ChatRequestDto, @Req() req: Request): Promise<ChatResponse> {
    const requestId = (req as Request & { requestId?: string }).requestId;
    return await this.chat.handleMessage({
      conversationId: body.conversationId,
      message: body.message,
      requestId,
    });
  }

  @Sse('/chat/stream')
  chatStream(
    @Query('message') message: string,
    @Query('conversationId') conversationId: string | undefined,
    @Req() req: Request,
  ): Observable<MessageEvent> {
    const requestId = (req as Request & { requestId?: string }).requestId;

    return new Observable<MessageEvent>((subscriber) => {
      void (async () => {
        const res = await this.chat.handleMessage({
          conversationId: conversationId || undefined,
          message: message ?? '',
          requestId,
        });

        subscriber.next({ data: { type: 'meta', conversationId: res.conversationId, requestId } });

        const text = res.message.content;
        for (let i = 0; i < text.length; i += 1) {
          subscriber.next({ data: { type: 'delta', text: text[i] } satisfies ChatStreamEvent });
          await new Promise((r) => setTimeout(r, 8));
        }

        subscriber.next({ data: { type: 'done' } satisfies ChatStreamEvent });
        subscriber.complete();
      })().catch((err) => subscriber.error(err));
    });
  }
}

