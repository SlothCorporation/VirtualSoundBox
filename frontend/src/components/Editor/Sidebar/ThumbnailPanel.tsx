import React, { useRef, useState } from "react";
import { SidebarPanel } from "./SidebarPanel";
import { useAtom } from "jotai";
import { editorArticleAtom } from "@/atoms/editorArticleAtom";
import { uploadImageToS3 } from "@/hooks/admin/images/api";
import { Toast } from "@/components/Toast/Toast";

export const ThumbnailPanel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [article, setArticle] = useAtom(editorArticleAtom);
  const thumbnailImageUrl = article.thumbnailImage;

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file || !article.id) return;

    try {
      setUploading(true);
      const res = await uploadImageToS3(file, article.id, "thumbnail");
      setArticle({
        ...article,
        thumbnailImage: res.data.url,
      });

      Toast({
        title: "アップロード成功",
        description: "サムネイル画像がアップロードされました。",
      });
    } catch (error) {
      console.error(error);
      Toast({
        title: "アップロード失敗",
        description: "画像のアップロードに失敗しました。",
        type: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setArticle({ ...article, thumbnailImage: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <SidebarPanel title="サムネイル">
      <div className="space-y-2">
        {thumbnailImageUrl ? (
          <div className="relative">
            <img
              src={thumbnailImageUrl}
              alt="サムネイル画像"
              className="w-full rounded border object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute right-1 top-1 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
            >
              削除
            </button>
          </div>
        ) : (
          <div className="rounded border border-dashed p-4 text-center text-sm text-gray-500">
            {uploading ? "アップロード中..." : "画像が未設定です"}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600 disabled:opacity-50"
        >
          画像を選択
        </button>
      </div>
    </SidebarPanel>
  );
};
