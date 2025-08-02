import Layout from "@/components/Layout";
import ArticleListPage from "@/components/Articles/ArticleList";
import { useArticles } from "@/hooks/articles/api";
import { useParams } from "next/navigation";

function Page() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { articles, pagination, isLoading } = useArticles({
    category: slug,
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
