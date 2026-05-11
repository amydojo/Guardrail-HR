import { RESOURCES_DATA, ResourceData } from './resourcesData';
import { RESOURCES_DATA_PART2 } from './resourcesDataPart2';
import { RESOURCES_DATA_PART3 } from './resourcesDataPart3';
import { TEMPLATES_DATA, Template, ALL_TEMPLATES } from './templatesData';

// Combine all resource data
export const ALL_RESOURCES: Record<string, ResourceData> = {
  ...RESOURCES_DATA,
  ...RESOURCES_DATA_PART2,
  ...RESOURCES_DATA_PART3
};

export type { ResourceData, ResourceSection, RelatedResource } from './resourcesData';
export type { Template } from './templatesData';
export { TEMPLATES_DATA, ALL_TEMPLATES };