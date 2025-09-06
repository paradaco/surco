import { world } from "@/constants/fake-data";
import { queryKeys } from "@/constants/keys";
import { buildWorld } from "@/lib/buildWorld";
import { useSuspenseQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Cell as ForestResource } from "./world/forest/Cell";
import { Cell as GrassResource } from "./world/grass/Cell";
import { Cell as StoneResource } from "./world/stone/Cell";
import { Cell as WaterResource } from "./world/water/Cell";

export const World = () => {
  //   const { data: world } = useGetResources();

  return (
    <View style={{ flexDirection: "column", flex: 1, gap: 0 }}>
      {world.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row", gap: 0 }}>
          {row.map((resource, cellIndex) => {
            switch (resource.type) {
              case "forest":
                return <ForestResource key={resource.id} id={resource.id} />;
              case "grass":
                return <GrassResource key={resource.id} id={resource.id} />;
              case "stone":
                return <StoneResource key={resource.id} id={resource.id} />;
              case "water":
                return <WaterResource key={resource.id} id={resource.id} />;
              default:
                return null;
            }
          })}
        </View>
      ))}
    </View>
  );
};

const useGetResources = () =>
  useSuspenseQuery({
    queryKey: queryKeys.world.resource.this,
    queryFn: buildWorld,
  });
