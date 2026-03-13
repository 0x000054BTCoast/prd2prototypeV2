export function estimateTextWidth(text: string, fontSize = 14): number {
  return Math.max(40, Math.ceil(text.length * (fontSize * 0.55)));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
