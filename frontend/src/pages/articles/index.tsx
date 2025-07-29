import Layout from "@/components/Layout";
import ArticleListPage from "@/components/Articles/ArticleList";
import type { Article } from "@/hooks/articles/api";
import { fetchArticles } from "@/hooks/articles/api";
import { useEffect, useState } from "react";

function Page() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles()
      .then((res) => {
        setArticles(res.data);
      })
      .catch((error) => {
        console.error("記事の取得に失敗しました:", error);
      });
  }, []);

  return (
    <Layout>
      <div className="mx-auto mt-10 max-w-6xl">
        <ArticleListPage articles={articles} />
      </div>
    </Layout>
  );
}

export default Page;
