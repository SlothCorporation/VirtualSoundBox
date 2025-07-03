import React, { useState } from "react";
import { MdImage } from "react-icons/md";
import type { Editor } from "@tiptap/react";

function InsertImage({ editor }: { editor: Editor | null }) {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const insertImage = () => {
    if (!editor || !imageUrl.trim()) return;

    // Ensure Image extension is active
    if (!editor.isActive("image")) {
      console.warn("Image extension may not be loaded.");
    }

    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "image",
          attrs: {
            src: imageUrl,
            alt: "",
          },
        },
        ...(caption
          ? [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: caption,
                  },
                ],
              },
            ]
          : []),
      ])
      .run();

    setImageUrl("");
    setCaption("");
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <MdImage size={20} />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-96 rounded bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">画像を挿入</h2>
            <input
              type="text"
              placeholder="画像のURL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mb-3 w-full rounded border px-3 py-2"
            />
            <input
              type="text"
              placeholder="キャプション（任意）"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
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
                onClick={insertImage}
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

export default InsertImage;
