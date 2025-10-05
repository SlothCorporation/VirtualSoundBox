import Layout from "@/components/Layout";
import Link from "next/link";

function Page() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold">確認メールを送信しました</h1>
        <p>
          登録されたメールアドレス宛に確認メールを送信しました。
          <br />
          メールを確認し、記載されているリンクをクリックして認証を完了してください。
        </p>
        <p className="text-sm text-gray-500">
          ※ メールが届かない場合は、迷惑メールフォルダをご確認ください。
        </p>

        <Link
          href="/"
          className="text-blue-600 underline transition hover:text-blue-800"
        >
          トップページへ戻る
        </Link>
      </div>
    </Layout>
  );
}

export default Page;
