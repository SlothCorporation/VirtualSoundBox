import type { GraphQLClient, RequestOptions } from "graphql-request";
import gql from "graphql-tag";
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Article = {
  __typename?: "Article";
  body?: Maybe<Scalars["String"]["output"]>;
  category: Category;
  coverImage?: Maybe<CoverImage>;
  excerpt?: Maybe<Scalars["String"]["output"]>;
  externalDescription?: Maybe<Scalars["String"]["output"]>;
  externalUrl?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  likeCount?: Maybe<Scalars["Int"]["output"]>;
  publishedAt: Scalars["String"]["output"];
  tags?: Maybe<Array<Maybe<Tag>>>;
  thumbnailImage?: Maybe<ThumbnailImage>;
  title: Scalars["String"]["output"];
  type: ArticleType;
};

export type ArticleFilterInput = {
  category?: InputMaybe<Scalars["String"]["input"]>;
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  tag?: InputMaybe<Scalars["String"]["input"]>;
};

export type ArticlePaginator = {
  __typename?: "ArticlePaginator";
  data: Array<Article>;
  paginatorInfo: PaginatorInfo;
};

export enum ArticleType {
  Article = "article",
  External = "external",
}

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type ContactInput = {
  email: Scalars["String"]["input"];
  message: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type ContactResponse = {
  __typename?: "ContactResponse";
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type CoverImage = {
  __typename?: "CoverImage";
  id: Scalars["ID"]["output"];
  url: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  addTopic: Scalars["Boolean"]["output"];
  contact: ContactResponse;
  likeArticle: Scalars["Boolean"]["output"];
  removeTopic: Scalars["Boolean"]["output"];
  reorderTopics: Scalars["Boolean"]["output"];
};

export type MutationAddTopicArgs = {
  articleId: Scalars["ID"]["input"];
};

export type MutationContactArgs = {
  input: ContactInput;
};

export type MutationLikeArticleArgs = {
  articleId: Scalars["ID"]["input"];
};

export type MutationRemoveTopicArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationReorderTopicsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type PaginatorInfo = {
  __typename?: "PaginatorInfo";
  currentPage: Scalars["Int"]["output"];
  lastPage: Scalars["Int"]["output"];
  perPage: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  Article: Article;
  Articles: ArticlePaginator;
  PreviewArticle: Article;
  RecommendedArticles: Array<Article>;
  Topics: Array<Topic>;
};

export type QueryArticleArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryArticlesArgs = {
  filter?: InputMaybe<ArticleFilterInput>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  perPage?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPreviewArticleArgs = {
  token: Scalars["String"]["input"];
};

export type QueryRecommendedArticlesArgs = {
  articleId: Scalars["ID"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type ThumbnailImage = {
  __typename?: "ThumbnailImage";
  id: Scalars["ID"]["output"];
  url: Scalars["String"]["output"];
};

export type Topic = {
  __typename?: "Topic";
  article: Article;
  id: Scalars["ID"]["output"];
  position: Scalars["Int"]["output"];
};

export type FetchArticleQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type FetchArticleQuery = {
  __typename?: "Query";
  Article: {
    __typename?: "Article";
    id: string;
    title: string;
    type: ArticleType;
    body?: string | undefined;
    likeCount?: number | undefined;
    excerpt?: string | undefined;
    externalUrl?: string | undefined;
    externalDescription?: string | undefined;
    publishedAt: string;
    category: {
      __typename?: "Category";
      id: string;
      name: string;
      slug: string;
    };
    tags?:
      | Array<
          | { __typename?: "Tag"; id: string; name: string; slug: string }
          | undefined
        >
      | undefined;
    coverImage?:
      | { __typename?: "CoverImage"; id: string; url: string }
      | undefined;
    thumbnailImage?:
      | { __typename?: "ThumbnailImage"; id: string; url: string }
      | undefined;
  };
  RecommendedArticles: Array<{
    __typename?: "Article";
    id: string;
    title: string;
    type: ArticleType;
    externalUrl?: string | undefined;
    externalDescription?: string | undefined;
    publishedAt: string;
    category: {
      __typename?: "Category";
      id: string;
      name: string;
      slug: string;
    };
    tags?:
      | Array<
          | { __typename?: "Tag"; id: string; name: string; slug: string }
          | undefined
        >
      | undefined;
    thumbnailImage?:
      | { __typename?: "ThumbnailImage"; id: string; url: string }
      | undefined;
  }>;
};

export type FetchArticlesQueryVariables = Exact<{
  filter?: InputMaybe<ArticleFilterInput>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  perPage?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FetchArticlesQuery = {
  __typename?: "Query";
  Articles: {
    __typename?: "ArticlePaginator";
    data: Array<{
      __typename?: "Article";
      id: string;
      title: string;
      type: ArticleType;
      externalUrl?: string | undefined;
      externalDescription?: string | undefined;
      publishedAt: string;
      category: {
        __typename?: "Category";
        id: string;
        name: string;
        slug: string;
      };
      tags?:
        | Array<
            | { __typename?: "Tag"; id: string; name: string; slug: string }
            | undefined
          >
        | undefined;
      thumbnailImage?:
        | { __typename?: "ThumbnailImage"; id: string; url: string }
        | undefined;
    }>;
    paginatorInfo: {
      __typename?: "PaginatorInfo";
      currentPage: number;
      lastPage: number;
      perPage: number;
      total: number;
    };
  };
};

export type FetchPreviewArticleQueryVariables = Exact<{
  token: Scalars["String"]["input"];
}>;

export type FetchPreviewArticleQuery = {
  __typename?: "Query";
  PreviewArticle: {
    __typename?: "Article";
    id: string;
    title: string;
    type: ArticleType;
    body?: string | undefined;
    likeCount?: number | undefined;
    excerpt?: string | undefined;
    externalUrl?: string | undefined;
    externalDescription?: string | undefined;
    publishedAt: string;
    category: {
      __typename?: "Category";
      id: string;
      name: string;
      slug: string;
    };
    tags?:
      | Array<
          | { __typename?: "Tag"; id: string; name: string; slug: string }
          | undefined
        >
      | undefined;
    coverImage?:
      | { __typename?: "CoverImage"; id: string; url: string }
      | undefined;
    thumbnailImage?:
      | { __typename?: "ThumbnailImage"; id: string; url: string }
      | undefined;
  };
};

export type IncrementArticleLikeMutationVariables = Exact<{
  articleId: Scalars["ID"]["input"];
}>;

export type IncrementArticleLikeMutation = {
  __typename?: "Mutation";
  likeArticle: boolean;
};

export type SendContactMutationVariables = Exact<{
  input: ContactInput;
}>;

export type SendContactMutation = {
  __typename?: "Mutation";
  contact: {
    __typename?: "ContactResponse";
    success: boolean;
    message?: string | undefined;
  };
};

export const FetchArticleDocument = gql`
  query fetchArticle($id: ID!) {
    Article(id: $id) {
      id
      title
      type
      body
      likeCount
      excerpt
      externalUrl
      externalDescription
      category {
        id
        name
        slug
      }
      tags {
        id
        name
        slug
      }
      coverImage {
        id
        url
      }
      thumbnailImage {
        id
        url
      }
      publishedAt
    }
    RecommendedArticles(articleId: $id, limit: 5) {
      id
      title
      type
      externalUrl
      externalDescription
      category {
        id
        name
        slug
      }
      tags {
        id
        name
        slug
      }
      thumbnailImage {
        id
        url
      }
      publishedAt
    }
  }
`;
export const FetchArticlesDocument = gql`
  query fetchArticles($filter: ArticleFilterInput, $page: Int, $perPage: Int) {
    Articles(filter: $filter, page: $page, perPage: $perPage) {
      data {
        id
        title
        type
        externalUrl
        externalDescription
        category {
          id
          name
          slug
        }
        tags {
          id
          name
          slug
        }
        thumbnailImage {
          id
          url
        }
        publishedAt
      }
      paginatorInfo {
        currentPage
        lastPage
        perPage
        total
      }
    }
  }
`;
export const FetchPreviewArticleDocument = gql`
  query fetchPreviewArticle($token: String!) {
    PreviewArticle(token: $token) {
      id
      title
      type
      body
      likeCount
      excerpt
      externalUrl
      externalDescription
      category {
        id
        name
        slug
      }
      tags {
        id
        name
        slug
      }
      coverImage {
        id
        url
      }
      thumbnailImage {
        id
        url
      }
      publishedAt
    }
  }
`;
export const IncrementArticleLikeDocument = gql`
  mutation incrementArticleLike($articleId: ID!) {
    likeArticle(articleId: $articleId)
  }
`;
export const SendContactDocument = gql`
  mutation sendContact($input: ContactInput!) {
    contact(input: $input) {
      success
      message
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    fetchArticle(
      variables: FetchArticleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FetchArticleQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FetchArticleQuery>({
            document: FetchArticleDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "fetchArticle",
        "query",
        variables,
      );
    },
    fetchArticles(
      variables?: FetchArticlesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FetchArticlesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FetchArticlesQuery>({
            document: FetchArticlesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "fetchArticles",
        "query",
        variables,
      );
    },
    fetchPreviewArticle(
      variables: FetchPreviewArticleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FetchPreviewArticleQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FetchPreviewArticleQuery>({
            document: FetchPreviewArticleDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "fetchPreviewArticle",
        "query",
        variables,
      );
    },
    incrementArticleLike(
      variables: IncrementArticleLikeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<IncrementArticleLikeMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IncrementArticleLikeMutation>({
            document: IncrementArticleLikeDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "incrementArticleLike",
        "mutation",
        variables,
      );
    },
    sendContact(
      variables: SendContactMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<SendContactMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SendContactMutation>({
            document: SendContactDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "sendContact",
        "mutation",
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
