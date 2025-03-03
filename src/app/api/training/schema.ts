import { z } from "zod";

export const trainingPostSchema = z.object({
  scenarioId: z.number(),
  data: z.record(z.string()),
});
