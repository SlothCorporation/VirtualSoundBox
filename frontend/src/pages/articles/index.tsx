import Layout from "@/components/Layout";
import ArticleListPage from "@/components/Articles/ArticleList";
import { useArticles } from "@/hooks/articles/api";

function Page() {
  const { articles, pagination, isLoading } = useArticles();

  return (
    <Layout>
      <div className="mx-auto mt-10 max-w-6xl">
        <ArticleListPage articles={articles} />
      </div>
    </Layout>
  );
}

export default Page;
