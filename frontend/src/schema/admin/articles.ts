import { z } from "zod";

export const article = z.object({
  id: z.number(),
  title: z.string(),
  type: z.enum(["external", "article"]),
  status: z.enum(["draft", "pending", "published", "private"]),
  updated_at: z.string(),
});

export type Article = z.infer<typeof article>;
