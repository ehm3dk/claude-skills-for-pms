import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotWidgetComponent } from './chatbot/chatbot-widget.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatbotWidgetComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('chatbot-web');
}
