import React, { useState } from "react";
import { MdLink, MdLinkOff } from "react-icons/md";
import type { Editor } from "@tiptap/react";

function InsertLink({ editor }: { editor: Editor | null }) {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  const insertLink = () => {
    if (!editor || !url.trim()) return;

    const { state } = editor;
    const { from, to } = state.selection;

    if (from === to) {
      // No selection: insert URL directly as link
      editor
        .chain()
        .focus()
        .insertContent(`<a href=\"${url}\" target=\"_blank\">${url}</a>`)
        .run();
    } else {
      // Wrap selected text
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    }

    setUrl("");
    setShowModal(false);
  };

  const removeLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <MdLink size={20} />
      </button>
      <button onClick={removeLink}>
        <MdLinkOff size={20} />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-96 rounded bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">リンクを挿入</h2>
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mb-4 w-full rounded border px-3 py-2"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="rounded border px-4 py-2"
              >
                キャンセル
              </button>
              <button
                onClick={insertLink}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                挿入
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InsertLink;
