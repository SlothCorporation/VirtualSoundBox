import Head from "next/head";
import Layout from "@/components/Layout";

export default function ContactPage() {
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

        <form className="space-y-4">
          {/* 名前 */}
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="name">
              お名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="message">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full rounded-md border border-gray-300 p-2"
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
