import { PageJson } from '../../schema/pageSchema';
import { buildTableMockData } from '../../engine/mockDataFactory';
import { renderToolbarComponent } from './componentMap';

export function renderHtml(pageJson: PageJson): string {
  const tableData = buildTableMockData();

  const modulesHtml = pageJson.modules.map((module) => {
    if (module.type === 'toolbar') {
      const content = (module.components ?? []).map(renderToolbarComponent).join('\n');
      return `<div class="card toolbar">${content}</div>`;
    }

    if (module.type === 'table') {
      const columns = (module.columns ?? []).map((col) => `<el-table-column prop="${snakeCase(col.title)}" label="${col.title}" />`).join('\n');
      return `<div class="card"><el-table :data='${JSON.stringify(tableData)}'>${columns}</el-table></div>`;
    }

    if (module.type === 'pagination') {
      return '<div class="card pagination"><el-pagination layout="prev, pager, next" :total="120" /></div>';
    }

    return '';
  }).join('\n');

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>${pageJson.page.name}</title>
  <style>
    body { margin:0; background:#F5F7FA; font-family: Inter, -apple-system, sans-serif; color:#303133; }
    .page { width:1200px; margin: 0 auto; padding:24px; }
    .card { background:#fff; border:1px solid #DCDFE6; border-radius:8px; padding:16px; margin-bottom:16px; }
    .toolbar { display:flex; gap:12px; align-items:center; }
    .pagination { display:flex; justify-content:flex-end; }
  </style>
</head>
<body>
  <div class="page">
    ${modulesHtml}
  </div>
</body>
</html>`;
}

function snakeCase(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, '_');
}
