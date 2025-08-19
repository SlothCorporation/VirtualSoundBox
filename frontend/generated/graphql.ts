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
  coverImage?: Maybe<Scalars["String"]["output"]>;
  externalDescription?: Maybe<Scalars["String"]["output"]>;
  externalUrl?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  publishedAt: Scalars["String"]["output"];
  tags?: Maybe<Array<Maybe<Tag>>>;
  thumbnailImage?: Maybe<Scalars["String"]["output"]>;
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

export type PaginatorInfo = {
  __typename?: "PaginatorInfo";
  count: Scalars["Int"]["output"];
  currentPage: Scalars["Int"]["output"];
  firstItem?: Maybe<Scalars["Int"]["output"]>;
  hasMorePages: Scalars["Boolean"]["output"];
  lastItem?: Maybe<Scalars["Int"]["output"]>;
  lastPage: Scalars["Int"]["output"];
  perPage: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  Article: Article;
  Articles: ArticlePaginator;
};

export type QueryArticleArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryArticlesArgs = {
  filter?: InputMaybe<ArticleFilterInput>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  perPage?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
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
    externalUrl?: string | undefined;
    externalDescription?: string | undefined;
    coverImage?: string | undefined;
    thumbnailImage?: string | undefined;
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
  };
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
      thumbnailImage?: string | undefined;
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
    }>;
    paginatorInfo: {
      __typename?: "PaginatorInfo";
      count: number;
      currentPage: number;
      firstItem?: number | undefined;
      hasMorePages: boolean;
      lastItem?: number | undefined;
      lastPage: number;
      perPage: number;
      total: number;
    };
  };
};

export const FetchArticleDocument = gql`
  query fetchArticle($id: ID!) {
    Article(id: $id) {
      id
      title
      type
      body
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
      coverImage
      thumbnailImage
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
        thumbnailImage
        publishedAt
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
