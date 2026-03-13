import { PageJson, PageModule } from '../schema/pageSchema';
import { inferLayout, inferPageType } from './inferSemantics';

export function parsePageSpec(markdown: string): PageJson {
  const lines = markdown.split('\n').map((line) => line.trim()).filter(Boolean);

  const nameLine = lines.find((line) => line.includes('页面名称') || line.toLowerCase().includes('name'));
  const typeLine = lines.find((line) => line.includes('页面类型') || line.toLowerCase().includes('type'));
  const layoutLine = lines.find((line) => line.includes('页面布局') || line.toLowerCase().includes('layout'));

  const modules = parseModules(markdown);

  return {
    page: {
      name: pickValue(nameLine) ?? 'Untitled Page',
      type: inferPageType(pickValue(typeLine) ?? markdown),
      layout: inferLayout(pickValue(layoutLine) ?? markdown)
    },
    modules
  };
}

function parseModules(markdown: string): PageModule[] {
  const blocks = markdown.split(/---+/).map((block) => block.trim()).filter(Boolean);
  const modules: PageModule[] = [];

  for (const block of blocks) {
    const lower = block.toLowerCase();
    if (lower.includes('搜索') || lower.includes('toolbar')) {
      modules.push({
        type: 'toolbar',
        components: buildToolbarComponents(block)
      });
    } else if (lower.includes('table') || lower.includes('表格')) {
      modules.push({
        type: 'table',
        columns: parseTableColumns(block)
      });
    } else if (lower.includes('pagination') || lower.includes('分页')) {
      modules.push({ type: 'pagination' });
    }
  }

  return modules;
}

function buildToolbarComponents(block: string) {
  const lines = block.split('\n').map((line) => line.trim());
  return lines
    .filter((line) => /^(input|select|button)/i.test(line))
    .map((line) => {
      const [rawType, rawLabel] = line.split(':');
      const type = rawType.toLowerCase() as 'input' | 'select' | 'button';
      const value = rawLabel?.trim();
      return type === 'button' ? { type, text: value ?? 'Action' } : { type, label: value ?? '字段' };
    });
}

function parseTableColumns(block: string) {
  const lines = block.split('\n').map((line) => line.trim());
  return lines
    .filter((line) => line.includes('|'))
    .map((line) => {
      const [title, type] = line.split('|').map((x) => x.trim());
      return {
        title: title || '字段',
        type: normalizeColumnType(type)
      };
    });
}

function normalizeColumnType(raw = ''): 'text' | 'tag' | 'datetime' | 'number' {
  const lower = raw.toLowerCase();
  if (lower.includes('tag') || raw.includes('标签')) return 'tag';
  if (lower.includes('time') || raw.includes('时间')) return 'datetime';
  if (lower.includes('number') || raw.includes('数字')) return 'number';
  return 'text';
}

function pickValue(line?: string): string | undefined {
  if (!line) return undefined;
  return line.split('：')[1]?.trim() ?? line.split(':')[1]?.trim();
}
