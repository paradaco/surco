import { useTheme } from "@/hooks/useThemeColor";
import { Building } from "@/lib/buildWorld";
import { useBuildingUpdate } from "@/lib/updates";
import { useQueryClient } from "@tanstack/react-query";
import { Pressable, Text, View } from "react-native";
import { buildingQuery } from "./Facility";

type Props = {
  buildingId: Building["id"];
};

const Menu = ({ buildingId }: Props) => {
  const queryClient = useQueryClient();
  const {
    colors: { waterPrimary: primaryColor, waterSecondary: secondaryColor },
  } = useTheme();

  const { updateBulding, canUpdate } = useBuildingUpdate(buildingId);

  return (
    <View style={{ paddingTop: 32, flex: 1, justifyContent: "center", alignItems: "center" }}>
      {canUpdate && (
        <Pressable
          onPress={() => {
            updateBulding();

            queryClient.invalidateQueries({
              queryKey: [buildingQuery, buildingId],
              exact: false,
            });
          }}
          style={{ flex: 1, backgroundColor: primaryColor, padding: 16, paddingHorizontal: 32, borderRadius: 8 }}
        >
          <Text style={{ color: secondaryColor, fontWeight: "bold" }}>Update Building {buildingId}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Menu;
