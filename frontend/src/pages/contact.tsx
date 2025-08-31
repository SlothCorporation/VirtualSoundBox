import Head from "next/head";
import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendContact } from "@/hooks/contact/api";
import { type ContactFormData, contactSchema } from "@/schema/contact";
import Input from "@/components/Form/Input";

export default function ContactPage() {
  const { mutateAsync: sendContact } = useSendContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendContact(data);
      reset();
      alert("お問い合わせを送信しました。");
    } catch (error) {
      alert("お問い合わせの送信中にエラーが発生しました。");
    }
  };
  return (
    <Layout>
      <Head>
        <title>お問い合わせ | VirtualSoundBox</title>
        <meta
          name="description"
          content="VirtualSoundBoxへのお問い合わせはこちらのフォームからご連絡ください。"
        />
      </Head>

      <main className="mx-auto max-w-2xl space-y-6 p-6">
        <h1 className="text-3xl font-bold">お問い合わせ</h1>
        <p>
          VirtualSoundBoxへのご意見・ご質問などは、以下のフォームからお気軽にお問い合わせください。
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 名前 */}
          <div>
            <Input
              label="お名前"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>

          {/* メールアドレス */}
          <div>
            <Input
              label="メールアドレス"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="message">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              rows={6}
              required
              className="w-full rounded-md border border-gray-300 p-2"
              {...register("message")}
            ></textarea>
          </div>

          {/* 送信ボタン */}
          <div>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              送信する
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
}
