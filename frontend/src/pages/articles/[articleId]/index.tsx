import Layout from "@/components/Layout";
import { useArticle } from "@/hooks/articles/api";
import Head from "next/head";
import ArticleShareButtons from "@/components/Articles/ArticleShareButtons";
import ArticleSideBar from "@/components/Articles/ArticleSideBar";
import type { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { sdk } from "@/lib/graphql-client";
import { NEXT_PUBLIC_FRONTEND_URL } from "@/config/env-client";

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

function Page({ articleId }: { articleId: string }) {
  const { article, isLoading } = useArticle({ articleId });
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
          <ArticleShareButtons url={ogUrl} />
        </main>

        {/* 右：サイドバー（関連記事など） */}
        <ArticleSideBar />
      </div>
    </Layout>
  );
}

export default Page;
