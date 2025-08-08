import type { Article } from "@/generated/graphql";
import Link from "next/link";

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="overflow-hidden rounded border bg-white shadow-sm hover:cursor-pointer">
        {/* 画像エリア */}
        <div className="group relative h-48">
          <img
            src={article.thumbnailImage ?? ""}
            alt={article.title}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />
        </div>

        {/* テキストエリア */}
        <div className="min-h-[112px] space-y-1 p-3 text-sm">
          {/* タイトル（2行まで） */}
          <h3 className="line-clamp-2 min-h-10 overflow-y-hidden font-semibold text-gray-800">
            {article.title}
          </h3>

          {/* カテゴリ */}
          <div className="text-xs font-medium text-blue-600">
            {article.category.name}
          </div>

          {/* タグ */}
          <div className="flex max-h-6 flex-wrap gap-1 overflow-hidden">
            {article.tags &&
              article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700"
                >
                  {tag?.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleMiniCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="flex h-[4.8rem] overflow-hidden border-b bg-white shadow-sm last:border-none hover:bg-gray-50">
        {/* 左：グレーバックの画像枠（1） */}
        <div className="flex w-1/3 items-center justify-center bg-gray-100">
          <img
            src={article.thumbnailImage ?? ""}
            alt={article.title}
            className="h-full object-cover"
          />
        </div>

        {/* 右：記事情報 */}
        <div className="flex w-2/3 flex-col justify-between p-2 pr-3">
          {/* タイトル */}
          <h3 className="line-clamp-3 text-sm font-medium text-gray-800">
            {article.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function TopicBlock({ articles }: { articles: Article[] }) {
  const [a, b, cGroup, dGroup] = [
    articles[0],
    articles[1],
    articles.slice(2, 6),
    articles.slice(6, 10),
  ];

  return (
    <section className="w-full">
      {/* トピックヘッダー */}
      <div className="flex items-center border-b border-gray-300 px-4 py-2">
        <div className="mr-2 h-5 w-1 rounded-full bg-rose-500" />
        <h2 className="text-lg font-bold text-gray-800">トピック</h2>
      </div>

      {/* 記事本体エリア */}
      {articles.length === 0 ? (
        <div className="flex min-h-[340px] items-center justify-center p-8 text-center text-gray-500">
          <p>記事がまだ投稿されていません。</p>
        </div>
      ) : (
        <div className="grid min-h-[340px] grid-cols-1 gap-4 p-4 md:grid-cols-4">
          <div className="col-span-1">{a && <ArticleCard article={a} />}</div>
          <div className="col-span-1">{b && <ArticleCard article={b} />}</div>
          <div className="col-span-1 flex flex-col">
            {cGroup.map((article) => (
              <ArticleMiniCard key={article.id} article={article} />
            ))}
          </div>
          <div className="col-span-1 flex flex-col">
            {dGroup.map((article) => (
              <ArticleMiniCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
