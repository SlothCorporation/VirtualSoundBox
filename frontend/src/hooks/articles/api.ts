import { apiFetch } from "@/lib/api";
import { sdk } from "@/lib/graphql-client";
import { useQuery } from "@tanstack/react-query";
import type { ArticleFilterInput } from "@/generated/graphql";

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

export const useArticles = (
  filter: ArticleFilterInput = {},
  page: number = 1,
  perPage: number = 10,
) => {
  const { data, isPending } = useQuery({
    queryKey: ["articles", filter, page, perPage],
    queryFn: () =>
      sdk.fetchArticles({
        filter,
        page,
        perPage,
      }),
  });
  if (!data) {
    return { articles: [], isLoading: isPending };
  }

  return {
    articles: data.Articles.data,
    pagination: data.Articles.paginatorInfo,
    isLoading: isPending,
  };
};
