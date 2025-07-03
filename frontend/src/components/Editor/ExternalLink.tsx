import { useState } from "react";
import { useAtom } from "jotai";
import { editorArticleAtom } from "@/atoms/editorArticleAtom";

function ExternalLink() {
  const [article, setArticle] = useAtom(editorArticleAtom);

  return (
    <div className="rounded border border-gray-300 bg-white p-4 text-sm text-gray-700">
      <h3 className="mb-4 text-base font-semibold text-gray-800">
        外部リンク記事
      </h3>
      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-gray-500">
          外部リンク
        </label>
        <input
          type="url"
          value={article.externalUrl}
          onChange={(e) =>
            setArticle({ ...article, externalUrl: e.target.value })
          }
          placeholder="https://example.com"
          className="w-full rounded border border-gray-300 px-2 py-1"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">
          リンクの説明
        </label>
        <textarea
          value={article.externalDescription}
          onChange={(e) =>
            setArticle({ ...article, externalDescription: e.target.value })
          }
          className="w-full rounded border border-gray-300 px-2 py-1"
          rows={3}
        />
      </div>
    </div>
  );
}

export default ExternalLink;
