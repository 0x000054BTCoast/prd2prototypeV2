import { PageJson } from '../schema/pageSchema';
import { RenderNode } from '../schema/renderTreeSchema';
import { estimateModuleHeight } from './sizeEstimator';
import { createId } from '../utils/id';
import { grid } from '../utils/tokens';

export function planLayout(pageJson: PageJson): RenderNode[] {
  let cursorY = grid.padding;

  return pageJson.modules.map((module) => {
    const height = estimateModuleHeight(module);
    const node: RenderNode = {
      id: createId(module.type),
      type: module.type,
      x: grid.padding,
      y: cursorY,
      width: grid.containerWidth - grid.padding * 2,
      height,
      props: {
        module
      }
    };

    cursorY += height + grid.gutter;
    return node;
  });
}
