import { useTheme } from "@/hooks/useThemeColor";
import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

const Container = ({ children, style }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: colors.container + "B8",
          flex: 1,
          paddingVertical: 2,
          borderRadius: 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Container;
