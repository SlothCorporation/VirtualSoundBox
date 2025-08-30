import Layout from "@/components/Layout";
import ArticleListPage from "@/components/Articles/ArticleList";
import { sdk } from "@/lib/graphql-client";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useArticles } from "@/hooks/articles/api";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = ctx.query.page ? Number(ctx.query.page) : 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles", {}, page, 10],
    queryFn: () =>
      sdk.fetchArticles({
        filter: {},
        page: 1,
        perPage: 10,
      }),
  });

  return {
    props: {
      page,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

function Page({ page }: { page: number }) {
  const { articles } = useArticles({ page, perPage: 10 });

  return (
    <Layout>
      <div className="mx-auto mt-10 max-w-6xl">
        <ArticleListPage articles={articles} />
      </div>
    </Layout>
  );
}

export default Page;
