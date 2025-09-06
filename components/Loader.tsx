import { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
};

const Loader = ({ style }: Props) => {
  //   const {
  //     data: { invalidatedAt },
  //   } = useInvalidator();
  const [remaining, setRemaining] = useState(0);
  //   const queryClient = useQueryClient();

  //   const memoizedInvalidator = useCallback(
  //     () => queryClient.invalidateQueries({ queryKey: ["world"], exact: false }),
  //     [],
  //   );

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       const timeDiff = differenceInMilliseconds(new Date(), invalidatedAt);
  //       const percentage = ((timeDiff % 5000) / 5000) * 100;
  //       const clampedProgress = Math.max(0, Math.min(percentage, 100));

  //       setRemaining(clampedProgress);
  //     }, 350);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, [invalidatedAt]);

  return (
    <View
      style={[
        {
          height: 16,
          width: "100%",
          backgroundColor: "blue",
          borderRadius: 16,
        },
        style,
      ]}
    >
      <View style={{ width: `${remaining}%`, borderRadius: 16, backgroundColor: "red", height: "100%" }}></View>
    </View>
  );
};

// const useInvalidator = () =>
//   useSuspenseQuery({
//     queryKey: ["invalidator"],
//     queryFn: () => {
//       //   const queryClient = useQueryClient();
//       //   queryClient.invalidateQueries({ queryKey: ["world"], exact: false });

//       return {
//         invalidatedAt: new Date(),
//       };
//     },
//     refetchOnWindowFocus: true,
//     refetchInterval: 5000,
//   });

// const useQueryInvalidator = () => {
//   const queryClient = useQueryClient();

//   return {
//     invalidator: () => queryClient.invalidateQueries({ queryKey: ["world"], exact: false }),
//     invalidatedAt: new Date(),
//   };
// };

// export default Loader;
