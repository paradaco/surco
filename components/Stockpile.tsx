import { useTheme } from "@/hooks/useThemeColor";
import { getGrassPerTick, getLogsPerTick, getStonesPerTick, getWaterPerTick } from "@/lib/resources";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DotIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export const Stockipile = () => {
  const { data: logs } = useLogsPerTick();
  const { data: stone } = useStonesPerTick();
  const { data: water } = useWaterPerTick();
  const { data: food } = useGrassPerTick();
  const {
    colors: { forestPrimary, stonePrimary, waterPrimary, grassPrimary },
  } = useTheme();

  return (
    <View style={{ width: "100%", alignItems: "center", marginTop: 32 }}>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <DotIcon size={48} color={forestPrimary} weight="fill" />
        <Text style={{ fontSize: 24, color: forestPrimary, fontWeight: "bold" }}>{logs}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <DotIcon size={48} color={stonePrimary} weight="fill" />
        <Text style={{ fontSize: 24, color: stonePrimary, fontWeight: "bold" }}>{stone}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <DotIcon size={48} color={waterPrimary} weight="fill" />
        <Text style={{ fontSize: 24, color: waterPrimary, fontWeight: "bold" }}>{water}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <DotIcon size={48} color={grassPrimary} weight="fill" />
        <Text style={{ fontSize: 24, color: grassPrimary, fontWeight: "bold" }}>{food}</Text>
      </View>
    </View>
  );
};

const useLogsPerTick = () =>
  useSuspenseQuery({
    queryKey: ["world", "forrest"],
    queryFn: getLogsPerTick,
  });

const useStonesPerTick = () =>
  useSuspenseQuery({
    queryKey: ["world", "stone"],
    queryFn: getStonesPerTick,
  });

const useWaterPerTick = () =>
  useSuspenseQuery({
    queryKey: ["world", "water"],
    queryFn: getWaterPerTick,
  });

const useGrassPerTick = () =>
  useSuspenseQuery({
    queryKey: ["world", "grass"],
    queryFn: getGrassPerTick,
  });
