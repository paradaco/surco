import { Building, LevelSchema } from "@/lib/buildWorld";
import { getPersistedNumber, usePersistNumber } from "./persistance";

export const useBuildingUpdate = (id: Building["id"]) => {
  const [buildingLevel, setBuildingLevel] = usePersistNumber(id);

  return {
    canUpdate: buildingLevel === undefined || buildingLevel < 3,
    updateBulding: () => {
      if (!buildingLevel) {
        setBuildingLevel(1);
      } else if (buildingLevel < 3) {
        setBuildingLevel((currentLevel) => (currentLevel ? currentLevel + 1 : 1));
      }
    },
  };
};

export const getBuildingLevel = (id: Building["id"]) => {
  const buildingLevel = getPersistedNumber(id);

  return {
    buildingLevel: LevelSchema.safeParse(buildingLevel).data,
    canUpdate: buildingLevel === undefined || buildingLevel < 3,
  };
};
