import { PageModule } from '../schema/pageSchema';

export function estimateModuleHeight(module: PageModule): number {
  switch (module.type) {
    case 'toolbar':
      return 72;
    case 'table':
      return 340;
    case 'pagination':
      return 56;
    default:
      return 120;
  }
}
