import type { ArticleFilterInput } from "@/generated/graphql";
import { sdk } from "@/lib/graphql-client";
import { useMutation, useQuery } from "@tanstack/react-query";

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
    recommendedArticles: data?.RecommendedArticles ?? [],
    isLoading: isPending,
    isRefreshing: isFetching && !isPending,
  };
};

type PreviewArticleResponse = Awaited<
  ReturnType<typeof sdk.fetchPreviewArticle>
>;

type UsePreviewArticleOptions = {
  token: string;
  initialData?: PreviewArticleResponse;
};

export const usePreviewArticle = ({
  token,
  initialData,
}: UsePreviewArticleOptions) => {
  const { data, isPending, isFetching } = useQuery<PreviewArticleResponse>({
    queryKey: ["preview-article", token],
    queryFn: () => sdk.fetchPreviewArticle({ token }),
    initialData,
  });

  return {
    article: data?.PreviewArticle ?? null,
    isLoading: isPending,
    isRefreshing: isFetching && !isPending,
  };
};

export const useIncrementArticleLike = (articleId: string) => {
  const { error, ...rest } = useMutation({
    mutationKey: ["incrementArticleLike", articleId],
    mutationFn: () => sdk.incrementArticleLike({ articleId }),
  });

  if (error) {
    return { error: error.message, ...rest };
  }

  return { error: null, ...rest };
};
