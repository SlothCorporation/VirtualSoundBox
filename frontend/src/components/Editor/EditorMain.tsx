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
import React, { useEffect, useRef } from "react";
import EditorToolbar from "@/components/Editor/EditorToolbar";
import { useAtom, useAtomValue } from "jotai";
import { editorArticleAtom, editorModeAtom } from "@/atoms/editorArticleAtom";

function EditorMain() {
  const [article, setArticle] = useAtom(editorArticleAtom);
  const editorMode = useAtomValue(editorModeAtom);
  const editorRef = useRef<any>(null);

  // editorは一度だけ作成
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
    content: article.body || "<h2>ここに記事を入力してください…</h2><p></p>",
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[400px] focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      // 編集中はstate保存のみ
      setArticle((prev) => ({ ...prev, body: editor.getHTML() }));
    },
  });

  editorRef.current = editor;

  // 記事切替時に content を editor に反映
  useEffect(() => {
    if (editor && article.body) {
      const currentContent = editor.getHTML();
      if (currentContent !== article.body) {
        editor.commands.setContent(article.body, false); // resetSelection=false
      }
    }
  }, [article.id, article.body, editor]); // article.id を依存に入れることで切替時に更新

  if (!editor) return null;

  return (
    <div className="flex-1 rounded-md border bg-gray-50">
      <div className="border-b bg-white p-2">
        <EditorToolbar editor={editor} />
      </div>
      <div className="p-4">
        {editorMode === "visual" ? (
          <EditorContent editor={editor} className="prose max-w-none" />
        ) : (
          <textarea
            className="h-[400px] w-full rounded border p-2 font-mono text-sm"
            value={article.body}
            onChange={(e) => {
              setArticle((prev) => ({ ...prev, body: e.target.value }));
              editor.commands.setContent(e.target.value, false); // カーソル位置保持
            }}
          />
        )}
      </div>
    </div>
  );
}

export default EditorMain;
