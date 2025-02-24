import { z } from "zod";

export const scenarioPostSchema = z.object({
  title: z.string(),
  type: z.string(),
  detail: z.string(),
  isPublic: z.boolean(),
  todoList: z.array(z.object({ tag: z.string(), target: z.string() })),
  mailList: z.array(z.number()),
  fileList: z.array(z.number()),
});
