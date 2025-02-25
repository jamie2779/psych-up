import { z } from "zod";

export const trainingPostSchema = z.object({
  scenarioId: z.number(),
});
