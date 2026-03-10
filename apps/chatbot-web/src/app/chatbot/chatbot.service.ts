import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CHATBOT_API_BASE_URL } from './chatbot.tokens';
import type { ChatRequest, ChatResponse } from './chatbot.models';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  constructor(
    private readonly http: HttpClient,
    @Inject(CHATBOT_API_BASE_URL) private readonly baseUrl: string
  ) {}

  async sendMessage(req: ChatRequest): Promise<ChatResponse> {
    return await firstValueFrom(
      this.http.post<ChatResponse>(`${this.baseUrl}/chat`, req, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );
  }
}

