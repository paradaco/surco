import { queryKeys } from "@/constants/keys";
import { useTheme } from "@/hooks/useThemeColor";
import { getResourceOutput } from "@/lib/history";
import { getResourcePerTick } from "@/lib/resources";
import { useSuspenseQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { DotIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export const Stockipile = () => {
  const { data: logsPerTick } = useLogsPerTick();
  const { data: stonePerTick } = useStonesPerTick();
  const { data: waterPerTick } = useWaterPerTick();
  const { data: foodPetTick } = useGrassPerTick();

  //   const { startDate } = useTickSystem();
  const startDate = subDays(new Date(), 2);

  const { data: totalLogs } = useForestTotal(startDate);
  const { data: stoneTotal } = useStoneTotal(startDate);
  const { data: waterTotal } = useWaterTotal(startDate);
  const { data: grassTotal } = useGrassTotal(startDate);

  const {
    colors: { forestPrimary, stonePrimary, waterPrimary, grassPrimary },
  } = useTheme();

  return (
    <View style={{ width: "100%", alignItems: "center", marginTop: 32 }}>
      {/* <StockedResource color={forestPrimary} total={totalLogs} perTick={logsPerTick} />
      <StockedResource color={stonePrimary} total={stoneTotal} perTick={stonePerTick} />
      <StockedResource color={waterPrimary} total={waterTotal} perTick={waterPerTick} />
      <StockedResource color={grassPrimary} total={grassTotal} perTick={foodPetTick} /> */}
    </View>
  );
};

type StockedResourceType = {
  total: number;
  perTick: number;
  color: string;
};

const StockedResource = ({ total, perTick, color }: StockedResourceType) => (
  <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
    <DotIcon size={48} color={color} weight="fill" />
    <Text style={{ fontSize: 24, color: color, fontWeight: "bold" }}>{total}</Text>
    <Text style={{ fontSize: 16, color: color }}>(+{perTick})</Text>
  </View>
);

const useLogsPerTick = () =>
  useSuspenseQuery({
    queryKey: queryKeys.world.resource.forest.logger,
    queryFn: () => getResourcePerTick("forest"),
  });

const useStonesPerTick = () =>
  useSuspenseQuery({
    queryKey: queryKeys.world.resource.stone.quarry,
    queryFn: () => getResourcePerTick("stone"),
  });

const useWaterPerTick = () =>
  useSuspenseQuery({
    queryKey: queryKeys.world.resource.water.pump,
    queryFn: () => getResourcePerTick("water"),
  });

const useGrassPerTick = () =>
  useSuspenseQuery({
    queryKey: queryKeys.world.resource.grass.food,
    queryFn: () => getResourcePerTick("grass"),
  });

const useForestTotal = (from: Date) =>
  useSuspenseQuery({
    queryKey: queryKeys.world.resource.forest.total,
    queryFn: () => getResourceOutput("forest", from, new Date(), 5000),
  });

const useStoneTotal = (from: Date) =>
  useSuspenseQuery({
    queryKey: queryKeys.world.resource.stone.total,
    queryFn: () => getResourceOutput("stone", from, new Date(), 5000),
  });

const useWaterTotal = (from: Date) =>
  useSuspenseQuery({
    queryKey: queryKeys.world.resource.stone.total,
    queryFn: () => getResourceOutput("water", from, new Date(), 5000),
  });

const useGrassTotal = (from: Date) =>
  useSuspenseQuery({
    queryKey: queryKeys.world.resource.grass.total,
    queryFn: () => getResourceOutput("grass", from, new Date(), 5000),
  });
