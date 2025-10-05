import ArticleShareButtons from "@/components/Articles/ArticleShareButtons";
import Layout from "@/components/Layout";
import { NEXT_PUBLIC_FRONTEND_URL } from "@/config/env-client";
import type { Article } from "@/generated/graphql";
import { useArticle } from "@/hooks/articles/api";
import { sdk } from "@/lib/graphql-client";
import ArticleLikeButton from "@/src/components/Articles/ArticleLikeButton";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const articleId = ctx.params?.articleId;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["article", articleId],
    queryFn: () => sdk.fetchArticle({ id: articleId as string }),
  });

  return {
    props: {
      articleId,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

type SideBarProps = {
  recommendedArticles: Article[];
};

function SideBar({ recommendedArticles }: SideBarProps) {
  return (
    <aside className="w-full space-y-4 md:sticky md:top-20 md:w-1/3 md:shrink-0">
      <div className="rounded border bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">関連記事</h2>

        {recommendedArticles.length === 0 ? (
          <p className="text-sm text-gray-500">
            関連記事はまだ投稿されていません。
          </p>
        ) : (
          <ul>
            {recommendedArticles.map((article, index) => (
              <li
                key={article.id}
                className={`flex items-start gap-4 py-2 ${
                  index < recommendedArticles.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                {article.thumbnailImage?.url && (
                  <div className="aspect-video w-24 shrink-0 overflow-hidden rounded">
                    <img
                      src={article.thumbnailImage.url}
                      alt={article.title}
                      className="size-full object-cover"
                    />
                  </div>
                )}
                <a
                  href={`/articles/${article.id}`}
                  className="line-clamp-2 text-sm text-blue-600 hover:underline"
                >
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

function Page({ articleId }: { articleId: string }) {
  const { article, recommendedArticles, isLoading } = useArticle({ articleId });
  const ogUrl = `${NEXT_PUBLIC_FRONTEND_URL}/articles/${articleId}`;

  if (!article || isLoading) {
    return (
      <Layout auth={false}>
        <div className="p-8 text-center text-gray-600">読み込み中...</div>
      </Layout>
    );
  }

  return (
    <Layout auth={false}>
      <Head>
        <title>{article.title}</title>

        {/* --- OGP meta tags --- */}
        <meta property="og:title" content={article.title} />
        <meta
          property="og:description"
          content={article.excerpt ?? "音楽と出会う新しいプラットフォーム"}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={ogUrl} />
        <meta
          property="og:image"
          content={article.coverImage?.url ?? "/default-ogp.png"}
        />

        {/* Twitterカード */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta
          name="twitter:description"
          content={article.excerpt ?? "音楽と出会う新しいプラットフォーム"}
        />
        <meta
          name="twitter:image"
          content={article.coverImage?.url ?? "/default-ogp.png"}
        />
      </Head>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-8 md:flex-row md:px-4">
        {/* 左：記事本体 */}
        <main className="w-full bg-white md:w-2/3 md:rounded-xl md:border md:p-6 md:shadow">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {article.title}
          </h1>

          <div className="mb-4 flex gap-4 text-sm text-gray-500">
            <span>カテゴリ: {article.category.name}</span>
          </div>

          <div className="mb-6 flex flex-wrap gap-2 text-sm text-blue-700">
            {article.tags &&
              article.tags.map((tag) => (
                <span
                  key={tag?.id}
                  className="rounded bg-blue-100 px-2 py-1 text-xs"
                >
                  #{tag?.name}
                </span>
              ))}
          </div>
          {article.coverImage && (
            <img
              src={article.coverImage?.url}
              alt="Cover Image"
              className="mb-6 w-full object-cover"
            />
          )}
          <article
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: article.body ?? "" }}
          />
          <ArticleLikeButton
            articleId={article.id}
            initialCount={article.likeCount ?? 0}
          />
          <ArticleShareButtons url={ogUrl} />
        </main>

        {/* 右：サイドバー（関連記事など） */}
        <SideBar recommendedArticles={recommendedArticles} />
      </div>
    </Layout>
  );
}

export default Page;
