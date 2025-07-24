import { apiFetch } from "@/lib/api";

export type PreviewArticle = {
  id: number;
  title: string;
  body: string;
  category: string | null;
  tags: string[];
  coverImage: {
    id: number;
    url: string;
  } | null;
  thumbnailImage: {
    id: number;
    url: string;
  } | null;
  publishAt: string;
};

export const fetchPreviewArticle = async (token: string) => {
  const response = await apiFetch(`/api/articles/preview/${token}`);
  if (!response.ok) {
    throw new Error("Failed to fetch preview article");
  }
  return await response.json();
};
