import { PageJson } from '../schema/pageSchema';

const moduleOrder = ['toolbar', 'table', 'pagination'];

export function normalizePageJson(pageJson: PageJson): PageJson {
  const sortedModules = [...pageJson.modules].sort((a, b) => {
    return moduleOrder.indexOf(a.type) - moduleOrder.indexOf(b.type);
  });

  return {
    ...pageJson,
    modules: sortedModules.map((module) => ({
      ...module,
      components: module.components ?? [],
      columns: module.columns ?? []
    }))
  };
}
