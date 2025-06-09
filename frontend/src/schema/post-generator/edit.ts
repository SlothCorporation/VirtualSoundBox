import { z } from "zod";

export const postGeneratorEditSchema = z.object({
  type: z.enum(["music", "list"]),
  name: z
    .string()
    .min(1, "テンプレート名を入力してください")
    .max(50, "50文字以内で入力してください"),
  content: z.string().min(1, "テンプレート内容を入力してください"),
});

export type PostGeneratorEditSchema = z.infer<typeof postGeneratorEditSchema>;
