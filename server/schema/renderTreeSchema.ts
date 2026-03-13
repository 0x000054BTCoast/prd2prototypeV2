export interface RenderNode {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  props?: Record<string, unknown>;
  children?: RenderNode[];
}

export interface RenderTree {
  type: 'page';
  width: number;
  height: number;
  children: RenderNode[];
}
