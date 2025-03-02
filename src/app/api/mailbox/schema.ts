import { z } from "zod";

export const mailboxPostSchema = z.object({
  mailHolderId: z.number(),
  mailBox: z.string(),
});
