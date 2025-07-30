import Layout from "../components/Layout";
import type { Article } from "@/hooks/articles/api";
import { fetchArticles } from "@/hooks/articles/api";
import TopicBlock from "@/components/Articles/TopicBlock";
import ArticleCard from "@/components/Articles/ArticleCard";
import ArticleSideBar from "@/components/Articles/ArticleSideBar";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Home() {
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
      <div className="mx-auto mt-5 max-w-6xl rounded border">
        <TopicBlock articles={articles} />
      </div>
      <div className="mx-auto mt-10 max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* メイン記事一覧（2/3） */}
          <div className="w-full rounded border md:col-span-2 md:w-2/3">
            <div className="flex items-center border-b border-gray-300 px-4 py-2">
              <div className="mr-2 h-5 w-1 rounded-full bg-sky-500" />
              <h2 className="text-lg font-bold text-gray-800">新着記事</h2>
            </div>
            {articles.length === 0 ? (
              <div className="flex min-h-[175px] items-center justify-center p-8 text-center text-gray-500">
                <p>記事がまだ投稿されていません。</p>
              </div>
            ) : (
              <div>
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
            <div className="border-t border-gray-200">
              <Link href="/articles" className="text-sm">
                <div className="flex justify-end p-2 hover:bg-gray-50">
                  <span className="flex items-center gap-1">
                    最新記事をもっと見る
                    <MdChevronRight />
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* サイドバー（1/3） */}
          <ArticleSideBar />
        </div>
      </div>
    </Layout>
  );
}
