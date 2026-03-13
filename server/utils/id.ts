let counter = 0;

export function createId(prefix = 'node'): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
