// components/articles/ArticleListPage.tsx

import type { Article } from "@/hooks/articles/api";
import ArticleCard from "@/components/Articles/ArticleCard";
import ArticleSideBar from "@/components/Articles/ArticleSideBar";

type Props = {
  articles: Article[];
};

export default function ArticleListPage({ articles }: Props) {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      {/* メイン記事一覧（2/3） */}
      <div className="w-full space-y-6 md:col-span-2 md:w-2/3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* サイドバー（1/3） */}
      <ArticleSideBar />
    </div>
  );
}
