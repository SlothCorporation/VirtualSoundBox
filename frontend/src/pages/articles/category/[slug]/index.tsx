import Layout from "@/components/Layout";
import ArticleListPage from "@/components/Articles/ArticleList";
import { useArticles } from "@/hooks/articles/api";
import type { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { sdk } from "@/lib/graphql-client";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = ctx.query.page ? Number(ctx.query.page) : 1;
  const category = ctx.params?.slug ? String(ctx.params.slug) : "";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles", { category }, page, 10],
    queryFn: () =>
      sdk.fetchArticles({
        filter: { category },
        page,
        perPage: 10,
      }),
  });

  return {
    props: {
      page,
      category,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

function Page({ page, category }: { page: number; category: string }) {
  const { articles } = useArticles({
    filter: { category },
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
