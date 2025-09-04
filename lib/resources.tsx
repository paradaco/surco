import { buildWorld } from "./buildWorld";
import { getBuildingLevel } from "./updates";

export const getLogsPerTick = () => {
  return buildWorld()
    .flat()
    .filter((resource) => resource.type === "forest")
    .map((forestResource) => getBuildingLevel(forestResource.id).buildingLevel)
    .filter((level) => level !== undefined)
    .reduce((sum, level) => sum + level!, 0);
};

export const getStonesPerTick = () => {
  return buildWorld()
    .flat()
    .filter((resource) => resource.type === "stone")
    .map((forestResource) => getBuildingLevel(forestResource.id).buildingLevel)
    .filter((level) => level !== undefined)
    .reduce((sum, level) => sum + level!, 0);
};

export const getGrassPerTick = () => {
  return buildWorld()
    .flat()
    .filter((resource) => resource.type === "grass")
    .map((forestResource) => getBuildingLevel(forestResource.id).buildingLevel)
    .filter((level) => level !== undefined)
    .reduce((sum, level) => sum + level!, 0);
};

export const getWaterPerTick = () => {
  return buildWorld()
    .flat()
    .filter((resource) => resource.type === "water")
    .map((forestResource) => getBuildingLevel(forestResource.id).buildingLevel)
    .filter((level) => level !== undefined)
    .reduce((sum, level) => sum + level!, 0);
};
