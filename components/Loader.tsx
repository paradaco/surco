import { useTheme } from "@/hooks/useThemeColor";
import { differenceInMilliseconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
};

const Loader = ({ style }: Props) => {
  const firstStarted = useMemo(() => new Date(), []);
  const [remaining, setRemaining] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDiff = differenceInMilliseconds(new Date(), firstStarted);
      const percentage = ((timeDiff % 5000) / 5000) * 100;
      const clampedProgress = Math.max(0, Math.min(percentage, 100));

      setRemaining(clampedProgress);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [firstStarted]);

  return (
    <View
      style={[
        {
          height: 16,
          width: "100%",
          backgroundColor: colors.border,
          borderRadius: 16,
        },
        style,
      ]}
    >
      <View style={{ width: `${remaining}%`, borderRadius: 16, backgroundColor: colors.icon, height: "100%" }}></View>
    </View>
  );
};

export default Loader;
