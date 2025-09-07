import Layout from "@/components/Layout";
import { usePreviewArticle } from "@/hooks/articles/api";
import Head from "next/head";
import ArticleShareButtons from "@/components/Articles/ArticleShareButtons";
import ArticleSideBar from "@/components/Articles/ArticleSideBar";
import { NEXT_PUBLIC_FRONTEND_URL } from "@/config/env-client";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticPropsContext } from "next";
import { sdk } from "@/lib/graphql-client";

export const getStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const token = ctx.params?.token;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["preview-article", token],
    queryFn: () => sdk.fetchPreviewArticle({ token: token as string }),
  });

  return {
    props: {
      token,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

function Page({ token }: { token: string }) {
  const { article, isLoading } = usePreviewArticle({ token });
  const ogUrl = `${NEXT_PUBLIC_FRONTEND_URL}/articles/preview/${token}`;

  if (!article || isLoading) {
    return (
      <Layout auth={false}>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="p-8 text-center text-gray-600">読み込み中...</div>
      </Layout>
    );
  }

  return (
    <Layout auth={false}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>{article.title} | プレビュー</title>
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
              src={article.coverImage}
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
