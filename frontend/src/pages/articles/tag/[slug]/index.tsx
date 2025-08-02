import Layout from "@/components/Layout";
import ArticleListPage from "@/components/Articles/ArticleList";
import { useArticles } from "@/hooks/articles/api";
import { useTagSlug } from "@/hooks/common/article";

function Page() {
  const tagSlug = useTagSlug();
  const { articles, pagination, isLoading } = useArticles({
    tag: tagSlug,
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
