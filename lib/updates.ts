import { Building } from "@/lib/buildWorld";
import { formatISO, parseISO } from "date-fns";
import { getPersistedString, Partition, usePersistString } from "./persistance";

export const getKey = (id: Building["id"], level: Building["level"]): Partition => {
  return `${id}-level-${level ?? 1}`;
};

export const useBuildingUpdate = (id: Building["id"]) => {
  const [buildingLevel1, setBuildingLevel1] = usePersistString(getKey(id, 1));
  const [buildingLevel2, setBuildingLevel2] = usePersistString(getKey(id, 2));
  const [buildingLevel3, setBuildingLevel3] = usePersistString(getKey(id, 3));

  return {
    canUpdate: buildingLevel3 === undefined,
    updateBulding: () => {
      if (buildingLevel1 === undefined) {
        setBuildingLevel1(formatISO(new Date()));
      } else if (buildingLevel2 === undefined) {
        setBuildingLevel2(formatISO(new Date()));
      } else if (buildingLevel3 === undefined) {
        setBuildingLevel3(formatISO(new Date()));
      }
    },
  };
};

export const getBuildingLevel = (id: Building["id"]) => {
  const { level1Date, level2Date, level3Date } = getBuildingUpdates(id);

  const buildingLevel = ((): Building["level"] => {
    if (level3Date) return 3;
    if (level2Date) return 2;
    if (level1Date) return 1;
    return undefined;
  })();

  return {
    buildingLevel,
    canUpdate: level3Date === undefined,
  };
};

export const getBuildingUpdates = (id: Building["id"]) => {
  const level1Date = getPersistedString(getKey(id, 1));
  const level2Date = getPersistedString(getKey(id, 2));
  const level3Date = getPersistedString(getKey(id, 3));

  return {
    level1Date: level1Date ? parseISO(level1Date) : undefined,
    level2Date: level2Date ? parseISO(level2Date) : undefined,
    level3Date: level3Date ? parseISO(level3Date) : undefined,
  };
};
