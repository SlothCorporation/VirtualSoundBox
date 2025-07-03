import React from "react";
import { SidebarPanel } from "./SidebarPanel";
import { useAtom } from "jotai";
import { editorArticleAtom } from "@/atoms/editorArticleAtom";

const categories = [
  { id: 1, name: "テクノロジー", value: "test1" },
  { id: 2, name: "ライフスタイル", value: "test2" },
  { id: 3, name: "ニュース", value: "test3" },
  { id: 4, name: "エンタメ", value: "test4" },
];

export const CategoryPanel = () => {
  const [article, setArticle] = useAtom(editorArticleAtom);

  return (
    <SidebarPanel title="カテゴリー">
      <select
        className="w-full rounded border p-2"
        value={article.category}
        onChange={(e) => setArticle({ ...article, category: e.target.value })}
      >
        <option value="">選択してください</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.value}>
            {cat.name}
          </option>
        ))}
      </select>
    </SidebarPanel>
  );
};
