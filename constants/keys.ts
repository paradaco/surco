export const queryKeys = {
  world: {
    this: ["world"] as const,
    resource: {
      this: ["world", "resource"] as const,
      forest: {
        this: ["world", "resource", "forest"] as const,
        logger: ["world", "resource", "forest", "logger"] as const,
        total: ["world", "resource", "forest", "logger", "total"] as const,
      },
      stone: {
        this: ["world", "resource", "stone"] as const,
        quarry: ["world", "resource", "stone", "quarry"] as const,
        total: ["world", "resource", "stone", "quarry", "total"] as const,
      },
      water: {
        this: ["world", "resource", "water"] as const,
        pump: ["world", "resource", "water", "pump"] as const,
        total: ["world", "resource", "water", "pump", "total"] as const,
      },
      grass: {
        this: ["world", "resource", "grass"] as const,
        food: ["world", "resource", "grass", "food"] as const,
        total: ["world", "resource", "grass", "food", "total"] as const,
      },
    },
  },
};
