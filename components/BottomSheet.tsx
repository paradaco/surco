// import RnBottomSheet, { BottomSheetModalProps, BottomSheetView } from "@gorhom/bottom-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { createContext, PropsWithChildren, RefObject, useCallback } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type BottomSheetContextType = {};

const BottomSheetContext = createContext<BottomSheetContextType>({});

export const BottomSheetProvider = ({ children }: PropsWithChildren) => {
  return (
    <BottomSheetContext.Provider value={{}}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
      </GestureHandlerRootView>
    </BottomSheetContext.Provider>
  );
};

type BottomSheetRef = RefObject<BottomSheetModal | null>;

type Props = PropsWithChildren<BottomSheetModalProps & { ref: BottomSheetRef; viewStyle?: StyleProp<ViewStyle> }>;

export const BottomSheet = ({ children, ref, viewStyle, ...props }: Props) => {
  const { dismissThis } = useBottomSheet(ref);

  return (
    <BottomSheetModal
      snapPoints={["40%"]}
      enableDynamicSizing={false}
      animateOnMount={true}
      index={0}
      onChange={(e) => e === -1 && dismissThis()}
      ref={ref}
      {...props}
    >
      <BottomSheetView style={viewStyle}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
};

export const useBottomSheet = (ref?: BottomSheetRef) => {
  const { dismissAll } = useBottomSheetModal();

  if (dismissAll === undefined || !ref) {
    throw Error("problem!!!");
  }

  const open = useCallback(() => {
    ref?.current?.present();
  }, []);

  const dismissThis = () => {
    ref?.current?.dismiss();
  };

  return { dismissAll, open, dismissThis };
};
