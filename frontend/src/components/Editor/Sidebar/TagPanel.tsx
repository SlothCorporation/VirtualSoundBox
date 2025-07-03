// components/editor/sidebar/TagPanel.tsx
import React, { useState } from "react";
import { SidebarPanel } from "./SidebarPanel";
import { useAtom } from "jotai";
import { editorArticleAtom } from "@/atoms/editorArticleAtom";

const predefinedTags = [
  "React",
  "Laravel",
  "Next.js",
  "TypeScript",
  "Vue.js",
  "Angular",
  "Node.js",
  "Django",
  "Rails",
  "Express",
  "PHP",
  "Python",
  "JavaScript",
  "CSS",
  "HTML",
  "Tailwind CSS",
  "Bootstrap",
  "GraphQL",
  "REST API",
  "Git",
];

export const TagPanel = () => {
  const [inputValue, setInputValue] = useState("");
  const [article, setArticle] = useAtom(editorArticleAtom);

  const filteredTags = predefinedTags.filter(
    (tag) =>
      tag.toLowerCase().startsWith(inputValue.toLowerCase()) &&
      !article.tags.includes(tag),
  );

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !article.tags.includes(trimmed)) {
      setArticle({ ...article, tags: [...article.tags, trimmed] });
      setInputValue("");
    }
  };

  const handleSelectTag = (tag: string) => {
    if (!article.tags.includes(tag)) {
      setArticle({ ...article, tags: [...article.tags, tag] });
    }
  };

  return (
    <SidebarPanel title="タグ">
      <div className="mb-2 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="タグを入力"
          className="flex-1 rounded-l border px-2 py-1 text-sm"
        />
        <button
          onClick={handleAddTag}
          className="rounded-r bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          追加
        </button>
      </div>

      <div className="mb-2">
        {filteredTags.length > 0 && (
          <div className="flex max-h-[5.6rem] flex-wrap gap-1 overflow-y-auto pr-1">
            {filteredTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSelectTag(tag)}
                className="rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <hr className="my-3 border-t border-gray-300" />

      <div className="flex flex-wrap gap-1">
        {article.tags.map((tag) => (
          <button
            key={tag}
            onClick={() =>
              setArticle({
                ...article,
                tags: article.tags.filter((t) => t !== tag),
              })
            }
            className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 hover:bg-blue-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </SidebarPanel>
  );
};
