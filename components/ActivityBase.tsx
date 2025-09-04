import { useTheme } from "@/hooks/useThemeColor";
import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

const ActivityBase = ({ children, style }: Props) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[{ flex: 1 }, style]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityBase;
