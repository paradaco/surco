import { world } from "@/constants/fake-data";
import * as z from "zod";

const IdSchema = z.custom<`id-${string}`>((v) => /^id-/.test(String(v)));
export const LevelSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]).optional();

const ResourceSchema = z.object({
  id: IdSchema,
  type: z.enum(["forest", "grass", "stone", "water"]),
});

const BuildingSchema = z.object({
  id: IdSchema,
  type: z.enum(["pump", "quarry", "logger", "farm"]),
  level: LevelSchema,
});

const ConnectionSchema = z.object({
  id: IdSchema,
  path: z.enum(["T", "B", "L", "R"]),
  type: z.enum(["road", "pipe"]),
});

const CellScheme = ResourceSchema.extend({
  building: z.object(BuildingSchema.shape),
  connections: z.array(z.object(ConnectionSchema.shape)),
});

export type Resource = z.infer<typeof ResourceSchema>;
export type Building = z.infer<typeof BuildingSchema>;
export type Connection = z.infer<typeof ConnectionSchema>;
export type Cell = z.infer<typeof CellScheme>;

export type World = Cell[][];

export const buildWorld = (): Resource[][] => {
  return world;
};
