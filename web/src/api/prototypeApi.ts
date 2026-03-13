export interface PrototypeResponse {
  pageJson: unknown;
  renderTree: unknown;
  html: string;
  svg: string;
}

const BASE_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:3000';

export async function generatePrototype(spec: string): Promise<PrototypeResponse> {
  const res = await fetch(`${BASE_URL}/api/prototype`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ spec })
  });

  if (!res.ok) {
    throw new Error(`Prototype request failed: ${res.status}`);
  }

  return res.json() as Promise<PrototypeResponse>;
}
