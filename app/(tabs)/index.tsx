import ActivityBase from "@/components/ActivityBase";
import { World } from "@/components/World";
import { useTheme } from "@/hooks/useThemeColor";
import { DotIcon, MaskSadIcon } from "phosphor-react-native";
// import { FlashList } from '@shopify/flash-list';
import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <ActivityBase>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Welcome to the World</Text>
      <View style={{ marginBottom: 16, flexDirection: "row", justifyContent: "space-between", gap: 16 }}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: colors.container + "B8",
            flex: 1,
            paddingVertical: 2,
            borderRadius: 4,
          }}
        >
          <MaskSadIcon size={24} color={colors.icon} weight="fill" />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.icon, textAlign: "center" }}>100</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: colors.container + "B8",
            flex: 1,
            paddingVertical: 2,
            borderRadius: 4,
          }}
        >
          <DotIcon size={24} color={colors.icon} weight="fill" />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.icon, textAlign: "center" }}>32</Text>
        </View>
      </View>
      <World />
    </ActivityBase>
  );
}
