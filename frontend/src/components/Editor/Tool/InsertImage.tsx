import React, { useState, useRef } from "react";
import { MdImage } from "react-icons/md";
import type { Editor } from "@tiptap/react";
import { uploadImageToS3 } from "@/hooks/admin/images/api";
import { editorArticleAtom } from "@/atoms/editorArticleAtom";
import { useAtomValue } from "jotai";

function InsertImage({ editor }: { editor: Editor | null }) {
  const article = useAtomValue(editorArticleAtom);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertImage = () => {
    if (!editor || !imageUrl.trim()) return;

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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file || !article.id) return;

    try {
      setUploading(true);
      const res = await uploadImageToS3(file, article.id, "body");
      setImageUrl(res.data.url); // URLを自動挿入
    } catch (err) {
      console.error(err);
      alert("アップロードに失敗しました");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} title="画像を挿入">
        <MdImage size={20} />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-96 rounded bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">画像を挿入</h2>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="mb-3 w-full"
              onChange={handleImageUpload}
              disabled={uploading}
            />

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
                disabled={!imageUrl || uploading}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {uploading ? "アップロード中..." : "挿入"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InsertImage;
