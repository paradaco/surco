import ActivityBase from "@/components/ActivityBase";
import Container from "@/components/Container";
import Loader from "@/components/Loader";
import { Stockpile } from "@/components/Stockpile";
import { World } from "@/components/World";
import { useTheme } from "@/hooks/useThemeColor";
import { DotIcon, MaskSadIcon } from "phosphor-react-native";
import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <ActivityBase style={{ gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Welcome to the World</Text>
      <Loader style={{ width: "100%" }} />
      <View style={{ marginBottom: 16, flexDirection: "row", justifyContent: "space-between", gap: 16 }}>
        <Container>
          <MaskSadIcon size={24} color={colors.icon} weight="fill" />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.icon, textAlign: "center" }}>100</Text>
        </Container>
        <Container>
          <DotIcon size={24} color={colors.icon} weight="fill" />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.icon, textAlign: "center" }}>32</Text>
        </Container>
      </View>
      <World />
      <Stockpile />
    </ActivityBase>
  );
}
