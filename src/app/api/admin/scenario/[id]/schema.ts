import { z } from "zod";

export const userPutSchema = z.object({
  title: z.string(),
  type: z.string(),
  detail: z.string(),
  isPublic: z.boolean(),
  todoList: z.array(z.string()),
});
