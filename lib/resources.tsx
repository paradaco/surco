import { buildWorld, Resource } from "./buildWorld";
import { getBuildingLevel } from "./updates";

export const getResourcePerTick = (resourceType: Resource["type"]) => {
  return buildWorld()
    .flat()
    .filter((resource) => resource.type === resourceType)
    .map((r) => getBuildingLevel(r.id).buildingLevel)
    .filter((level) => level !== undefined)
    .reduce((sum, level) => sum + level!, 0);
};
