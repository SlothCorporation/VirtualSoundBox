import { z } from "zod";

export const editUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  plan: z.enum(["free", "premium"]),
  admin_flg: z.enum(["0", "1"]),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
