import EditorHeaderTabs from "@/components/Editor/EditorHeaderTabs";
import EditorMain from "@/components/Editor/EditorMain";
import EditorSidebar from "@/components/Editor/EditorSidebar";
import { useAtom } from "jotai";
import { editorArticleAtom } from "@/atoms/editorArticleAtom";
import ExternalLink from "@/components/Editor/ExternalLink";

export function Editor() {
  const [article, setArticle] = useAtom(editorArticleAtom);
  return (
    <div className="flex h-screen gap-4">
      <div className="flex flex-1 flex-col gap-4 overflow-auto bg-white">
        <div>
          <input
            type="text"
            placeholder="記事タイトルを入力"
            className="w-full rounded border border-gray-300 px-4 py-2 text-xl font-semibold"
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
          />
        </div>
        {article.contentType === "article" ? (
          <div>
            <EditorHeaderTabs />
            <EditorMain />
          </div>
        ) : (
          <ExternalLink />
        )}
      </div>
      <EditorSidebar />
    </div>
  );
}
