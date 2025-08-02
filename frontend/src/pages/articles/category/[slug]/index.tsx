import Layout from "@/components/Layout";
import ArticleListPage from "@/components/Articles/ArticleList";
import { useArticles } from "@/hooks/articles/api";
import { useCategorySlug } from "@/hooks/common/article";

function Page() {
  const categorySlug = useCategorySlug();
  const { articles, pagination, isLoading } = useArticles({
    category: categorySlug,
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
