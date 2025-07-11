import React, { useEffect, useState } from "react";
import { SidebarPanel } from "./SidebarPanel";
import { useAtom } from "jotai";
import { editorArticleAtom } from "@/atoms/editorArticleAtom";
import { type Category, fetchCategory } from "@/hooks/admin/category/api";

export const CategoryPanel = () => {
  const [article, setArticle] = useAtom(editorArticleAtom);
  const [category, setCategory] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const res = await fetchCategory();
    setCategory(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <SidebarPanel title="カテゴリー">
      <select
        className="w-full rounded border p-2"
        value={article.category}
        onChange={(e) => setArticle({ ...article, category: e.target.value })}
      >
        <option value="">選択してください</option>
        {category.map((cat) => (
          <option key={cat.id} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </SidebarPanel>
  );
};
