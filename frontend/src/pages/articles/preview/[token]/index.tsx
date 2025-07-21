import Layout from "@/components/Layout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPreviewArticle, type PreviewArticle } from "@/hooks/articles/api";
import Head from "next/head";

function ShareButtons() {
  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        この記事をシェアする
      </h3>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          X（旧Twitter）
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-800"
        >
          Facebook
        </a>
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
        >
          LINE
        </a>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(location.href);
            alert("リンクをコピーしました！");
          }}
          className="rounded bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600"
        >
          リンクをコピー
        </button>
      </div>
    </div>
  );
}

function Page() {
  const params = useParams();
  const token = params?.token;
  const [article, setArticle] = useState<PreviewArticle | null>(null);

  useEffect(() => {
    if (!token || typeof token !== "string") return;

    const fetchArticle = async () => {
      const res = await fetchPreviewArticle(token);
      setArticle(res.data);
    };

    fetchArticle();
  }, [token]);

  console.log(article);

  if (!article) {
    return (
      <Layout auth={false}>
        <div className="p-8 text-center text-gray-600">読み込み中...</div>
      </Layout>
    );
  }

  return (
    <Layout auth={false}>
      <Head>
        <title>{article.title} | プレビュー</title>
      </Head>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-8 md:flex-row md:px-4">
        {/* 左：記事本体 */}
        <main className="w-full bg-white md:w-2/3 md:rounded-xl md:border md:p-6 md:shadow">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {article.title}
          </h1>

          <div className="mb-4 flex gap-4 text-sm text-gray-500">
            <span>カテゴリ: {article.category}</span>
          </div>

          <div className="mb-6 flex flex-wrap gap-2 text-sm text-blue-700">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded bg-blue-100 px-2 py-1 text-xs">
                #{tag}
              </span>
            ))}
          </div>

          <article
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          <ShareButtons />
        </main>

        {/* 右：サイドバー（関連記事など） */}
        <aside className="w-full space-y-4 md:sticky md:top-20 md:w-1/3 md:shrink-0">
          <div className="rounded border bg-white p-4 shadow">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              関連記事
            </h2>
            <ul className="space-y-1 text-sm text-blue-600">
              <li>・おすすめ記事１</li>
              <li>・おすすめ記事２</li>
              <li>・おすすめ記事３</li>
            </ul>
          </div>

          <div className="rounded border bg-white p-4 shadow">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              タグ一覧
            </h2>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs text-gray-600">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export default Page;
