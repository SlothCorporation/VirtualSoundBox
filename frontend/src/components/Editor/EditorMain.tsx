import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Iframe } from "@/components/Editor/Extensions/Iframe";
import React, { useEffect } from "react";
import EditorToolbar from "@/components/Editor/EditorToolbar";
import { useAtom, useAtomValue } from "jotai";
import { editorArticleAtom, editorModeAtom } from "@/atoms/editorArticleAtom";

function EditorMain() {
  const [article, setArticle] = useAtom(editorArticleAtom);
  const editorMode = useAtomValue(editorModeAtom);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Iframe,
      Image,
    ],
    content: "<h2>ここに記事を入力してください…</h2><p></p>",
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[400px] focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      setArticle({ ...article, body: editor.getHTML() });
    },
  });

  // ✅ ① Jotai の body がある場合、Tiptap に反映
  useEffect(() => {
    if (editor && article.body) {
      editor.commands.setContent(article.body);
    }
  }, [editor, article]);

  // ✅ ② 初期化（Jotai の body が空の場合）
  useEffect(() => {
    if (editor && !article.body) {
      editor.commands.clearContent();
    }
  }, [editor, article?.body]);

  return (
    <div className="flex-1 rounded-md border bg-gray-50">
      <div className="border-b bg-white p-2">
        <EditorToolbar editor={editor} />
      </div>
      <div className="p-4">
        {editorMode === "visual" ? (
          editor ? (
            <EditorContent editor={editor} className="prose max-w-none" />
          ) : (
            <div>読み込み中...</div>
          )
        ) : (
          <textarea
            className="h-[400px] w-full rounded border p-2 font-mono text-sm"
            value={article.body}
            onChange={(e) => {
              setArticle({ ...article, body: e.target.value });
              editor?.commands.setContent(e.target.value, false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default EditorMain;
