import Layout from "@/components/Layout";
import ArticleListPage from "@/components/Articles/ArticleList";
import { useArticles } from "@/hooks/articles/api";
import type { GetServerSideProps } from "next";
import { sdk } from "@/lib/graphql-client";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = ctx.query.page ? Number(ctx.query.page) : 1;
  const tag = ctx.params?.slug ? String(ctx.params.slug) : "";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles", { tag }, page, 10],
    queryFn: () =>
      sdk.fetchArticles({
        filter: { tag },
        page,
        perPage: 10,
      }),
  });

  return {
    props: {
      page,
      tag,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

function Page({ page, tag }: { page: number; tag: string }) {
  const { articles } = useArticles({
    filter: { tag },
    page,
    perPage: 10,
  });

  return (
    <Layout>
      <div className="mx-auto mt-10 max-w-6xl">
        <ArticleListPage articles={articles} />
      </div>
    </Layout>
  );
}

export default Page;
