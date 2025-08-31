import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, { message: "お名前を入力してください" }),
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  message: z.string().min(1, { message: "お問い合わせ内容を入力してください" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
