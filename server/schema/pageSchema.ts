export type PageType = 'list' | 'detail' | 'form' | 'dashboard';

export interface PageMeta {
  name: string;
  type: PageType;
  layout: 'sidebar-content' | 'content-only';
}

export interface ComponentNode {
  type: 'input' | 'select' | 'button' | 'table' | 'pagination' | 'tag' | 'text';
  label?: string;
  text?: string;
}

export interface TableColumn {
  title: string;
  type: 'text' | 'tag' | 'datetime' | 'number';
}

export interface PageModule {
  type: 'toolbar' | 'table' | 'pagination' | 'card';
  title?: string;
  components?: ComponentNode[];
  columns?: TableColumn[];
}

export interface PageJson {
  page: PageMeta;
  modules: PageModule[];
}
