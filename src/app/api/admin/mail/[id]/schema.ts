import { z } from "zod";

export const mailPutSchema = z
  .object({
    sender: z.string(),
    from: z.string(),
    title: z.string(),
    article: z.string(),
    isFishing: z.boolean(),
    fishingDetail: z.string().optional(),
    fileList: z.array(z.number()),
  })
  .refine((data) => {
    if (data.isFishing && !data.fishingDetail) {
      return false;
    }
    return true;
  });
