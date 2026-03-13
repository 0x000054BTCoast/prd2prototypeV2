import { PageJson } from '../schema/pageSchema';

export function parseJsonFromLlmResponse(payload: unknown): PageJson {
  const maybe = payload as { choices?: Array<{ message?: { content?: string } }> };
  const content = maybe?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('LLM response missing content');
  }

  const normalized = content.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
  return JSON.parse(normalized) as PageJson;
}
