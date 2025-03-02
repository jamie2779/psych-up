import { z } from "zod";
import { DataType } from "@prisma/client";

export const scenarioPutSchema = z.object({
  title: z.string(),
  type: z.string(),
  detail: z.string(),
  isPublic: z.boolean(),
  todoList: z.array(z.object({ tag: z.string(), target: z.string() })),
  dataFormatList: z.array(
    z.object({
      tag: z.string(),
      name: z.string(),
      type: z.enum(Object.values(DataType) as [string, ...string[]]),
    })
  ),
  mailList: z.array(z.number()),
  fileList: z.array(z.number()),
});
