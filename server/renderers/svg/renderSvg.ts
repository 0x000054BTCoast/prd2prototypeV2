import { RenderTree } from '../../schema/renderTreeSchema';
import { rect, text } from './shapeFactory';

export function renderSvg(tree: RenderTree): string {
  const sections = tree.children.map((node) => {
    const parts: string[] = [
      rect(node.x, node.y, node.width, node.height),
      text(node.x + 16, node.y + 28, capitalize(node.type), 16)
    ];

    if (node.type === 'toolbar') {
      parts.push(rect(node.x + 16, node.y + 40, 220, 32, 6, '#FFFFFF'));
      parts.push(text(node.x + 24, node.y + 61, '用户名', 12, '#909399'));
      parts.push(rect(node.x + 248, node.y + 40, 180, 32, 6, '#FFFFFF'));
      parts.push(text(node.x + 256, node.y + 61, '状态', 12, '#909399'));
      parts.push(rect(node.x + 440, node.y + 40, 96, 32, 6, '#409EFF', '#409EFF'));
      parts.push(text(node.x + 474, node.y + 61, '搜索', 12, '#FFFFFF'));
    }

    return parts.join('\n');
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${tree.width}" height="${tree.height}" viewBox="0 0 ${tree.width} ${tree.height}">
  <rect x="0" y="0" width="${tree.width}" height="${tree.height}" fill="#F5F7FA" />
  ${sections}
</svg>`;
}

function capitalize(input: string): string {
  return input.slice(0, 1).toUpperCase() + input.slice(1);
}
