import { PageType } from '../schema/pageSchema';

export function inferPageType(raw: string): PageType {
  const lower = raw.toLowerCase();
  if (lower.includes('form')) return 'form';
  if (lower.includes('detail')) return 'detail';
  if (lower.includes('dashboard')) return 'dashboard';
  return 'list';
}

export function inferLayout(raw: string): 'sidebar-content' | 'content-only' {
  const lower = raw.toLowerCase();
  return lower.includes('sidebar') || raw.includes('侧边栏') ? 'sidebar-content' : 'content-only';
}
