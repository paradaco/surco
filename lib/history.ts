import {
  addMilliseconds,
  differenceInMilliseconds,
  fromUnixTime,
  type Interval,
  isAfter,
  isWithinInterval,
} from "date-fns";
import { Building, buildWorld, Resource } from "./buildWorld";
import { getPersistedNumber, usePersistNumber } from "./persistance";
import { getBuildingUpdates } from "./updates";

export const getCellHistory = (id: Building["id"], from: Date, to: Date, tick: number) => {
  const { level1Date, level2Date, level3Date } = getBuildingUpdates(id);

  const level1Built: Interval | undefined = level1Date && {
    start: level1Date,
    end: to,
  };

  const level2Built: Interval | undefined = level1Date && {
    start: level1Date,
    end: to,
  };

  const level3Built: Interval | undefined = level1Date && {
    start: level1Date,
    end: to,
  };

  const numberOfTicks = getCurrentTick(from, to, tick);

  const resourceManaged = Array.from({ length: numberOfTicks }, (_, index) => {
    const milisOffset = tick * index;
    const tickStartTime = addMilliseconds(from, milisOffset);

    let value = 0;

    if (level1Built && isWithinInterval(tickStartTime, level1Built)) {
      value += 1;
    }

    if (level2Date && isAfter(tickStartTime, level2Date)) {
      value += 2;
    }

    if (level3Date && isAfter(tickStartTime, level3Date)) {
      value += 3;
    }

    return {
      tickStartTime,
      milisOffset,
      value,
    };
  });

  return resourceManaged;
};

export const getResourceOutput = (resourceType: Resource["type"], from: Date, to: Date, tick: number) => {
  const world = buildWorld();

  const resources = world.flat().filter((r) => r.type === resourceType);
  const output = resources
    .map((r) => getCellHistory(r.id, from, to, tick))
    .map((h) => h.reduce((acc, history) => acc + history.value, 0))
    .reduce((acc, produce) => acc + produce, 0);

  return output;
};

const getCurrentTick = (from: Date, to: Date, tick: number) => {
  const differenceMs = differenceInMilliseconds(to, from);

  const numberOfTicks = Math.round(differenceMs / tick);

  return numberOfTicks;
};

export const useTickSystem = () => {
  const [lastTick, setLastTick] = usePersistNumber("currentTick");
  const [firstTick, setFirstTick] = usePersistNumber("firstTick");

  return {
    startDate: new Date(firstTick ?? 0),
    tickDate: getCurrentTickTime(),
    updateTick: (date: Date) => {
      if (firstTick === undefined) setFirstTick(date.getTime());
      else setLastTick(date.getTime());
    },
  };
};

const calculateMissingTicks = (currentTime: Date) => {
  const tick = getCurrentTickTime();

  if (tick !== undefined) return getCurrentTick(tick, currentTime, 5000);
};

const getCurrentTickTime = () => {
  const tick = getPersistedNumber("currentTick");
  if (tick !== undefined) return fromUnixTime(tick);

  const firstTick = getPersistedNumber("firstTick");
  if (firstTick !== undefined) return fromUnixTime(firstTick);
};
