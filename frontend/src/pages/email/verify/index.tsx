import Layout from "@/components/Layout";
import Link from "next/link";

function Page() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold">
          メールアドレスの確認が完了しました
        </h1>
        <p>ログインしてサービスをご利用いただけます。</p>
        <div>
          <Link
            href="/login"
            className="text-blue-600 underline transition hover:text-blue-800"
          >
            ログイン
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Page;
