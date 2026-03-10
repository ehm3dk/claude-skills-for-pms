import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { requestIdMiddleware } from '../common/request-id.middleware';
import { RagModule } from '../rag/rag.module';
import { InternalApiService } from '../tools/internal-api.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [RagModule],
  controllers: [ChatController],
  providers: [ChatService, InternalApiService],
})
export class ChatModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(requestIdMiddleware).forRoutes(ChatController);
  }
}

