// components/editor/InsertVideo.tsx
import React, { useState } from "react";
import { MdOndemandVideo } from "react-icons/md";
import type { Editor } from "@tiptap/react";

export default function InsertVideo({ editor }: { editor: Editor | null }) {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  const insertVideo = () => {
    if (!editor || !url.trim()) return;

    const youtubeMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    );

    if (!youtubeMatch) {
      alert("有効なYouTube URLを入力してください");
      return;
    }

    const videoId = youtubeMatch[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "iframe",
          attrs: {
            src: embedUrl,
            width: "100%",
            height: "315",
            frameborder: "0",
            allowfullscreen: "true",
          },
        },
        {
          type: "paragraph",
        },
      ])
      .run();

    setUrl("");
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <MdOndemandVideo size={20} />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-96 rounded bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">動画を挿入</h2>
            <input
              type="text"
              placeholder="YouTubeのURLを入力"
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
                onClick={insertVideo}
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
