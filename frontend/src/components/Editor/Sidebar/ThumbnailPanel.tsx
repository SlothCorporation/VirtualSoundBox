// components/editor/sidebar/ThumbnailPanel.tsx
import React, { useRef, useState } from "react";
import { SidebarPanel } from "./SidebarPanel";

const ThumbnailPanel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <SidebarPanel title="サムネイル">
      <div className="space-y-2">
        {imageUrl ? (
          <div className="relative">
            <img
              src={imageUrl}
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
            画像が未設定です
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
          className="w-full rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
        >
          画像を選択
        </button>
      </div>
    </SidebarPanel>
  );
};

export default ThumbnailPanel;
