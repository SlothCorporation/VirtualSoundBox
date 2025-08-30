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

type ArticlesResponse = Awaited<ReturnType<typeof sdk.fetchArticles>>;

type UseArticlesOptions = {
  filter?: ArticleFilterInput;
  page?: number;
  perPage?: number;
  initialData?: ArticlesResponse;
};

export const useArticles = ({
  filter = {},
  page = 1,
  perPage = 10,
  initialData,
}: UseArticlesOptions) => {
  const { data, isPending, isFetching } = useQuery<ArticlesResponse>({
    queryKey: ["articles", filter, page, perPage],
    queryFn: () =>
      sdk.fetchArticles({
        filter,
        page,
        perPage,
      }),
    initialData, // SSR/ISRから渡されたデータをセット
    placeholderData: (prev) => prev, // ページ遷移時に前データを保持してチラつきを防ぐ
  });

  return {
    articles: data?.Articles?.data ?? [],
    pagination: data?.Articles?.paginatorInfo,
    isLoading: isPending,
    isRefreshing: isFetching && !isPending, // 既存データがある状態で更新中
  };
};

type ArticleResponse = Awaited<ReturnType<typeof sdk.fetchArticle>>;

type UseArticleOptions = {
  articleId: string;
  initialData?: ArticleResponse;
};

export const useArticle = ({ articleId, initialData }: UseArticleOptions) => {
  const { data, isPending, isFetching } = useQuery<ArticleResponse>({
    queryKey: ["article", articleId],
    queryFn: () => sdk.fetchArticle({ id: articleId }),
    initialData,
  });

  return {
    article: data?.Article ?? null,
    isLoading: isPending,
    isRefreshing: isFetching && !isPending,
  };
};
