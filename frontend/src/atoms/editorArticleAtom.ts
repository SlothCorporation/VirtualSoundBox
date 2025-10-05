import { atom } from "jotai";

export type EditorArticle = {
  id: number | null;
  title: string;
  contentType: "article" | "external";
  externalUrl: string;
  externalDescription: string;
  previewToken?: string; // プレビュー用トークン
  body: string;
  tags: string[];
  category: string | undefined;
  status: "draft" | "published" | "scheduled" | "unpublished";
  coverImage?: string | null; // アイキャッチ画像のURL
  thumbnailImage?: string | null; // サムネイル画像のURL
  publishAt: string | null;
};

export const editorArticleAtom = atom<EditorArticle>({
  id: null, // 新規作成なら null、編集なら記事ID
  title: "",
  contentType: "article",
  externalUrl: "",
  externalDescription: "",
  previewToken: undefined,
  body: "",
  tags: [],
  category: undefined,
  status: "draft",
  publishAt: null,
});

export const editorModeAtom = atom<"visual" | "html">("visual");
