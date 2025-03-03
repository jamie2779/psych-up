import { z } from "zod";

export const scenarioPutSchema = z.object({
  title: z.string(),
  type: z.string(),
  detail: z.string(),
  isPublic: z.boolean(),
  todoList: z.array(z.object({ tag: z.string(), target: z.string() })),
  dataFormatList: z.array(
    z.object({
      name: z.string(),
      tag: z.string(),
      placeholder: z.string(),
    })
  ),
  mailList: z.array(z.number()),
  fileList: z.array(z.number()),
});
