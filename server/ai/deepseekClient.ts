import { ChatMessage, LlmClient } from './llmClient';

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';

export class DeepseekClient implements LlmClient {
  async chat(messages: ChatMessage[], model = 'deepseek-chat'): Promise<unknown> {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('Missing DEEPSEEK_API_KEY');
    }

    const res = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model, messages })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`DeepSeek request failed: ${res.status} ${text}`);
    }

    return res.json();
  }
}
