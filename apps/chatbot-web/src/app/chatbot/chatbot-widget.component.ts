import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from './chatbot.service';
import type { ChatMessage } from './chatbot.models';

function newId(): string {
  return crypto.randomUUID();
}

@Component({
  selector: 'app-chatbot-widget',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-widget.component.html',
  styleUrl: './chatbot-widget.component.scss'
})
export class ChatbotWidgetComponent {
  protected readonly isOpen = signal(false);
  protected readonly isSending = signal(false);
  protected readonly composerText = signal('');
  protected readonly conversationId = signal<string | null>(null);
  protected readonly messages = signal<ChatMessage[]>([
    {
      id: newId(),
      role: 'assistant',
      content: 'Hi — I’m your assistant. What can I help you with today?',
      createdAtIso: new Date().toISOString()
    }
  ]);
  protected readonly quickReplies = signal<string[]>([
    'What can you do?',
    'Show me a sample tool call',
    'Help me find an API endpoint'
  ]);

  protected readonly canSend = computed(() => {
    const text = this.composerText().trim();
    return text.length > 0 && !this.isSending();
  });

  constructor(private readonly chatbot: ChatbotService) {
    effect(() => {
      if (!this.isOpen()) return;
      queueMicrotask(() => {
        const el = document.getElementById('chatbot-composer');
        (el as HTMLInputElement | null)?.focus();
      });
    });
  }

  protected open(): void {
    this.isOpen.set(true);
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  protected onKeydownPanel(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    this.close();
    queueMicrotask(() => {
      (document.getElementById('chatbot-launcher') as HTMLButtonElement | null)?.focus();
    });
  }

  protected chooseQuickReply(text: string): void {
    this.composerText.set(text);
    void this.send();
  }

  protected async send(): Promise<void> {
    if (!this.canSend()) return;
    const content = this.composerText().trim();
    this.composerText.set('');

    const userMessage: ChatMessage = {
      id: newId(),
      role: 'user',
      content,
      createdAtIso: new Date().toISOString()
    };

    this.messages.update((m) => [...m, userMessage]);
    this.isSending.set(true);
    this.quickReplies.set([]);

    try {
      const res = await this.chatbot.sendMessage({
        conversationId: this.conversationId() ?? undefined,
        message: content
      });

      this.conversationId.set(res.conversationId);
      this.messages.update((m) => [...m, res.message]);
      this.quickReplies.set(res.quickReplies ?? []);
      queueMicrotask(() => this.scrollToBottom());
    } catch (err) {
      const assistantMessage: ChatMessage = {
        id: newId(),
        role: 'assistant',
        content:
          'Sorry — something went wrong talking to the server. Make sure `chatbot-api` is running on port 3000.',
        createdAtIso: new Date().toISOString()
      };
      this.messages.update((m) => [...m, assistantMessage]);
    } finally {
      this.isSending.set(false);
    }
  }

  private scrollToBottom(): void {
    const el = document.getElementById('chatbot-message-list');
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }
}

