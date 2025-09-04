import { ParamListBase, StackNavigationState } from "@react-navigation/native";
import type { BottomSheetNavigationEventMap } from "@th3rdwave/react-navigation-bottom-sheet";
import { BottomSheetNavigationOptions, createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";

import { withLayoutContext } from "expo-router";

const { Navigator } = createBottomSheetNavigator();

export const BottomSheet = withLayoutContext<
  BottomSheetNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  BottomSheetNavigationEventMap
>(Navigator);
