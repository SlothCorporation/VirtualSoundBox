import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("正しいメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
