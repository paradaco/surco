import { Cell as CellComponent } from "@/components/Cell";
import { useTheme } from "@/hooks/useThemeColor";
import { Building } from "@/lib/buildWorld";
import { getBuildingLevel } from "@/lib/updates";
import { useSuspenseQuery } from "@tanstack/react-query";

export const buildingQuery = ["world", "forrest", "logger"];

type BuildingProps = {
  id: Building["id"];
};

const Facility = ({ id }: BuildingProps) => {
  const {
    colors: { forestSecondary: secondaryColor },
  } = useTheme();

  const { data } = useSuspenseQuery({
    queryKey: [buildingQuery, id],
    queryFn: () => getBuildingLevel(id),
  });

  if (!data.buildingLevel) return null;

  return (
    <>
      <CellComponent.Upgrade level={data.buildingLevel} color={secondaryColor} />
      <CellComponent.Building building={"L"} color={secondaryColor} />
    </>
  );
};

export default Facility;
