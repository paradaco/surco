import { BottomSheet, useBottomSheet } from "@/components/BottomSheet";
import { Cell as CellComponent } from "@/components/Cell";
import { useTheme } from "@/hooks/useThemeColor";
import { Resource } from "@/lib/buildWorld";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Pressable } from "react-native";
import Facility from "./Facility";
import Menu from "./Menu";

type Props = {
  id: Resource["id"];
};

export const Cell = ({ id }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { open } = useBottomSheet(bottomSheetRef);

  const {
    colors: { waterPrimary: primaryColor, waterSecondary: secondaryColor },
  } = useTheme();

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        open();
      }}
    >
      <CellComponent.Resource color={primaryColor}>
        <Facility id={id} />
      </CellComponent.Resource>
      <BottomSheet ref={bottomSheetRef} backgroundStyle={{ backgroundColor: secondaryColor }}>
        <Menu buildingId={id} />
      </BottomSheet>
    </Pressable>
  );
};
