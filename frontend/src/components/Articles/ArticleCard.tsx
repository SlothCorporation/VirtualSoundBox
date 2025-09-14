import Link from "next/link";
import type { Article } from "@/generated/graphql";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="flex min-h-[172px] overflow-hidden rounded border bg-white shadow-sm transition hover:cursor-pointer hover:shadow-md">
        {/* 画像エリア */}
        <div className="relative aspect-video w-1/3 shrink-0">
          <img
            src={article.thumbnailImage?.url ?? ""}
            alt={article.title}
            className="size-full object-cover"
          />
        </div>

        {/* テキストエリア */}
        <div className="flex w-2/3 flex-col justify-between p-4">
          <div>
            {/* タイトル */}
            <h3 className="line-clamp-2 min-h-11 text-lg font-semibold text-gray-800">
              {article.title}
            </h3>

            {/* カテゴリ */}
            <div className="mt-1 text-sm font-medium text-blue-600">
              {article.category.name}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {article.tags &&
                article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                  >
                    {tag?.name}
                  </span>
                ))}
            </div>
          </div>

          {/* 投稿日（任意） */}
          <div className="mt-4 text-xs text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
          </div>
        </div>
      </div>
    </Link>
  );
}
