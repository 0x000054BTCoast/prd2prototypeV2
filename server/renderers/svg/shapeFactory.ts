import { tokens } from '../../utils/tokens';

export function rect(x: number, y: number, width: number, height: number, radius = 8, fill = tokens.colors.bgCard, stroke = tokens.colors.border): string {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" />`;
}

export function text(x: number, y: number, value: string, size = 14, color = tokens.colors.textPrimary): string {
  return `<text x="${x}" y="${y}" font-family="Inter, sans-serif" font-size="${size}" fill="${color}">${escapeXml(value)}</text>`;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
