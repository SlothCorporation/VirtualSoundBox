import React from "react";
import { SidebarPanel } from "./SidebarPanel";
import { useAtom } from "jotai";
import { editorArticleAtom } from "@/atoms/editorArticleAtom";

const ContentTypePanel = () => {
  const [article, setArticle] = useAtom(editorArticleAtom);

  return (
    <SidebarPanel title="記事種別">
      <div className="mb-4 space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="contentType"
            value="article"
            checked={article.contentType === "article"}
            onChange={() => setArticle({ ...article, contentType: "article" })}
          />
          <span className="text-sm">記事</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="contentType"
            value="external"
            checked={article.contentType === "external"}
            onChange={() => setArticle({ ...article, contentType: "external" })}
          />
          <span className="text-sm">外部リンク</span>
        </label>
      </div>
    </SidebarPanel>
  );
};

export default ContentTypePanel;
