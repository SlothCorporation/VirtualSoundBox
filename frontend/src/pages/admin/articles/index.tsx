import AdminLayout from "@/components/AdminLayout";
import Input from "@/components/Form/Input";
import Link from "next/link";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";
import { fetchArticlesPagination } from "@/hooks/admin/articles/api";
import type { Article } from "@/schema/admin/articles";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchArticles = async () => {
    const res = await fetchArticlesPagination({ page });
    setArticles(res.data);
    setLastPage(res.last_page);
  };

  useEffect(() => {
    fetchArticles();
  }, [page]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-full">
          <Input label="" placeholder="タイトル・タグで検索" />
        </div>
        <div className="text-nowrap">
          <button className="relative rounded border px-3.5 py-1.5 text-sm font-bold">
            検索
          </button>
        </div>
        <div className="text-nowrap">
          <button className="rounded bg-blue-500 px-3.5 py-1.5 text-white">
            <Link href="/admin/articles/new">+ 新規作成</Link>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">タイトル</th>
              <th className="border px-4 py-2">タイプ</th>
              <th className="border px-4 py-2">ステータス</th>
              <th className="border px-4 py-2">更新日</th>
              <th className="border px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article: Article) => (
              <tr key={article.id}>
                <td className="border px-4 py-2">{article.title}</td>
                <td className="border px-4 py-2">
                  {article.type === "internal" ? "記事" : "外部リンク"}
                </td>
                <td className="border px-4 py-2">{article.status}</td>
                <td className="border px-4 py-2">{article.updated_at}</td>
                <td className="border px-4 py-2">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="text-blue-600 underline"
                  >
                    編集
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end gap-2 pt-4">
          <button
            className="rounded border p-1.5"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            <MdArrowBackIos size={18} />
          </button>
          <span className="text-sm text-gray-600">
            {page} / {lastPage}
          </span>
          <button
            className="rounded border p-1.5"
            onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
            disabled={page === lastPage}
          >
            <MdArrowForwardIos size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">記事一覧</h1>
        <ArticleList />
      </div>
    </AdminLayout>
  );
}

export default Page;
