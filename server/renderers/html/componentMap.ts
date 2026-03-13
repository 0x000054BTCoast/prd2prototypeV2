import { ComponentNode } from '../../schema/pageSchema';

export function renderToolbarComponent(component: ComponentNode): string {
  if (component.type === 'input') {
    return `<el-input placeholder="${component.label ?? '请输入'}" style="width: 220px;"></el-input>`;
  }

  if (component.type === 'select') {
    return `<el-select placeholder="${component.label ?? '请选择'}" style="width: 180px;"></el-select>`;
  }

  if (component.type === 'button') {
    const isPrimary = /search|查询|搜索/i.test(component.text ?? '');
    return `<el-button type="${isPrimary ? 'primary' : 'default'}">${component.text ?? '按钮'}</el-button>`;
  }

  return '';
}
