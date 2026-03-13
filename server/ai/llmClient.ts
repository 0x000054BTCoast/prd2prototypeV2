export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LlmClient {
  chat(messages: ChatMessage[], model?: string): Promise<unknown>;
}
