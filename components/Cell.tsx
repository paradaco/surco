import { Building as BuildingType } from "@/lib/buildWorld";
import { StarIcon } from "phosphor-react-native";
import { PropsWithChildren } from "react";
import { Text, View, ViewStyle } from "react-native";

type Props = PropsWithChildren & {
  color: string;
  building: string;
  level?: BuildingType["level"];
  connection: "L" | "T" | "R" | "B";
};

const Resource = ({ color, children }: Pick<Props, "children" | "color">) => {
  return (
    <View
      style={{
        backgroundColor: color,
        aspectRatio: 1,
        flex: 1,
        borderRadius: 8,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 16,
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
};

const Building = ({ building, color }: Pick<Props, "building" | "color">) => {
  return (
    <Text
      style={{ opacity: 0.5, color: color, fontWeight: "bold", fontSize: 16, textAlign: "center", alignSelf: "center" }}
    >
      {building}
    </Text>
  );
};

const Upgrade = ({ level, color }: Pick<Props, "level" | "color">) => {
  if (level === undefined) return null;

  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      {level >= 1 && <StarIcon size={12} color={color} weight="duotone" />}
      {level >= 2 && <StarIcon size={12} color={color} weight="duotone" />}
      {level >= 3 && <StarIcon size={12} color={color} weight="duotone" />}
    </View>
  );
};

const Connection = ({ connection }: Pick<Props, "connection">) => {
  const styleMap: Record<Props["connection"], ViewStyle> = {
    T: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 8,
      flexDirection: "row",
    },
    L: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 8,
    },
    R: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: 8,
    },
    B: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 8,
      flexDirection: "row",
    },
  };

  return (
    <View style={[styleMap[connection], { justifyContent: "center", alignItems: "center", gap: 4 }]}>
      {/* Road Connections */}
      <View style={{ width: 8, aspectRatio: 1, backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: 2 }} />
      {/* Pipe Connections */}
      <View style={{ width: 8, aspectRatio: 1, backgroundColor: "rgba(228, 129, 17, 0.5)", borderRadius: 2 }} />
    </View>
  );
};

const Road = () => {};

export const Cell = {
  Resource,
  Building,
  Upgrade,
  Connection,
};
