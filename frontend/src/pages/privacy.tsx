import Head from "next/head";
import Layout from "@/components/Layout";

export default function PrivacyPage() {
  return (
    <Layout>
      <Head>
        <title>プライバシーポリシー | VirtualSoundBox</title>
        <meta
          name="description"
          content="VirtualSoundBoxのプライバシーポリシーページです。個人情報の取り扱いやCookieの利用について説明しています。"
        />
      </Head>

      <main className="mx-auto max-w-4xl space-y-6 bg-white p-6 text-black">
        <h1 className="text-3xl font-bold">プライバシーポリシー</h1>

        <p>
          VirtualSoundBox（以下「当サイト」）は、個人情報の保護を重要な
          社会的責務と考え、適切な取り扱いと管理に努めます。本プライバシーポリシーは、当サイトの個人情報の収集・利用・管理について定めるものです。
        </p>

        <h2 className="mt-6 text-2xl font-semibold">1. 個人情報の定義</h2>
        <p>
          個人情報とは、氏名、メールアドレス、電話番号、その他特定の個人を識別できる情報を指します。
        </p>

        <h2 className="mt-6 text-2xl font-semibold">2. 個人情報の収集方法</h2>
        <p>
          当サイトではお問い合わせフォームなどで必要最小限の個人情報を収集する場合があります。また、Cookieやアクセスログを利用してサイト利用状況を把握することがあります。
        </p>

        <h2 className="mt-6 text-2xl font-semibold">3. 個人情報の利用目的</h2>
        <ul className="list-inside list-disc">
          <li>お問い合わせへの対応</li>
          <li>サービス向上のための分析</li>
          <li>必要に応じた連絡や通知</li>
        </ul>

        <h2 className="mt-6 text-2xl font-semibold">4. 第三者提供</h2>
        <p>
          個人情報は法令に基づく場合や、ユーザーの同意がある場合を除き、第三者に提供することはありません。
        </p>

        <h2 className="mt-6 text-2xl font-semibold">5. 個人情報の管理</h2>
        <p>
          収集した個人情報は適切に管理し、不正アクセス、紛失、改ざん、漏洩を防止するための安全対策を講じます。
        </p>

        <h2 className="mt-6 text-2xl font-semibold">6. Cookieの利用について</h2>
        <p>
          当サイトではアクセス解析や利便性向上のためにCookieを使用することがあります。Cookieの利用はブラウザの設定で無効化することも可能です。
        </p>

        <h2 className="mt-6 text-2xl font-semibold">7. 法令遵守と見直し</h2>
        <p>
          当サイトは個人情報保護法その他の関連法令を遵守し、必要に応じて本ポリシーを改定することがあります。
        </p>

        <p className="mt-6 text-sm text-gray-500">最終更新日: 2025年8月31日</p>
      </main>
    </Layout>
  );
}
