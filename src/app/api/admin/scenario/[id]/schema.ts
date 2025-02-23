import { z } from "zod";

export const scenarioPutSchema = z.object({
  title: z.string(),
  type: z.string(),
  detail: z.string(),
  isPublic: z.boolean(),
  todoList: z.array(z.string()),
  mailList: z.array(z.number()),
  fileList: z.array(z.number()),
});
