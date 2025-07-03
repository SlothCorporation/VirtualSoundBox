import type { Editor } from "@tiptap/react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdUndo,
  MdRedo,
} from "react-icons/md";
import React from "react";
import InsertLink from "@/components/Editor/Tool/InsertLink";
import HeadingSelector from "@/components/Editor/Tool/HeadingSelector";
import InsertVideo from "@/components/Editor/Tool/InsertVideo";
import InsertImage from "@/components/Editor/Tool/InsertImage";

type Props = {
  editor: Editor | null;
};

export default function EditorToolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <HeadingSelector editor={editor} />

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "text-blue-600" : ""}
      >
        <MdFormatBold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "text-blue-600" : ""}
      >
        <MdFormatItalic size={20} />
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <MdFormatListBulleted size={20} />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <MdFormatListNumbered size={20} />
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <MdFormatQuote size={20} />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        <MdFormatAlignLeft size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <MdFormatAlignCenter size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <MdFormatAlignRight size={20} />
      </button>
      <InsertLink editor={editor} />
      <InsertVideo editor={editor} />
      <InsertImage editor={editor} />
      <button onClick={() => editor.chain().focus().undo().run()}>
        <MdUndo size={20} />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <MdRedo size={20} />
      </button>
    </div>
  );
}
