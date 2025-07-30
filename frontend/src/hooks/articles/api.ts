import { apiFetch } from "@/lib/api";

export type Article = {
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

type FetchArticlesParams = {
  tag?: string;
  category?: string;
  keyword?: string;
  page?: number;
};

export const fetchArticles = async (params: FetchArticlesParams = {}) => {
  const query = new URLSearchParams();

  if (params.tag) query.append("tag", params.tag);
  if (params.category) query.append("category", params.category);
  if (params.keyword) query.append("keyword", params.keyword);
  if (params.page) query.append("page", String(params.page));
  console.log(params);
  console.log(query.toString());
  const response = await apiFetch(
    `/api/articles${query.toString() ? `?${query.toString()}` : ""}`,
  );

  if (!response.ok) {
    throw new Error("記事一覧の取得に失敗しました");
  }

  return await response.json();
};
