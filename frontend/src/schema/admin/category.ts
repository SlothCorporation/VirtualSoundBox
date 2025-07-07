import { z } from "zod";

export const category = z.object({
  name: z.string().min(1, "カテゴリー名は必須です"),
  slug: z.string().min(1, "スラッグは必須です"),
});

export type Category = z.infer<typeof category>;
