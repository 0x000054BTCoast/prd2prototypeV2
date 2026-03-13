import { PageJson } from '../schema/pageSchema';
import { RenderTree } from '../schema/renderTreeSchema';
import { planLayout } from './layoutPlanner';
import { grid } from '../utils/tokens';

export function buildRenderTree(pageJson: PageJson): RenderTree {
  const children = planLayout(pageJson);
  const endY = children.length === 0 ? grid.padding : Math.max(...children.map((c) => c.y + c.height));

  return {
    type: 'page',
    width: grid.containerWidth,
    height: endY + grid.padding,
    children
  };
}
