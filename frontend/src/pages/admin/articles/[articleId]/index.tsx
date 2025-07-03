import AdminLayout from "@/components/AdminLayout";
import { Editor } from "@/components/Editor/Editor";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { fetchArticle } from "@/hooks/admin/articles/api";
import { useSetAtom } from "jotai";
import { editorArticleAtom } from "@/atoms/editorArticleAtom";

function Page() {
  const params = useParams();
  const articleId = params?.articleId;
  const setArticle = useSetAtom(editorArticleAtom);

  useEffect(() => {
    if (!articleId || articleId === "new") {
      // 新規作成時は初期化する
      setArticle({
        id: null,
        title: "",
        contentType: "article",
        externalUrl: "",
        externalDescription: "",
        body: "",
        tags: [],
        category: undefined,
        status: "draft",
        publishAt: null,
      });
      return;
    }

    fetchArticle(String(articleId)).then((data) => {
      setArticle({
        id: data.data.id,
        title: data.data.title,
        contentType: data.data.contentType,
        externalUrl: data.data.externalUrl,
        externalDescription: data.data.externalDescription,
        body: data.data.body,
        tags: data.data.tags,
        category: data.data.category,
        status: data.data.status,
        publishAt: data.data.publishAt,
      });
    });
  }, [articleId]);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">記事詳細</h1>
        <Editor />
      </div>
    </AdminLayout>
  );
}

export default Page;
