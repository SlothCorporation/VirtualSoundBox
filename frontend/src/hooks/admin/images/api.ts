import { apiFetchFormData } from "@/lib/api";

type UploadImageResponse = {
  data: {
    id: number;
    url: string;
    original_name: string;
    type: "cover" | "thumbnail" | "body";
  };
};

/**
 * 画像を S3 にアップロードする
 * @param file - アップロードする画像ファイル
 * @param articleId - 紐づく記事ID
 * @param type - 画像の種類（cover, thumbnail, body など）
 * @returns アップロードされた画像のURL
 */
export const uploadImageToS3 = async (
  file: File,
  articleId: number,
  type: "cover" | "thumbnail" | "body",
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("type", type);

  const response = await apiFetchFormData(
    `/api/admin/articles/${articleId}/upload-image`,
    {
      method: "POST",
      body: formData,
    },
  );
  if (!response.ok) {
    throw new Error("画像のアップロードに失敗しました");
  }

  return await response.json();
};
