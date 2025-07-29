import Layout from "@/components/Layout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPreviewArticle, type Article } from "@/hooks/articles/api";
import Head from "next/head";
import ArticleShareButtons from "@/components/Articles/ArticleShareButtons";
import ArticleSideBar from "@/components/Articles/ArticleSideBar";

function Page() {
  const params = useParams();
  const token = params?.articleId;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!token || typeof token !== "string") return;

    const fetchArticle = async () => {
      const res = await fetchPreviewArticle(token);
      setArticle(res.data);
    };

    fetchArticle();
  }, [token]);

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
          {article.coverImage && (
            <img
              src={article.coverImage.url}
              alt="Cover Image"
              className="mb-6 w-full object-cover"
            />
          )}
          <article
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          <ArticleShareButtons />
        </main>

        {/* 右：サイドバー（関連記事など） */}
        <ArticleSideBar />
      </div>
    </Layout>
  );
}

export default Page;
