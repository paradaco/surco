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
      <StockedResource color={forestPrimary} total={totalLogs} perTick={logsPerTick} />
      <StockedResource color={stonePrimary} total={stoneTotal} perTick={stonePerTick} />
      <StockedResource color={waterPrimary} total={waterTotal} perTick={waterPerTick} />
      <StockedResource color={grassPrimary} total={grassTotal} perTick={foodPetTick} />
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
    queryKey: ["world", "forrest", "production"],
    queryFn: () => getResourcePerTick("forest"),
  });

const useStonesPerTick = () =>
  useSuspenseQuery({
    queryKey: ["world", "stone", "production"],
    queryFn: () => getResourcePerTick("stone"),
  });

const useWaterPerTick = () =>
  useSuspenseQuery({
    queryKey: ["world", "water", "production"],
    queryFn: () => getResourcePerTick("water"),
  });

const useGrassPerTick = () =>
  useSuspenseQuery({
    queryKey: ["world", "grass", "production"],
    queryFn: () => getResourcePerTick("grass"),
  });

const useForestTotal = (from: Date) =>
  useSuspenseQuery({
    queryKey: ["world", "forrest", "total"],
    queryFn: () => getResourceOutput("forest", from, new Date(), 5000),
  });

const useStoneTotal = (from: Date) =>
  useSuspenseQuery({
    queryKey: ["world", "stone", "total"],
    queryFn: () => getResourceOutput("stone", from, new Date(), 5000),
  });

const useWaterTotal = (from: Date) =>
  useSuspenseQuery({
    queryKey: ["world", "water", "total"],
    queryFn: () => getResourceOutput("water", from, new Date(), 5000),
  });

const useGrassTotal = (from: Date) =>
  useSuspenseQuery({
    queryKey: ["world", "grass", "total"],
    queryFn: () => getResourceOutput("grass", from, new Date(), 5000),
  });
