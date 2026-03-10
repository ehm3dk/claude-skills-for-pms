import { InjectionToken } from '@angular/core';

export const CHATBOT_API_BASE_URL = new InjectionToken<string>('CHATBOT_API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000'
});

